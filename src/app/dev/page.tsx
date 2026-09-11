import { providers, LAST_CRAWL, keywords } from "@/data/providers";

export default function DevConsole() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-10">
      <a href="/" className="inline-block border border-[#1c2534] bg-[#0c111b] px-3 py-2.5 font-mono text-[12px] text-white hover:border-[#ff4d00]">⌂ Home</a>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff4d00]">Dev console · sitemap + freshness</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-white">Dev console</h1>
      <div className="mt-6 grid gap-px border border-[#1c2534] bg-[#1c2534] sm:grid-cols-3">
        <div className="bg-[#0c111b] p-4 font-mono text-[12px] text-[#e8eef6]">
          <h2 className="uppercase tracking-widest text-[#8b98ad]">Build</h2>
          <ul className="tnum mt-2 space-y-1.5">
            <li>Next 16 App Router</li>
            <li>Last crawl {LAST_CRAWL}</li>
            <li>Providers {providers.length}</li>
            <li>Static export, ISR-ready</li>
          </ul>
        </div>
        <div className="bg-[#0c111b] p-4 font-mono text-[12px]">
          <h2 className="uppercase tracking-widest text-[#8b98ad]">Sitemap</h2>
          <ul className="mt-2 space-y-2">
            <li><a className="block py-1 text-[#00e5a0] hover:underline" href="/sitemap-index.xml">/sitemap-index.xml</a></li>
            <li><a className="block py-1 text-[#00e5a0] hover:underline" href="/sitemap.xml">/sitemap.xml (main)</a></li>
            <li><a className="block py-1 text-[#00e5a0] hover:underline" href="/providers/sitemap.xml">/providers/sitemap.xml</a></li>
            <li><a className="block py-1 text-[#00e5a0] hover:underline" href="/promos/sitemap.xml">/promos/sitemap.xml</a></li>
            <li><a className="block py-1 text-[#00e5a0] hover:underline" href="/robots.txt">/robots.txt</a></li>
            <li><a className="block py-1 text-[#00e5a0] hover:underline" href="/llms.txt">/llms.txt</a></li>
          </ul>
        </div>
        <div className="bg-[#0c111b] p-4 font-mono text-[12px]">
          <h2 className="uppercase tracking-widest text-[#8b98ad]">API</h2>
          <ul className="mt-2 space-y-2">
            <li><a className="block py-1 text-[#00e5a0] hover:underline" href="/api/providers">/api/providers (JSON)</a></li>
            <li><a className="block py-1 text-[#00e5a0] hover:underline" href="/api/health">/api/health</a></li>
          </ul>
        </div>
      </div>

      <h2 className="mt-8 border-b-2 border-[#ff4d00] pb-2 text-xl font-black text-white">Freshness ledger</h2>
      <div className="mt-4 overflow-x-auto border border-[#1c2534]">
        <table className="w-full min-w-[520px] border-collapse bg-[#0c111b] font-mono text-[12px]">
          <thead>
            <tr className="bg-black text-left text-white">
              <th className="border border-[#1c2534] px-3 py-2.5">Slug</th>
              <th className="border border-[#1c2534] px-3 py-2.5">Status</th>
              <th className="border border-[#1c2534] px-3 py-2.5">Checked</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((p) => (
              <tr key={p.slug}>
                <td className="border border-[#1c2534] px-3 py-2.5"><a className="block py-1 text-[#00e5a0] hover:underline" href={`/providers/${p.slug}`}>{p.slug}</a></td>
                <td className="border border-[#1c2534] px-3 py-2.5 uppercase text-[#e8eef6]">{p.status}</td>
                <td className="tnum border border-[#1c2534] px-3 py-2.5 text-[#e8eef6]">{p.lastChecked}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-8 border-b-2 border-[#ff4d00] pb-2 text-xl font-black text-white">Keyword backlog (Semrush/Ahrefs pending keys)</h2>
      <p className="mt-2 font-mono text-[12px] text-[#8b98ad]">
        Semrush + Ahrefs need paid API keys / JS logins — blocked without them. Camoufox present but browser fetch not provisioned. Drop SEMRUSH_API_KEY / AHREFS_API_KEY in Vercel env to enable nightly KD pulls. Seed list below ships in repo.
      </p>
      <div className="mt-4 overflow-x-auto border border-[#1c2534]">
        <table className="w-full min-w-[520px] border-collapse bg-[#0c111b] font-mono text-[12px]">
          <thead>
            <tr className="bg-black text-left text-white">
              <th className="border border-[#1c2534] px-3 py-2.5">Keyword</th>
              <th className="border border-[#1c2534] px-3 py-2.5">Intent → page</th>
              <th className="border border-[#1c2534] px-3 py-2.5">KD</th>
            </tr>
          </thead>
          <tbody>
            {keywords.map((k) => (
              <tr key={k.kw}>
                <td className="border border-[#1c2534] px-3 py-2.5 font-bold text-white">{k.kw}</td>
                <td className="border border-[#1c2534] px-3 py-2.5 text-[#8b98ad]">{k.intent}</td>
                <td className="border border-[#1c2534] px-3 py-2.5 text-[#e8eef6]">{k.kd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
