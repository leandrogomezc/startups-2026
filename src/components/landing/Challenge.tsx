import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/landing/FadeIn";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type Block = { label: string; text: string };

export async function Challenge() {
  const t = await getTranslations("Challenge");
  const blocks = t.raw("blocks") as Block[];

  return (
    <Section id="reto" className="bg-muted/30">
      <Container>
        <FadeIn>
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">{t("eyebrow")}</p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blocks.map((block, i) => (
            <FadeIn key={block.label} delay={i * 0.05}>
              <article className="flex h-full flex-col rounded-xl border border-border bg-background p-6 transition-shadow hover:shadow-sm">
                <h3 className="text-sm font-semibold text-foreground">{block.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{block.text}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
