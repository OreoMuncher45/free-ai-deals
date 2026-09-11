import snapshot from "@/data/fmhy-snapshot.json";
import { fetchFmhy } from "@/lib/fmhy";
import { SITE_URL } from "@/data/providers";
import type { Metadata } from "next";

export const revalidate = 21600; // refresh from FMHY every 6h

export const metadata: Metadata = {
  title: "FMHY free AI mirror — multi-model chats, official studios",
  description:
    "Auto-synced mirror of FMHY's free AI list: multi-model chat sites, official model studios, agents. Refreshed every 6 hours. Verify ToS before use.",
  alternates: { canonical: `${SITE_URL}/sources/fmhy` },
};

export default async function FmhyPage() {
  const live = await fetchFmhy().catch(() => null);
  const data = live && live.parseOk ? live : { ...snapshot, fetchedAt: (snapshot as { fetchedAt: string }).fetchedAt };
  const sections = Object.entries(data.sections as Record<string, { name: string; url: string; note: string }[]>);
  const total = sections.reduce((n, [, arr]) => n + arr.length, 0);

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-10">
      <nav aria-label="Back" className="flex flex-wrap gap-2 font-mono text-[12px]">
        <a href="/" className="rounded-full border border-[#1c2534] bg-[#0c111b] px-4 py-2.5 text-white hover:border-[#ff4d00]">⌂ Home</a>
        <a href="/providers" className="rounded-full border border-[#1c2534] bg-[#0c111b] px-4 py-2.5 text-white hover:border-[#ff4d00]">← Providers</a>
      </nav>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff4d00]">
        Sources / FMHY · auto-sync · {total} entries
      </p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-white md:text-5xl">
        FMHY free AI, mirrored + checked.
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-[#8b98ad]">
        This page re-copies{" "}
        <a className="text-[#00e5a0] hover:underline" href="https://fmhy.pages.dev/ai" target="_blank" rel="noreferrer">
          FMHY&apos;s AI wiki ↗
        </a>{" "}
        every 6 hours via cron. Mostly <strong className="text-white">chat frontends, not APIs</strong> — still the best hunting ground for new free routes and bridges. Synced {data.fetchedAt.slice(0, 10)}. Community wiki: verify each site&apos;s ToS yourself.
      </p>

      {sections.map(([section, arr]) => (
        <section key={section} className="mt-8">
          <h2 className="border-b-2 border-[#ff4d00] pb-2 text-xl font-black text-white">
            {section} ({arr.length})
          </h2>
          <div className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-[#1c2534] bg-[#1c2534] sm:grid-cols-2">
            {arr.map((e) => (
              <article key={e.url} className="bg-[#0c111b] p-4">
                <h3 className="font-black text-white">
                  <a href={e.url} target="_blank" rel="noreferrer" className="hover:text-[#ff4d00] hover:underline">
                    {e.name} ↗
                  </a>
                </h3>
                <p className="mt-1 text-sm text-[#8b98ad]">{e.note || "See site for current limits."}</p>
              </article>
            ))}
          </div>
        </section>
      ))}

      <div className="mt-10 flex flex-col gap-2 border-t border-[#1c2534] pt-6 font-mono text-[12px] sm:flex-row">
        <a href="/" className="rounded-full border border-[#1c2534] px-4 py-3.5 text-center text-white hover:border-[#ff4d00]">⌂ Back to homepage</a>
        <a href="/dev" className="rounded-full border border-[#1c2534] px-4 py-3.5 text-center text-white hover:border-[#ff4d00]">Sync status in dev →</a>
      </div>
    </main>
  );
}
