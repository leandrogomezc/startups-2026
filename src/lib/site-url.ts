/** Base URL sin barra final; fallback solo para desarrollo local. */
export function getSiteBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}
