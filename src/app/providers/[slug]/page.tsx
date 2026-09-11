import { providers, SITE_URL } from "@/data/providers";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return providers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = providers.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name} free tier — limits, models, verification`,
    description: `${p.headline}. ${p.freeAllowance}`,
    alternates: { canonical: `${SITE_URL}/providers/${p.slug}` },
  };
}

export default async function ProviderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = providers.find((x) => x.slug === slug);
  if (!p) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: p.freeAllowance },
    url: p.siteUrl,
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="font-mono text-[11px] uppercase tracking-[0.2em]">
        <a href="/providers" className="hover:underline">Providers</a> / {p.slug}
      </p>
      <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight md:text-5xl">{p.name}</h1>
          <p className="mt-2 font-mono text-[12px] uppercase tracking-wider text-[#ff4d00]">{p.tierLabel} · {p.status}</p>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed">{p.headline}</p>
        </div>
        <div className="flex gap-2 font-mono text-[12px]">
          <a href={p.siteUrl} target="_blank" rel="noreferrer" className="border rule bg-white px-3 py-2 hover:bg-[#16130e] hover:text-white">Website ↗</a>
          <a href={p.signupUrl} target="_blank" rel="noreferrer" className="bg-[#ff4d00] px-3 py-2 font-bold text-white hover:bg-[#16130e]">Official signup ↗</a>
        </div>
      </div>

      <div className="mt-6 grid gap-px border rule bg-[#e5dfd1] md:grid-cols-3">
        <div className="bg-white p-4">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-[#4a4438]">Free allowance (from docs)</h2>
          <p className="mt-2 text-sm leading-snug">{p.freeAllowance}</p>
        </div>
        <div className="bg-white p-4">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-[#4a4438]">Rate limits</h2>
          <p className="mt-2 text-sm leading-snug">{p.rateLimits}</p>
        </div>
        <div className="bg-white p-4">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-[#4a4438]">Verification</h2>
          <ul className="tnum mt-2 font-mono text-[12px]">
            <li>Card: {p.verification.card ? "YES" : "no"}</li>
            <li>Phone: {p.verification.phone ? "YES" : "no"}</li>
            <li>Email: {p.verification.email ? "yes" : "no"}</li>
            {p.verification.dollarSettled && <li>$1 settled: YES</li>}
            {p.verification.discord && <li>Discord: yes</li>}
            {p.verification.githubStar && <li>GitHub star credit: yes</li>}
          </ul>
          <p className="mt-2 text-sm">{p.verification.notes}</p>
        </div>
      </div>

      <p className="tnum mt-3 font-mono text-[11px] uppercase tracking-wider text-[#4a4438]">
        Base URL <span className="bg-[#16130e] px-1 text-white">{p.baseUrl}</span> · Last checked {p.lastChecked.slice(0, 10)} · {p.statusNote}
      </p>

      {p.models.length > 0 && (
        <section className="mt-8">
          <h2 className="border-b-2 border-[#16130e] pb-2 text-xl font-black">Models ({p.models.length} listed)</h2>
          <table className="mt-4 w-full border-collapse border rule bg-white font-mono text-[12px]">
            <thead>
              <tr className="bg-[#16130e] text-left text-white">
                <th className="border rule px-3 py-2">Model id</th>
                <th className="px-3 py-2">Context</th>
                <th className="hidden px-3 py-2 md:table-cell">Note</th>
              </tr>
            </thead>
            <tbody>
              {p.models.map((m) => (
                <tr key={m.id} className="hover:bg-[#faf8f3]">
                  <td className="tnum border rule px-3 py-2 font-bold">{m.id}</td>
                  <td className="tnum border rule px-3 py-2">{m.context}</td>
                  <td className="hidden border rule px-3 py-2 md:table-cell">{m.note ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="border-b-2 border-[#16130e] pb-2 text-xl font-black">Connect</h2>
          <pre className="tnum mt-4 overflow-x-auto border rule bg-[#16130e] p-4 font-mono text-[11px] leading-relaxed text-[#faf8f3]">{p.curlExample}</pre>
          <div className="mt-3 flex flex-wrap gap-2 font-mono text-[11px]">
            <a className="border rule bg-white px-2 py-1 hover:underline" href={p.docsUrl} target="_blank" rel="noreferrer">Docs ↗</a>
            <a className="border rule bg-white px-2 py-1 hover:underline" href={p.pricingUrl} target="_blank" rel="noreferrer">Pricing ↗</a>
            <a className="border rule bg-white px-2 py-1 hover:underline" href={p.siteUrl} target="_blank" rel="noreferrer">Website ↗</a>
          </div>
        </div>
        <div>
          <h2 className="border-b-2 border-[#16130e] pb-2 text-xl font-black">Verdict</h2>
          <div className="mt-4 grid gap-4">
            <div className="border rule bg-white p-4">
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-emerald-800">Good</h3>
              <ul className="mt-2 list-disc pl-5 text-sm">{p.pros.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="border rule bg-white p-4">
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-red-800">Catches</h3>
              <ul className="mt-2 list-disc pl-5 text-sm">{p.cons.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      {p.faq.length > 0 && (
        <section className="mt-8">
          <h2 className="border-b-2 border-[#16130e] pb-2 text-xl font-black">FAQ</h2>
          <div className="mt-4 space-y-3">
            {p.faq.map((f) => (
              <details key={f.q} className="border rule bg-white p-4">
                <summary className="cursor-pointer font-bold">{f.q}</summary>
                <p className="mt-2 text-sm text-[#4a4438]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8">
        <h2 className="font-mono text-[11px] uppercase tracking-widest text-[#4a4438]">Sources checked from docs</h2>
        <ul className="mt-2 space-y-1 font-mono text-[12px]">
          {p.sources.map((s) => (
            <li key={s.url}><a className="hover:underline" href={s.url} target="_blank" rel="noreferrer">{s.label} ↗</a></li>
          ))}
        </ul>
      </section>
    </main>
  );
}
