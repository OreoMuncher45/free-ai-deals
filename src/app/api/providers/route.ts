import { providers, LAST_CRAWL } from "@/data/providers";

export async function GET() {
  return Response.json({
    updated: LAST_CRAWL,
    count: providers.length,
    policy: "directory-only, no keys issued or stored",
    providers: providers.map((p) => ({
      slug: p.slug,
      name: p.name,
      tier: p.tier,
      tierLabel: p.tierLabel,
      status: p.status,
      lastChecked: p.lastChecked,
      baseUrl: p.baseUrl,
      signupUrl: p.signupUrl,
      docsUrl: p.docsUrl,
      freeAllowance: p.freeAllowance,
      models: p.models.map((m) => m.id),
    })),
  });
}
