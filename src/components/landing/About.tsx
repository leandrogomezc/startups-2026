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
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">{t("eyebrow")}</p>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-foreground sm:text-4xl">{t("title")}</h2>
          <p className="font-display mt-6 text-2xl tracking-tight text-foreground sm:text-3xl">{t("name")}</p>
          <div className="mt-10 max-w-2xl space-y-6 border-l-2 border-border pl-6 sm:pl-8">
            <p className="text-base leading-relaxed text-foreground sm:text-lg">{t("body")}</p>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{t("purpose")}</p>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
