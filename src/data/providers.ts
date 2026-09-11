export type Verification = {
  card: boolean;
  phone: boolean;
  email: boolean;
  discord?: boolean;
  githubStar?: boolean;
  dollarSettled?: boolean;
  notes: string;
};

export type FreeModel = {
  id: string;
  context: string;
  contextTokens: number;
  note?: string;
};

export type Provider = {
  slug: string;
  name: string;
  tagline: string;
  siteUrl: string;
  signupUrl: string;
  docsUrl: string;
  pricingUrl: string;
  baseUrl: string;
  tier: "free" | "promo" | "trial" | "dead";
  tierLabel: string;
  headline: string;
  freeAllowance: string;
  rateLimits: string;
  verification: Verification;
  lastChecked: string;
  status: "working" | "capped" | "promo-ended" | "retired";
  statusNote: string;
  models: FreeModel[];
  curlExample: string;
  pros: string[];
  cons: string[];
  sources: { label: string; url: string }[];
  faq: { q: string; a: string }[];
};

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://free-ai-deals.vercel.app";

export const LAST_CRAWL = "2026-09-11T02:00:00.000Z";

export const providers: Provider[] = [
  {
    slug: "xkiro",
    name: "xKiro",
    tagline: "40 free models · 5M tokens/day shared pool",
    siteUrl: "https://xkiro.com",
    signupUrl: "https://xkiro.com/dashboard/api/keys",
    docsUrl: "https://docs.xkiro.com",
    pricingUrl: "https://xkiro.com/#pricing",
    baseUrl: "https://api.xkiro.com/v1",
    tier: "free",
    tierLabel: "Free tier",
    headline: "5,000,000 free tokens every day across 40 models",
    freeAllowance: "5M tokens/day, resets 00:00 UTC. Counted as prompt + completion (reasoning counts as output).",
    rateLimits: "Daily token pool shared across all free-tier models and all keys on the account. Paid/premium models need plan or wallet balance.",
    verification: {
      card: false,
      phone: false,
      email: true,
      notes: "Email signup only. No card, no phone. Two keys on the same account share the same counter.",
    },
    lastChecked: "2026-09-11T02:00:00.000Z",
    status: "working",
    statusNote: "Probed 2026-09-11: qwen-coder-plus, qwen-3.8-max, deepseek-v4-flash all returned 200. codex-spark flipped to 403 paid-only; minimax-m3:free rate-limited intermittently.",
    models: [
      { id: "qwen/qwen3-coder-plus:free", context: "1M", contextTokens: 1048576, note: "Best coder pick — zero reasoning dump" },
      { id: "qwen/qwen3.8-max:free", context: "1M", contextTokens: 1000000, note: "Newest max, concise" },
      { id: "qwen/qwen3.7-max:free", context: "1M", contextTokens: 1000000 },
      { id: "qwen/qwen3.7-plus:free", context: "1M", contextTokens: 1000000 },
      { id: "qwen/qwen3.6-plus:free", context: "1M", contextTokens: 1000000 },
      { id: "qwen/qwen3.5-flash:free", context: "1M", contextTokens: 1000000, note: "Leanest daily driver" },
      { id: "qwen/qwen3.5-plus:free", context: "1M", contextTokens: 1000000 },
      { id: "deepseek/deepseek-v4-flash", context: "1M", contextTokens: 1048576, note: "Same lineage as Pro, less reasoning spill" },
      { id: "deepseek/deepseek-v4-pro", context: "1M", contextTokens: 1048576, note: "Strongest reasoning, verbose thinking tokens" },
      { id: "deepseek/deepseek-chat-v3.1", context: "164k", contextTokens: 163840 },
      { id: "deepseek/deepseek-v3.2", context: "131k", contextTokens: 131072 },
      { id: "minimax/minimax-m3:free", context: "1M", contextTokens: 1000000, note: "Agentic + vision, flaky under load" },
      { id: "mistralai/mistral-small-2603", context: "256k", contextTokens: 256000 },
      { id: "mistralai/mistral-large-2512", context: "256k", contextTokens: 256000 },
      { id: "sensenova/sensenova-6.8-flash-lite", context: "262k", contextTokens: 262144 },
    ],
    curlExample: `curl https://api.xkiro.com/v1/chat/completions \\
  -H "Authorization: Bearer $XKIRO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"qwen/qwen3-coder-plus:free","messages":[{"role":"user","content":"say ok"}],"max_tokens":20}'`,
    pros: ["Largest free token pool we track", "Full vendor/model IDs, stable", "Tool calling + vision on most free rows", "Usage endpoint is source of truth"],
    cons: ["5M is shared, not per-model", "Catalog tiers shift without notice (codex-spark did)", "Wallet $0 = paid models hard-blocked with 403"],
    sources: [
      { label: "xKiro models + tiers", url: "https://docs.xkiro.com/models/tiers/" },
      { label: "Usage & limits", url: "https://docs.xkiro.com/api/usage/" },
      { label: "Pricing & billing", url: "https://docs.xkiro.com/guides/pricing/" },
    ],
    faq: [
      { q: "Is the 5M per model?", a: "No. One free_tokens counter per account. All 40 free models draw the same 5M/day pool. GET /v1/usage shows used_today / limit_per_day / remaining." },
      { q: "What counts toward the 5M?", a: "prompt_tokens + completion_tokens. Reasoning/thinking tokens count as output. Two keys on one account share the counter." },
      { q: "What happens after 5M?", a: "Free-tier calls stop until 00:00 UTC reset. Paid models keep working only if you have plan windows or wallet balance left — they are a separate budget." },
    ],
  },
  {
    slug: "experiential-labs",
    name: "Experiential Labs",
    tagline: "$1 verification · $5/day free DeepSeek + Luna",
    siteUrl: "https://www.experientiallabs.ai",
    signupUrl: "https://platform.experientiallabs.ai",
    docsUrl: "https://platform.experientiallabs.ai/docs",
    pricingUrl: "https://www.experientiallabs.ai/pricing",
    baseUrl: "https://api.experientiallabs.ai/v1",
    tier: "promo",
    tierLabel: "$1 promo",
    headline: "$1 settled verification unlocks $5/day free + ~$9–13 credits",
    freeAllowance: "Free plan: 500 credits/month. Promo row ($0 in/$0 out): Qwen3.8-27B, DeepSeek V4 Flash, GPT-5.6 Luna. $5/day free on DeepSeek + Luna after $1 verification (per MyDealz reports).",
    rateLimits: "Per-key daily spend cap + RPM/TPM ceilings. Astra Pro quoted 150k in / 30k out per hour, 375k in / 75k out per day before promo ended.",
    verification: {
      card: true,
      phone: false,
      email: true,
      dollarSettled: true,
      githubStar: true,
      notes: "Email verify unlocks credits. $1 settled + card on file unlocks credit overflow past free limits. +$1 credit reported for GitHub star. New IPs/emails rate-limited (409/403/429).",
    },
    lastChecked: "2026-09-11T02:00:00.000Z",
    status: "capped",
    statusNote: "GPT-6 Astra + Claude Fable 5.1 free ended 2026-09-08 (4 days, Sep 4–7). 3-model promo row remains. New accounts report extra verification vs older keys.",
    models: [
      { id: "deepseek-v4-flash", context: "1M", contextTokens: 1048576, note: "Promo $0, list $0.042 in / $0.085 out" },
      { id: "qwen3.8-27b", context: "1M", contextTokens: 1000000, note: "Promo $0, list $0.32 in / $1.49 out" },
      { id: "gpt-5.6-luna", context: "1M", contextTokens: 1048576, note: "Promo $0, list $0.20 in / $1.20 out" },
      { id: "deepseek-v4.1-flash", context: "1M", contextTokens: 1048576, note: "Flagship cheap reasoning, paid lane" },
      { id: "gpt-6-astra", context: "1M", contextTokens: 1048576, note: "Promo ended — now $10 in / $50 out" },
      { id: "claude-fable-5.1", context: "1M", contextTokens: 1000000, note: "Promo ended — now $10 in / $50 out" },
    ],
    curlExample: `curl https://api.experientiallabs.ai/v1/chat/completions \\
  -H "Authorization: Bearer $EXPLABS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"deepseek-v4-flash","messages":[{"role":"user","content":"say ok"}]}'`,
    pros: ["0% markup, provider list price", "BYOK pass-through free on every plan", "Open-source gateway, self-hostable", "761-model catalog, day-zero new models"],
    cons: ["Promo windows unannounced, 4-day Astra run", "New accounts face $1 + card + email locks", "BYOK/local only on Pro unless self-hosted"],
    sources: [
      { label: "Experiential pricing", url: "https://www.experientiallabs.ai/pricing" },
      { label: "Credits & billing", url: "https://platform.experientiallabs.ai/docs/billing" },
      { label: "Is GPT-6 Astra still free? (Sep 8)", url: "https://www.aimiracle.ai/ai-news/experiential-labs-ai/" },
      { label: "MyDealz €0.83 deal thread", url: "https://www.mydealz.de/deals/api-credits-und-kostenlose-ki-limits-fable-51-und-chatgpt-astra-deepseek-v4-falsh-luna-qwen-38-27b-nach-zahlung-von-083-euro-2836100" },
    ],
    faq: [
      { q: "What does the $1 actually unlock?", a: "Settled $1 + card on file turns on credit overflow past free daily limits. Reports: $4 instant + $5 after $1 (+$1 for GitHub star) ≈ $9–13 credits usable on all models." },
      { q: "Why do new accounts need more verification?", a: "Credits stay locked until email verified. Free-limit overflow needs settled $1. Fresh IPs/emails hit 409 account_exists / 403 signup_disabled / 429 rate_limited." },
      { q: "Is Astra still free?", a: "No. Sep 4–7 only. Since Sep 8 it is $10 in / $50 out per 1M, same as OpenAI list." },
    ],
  },
  {
    slug: "groq",
    name: "Groq",
    tagline: "Fastest free tier · 30 RPM, 1000 req/day",
    siteUrl: "https://groq.com",
    signupUrl: "https://console.groq.com",
    docsUrl: "https://console.groq.com/docs",
    pricingUrl: "https://groq.com/pricing",
    baseUrl: "https://api.groq.com/openai/v1",
    tier: "free",
    tierLabel: "Free tier",
    headline: "LPU speed for realtime agents, no card",
    freeAllowance: "30 req/min, ~1000 req/day on most models (14,400/day on Llama 3.1 8B). 100k–500k tokens/day depending on model.",
    rateLimits: "Enforced at org level, not per key. Whisper + Llama 3.3 70B + Qwen3 + GPT-OSS in free catalog.",
    verification: { card: false, phone: true, email: true, notes: "Phone verification required at signup. No card. Commercial use OK, no training on inputs by default." },
    lastChecked: "2026-09-10T00:00:00.000Z",
    status: "working",
    statusNote: "Standing free tier, narrow curated catalog. Best when latency matters more than variety.",
    models: [
      { id: "llama-3.3-70b-versatile", context: "128k", contextTokens: 131072, note: "~320 tok/s" },
      { id: "llama-3.1-8b-instant", context: "128k", contextTokens: 131072, note: "14.4k req/day ceiling" },
      { id: "qwen3-32b", context: "128k", contextTokens: 131072 },
      { id: "openai/gpt-oss-120b", context: "128k", contextTokens: 131072 },
    ],
    curlExample: `curl https://api.groq.com/openai/v1/chat/completions \\
  -H "Authorization: Bearer $GROQ_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"llama-3.3-70b-versatile","messages":[{"role":"user","content":"say ok"}]}'`,
    pros: ["Fastest free inference we track", "Fully OpenAI-compatible", "Generous small-model daily caps"],
    cons: ["Narrow catalog vs routers", "Org-level limits — extra keys don't help"],
    sources: [{ label: "Groq pricing", url: "https://groq.com/pricing" }],
    faq: [{ q: "Card needed?", a: "No. Phone + email only." }],
  },
  {
    slug: "cerebras",
    name: "Cerebras",
    tagline: "~1M tokens/day free · wafer-scale speed",
    siteUrl: "https://cerebras.ai",
    signupUrl: "https://cloud.cerebras.ai",
    docsUrl: "https://inference-docs.cerebras.ai",
    pricingUrl: "https://cerebras.ai/pricing",
    baseUrl: "https://api.cerebras.ai/v1",
    tier: "free",
    tierLabel: "Free tier",
    headline: "Batch-friendly free throughput",
    freeAllowance: "~1M tokens/day, 10–30 req/min depending on model. Llama 3.1 8B, Qwen 3 235B, GPT-OSS 120B in free set.",
    rateLimits: "Per-model RPM varies. Multi-thousand tok/s.",
    verification: { card: false, phone: false, email: true, notes: "Email signup. Don't resell or hand off keys." },
    lastChecked: "2026-09-10T00:00:00.000Z",
    status: "working",
    statusNote: "Standing tier. Great second fallback behind Groq.",
    models: [
      { id: "llama3.1-8b", context: "128k", contextTokens: 131072 },
      { id: "qwen-3-235b-a22b", context: "128k", contextTokens: 131072 },
      { id: "gpt-oss-120b", context: "128k", contextTokens: 131072 },
    ],
    curlExample: `curl https://api.cerebras.ai/v1/chat/completions \\
  -H "Authorization: Bearer $CEREBRAS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"llama3.1-8b","messages":[{"role":"user","content":"say ok"}]}'`,
    pros: ["High daily token volume", "Huge models surprisingly fast"],
    cons: ["Smaller free catalog than routers"],
    sources: [{ label: "Cerebras inference docs", url: "https://inference-docs.cerebras.ai" }],
    faq: [{ q: "Can I share the endpoint?", a: "No — single-user personal use. Resale breaks ToS." }],
  },
  {
    slug: "google-ai-studio",
    name: "Google AI Studio",
    tagline: "1M ctx Gemini free · per-project caps",
    siteUrl: "https://aistudio.google.com",
    signupUrl: "https://aistudio.google.com/apikey",
    docsUrl: "https://ai.google.dev/gemini-api/docs",
    pricingUrl: "https://ai.google.dev/gemini-api/docs/pricing",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai/",
    tier: "free",
    tierLabel: "Free tier",
    headline: "Free 1M-context Flash for long documents",
    freeAllowance: "Gemini 2.5 Flash 10 RPM, Flash-Lite 15 RPM, 20–1500 req/day per project. 2.5 Pro / 3.1 Pro Preview paid-only.",
    rateLimits: "Per-project, visible in AI Studio. Batch/Flex 50% off on paid. Mandatory spend caps since Apr 2026.",
    verification: { card: false, phone: false, email: true, notes: "Google account. Free prompts may train models outside UK/CH/EEA/EU. Mar 2026 ToS narrows to professional/business use." },
    lastChecked: "2026-09-10T00:00:00.000Z",
    status: "working",
    statusNote: "Flash tier free stands. Pro previews moved paid-only. Partial OpenAI compat — native SDK best for RAG/files.",
    models: [
      { id: "gemini-2.5-flash", context: "1M", contextTokens: 1048576 },
      { id: "gemini-2.5-flash-lite", context: "1M", contextTokens: 1048576 },
      { id: "gemma-3-12b", context: "128k", contextTokens: 131072 },
    ],
    curlExample: `curl https://generativelanguage.googleapis.com/v1beta/openai/chat/completions \\
  -H "Authorization: Bearer $GEMINI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"gemini-2.5-flash","messages":[{"role":"user","content":"say ok"}]}'`,
    pros: ["Only free 1M ctx with multimodal input", "Per-project quotas scale with projects"],
    cons: ["Partial OpenAI compat", "Training + business-use clauses to read"],
    sources: [{ label: "Gemini API pricing", url: "https://ai.google.dev/gemini-api/docs/pricing" }],
    faq: [{ q: "2.0 Flash gone?", a: "Deprecated Jun 1 2026. Migrate to 2.5 Flash / 3.x Flash." }],
  },
  {
    slug: "mistral",
    name: "Mistral",
    tagline: "~1B tokens/mo experiment · coders dream",
    siteUrl: "https://mistral.ai",
    signupUrl: "https://console.mistral.ai",
    docsUrl: "https://docs.mistral.ai",
    pricingUrl: "https://mistral.ai/pricing",
    baseUrl: "https://api.mistral.ai/v1",
    tier: "free",
    tierLabel: "Free tier",
    headline: "Biggest monthly free volume — with a training tradeoff",
    freeAllowance: "Experiment tier ~1B tokens/month across Codestral, Devstral, Large 3, Small. $10/mo API credits also reported on free plan.",
    rateLimits: "Variable by model. Batch halves price, cached input up to 90% off on paid.",
    verification: { card: false, phone: true, email: true, notes: "Phone required. Free tier opt-in to data training. Docs say upgrade for production — try-and-explore framing." },
    lastChecked: "2026-09-10T00:00:00.000Z",
    status: "working",
    statusNote: "Most generous volume if you accept training opt-in. Best for coding workloads.",
    models: [
      { id: "codestral-latest", context: "256k", contextTokens: 256000 },
      { id: "devstral-medium-latest", context: "256k", contextTokens: 256000 },
      { id: "mistral-large-latest", context: "128k", contextTokens: 131072 },
      { id: "mistral-small-latest", context: "128k", contextTokens: 131072 },
    ],
    curlExample: `curl https://api.mistral.ai/v1/chat/completions \\
  -H "Authorization: Bearer $MISTRAL_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"codestral-latest","messages":[{"role":"user","content":"say ok"}]}'`,
    pros: ["Unmatched free volume", "Codestral elite for code"],
    cons: ["Training opt-in required", "Eval-first terms, not production SLA"],
    sources: [{ label: "Mistral pricing", url: "https://mistral.ai/pricing" }],
    faq: [{ q: "Production OK?", a: "Officially try-and-explore. Upgrade for production per docs." }],
  },
  {
    slug: "openrouter",
    name: "OpenRouter",
    tagline: "25+ free models · 50/day, 1000/day after $10",
    siteUrl: "https://openrouter.ai",
    signupUrl: "https://openrouter.ai/keys",
    docsUrl: "https://openrouter.ai/docs",
    pricingUrl: "https://openrouter.ai/pricing",
    baseUrl: "https://openrouter.ai/api/v1",
    tier: "free",
    tierLabel: "Free tier",
    headline: "One key, every free route, auto-failover",
    freeAllowance: "20 RPM on :free variants. 50 req/day under $10 lifetime credits, 1000/day at/above $10 (credits never expire). Shared across all free models + keys on account.",
    rateLimits: "Provider-side TPM caps also apply. 429 = your cap or upstream free pool saturated.",
    verification: { card: false, phone: false, email: true, notes: "Email only. $10 purchase is normal credit, not free inference — it lifts the daily ceiling from 50 to 1000." },
    lastChecked: "2026-09-10T00:00:00.000Z",
    status: "working",
    statusNote: "Roster rotates. Extra keys on same account add zero quota. Paid variants billed per token + 5.5% fee.",
    models: [
      { id: "qwen/qwen3-coder:free", context: "262k", contextTokens: 262144 },
      { id: "deepseek/deepseek-r1:free", context: "164k", contextTokens: 163840 },
      { id: "meta-llama/llama-3.3-70b-instruct:free", context: "128k", contextTokens: 131072 },
      { id: "google/gemma-3-12b:free", context: "128k", contextTokens: 131072 },
    ],
    curlExample: `curl https://openrouter.ai/api/v1/chat/completions \\
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"qwen/qwen3-coder:free","messages":[{"role":"user","content":"say ok"}]}'`,
    pros: ["Widest free variety one key", "Failover across providers", "$10 once = 1000/day forever"],
    cons: ["50/day starting cap tiny for agents", "Free pool congestion at peak"],
    sources: [
      { label: "OpenRouter pricing", url: "https://openrouter.ai/pricing" },
      { label: "Free limits", url: "https://openrouter.ai/docs/api_reference/limits" },
    ],
    faq: [
      { q: "Per-model quota?", a: "No. 50 (or 1000) shared across all :free models on the account." },
      { q: "Does $10 buy inference?", a: "Yes, normal credit — bonus is the ceiling lift from 50 to 1000 free req/day." },
    ],
  },
  {
    slug: "fireworks-ai",
    name: "Fireworks AI",
    tagline: "$1 trial credit · fast serverless",
    siteUrl: "https://fireworks.ai",
    signupUrl: "https://fireworks.ai/signup",
    docsUrl: "https://docs.fireworks.ai",
    pricingUrl: "https://fireworks.ai/pricing",
    baseUrl: "https://api.fireworks.ai/inference/v1",
    tier: "trial",
    tierLabel: "$1 trial",
    headline: "$1 prepaid credit to test fast inference",
    freeAllowance: "$1 trial credit, prepaid. After exhaustion add payment + credits (or auto top-up) to continue.",
    rateLimits: "Account limits rise with spend. Phi-4, Llama 3.3 70B commonly tested on trial.",
    verification: { card: false, phone: false, email: true, notes: "Email signup for trial. Card needed to continue past $1." },
    lastChecked: "2026-09-10T00:00:00.000Z",
    status: "working",
    statusNote: "Classic $1 gateway drug. Enough for a few hundred test calls on small models.",
    models: [
      { id: "llama-v3p3-70b-instruct", context: "128k", contextTokens: 131072 },
      { id: "phi-4", context: "16k", contextTokens: 16384 },
    ],
    curlExample: `curl https://api.fireworks.ai/inference/v1/chat/completions \\
  -H "Authorization: Bearer $FIREWORKS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"accounts/fireworks/models/llama-v3p3-70b-instruct","messages":[{"role":"user","content":"say ok"}]}'`,
    pros: ["No card to start", "Fast serverless + on-demand options"],
    cons: ["$1 burns fast on 70B", "Needs top-up to keep going"],
    sources: [{ label: "Fireworks pricing", url: "https://fireworks.ai/pricing" }],
    faq: [{ q: "How far does $1 go?", a: "Hundreds of small-model calls. 70B output-heavy agents eat it in an evening." }],
  },
  {
    slug: "together-ai",
    name: "Together AI",
    tagline: "$1 free credits · open-source LLMs",
    siteUrl: "https://together.ai",
    signupUrl: "https://api.together.ai/signup",
    docsUrl: "https://docs.together.ai",
    pricingUrl: "https://together.ai/pricing",
    baseUrl: "https://api.together.ai/v1",
    tier: "trial",
    tierLabel: "$1 trial",
    headline: "$1 to test Llama / Mixtral / Code Llama fast",
    freeAllowance: "$1 free credits on signup, pay-per-token after.",
    rateLimits: "Per-token billing by model. Good for evals, not sustained agents.",
    verification: { card: false, phone: false, email: true, notes: "Email signup. Card on file to continue past credit." },
    lastChecked: "2026-09-10T00:00:00.000Z",
    status: "working",
    statusNote: "Mirrors Fireworks: great sampler, not a home base.",
    models: [
      { id: "meta-llama/Llama-3-70b-chat-hf", context: "8k", contextTokens: 8192 },
      { id: "mistralai/Mixtral-8x22B-Instruct-v0.1", context: "64k", contextTokens: 65536 },
    ],
    curlExample: `curl https://api.together.ai/v1/chat/completions \\
  -H "Authorization: Bearer $TOGETHER_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"meta-llama/Llama-3-70b-chat-hf","messages":[{"role":"user","content":"say ok"}]}'`,
    pros: ["Clean open-model catalog", "Fast eval loop"],
    cons: ["$1 = sampling only"],
    sources: [{ label: "Together pricing", url: "https://together.ai/pricing" }],
    faq: [],
  },
  {
    slug: "pollinations",
    name: "Pollinations",
    tagline: "Anonymous · no signup · GPT-OSS 20B",
    siteUrl: "https://pollinations.ai",
    signupUrl: "https://pollinations.ai",
    docsUrl: "https://github.com/pollinations/pollinations",
    pricingUrl: "https://pollinations.ai",
    baseUrl: "https://text.pollinations.ai/openai",
    tier: "free",
    tierLabel: "Anonymous",
    headline: "Zero-friction overflow when everything else caps",
    freeAllowance: "Anonymous tier, no key. 1 concurrent per IP, community-funded bandwidth. Expect ads/notices injected occasionally.",
    rateLimits: "Per-IP throttling. Queue parallel calls client-side.",
    verification: { card: false, phone: false, email: false, notes: "No account. Be respectful — sponsors cover bandwidth. Don't hammer." },
    lastChecked: "2026-09-10T00:00:00.000Z",
    status: "working",
    statusNote: "Weakest quality (20B class) but zero signup. Use for 90% cheap calls, paid key for hard reasoning.",
    models: [{ id: "openai-fast", context: "32k", contextTokens: 32768, note: "GPT-OSS 20B, tool-capable" }],
    curlExample: `curl https://text.pollinations.ai/openai/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{"model":"openai-fast","messages":[{"role":"user","content":"say ok"}]}'`,
    pros: ["No signup at all", "Open-source, self-hostable"],
    cons: ["20B-class ceiling", "Rate wobble + injected notices"],
    sources: [{ label: "Pollinations repo", url: "https://github.com/pollinations/pollinations" }],
    faq: [],
  },
  {
    slug: "zhipu-ai",
    name: "Zhipu AI",
    tagline: "20M token welcome + permanent Flash free",
    siteUrl: "https://zhipu.ai",
    signupUrl: "https://open.bigmodel.cn",
    docsUrl: "https://docs.zhipu.ai",
    pricingUrl: "https://open.bigmodel.cn/pricing",
    baseUrl: "https://open.bigmodel.cn/api/paas/v4",
    tier: "free",
    tierLabel: "Free tier",
    headline: "GLM Flash free forever, no expiry",
    freeAllowance: "20M token welcome package + permanently free Flash models (GLM-4.7-Flash, 4.5-Flash, 4.6V-Flash), no rate limits or expiration published.",
    rateLimits: "Function calling supported. China-based, non-commercial carve-outs on some rows.",
    verification: { card: false, phone: true, email: true, notes: "Phone verify common. Check regional availability." },
    lastChecked: "2026-09-10T00:00:00.000Z",
    status: "working",
    statusNote: "Underrated for agents: free Flash + tool calls holds up.",
    models: [
      { id: "glm-4.7-flash", context: "128k", contextTokens: 131072 },
      { id: "glm-4.5-flash", context: "128k", contextTokens: 131072 },
      { id: "glm-4.6v-flash", context: "128k", contextTokens: 131072 },
    ],
    curlExample: `curl https://open.bigmodel.cn/api/paas/v4/chat/completions \\
  -H "Authorization: Bearer $ZHIPU_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"glm-4.7-flash","messages":[{"role":"user","content":"say ok"}]}'`,
    pros: ["Permanent free Flash", "Tool calls included"],
    cons: ["Phone/region friction", "Docs partially Chinese-first"],
    sources: [{ label: "Zhipu pricing", url: "https://open.bigmodel.cn/pricing" }],
    faq: [],
  },
  {
    slug: "github-models",
    name: "GitHub Models",
    tagline: "Retired Jul 30 2026 · kept as death-alert proof",
    siteUrl: "https://github.com/marketplace/models",
    signupUrl: "https://github.com/marketplace/models",
    docsUrl: "https://docs.github.com/github-models",
    pricingUrl: "https://github.com/marketplace/models",
    baseUrl: "https://models.github.ai/inference",
    tier: "dead",
    tierLabel: "Retired",
    headline: "Retired — why we track death alerts",
    freeAllowance: "Was 10–15 RPM, 50–150 req/day on 100+ models. Retired 2026-07-30 per GitHub docs.",
    rateLimits: "None — endpoint retired.",
    verification: { card: false, phone: false, email: true, notes: "Kept so you trust our dead badges. We delist fast." },
    lastChecked: "2026-09-10T00:00:00.000Z",
    status: "retired",
    statusNote: "Official docs state retired. Former free GPT-4o / GPT-4.1 playground gone. Use Groq/Cerebras instead.",
    models: [],
    curlExample: `# retired — do not use`,
    pros: [],
    cons: ["Gone"],
    sources: [{ label: "GitHub Models docs", url: "https://docs.github.com/github-models" }],
    faq: [{ q: "Replacement?", a: "Groq free for speed, OpenRouter free for variety, xKiro for token volume." }],
  },
];

