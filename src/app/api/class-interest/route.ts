/**
 * POST /api/class-interest — persiste lead en Supabase (tabla landing_class_interest) y envía vía Resend.
 * Producción: RESEND_API_KEY; opcional SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (mismo proyecto que Peluditos).
 * Si Supabase no está configurado, solo se envía el email (comportamiento anterior).
 */
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceRoleClient } from "@/lib/supabase-service";

const MAX_LEN = { name: 200, phone: 40, email: 320 };

const SUBJECT: Record<string, string> = {
  es: "Prioridad primera edición — Chatbot con IA",
  en: "First cohort priority — AI chatbot class",
};

function buildText(locale: string, name: string, phone: string, email: string): string {
  if (locale === "en") {
    return [`Name: ${name}`, `Phone: ${phone}`, `Email: ${email}`].join("\n");
  }
  return [`Nombre: ${name}`, `Teléfono: ${phone}`, `Correo: ${email}`].join("\n");
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Resend only allows From addresses on domains you verify at resend.com/domains (not @gmail.com / @outlook.com). */
const CONSUMER_EMAIL_DOMAINS =
  /@(?:gmail|googlemail|outlook|hotmail|live|yahoo|icloud|me)\.[^@\s>]+$/i;

const DEFAULT_RESEND_FROM = "Clases <onboarding@resend.dev>";

function resolveResendFrom(raw: string | undefined): string {
  const trimmed = raw?.trim();
  if (!trimmed) return DEFAULT_RESEND_FROM;

  const angle = trimmed.match(/<([^>]+)>/);
  const addr = (angle ? angle[1] : trimmed).trim();
  if (!addr.includes("@") || !CONSUMER_EMAIL_DOMAINS.test(addr)) {
    return trimmed;
  }

  console.warn(
    "[class-interest] RESEND_FROM uses a free email domain as sender; Resend rejects it. Using onboarding@resend.dev. Set RESEND_FROM to an address on a verified domain (see https://resend.com/domains).",
  );
  return DEFAULT_RESEND_FROM;
}

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "invalid_json" }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "invalid_body" }, { status: 400 });
    }

    const { name: rawName, phone: rawPhone, email: rawEmail, locale: rawLocale } = body as Record<
      string,
      unknown
    >;

    const name = typeof rawName === "string" ? rawName.trim() : "";
    const phone = typeof rawPhone === "string" ? rawPhone.trim() : "";
    const email = typeof rawEmail === "string" ? rawEmail.trim() : "";
    const locale = typeof rawLocale === "string" && (rawLocale === "en" || rawLocale === "es") ? rawLocale : "es";

    if (!name || !phone || !email) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }
    if (name.length > MAX_LEN.name || phone.length > MAX_LEN.phone || email.length > MAX_LEN.email) {
      return NextResponse.json({ error: "field_too_long" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }

    const supabase = createServiceRoleClient();
    if (supabase) {
      const { error: dbError } = await supabase.from("landing_class_interest").insert({
        name,
        phone,
        email,
        locale,
      });
      if (dbError) {
        console.error("[class-interest] Supabase insert:", dbError);
        return NextResponse.json({ error: "storage_failed" }, { status: 502 });
      }
    } else {
      console.warn("[class-interest] Supabase not configured; skipping DB insert");
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[class-interest] RESEND_API_KEY is not set");
      return NextResponse.json({ error: "service_unavailable" }, { status: 503 });
    }

    const from = resolveResendFrom(process.env.RESEND_FROM);
    const to = process.env.RESEND_NOTIFY_TO?.trim() || "leandrogomezc@outlook.com";

    const subject = SUBJECT[locale] ?? SUBJECT.es;
    const text = buildText(locale, name, phone, email);

    const resend = new Resend(apiKey);

    // Resend rejects replyTo on the same free domains as From; body still includes the lead's email.
    const replyTo = CONSUMER_EMAIL_DOMAINS.test(email) ? undefined : email;

    const result = await resend.emails.send({
      from,
      to: [to],
      subject,
      text,
      ...(replyTo ? { replyTo } : {}),
    });

    if (result.error) {
      console.error("[class-interest] Resend error:", result.error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[class-interest] unexpected:", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
