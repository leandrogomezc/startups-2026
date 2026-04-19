import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { EventDetail } from "@/components/events/EventDetail";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getEventBySlug } from "@/lib/events/queries";
import { getSiteBaseUrl } from "@/lib/site-url";
import { localeAlternates } from "@/lib/seo-paths";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = await getEventBySlug(slug).catch(() => null);
  if (!event) return {};

  const base = getSiteBaseUrl();
  const path = locale === "en" ? `/en/events/${slug}` : `/events/${slug}`;

  return {
    title: event.title,
    description: event.description.slice(0, 160),
    alternates: localeAlternates(locale, `/events/${slug}`, `/events/${slug}`),
    openGraph: {
      title: event.title,
      description: event.description.slice(0, 160),
      url: new URL(path, `${base}/`).toString(),
      ...(event.cover_image_url ? { images: [{ url: event.cover_image_url }] } : {}),
    },
  };
}

export default async function EventSlugPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  let event: Awaited<ReturnType<typeof getEventBySlug>> = null;
  try {
    event = await getEventBySlug(slug);
  } catch {
    // Supabase not configured
  }

  if (!event) notFound();

  const t = await getTranslations({ locale, namespace: "Events" });
  const base = getSiteBaseUrl();
  const pageUrl = locale === "en" ? `${base}/en/events/${slug}` : `${base}/events/${slug}`;
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    eventAttendanceMode:
      event.location_type === "online"
        ? "https://schema.org/OnlineEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
    startDate: event.starts_at,
    endDate: event.ends_at,
    eventStatus: "https://schema.org/EventScheduled",
    url: pageUrl,
    organizer: {
      "@type": "Organization",
      name: "Founders Club",
      url: base,
    },
    location:
      event.location_type === "online"
        ? {
            "@type": "VirtualLocation",
            url: event.meet_url || pageUrl,
          }
        : {
            "@type": "Place",
            name: event.title,
            address: event.venue_address || "Nicaragua",
          },
    image: event.cover_image_url ? [event.cover_image_url] : undefined,
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
        <Section>
          <Container>
            <EventDetail event={event} locale={locale} backLabel={t("backToEvents")} />
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
