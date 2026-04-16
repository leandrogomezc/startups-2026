const CONSUMER_EMAIL_DOMAINS =
  /@(?:gmail|googlemail|outlook|hotmail|live|yahoo|icloud|me)\.[^@\s>]+$/i;

export const DEFAULT_RESEND_FROM = "Founders Club <onboarding@resend.dev>";

/**
 * Resolves RESEND_FROM for outbound mail. Free consumer domains are rejected by Resend;
 * we fall back to onboarding@resend.dev with a warning (same behavior as contact API).
 */
export function resolveResendFrom(raw: string | undefined): string {
  const trimmed = raw?.trim();
  if (!trimmed) return DEFAULT_RESEND_FROM;

  const angle = trimmed.match(/<([^>]+)>/);
  const addr = (angle ? angle[1] : trimmed).trim();
  if (!addr.includes("@") || !CONSUMER_EMAIL_DOMAINS.test(addr)) {
    return trimmed;
  }

  console.warn(
    "[resend] RESEND_FROM uses a free email domain as sender; Resend rejects it. Using onboarding@resend.dev.",
  );
  return DEFAULT_RESEND_FROM;
}
