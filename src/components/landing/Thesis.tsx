import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/landing/FadeIn";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export async function Thesis() {
  const t = await getTranslations("Thesis");
  const lines = t.raw("lines") as string[];

  return (
    <Section id="tesis">
      <Container>
        <FadeIn>
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">{t("eyebrow")}</p>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-foreground sm:text-4xl">{t("title")}</h2>
        </FadeIn>

        <ol className="mt-14 max-w-3xl space-y-0 border-l border-border pl-6 sm:pl-10">
          {lines.map((line, i) => (
            <FadeIn key={line} delay={i * 0.06}>
              <li className="relative pb-10 pl-2 last:pb-0 sm:pb-12">
                <span
                  className="border-border bg-background text-muted-foreground absolute -left-[calc(0.25rem+1px)] top-1.5 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border text-xs font-semibold"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <p className="font-display text-xl leading-snug text-foreground sm:text-2xl">{line}</p>
              </li>
            </FadeIn>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
