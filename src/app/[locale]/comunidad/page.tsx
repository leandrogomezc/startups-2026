import { setRequestLocale } from "next-intl/server";
import { CommunityPageContent } from "@/components/landing/CommunityPageContent";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Thesis } from "@/components/landing/Thesis";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ComunidadPage({ params }: Props) {
  const { locale } = await params;
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
