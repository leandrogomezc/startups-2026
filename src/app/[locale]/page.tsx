import { setRequestLocale } from "next-intl/server";
import { ClassesTeaser } from "@/components/landing/ClassesTeaser";
import { ContactSection } from "@/components/landing/ContactSection";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";
import { ForWho } from "@/components/landing/ForWho";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";

type Props = {
  params: Promise<{ locale: string }>;
};

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
