"use client";

import { Plus, Pencil, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { EventRow } from "@/lib/events/types";
import { formatShortDate } from "@/lib/events/format";

type Props = { locale: string };

export function AdminDashboard({ locale }: Props) {
  const t = useTranslations("Events");
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/events")
      .then((r) => r.json())
      .then((d) => setEvents(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground">{t("adminDashboard")}</h1>
        <Link href="/events/admin/new">
          <Button className="gap-1.5">
            <Plus className="h-4 w-4" aria-hidden />
            {t("adminNewEvent")}
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="mt-8 flex justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : events.length === 0 ? (
        <p className="mt-8 text-center text-muted-foreground">{t("noEventsYet")}</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/50 text-left">
              <tr>
                <th className="px-4 py-3 font-medium text-muted-foreground">{t("adminFieldTitle")}</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">{t("adminFieldStartsAt")}</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">{t("adminFieldPublished")}</th>
                <th className="px-4 py-3 font-medium text-muted-foreground" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {events.map((ev) => (
                <tr key={ev.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">{ev.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatShortDate(ev.starts_at, ev.timezone, locale)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block h-2 w-2 rounded-full ${ev.is_published ? "bg-emerald-500" : "bg-amber-400"}`} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/events/admin/${ev.id}`} className="inline-flex items-center gap-1 text-primary hover:underline">
                      <Pencil className="h-3.5 w-3.5" />
                      {t("adminEditEvent")}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
