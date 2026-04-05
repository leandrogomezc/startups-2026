export type RoadmapStatusKey =
  | "Idea"
  | "Validando"
  | "Construyendo"
  | "Lanzado"
  | "Iterando";

export type RoadmapDetailSection = {
  title: string;
  body: string;
};

export type RoadmapItemMsg = {
  month: string;
  productName: string;
  /** URL segment for `/proyectos/[slug]`; omit for placeholders without a detail page */
  slug?: string;
  upcoming?: boolean;
  status: RoadmapStatusKey;
  statusMicrocopy: string;
  description: string;
  keyLearning: string;
  /** Extra narrative for the project detail page */
  detailSections?: RoadmapDetailSection[];
};
