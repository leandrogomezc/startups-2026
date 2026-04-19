import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getSiteBaseUrl } from "@/lib/site-url";
import { localeAlternates } from "@/lib/seo-paths";

type Props = { params: Promise<{ locale: string }> };

const ES_POSTS = [
  {
    slug: "clases-ia-no-tecnicos-nicaragua",
    title: "Clases de IA para no técnicos en Nicaragua: guía para founders",
    excerpt:
      "Qué aprender primero, qué herramientas usar y cómo pasar de idea a producto en una cohorte en línea de 8 semanas.",
  },
  {
    slug: "ia-emprendedores-nicaragua",
    title: "IA para emprendedores en Nicaragua: casos reales y primeros pasos",
    excerpt:
      "Cómo founders y equipos de operación pueden usar IA para validar, vender y ejecutar más rápido sin equipo técnico completo.",
  },
  {
    slug: "automatizacion-no-code-pymes-centroamerica",
    title: "Automatización no-code para pymes de Centroamérica",
    excerpt:
      "Flujos prácticos con n8n, formularios y CRM para reducir tareas manuales y mejorar tiempos de respuesta.",
  },
  {
    slug: "incubadora-startups-temprana-nicaragua",
    title: "Incubadora de startups tempranas en Nicaragua: cómo elegir bien",
    excerpt:
      "Qué buscar en una incubadora, cómo medir valor real y cómo evitar programas que no aceleran tu ejecución.",
  },
] as const;

const EN_POSTS = [
  {
    slug: "ai-classes-for-non-technical-founders-nicaragua",
    title: "AI classes for non-technical founders in Nicaragua",
    excerpt:
      "A practical path to go from idea to shipped product with an online cohort and hands-on support.",
  },
  {
    slug: "ai-for-entrepreneurs-nicaragua",
    title: "AI for entrepreneurs in Nicaragua: practical starting points",
    excerpt:
      "Where to start with AI workflows for validation, operations, and customer-facing processes.",
  },
  {
    slug: "no-code-automation-for-central-america-smbs",
    title: "No-code automation for Central America SMBs",
    excerpt:
      "Simple automation stacks that help SMB teams save time and improve execution quality.",
  },
  {
    slug: "startup-incubator-early-stage-nicaragua",
    title: "How to evaluate an early-stage startup incubator in Nicaragua",
    excerpt:
      "A checklist to pick incubation support that improves founder execution and decision quality.",
  },
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const base = getSiteBaseUrl();
  const path = locale === "en" ? "/en/resources" : "/recursos";

  return {
    title:
      locale === "en"
        ? "AI resources for founders in Nicaragua and Central America"
        : "Recursos de IA para founders en Nicaragua y Centroamérica",
    description:
      locale === "en"
        ? "Guides and practical resources on AI classes, startup incubation, and execution systems for founders."
        : "Guías prácticas sobre clases de IA, incubación y sistemas de ejecución para founders y equipos.",
    alternates: localeAlternates(locale, "/recursos", "/resources"),
    openGraph: {
      title:
        locale === "en"
          ? "AI resources for founders in Nicaragua and Central America"
          : "Recursos de IA para founders en Nicaragua y Centroamérica",
      description:
        locale === "en"
          ? "Learn AI, automation, and incubation playbooks designed for founder execution."
          : "Aprendé IA, automatización e incubación con enfoque en ejecución real.",
      url: new URL(path, `${base}/`).toString(),
    },
  };
}

export default async function RecursosPage({ params }: Props) {
  const { locale } = await params;
  if (locale === "en") {
    redirect("/en/resources");
  }
  setRequestLocale(locale);

  const title =
    locale === "en"
      ? "Resources to build AI-powered startups"
      : "Recursos para construir startups con IA";
  const lead =
    locale === "en"
      ? "A growing library for founders in Nicaragua and Central America: online AI classes, incubator playbooks, and execution systems."
      : "Biblioteca en crecimiento para founders de Nicaragua y Centroamérica: clases en línea de IA, playbooks de incubadora y sistemas de ejecución.";
  const posts = locale === "en" ? EN_POSTS : ES_POSTS;
  const classesHref = locale === "en" ? "/classes" : "/clases";
  const incubatorHref = locale === "en" ? "/community" : "/comunidad";
  const classesCta = locale === "en" ? "See AI classes" : "Ver clases de IA";
  const incubatorCta = locale === "en" ? "See incubator community" : "Ver comunidad incubadora";
  const readLabel = locale === "en" ? "Read guide" : "Leer guía";

  return (
    <>
      <Header />
      <main className="flex-1">
        <Section>
          <Container>
            <div className="mx-auto max-w-4xl">
              <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{lead}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={classesHref} className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                  {classesCta}
                </Link>
                <Link href={incubatorHref} className="inline-flex rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground">
                  {incubatorCta}
                </Link>
              </div>

              <div className="mt-10 grid gap-4">
                {posts.map((post) => (
                  <article key={post.slug} className="rounded-xl border border-border bg-card p-5">
                    <h2 className="text-xl font-semibold text-foreground">{post.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                    <p className="mt-4 text-sm font-medium text-primary">{readLabel}</p>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
