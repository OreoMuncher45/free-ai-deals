import { models, type ModelRoute } from "@/data/models";
import { SITE_URL } from "@/data/providers";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = models.find((x) => x.slug === slug);
  if (!m) return {};
  return {
    title: `${m.name} — where to use it free`,
    description: `${m.blurb} Routes, limits, verification. ${m.keywords.join(", ")}.`,
    alternates: { canonical: `${SITE_URL}/models/${m.slug}` },
  };
}

function RouteTable({ routes }: { routes: ModelRoute[] }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-[#1c2534]">
      <table className="w-full min-w-[640px] border-collapse bg-[#0c111b] font-mono text-[12px]">
        <thead>
          <tr className="bg-black text-left text-white">
            <th className="border border-[#1c2534] rounded-full px-3 py-2.5">Route</th>
            <th className="border border-[#1c2534] rounded-full px-3 py-2.5">What you get</th>
            <th className="border border-[#1c2534] rounded-full px-3 py-2.5">Cost</th>
            <th className="border border-[#1c2534] rounded-full px-3 py-2.5">Verify</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((r) => (
            <tr key={r.provider + r.what} className="hover:bg-[#101724]">
              <td className="border border-[#1c2534] rounded-full px-3 py-2.5 font-bold">
                <a href={`/providers/${r.providerSlug}`} className="block py-1 text-[#00e5a0] hover:underline">{r.provider} →</a>
              </td>
              <td className="border border-[#1c2534] rounded-full px-3 py-2.5 text-[#e8eef6]">{r.what}</td>
              <td className="border border-[#1c2534] rounded-full px-3 py-2.5 text-[#ff4d00]">{r.cost}</td>
              <td className="border border-[#1c2534] rounded-full px-3 py-2.5 text-[#8b98ad]">{r.verify}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function ModelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = models.find((x) => x.slug === slug);
  if (!m) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: m.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    url: `${SITE_URL}/models/${m.slug}`,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Models", item: `${SITE_URL}/models` },
      { "@type": "ListItem", position: 3, name: m.name, item: `${SITE_URL}/models/${m.slug}` },
    ],
  };
  const faqLd =
    m.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: m.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;
  const related = models.filter((x) => x.slug !== m.slug).slice(0, 4);

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}
      <nav aria-label="Back" className="flex flex-wrap gap-2 font-mono text-[12px]">
        <a href="/" className="border border-[#1c2534] bg-[#0c111b] rounded-full px-3 py-2.5 text-white hover:border-[#ff4d00]">⌂ Home</a>
        <a href="/models" className="border border-[#1c2534] bg-[#0c111b] rounded-full px-3 py-2.5 text-white hover:border-[#ff4d00]">← All models</a>
      </nav>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#8b98ad]">Models / {m.slug}</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-white md:text-5xl">{m.name}</h1>
      <p className="mt-2 font-mono text-[12px] text-[#00e5a0]">{m.aliases.join(" · ")}</p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-[#ff4d00]">{m.status.replace("-", " ")} · {m.statusNote}</p>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#e8eef6]">{m.blurb}</p>
      <dl className="tnum mt-6 grid grid-cols-3 gap-px border border-[#1c2534] bg-[#1c2534] font-mono">
        {[
          ["Input / 1M", m.inputPerM],
          ["Output / 1M", m.outputPerM],
          ["Context", m.context],
        ].map(([k, v]) => (
          <div key={k} className="bg-[#0c111b] px-4 py-3">
            <dt className="text-[10px] uppercase tracking-widest text-[#8b98ad]">{k}</dt>
            <dd className="mt-1 text-sm font-bold text-white">{v}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-8 border-b-2 border-[#ff4d00] pb-2 text-xl font-black text-white">
        Where to use {m.name} free or cheapest
      </h2>
      <RouteTable routes={m.routes} />
      <p className="tnum mt-3 font-mono text-[11px] uppercase tracking-wider text-[#8b98ad]">
        Last checked {m.lastChecked.slice(0, 10)} · outbound links go official, never via us
      </p>

      <h2 className="mt-8 border-b-2 border-[#ff4d00] pb-2 text-xl font-black text-white">FAQ</h2>
      <div className="mt-4 space-y-3">
        {m.faq.map((f) => (
          <details key={f.q} className="rounded-2xl border border-[#1c2534] bg-[#0c111b] p-4">
            <summary className="cursor-pointer min-h-[44px] font-bold text-white">{f.q}</summary>
            <p className="mt-2 text-sm text-[#8b98ad]">{f.a}</p>
          </details>
        ))}
      </div>

      <h2 className="mt-8 border-b-2 border-[#ff4d00] pb-2 text-xl font-black text-white">Related free models</h2>
      <div className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-[#1c2534] bg-[#1c2534] sm:grid-cols-2">
        {related.map((r) => (
          <a key={r.slug} href={`/models/${r.slug}`} className="block bg-[#0c111b] p-4 hover:bg-[#101724]">
            <p className="font-bold text-white hover:underline">{r.name} →</p>
            <p className="mt-1 font-mono text-[11px] text-[#00e5a0]">{r.aliases.slice(0, 2).join(" · ")}</p>
          </a>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-2 border-t border-[#1c2534] pt-6 font-mono text-[12px] sm:flex-row">
        <a href="/" className="border border-[#1c2534] rounded-full px-4 py-3.5 text-center text-white hover:border-[#ff4d00]">⌂ Back to homepage</a>
        <a href="/models" className="border border-[#1c2534] rounded-full px-4 py-3.5 text-center text-white hover:border-[#ff4d00]">← All models</a>
      </div>
    </main>
  );
}
