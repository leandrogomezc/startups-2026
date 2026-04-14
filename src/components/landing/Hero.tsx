"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Globe2, GraduationCap } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/link-button";
import { Container } from "@/components/ui/Container";
import { getClassesPath, getCommunityPath } from "@/lib/localized-paths";

export function Hero() {
  const locale = useLocale();
  const t = useTranslations("Hero");
  const ts = useTranslations("Site");
  const classesHref = getClassesPath(locale);
  const thesisHref = `${getCommunityPath(locale)}#tesis`;

  return (
    <div id="inicio" className="hero-surface relative scroll-mt-20 overflow-hidden">
      <Container className="relative py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-primary mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest"
          >
            <Globe2 className="h-4 w-4 shrink-0" aria-hidden />
            {t("badge")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.5rem,8vw,4.5rem)] font-bold leading-[1.04] tracking-[-0.03em] text-foreground"
          >
            {ts("headline")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            {ts("heroSub")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <ButtonLink
              href={thesisHref}
              variant="primary"
              className="min-h-[52px] w-full px-8 text-base font-semibold shadow-lg sm:w-auto"
            >
              <BookOpen className="h-5 w-5 shrink-0" aria-hidden />
              {t("ctaPrimary")}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
            <ButtonLink
              href={classesHref}
              variant="secondary"
              className="min-h-[52px] w-full px-8 text-base font-medium sm:w-auto"
            >
              <GraduationCap className="h-5 w-5 shrink-0" aria-hidden />
              {t("ctaClasses")}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            {t("footnote")}
          </motion.p>
        </div>
      </Container>
    </div>
  );
}
