import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { FadeIn } from "@/components/landing/FadeIn";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { RoadmapItemMsg, RoadmapStatusKey } from "@/lib/roadmap-types";

function statusStyles(status: RoadmapStatusKey): string {
  switch (status) {
    case "Idea":
      return "bg-muted text-muted-foreground ring-1 ring-border";
    case "Validando":
      return "bg-amber-50 text-amber-950 ring-1 ring-amber-200/80 dark:bg-amber-950/30 dark:text-amber-100 dark:ring-amber-800/50";
    case "Construyendo":
      return "bg-indigo-50 text-indigo-950 ring-1 ring-indigo-200/80 dark:bg-indigo-950/40 dark:text-indigo-100 dark:ring-indigo-800/50";
    case "Lanzado":
      return "bg-emerald-50 text-emerald-950 ring-1 ring-emerald-200/80 dark:bg-emerald-950/30 dark:text-emerald-100 dark:ring-emerald-800/50";
    case "Iterando":
      return "bg-sky-50 text-sky-950 ring-1 ring-sky-200/80 dark:bg-sky-950/30 dark:text-sky-100 dark:ring-sky-800/50";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export async function Roadmap() {
  const t = await getTranslations("Roadmap");
  const items = t.raw("items") as RoadmapItemMsg[];

  return (
    <Section id="roadmap">
      <Container>
        <FadeIn>
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">{t("eyebrow")}</p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{t("subtitle")}</p>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item, i) => (
            <FadeIn key={item.month} delay={i * 0.04}>
              <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-border hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {item.month}
                    </p>
                    <h3 className="font-display mt-2 text-xl text-foreground">{item.productName}</h3>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles(item.status)}`}
                    title={item.statusMicrocopy}
                  >
                    {t(`statusLabels.${item.status}`)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{item.statusMicrocopy}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                <div className="mt-6 rounded-lg bg-muted/50 p-3 dark:bg-muted/30">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("keyLearningLabel")}
                  </p>
                  <p className="mt-1 text-sm text-foreground">{item.keyLearning}</p>
                </div>
                <Link
                  href="#aprendizajes"
                  className="text-primary mt-5 inline-flex items-center gap-1 text-sm font-medium transition-colors group-hover:gap-2"
                >
                  {t("detailCta")}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
