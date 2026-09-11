import { indexXml, REVALIDATE_SECONDS } from "@/lib/sitemaps";

export const revalidate = 3600;

export async function GET() {
  return new Response(indexXml(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": `public, max-age=${REVALIDATE_SECONDS}, stale-while-revalidate=86400`,
    },
  });
}
