import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/landing/FadeIn";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export async function Thesis() {
  const t = await getTranslations("Thesis");
  const lines = t.raw("lines") as string[];

  return (
    <Section id="tesis" className="border-t border-border/60">
      <Container>
        <FadeIn>
          <p className="section-eyebrow text-center">{t("eyebrow")}</p>
          <h2 className="section-heading mx-auto mt-3 max-w-2xl text-center text-3xl sm:text-4xl">{t("title")}</h2>
        </FadeIn>

        <ol className="mx-auto mt-14 max-w-3xl space-y-0">
          {lines.map((line, i) => (
            <FadeIn key={line} delay={i * 0.06}>
              <li className="relative border-b border-border/60 py-6 sm:py-8">
                <div className="flex items-start gap-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                  <p className="font-display text-lg font-semibold leading-snug text-foreground sm:text-xl">{line}</p>
                </div>
              </li>
            </FadeIn>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
