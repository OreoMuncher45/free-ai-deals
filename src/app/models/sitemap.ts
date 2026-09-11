import type { MetadataRoute } from "next";
import { models } from "@/data/models";
import { SITE_URL } from "@/data/providers";

export default function sitemap(): MetadataRoute.Sitemap {
  return models.map((m) => ({
    url: `${SITE_URL}/models/${m.slug}`,
    lastModified: new Date(m.lastChecked),
    changeFrequency: "daily",
    priority: 0.85,
  }));
}
