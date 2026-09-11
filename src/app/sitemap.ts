import type { MetadataRoute } from "next";
import { providers, SITE_URL } from "@/data/providers";

// Dynamic: regenerates hourly from data, not frozen at build time.
// When the probe store updates lastChecked, this picks it up on next cycle.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date("2026-09-11"), changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/providers`, lastModified: new Date("2026-09-11"), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/models`, lastModified: new Date("2026-09-11"), changeFrequency: "daily", priority: 0.95 },
    { url: `${SITE_URL}/promos`, lastModified: new Date("2026-09-11"), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/promos/1-dollar-deals`, lastModified: new Date("2026-09-11"), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/dev`, lastModified: new Date("2026-09-11"), changeFrequency: "weekly", priority: 0.3 },
  ];
  return base;
}
