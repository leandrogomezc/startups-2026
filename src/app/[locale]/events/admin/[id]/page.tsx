import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { isAdminAuthenticated } from "@/lib/admin-session";
import { EventForm } from "@/components/events/admin/EventForm";
import { AdminRegistrations } from "@/components/events/admin/AdminRegistrations";
import { createServiceRoleClient } from "@/lib/supabase-service";
import type { EventRow } from "@/lib/events/types";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function EditEventPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  if (!(await isAdminAuthenticated())) {
    redirect("/events/admin");
  }

  const sb = createServiceRoleClient();
  if (!sb) notFound();

  const { data: event } = await sb.from("events").select("*").eq("id", id).single<EventRow>();
  if (!event) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <Section>
          <Container>
            <EventForm event={event} locale={locale} />
            <div className="mx-auto mt-12 max-w-2xl">
              <AdminRegistrations eventId={event.id} />
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
