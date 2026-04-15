"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import type { RegistrationRow } from "@/lib/events/types";

type Props = { eventId: string };

export function AdminRegistrations({ eventId }: Props) {
  const t = useTranslations("Events");
  const [regs, setRegs] = useState<RegistrationRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/events/${eventId}/registrations`)
      .then((r) => r.json())
      .then((d) => setRegs(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [eventId]);

  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground">{t("adminRegistrations")}</h2>

      {loading ? (
        <div className="mt-4 flex justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : regs.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">{t("adminNoRegistrations")}</p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/50 text-left">
              <tr>
                <th className="px-3 py-2 font-medium text-muted-foreground">Name</th>
                <th className="px-3 py-2 font-medium text-muted-foreground">Email</th>
                <th className="px-3 py-2 font-medium text-muted-foreground">Status</th>
                <th className="px-3 py-2 font-medium text-muted-foreground">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {regs.map((r) => (
                <tr key={r.id}>
                  <td className="px-3 py-2 text-foreground">{r.name}</td>
                  <td className="px-3 py-2 text-muted-foreground">{r.email}</td>
                  <td className="px-3 py-2">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">{r.payment_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    waitlist: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    pending_payment: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  };
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${colors[status] ?? "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  );
}
