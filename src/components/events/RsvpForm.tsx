"use client";

import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { buildCalendarLinkForEvent, getSiteUrl } from "@/lib/events/event-emails";
import type { EventWithCounts } from "@/lib/events/types";
import { formatPrice, spotsRemaining } from "@/lib/events/format";

const inputClassName =
  "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

type Props = {
  event: EventWithCounts;
  locale: string;
};

export function RsvpForm({ event, locale }: Props) {
  const t = useTranslations("Events");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{
    message: string;
    confirmationEmailSent: boolean;
  } | null>(null);

  const spots = spotsRemaining(event);
  const willWaitlist = spots !== null && spots === 0 && event.waitlist_enabled;
  const isPaid = event.price_cents > 0;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();

    setError(null);
    if (!isValidEmail(email)) {
      setError(t("rsvpErrorInvalidEmail"));
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event_id: event.id, name, email, locale }),
      });

      const payload = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (payload.error === "duplicate") {
          setError(t("rsvpErrorDuplicate"));
        } else if (payload.error === "full") {
          setError(t("rsvpErrorFull"));
        } else {
          setError(t("rsvpError"));
        }
        setSubmitting(false);
        return;
      }

      if (payload.checkout_url) {
        window.location.href = payload.checkout_url;
        return;
      }

      const confirmationEmailSent = payload.confirmation_email_sent === true;

      if (payload.status === "waitlist") {
        setSuccess({
          message: t("rsvpSuccessWaitlist", { position: payload.waitlist_position ?? "?" }),
          confirmationEmailSent,
        });
      } else {
        setSuccess({
          message: t("rsvpSuccess"),
          confirmationEmailSent,
        });
      }
      form.reset();
    } catch {
      setError(t("rsvpError"));
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    const calendarUrl = buildCalendarLinkForEvent(event, getSiteUrl());
    return (
      <div className="mt-4 space-y-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300">
        <p>{success.message}</p>
        {success.confirmationEmailSent ? (
          <p className="text-emerald-800/90 dark:text-emerald-200/90">{t("rsvpConfirmationEmailSent")}</p>
        ) : null}
        <a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex font-medium text-emerald-800 underline underline-offset-2 hover:text-emerald-900 dark:text-emerald-200 dark:hover:text-emerald-100"
        >
          {t("rsvpAddToCalendar")}
        </a>
      </div>
    );
  }

  return (
    <form className="mt-4 space-y-3" onSubmit={handleSubmit} noValidate>
      {error && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      <div>
        <label htmlFor="rsvp-name" className="mb-1 block text-sm font-medium text-foreground">
          {t("rsvpName")}
        </label>
        <input id="rsvp-name" name="name" type="text" required disabled={submitting} autoComplete="name" className={inputClassName} />
      </div>
      <div>
        <label htmlFor="rsvp-email" className="mb-1 block text-sm font-medium text-foreground">
          {t("rsvpEmail")}
        </label>
        <input id="rsvp-email" name="email" type="email" required disabled={submitting} autoComplete="email" className={inputClassName} />
      </div>
      <div className="flex items-start gap-2 pt-1">
        <input id="rsvp-consent" name="consent" type="checkbox" defaultChecked className="mt-0.5 h-4 w-4 rounded border-border" />
        <label htmlFor="rsvp-consent" className="text-xs text-muted-foreground">
          {t("rsvpConsent")}
        </label>
      </div>
      <Button type="submit" className="mt-2 w-full min-h-11 gap-2 text-base" size="lg" disabled={submitting}>
        <Send className="h-4 w-4" aria-hidden />
        {submitting
          ? t("rsvpSubmitting")
          : willWaitlist
            ? t("joinWaitlist")
            : isPaid
              ? t("registerPaid", { price: formatPrice(event.price_cents) })
              : t("register")}
      </Button>
    </form>
  );
}
