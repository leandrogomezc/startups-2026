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
    alternates: { canonical: path },
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

  return (
    <>
      <Header />
      <main className="flex-1">
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
