import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-session";
import { createServiceRoleClient } from "@/lib/supabase-service";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const sb = createServiceRoleClient();
  if (!sb) return NextResponse.json({ error: "service_unavailable" }, { status: 503 });

  const { data, error } = await sb.from("events").select("*").eq("id", id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

export async function PATCH(request: Request, ctx: Ctx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const sb = createServiceRoleClient();
  if (!sb) return NextResponse.json({ error: "service_unavailable" }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  const fields = [
    "slug", "title", "description", "starts_at", "ends_at", "timezone",
    "location_type", "venue_address", "meet_url", "cover_image_url",
    "host_display_name", "host_bio", "host_image_url",
    "capacity", "waitlist_enabled", "is_published", "price_cents", "stripe_price_id",
  ] as const;

  for (const f of fields) {
    if (f in body) {
      if (f === "capacity") {
        update[f] = body[f] != null && body[f] !== "" ? Number(body[f]) : null;
      } else if (f === "waitlist_enabled" || f === "is_published") {
        update[f] = Boolean(body[f]);
      } else if (f === "price_cents") {
        update[f] = Number(body[f] ?? 0);
      } else if (["venue_address", "meet_url", "cover_image_url", "host_bio", "host_image_url", "stripe_price_id"].includes(f)) {
        update[f] = body[f] ? String(body[f]) : null;
      } else {
        update[f] = String(body[f] ?? "");
      }
    }
  }

  const { data, error } = await sb.from("events").update(update).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_req: Request, ctx: Ctx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const sb = createServiceRoleClient();
  if (!sb) return NextResponse.json({ error: "service_unavailable" }, { status: 503 });

  const { error } = await sb.from("events").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
