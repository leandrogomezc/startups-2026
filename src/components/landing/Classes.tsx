import { ArrowRight, ExternalLink } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/landing/FadeIn";
import { ButtonLink } from "@/components/ui/link-button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

type ClassItem = {
  title: string;
  description: string;
  statusMicrocopy: string;
  footnote: string;
};

export async function Classes() {
  const t = await getTranslations("Classes");
  const items = t.raw("items") as ClassItem[];

  return (
    <Section id="clases" className="bg-muted/20">
      <Container>
        <FadeIn>
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">{t("eyebrow")}</p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{t("subtitle")}</p>
        </FadeIn>

        <div className="mt-12 grid gap-5 md:grid-cols-1 lg:max-w-3xl">
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06}>
              <article className="relative overflow-hidden rounded-2xl border-2 border-border bg-card shadow-md transition-shadow hover:shadow-lg">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/80"
                  aria-hidden
                />
                <div className="p-6 sm:p-8 sm:pt-10">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="font-display text-xl text-foreground sm:text-2xl">{item.title}</h3>
                    <span className="text-primary w-fit shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium dark:bg-primary/20">
                      {item.statusMicrocopy}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.description}</p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <ButtonLink
                      href="#cta-final"
                      variant="primary"
                      className="min-h-[52px] px-8 text-base font-semibold shadow-md"
                    >
                      {t("ctaPrimary")}
                      <ArrowRight className="h-5 w-5" aria-hidden />
                    </ButtonLink>
                    <ButtonLink
                      href={site.linkedinUrl}
                      variant="secondary"
                      external
                      className="min-h-[52px] px-6 text-base"
                    >
                      <ExternalLink className="h-5 w-5 shrink-0" aria-hidden />
                      {t("ctaSecondary")}
                    </ButtonLink>
                  </div>
                  <p className="mt-3 max-w-xl text-xs leading-relaxed text-muted-foreground sm:text-sm">{t("ctaHint")}</p>

                  <p className="mt-8 border-t border-border pt-5 text-xs text-muted-foreground sm:text-sm">
                    {item.footnote}
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
