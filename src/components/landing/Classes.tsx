import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/landing/FadeIn";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

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
              <article className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <h3 className="font-display text-xl text-foreground sm:text-2xl">{item.title}</h3>
                  <span className="text-primary w-fit shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium dark:bg-primary/20">
                    {item.statusMicrocopy}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.description}</p>
                <p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground sm:text-sm">
                  {item.footnote}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
