import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { EventsList } from "@/components/events/EventsList";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getPublishedEvents } from "@/lib/events/queries";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Events" });
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: { canonical: "/events" },
  };
}

export default async function EventsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  let events: Awaited<ReturnType<typeof getPublishedEvents>> = [];
  try {
    events = await getPublishedEvents();
  } catch {
    // Supabase not configured — render empty state
  }

  const t = await getTranslations({ locale, namespace: "Events" });

  return (
    <>
      <Header />
      <main className="flex-1">
        <Section>
          <Container>
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {t("pageTitle")}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {t("pageDescription")}
            </p>
            <EventsList events={events} locale={locale} />
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