export const promos = [
  {
    slug: "experiential-1-dollar",
    title: "Experiential Labs $1 verification",
    deal: "$1 → $5/day free DeepSeek + Luna + ~$9–13 credits",
    status: "live-capped",
    expiry: "No published end date — Astra/Fable portion ended Sep 8",
    url: "/promos/1-dollar-deals",
    provider: "experiential-labs",
  },
  {
    slug: "command-code-1-dollar",
    title: "Command Code $1/mo",
    deal: "$1/mo → $40 DeepSeek V4 Pro usage",
    status: "live",
    expiry: "Subscription, cancel anytime",
    url: "/promos/1-dollar-deals",
    provider: "experiential-labs",
  },
  {
    slug: "fireworks-1-dollar",
    title: "Fireworks $1 trial",
    deal: "$1 prepaid inference credit",
    status: "live",
    expiry: "Until exhausted",
    url: "/promos/1-dollar-deals",
    provider: "fireworks-ai",
  },
  {
    slug: "together-1-dollar",
    title: "Together $1 credits",
    deal: "$1 free credits on signup",
    status: "live",
    expiry: "Until exhausted",
    url: "/promos/1-dollar-deals",
    provider: "together-ai",
  },
];

export const keywords = [
  { kw: "free ai models", intent: "Best-of + live status table", kd: "High", priority: 1 },
  { kw: "free ai api", intent: "Directory + no-card filter", kd: "High", priority: 1 },
  { kw: "free llm api", intent: "Dev table: base_url + curl", kd: "Medium-High", priority: 1 },
  { kw: "deepseek free api no card", intent: "Model page + 3 routes", kd: "Medium", priority: 2 },
  { kw: "qwen coder free api", intent: "Model page + curl", kd: "Medium", priority: 2 },
  { kw: "openai compatible free api", intent: "Integration guide", kd: "Medium", priority: 2 },
  { kw: "$1 ai api", intent: "$1 deals page", kd: "Low", priority: 2 },
  { kw: "experiential labs $1 promo", intent: "Deal page + verification steps", kd: "Low", priority: 3 },
];
