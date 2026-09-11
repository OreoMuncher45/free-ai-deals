import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/data/providers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FreeModels — Every free AI model, verified daily",
    template: "%s · FreeModels",
  },
  description:
    "Directory of free AI models and $1 API promos. Live limits, verification steps, base URLs and curl examples. No keys, just official links. Re-verified daily.",
  keywords: [
    "free ai models",
    "free ai api",
    "free llm api",
    "deepseek free api",
    "openai compatible free api",
    "$1 ai api",
  ],
  openGraph: {
    type: "website",
    siteName: "FreeModels",
    title: "FreeModels — Every free AI model, verified daily",
    description:
      "Free providers + $1 promos. Limits, verification, base URLs. No keys, just official links.",
  },
  robots: { index: true, follow: true },
};

function TopBar() {
  return (
    <div className="border-b rule bg-[#16130e] text-[#faf8f3]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-1.5 font-mono text-[11px] tracking-wide">
        <span className="flex items-center gap-2">
          <span className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          CATALOG LIVE · 12 PROVIDERS · 60+ FREE MODELS
        </span>
        <span className="hidden sm:inline tnum">LAST CRAWL 2026-09-11 · NO KEYS · OFFICIAL LINKS ONLY</span>
      </div>
    </div>
  );
}

function Masthead() {
  return (
    <header className="border-b rule bg-[#faf8f3]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="/" className="flex items-baseline gap-2">
          <span className="text-xl font-black tracking-tight">FreeModels</span>
          <span className="stamp px-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#ff4d00]">
            Beta
          </span>
        </a>
        <nav className="flex items-center gap-5 font-mono text-[12px] uppercase tracking-wider">
          <a className="hover:underline" href="/providers">Providers</a>
          <a className="hover:underline" href="/promos">Promos</a>
          <a className="hover:underline" href="/promos/1-dollar-deals">$1 deals</a>
          <a className="hover:underline" href="/dev">Dev</a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t rule mt-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <p className="font-black">FreeModels</p>
          <p className="mt-2 text-sm text-[#4a4438]">
            Lead-only directory. We never issue, store, or proxy API keys. All
            links go to official provider signup.
          </p>
        </div>
        <div className="font-mono text-[12px]">
          <p className="uppercase tracking-widest text-[#4a4438]">Index</p>
          <ul className="mt-2 space-y-1">
            <li><a className="hover:underline" href="/providers">All providers</a></li>
            <li><a className="hover:underline" href="/promos">Promotions</a></li>
            <li><a className="hover:underline" href="/promos/1-dollar-deals">$1 deals</a></li>
            <li><a className="hover:underline" href="/sitemap-index.xml">Sitemap index</a></li>
          </ul>
        </div>
        <div className="font-mono text-[12px]">
          <p className="uppercase tracking-widest text-[#4a4438]">Machine</p>
          <ul className="mt-2 space-y-1">
            <li><a className="hover:underline" href="/api/providers">/api/providers</a></li>
            <li><a className="hover:underline" href="/api/health">/api/health</a></li>
            <li><a className="hover:underline" href="/llms.txt">/llms.txt</a></li>
            <li><a className="hover:underline" href="/dev">/dev console</a></li>
          </ul>
        </div>
        <div className="font-mono text-[12px]">
          <p className="uppercase tracking-widest text-[#4a4438]">Policy</p>
          <ul className="mt-2 space-y-1">
            <li>One account per provider</li>
            <li>No reselling, no key sharing</li>
            <li>Free tiers change weekly</li>
          </ul>
        </div>
      </div>
      <div className="border-t rule">
        <div className="mx-auto flex max-w-6xl justify-between px-4 py-3 font-mono text-[11px] text-[#4a4438]">
          <span>© 2026 FreeModels · directory only</span>
          <span className="tnum">Re-verified daily · no ads yet</span>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <TopBar />
        <Masthead />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
