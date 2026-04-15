import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { isAdminAuthenticated } from "@/lib/admin-session";
import { EventForm } from "@/components/events/admin/EventForm";

type Props = { params: Promise<{ locale: string }> };

export default async function NewEventPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!(await isAdminAuthenticated())) {
    redirect("/events/admin");
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <Section>
          <Container>
            <EventForm locale={locale} />
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
