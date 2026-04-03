/** Contenido centralizado — actualizar URLs y datos aquí. */

export type RoadmapStatus =
  | "Idea"
  | "Validando"
  | "Construyendo"
  | "Lanzado"
  | "Iterando";

export type RoadmapMonth = {
  month: string;
  productName: string;
  status: RoadmapStatus;
  statusMicrocopy: string;
  description: string;
  keyLearning: string;
};

export type LearningNote = {
  tag: string;
  tagMicrocopy: string;
  title: string;
  body: string;
};

export const site = {
  name: "Leandro Gómez Cano",
  role: "Director Regional de Operaciones",
  company: "tizo",
  headline: "12 meses. 12 productos.",
  heroSub:
    "Hasta fin de año lanzo una nueva idea de producto cada mes y documento en público el proceso: decisiones, aprendizajes, métricas y resultados.",
  /** URLs públicas — sobrescribir con NEXT_PUBLIC_LINKEDIN_URL / NEXT_PUBLIC_INSTAGRAM_URL */
  linkedinUrl:
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_LINKEDIN_URL) ||
    "https://www.linkedin.com/in/leandro-gomez-cano",
  instagramUrl:
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_INSTAGRAM_URL) ||
    "https://www.instagram.com/leandrogomezcano",
} as const;

export const aboutCopy = {
  eyebrow: "Sobre mí",
  lead:
    "Conecto estrategia con ejecución: diseño sistemas que convierten prioridades en entregas medibles.",
  body:
    "Soy Leandro Gómez Cano, Director Regional de Operaciones en tizo. Trabajo con startups y equipos de alto ritmo en operaciones, growth, inteligencia artificial y construcción de productos. Mi foco no es el discurso: es el sistema que sostiene el crecimiento.",
} as const;

export const challengeCopy = {
  eyebrow: "El reto",
  title: "Construir en público, con cadencia mensual",
  blocks: [
    {
      label: "Qué es",
      text: "Un compromiso hasta diciembre: cada mes una nueva idea de producto, desde la definición del problema hasta el lanzamiento y la iteración mínima viable.",
    },
    {
      label: "Por qué",
      text: "La velocidad obliga a decidir. Documentar en abierto fuerza claridad, reduce autoengaño y acelera el aprendizaje frente a mercados reales.",
    },
    {
      label: "Qué voy a construir",
      text: "Prototipos y MVPs accionables: herramientas, flujos y experimentos que puedan validarse con usuarios sin depender de narrativa vacía.",
    },
    {
      label: "Qué comparto",
      text: "Decisiones de alcance, trade-offs, métricas que importan, errores y ajustes. Sin glamour: criterio y números cuando aplique.",
    },
    {
      label: "Qué quiero aprender",
      text: "Cómo comprimir tiempo de validación, qué repetir en operación y cómo integrar IA en el ciclo de producto sin perder foco en el negocio.",
    },
  ],
} as const;

