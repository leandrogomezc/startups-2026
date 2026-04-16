/**
 * POST /api/contact — envía el mensaje del formulario de contacto a leandro@foundersclub.lat vía Resend.
 */
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { resolveResendFrom } from "@/lib/resend-from";

const MAX_LEN = { name: 200, email: 320, message: 8000 };

const CONTACT_TO = "leandro@foundersclub.lat";

const SUBJECT: Record<string, string> = {
  es: "Contacto — Founders Club",
  en: "Contact — Founders Club",
};

function buildText(locale: string, name: string, email: string, message: string): string {
  if (locale === "en") {
    return [`From: ${name}`, `Email: ${email}`, "", "Message:", message].join("\n");
  }
  return [`Nombre: ${name}`, `Correo: ${email}`, "", "Mensaje:", message].join("\n");
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const CONSUMER_EMAIL_DOMAINS =
  /@(?:gmail|googlemail|outlook|hotmail|live|yahoo|icloud|me)\.[^@\s>]+$/i;

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

    const { name: rawName, email: rawEmail, message: rawMessage, locale: rawLocale } = body as Record<
      string,
      unknown
    >;

    const name = typeof rawName === "string" ? rawName.trim() : "";
    const email = typeof rawEmail === "string" ? rawEmail.trim() : "";
    const message = typeof rawMessage === "string" ? rawMessage.trim() : "";
    const locale = typeof rawLocale === "string" && (rawLocale === "en" || rawLocale === "es") ? rawLocale : "es";

    if (!name || !email || !message) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }
    if (
      name.length > MAX_LEN.name ||
      email.length > MAX_LEN.email ||
      message.length > MAX_LEN.message
    ) {
      return NextResponse.json({ error: "field_too_long" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[contact] RESEND_API_KEY is not set");
      return NextResponse.json({ error: "service_unavailable" }, { status: 503 });
    }

    const from = resolveResendFrom(process.env.RESEND_FROM);
    const to = process.env.CONTACT_EMAIL_TO?.trim() || CONTACT_TO;

    const subject = SUBJECT[locale] ?? SUBJECT.es;
    const text = buildText(locale, name, email, message);

    const resend = new Resend(apiKey);
    const replyTo = CONSUMER_EMAIL_DOMAINS.test(email) ? undefined : email;

    const result = await resend.emails.send({
      from,
      to: [to],
      subject,
      text,
      ...(replyTo ? { replyTo } : {}),
    });

    if (result.error) {
      console.error("[contact] Resend error:", result.error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected:", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
