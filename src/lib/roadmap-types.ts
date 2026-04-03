export type RoadmapStatusKey =
  | "Idea"
  | "Validando"
  | "Construyendo"
  | "Lanzado"
  | "Iterando";

export type RoadmapItemMsg = {
  month: string;
  productName: string;
  status: RoadmapStatusKey;
  statusMicrocopy: string;
  description: string;
  keyLearning: string;
};
