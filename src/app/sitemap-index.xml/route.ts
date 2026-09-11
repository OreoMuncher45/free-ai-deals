import { SITE_URL } from "@/data/providers";

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>${SITE_URL}/sitemap.xml</loc></sitemap>\n  <sitemap><loc>${SITE_URL}/providers/sitemap.xml</loc></sitemap>\n  <sitemap><loc>${SITE_URL}/models/sitemap.xml</loc></sitemap>\n  <sitemap><loc>${SITE_URL}/promos/sitemap.xml</loc></sitemap>\n</sitemapindex>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
