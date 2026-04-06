import { Code, Lightbulb, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/landing/FadeIn";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const ICONS = [Lightbulb, Users, Code] as const;

type Item = { title: string; body: string };

export async function ForWho() {
  const t = await getTranslations("ForWho");
  const items = t.raw("items") as Item[];

  return (
    <Section id="para-quien" className="border-t border-border/60">
      <Container>
        <FadeIn>
          <p className="section-eyebrow text-center">{t("eyebrow")}</p>
          <h2 className="section-heading mx-auto mt-3 max-w-2xl text-center text-3xl sm:text-4xl">
            {t("title")}
          </h2>
        </FadeIn>
        <div className="mx-auto mt-14 grid max-w-4xl gap-8 sm:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/15">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
