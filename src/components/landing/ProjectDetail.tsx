import { ArrowLeft, FileDown } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { roadmapStatusStyles } from "@/lib/roadmap-status-styles";
import type { RoadmapItemMsg } from "@/lib/roadmap-types";

type Props = {
  project: RoadmapItemMsg;
};

export async function ProjectDetail({ project }: Props) {
  const t = await getTranslations("Roadmap");
  const td = await getTranslations("ProjectDetail");

  return (
    <Container className="py-10 sm:py-14">
      <Link
        href="/#roadmap"
        className="text-muted-foreground hover:text-foreground mb-10 inline-flex items-center gap-2 text-sm font-medium transition-colors"
      >
        <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
        {td("backToRoadmap")}
      </Link>

      <header className="max-w-3xl">
        <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">{project.month}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">{project.productName}</h1>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${roadmapStatusStyles(project.status)}`}
            title={project.statusMicrocopy}
          >
            {t(`statusLabels.${project.status}`)}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{project.statusMicrocopy}</p>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">{project.description}</p>
      </header>

      <div className="mt-10 max-w-3xl rounded-xl border border-border bg-muted/30 p-5 dark:bg-muted/15 sm:p-6">
        <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
          {t("keyLearningLabel")}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground sm:text-base">{project.keyLearning}</p>
      </div>

      {project.detailSections && project.detailSections.length > 0 && (
        <section className="mt-14 max-w-3xl" aria-labelledby="project-work-heading">
          <h2 id="project-work-heading" className="font-display text-xl text-foreground sm:text-2xl">
            {project.workSectionTitle ?? td("workHeading")}
          </h2>
          <ul className="mt-8 space-y-10">
            {project.detailSections.map((section) => (
              <li key={section.title}>
                <h3 className="text-base font-semibold text-foreground">{section.title}</h3>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {section.body}
                </p>
                {section.download && (
                  <a
                    href={section.download.href}
                    download
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    <FileDown className="h-4 w-4 shrink-0" aria-hidden />
                    {section.download.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
