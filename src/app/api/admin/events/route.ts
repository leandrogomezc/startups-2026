import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-session";
import { createServiceRoleClient } from "@/lib/supabase-service";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const sb = createServiceRoleClient();
  if (!sb) return NextResponse.json({ error: "service_unavailable" }, { status: 503 });

  const { data, error } = await sb
    .from("events")
    .select("*")
    .order("starts_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const sb = createServiceRoleClient();
  if (!sb) return NextResponse.json({ error: "service_unavailable" }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { data, error } = await sb
    .from("events")
    .insert(sanitizeEventInput(body))
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

function sanitizeEventInput(raw: Record<string, unknown>) {
  return {
    slug: String(raw.slug ?? ""),
    title: String(raw.title ?? ""),
    description: String(raw.description ?? ""),
    starts_at: String(raw.starts_at ?? ""),
    ends_at: String(raw.ends_at ?? ""),
    timezone: String(raw.timezone ?? "America/Managua"),
    location_type: raw.location_type === "venue" ? "venue" : "online",
    venue_address: raw.venue_address ? String(raw.venue_address) : null,
    meet_url: raw.meet_url ? String(raw.meet_url) : null,
    cover_image_url: raw.cover_image_url ? String(raw.cover_image_url) : null,
    host_display_name: String(raw.host_display_name || "Founders Club"),
    host_bio: raw.host_bio ? String(raw.host_bio) : null,
    host_image_url: raw.host_image_url ? String(raw.host_image_url) : null,
    capacity: raw.capacity != null && raw.capacity !== "" ? Number(raw.capacity) : null,
    waitlist_enabled: Boolean(raw.waitlist_enabled),
    is_published: Boolean(raw.is_published),
    price_cents: Number(raw.price_cents ?? 0),
    stripe_price_id: raw.stripe_price_id ? String(raw.stripe_price_id) : null,
  };
}
