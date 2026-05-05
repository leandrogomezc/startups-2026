import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { EventsList } from "@/components/events/EventsList";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getPublishedEvents } from "@/lib/events/queries";
import { getSiteBaseUrl } from "@/lib/site-url";
import { localeAlternates } from "@/lib/seo-paths";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Events" });
  const base = getSiteBaseUrl();
  const path = locale === "en" ? "/en/events" : "/events";
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    alternates: localeAlternates(locale, "/events", "/events"),
    openGraph: {
      title: t("pageTitle"),
      description: t("pageDescription"),
      url: new URL(path, `${base}/`).toString(),
      images: [
        {
          url: locale === "en" ? "/en/opengraph-image" : "/opengraph-image",
          width: 1200,
          height: 630,
          alt: t("pageTitle"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("pageTitle"),
      description: t("pageDescription"),
      images: [locale === "en" ? "/en/opengraph-image" : "/opengraph-image"],
    },
  };
}

export default async function EventsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  let events: Awaited<ReturnType<typeof getPublishedEvents>> = [];
  let loadError = false;
  try {
    events = await getPublishedEvents();
  } catch (err) {
    loadError = true;
    if (process.env.NODE_ENV === "development") {
      console.error("[events] getPublishedEvents failed:", err);
    }
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
            <EventsList events={events} locale={locale} loadError={loadError} />
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
