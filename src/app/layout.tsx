import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MobileNav from "@/components/MobileNav";
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
  authors: [{ name: "FreeModels" }],
  creator: "FreeModels",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    siteName: "FreeModels",
    locale: "en_US",
    title: "FreeModels — Every free AI model, verified daily",
    description:
      "Free providers + $1 promos. Limits, verification, base URLs. No keys, just official links.",
  },
  twitter: {
    card: "summary",
    title: "FreeModels — Every free AI model, verified daily",
    description:
      "Free providers + $1 promos. Limits, verification, base URLs. No keys, just official links.",
  },
  robots: { index: true, follow: true },
};

function TopBar() {
  return (
    <div className="border-b border-[#1c2534] bg-black text-[#e8eef6]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 font-mono text-[11px] tracking-wide">
        <span className="flex items-center gap-2">
          <span className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-[#00e5a0]" />
          CATALOG LIVE · 12 PROVIDERS · 60+ FREE MODELS
        </span>
        <span className="hidden sm:inline tnum text-[#8b98ad]">LAST CRAWL 2026-09-11 · NO KEYS · OFFICIAL LINKS ONLY</span>
      </div>
    </div>
  );
}

function Masthead() {
  return (
    <header className="relative border-b border-[#1c2534] bg-[#06090f]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="/" aria-label="FreeModels home" className="flex min-h-[44px] items-center gap-2">
          <span className="inline-block h-3 w-3 bg-[#ff4d00]" aria-hidden />
          <span className="text-lg font-black tracking-tight text-white">FreeModels</span>
          <span className="border border-[#ff4d00] px-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#ff4d00]">
            Beta
          </span>
        </a>
        <nav className="hidden items-center gap-6 font-mono text-[12px] uppercase tracking-wider text-[#8b98ad] md:flex">
          <a className="min-h-[44px] content-center hover:text-white" href="/providers">Providers</a>
          <a className="min-h-[44px] content-center hover:text-white" href="/models">Models</a>
          <a className="min-h-[44px] content-center hover:text-white" href="/promos">Promos</a>
          <a className="min-h-[44px] content-center text-[#ff4d00] hover:text-white" href="/promos/1-dollar-deals">$1 deals</a>
          <a className="min-h-[44px] content-center hover:text-white" href="/dev">Dev</a>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-[#1c2534] bg-black">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="font-black text-white">FreeModels</p>
          <p className="mt-2 text-sm text-[#8b98ad]">
            Lead-only directory. We never issue, store, or proxy API keys. All
            links go to official provider signup.
          </p>
          <a href="/" className="mt-4 inline-block border border-[#1c2534] rounded-full px-3 py-2.5 font-mono text-[12px] uppercase tracking-wider text-white hover:border-[#ff4d00]">
            ⌂ Back to homepage
          </a>
        </div>
        <div className="font-mono text-[12px]">
          <p className="uppercase tracking-widest text-[#8b98ad]">Index</p>
          <ul className="mt-2 space-y-2">
            <li><a className="block py-1 hover:text-white hover:underline" href="/providers">All providers</a></li>
            <li><a className="block py-1 hover:text-white hover:underline" href="/models">All models</a></li>
            <li><a className="block py-1 hover:text-white hover:underline" href="/promos">Promotions</a></li>
            <li><a className="block py-1 hover:text-white hover:underline" href="/promos/1-dollar-deals">$1 deals</a></li>
            <li><a className="block py-1 hover:text-white hover:underline" href="/sources/community-index">Community index</a></li>
            <li><a className="block py-1 hover:text-white hover:underline" href="/sitemap-index.xml">Sitemap index</a></li>
          </ul>
        </div>
        <div className="font-mono text-[12px]">
          <p className="uppercase tracking-widest text-[#8b98ad]">Machine</p>
          <ul className="mt-2 space-y-2">
            <li><a className="block py-1 hover:text-white hover:underline" href="/api/providers">/api/providers</a></li>
            <li><a className="block py-1 hover:text-white hover:underline" href="/api/health">/api/health</a></li>
            <li><a className="block py-1 hover:text-white hover:underline" href="/llms.txt">/llms.txt</a></li>
            <li><a className="block py-1 hover:text-white hover:underline" href="/dev">/dev console</a></li>
          </ul>
        </div>
        <div className="font-mono text-[12px]">
          <p className="uppercase tracking-widest text-[#8b98ad]">Policy</p>
          <ul className="mt-2 space-y-2 text-[#8b98ad]">
            <li>One account per provider</li>
            <li>No reselling, no key sharing</li>
            <li>Free tiers change weekly</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#1c2534]">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-2 justify-between px-4 py-3 font-mono text-[11px] text-[#8b98ad]">
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
      <body className="min-h-full flex flex-col bg-[#06090f] text-[#e8eef6]">
        <TopBar />
        <Masthead />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
