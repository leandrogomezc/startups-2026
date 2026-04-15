"use client";

import { Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const inputClassName =
  "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60";

export function AdminLoginForm() {
  const t = useTranslations("Events");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const password = String(fd.get("password") ?? "");

    try {
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError(t("adminLoginError"));
        setSubmitting(false);
        return;
      }

      router.refresh();
    } catch {
      setError(t("adminLoginError"));
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="font-display text-2xl font-bold text-foreground">{t("adminLoginTitle")}</h1>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        {error && (
          <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
        <div>
          <label htmlFor="admin-pw" className="mb-1 block text-sm font-medium text-foreground">
            {t("adminPassword")}
          </label>
          <input id="admin-pw" name="password" type="password" required disabled={submitting} className={inputClassName} />
        </div>
        <Button type="submit" className="w-full gap-2" disabled={submitting}>
          <Lock className="h-4 w-4" aria-hidden />
          {t("adminLoginSubmit")}
        </Button>
      </form>
    </div>
  );
}
