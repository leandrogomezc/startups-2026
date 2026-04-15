"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const inputClassName =
  "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60";

export function ContactSection() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, locale }),
      });

      const raw = await res.text();
      let payload: { error?: string } = {};
      try {
        payload = raw ? (JSON.parse(raw) as { error?: string }) : {};
      } catch {
        payload = {};
      }

      if (!res.ok) {
        const code = payload.error;
        let msg: string;
        if (code === "service_unavailable" || res.status === 503) {
          msg = t("formErrorServiceUnavailable");
        } else if (code === "send_failed") {
          msg = t("formErrorSendFailed");
        } else if (
          code === "missing_fields" ||
          code === "invalid_email" ||
          code === "field_too_long" ||
          code === "invalid_body" ||
          code === "invalid_json" ||
          res.status === 400
        ) {
          msg = t("formErrorValidation");
        } else if (res.status >= 500) {
          msg = t("formErrorServer");
        } else {
          msg = t("formError");
        }
        setError(msg);
        setSubmitting(false);
        return;
      }

      form.reset();
      setSuccess(true);
    } catch {
      setError(t("formErrorNetwork"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Section id="contacto" className="border-t border-border/60 bg-muted/20 dark:bg-muted/10">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-xl"
        >
          <p className="section-eyebrow text-center">{t("eyebrow")}</p>
          <h2 className="section-heading mx-auto mt-3 text-center text-3xl sm:text-4xl">{t("title")}</h2>
          <p className="mx-auto mt-4 text-center text-base leading-relaxed text-muted-foreground">{t("lead")}</p>

          {success ? (
            <div className="mt-10 rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
              <p className="font-display text-xl font-semibold text-foreground">{t("successTitle")}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("successBody")}</p>
              <Button type="button" variant="outline" className="mt-6" onClick={() => setSuccess(false)}>
                {t("successAction")}
              </Button>
            </div>
          ) : (
            <form className="mt-10 space-y-4" onSubmit={handleSubmit} noValidate>
              {error && (
                <p
                  className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                  role="alert"
                >
                  {error}
                </p>
              )}
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-foreground">
                  {t("fieldName")}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  disabled={submitting}
                  autoComplete="name"
                  className={inputClassName}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-foreground">
                  {t("fieldEmail")}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  disabled={submitting}
                  autoComplete="email"
                  className={inputClassName}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-foreground">
                  {t("fieldMessage")}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  disabled={submitting}
                  rows={5}
                  className={`${inputClassName} min-h-[120px] resize-y`}
                />
              </div>
              <Button type="submit" className="mt-2 w-full min-h-11 gap-2 text-base" size="lg" disabled={submitting}>
                <Send className="h-4 w-4" aria-hidden />
                {submitting ? t("submitting") : t("submit")}
              </Button>
            </form>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}
