import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-session";
import { getEventCoversBucket } from "@/lib/event-cover-storage";
import { createServiceRoleClient } from "@/lib/supabase-service";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

/**
 * POST /api/admin/event-cover — multipart/form-data field "file".
 * Auth: same admin cookie as other /api/admin/* routes.
 */
export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const sb = createServiceRoleClient();
  if (!sb) {
    return NextResponse.json({ error: "service_unavailable" }, { status: 503 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!file || typeof file === "string" || !("arrayBuffer" in file)) {
    return NextResponse.json({ error: "missing_file" }, { status: 400 });
  }

  const blob = file as File;
  const mime = blob.type;
  const ext = ALLOWED_TYPES[mime];
  if (!ext) {
    return NextResponse.json({ error: "invalid_file_type" }, { status: 400 });
  }

  if (blob.size > MAX_BYTES) {
    return NextResponse.json({ error: "file_too_large" }, { status: 400 });
  }

  const buf = Buffer.from(await blob.arrayBuffer());
  const bucket = getEventCoversBucket();
  const path = `covers/${randomUUID()}.${ext}`;

  const { data, error } = await sb.storage.from(bucket).upload(path, buf, {
    contentType: mime,
    upsert: false,
  });

  if (error) {
    console.error("[event-cover] storage upload failed:", error.message);
    return NextResponse.json({ error: "upload_failed" }, { status: 502 });
  }

  const { data: urlData } = sb.storage.from(bucket).getPublicUrl(data.path);
  const url = urlData.publicUrl;

  return NextResponse.json({ url });
}
