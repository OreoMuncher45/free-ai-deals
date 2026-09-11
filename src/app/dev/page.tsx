import { providers, LAST_CRAWL, keywords } from "@/data/providers";

export default function DevConsole() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#ff4d00]">Dev console · sitemap + freshness</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight">Dev console</h1>
      <div className="mt-6 grid gap-px border rule bg-[#e5dfd1] md:grid-cols-3">
        <div className="bg-white p-4 font-mono text-[12px]">
          <h2 className="uppercase tracking-widest text-[#4a4438]">Build</h2>
          <ul className="tnum mt-2 space-y-1">
            <li>Next 16 App Router</li>
            <li>Last crawl {LAST_CRAWL}</li>
            <li>Providers {providers.length}</li>
            <li>Static export, ISR-ready</li>
          </ul>
        </div>
        <div className="bg-white p-4 font-mono text-[12px]">
          <h2 className="uppercase tracking-widest text-[#4a4438]">Sitemap</h2>
          <ul className="mt-2 space-y-1">
            <li><a className="hover:underline" href="/sitemap-index.xml">/sitemap-index.xml</a></li>
            <li><a className="hover:underline" href="/sitemap.xml">/sitemap.xml (main)</a></li>
            <li><a className="hover:underline" href="/providers/sitemap.xml">/providers/sitemap.xml</a></li>
            <li><a className="hover:underline" href="/promos/sitemap.xml">/promos/sitemap.xml</a></li>
            <li><a className="hover:underline" href="/robots.txt">/robots.txt</a></li>
            <li><a className="hover:underline" href="/llms.txt">/llms.txt</a></li>
          </ul>
        </div>
        <div className="bg-white p-4 font-mono text-[12px]">
          <h2 className="uppercase tracking-widest text-[#4a4438]">API</h2>
          <ul className="mt-2 space-y-1">
            <li><a className="hover:underline" href="/api/providers">/api/providers (JSON)</a></li>
            <li><a className="hover:underline" href="/api/health">/api/health</a></li>
          </ul>
        </div>
      </div>

      <h2 className="mt-8 border-b-2 border-[#16130e] pb-2 text-xl font-black">Freshness ledger</h2>
      <table className="mt-4 w-full border-collapse border rule bg-white font-mono text-[12px]">
        <thead>
          <tr className="bg-[#16130e] text-left text-white">
            <th className="border rule px-3 py-2">Slug</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Checked</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((p) => (
            <tr key={p.slug}>
              <td className="border rule px-3 py-2"><a className="hover:underline" href={`/providers/${p.slug}`}>{p.slug}</a></td>
              <td className="border rule px-3 py-2 uppercase">{p.status}</td>
              <td className="tnum border rule px-3 py-2">{p.lastChecked}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-8 border-b-2 border-[#16130e] pb-2 text-xl font-black">Keyword backlog (Semrush/Ahrefs pending keys)</h2>
      <p className="mt-2 font-mono text-[12px] text-[#4a4438]">
        Semrush + Ahrefs need paid API keys / JS logins — blocked without them. Camoufox present but browser fetch not provisioned. Drop SEMRUSH_API_KEY / AHREFS_API_KEY in Vercel env to enable nightly KD pulls. Seed list below ships in repo.
      </p>
      <table className="mt-4 w-full border-collapse border rule bg-white font-mono text-[12px]">
        <thead>
          <tr className="bg-[#16130e] text-left text-white">
            <th className="border rule px-3 py-2">Keyword</th>
            <th className="border rule px-3 py-2">Intent → page</th>
            <th className="border rule px-3 py-2">KD</th>
          </tr>
        </thead>
        <tbody>
          {keywords.map((k) => (
            <tr key={k.kw}>
              <td className="border rule px-3 py-2 font-bold">{k.kw}</td>
              <td className="border rule px-3 py-2">{k.intent}</td>
              <td className="border rule px-3 py-2">{k.kd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
