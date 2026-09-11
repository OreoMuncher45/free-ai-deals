export type CommunityEntry = {
  name: string;
  url: string;
  note: string;
  section: string;
};

export type CommunitySync = {
  source: string;
  fetchedAt: string;
  sections: Record<string, CommunityEntry[]>;
  parseOk: boolean;
  error?: string;
};

const SOURCE_URL = process.env.COMMUNITY_SOURCE_URL ?? "";

// Sections of the community wiki worth mirroring. Chat frontends are kept
// too — they rank the keywords and some ship bridges.
const WANTED: Record<string, string> = {
  "official-model-sites": "Official model sites",
  "multiple-model-sites": "Multiple model sites",
  "ai-agents": "AI agents",
  "ai-tools": "AI tools",
};

function stripTags(s: string): string {
  return s
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function parseSection(html: string, sectionId: string, label: string): CommunityEntry[] {
  // VitePress renders headings as <h2 id="..." ...> or <h3 id="...">.
  const headRe = new RegExp(`<h[23][^>]*id="${sectionId}"[^>]*>`, "i");
  const head = html.search(headRe);
  if (head < 0) return [];
  const tail = html.slice(head);
  // section ends at the next h2 (h3s belong to the same section)
  const nextH2 = tail.slice(10).search(/<h2[\s>]/i);
  const body = nextH2 < 0 ? tail : tail.slice(0, nextH2 + 10);
  const out: CommunityEntry[] = [];
  for (const li of body.match(/<li[\s\S]*?<\/li>/gi) ?? []) {
    const a = li.match(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i);
    if (!a) continue;
    const url = a[1];
    if (!/^https?:\/\//.test(url) || /reddit\.com|discord\.|github\.com|greasyfork|chromewebstore/i.test(url)) continue;
    const name = stripTags(a[2]);
    if (!name || name.length > 60) continue;
    const note = stripTags(li).slice(0, 160);
    if (out.some((e) => e.url === url)) continue;
    out.push({ name, url, note, section: label });
    if (out.length >= 40) break;
  }
  return out;
}

export async function fetchCommunity(): Promise<CommunitySync> {
  const fetchedAt = new Date().toISOString();
  if (!SOURCE_URL) {
    return { source: "community-snapshot", fetchedAt, sections: {}, parseOk: false, error: "sync source not configured" };
  }
  try {
    const res = await fetch(SOURCE_URL, {
      headers: { "User-Agent": "FreeModels-sync/1.0" },
      next: { revalidate: 21600 },
    });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    const html = await res.text();
    const sections: Record<string, CommunityEntry[]> = {};
    for (const [id, label] of Object.entries(WANTED)) {
      const entries = parseSection(html, id, label);
      if (entries.length) sections[label] = entries;
    }
    const parseOk = Object.keys(sections).length > 0;
    return {
      source: SOURCE_URL,
      fetchedAt,
      sections,
      parseOk,
      ...(parseOk ? {} : { error: "no wanted sections parsed — markup changed?" }),
    };
  } catch (e) {
    return {
      source: SOURCE_URL,
      fetchedAt,
      sections: {},
      parseOk: false,
      error: e instanceof Error ? e.message : "fetch failed",
    };
  }
}
