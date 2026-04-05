import esMessages from "../../messages/es.json";
import type { RoadmapItemMsg } from "@/lib/roadmap-types";

export function getRoadmapSlugs(): string[] {
  const items = esMessages.Roadmap.items as RoadmapItemMsg[];
  return items.filter((i) => i.slug).map((i) => i.slug as string);
}

export function findRoadmapItemBySlug(items: RoadmapItemMsg[], slug: string): RoadmapItemMsg | undefined {
  return items.find((i) => i.slug === slug && !i.upcoming);
}
