import { SITE_URL } from "@/data/providers";
import { REVALIDATE_SECONDS, sitemapXml, xmlResponse } from "@/lib/sitemaps";

export const revalidate = 3600;

export async function GET() {
  const day = "2026-09-11T00:00:00.000Z";
  return xmlResponse(
    sitemapXml([
      { loc: `${SITE_URL}/promos`, lastmod: day, changefreq: "daily", priority: 0.9 },
      { loc: `${SITE_URL}/promos/1-dollar-deals`, lastmod: day, changefreq: "daily", priority: 0.9 },
    ])
  );
}
