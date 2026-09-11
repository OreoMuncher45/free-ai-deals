import { SITE_URL, providers, LAST_CRAWL } from "@/data/providers";
import { models } from "@/data/models";

// Single registry for every child sitemap. The index route builds from
// this, so adding a section = one entry here, no index edits.
// lastmod = freshest lastChecked inside that section → crawlers see
// real data changes, not rebuild times.
export const REVALIDATE_SECONDS = 3600;

export type ChildSitemap = { path: string; lastmod: string };

function maxDate(dates: string[], fallback: string): string {
  let best = fallback;
  for (const d of dates) if (d > best) best = d;
  return best;
}

export function childSitemaps(): ChildSitemap[] {
  return [
    { path: "/sitemap.xml", lastmod: LAST_CRAWL },
    {
      path: "/providers/sitemap.xml",
      lastmod: maxDate(providers.map((p) => p.lastChecked), LAST_CRAWL),
    },
    {
      path: "/models/sitemap.xml",
      lastmod: maxDate(models.map((m) => m.lastChecked), LAST_CRAWL),
    },
    { path: "/promos/sitemap.xml", lastmod: LAST_CRAWL },
  ];
}

export function indexXml(): string {
  const rows = childSitemaps()
    .map(
      (c) =>
        `  <sitemap><loc>${SITE_URL}${c.path}</loc><lastmod>${c.lastmod}</lastmod></sitemap>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</sitemapindex>`;
}
