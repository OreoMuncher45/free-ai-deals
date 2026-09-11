import { providers, promos, LAST_CRAWL } from "@/data/providers";

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    working: "bg-[#00e5a0] text-black",
    capped: "bg-amber-500 text-black",
    "promo-ended": "bg-zinc-600 text-white",
    retired: "bg-red-700 text-white",
    live: "bg-[#00e5a0] text-black",
    "live-capped": "bg-amber-500 text-black",
  };
  return (
    <span className={`inline-block px-1.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest ${map[status] ?? "bg-zinc-600 text-white"}`}>
      {status}
    </span>
  );
}

function Ticker() {
  const items = providers.map((p) => `${p.name}: ${p.headline}`).join("  ·  ");
  return (
    <div className="overflow-hidden border-b border-[#1c2534] bg-black">
      <div className="ticker-track flex w-max whitespace-nowrap py-2 font-mono text-[11px] uppercase tracking-wider text-[#8b98ad]">
        <span className="pr-8">{items} ·&nbsp;</span>
        <span className="pr-8" aria-hidden>{items} ·&nbsp;</span>
      </div>
    </div>
  );
}

export default function Home() {
  const free = providers.filter((p) => p.tier === "free");
  const deals = providers.filter((p) => p.tier !== "free" && p.tier !== "dead");
  const dead = providers.filter((p) => p.tier === "dead");

  return (
    <main>
      <Ticker />

      {/* hero — terminal broadsheet, dark */}
      <section className="grid-bg border-b border-[#1c2534]">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff4d00]">
            No. 01 — Free AI models, verified {LAST_CRAWL.slice(0, 10)}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black leading-[1.02] tracking-tight text-white md:text-6xl">
            Every free AI model worth using. Nothing dead.
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#8b98ad]">
            We lead you to official free providers and $1 promos — we never
            issue or hold keys. Limits checked against docs, status probed with
            real calls, death alerts kept. Free on top, $1 deals below.
          </p>
          <div className="mt-6 flex flex-col gap-3 font-mono text-[12px] sm:flex-row">
            <a href="/providers" className="bg-[#ff4d00] px-4 py-3.5 text-center font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black">
              Browse {providers.length} providers
            </a>
            <a href="/promos/1-dollar-deals" className="border border-[#1c2534] bg-[#0c111b] px-4 py-3.5 text-center font-bold uppercase tracking-wider text-white hover:border-[#ff4d00]">
              $1 deals ({promos.length})
            </a>
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-px border border-[#1c2534] bg-[#1c2534] font-mono md:grid-cols-4">
            {[
              ["Free providers", String(free.length)],
              ["Free models tracked", "60+"],
              ["$1 promos live", String(deals.length)],
              ["Retired (proof)", String(dead.length)],
            ].map(([k, v]) => (
              <div key={k} className="bg-[#0c111b] px-4 py-3">
                <dt className="text-[10px] uppercase tracking-widest text-[#8b98ad]">{k}</dt>
                <dd className="tnum text-2xl font-black text-white">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FREE ON TOP */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-baseline justify-between border-b-2 border-[#ff4d00] pb-2">
          <h2 className="text-lg font-black tracking-tight text-white md:text-xl">01 · Free, no card on most</h2>
          <a href="/providers" className="min-h-[44px] content-center font-mono text-[12px] uppercase tracking-wider text-[#8b98ad] hover:text-white hover:underline">All →</a>
        </div>
        <div className="mt-6 grid gap-px border border-[#1c2534] bg-[#1c2534] sm:grid-cols-2">
          {free.map((p, i) => (
            <article key={p.slug} className="bg-[#0c111b] p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] text-[#8b98ad]">{String(i + 1).padStart(2, "0")} · {p.tierLabel}</p>
                  {/* title click → details page */}
                  <h3 className="mt-1 text-lg font-black leading-tight text-white">
                    <a href={`/providers/${p.slug}`} className="hover:text-[#ff4d00] hover:underline">{p.name}</a>
                  </h3>
                  <p className="mt-1 text-sm text-[#8b98ad]">{p.tagline}</p>
                </div>
                <StatusPill status={p.status} />
              </div>
              <p className="mt-3 border-l-2 border-[#ff4d00] pl-3 text-sm font-medium leading-snug text-[#e8eef6]">{p.headline}</p>
              <div className="mt-4 flex flex-col gap-2 font-mono text-[12px] sm:flex-row">
                <a href={`/providers/${p.slug}`} className="border border-[#1c2534] px-3 py-3 text-center font-bold uppercase tracking-wider text-white hover:border-[#ff4d00]">More details →</a>
                <a href={p.signupUrl} target="_blank" rel="noreferrer" className="bg-[#ff4d00] px-3 py-3 text-center font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black">Direct signup ↗</a>
              </div>
              <p className="tnum mt-3 font-mono text-[10px] uppercase tracking-wider text-[#8b98ad]">
                Checked {p.lastChecked.slice(0, 10)} · {p.models.length} models listed
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* $1 DEALS */}
      <section className="border-y border-[#1c2534] bg-black">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex items-baseline justify-between border-b-2 border-[#ff4d00] pb-2">
            <h2 className="text-lg font-black tracking-tight text-white md:text-xl">02 · $1 deals & trials</h2>
            <a href="/promos/1-dollar-deals" className="min-h-[44px] content-center font-mono text-[12px] uppercase tracking-wider text-[#8b98ad] hover:text-white hover:underline">All promos →</a>
          </div>
          <div className="mt-6 grid gap-px border border-[#1c2534] bg-[#1c2534] sm:grid-cols-2">
            {deals.map((p) => (
              <article key={p.slug} className="bg-[#0c111b] p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-black text-white">
                    <a href={`/providers/${p.slug}`} className="hover:text-[#ff4d00] hover:underline">{p.name}</a>
                  </h3>
                  <StatusPill status={p.status} />
                </div>
                <p className="mt-1 font-mono text-[12px] font-bold text-[#ff4d00]">{p.tierLabel}</p>
                <p className="mt-2 text-sm leading-snug text-[#e8eef6]">{p.headline}</p>
                <div className="mt-4 flex flex-col gap-2 font-mono text-[12px] sm:flex-row">
                  <a href={`/providers/${p.slug}`} className="border border-[#1c2534] px-3 py-3 text-center font-bold uppercase tracking-wider text-white hover:border-[#ff4d00]">More details →</a>
                  <a href={p.signupUrl} target="_blank" rel="noreferrer" className="bg-[#ff4d00] px-3 py-3 text-center font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black">Direct signup ↗</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {dead.map((p) => (
        <section key={p.slug} className="mx-auto max-w-6xl px-4 py-8">
          <p className="font-mono text-[11px] uppercase tracking-widest text-red-400">
            Retired proof · {p.name} — {p.statusNote}
          </p>
        </section>
      ))}

      <section className="mx-auto max-w-6xl px-4 pb-4">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8b98ad]">What people search</h2>
        <ul className="mt-2 flex flex-wrap gap-2 font-mono text-[11px]">
          {["free ai models", "free ai api", "free llm api", "deepseek free api no card", "qwen coder free api", "openai compatible free api", "$1 ai api"].map((k) => (
            <li key={k} className="border border-[#1c2534] bg-[#0c111b] px-2 py-1.5 text-[#8b98ad]">{k}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
