import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { ProjectDetail } from "@/components/landing/ProjectDetail";
import { routing } from "@/i18n/routing";
import { findRoadmapItemBySlug, getRoadmapSlugs } from "@/lib/roadmap-slugs";
import type { RoadmapItemMsg } from "@/lib/roadmap-types";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  const slugs = getRoadmapSlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "Roadmap" });
  const items = t.raw("items") as RoadmapItemMsg[];
  const project = findRoadmapItemBySlug(items, slug);
  if (!project) {
    return { title: "404" };
  }
  return {
    title: project.productName,
    description: project.description,
  };
}

export default async function ProyectoPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Roadmap");
  const items = t.raw("items") as RoadmapItemMsg[];
  const project = findRoadmapItemBySlug(items, slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <ProjectDetail project={project} />
      </main>
      <Footer />
    </>
  );
}
