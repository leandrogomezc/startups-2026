/** Datos no traducidos (identidad y URLs). El copy vive en `messages/`. */

export const site = {
  name: "Leandro Gómez Cano",
  company: "tizo",
  linkedinUrl:
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_LINKEDIN_URL) ||
    "https://www.linkedin.com/in/leandro-gomez-cano",
  instagramUrl:
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_INSTAGRAM_URL) ||
    "https://www.instagram.com/leandrogomezc_/",
  /** Correo para `mailto:` al enviar el formulario de prioridad (clases). Opcional. */
  classInterestEmail:
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_CLASS_INTEREST_EMAIL) || "",
} as const;
