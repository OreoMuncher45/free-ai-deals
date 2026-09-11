import { providers, promos, LAST_CRAWL } from "@/data/providers";

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    working: "bg-emerald-700 text-white",
    capped: "bg-amber-600 text-white",
    "promo-ended": "bg-neutral-700 text-white",
    retired: "bg-red-800 text-white",
    live: "bg-emerald-700 text-white",
    "live-capped": "bg-amber-600 text-white",
  };
  return (
    <span className={`inline-block px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest ${map[status] ?? "bg-neutral-700 text-white"}`}>
      {status}
    </span>
  );
}

function Ticker() {
  const items = providers.map((p) => `${p.name}: ${p.headline}`).join("  ·  ");
  return (
    <div className="overflow-hidden border-b rule bg-white">
      <div className="ticker-track flex w-max whitespace-nowrap py-2 font-mono text-[11px] uppercase tracking-wider text-[#4a4438]">
        <span className="pr-8">{items} ·&nbsp;</span>
        <span className="pr-8">{items} ·&nbsp;</span>
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

      {/* editorial hero — no gradient slop, just type + rules */}
      <section className="border-b rule">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff4d00]">
            No. 01 — Free AI models, verified {LAST_CRAWL.slice(0, 10)}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
            Every free AI model worth using. Nothing dead.
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#4a4438]">
            We lead you to official free providers and $1 promos — we never
            issue or hold keys. Limits checked against docs, status probed with
            real calls, death alerts kept. Free on top, $1 deals below.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 font-mono text-[12px]">
            <a href="/providers" className="bg-[#16130e] px-4 py-2.5 font-bold uppercase tracking-wider text-white hover:bg-[#ff4d00]">
              Browse {providers.length} providers
            </a>
            <a href="/promos/1-dollar-deals" className="border border-[#16130e] px-4 py-2.5 font-bold uppercase tracking-wider hover:bg-[#16130e] hover:text-white">
              $1 deals ({promos.length})
            </a>
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-px border rule bg-[#e5dfd1] font-mono md:grid-cols-4">
            {[
              ["Free providers", String(free.length)],
              ["Free models tracked", "60+"],
              ["$1 promos live", String(deals.length)],
              ["Retired (proof)", String(dead.length)],
            ].map(([k, v]) => (
              <div key={k} className="bg-[#faf8f3] px-4 py-3">
                <dt className="text-[10px] uppercase tracking-widest text-[#4a4438]">{k}</dt>
                <dd className="tnum text-2xl font-black">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FREE ON TOP */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-baseline justify-between border-b-2 border-[#16130e] pb-2">
          <h2 className="text-xl font-black tracking-tight">01 · Free, no card required on most</h2>
          <a href="/providers" className="font-mono text-[12px] uppercase tracking-wider hover:underline">All →</a>
        </div>
        <div className="mt-6 grid gap-px border rule bg-[#e5dfd1] md:grid-cols-2">
          {free.map((p, i) => (
            <article key={p.slug} className="bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[11px] text-[#4a4438]">{String(i + 1).padStart(2, "0")} · {p.tierLabel}</p>
                  <h3 className="mt-1 text-lg font-black leading-tight">
                    <a href={`/providers/${p.slug}`} className="hover:underline">{p.name}</a>
                  </h3>
                  <p className="mt-1 text-sm text-[#4a4438]">{p.tagline}</p>
                </div>
                <StatusPill status={p.status} />
              </div>
              <p className="mt-3 border-l-2 border-[#ff4d00] pl-3 text-sm font-medium leading-snug">{p.headline}</p>
              <div className="mt-3 flex flex-wrap gap-2 font-mono text-[11px]">
                <a href={`/providers/${p.slug}`} className="border rule px-2 py-1 hover:bg-[#16130e] hover:text-white">Details</a>
                <a href={p.signupUrl} target="_blank" rel="noreferrer" className="bg-[#16130e] px-2 py-1 font-bold text-white hover:bg-[#ff4d00]">Official signup ↗</a>
              </div>
              <p className="tnum mt-3 font-mono text-[10px] uppercase tracking-wider text-[#4a4438]">
                Checked {p.lastChecked.slice(0, 10)} · {p.models.length} models listed
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* $1 DEALS */}
      <section className="border-y rule bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex items-baseline justify-between border-b-2 border-[#16130e] pb-2">
            <h2 className="text-xl font-black tracking-tight">02 · $1 deals & trials</h2>
            <a href="/promos/1-dollar-deals" className="font-mono text-[12px] uppercase tracking-wider hover:underline">All promos →</a>
          </div>
          <div className="mt-6 grid gap-px border rule bg-[#e5dfd1] md:grid-cols-2">
            {deals.map((p) => (
              <article key={p.slug} className="bg-[#faf8f3] p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-black">
                    <a href={`/providers/${p.slug}`} className="hover:underline">{p.name}</a>
                  </h3>
                  <StatusPill status={p.status} />
                </div>
                <p className="mt-1 font-mono text-[12px] font-bold text-[#ff4d00]">{p.tierLabel}</p>
                <p className="mt-2 text-sm leading-snug">{p.headline}</p>
                <p className="mt-2 font-mono text-[11px] text-[#4a4438]">{p.statusNote}</p>
                <div className="mt-3 flex gap-2 font-mono text-[11px]">
                  <a href={`/providers/${p.slug}`} className="border rule bg-white px-2 py-1 hover:bg-[#16130e] hover:text-white">Details</a>
                  <a href={p.signupUrl} target="_blank" rel="noreferrer" className="bg-[#ff4d00] px-2 py-1 font-bold text-white hover:bg-[#16130e]">Claim ↗</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* retired proof */}
      {dead.map((p) => (
        <section key={p.slug} className="mx-auto max-w-6xl px-4 py-8">
          <p className="font-mono text-[11px] uppercase tracking-widest text-red-800">
            Retired proof · {p.name} — {p.statusNote}
          </p>
        </section>
      ))}

      {/* keyword footer for SEO */}
      <section className="mx-auto max-w-6xl px-4 pb-4">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#4a4438]">What people search</h2>
        <ul className="mt-2 flex flex-wrap gap-2 font-mono text-[11px]">
          {["free ai models", "free ai api", "free llm api", "deepseek free api no card", "qwen coder free api", "openai compatible free api", "$1 ai api"].map((k) => (
            <li key={k} className="border rule bg-white px-2 py-1">{k}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
