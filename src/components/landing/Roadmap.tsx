import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/landing/FadeIn";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Link } from "@/i18n/navigation";
import { roadmapStatusStyles } from "@/lib/roadmap-status-styles";
import type { RoadmapItemMsg } from "@/lib/roadmap-types";

export async function Roadmap() {
  const t = await getTranslations("Roadmap");
  const items = t.raw("items") as RoadmapItemMsg[];

  return (
    <Section id="roadmap" className="border-t border-border/60">
      <Container>
        <FadeIn>
          <p className="section-eyebrow">{t("eyebrow")}</p>
          <h2 className="section-heading mt-3 max-w-2xl text-3xl sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{t("subtitle")}</p>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item, i) => {
            const upcoming = Boolean(item.upcoming);
            const hasPage = Boolean(item.slug) && !upcoming;
            const cardClass = `group flex h-full flex-col rounded-2xl border-2 border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-lg sm:p-8 ${upcoming ? "opacity-55 grayscale-[0.35]" : ""}`;

            const inner = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {item.month}
                    </p>
                    <h3 className="font-display mt-2 text-xl font-bold text-foreground sm:text-2xl">{item.productName}</h3>
                  </div>
                  <span
                    className={
                      upcoming
                        ? "shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground ring-1 ring-border"
                        : `shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${roadmapStatusStyles(item.status)}`
                    }
                    title={upcoming ? t("upcomingLabel") : item.statusMicrocopy}
                  >
                    {upcoming ? t("upcomingLabel") : t(`statusLabels.${item.status}`)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{item.statusMicrocopy}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                <div className="mt-6 rounded-xl bg-muted/50 p-4 dark:bg-muted/30">
                  <p className="text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground">
                    {t("keyLearningLabel")}
                  </p>
                  <p className="mt-1 text-sm text-foreground">{item.keyLearning}</p>
                </div>
                {hasPage && (
                  <span className="text-primary mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5">
                    {t("detailCta")}
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                )}
              </>
            );

            return (
              <FadeIn key={item.month} delay={i * 0.04}>
                {hasPage ? (
                  <Link href={`/proyectos/${item.slug}`} className={cardClass}>
                    {inner}
                  </Link>
                ) : (
                  <article className={cardClass}>{inner}</article>
                )}
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
