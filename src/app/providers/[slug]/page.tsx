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

function BackBar() {
  return (
    <nav aria-label="Back" className="flex flex-wrap gap-2 font-mono text-[12px]">
      <a href="/" className="border border-[#1c2534] bg-[#0c111b] rounded-full px-3 py-2.5 text-white hover:border-[#ff4d00]">⌂ Home</a>
      <a href="/providers" className="border border-[#1c2534] bg-[#0c111b] rounded-full px-3 py-2.5 text-white hover:border-[#ff4d00]">← All providers</a>
    </nav>
  );
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

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Providers", item: `${SITE_URL}/providers` },
      { "@type": "ListItem", position: 3, name: p.name, item: `${SITE_URL}/providers/${p.slug}` },
    ],
  };
  const faqLd =
    p.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: p.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}
      <BackBar />
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#8b98ad]">
        Providers / {p.slug}
      </p>
      <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">{p.name}</h1>
          <p className="mt-2 font-mono text-[12px] uppercase tracking-wider text-[#ff4d00]">{p.tierLabel} · {p.status}</p>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#e8eef6]">{p.headline}</p>
        </div>
      </div>

      {/* primary actions — Website + Direct signup, always visible */}
      <div className="mt-5 flex flex-col gap-2 font-mono text-[13px] sm:flex-row">
        <a href={p.siteUrl} target="_blank" rel="noreferrer" className="border border-[#1c2534] bg-[#0c111b] rounded-full px-4 py-3.5 text-center font-bold uppercase tracking-wider text-white hover:border-[#ff4d00]">
          Website ↗
        </a>
        <a href={p.signupUrl} target="_blank" rel="noreferrer" className="bg-[#ff4d00] rounded-full px-4 py-3.5 text-center font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black">
          Direct signup ↗
        </a>
      </div>

      <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-[#1c2534] bg-[#1c2534] md:grid-cols-3">
        <div className="bg-[#0c111b] p-4">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-[#8b98ad]">Free allowance (from docs)</h2>
          <p className="mt-2 text-sm leading-snug text-[#e8eef6]">{p.freeAllowance}</p>
        </div>
        <div className="bg-[#0c111b] p-4">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-[#8b98ad]">Rate limits</h2>
          <p className="mt-2 text-sm leading-snug text-[#e8eef6]">{p.rateLimits}</p>
        </div>
        <div className="bg-[#0c111b] p-4">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-[#8b98ad]">Verification</h2>
          <ul className="tnum mt-2 font-mono text-[12px] text-[#e8eef6]">
            <li>Card: {p.verification.card ? "YES" : "no"}</li>
            <li>Phone: {p.verification.phone ? "YES" : "no"}</li>
            <li>Email: {p.verification.email ? "yes" : "no"}</li>
            {p.verification.dollarSettled && <li>$1 settled: YES</li>}
            {p.verification.discord && <li>Discord: yes</li>}
            {p.verification.githubStar && <li>GitHub star credit: yes</li>}
          </ul>
          <p className="mt-2 text-sm text-[#e8eef6]">{p.verification.notes}</p>
        </div>
      </div>

      <p className="tnum mt-3 break-all font-mono text-[11px] uppercase tracking-wider text-[#8b98ad]">
        Base URL <span className="bg-[#1c2534] px-1 text-[#00e5a0]">{p.baseUrl}</span> · Last checked {p.lastChecked.slice(0, 10)} · {p.statusNote}
      </p>

      {p.models.length > 0 && (
        <section className="mt-8">
          <h2 className="border-b-2 border-[#ff4d00] pb-2 text-xl font-black text-white">Models ({p.models.length} listed)</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-[#1c2534]">
            <table className="w-full min-w-[560px] border-collapse bg-[#0c111b] font-mono text-[12px]">
              <thead>
                <tr className="bg-black text-left text-white">
                  <th className="border border-[#1c2534] rounded-full px-3 py-2.5">Model id</th>
                  <th className="border border-[#1c2534] rounded-full px-3 py-2.5">Context</th>
                  <th className="hidden border border-[#1c2534] rounded-full px-3 py-2.5 md:table-cell">Note</th>
                </tr>
              </thead>
              <tbody>
                {p.models.map((m) => (
                  <tr key={m.id} className="hover:bg-[#101724]">
                    <td className="tnum border border-[#1c2534] rounded-full px-3 py-2.5 font-bold text-[#00e5a0]">{m.id}</td>
                    <td className="tnum border border-[#1c2534] rounded-full px-3 py-2.5">{m.context}</td>
                    <td className="hidden border border-[#1c2534] rounded-full px-3 py-2.5 text-[#8b98ad] md:table-cell">{m.note ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="min-w-0">
          <h2 className="border-b-2 border-[#ff4d00] pb-2 text-xl font-black text-white">Connect</h2>
          <pre className="tnum mt-4 overflow-x-auto rounded-xl border border-[#1c2534] bg-black p-4 font-mono text-[11px] leading-relaxed text-[#00e5a0]">{p.curlExample}</pre>
          <div className="mt-3 flex flex-wrap gap-2 font-mono text-[11px]">
            <a className="border border-[#1c2534] bg-[#0c111b] rounded-full px-2.5 py-2.5 text-white hover:border-[#ff4d00]" href={p.docsUrl} target="_blank" rel="noreferrer">Docs ↗</a>
            <a className="border border-[#1c2534] bg-[#0c111b] rounded-full px-2.5 py-2.5 text-white hover:border-[#ff4d00]" href={p.pricingUrl} target="_blank" rel="noreferrer">Pricing ↗</a>
            <a className="border border-[#1c2534] bg-[#0c111b] rounded-full px-2.5 py-2.5 text-white hover:border-[#ff4d00]" href={p.siteUrl} target="_blank" rel="noreferrer">Website ↗</a>
          </div>
        </div>
        <div>
          <h2 className="border-b-2 border-[#ff4d00] pb-2 text-xl font-black text-white">Verdict</h2>
          <div className="mt-4 grid gap-4">
            <div className="rounded-2xl border border-[#1c2534] bg-[#0c111b] p-4">
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-[#00e5a0]">Good</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-[#e8eef6]">{p.pros.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="rounded-2xl border border-[#1c2534] bg-[#0c111b] p-4">
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-red-400">Catches</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-[#e8eef6]">{p.cons.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      {p.faq.length > 0 && (
        <section className="mt-8">
          <h2 className="border-b-2 border-[#ff4d00] pb-2 text-xl font-black text-white">FAQ</h2>
          <div className="mt-4 space-y-3">
            {p.faq.map((f) => (
              <details key={f.q} className="rounded-2xl border border-[#1c2534] bg-[#0c111b] p-4">
                <summary className="cursor-pointer min-h-[44px] font-bold text-white">{f.q}</summary>
                <p className="mt-2 text-sm text-[#8b98ad]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8">
        <h2 className="font-mono text-[11px] uppercase tracking-widest text-[#8b98ad]">Sources checked from docs</h2>
        <ul className="mt-2 space-y-2 font-mono text-[12px]">
          {p.sources.map((s) => (
            <li key={s.url}><a className="block py-1 text-[#00e5a0] hover:underline" href={s.url} target="_blank" rel="noreferrer">{s.label} ↗</a></li>
          ))}
        </ul>
      </section>

      <div className="mt-10 flex flex-col gap-2 border-t border-[#1c2534] pt-6 font-mono text-[12px] sm:flex-row">
        <a href="/" className="border border-[#1c2534] rounded-full px-4 py-3.5 text-center text-white hover:border-[#ff4d00]">⌂ Back to homepage</a>
        <a href="/providers" className="border border-[#1c2534] rounded-full px-4 py-3.5 text-center text-white hover:border-[#ff4d00]">← All providers</a>
        <a href={p.signupUrl} target="_blank" rel="noreferrer" className="bg-[#ff4d00] rounded-full px-4 py-3.5 text-center font-bold text-white hover:bg-white hover:text-black">Direct signup ↗</a>
      </div>
    </main>
  );
}
