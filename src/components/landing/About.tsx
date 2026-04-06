import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/landing/FadeIn";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export async function About() {
  const t = await getTranslations("About");

  return (
    <Section id="sobre-mi">
      <Container>
        <FadeIn>
          <p className="section-eyebrow">{t("eyebrow")}</p>
          <h2 className="section-heading mt-3 text-3xl sm:text-4xl">{t("title")}</h2>
        </FadeIn>
        <div className="mt-12 grid items-start gap-10 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] lg:gap-16">
          <FadeIn>
            <div className="relative mx-auto flex aspect-[3/4] w-full max-w-[280px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-muted to-primary/5 md:mx-0 lg:max-w-[320px]">
              <span className="font-display text-5xl font-bold text-primary/30" aria-hidden>
                LG
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="space-y-6">
              <p className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {t("name")}
              </p>
              <p className="text-base leading-relaxed text-foreground sm:text-lg">{t("body")}</p>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{t("purpose")}</p>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
