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
    title: "Incubadora para Founders en Nicaragua y Centroamérica",
    description:
      "Comunidad-incubadora para founders: acompañamiento, accountability y ejecución con IA para lanzar y escalar startups en Nicaragua y Centroamérica.",
    alternates: localeAlternates(locale, "/comunidad", "/community"),
    openGraph: {
      title: "Incubadora para Founders en Nicaragua y Centroamérica",
      description:
        "Sumate a la incubadora de Founders Club para construir con feedback, comunidad y foco en resultados reales.",
      url: new URL(path, `${base}/`).toString(),
    },
  };
}

export default async function ComunidadPage({ params }: Props) {
  const { locale } = await params;
  if (locale === "en") {
    redirect("/en/community");
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