/** Abril–diciembre 2026 (meses restantes desde abril). */
export const roadmap: RoadmapMonth[] = [
  {
    month: "Abril 2026",
    productName: "Pulseboard",
    status: "Construyendo",
    statusMicrocopy: "En progreso",
    description:
      "Tablero ligero de señales operativas para founders: alertas, owners y próximo paso sin otro dashboard pesado.",
    keyLearning:
      "Acotar el MVP a un solo flujo de decisión redujo el tiempo de prueba con usuarios en dos ciclos.",
  },
  {
    month: "Mayo 2026",
    productName: "Cohort Lab",
    status: "Validando",
    statusMicrocopy: "Proyecto en validación",
    description:
      "Simulador de retención y cohortes para equipos sin data team: hipótesis, escenarios y qué medir primero.",
    keyLearning: "Por validar: si el valor percibido está en la simulación o en las plantillas exportables.",
  },
  {
    month: "Junio 2026",
    productName: "Northline",
    status: "Idea",
    statusMicrocopy: "Próximo lanzamiento",
    description:
      "Alineación semanal estrategia–roadmap en un solo documento vivo, integrado con herramientas que ya usás.",
    keyLearning: "Pendiente de primera versión.",
  },
  {
    month: "Julio 2026",
    productName: "Relay",
    status: "Idea",
    statusMicrocopy: "En backlog",
    description:
      "Orquestador de handoffs entre ventas, operaciones y producto con SLA visibles y responsables claros.",
    keyLearning: "Pendiente de primera versión.",
  },
  {
    month: "Agosto 2026",
    productName: "Scopecraft",
    status: "Idea",
    statusMicrocopy: "En backlog",
    description:
      "Asistente de alcance: convierte briefs ambiguos en historias con criterios de aceptación y riesgos explícitos.",
    keyLearning: "Pendiente de primera versión.",
  },
  {
    month: "Septiembre 2026",
    productName: "Ledger Lite",
    status: "Idea",
    statusMicrocopy: "En backlog",
    description:
      "Registro mínimo de unidades económicas para operadores: margen, costo de oportunidad y foco por SKU o servicio.",
    keyLearning: "Pendiente de primera versión.",
  },
  {
    month: "Octubre 2026",
    productName: "Bridgeform",
    status: "Idea",
    statusMicrocopy: "En backlog",
    description:
      "Formularios inteligentes que enrutan respuestas a sistemas internos y disparan acciones sin fricción.",
    keyLearning: "Pendiente de primera versión.",
  },
  {
    month: "Noviembre 2026",
    productName: "Fieldnote",
    status: "Idea",
    statusMicrocopy: "En backlog",
    description:
      "Bitácora de campo para equipos remotos: contexto local, bloqueos y decisiones en un hilo auditable.",
    keyLearning: "Pendiente de primera versión.",
  },
  {
    month: "Diciembre 2026",
    productName: "Cierre de ciclo",
    status: "Idea",
    statusMicrocopy: "Cierre de año",
    description:
      "Producto o capstone que cierre el arco anual: síntesis de aprendizajes y herramienta reutilizable para 2027.",
    keyLearning: "Pendiente de primera versión.",
  },
];

export const learnings: LearningNote[] = [
  {
    tag: "Lo que funcionó",
    tagMicrocopy: "Bitácora abierta",
    title: "Publicar el criterio, no solo el resultado",
    body: "Cuando documenté por qué maté un feature, aparecieron conversaciones con más señal que cuando solo mostré el demo.",
  },
  {
    tag: "Lo que falló",
    tagMicrocopy: "Sin anestesia",
    title: "Demasiado alcance en el segundo sprint",
    body: "Intenté cubrir dos segmentos a la vez. El aprendizaje se diluyó. Volví a un segmento y un job-to-be-done.",
  },
  {
    tag: "Lo que cambiaría",
    tagMicrocopy: "Próxima iteración",
    title: "Medir antes de embellecer",
    body: "Reservaría un bloque fijo para definición de métricas el mismo día del kickoff, antes del diseño de UI.",
  },
  {
    tag: "Velocidad",
    tagMicrocopy: "Ver lo aprendido",
    title: "Lanzar más rápido expone el cuello de botella real",
    body: "La fricción no estaba en el código: estaba en la oferta y en el canal. El lanzamiento temprano lo dejó en evidencia.",
  },
  {
    tag: "Operación",
    tagMicrocopy: "En progreso",
    title: "Playbooks improvisados no escalan",
    body: "Pasé de notas sueltas a checklist repetible para onboarding de usuarios piloto. Menos caos, más señal.",
  },
];

export const thesisStatements = [
  "La ejecución vence a la teoría.",
  "Construir en público acelera el aprendizaje.",
  "La IA cambia cómo se diseñan y lanzan productos.",
  "Latam necesita más operadores que conviertan ideas en sistemas.",
  "Lo que no se mide se confunde con progreso.",
  "La claridad es un activo competitivo: se entrena con decisiones explícitas.",
] as const;

export const finalCtaCopy = {
  eyebrow: "Seguir el recorrido",
  title: "Si te interesa cómo se decide bajo presión, este es el lugar.",
  body:
    "Voy a publicar lanzamientos, métricas cuando aporten contexto y lecciones sin filtro ejecutivo. Elegí dónde seguir el reto.",
  newsletter: {
    label: "Newsletter",
    microcopy: "Lista en preparación",
    placeholder: "tu@email.com",
    hint: "Dejá tu mail cuando active el envío; por ahora es solo registro visual.",
  },
} as const;

export const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Reto", href: "#reto" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Aprendizajes", href: "#aprendizajes" },
  { label: "Tesis", href: "#tesis" },
  { label: "Seguir", href: "#cta-final" },
] as const;
