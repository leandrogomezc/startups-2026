/**
 * Builds a Google Calendar "add event" URL (works in browser and on the server).
 * Dates are passed in UTC as required by Google Calendar URL format.
 */
export type CalendarLinkInput = {
  title: string;
  starts_at: string;
  ends_at: string;
  /** Plain-text details (e.g. event page URL + short description). */
  details?: string;
  /** Shown as calendar location (venue address or meet link). */
  location?: string | null;
};

function toGcalUtcDate(iso: string): string {
  const d = new Date(iso);
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export function buildGoogleCalendarUrl(input: CalendarLinkInput): string {
  const start = toGcalUtcDate(input.starts_at);
  const end = toGcalUtcDate(input.ends_at);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: input.title,
    dates: `${start}/${end}`,
  });
  if (input.details?.trim()) {
    params.set("details", input.details.trim().slice(0, 8000));
  }
  const loc = input.location?.trim();
  if (loc) params.set("location", loc.slice(0, 1000));
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
