import type { MetadataRoute } from "next";
import { models } from "@/data/models";
import { SITE_URL } from "@/data/providers";

// Dynamic: hourly revalidation from live data.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return models.map((m) => ({
    url: `${SITE_URL}/models/${m.slug}`,
    lastModified: new Date(m.lastChecked),
    changeFrequency: "daily",
    priority: 0.85,
  }));
}
