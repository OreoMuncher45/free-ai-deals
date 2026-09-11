import { providers } from "@/data/providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All free AI providers",
  description: "Every free AI API provider, verified. Limits, verification, base URLs, official signup links.",
};

export default function ProvidersIndex() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-10">
      <a href="/" className="inline-block border border-[#1c2534] bg-[#0c111b] px-3 py-2.5 font-mono text-[12px] text-white hover:border-[#ff4d00]">⌂ Home</a>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff4d00]">Index · {providers.length} providers</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-white md:text-5xl">Providers, free first.</h1>
      <p className="mt-3 max-w-2xl text-sm text-[#8b98ad]">
        Tap a name for full limits, verification, models, base URL + curl. Signup always happens on official sites.
      </p>
      <div className="mt-8 overflow-x-auto border border-[#1c2534]">
        <table className="w-full min-w-[640px] border-collapse bg-[#0c111b] font-mono text-[12px]">
          <thead>
            <tr className="bg-black text-left text-white">
              <th className="border border-[#1c2534] px-3 py-2.5">Provider</th>
              <th className="hidden px-3 py-2.5 md:table-cell">Tier</th>
              <th className="px-3 py-2.5">Status</th>
              <th className="px-3 py-2.5">Checked</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((p) => (
              <tr key={p.slug} className="hover:bg-[#101724]">
                <td className="border border-[#1c2534] px-3 py-2.5 font-bold">
                  <a href={`/providers/${p.slug}`} className="block min-h-[44px] content-center text-[#00e5a0] hover:underline">{p.name} →</a>
                  <span className="block text-[11px] font-normal text-[#8b98ad]">{p.tagline}</span>
                </td>
                <td className="hidden border border-[#1c2534] px-3 py-2.5 text-[#e8eef6] md:table-cell">{p.tierLabel}</td>
                <td className="border border-[#1c2534] px-3 py-2.5 uppercase text-[#e8eef6]">{p.status}</td>
                <td className="tnum border border-[#1c2534] px-3 py-2.5 text-[#e8eef6]">{p.lastChecked.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
