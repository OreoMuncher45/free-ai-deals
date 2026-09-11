import { promos, providers } from "@/data/providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Promotions — free + $1 AI deals",
  description: "Live AI API promotions: free tiers and $1 deals with expiry, verification steps, official links.",
};

export default function PromosIndex() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-10">
      <a href="/" className="inline-block border border-[#1c2534] bg-[#0c111b] px-3 py-2.5 font-mono text-[12px] text-white hover:border-[#ff4d00]">⌂ Home</a>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff4d00]">Promos · free first</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-white md:text-5xl">Promotions, expiry attached.</h1>
      <p className="mt-3 max-w-2xl text-sm text-[#8b98ad]">
        Free tiers on top, $1 deals below. Every card links to the provider page (full limits + verification) and the official claim page. No keys here.
      </p>
      <div className="mt-8 grid gap-px border border-[#1c2534] bg-[#1c2534] sm:grid-cols-2">
        {promos.map((pr, i) => {
          const p = providers.find((x) => x.slug === pr.provider);
          return (
            <article key={pr.slug} className="bg-[#0c111b] p-5">
              <p className="font-mono text-[11px] text-[#8b98ad]">{String(i + 1).padStart(2, "0")} · {pr.status}</p>
              <h2 className="mt-1 text-lg font-black text-white">{pr.title}</h2>
              <p className="mt-1 font-mono text-[12px] font-bold text-[#ff4d00]">{pr.deal}</p>
              <p className="mt-2 text-sm text-[#e8eef6]">Expiry: {pr.expiry}</p>
              {p && <p className="mt-1 font-mono text-[11px] text-[#8b98ad]">Via {p.name} · checked {p.lastChecked.slice(0, 10)}</p>}
              <div className="mt-3 flex flex-col gap-2 font-mono text-[12px] sm:flex-row">
                {p && <a href={`/providers/${p.slug}`} className="border border-[#1c2534] px-3 py-3 text-center font-bold text-white hover:border-[#ff4d00]">More details →</a>}
                <a href="/promos/1-dollar-deals" className="bg-[#ff4d00] px-3 py-3 text-center font-bold text-white hover:bg-white hover:text-black">$1 deals</a>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
