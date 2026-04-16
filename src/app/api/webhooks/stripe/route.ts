import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  getResendFrom,
  getTeamNotifyTo,
  normalizeEmailLocale,
  sendAttendeeRegistrationConfirmation,
  sendTeamRegistrationNotify,
} from "@/lib/events/event-emails";
import type { EventRow } from "@/lib/events/types";
import { createServiceRoleClient } from "@/lib/supabase-service";

export async function POST(request: Request) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripeSecret || !webhookSecret) {
    return NextResponse.json({ error: "stripe_not_configured" }, { status: 503 });
  }

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(stripeSecret);

  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  let event: import("stripe").Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as import("stripe").Stripe.Checkout.Session;
    const sb = createServiceRoleClient();
    if (!sb) {
      return NextResponse.json({ received: true });
    }

    const { error: updateErr } = await sb
      .from("event_registrations")
      .update({ status: "confirmed", payment_status: "paid" })
      .eq("stripe_checkout_session_id", session.id);

    if (updateErr) {
      console.error("[stripe webhook] update registration failed:", updateErr);
    }

    const { data: reg, error: regErr } = await sb
      .from("event_registrations")
      .select("id, email, name, event_id")
      .eq("stripe_checkout_session_id", session.id)
      .maybeSingle();

    if (regErr || !reg) {
      return NextResponse.json({ received: true });
    }

    const { data: eventRow, error: evErr } = await sb
      .from("events")
      .select("*")
      .eq("id", reg.event_id)
      .single<EventRow>();

    if (evErr || !eventRow) {
      console.error("[stripe webhook] event not found for registration:", reg.event_id);
      return NextResponse.json({ received: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("[stripe webhook] RESEND_API_KEY missing; skipping confirmation email");
      return NextResponse.json({ received: true });
    }

    const metaLocale = session.metadata?.locale;
    const emailLocale = normalizeEmailLocale(typeof metaLocale === "string" ? metaLocale : undefined);

    try {
      const resend = new Resend(apiKey);
      const from = getResendFrom();
      const ok = await sendAttendeeRegistrationConfirmation({
        resend,
        from,
        to: reg.email,
        event: eventRow,
        attendeeName: reg.name,
        kind: "confirmed",
        waitlistPosition: null,
        locale: emailLocale,
      });
      if (!ok) {
        console.error("[stripe webhook] attendee confirmation email failed for", reg.email);
      }

      const notifyTo = getTeamNotifyTo();
      if (notifyTo) {
        const teamOk = await sendTeamRegistrationNotify({
          resend,
          from,
          notifyTo,
          event: eventRow,
          participantEmail: reg.email,
          participantName: reg.name,
          status: "payment_received",
        });
        if (!teamOk) {
          console.error("[stripe webhook] team notify failed");
        }
      }
    } catch (err) {
      console.error("[stripe webhook] email send error:", err);
    }
  }

  return NextResponse.json({ received: true });
}
