import { NextResponse } from "next/server";
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
    if (sb) {
      await sb
        .from("event_registrations")
        .update({ status: "confirmed", payment_status: "paid" })
        .eq("stripe_checkout_session_id", session.id);
    }
  }

  return NextResponse.json({ received: true });
}
