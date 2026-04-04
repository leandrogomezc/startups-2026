"use client";

import { ArrowRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export type ClassSyllabusRow = { label: string; title: string };

type ClassPriorityModalProps = {
  schedule: string;
  syllabus: ClassSyllabusRow[];
};

export function ClassPriorityModal({ schedule, syllabus }: ClassPriorityModalProps) {
  const t = useTranslations("Classes");
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastSummary, setLastSummary] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const close = useCallback(() => {
    setOpen(false);
    setSubmitted(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const first = panelRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    first?.focus();
  }, [open]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const to = site.classInterestEmail;
    const body = t("formMailBody", { name, phone, email });
    if (to) {
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(t("formMailSubject"))}&body=${encodeURIComponent(body)}`;
      form.reset();
      close();
      return;
    }
    setLastSummary(body);
    setSubmitted(true);
    form.reset();
  }

  function handleCopySummary() {
    if (lastSummary) void navigator.clipboard.writeText(lastSummary);
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg bg-primary px-8 text-base font-semibold text-primary-foreground shadow-md transition-colors duration-200",
          "hover:bg-primary/90 active:scale-[0.99] motion-safe:transition-transform",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        )}
      >
        {t("ctaPrimary")}
        <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
            aria-label={t("formClose")}
            onClick={close}
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 max-h-[min(90vh,calc(100vh-2rem))] w-full max-w-md overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 id={titleId} className="font-display text-xl text-foreground sm:text-2xl">
                {t("formTitle")}
              </h2>
              <Button type="button" variant="ghost" size="icon" className="shrink-0" onClick={close} aria-label={t("formClose")}>
                <X className="size-5" />
              </Button>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("formLead")}</p>

            <div className="mt-5 rounded-xl border border-border bg-muted/40 p-4 text-sm dark:bg-muted/20">
              <p className="font-medium text-foreground">{t("courseDetailsTitle")}</p>
              <ul className="mt-2 space-y-1.5 text-muted-foreground">
                <li>{t("coursePrice")}</li>
                <li>{t("courseDuration")}</li>
                <li>{t("coursePayment")}</li>
              </ul>
            </div>

            <div className="mt-4 rounded-xl border border-border bg-muted/40 p-4 text-sm dark:bg-muted/20">
              <p className="font-medium text-foreground">{t("scheduleHeading")}</p>
              <p className="mt-1.5 leading-relaxed text-muted-foreground">{schedule}</p>
            </div>

            <div className="mt-4 max-h-44 overflow-y-auto rounded-xl border border-border bg-muted/40 p-4 text-sm dark:bg-muted/20 sm:max-h-52">
              <p className="font-medium text-foreground">{t("syllabusHeading")}</p>
              <ul className="mt-2 space-y-2 text-muted-foreground">
                {syllabus.map((row) => (
                  <li key={`${row.label}-${row.title}`} className="leading-snug">
                    <span className="font-medium text-foreground">{row.label}</span>
                    <span className="text-muted-foreground"> · </span>
                    {row.title}
                  </li>
                ))}
              </ul>
            </div>

            {!submitted ? (
              <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
                <div>
                  <label htmlFor="class-name" className="mb-1.5 block text-sm font-medium text-foreground">
                    {t("formFieldName")}
                  </label>
                  <input
                    id="class-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <div>
                  <label htmlFor="class-phone" className="mb-1.5 block text-sm font-medium text-foreground">
                    {t("formFieldPhone")}
                  </label>
                  <input
                    id="class-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <div>
                  <label htmlFor="class-email" className="mb-1.5 block text-sm font-medium text-foreground">
                    {t("formFieldEmail")}
                  </label>
                  <input
                    id="class-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <Button type="submit" className="mt-2 w-full min-h-11 text-base" size="lg">
                  {t("formSubmit")}
                </Button>
              </form>
            ) : (
              <div className="mt-6 space-y-4">
                <p className="text-sm font-medium text-foreground">{t("formSuccessTitle")}</p>
                <p className="text-sm text-muted-foreground">{t("formSuccessBody")}</p>
                {!site.classInterestEmail && (
                  <>
                    <textarea
                      readOnly
                      rows={5}
                      value={lastSummary}
                      className="w-full resize-none rounded-lg border border-border bg-muted/30 p-3 font-mono text-xs text-foreground"
                    />
                    <Button type="button" variant="outline" className="w-full" onClick={handleCopySummary}>
                      {t("formCopyButton")}
                    </Button>
                  </>
                )}
                <Button type="button" className="w-full" onClick={close}>
                  {t("formClose")}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
