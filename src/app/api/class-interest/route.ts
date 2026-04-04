/**
 * POST /api/class-interest — envío vía Resend.
 * Producción: definir RESEND_API_KEY (y preferible RESEND_FROM) en Vercel; redeploy tras cambiar env.
 * Si el envío falla, revisar Resend Dashboard → Logs y reglas from/to (dominio de prueba vs verificado).
 */
import { NextResponse } from "next/server";
import { Resend } from "resend";

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

export async function POST(request: Request) {
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[class-interest] RESEND_API_KEY is not set");
    return NextResponse.json({ error: "service_unavailable" }, { status: 503 });
  }

  const from = process.env.RESEND_FROM?.trim() || "Clases <onboarding@resend.dev>";
  const to = process.env.RESEND_NOTIFY_TO?.trim() || "leandrogomezc@outlook.com";

  const subject = SUBJECT[locale] ?? SUBJECT.es;
  const text = buildText(locale, name, phone, email);

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    text,
    replyTo: email,
  });

  if (error) {
    console.error("[class-interest] Resend error:", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
