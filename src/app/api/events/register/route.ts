import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase-service";
import type { EventRow } from "@/lib/events/types";

export async function POST(request: Request) {
  const sb = createServiceRoleClient();
  if (!sb) {
    return NextResponse.json({ error: "service_unavailable" }, { status: 503 });
  }

  let body: { event_id?: string; name?: string; email?: string; locale?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { event_id, name, email, locale } = body;
  if (!event_id || !name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  // Fetch the event
  const { data: event, error: eventErr } = await sb
    .from("events")
    .select("*")
    .eq("id", event_id)
    .eq("is_published", true)
    .single<EventRow>();

  if (eventErr || !event) {
    return NextResponse.json({ error: "event_not_found" }, { status: 404 });
  }

  if (new Date(event.ends_at) < new Date()) {
    return NextResponse.json({ error: "event_ended" }, { status: 400 });
  }

  // Check for duplicate
  const { data: existing } = await sb
    .from("event_registrations")
    .select("id, status")
    .eq("event_id", event_id)
    .eq("email", email.trim().toLowerCase())
    .neq("status", "cancelled")
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ error: "duplicate" }, { status: 409 });
  }

  // Count confirmed
  const { count: confirmedCount } = await sb
    .from("event_registrations")
    .select("*", { count: "exact", head: true })
    .eq("event_id", event_id)
    .eq("status", "confirmed");

  const confirmed = confirmedCount ?? 0;
  const hasCapacity = event.capacity == null || confirmed < event.capacity;

  // Paid event — create as pending_payment, return Stripe checkout URL
  if (event.price_cents > 0 && hasCapacity) {
    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecret) {
      return NextResponse.json({ error: "stripe_not_configured" }, { status: 503 });
    }

    // Dynamic import to avoid breaking if stripe isn't installed
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeSecret);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const eventUrl = `${siteUrl}/events/${event.slug}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        event.stripe_price_id
          ? { price: event.stripe_price_id, quantity: 1 }
          : {
              price_data: {
                currency: "usd",
                product_data: { name: event.title },
                unit_amount: event.price_cents,
              },
              quantity: 1,
            },
      ],
      customer_email: email.trim().toLowerCase(),
      metadata: { event_id, name: name.trim(), email: email.trim().toLowerCase() },
      success_url: `${eventUrl}?payment=success`,
      cancel_url: `${eventUrl}?payment=cancelled`,
    });

    const { data: reg, error: regErr } = await sb
      .from("event_registrations")
      .insert({
        event_id,
        email: email.trim().toLowerCase(),
        name: name.trim(),
        status: "pending_payment",
        stripe_checkout_session_id: session.id,
        payment_status: "unpaid",
      })
      .select("id")
      .single();

    if (regErr) {
      return NextResponse.json({ error: "registration_failed" }, { status: 500 });
    }

    return NextResponse.json({ id: reg.id, status: "pending_payment", checkout_url: session.url });
  }

  // Free event or waitlist
  let status: "confirmed" | "waitlist";
  let waitlistPosition: number | null = null;

  if (hasCapacity) {
    status = "confirmed";
  } else if (event.waitlist_enabled) {
    status = "waitlist";
    const { count } = await sb
      .from("event_registrations")
      .select("*", { count: "exact", head: true })
      .eq("event_id", event_id)
      .eq("status", "waitlist");
    waitlistPosition = (count ?? 0) + 1;
  } else {
    return NextResponse.json({ error: "full" }, { status: 400 });
  }

  const { data: reg, error: regErr } = await sb
    .from("event_registrations")
    .insert({
      event_id,
      email: email.trim().toLowerCase(),
      name: name.trim(),
      status,
      payment_status: "na",
      waitlist_position: waitlistPosition,
    })
    .select("id")
    .single();

  if (regErr) {
    return NextResponse.json({ error: "registration_failed" }, { status: 500 });
  }

  return NextResponse.json({
    id: reg.id,
    status,
    waitlist_position: waitlistPosition,
  });
}
