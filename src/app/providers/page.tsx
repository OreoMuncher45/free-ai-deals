import { providers } from "@/data/providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All free AI providers",
  description: "Every free AI API provider, verified. Limits, verification, base URLs, official signup links.",
};

export default function ProvidersIndex() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff4d00]">Index · {providers.length} providers</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">Providers, free first.</h1>
      <p className="mt-3 max-w-2xl text-sm text-[#4a4438]">
        Each page lists models, allowance checked from docs, verification friction, base URL + curl, sources, and last-checked stamp. Directory only — signup happens on official sites.
      </p>
      <table className="mt-8 w-full border-collapse border rule bg-white font-mono text-[12px]">
        <thead>
          <tr className="bg-[#16130e] text-left text-white">
            <th className="border rule px-3 py-2">Provider</th>
            <th className="hidden px-3 py-2 md:table-cell">Tier</th>
            <th className="hidden px-3 py-2 lg:table-cell">Allowance</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Checked</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((p) => (
            <tr key={p.slug} className="hover:bg-[#faf8f3]">
              <td className="border rule px-3 py-2 font-bold">
                <a href={`/providers/${p.slug}`} className="hover:underline">{p.name}</a>
                <span className="block text-[11px] font-normal text-[#4a4438]">{p.tagline}</span>
              </td>
              <td className="hidden border rule px-3 py-2 md:table-cell">{p.tierLabel}</td>
              <td className="hidden border rule px-3 py-2 lg:table-cell">{p.freeAllowance.slice(0, 90)}…</td>
              <td className="border rule px-3 py-2 uppercase">{p.status}</td>
              <td className="tnum border rule px-3 py-2">{p.lastChecked.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
