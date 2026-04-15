"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { EventRow } from "@/lib/events/types";

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

  const isEdit = !!event;

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
      cover_image_url: fd.get("cover_image_url") || null,
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

      <Field label={t("adminFieldCoverImage")}>
        <input name="cover_image_url" defaultValue={event?.cover_image_url ?? ""} className={inputClassName} />
      </Field>

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

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input name="waitlist_enabled" type="checkbox" defaultChecked={event?.waitlist_enabled} className="h-4 w-4 rounded border-border" />
          {t("adminFieldWaitlist")}
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input name="is_published" type="checkbox" defaultChecked={event?.is_published} className="h-4 w-4 rounded border-border" />
          {t("adminFieldPublished")}
        </label>
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
