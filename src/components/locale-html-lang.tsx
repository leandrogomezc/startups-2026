"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

/** Sincroniza `lang` en <html> con el locale de la ruta (el root layout no recibe `[locale]`). */
export function LocaleHtmlLang() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
