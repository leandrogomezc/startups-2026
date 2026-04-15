import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { LocaleHtmlLang } from "@/components/locale-html-lang";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const base = new URL(siteUrl);

  return {
    metadataBase: base,
    alternates: {
      languages: {
        es: "/",
        en: "/en",
      },
    },
    title: {
      default: t("title"),
      template: "%s · Founders Club",
    },
    description: t("description"),
    keywords: [
      "Founders Club",
      "Leandro Gómez Cano",
      "operations",
      "startups",
      "product",
      "artificial intelligence",
      "build in public",
      "Latam",
      "tizo",
    ],
    authors: [{ name: "Founders Club" }],
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_NI" : "en_US",
      url: siteUrl,
      siteName: "Founders Club",
      title: t("title"),
      description: t("ogDescription"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("twitterDescription"),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LocaleHtmlLang />
      {children}
    </NextIntlClientProvider>
  );
}
