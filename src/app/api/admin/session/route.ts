import { NextResponse } from "next/server";
import { getAdminPassword, setAdminCookie, clearAdminCookie } from "@/lib/admin-session";

export async function POST(request: Request) {
  const password = getAdminPassword();
  if (!password) {
    return NextResponse.json({ error: "admin_not_configured" }, { status: 503 });
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const submitted = String(body.password ?? "").trim();
  if (submitted !== password) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  await setAdminCookie(password);
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await clearAdminCookie();
  return NextResponse.json({ ok: true });
}
