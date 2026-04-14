import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Challenge } from "@/components/landing/Challenge";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Roadmap } from "@/components/landing/Roadmap";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "RetoPage" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RetoPage({ params }: Props) {
  const { locale } = await params;
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
