export function localeCanonicalPath(locale: string, esPath: string, enPath: string): string {
  return locale === "en" ? `/en${enPath}` : esPath;
}

export function localeAlternates(
  locale: string,
  esPath: string,
  enPath: string,
): {
  canonical: string;
  languages: Record<string, string>;
} {
  return {
    canonical: localeCanonicalPath(locale, esPath, enPath),
    languages: {
      es: esPath,
      en: `/en${enPath}`,
      "x-default": esPath,
    },
  };
}
