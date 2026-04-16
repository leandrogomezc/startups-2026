import { ArrowRight, Calendar, Clock, DollarSign, GraduationCap } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/link-button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getClassesPath } from "@/lib/localized-paths";

type ClassesTeaserProps = {
  locale: string;
};

export async function ClassesTeaser({ locale }: ClassesTeaserProps) {
  const t = await getTranslations("ClassesTeaser");
  const tc = await getTranslations("Classes");
  const href = getClassesPath(locale);

  return (
    <Section className="border-t border-border/60 bg-muted/30 dark:bg-muted/15">
      <Container>
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="grid gap-8 px-6 py-6 sm:px-8 lg:grid-cols-[1.25fr_0.95fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                <GraduationCap className="h-4 w-4" aria-hidden />
                {t("highlight")}
              </div>
              <p className="mt-5 text-lg font-semibold text-foreground">{t("summary")}</p>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 p-5 dark:bg-muted/15">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t("detailsTitle")}
              </p>
              <div className="mt-4 space-y-3 text-sm text-foreground">
                <p className="inline-flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" aria-hidden />
                  {tc("coursePrice")}
                </p>
                <p className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" aria-hidden />
                  {tc("courseDuration")}
                </p>
                <p className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" aria-hidden />
                  {t("schedule")}
                </p>
              </div>
              <ButtonLink href={href} className="mt-6 min-h-[52px] w-full px-6 text-base font-semibold">
                {t("cta")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
