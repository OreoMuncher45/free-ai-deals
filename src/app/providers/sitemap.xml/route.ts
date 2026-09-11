import { providers, SITE_URL } from "@/data/providers";
import { REVALIDATE_SECONDS, sitemapXml, xmlResponse } from "@/lib/sitemaps";

export const revalidate = 3600;

export async function GET() {
  return xmlResponse(
    sitemapXml(
      providers.map((p) => ({
        loc: `${SITE_URL}/providers/${p.slug}`,
        lastmod: p.lastChecked,
        changefreq: "daily" as const,
        priority: p.tier === "free" ? 0.8 : 0.7,
      }))
    )
  );
}
