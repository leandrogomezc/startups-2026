import { setRequestLocale } from "next-intl/server";
import { Challenge } from "@/components/landing/Challenge";
import { Classes } from "@/components/landing/Classes";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";
import { ForWho } from "@/components/landing/ForWho";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Roadmap } from "@/components/landing/Roadmap";
import { Thesis } from "@/components/landing/Thesis";

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
        <Challenge />
        <Roadmap />
        <Classes />
        <Thesis />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
