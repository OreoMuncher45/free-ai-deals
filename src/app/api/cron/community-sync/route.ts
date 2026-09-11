import snapshot from "@/data/community-snapshot.json";
import { fetchCommunity, type CommunitySync } from "@/lib/community-sync";

// Cron worker: GET /api/cron/community-sync
// Vercel cron hits this on schedule; it re-fetches the community wiki,
// diffs live entries against the checked-in snapshot, and returns the
// drift. Promotion to full provider pages stays a conscious edit —
// see /sources/community-index and the dev console.
export const revalidate = 0;

function key(e: { url: string }) {
  return e.url.replace(/\/$/, "").toLowerCase();
}

export async function GET(req: Request) {
  const required = process.env.CRON_SECRET;
  if (required) {
    const got = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
    if (got !== required) {
      return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
  }
  const live: CommunitySync = await fetchCommunity();
  const snapUrls = new Set(
    Object.values(snapshot.sections as Record<string, { url: string }[]>)
      .flat()
      .map(key)
  );
  const liveEntries = Object.values(live.sections).flat();
  const added = live.parseOk ? liveEntries.filter((e) => !snapUrls.has(key(e))) : [];
  const liveUrls = new Set(liveEntries.map(key));
  const removed = live.parseOk
    ? Object.entries(snapshot.sections as Record<string, { url: string; name: string }[]>).flatMap(
        ([section, arr]) =>
          arr.filter((e) => !liveUrls.has(key(e))).map((e) => ({ ...e, section }))
      )
    : [];

  return Response.json({
    ok: live.parseOk,
    fetchedAt: live.fetchedAt,
    source: live.source,
    error: live.error ?? null,
    counts: Object.fromEntries(
      Object.entries(live.sections).map(([k, v]) => [k, v.length])
    ),
    added,
    removed,
    note: added.length
      ? "New community entries — review, then add to providers.ts / models.ts and update the snapshot."
      : "No drift vs snapshot.",
  });
}
