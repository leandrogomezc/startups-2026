import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceRoleClient } from "@/lib/supabase-service";

/**
 * GET /api/cron/event-reminders
 * Called by Vercel Cron (daily on Hobby; schedule in vercel.json). Sends reminder
 * emails for events starting within the next 24 hours to confirmed registrations
 * that haven't been reminded yet.
 */
export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  const sb = createServiceRoleClient();
  const apiKey = process.env.RESEND_API_KEY;
  if (!sb || !apiKey) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const now = new Date();
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  // Events starting within the next 24 hours
  const { data: events } = await sb
    .from("events")
    .select("id, title, slug, starts_at, timezone, location_type, venue_address, meet_url")
    .eq("is_published", true)
    .gte("starts_at", now.toISOString())
    .lte("starts_at", in24h.toISOString());

  if (!events?.length) {
    return NextResponse.json({ sent: 0 });
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM?.trim() || "Founders Club <onboarding@resend.dev>";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  let totalSent = 0;

  for (const event of events) {
    // Confirmed registrations without a reminder
    const { data: regs } = await sb
      .from("event_registrations")
      .select("id, email, name")
      .eq("event_id", event.id)
      .eq("status", "confirmed")
      .is("reminder_sent_at", null);

    if (!regs?.length) continue;

    const eventDate = new Intl.DateTimeFormat("es-NI", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: event.timezone,
    }).format(new Date(event.starts_at));

    const eventUrl = `${siteUrl}/events/${event.slug}`;

    for (const reg of regs) {
      try {
        await resend.emails.send({
          from,
          to: [reg.email],
          subject: `Recordatorio: ${event.title} es mañana`,
          text: [
            `Hola ${reg.name},`,
            "",
            `Te recordamos que "${event.title}" empieza mañana.`,
            "",
            `Fecha: ${eventDate}`,
            event.location_type === "online" && event.meet_url
              ? `Link: ${event.meet_url}`
              : event.venue_address
                ? `Lugar: ${event.venue_address}`
                : "",
            "",
            `Detalles: ${eventUrl}`,
            "",
            "¡Nos vemos!",
            "— Founders Club",
          ]
            .filter(Boolean)
            .join("\n"),
        });

        await sb
          .from("event_registrations")
          .update({ reminder_sent_at: new Date().toISOString() })
          .eq("id", reg.id);

        totalSent++;
      } catch (err) {
        console.error(`[cron] Failed to send reminder to ${reg.email}:`, err);
      }
    }
  }

  return NextResponse.json({ sent: totalSent });
}
