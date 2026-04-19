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
    title: "Clases de Inteligencia Artificial en Línea en Nicaragua",
    description:
      "Programa práctico de IA para founders y equipos en Nicaragua: de la idea al producto publicado, con sesiones en línea y acompañamiento aplicado.",
    alternates: localeAlternates(locale, "/clases", "/classes"),
    openGraph: {
      title: "Clases de Inteligencia Artificial en Línea en Nicaragua",
      description:
        "Formación aplicada para founders y operadores en Nicaragua y Centroamérica: construí y lanzá productos con IA.",
      url: new URL(path, `${base}/`).toString(),
    },
  };
}

export default async function ClasesPage({ params }: Props) {
  const { locale } = await params;
  if (locale === "en") {
    redirect("/en/classes");
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
