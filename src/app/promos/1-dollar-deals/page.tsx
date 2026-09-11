import { providers } from "@/data/providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "$1 AI deals — verification, credits, expiry",
  description: "$1 AI API deals: Experiential Labs verification, Command Code, Fireworks, Together. What $1 unlocks, card/phone needs, expiry.",
};

const deals = [
  {
    name: "Experiential Labs $1 verification",
    price: "$1 settled",
    get: "$5/day free DeepSeek V4 Flash + GPT-5.6 Luna, ~$9–13 credits ($4 instant + $5 after $1, +$1 GitHub star reported)",
    verify: "Email verify + card on file + settled $1. Overflow past free limits needs all three.",
    expiry: "No published end date. Astra/Fable free portion ended Sep 8, 2026 after 4 days.",
    to: "/providers/experiential-labs",
    out: "https://platform.experientiallabs.ai",
  },
  {
    name: "Command Code $1/mo",
    price: "$1/mo",
    get: "$40 DeepSeek V4 Pro usage (hundreds of millions of tokens at $0.04–$0.30/M in)",
    verify: "Account + subscription. Harness tuned for DeepSeek tool calls (fewer retries).",
    expiry: "Subscription, cancel anytime. See Mehul Mohan YouTube demo.",
    to: "/providers/experiential-labs",
    out: "https://www.youtube.com/watch?v=hMapXjqHbJ4",
  },
  {
    name: "Fireworks AI $1 trial",
    price: "$1 prepaid",
    get: "Fast serverless inference — Llama 3.3 70B, Phi-4 class. Hundreds of small-model calls.",
    verify: "Email to start. Card to continue past $1.",
    to: "/providers/fireworks-ai",
    out: "https://fireworks.ai/pricing",
  },
  {
    name: "Together AI $1 credits",
    price: "$1 free",
    get: "Open-model evals — Llama 3 70B, Mixtral 8x22B. Sampler, not home base.",
    verify: "Email signup. Card to continue.",
    to: "/providers/together-ai",
    out: "https://together.ai/pricing",
  },
];

export default function DollarDeals() {
  const checked = providers.find((p) => p.slug === "experiential-labs")?.lastChecked ?? "";
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff4d00]">Promos / $1 deals · checked {checked.slice(0, 10)}</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">$1 deals, ranked by what $1 buys.</h1>
      <p className="mt-3 max-w-2xl text-sm text-[#4a4438]">
        Free tiers first elsewhere — this page is paid micro-promos only. Every deal links to its provider page (full verification + limits) and the official claim page.
      </p>
      <div className="mt-8 space-y-px border rule bg-[#e5dfd1]">
        {deals.map((d, i) => (
          <article key={d.name} className="grid gap-4 bg-white p-5 md:grid-cols-[60px_1fr_auto]">
            <span className="tnum font-mono text-3xl font-black text-[#e5dfd1]">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h2 className="text-xl font-black">{d.name} — <span className="text-[#ff4d00]">{d.price}</span></h2>
              <dl className="mt-3 space-y-1.5 text-sm">
                <div className="flex gap-2"><dt className="w-16 shrink-0 font-mono text-[11px] uppercase text-[#4a4438]">Get</dt><dd>{d.get}</dd></div>
                <div className="flex gap-2"><dt className="w-16 shrink-0 font-mono text-[11px] uppercase text-[#4a4438]">Verify</dt><dd>{d.verify}</dd></div>
                {d.expiry && <div className="flex gap-2"><dt className="w-16 shrink-0 font-mono text-[11px] uppercase text-[#4a4438]">Expiry</dt><dd>{d.expiry}</dd></div>}
              </dl>
            </div>
            <div className="flex flex-row gap-2 font-mono text-[12px] md:flex-col">
              <a href={d.to} className="border rule px-3 py-2 text-center hover:bg-[#16130e] hover:text-white">Provider page</a>
              <a href={d.out} target="_blank" rel="noreferrer" className="bg-[#16130e] px-3 py-2 text-center font-bold text-white hover:bg-[#ff4d00]">Claim ↗</a>
            </div>
          </article>
        ))}
      </div>
      <section className="mt-8 border rule bg-[#16130e] p-5 text-[#faf8f3]">
        <h2 className="font-mono text-[11px] uppercase tracking-widest">$1 math</h2>
        <p className="tnum mt-2 font-mono text-[12px] leading-relaxed">
          DeepSeek-Chat ~$0.28 in / $0.42 out per 1M → $1 ≈ 2–3M tokens. GLM-4.6v-flash $0.04 in → $1 ≈ 10M+ input-heavy tokens. xKiro free 5M/day ≈ $1.50–$4/day DeepSeek value, free.
        </p>
      </section>
    </main>
  );
}
