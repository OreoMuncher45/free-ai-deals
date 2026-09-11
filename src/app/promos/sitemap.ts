import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/providers";

// Dynamic: hourly revalidation.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    { url: `${SITE_URL}/promos`, lastModified: new Date("2026-09-11"), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/promos/1-dollar-deals`, lastModified: new Date("2026-09-11"), changeFrequency: "daily", priority: 0.9 },
  ];
}
