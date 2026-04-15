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

  const { data, error } = await sb
    .from("event_registrations")
    .select("*")
    .eq("event_id", id)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
