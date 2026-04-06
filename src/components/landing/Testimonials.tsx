import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/landing/FadeIn";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type Testimonial = { quote: string; name: string; role: string };

export async function Testimonials() {
  const t = await getTranslations("Testimonials");
  const items = t.raw("items") as Testimonial[];

  return (
    <Section id="testimonios" className="border-t border-border/60 bg-muted/30 dark:bg-muted/15">
      <Container>
        <FadeIn>
          <p className="section-eyebrow text-center">{t("eyebrow")}</p>
          <h2 className="section-heading mx-auto mt-3 max-w-2xl text-center text-3xl sm:text-4xl">
            {t("title")}
          </h2>
        </FadeIn>
        <div className="mx-auto mt-14 grid max-w-5xl gap-8 sm:grid-cols-3">
          {items.map((item, i) => (
            <FadeIn key={item.name} delay={i * 0.08}>
              <blockquote className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>
                </div>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </blockquote>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
