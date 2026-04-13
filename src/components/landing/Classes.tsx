import { ArrowRight, Calendar, Clock, DollarSign } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { InstagramGlyph } from "@/components/icons/SocialIcons";
import { ClassPriorityModal, type ClassSyllabusRow } from "@/components/landing/ClassPriorityModal";
import { FadeIn } from "@/components/landing/FadeIn";
import { ButtonLink } from "@/components/ui/link-button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

type ClassItem = {
  title: string;
  description: string;
  statusMicrocopy: string;
  schedule: string;
  syllabus: ClassSyllabusRow[];
  footnote: string;
};

export async function Classes() {
  const t = await getTranslations("Classes");
  const items = t.raw("items") as ClassItem[];

  return (
    <Section id="clases" className="border-t border-border/60 bg-muted/30 dark:bg-muted/15">
      <Container>
        <FadeIn>
          <p className="section-eyebrow text-center">{t("eyebrow")}</p>
          <h2 className="section-heading mx-auto mt-3 max-w-2xl text-center text-3xl sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
            {t("subtitle")}
          </p>
        </FadeIn>

        <div className="mx-auto mt-14 max-w-4xl space-y-8">
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06}>
              <article className="relative overflow-hidden rounded-2xl border-2 border-border bg-card shadow-md transition-shadow hover:shadow-xl">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary/80 via-primary to-primary/80"
                  aria-hidden
                />
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="font-display text-2xl font-bold text-foreground sm:text-3xl">{item.title}</h3>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary dark:bg-primary/15">
                      <Calendar className="h-3.5 w-3.5" aria-hidden />
                      {item.statusMicrocopy}
                    </span>
                  </div>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{item.description}</p>

                  <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium text-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <DollarSign className="h-4 w-4 text-primary" aria-hidden />
                      {t("coursePrice")}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-primary" aria-hidden />
                      {t("courseDuration")}
                    </span>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("scheduleHeading")}</p>
                    <p className="mt-1 text-sm font-medium text-foreground">{item.schedule}</p>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("syllabusHeading")}</p>
                    <ul className="mt-3 space-y-2 rounded-xl border border-border bg-muted/30 p-4 dark:bg-muted/15">
                      {item.syllabus.map((row) => (
                        <li key={`${row.label}-${row.title}`} className="text-sm leading-snug text-muted-foreground">
                          <span className="font-semibold text-foreground">{row.label}</span>
                          <span className="text-muted-foreground"> · </span>
                          {row.title}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <ClassPriorityModal schedule={item.schedule} syllabus={item.syllabus} />
                    <ButtonLink
                      href={site.instagramUrl}
                      variant="secondary"
                      external
                      className="min-h-[52px] px-6 text-base"
                    >
                      <InstagramGlyph className="h-5 w-5 shrink-0" aria-hidden />
                      {t("ctaSecondary")}
                    </ButtonLink>
                  </div>

                  <p className="mt-8 border-t border-border pt-5 text-sm text-muted-foreground">
                    {item.footnote}
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
