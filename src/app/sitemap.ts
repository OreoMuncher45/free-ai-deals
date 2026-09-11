import type { MetadataRoute } from "next";
import { providers, SITE_URL } from "@/data/providers";

export default function sitemap(): MetadataRoute.Sitemap {
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
