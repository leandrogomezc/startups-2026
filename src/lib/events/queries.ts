import { createServiceRoleClient } from "@/lib/supabase-service";
import type { EventRow, EventWithCounts, RegistrationRow } from "./types";

function getClient() {
  const sb = createServiceRoleClient();
  if (!sb) throw new Error("Supabase not configured");
  return sb;
}

export async function getPublishedEvents(): Promise<EventWithCounts[]> {
  const sb = getClient();
  const { data: events, error } = await sb
    .from("events")
    .select("*")
    .eq("is_published", true)
    .order("starts_at", { ascending: true });

  if (error) throw error;
  if (!events?.length) return [];

  const ids = events.map((e: EventRow) => e.id);
  const { data: regs } = await sb
    .from("event_registrations")
    .select("event_id, status")
    .in("event_id", ids)
    .in("status", ["confirmed", "waitlist"]);

  const counts: Record<string, { confirmed: number; waitlist: number }> = {};
  for (const r of regs ?? []) {
    const c = (counts[r.event_id] ??= { confirmed: 0, waitlist: 0 });
    if (r.status === "confirmed") c.confirmed++;
    else if (r.status === "waitlist") c.waitlist++;
  }

  return events.map((e: EventRow) => ({
    ...e,
    confirmed_count: counts[e.id]?.confirmed ?? 0,
    waitlist_count: counts[e.id]?.waitlist ?? 0,
  }));
}

export async function getEventBySlug(slug: string): Promise<EventWithCounts | null> {
  const sb = getClient();
  const { data, error } = await sb
    .from("events")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !data) return null;

  const { count: confirmed } = await sb
    .from("event_registrations")
    .select("*", { count: "exact", head: true })
    .eq("event_id", data.id)
    .eq("status", "confirmed");

  const { count: waitlist } = await sb
    .from("event_registrations")
    .select("*", { count: "exact", head: true })
    .eq("event_id", data.id)
    .eq("status", "waitlist");

  return { ...data, confirmed_count: confirmed ?? 0, waitlist_count: waitlist ?? 0 };
}

export async function getAllEvents(): Promise<EventRow[]> {
  const sb = getClient();
  const { data, error } = await sb
    .from("events")
    .select("*")
    .order("starts_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getRegistrationsForEvent(eventId: string): Promise<RegistrationRow[]> {
  const sb = getClient();
  const { data, error } = await sb
    .from("event_registrations")
    .select("*")
    .eq("event_id", eventId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}
