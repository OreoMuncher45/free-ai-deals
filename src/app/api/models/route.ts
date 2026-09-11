import { models } from "@/data/models";
import { LAST_CRAWL, SITE_URL } from "@/data/providers";

export async function GET() {
  return Response.json({
    updated: LAST_CRAWL,
    count: models.length,
    models: models.map((m) => ({
      ...m,
      page: `${SITE_URL}/models/${m.slug}`,
    })),
  });
}
