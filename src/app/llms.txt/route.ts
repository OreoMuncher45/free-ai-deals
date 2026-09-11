import { providers, SITE_URL, LAST_CRAWL } from "@/data/providers";
import { models } from "@/data/models";

// Dynamic llms.txt — always generated from the same data as the pages,
// so LLM agents get the freshest content, not a stale static file.
export async function GET() {
  const lines: string[] = [];
  lines.push(`# FreeModels — every free AI model + $1 promos, verified`);
  lines.push(``);
  lines.push(
    `Lead-only directory (no keys issued, stored, or proxied). Limits checked against official docs, status probed with real API calls. Last crawl: ${LAST_CRAWL}.`
  );
  lines.push(``);
  lines.push(`## Machine index`);
  lines.push(`- Sitemap index: ${SITE_URL}/sitemap-index.xml`);
  lines.push(`- Providers JSON: ${SITE_URL}/api/providers`);
  lines.push(`- Models JSON: ${SITE_URL}/api/models`);
  lines.push(`- Health: ${SITE_URL}/api/health`);
  lines.push(``);
  lines.push(`## Free providers first`);
  for (const p of providers.filter((x) => x.tier === "free")) {
    lines.push(
      `- [${p.name}](${SITE_URL}/providers/${p.slug}): ${p.headline} Allowance: ${p.freeAllowance} Status: ${p.status} (checked ${p.lastChecked.slice(0, 10)}). Official signup: ${p.signupUrl}`
    );
  }
  lines.push(``);
  lines.push(`## $1 deals and trials`);
  for (const p of providers.filter((x) => x.tier === "promo" || x.tier === "trial")) {
    lines.push(
      `- [${p.name}](${SITE_URL}/providers/${p.slug}): ${p.headline} Status: ${p.statusNote} Official: ${p.signupUrl}`
    );
  }
  const dead = providers.filter((x) => x.tier === "dead");
  if (dead.length) {
    lines.push(``);
    lines.push(`## Retired (death-alert proof)`);
    for (const p of dead) {
      lines.push(`- ${p.name}: ${p.statusNote}`);
    }
  }
  lines.push(``);
  lines.push(`## Models — where to use each free or cheapest`);
  for (const m of models) {
    lines.push(
      `- [${m.name}](${SITE_URL}/models/${m.slug}): ${m.statusNote} Aliases: ${m.aliases.join(", ")}. Context ${m.context}, ${m.inputPerM} in / ${m.outputPerM} out.`
    );
    for (const r of m.routes.slice(0, 4)) {
      lines.push(`  - ${r.provider}: ${r.what} — ${r.cost} (${r.verify})`);
    }
  }
  lines.push(``);
  lines.push(`## Promos`);
  lines.push(`- All promos: ${SITE_URL}/promos`);
  lines.push(`- $1 deals ranked: ${SITE_URL}/promos/1-dollar-deals`);
  lines.push(`- FMHY mirror (auto-synced every 6h): ${SITE_URL}/sources/fmhy`);
  lines.push(`- Dev console + freshness ledger: ${SITE_URL}/dev`);
  lines.push(``);
  lines.push(
    `Policy: one account per provider, no reselling, no key sharing. Free tiers change weekly — check the last-checked stamp on each page before big runs.`
  );
  lines.push(``);

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
