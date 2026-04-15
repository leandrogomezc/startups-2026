import type { MetadataRoute } from "next";
import { getSiteBaseUrl } from "@/lib/site-url";
import { createServiceRoleClient } from "@/lib/supabase-service";

const SLUGS_ES = ["/", "/clases", "/comunidad", "/reto", "/events"];
const SLUGS_EN = ["/en", "/en/classes", "/en/community", "/en/challenge", "/en/events"];
const PROJECT_SLUGS = ["peluditos"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteBaseUrl();
  const lastModified = new Date();
  const out: MetadataRoute.Sitemap = [];

  for (const path of SLUGS_ES) {
    out.push({
      url: `${base}${path}`,
      lastModified,
      changeFrequency: path === "/" ? "weekly" : "weekly",
      priority: path === "/" ? 1 : 0.85,
    });
  }
  for (const path of SLUGS_EN) {
    out.push({
      url: `${base}${path}`,
      lastModified,
      changeFrequency: "weekly",
      priority: path === "/en" ? 0.95 : 0.85,
    });
  }
  for (const slug of PROJECT_SLUGS) {
    out.push({
      url: `${base}/proyectos/${slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    });
    out.push({
      url: `${base}/en/proyectos/${slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  // Dynamic event pages
  const sb = createServiceRoleClient();
  if (sb) {
    const { data: events } = await sb
      .from("events")
      .select("slug, updated_at")
      .eq("is_published", true);

    for (const ev of events ?? []) {
      out.push({
        url: `${base}/events/${ev.slug}`,
        lastModified: new Date(ev.updated_at),
        changeFrequency: "weekly",
        priority: 0.7,
      });
      out.push({
        url: `${base}/en/events/${ev.slug}`,
        lastModified: new Date(ev.updated_at),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return out;
}
