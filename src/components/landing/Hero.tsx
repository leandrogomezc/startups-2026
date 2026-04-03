"use client";

import { motion } from "framer-motion";
import { ArrowRight, LineChart } from "lucide-react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/link-button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const t = useTranslations("Hero");
  const ts = useTranslations("Site");

  return (
    <div
      id="inicio"
      className="relative scroll-mt-20 overflow-hidden border-b border-border"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-25"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(229 229 229 / 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(229 229 229 / 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-100/90 via-violet-50/40 to-transparent blur-3xl dark:from-indigo-950/40 dark:via-violet-950/20 dark:to-transparent"
        aria-hidden
      />

      <Container className="relative py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-muted-foreground mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium uppercase tracking-widest backdrop-blur-sm dark:bg-background/60"
          >
            <LineChart className="text-primary h-3.5 w-3.5" aria-hidden />
            {t("badge")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.25rem,6vw,3.75rem)] font-normal leading-[1.08] tracking-tight text-foreground"
          >
            {ts("headline")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            {ts("heroSub")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <ButtonLink href="#roadmap" variant="primary" className="min-h-[48px] px-6 text-base">
              {t("ctaPrimary")}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="#cta-final" variant="secondary" className="min-h-[48px] px-6 text-base">
              {t("ctaSecondary")}
            </ButtonLink>
          </motion.div>
          <p className="mt-8 text-xs text-muted-foreground">{t("footnote")}</p>
        </div>
      </Container>
    </div>
  );
}
