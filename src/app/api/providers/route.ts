import { providers, LAST_CRAWL, SITE_URL } from "@/data/providers";
import { models } from "@/data/models";

export async function GET() {
  return Response.json({
    updated: LAST_CRAWL,
    site: SITE_URL,
    policy: "directory-only, no keys issued or stored",
    counts: { providers: providers.length, models: models.length },
    providers: providers.map((p) => ({
      slug: p.slug,
      name: p.name,
      tier: p.tier,
      tierLabel: p.tierLabel,
      status: p.status,
      lastChecked: p.lastChecked,
      page: `${SITE_URL}/providers/${p.slug}`,
      baseUrl: p.baseUrl,
      signupUrl: p.signupUrl,
      docsUrl: p.docsUrl,
      freeAllowance: p.freeAllowance,
      models: p.models.map((m) => m.id),
    })),
    models: models.map((m) => ({
      slug: m.slug,
      name: m.name,
      aliases: m.aliases,
      status: m.status,
      lastChecked: m.lastChecked,
      page: `${SITE_URL}/models/${m.slug}`,
    })),
    sitemapIndex: `${SITE_URL}/sitemap-index.xml`,
    llms: `${SITE_URL}/llms.txt`,
  });
}
