import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/landing/FadeIn";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type Block = { label: string; text: string };

export async function Challenge() {
  const t = await getTranslations("Challenge");
  const blocks = t.raw("blocks") as Block[];

  return (
    <Section id="reto" className="border-t border-border/60 bg-muted/40 dark:bg-muted/20">
      <Container>
        <FadeIn>
          <p className="section-eyebrow">{t("eyebrow")}</p>
          <h2 className="section-heading mt-3 max-w-2xl text-3xl sm:text-4xl">{t("title")}</h2>
        </FadeIn>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blocks.map((block, i) => (
            <FadeIn key={block.label} delay={i * 0.05}>
              <article className="flex h-full flex-col rounded-2xl border-2 border-border bg-card p-6 transition-all hover:border-primary/25 hover:shadow-md sm:p-8">
                <h3 className="text-base font-bold text-foreground">{block.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{block.text}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
