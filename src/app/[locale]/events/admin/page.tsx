import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { isAdminAuthenticated } from "@/lib/admin-session";
import { AdminDashboard } from "@/components/events/admin/AdminDashboard";
import { AdminLoginForm } from "@/components/events/admin/AdminLoginForm";

type Props = { params: Promise<{ locale: string }> };

export default async function AdminEventsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const authed = await isAdminAuthenticated();

  return (
    <>
      <Header />
      <main className="flex-1">
        <Section>
          <Container>
            {authed ? <AdminDashboard locale={locale} /> : <AdminLoginForm />}
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
