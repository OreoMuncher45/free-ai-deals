import { promos, providers } from "@/data/providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Promotions — free + $1 AI deals",
  description: "Live AI API promotions: free tiers and $1 deals with expiry, verification steps, official links.",
};

export default function PromosIndex() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff4d00]">Promos · free first</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">Promotions, expiry attached.</h1>
      <p className="mt-3 max-w-2xl text-sm text-[#4a4438]">
        Free tiers on top, $1 deals below. Every card links to the provider page (full limits + verification) and the official claim page. No keys here.
      </p>
      <div className="mt-8 grid gap-px border rule bg-[#e5dfd1] md:grid-cols-2">
        {promos.map((pr, i) => {
          const p = providers.find((x) => x.slug === pr.provider);
          return (
            <article key={pr.slug} className="bg-white p-5">
              <p className="font-mono text-[11px] text-[#4a4438]">{String(i + 1).padStart(2, "0")} · {pr.status}</p>
              <h2 className="mt-1 text-lg font-black">{pr.title}</h2>
              <p className="mt-1 font-mono text-[12px] font-bold text-[#ff4d00]">{pr.deal}</p>
              <p className="mt-2 text-sm">Expiry: {pr.expiry}</p>
              {p && <p className="mt-1 font-mono text-[11px] text-[#4a4438]">Via {p.name} · checked {p.lastChecked.slice(0, 10)}</p>}
              <div className="mt-3 flex gap-2 font-mono text-[11px]">
                {p && <a href={`/providers/${p.slug}`} className="border rule px-2 py-1 hover:bg-[#16130e] hover:text-white">Provider page</a>}
                <a href="/promos/1-dollar-deals" className="bg-[#16130e] px-2 py-1 font-bold text-white hover:bg-[#ff4d00]">$1 deals</a>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
