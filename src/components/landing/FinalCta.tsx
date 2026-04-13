"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { InstagramGlyph } from "@/components/icons/SocialIcons";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export function FinalCta() {
  const t = useTranslations("FinalCta");

  return (
    <section id="cta-final" className="scroll-mt-20 bg-foreground py-20 text-background dark:bg-card sm:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-background/60 dark:text-muted-foreground">
            {t("eyebrow")}
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold leading-[1.08] tracking-[-0.025em] text-background dark:text-foreground sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-background/70 dark:text-muted-foreground">
            {t("body")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-background px-8 text-base font-semibold text-foreground shadow-lg transition-colors hover:bg-background/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90 sm:w-auto"
            >
              <InstagramGlyph className="h-5 w-5" />
              {t("instagram")}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
