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
import { site } from "@/lib/site";
import { localeAlternates } from "@/lib/seo-paths";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const base = getSiteBaseUrl();
  const path = locale === "en" ? "/en" : "/";
  const canonicalUrl = new URL(path, `${base}/`).toString();

  return {
    alternates: localeAlternates(locale, "/", ""),
    openGraph: { url: canonicalUrl },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const base = getSiteBaseUrl();
  const localizedHome = locale === "en" ? `${base}/en` : `${base}/`;

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brandName,
    url: base,
    logo: `${base}${site.logoSrc}`,
    sameAs: [site.instagramUrl],
    areaServed: ["Nicaragua", "Central America"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.brandName,
    url: localizedHome,
    inLanguage: locale,
    potentialAction: {
      "@type": "SearchAction",
      target: `${localizedHome.replace(/\/$/, "")}/recursos?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
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
