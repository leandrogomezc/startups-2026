"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { InstagramGlyph, LinkedInGlyph } from "@/components/icons/SocialIcons";
import { ButtonLink } from "@/components/ui/link-button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

export function FinalCta() {
  const t = useTranslations("FinalCta");

  return (
    <Section
      id="cta-final"
      className="from-muted/50 border-t border-border bg-gradient-to-b to-background pb-8 dark:from-muted/20"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-12"
        >
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">{t("eyebrow")}</p>
          <h2 className="font-display mt-4 max-w-xl text-3xl tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{t("body")}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={site.linkedinUrl} variant="primary" external className="min-h-[48px] px-6">
              <LinkedInGlyph className="h-5 w-5" />
              {t("linkedin")}
            </ButtonLink>
            <ButtonLink href={site.instagramUrl} variant="secondary" external className="min-h-[48px] px-6">
              <InstagramGlyph className="h-5 w-5" />
              {t("instagram")}
            </ButtonLink>
          </div>

          <div className="mt-12 border-t border-border pt-10">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Mail className="text-primary h-4 w-4" aria-hidden />
              {t("newsletterLabel")}
              <span className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-xs font-normal">
                {t("newsletterMicrocopy")}
              </span>
            </div>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">{t("newsletterHint")}</p>
            <div className="mt-4 max-w-sm">
              <label htmlFor="newsletter-email" className="sr-only">
                {t("newsletterLabel")}
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder={t("newsletterPlaceholder")}
                disabled
                className="border-border bg-muted text-muted-foreground placeholder:text-muted-foreground w-full cursor-not-allowed rounded-lg border px-4 py-3 text-sm"
              />
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
