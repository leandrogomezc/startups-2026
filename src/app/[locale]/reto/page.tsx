import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { Challenge } from "@/components/landing/Challenge";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Roadmap } from "@/components/landing/Roadmap";
import { getSiteBaseUrl } from "@/lib/site-url";
import { localeAlternates } from "@/lib/seo-paths";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "RetoPage" });
  const base = getSiteBaseUrl();
  const path = locale === "en" ? "/en/challenge" : "/reto";
  return {
    title: t("title"),
    description: t("description"),
    alternates: localeAlternates(locale, "/reto", "/challenge"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: new URL(path, `${base}/`).toString(),
    },
  };
}

export default async function RetoPage({ params }: Props) {
  const { locale } = await params;
  if (locale === "en") {
    redirect("/en/challenge");
  }
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main className="flex-1">
        <Challenge />
        <Roadmap />
      </main>
      <Footer />
    </>
  );
}
