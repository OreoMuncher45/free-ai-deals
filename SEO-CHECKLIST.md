# SEO checklist — FreeModels (grounded in Google Search Central)

Source: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
Review rhythm: weekly until indexed, then monthly. Owner: whoever runs `npm run build`.

## Crawling & indexing — DONE
- [x] `robots.ts` allows `*` + 16 named LLM crawlers, zero disallows
- [x] Sitemap index at `/sitemap-index.xml` → main, providers, models, promos
- [x] All sitemaps dynamic (ISR `revalidate = 3600`), lastmod from data not build time
- [x] Descriptive URLs (`/providers/xkiro`, `/models/gpt-6-astra-free`)
- [x] Server-rendered content (no JS-SEO risk — all copy in initial HTML)
- [x] Mobile-first: hamburger nav, scrollable tables, 44px touch targets
- [ ] Submit sitemap index in Search Console after custom domain lands
- [ ] `site:domain` check 1 week after launch

## Titles & snippets (per Google title-link / snippet docs)
- [x] Unique `<title>` per page via `generateMetadata` (+ `%s · FreeModels` template)
- [x] Unique 1–2 sentence meta description per page (most relevant points)
- [x] No `keywords` meta tag (Google ignores it — removed)
- [x] OG + Twitter summary cards on every page
- [ ] Add OG image (`public/og.png` 1200×630) once brand lockup final — lifts CTR

## Canonicalization
- [x] `alternates.canonical` on home, all indexes, all detail pages
- [x] Self-referencing canonicals (no duplicate-content traps; temp vs prod domains!)

## Structured data (validate at search.google.com/test/rich-results)
- [x] SoftwareApplication on provider/model detail pages
- [x] BreadcrumbList on detail pages
- [x] FAQPage from on-page FAQs (matches visible text — required)
- [x] Organization + WebSite on home
- [ ] Re-test after every schema edit — one syntax error voids the whole block

## Content (helpful, reliable, people-first)
- [x] Limits quoted from official docs with source links on every page
- [x] `lastChecked` stamp per provider/model + freshness ledger on `/dev`
- [x] Death alerts kept (GitHub Models retired-proof) — update, don't delete, dead pages
- [x] No keyword stuffing — keyword chips are real links with varied anchors
- [ ] Weekly probe: update `lastChecked` + status; freshness is the moat

## Links
- [x] Every title → its details page; details → official Website + Direct signup
- [x] Related-models block, keyword chips → model pages, footer sitemap/API links
- [x] Outbound links go to official docs (trusted resources corroborate claims)
- [ ] Earn first backlinks: launch on Product Hunt, answer quota questions on Reddit/Discord with data links

## Page experience
- [x] No interstitials, no ads at launch
- [x] next/font (no render-blocking webfonts), zero images, system-fast TTFB target
- [ ] Measure Core Web Vitals in Search Console after launch; LCP < 2.5s

## Do NOT do (Google: these don't help)
- Meta keywords, keyword-stuffed copy, exact-match domain, heading-count gaming,
  buying links, treating E-E-A-T as a score to optimize directly.
