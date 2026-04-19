import { getLocale, getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/landing/FadeIn";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Link } from "@/i18n/navigation";

type Block = { label: string; text: string };

export async function Challenge() {
  const locale = await getLocale();
  const t = await getTranslations("Challenge");
  const tc = await getTranslations("ChallengeCta");
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
        <div className="mt-10 rounded-2xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">{tc("lead")}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={locale === "en" ? "/classes" : "/clases"}
              className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              {tc("classes")}
            </Link>
            <Link
              href={locale === "en" ? "/community" : "/comunidad"}
              className="inline-flex rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground"
            >
              {tc("incubator")}
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
