/** Datos no traducidos (identidad y URLs). El copy vive en `messages/`. */

export const site = {
  name: "Leandro Gómez Cano",
  brandName: "Founders Club",
  logoSrc: "/founders-club-logo.svg",
  company: "tizo",
  instagramUrl:
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_INSTAGRAM_URL) ||
    "https://www.instagram.com/foundersclub.lat",
} as const;
