import { setRequestLocale } from "next-intl/server";
import { Classes } from "@/components/landing/Classes";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ClassesPage({ params }: Props) {
  const { locale } = await params;
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
