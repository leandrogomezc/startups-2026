"use client";

import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("Common");

  return (
    <div
      className="flex items-center gap-0.5 rounded-lg border border-border bg-muted/40 p-0.5"
      role="group"
      aria-label={t("languageSwitch")}
    >
      <Link
        href="/"
        locale="es"
        className={cn(
          "rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
          locale === "es"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        {t("languageEs")}
      </Link>
      <Link
        href="/"
        locale="en"
        className={cn(
          "rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
          locale === "en"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        {t("languageEn")}
      </Link>
    </div>
  );
}
