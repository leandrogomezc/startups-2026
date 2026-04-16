"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { EventRow } from "@/lib/events/types";

const COVER_MAX_BYTES = 5 * 1024 * 1024;
const COVER_ACCEPT_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"] as const;

const inputClassName =
  "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60";

type Props = {
  event?: EventRow;
  locale: string;
};

function toLocalDatetime(iso: string | undefined) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function EventForm({ event, locale }: Props) {
  const t = useTranslations("Events");
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /** Saved or uploaded public URL; also used when user pastes a URL manually. */
  const [coverImageUrl, setCoverImageUrl] = useState(event?.cover_image_url ?? "");
  const [coverUploading, setCoverUploading] = useState(false);
  const [coverError, setCoverError] = useState<string | null>(null);
  /** Temporary preview while uploading (revoked on success/unmount). */
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);
  const isEdit = !!event;

  useEffect(() => {
    return () => {
      if (localPreviewUrl) URL.revokeObjectURL(localPreviewUrl);
    };
  }, [localPreviewUrl]);

  async function handleCoverFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    setCoverError(null);
    if (!file) return;

    if (!COVER_ACCEPT_TYPES.includes(file.type as (typeof COVER_ACCEPT_TYPES)[number])) {
      setCoverError(t("adminCoverInvalidType"));
      return;
    }
    if (file.size > COVER_MAX_BYTES) {
      setCoverError(t("adminCoverTooLarge"));
      return;
    }

    const prevBlob = localPreviewUrl;
    const objectUrl = URL.createObjectURL(file);
    setLocalPreviewUrl(objectUrl);
    if (prevBlob) URL.revokeObjectURL(prevBlob);

    setCoverUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/event-cover", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        setCoverError(
          data.error === "invalid_file_type"
            ? t("adminCoverInvalidType")
            : data.error === "file_too_large"
              ? t("adminCoverTooLarge")
              : t("adminCoverUploadError"),
        );
        setLocalPreviewUrl(null);
        URL.revokeObjectURL(objectUrl);
        return;
      }

      setCoverImageUrl(data.url);
      setLocalPreviewUrl(null);
      URL.revokeObjectURL(objectUrl);
    } catch {
      setCoverError(t("adminCoverUploadError"));
      setLocalPreviewUrl(null);
      URL.revokeObjectURL(objectUrl);
    } finally {
      setCoverUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    const fd = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = {
      title: fd.get("title"),
      slug: fd.get("slug"),
      description: fd.get("description"),
      starts_at: fd.get("starts_at") ? new Date(String(fd.get("starts_at"))).toISOString() : "",
      ends_at: fd.get("ends_at") ? new Date(String(fd.get("ends_at"))).toISOString() : "",
      timezone: fd.get("timezone"),
      location_type: fd.get("location_type"),
      venue_address: fd.get("venue_address") || null,
      meet_url: fd.get("meet_url") || null,
      cover_image_url: coverImageUrl.trim() || null,
      host_display_name: fd.get("host_display_name") || "Founders Club",
      host_bio: fd.get("host_bio") || null,
      host_image_url: fd.get("host_image_url") || null,
      capacity: fd.get("capacity") ? Number(fd.get("capacity")) : null,
      waitlist_enabled: fd.get("waitlist_enabled") === "on",
      is_published: fd.get("is_published") === "on",
      price_cents: Number(fd.get("price_cents") || 0),
      stripe_price_id: fd.get("stripe_price_id") || null,
    };

    try {
      const url = isEdit ? `/api/admin/events/${event.id}` : "/api/admin/events";
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || t("adminSaveError"));
        setSaving(false);
        return;
      }

      setSuccess(true);
      if (!isEdit) {
        const data = await res.json();
        router.push(`/events/admin/${data.id}`);
      }
    } catch {
      setError(t("adminSaveError"));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!event || !confirm(t("adminDeleteConfirm"))) return;
    const res = await fetch(`/api/admin/events/${event.id}`, { method: "DELETE" });
    if (res.ok) router.push("/events/admin");
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-5">
      <h1 className="font-display text-2xl font-bold text-foreground">
        {isEdit ? t("adminEditEvent") : t("adminNewEvent")}
      </h1>

      {error && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      {success && (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300">
          {t("adminSaveSuccess")}
        </p>
      )}

      <Field label={t("adminFieldTitle")}>
        <input name="title" defaultValue={event?.title} required className={inputClassName} />
      </Field>

      <Field label={t("adminFieldSlug")}>
        <input name="slug" defaultValue={event?.slug} required pattern="[a-z0-9-]+" className={inputClassName} />
      </Field>

      <Field label={t("adminFieldDescription")}>
        <textarea name="description" defaultValue={event?.description} rows={5} className={`${inputClassName} resize-y`} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("adminFieldStartsAt")}>
          <input name="starts_at" type="datetime-local" defaultValue={toLocalDatetime(event?.starts_at)} required className={inputClassName} />
        </Field>
        <Field label={t("adminFieldEndsAt")}>
          <input name="ends_at" type="datetime-local" defaultValue={toLocalDatetime(event?.ends_at)} required className={inputClassName} />
        </Field>
      </div>

      <Field label={t("adminFieldTimezone")}>
        <input name="timezone" defaultValue={event?.timezone ?? "America/Managua"} className={inputClassName} />
      </Field>

      <Field label={t("adminFieldLocationType")}>
        <select name="location_type" defaultValue={event?.location_type ?? "online"} className={inputClassName}>
          <option value="online">Online</option>
          <option value="venue">Venue</option>
        </select>
      </Field>

      <Field label={t("adminFieldVenueAddress")}>
        <input name="venue_address" defaultValue={event?.venue_address ?? ""} className={inputClassName} />
      </Field>

      <Field label={t("adminFieldMeetUrl")}>
        <input name="meet_url" defaultValue={event?.meet_url ?? ""} className={inputClassName} />
      </Field>

      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">{t("adminFieldCoverImage")}</label>
        <p className="mb-2 text-xs text-muted-foreground">{t("adminCoverChooseFile")}</p>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="file"
            accept={COVER_ACCEPT_TYPES.join(",")}
            className="text-sm text-foreground file:mr-2 file:rounded-md file:border file:border-border file:bg-background file:px-3 file:py-1.5 file:text-sm file:font-medium"
            disabled={coverUploading || saving}
            onChange={handleCoverFileChange}
            aria-label={t("adminCoverChooseFile")}
          />
          {coverUploading ? <span className="text-sm text-muted-foreground">{t("adminCoverUploading")}</span> : null}
        </div>
        {(localPreviewUrl || coverImageUrl) && (
          <div className="mt-3 overflow-hidden rounded-lg border border-border bg-muted/30">
            {/* eslint-disable-next-line @next/next/no-img-element -- admin preview; arbitrary user/storage URLs */}
            <img
              src={localPreviewUrl ?? coverImageUrl}
              alt=""
              className="max-h-48 w-full object-cover"
            />
          </div>
        )}
        {coverError ? (
          <p className="mt-2 text-sm text-destructive" role="alert">
            {coverError}
          </p>
        ) : null}
        <p className="mb-1 mt-4 text-xs font-medium text-muted-foreground">{t("adminCoverUrlOptional")}</p>
        <input
          type="url"
          name="cover_image_url_manual"
          value={coverImageUrl}
          onChange={(e) => {
            setCoverError(null);
            setCoverImageUrl(e.target.value);
          }}
          className={inputClassName}
          placeholder="https://"
          disabled={saving}
        />
      </div>

      <Field label={t("adminFieldHostName")}>
        <input name="host_display_name" defaultValue={event?.host_display_name ?? "Founders Club"} className={inputClassName} />
      </Field>

      <Field label={t("adminFieldHostBio")}>
        <textarea name="host_bio" defaultValue={event?.host_bio ?? ""} rows={2} className={`${inputClassName} resize-y`} />
      </Field>

      <Field label={t("adminFieldHostImage")}>
        <input name="host_image_url" defaultValue={event?.host_image_url ?? ""} className={inputClassName} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("adminFieldCapacity")}>
          <input name="capacity" type="number" min={0} defaultValue={event?.capacity ?? ""} className={inputClassName} />
        </Field>
        <Field label={t("adminFieldPriceCents")}>
          <input name="price_cents" type="number" min={0} defaultValue={event?.price_cents ?? 0} className={inputClassName} />
        </Field>
      </div>

      <Field label={t("adminFieldStripePriceId")}>
        <input name="stripe_price_id" defaultValue={event?.stripe_price_id ?? ""} className={inputClassName} />
      </Field>

      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input name="waitlist_enabled" type="checkbox" defaultChecked={event?.waitlist_enabled} className="h-4 w-4 rounded border-border" />
          {t("adminFieldWaitlist")}
        </label>
        <div className="max-w-md space-y-1.5">
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              name="is_published"
              type="checkbox"
              defaultChecked={event == null ? true : !!event.is_published}
              className="h-4 w-4 rounded border-border"
            />
            {t("adminFieldPublished")}
          </label>
          <p className="text-xs leading-relaxed text-muted-foreground pl-6">{t("adminFieldPublishedHint")}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={saving} className="min-w-[120px]">
          {saving ? t("adminSaving") : t("adminSave")}
        </Button>
        {isEdit && (
          <Button type="button" variant="destructive" onClick={handleDelete}>
            {t("adminDelete")}
          </Button>
        )}
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  );
}
