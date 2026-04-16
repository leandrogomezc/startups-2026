import type { Resend } from "resend";
import { buildGoogleCalendarUrl } from "@/lib/events/calendar-links";
import type { EventRow } from "@/lib/events/types";
import { resolveResendFrom } from "@/lib/resend-from";

export type EmailLocale = "en" | "es";

export function normalizeEmailLocale(locale: string | undefined): EmailLocale {
  return locale === "en" ? "en" : "es";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripHtmlish(s: string): string {
  return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

export function getResendFrom(): string {
  return resolveResendFrom(process.env.RESEND_FROM);
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

function eventPublicUrl(event: Pick<EventRow, "slug">, siteUrl: string): string {
  return `${siteUrl.replace(/\/$/, "")}/events/${event.slug}`;
}

function calendarDetails(event: EventRow, siteUrl: string): string {
  const url = eventPublicUrl(event, siteUrl);
  const desc = stripHtmlish(event.description);
  const snippet = desc.slice(0, 500);
  return snippet ? `${url}\n\n${snippet}` : url;
}

function physicalLocation(event: EventRow): string | null {
  if (event.location_type === "online") {
    return event.meet_url?.trim() || null;
  }
  return event.venue_address?.trim() || null;
}

export function buildCalendarLinkForEvent(event: EventRow, siteUrl: string): string {
  return buildGoogleCalendarUrl({
    title: event.title,
    starts_at: event.starts_at,
    ends_at: event.ends_at,
    details: calendarDetails(event, siteUrl),
    location: physicalLocation(event),
  });
}

type AttendeeKind = "confirmed" | "waitlist";

export async function sendAttendeeRegistrationConfirmation(params: {
  resend: Resend;
  from: string;
  to: string;
  event: EventRow;
  attendeeName: string;
  kind: AttendeeKind;
  waitlistPosition: number | null;
  locale: EmailLocale;
}): Promise<boolean> {
  const { event, attendeeName, kind, waitlistPosition, locale } = params;
  const siteUrl = getSiteUrl();
  const eventUrl = eventPublicUrl(event, siteUrl);
  const calUrl = buildCalendarLinkForEvent(event, siteUrl);

  const when = new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-NI", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: event.timezone,
  }).format(new Date(event.starts_at));

  const whereLine =
    event.location_type === "online" && event.meet_url
      ? locale === "en"
        ? `Link: ${event.meet_url}`
        : `Enlace: ${event.meet_url}`
      : event.venue_address
        ? locale === "en"
          ? `Venue: ${event.venue_address}`
          : `Lugar: ${event.venue_address}`
        : "";

  let statusLine: string;
  if (kind === "waitlist") {
    statusLine =
      locale === "en"
        ? waitlistPosition != null
          ? `You're on the waitlist (position #${waitlistPosition}). We'll email you if a spot opens.`
          : `You're on the waitlist. We'll email you if a spot opens.`
        : waitlistPosition != null
          ? `Estás en la lista de espera (posición #${waitlistPosition}). Te avisamos si se libera un lugar.`
          : `Estás en la lista de espera. Te avisamos si se libera un lugar.`;
  } else {
    statusLine =
      locale === "en"
        ? "Your registration is confirmed."
        : "Tu registro está confirmado.";
  }

  const subject =
    locale === "en"
      ? `Confirmation: ${event.title}`
      : `Confirmación: ${event.title}`;

  const addCal =
    locale === "en" ? "Add to Google Calendar" : "Agregar a Google Calendar";
  const hostSig = event.host_display_name.trim();

  const text = [
    locale === "en" ? `Hi ${attendeeName},` : `Hola ${attendeeName},`,
    "",
    statusLine,
    "",
    event.title,
    locale === "en" ? `When: ${when}` : `Cuándo: ${when}`,
    whereLine,
    "",
    locale === "en" ? `Event page: ${eventUrl}` : `Ficha del evento: ${eventUrl}`,
    `${addCal}: ${calUrl}`,
    "",
    locale === "en"
      ? `— ${hostSig} · Founders Club`
      : `— ${hostSig} · Founders Club`,
  ]
    .filter((line) => line !== "")
    .join("\n");

  const html = `<p>${escapeHtml(locale === "en" ? `Hi ${attendeeName},` : `Hola ${attendeeName},`)}</p>
<p>${escapeHtml(statusLine)}</p>
<p><strong>${escapeHtml(event.title)}</strong><br/>
${escapeHtml(locale === "en" ? "When" : "Cuándo")}: ${escapeHtml(when)}<br/>
${whereLine ? escapeHtml(whereLine) + "<br/>" : ""}
<a href="${escapeHtml(eventUrl)}">${escapeHtml(locale === "en" ? "Event page" : "Ficha del evento")}</a><br/>
<a href="${escapeHtml(calUrl)}">${escapeHtml(addCal)}</a></p>
<p>${escapeHtml(`— ${hostSig} · Founders Club`)}</p>`;

  try {
    const result = await params.resend.emails.send({
      from: params.from,
      to: [params.to],
      subject,
      text,
      html,
    });
    if (result.error) {
      console.error("[event-emails] sendAttendeeRegistrationConfirmation Resend error:", result.error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[event-emails] sendAttendeeRegistrationConfirmation failed:", err);
    return false;
  }
}

export type TeamNotifyStatus = "confirmed" | "waitlist" | "pending_payment" | "payment_received";

export async function sendTeamRegistrationNotify(params: {
  resend: Resend;
  from: string;
  notifyTo: string;
  event: EventRow;
  participantEmail: string;
  participantName: string;
  status: TeamNotifyStatus;
  siteUrl?: string;
}): Promise<boolean> {
  const siteUrl = params.siteUrl ?? getSiteUrl();
  const eventUrl = eventPublicUrl(params.event, siteUrl);
  const adminUrl = `${siteUrl.replace(/\/$/, "")}/events/admin/${params.event.id}`;

  const statusLabel =
    params.status === "confirmed"
      ? "Confirmado"
      : params.status === "waitlist"
        ? "Lista de espera"
        : params.status === "pending_payment"
          ? "Pago pendiente"
          : "Confirmado (pago recibido)";

  const subject =
    params.status === "payment_received"
      ? `Pago recibido: ${params.event.title}`
      : `Nuevo registro: ${params.event.title}`;
  const text = [
    `Evento: ${params.event.title}`,
    `Participante: ${params.participantName}`,
    `Correo: ${params.participantEmail}`,
    `Estado: ${statusLabel}`,
    "",
    `Ficha pública: ${eventUrl}`,
    `Admin: ${adminUrl}`,
  ].join("\n");

  const html = `<p><strong>Evento:</strong> ${escapeHtml(params.event.title)}<br/>
<strong>Participante:</strong> ${escapeHtml(params.participantName)}<br/>
<strong>Correo:</strong> ${escapeHtml(params.participantEmail)}<br/>
<strong>Estado:</strong> ${escapeHtml(statusLabel)}</p>
<p><a href="${escapeHtml(eventUrl)}">Ficha pública</a> · <a href="${escapeHtml(adminUrl)}">Admin</a></p>`;

  try {
    const result = await params.resend.emails.send({
      from: params.from,
      to: [params.notifyTo],
      subject,
      text,
      html,
    });
    if (result.error) {
      console.error("[event-emails] sendTeamRegistrationNotify Resend error:", result.error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[event-emails] sendTeamRegistrationNotify failed:", err);
    return false;
  }
}

export function getTeamNotifyTo(): string | null {
  const raw = process.env.EVENT_REGISTRATIONS_NOTIFY_TO?.trim();
  return raw || null;
}
