import type { EventWithCounts } from "./types";

export function formatEventDate(isoDate: string, timezone: string, locale: string) {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat(locale === "es" ? "es-NI" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
  }).format(date);
}

export function formatShortDate(isoDate: string, timezone: string, locale: string) {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat(locale === "es" ? "es-NI" : "en-US", {
    month: "short",
    day: "numeric",
    timeZone: timezone,
  }).format(date);
}

export function formatPrice(cents: number): string {
  return (cents / 100).toFixed(cents % 100 === 0 ? 0 : 2);
}

export function isPast(event: { ends_at: string }): boolean {
  return new Date(event.ends_at) < new Date();
}

export function spotsRemaining(event: EventWithCounts): number | null {
  if (event.capacity == null) return null;
  return Math.max(0, event.capacity - event.confirmed_count);
}
