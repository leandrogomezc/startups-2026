import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Classes } from "@/components/landing/Classes";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { getSiteBaseUrl } from "@/lib/site-url";
import { localeAlternates } from "@/lib/seo-paths";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const base = getSiteBaseUrl();
  const path = locale === "en" ? "/en/classes" : "/clases";

  return {
    title: "Online AI Classes for Founders in Nicaragua",
    description:
      "Hands-on AI classes for founders and operators in Nicaragua and Central America. Go from idea to shipped product in an online cohort.",
    alternates: localeAlternates(locale, "/clases", "/classes"),
    openGraph: {
      title: "Online AI Classes for Founders in Nicaragua",
      description:
        "Practical AI training for founders in Nicaragua and Central America, with a step-by-step path from idea to launch.",
      url: new URL(path, `${base}/`).toString(),
    },
  };
}

export default async function ClassesPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "en") {
    redirect("/clases");
  }
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main className="flex-1">
        <Classes />
      </main>
      <Footer />
    </>
  );
}
