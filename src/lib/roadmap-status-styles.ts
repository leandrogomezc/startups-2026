import type { RoadmapStatusKey } from "@/lib/roadmap-types";

export function roadmapStatusStyles(status: RoadmapStatusKey): string {
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
