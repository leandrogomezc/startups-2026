import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { CommunityPageContent } from "@/components/landing/CommunityPageContent";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Thesis } from "@/components/landing/Thesis";
import { getSiteBaseUrl } from "@/lib/site-url";
import { localeAlternates } from "@/lib/seo-paths";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const base = getSiteBaseUrl();
  const path = locale === "en" ? "/en/community" : "/comunidad";

  return {
    title: "Startup Incubator Community in Nicaragua",
    description:
      "Founders Club combines incubator support, accountability, and AI-focused execution for founders in Nicaragua and Central America.",
    alternates: localeAlternates(locale, "/comunidad", "/community"),
    openGraph: {
      title: "Startup Incubator Community in Nicaragua",
      description:
        "Join an execution-first founder incubator community to launch and grow with practical support.",
      url: new URL(path, `${base}/`).toString(),
    },
  };
}

export default async function CommunityPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "en") {
    redirect("/comunidad");
  }
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main className="flex-1">
        <CommunityPageContent />
        <Thesis />
      </main>
      <Footer />
    </>
  );
}
