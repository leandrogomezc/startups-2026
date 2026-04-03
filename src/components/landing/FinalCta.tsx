"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { InstagramGlyph, LinkedInGlyph } from "@/components/icons/SocialIcons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { finalCtaCopy, site } from "@/lib/site";

export function FinalCta() {
  return (
    <Section id="cta-final" className="border-t border-neutral-200 bg-gradient-to-b from-neutral-50/80 to-background pb-8">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm sm:p-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {finalCtaCopy.eyebrow}
          </p>
          <h2 className="font-display mt-4 max-w-xl text-3xl tracking-tight text-foreground sm:text-4xl">
            {finalCtaCopy.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{finalCtaCopy.body}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink
              href={site.linkedinUrl}
              variant="primary"
              external
              className="min-h-[48px] px-6"
            >
              <LinkedInGlyph className="h-5 w-5" />
              LinkedIn
            </ButtonLink>
            <ButtonLink
              href={site.instagramUrl}
              variant="secondary"
              external
              className="min-h-[48px] px-6"
            >
              <InstagramGlyph className="h-5 w-5" />
              Instagram
            </ButtonLink>
          </div>

          <div className="mt-12 border-t border-neutral-200 pt-10">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Mail className="h-4 w-4 text-accent" aria-hidden />
              {finalCtaCopy.newsletter.label}
              <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-normal text-muted">
                {finalCtaCopy.newsletter.microcopy}
              </span>
            </div>
            <p className="mt-2 max-w-md text-sm text-muted">{finalCtaCopy.newsletter.hint}</p>
            <div className="mt-4 max-w-sm">
              <label htmlFor="newsletter-email" className="sr-only">
                Email para newsletter
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder={finalCtaCopy.newsletter.placeholder}
                disabled
                className="w-full cursor-not-allowed rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-muted placeholder:text-neutral-400"
              />
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
