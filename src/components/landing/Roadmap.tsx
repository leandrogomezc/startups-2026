import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/landing/FadeIn";
import { roadmap, type RoadmapStatus } from "@/lib/site";

function statusStyles(status: RoadmapStatus): string {
  switch (status) {
    case "Idea":
      return "bg-neutral-100 text-neutral-700 ring-1 ring-neutral-200/80";
    case "Validando":
      return "bg-amber-50 text-amber-900 ring-1 ring-amber-200/80";
    case "Construyendo":
      return "bg-indigo-50 text-indigo-900 ring-1 ring-indigo-200/80";
    case "Lanzado":
      return "bg-emerald-50 text-emerald-900 ring-1 ring-emerald-200/80";
    case "Iterando":
      return "bg-sky-50 text-sky-900 ring-1 ring-sky-200/80";
    default:
      return "bg-neutral-100 text-neutral-700";
  }
}

export function Roadmap() {
  return (
    <Section id="roadmap">
      <Container>
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Roadmap de productos
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl tracking-tight text-foreground sm:text-4xl">
            Un lanzamiento por mes · 2026
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Meses restantes del año en curso. Estados y aprendizajes se actualizan con cada ciclo.
          </p>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {roadmap.map((item, i) => (
            <FadeIn key={item.month} delay={i * 0.04}>
              <article className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_1px_0_rgb(0_0_0_/0.03)] transition-all hover:border-neutral-300 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                      {item.month}
                    </p>
                    <h3 className="mt-2 font-display text-xl text-foreground">{item.productName}</h3>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles(item.status)}`}
                    title={item.statusMicrocopy}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-neutral-500">{item.statusMicrocopy}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
                <div className="mt-6 rounded-lg bg-neutral-50 p-3">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-neutral-500">
                    Aprendizaje clave
                  </p>
                  <p className="mt-1 text-sm text-foreground">{item.keyLearning}</p>
                </div>
                <Link
                  href="#aprendizajes"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors group-hover:gap-2"
                >
                  Ver detalle
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
