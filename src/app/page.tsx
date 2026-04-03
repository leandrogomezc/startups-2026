import { About } from "@/components/landing/About";
import { Challenge } from "@/components/landing/Challenge";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Learnings } from "@/components/landing/Learnings";
import { Roadmap } from "@/components/landing/Roadmap";
import { Thesis } from "@/components/landing/Thesis";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Challenge />
        <Roadmap />
        <Learnings />
        <Thesis />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
