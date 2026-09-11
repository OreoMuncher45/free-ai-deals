import { models } from "@/data/models";
import { SITE_URL } from "@/data/providers";
import { REVALIDATE_SECONDS, sitemapXml, xmlResponse } from "@/lib/sitemaps";

export const revalidate = 3600;

export async function GET() {
  return xmlResponse(
    sitemapXml(
      models.map((m) => ({
        loc: `${SITE_URL}/models/${m.slug}`,
        lastmod: m.lastChecked,
        changefreq: "daily" as const,
        priority: 0.85,
      }))
    )
  );
}
