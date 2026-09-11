import { models } from "@/data/models";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI models — GPT-6 Astra, Fable 5.1, DeepSeek, Qwen free",
  description:
    "Every model worth using free: free GPT-6 Astra status, free Fable 5.1 status, free DeepSeek, free Qwen coder, free Luna, free Gemini. Where to use each free, limits, verification.",
};

export default function ModelsIndex() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-10">
      <a href="/" className="inline-block border border-[#1c2534] bg-[#0c111b] px-3 py-2.5 font-mono text-[12px] text-white hover:border-[#ff4d00]">⌂ Home</a>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff4d00]">Models · {models.length} tracked</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-white md:text-5xl">
        Free GPT, free Astra, free Fable 5 — where each actually works.
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-[#8b98ad]">
        Every model page lists live price, context, every route we verified to touch it free or cheapest, verification friction, and FAQs. Promo-ended flagships (Astra, Fable 5.1) stay listed so you stop hunting dead promos.
      </p>
      <div className="mt-8 grid gap-px border border-[#1c2534] bg-[#1c2534] sm:grid-cols-2">
        {models.map((m, i) => (
          <article key={m.slug} className="bg-[#0c111b] p-5">
            <p className="font-mono text-[11px] text-[#8b98ad]">
              {String(i + 1).padStart(2, "0")} · {m.status.replace("-", " ")} · {m.context}
            </p>
            <h2 className="mt-1 text-lg font-black text-white">
              <a href={`/models/${m.slug}`} className="hover:text-[#ff4d00] hover:underline">{m.name}</a>
            </h2>
            <p className="mt-1 font-mono text-[11px] text-[#00e5a0]">{m.aliases.join(" · ")}</p>
            <p className="mt-2 line-clamp-2 text-sm text-[#e8eef6]">{m.blurb}</p>
            <div className="mt-4 flex flex-col gap-2 font-mono text-[12px] sm:flex-row">
              <a href={`/models/${m.slug}`} className="border border-[#1c2534] px-3 py-3 text-center font-bold uppercase tracking-wider text-white hover:border-[#ff4d00]">More details →</a>
              <span className="tnum content-center px-1 py-3 text-center text-[11px] text-[#8b98ad]">{m.inputPerM} in / {m.outputPerM} out</span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
