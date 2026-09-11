import type { MetadataRoute } from "next";
import { providers, SITE_URL } from "@/data/providers";

// Dynamic: hourly revalidation from live data.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return providers.map((p) => ({
    url: `${SITE_URL}/providers/${p.slug}`,
    lastModified: new Date(p.lastChecked),
    changeFrequency: "daily",
    priority: p.tier === "free" ? 0.8 : 0.7,
  }));
}
