import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ClassesTeaser } from "@/components/landing/ClassesTeaser";
import { ContactSection } from "@/components/landing/ContactSection";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";
import { ForWho } from "@/components/landing/ForWho";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { getSiteBaseUrl } from "@/lib/site-url";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const base = getSiteBaseUrl();
  const path = locale === "en" ? "/en" : "/";
  const canonicalUrl = new URL(path, `${base}/`).toString();

  return {
    alternates: { canonical: path },
    openGraph: { url: canonicalUrl },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ForWho />
        <ClassesTeaser locale={locale} />
        <FAQ />
        <ContactSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
