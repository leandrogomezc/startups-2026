/**
 * Admin usa `cookies()` vía isAdminAuthenticated. Sin esto, si el build corre sin
 * EVENTS_ADMIN_PASSWORD la ruta se prerenderiza como estática y en runtime (con
 * contraseña en env) falla el uso de cookies — "This page couldn't load".
 */
export const dynamic = "force-dynamic";

export default function EventsAdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
