export type RoadmapStatusKey =
  | "Idea"
  | "Validando"
  | "Construyendo"
  | "Lanzado"
  | "Iterando";

export type RoadmapItemMsg = {
  month: string;
  productName: string;
  upcoming?: boolean;
  status: RoadmapStatusKey;
  statusMicrocopy: string;
  description: string;
  keyLearning: string;
};
