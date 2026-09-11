import type { MetadataRoute } from "next";
import { providers, SITE_URL } from "@/data/providers";

export default function sitemap(): MetadataRoute.Sitemap {
  return providers.map((p) => ({
    url: `${SITE_URL}/providers/${p.slug}`,
    lastModified: new Date(p.lastChecked),
    changeFrequency: "daily",
    priority: p.tier === "free" ? 0.8 : 0.7,
  }));
}
