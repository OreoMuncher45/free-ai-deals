export type ModelRoute = {
  provider: string;
  providerSlug: string;
  what: string;
  cost: string;
  verify: string;
  url: string;
};

export type FreeModelPage = {
  slug: string;
  name: string;
  aliases: string[];
  keywords: string[];
  status: "free" | "promo-ended" | "paid" | "trial";
  statusNote: string;
  blurb: string;
  inputPerM: string;
  outputPerM: string;
  context: string;
  routes: ModelRoute[];
  faq: { q: string; a: string }[];
  lastChecked: string;
};

export const models: FreeModelPage[] = [
  {
    slug: "gpt-6-astra-free",
    name: "GPT-6 Astra free",
    aliases: ["free Astra", "free gpt 6", "free gpt", "GPT-6 Astra promo"],
    keywords: ["free astra", "free gpt 6", "free gpt", "gpt-6 astra free", "gpt 6 free api"],
    status: "promo-ended",
    statusNote: "Free promo Sep 4–7, 2026 only. Since Sep 8: $10 in / $50 out per 1M everywhere.",
    blurb:
      "OpenAI's flagship for long-horizon agentic work — analysis, software engineering, deep research, computer + browser use. 1.05M context. The free promo lasted four days; this page tracks every place you can still touch it free or cheapest.",
    inputPerM: "$10",
    outputPerM: "$50",
    context: "1.05M",
    routes: [
      { provider: "Experiential Labs", providerSlug: "experiential-labs", what: "Promo row — ended Sep 8", cost: "Now $10/$50 list", verify: "$1 settled + card for overflow", url: "/providers/experiential-labs" },
      { provider: "Vercel AI Gateway", providerSlug: "experiential-labs", what: "$5 credits every 30 days (never-paid accounts)", cost: "$0 up to credit", verify: "Vercel account", url: "https://vercel.com/docs/ai-gateway" },
      { provider: "v0 by Vercel", providerSlug: "experiential-labs", what: "Model picker trial after Google sign-up, time-boxed → Mini", cost: "$0 while trial lasts", verify: "Google sign-up", url: "https://v0.dev" },
      { provider: "ChatGPT Plus", providerSlug: "experiential-labs", what: "Rolled out Sep 5–6 weekend, inside plan limits", cost: "$20/mo", verify: "Plus subscription", url: "https://chatgpt.com" },
      { provider: "OpenAI API / OpenRouter", providerSlug: "openrouter", what: "Model id gpt-6-astra, pay per token", cost: "$10 in / $50 out", verify: "API key + credits", url: "/providers/openrouter" },
      { provider: "GitHub Copilot", providerSlug: "github-models", what: "Pro+/Max/Business/Enterprise, usage-based list price", cost: "Plan + usage", verify: "Copilot plan", url: "/providers/github-models" },
    ],
    faq: [
      { q: "Is GPT-6 Astra free?", a: "Not anymore. Experiential Labs listed it at $0 output Sep 4–7, 2026. Since the morning of Sep 8 it is $10 in / $50 out per million tokens — 2.5x GPT-5.6 Sol. No end date or cap was ever published." },
      { q: "Where can I use free GPT-6?", a: "Cheapest legal touches now: Vercel AI Gateway $5/30d credits, v0 trial, or ChatGPT Plus $20/mo inside plan limits. For API builds, xKiro and OpenRouter free tiers carry GPT-class alternatives (DeepSeek, Qwen) at $0 — see our free providers index." },
      { q: "What is GPT-6 Astra Pro?", a: "Same weights, reasoning.mode=pro for harder tasks. Routed via OpenRouter on Experiential, same $10/$50. No free tier." },
    ],
    lastChecked: "2026-09-11T02:00:00.000Z",
  },
  {
    slug: "claude-fable-5-1-free",
    name: "Claude Fable 5.1 free",
    aliases: ["free Fable 5", "free fable 5.1", "Fable free", "Claude Fable promo"],
    keywords: ["free fable 5", "free fable 5.1", "fable 5 free", "claude fable free"],
    status: "promo-ended",
    statusNote: "Promo ended Sep 8, 2026 with Astra. Back to $10 in / $50 out.",
    blurb:
      "Anthropic's Mythos-class flagship above Opus — instruction following, long documents, extended thinking, 1M context. Free through Experiential launch week, now list price. This page tracks where Fable-class work still costs $0.",
    inputPerM: "$10",
    outputPerM: "$50",
    context: "1M",
    routes: [
      { provider: "Experiential Labs", providerSlug: "experiential-labs", what: "Promo row — ended Sep 8", cost: "Now $10/$50 list", verify: "$1 settled + card", url: "/providers/experiential-labs" },
      { provider: "xKiro (alternatives)", providerSlug: "xkiro", what: "Claude Sonnet 5 / Opus paid; free Qwen + DeepSeek cover drafting", cost: "$0 (alternatives)", verify: "Email only", url: "/providers/xkiro" },
      { provider: "OpenRouter", providerSlug: "openrouter", what: "Pay-per-token route, 5.5% fee on credits", cost: "$10/$50 + fee", verify: "Credits", url: "/providers/openrouter" },
    ],
    faq: [
      { q: "Is Fable 5.1 free anywhere?", a: "The $0 promo ended Sep 8, 2026 alongside Astra. No current $0 route we can verify. Closest $0 Claude-class drafting: xKiro free Qwen/DeepSeek rows, then upgrade call to paid Fable for final passes." },
      { q: "Free Fable 5 vs free Sonnet?", a: "Neither has a standing free tier. For $0 Claude-style instruction following, teams routinely draft on Qwen3.5-flash:free or DeepSeek V4 Flash (both 1M ctx, $0 on xKiro) and reserve Fable for judging." },
    ],
    lastChecked: "2026-09-11T02:00:00.000Z",
  },
  {
    slug: "deepseek-v4-flash-free",
    name: "DeepSeek V4 Flash free",
    aliases: ["free deepseek", "deepseek free api", "deepseek v4 free"],
    keywords: ["free deepseek", "deepseek free api", "deepseek v4 free", "deepseek flash free"],
    status: "free",
    statusNote: "Still $0 on xKiro free tier and Experiential promo row as of Sep 11.",
    blurb:
      "The cheapest reasoning model that still codes: sparse MoE, 1.05M context, native vision, tool calling, compressed KV cache for long agent runs. $0 on two independent rails — the safest free default.",
    inputPerM: "$0 free · $0.042 list",
    outputPerM: "$0 free · $0.085 list",
    context: "1.05M",
    routes: [
      { provider: "xKiro", providerSlug: "xkiro", what: "deepseek/deepseek-v4-flash — 5M tokens/day shared pool", cost: "$0", verify: "Email only", url: "/providers/xkiro" },
      { provider: "Experiential Labs", providerSlug: "experiential-labs", what: "Promo row $0 in/$0 out", cost: "$0", verify: "Email; $1 unlocks overflow", url: "/providers/experiential-labs" },
      { provider: "OpenRouter", providerSlug: "openrouter", what: ":free variant when donated capacity live", cost: "$0 · 50/day (1000 after $10)", verify: "Email", url: "/providers/openrouter" },
      { provider: "DeepSeek direct", providerSlug: "xkiro", what: "New accounts report up to 5M token grant, ~30 days", cost: "$0 grant → $0.28/$0.42 paid", verify: "Email/phone, no card for grant", url: "https://platform.deepseek.com" },
    ],
    faq: [
      { q: "Where is DeepSeek free with no card?", a: "xKiro (email only, 5M/day) and Experiential promo row. Both OpenAI-compatible — swap base_url + key only." },
      { q: "Flash vs Pro for agents?", a: "Flash is the cost-efficient tier with 8B/16B active params and 60 tok/s routes; Pro reasons harder but spills more thinking tokens. Start Flash, escalate Pro per-task." },
    ],
    lastChecked: "2026-09-11T02:00:00.000Z",
  },
  {
    slug: "deepseek-v4-pro-free",
    name: "DeepSeek V4 Pro free",
    aliases: ["free deepseek pro", "deepseek pro free"],
    keywords: ["free deepseek pro", "deepseek v4 pro free", "deepseek pro free api"],
    status: "free",
    statusNote: "$0 on xKiro free tier (reasoning spill is heavy — budget 2-3x thinking tokens).",
    blurb:
      "DeepSeek's heavy reasoner — maths, codegen, long-horizon tasks. Same 1M context as Flash, stronger judgments, chattier hidden reasoning. Free on xKiro; $1 promos stretch it furthest.",
    inputPerM: "$0 free",
    outputPerM: "$0 free",
    context: "1M",
    routes: [
      { provider: "xKiro", providerSlug: "xkiro", what: "deepseek/deepseek-v4-pro — shared 5M/day", cost: "$0", verify: "Email only", url: "/providers/xkiro" },
      { provider: "Command Code $1/mo", providerSlug: "experiential-labs", what: "$40 DeepSeek V4 Pro usage incl.", cost: "$1/mo", verify: "Subscription", url: "/promos/1-dollar-deals" },
    ],
    faq: [
      { q: "Why does Pro burn faster than Flash?", a: "Thinking tokens bill as output. A trivial 'say ok' cost us 42 completion tokens on Pro vs 1 on Qwen flash. Keep max_tokens tight and reasoning effort low." },
    ],
    lastChecked: "2026-09-11T02:00:00.000Z",
  },
  {
    slug: "qwen3-coder-plus-free",
    name: "Qwen3 Coder Plus free",
    aliases: ["free qwen coder", "qwen coder free api", "free qwen"],
    keywords: ["free qwen coder", "qwen coder free", "free qwen", "qwen3 free api"],
    status: "free",
    statusNote: "$0 on xKiro, 1M context, zero reasoning dump in our probes.",
    blurb:
      "Qwen's coder-tuned free pick: 1M context, vision, tools, and the leanest token profile we measured (139 total vs 146 Pro on 'say ok'). Best drop-in for code agents on a free budget.",
    inputPerM: "$0 free",
    outputPerM: "$0 free",
    context: "1M",
    routes: [
      { provider: "xKiro", providerSlug: "xkiro", what: "qwen/qwen3-coder-plus:free — 5M/day pool", cost: "$0", verify: "Email only", url: "/providers/xkiro" },
      { provider: "OpenRouter", providerSlug: "openrouter", what: "Qwen3 Coder :free variants rotate", cost: "$0 · 50/day", verify: "Email", url: "/providers/openrouter" },
    ],
    faq: [
      { q: "Qwen coder vs DeepSeek for free coding?", a: "Qwen coder is leaner per call (no reasoning spill) and vision-capable. DeepSeek reasons deeper on hard bugs. Route routine edits to Qwen, escalate proofs to Pro." },
    ],
    lastChecked: "2026-09-11T02:00:00.000Z",
  },
  {
    slug: "qwen38-max-free",
    name: "Qwen3.8 Max free",
    aliases: ["free qwen max", "qwen 3.8 free"],
    keywords: ["free qwen max", "qwen 3.8 free", "qwen3.8 free api"],
    status: "free",
    statusNote: "$0 1M-context max snapshots on xKiro; paid list ~$2/$6.",
    blurb:
      "Alibaba's 2.4T-MoE max snapshot: text+image+video in, 1M context, post-trained for multi-step software projects and chart/document reasoning. Free with :free suffix on xKiro.",
    inputPerM: "$0 free · $2 list",
    outputPerM: "$0 free · $6 list",
    context: "1M",
    routes: [
      { provider: "xKiro", providerSlug: "xkiro", what: "qwen/qwen3.8-max:free", cost: "$0", verify: "Email only", url: "/providers/xkiro" },
      { provider: "Experiential Labs", providerSlug: "experiential-labs", what: "qwen3.8-27b promo $0 (smaller sibling)", cost: "$0", verify: "Email", url: "/providers/experiential-labs" },
    ],
    faq: [{ q: "Max vs Plus vs Flash?", a: "Max = strongest judgments, Plus = balanced, Flash = cheapest/fastest. All 1M ctx free on xKiro — pick per task, not per day." }],
    lastChecked: "2026-09-11T02:00:00.000Z",
  },
  {
    slug: "gpt-56-luna-free",
    name: "GPT-5.6 Luna free",
    aliases: ["free luna", "free gpt luna", "luna free api"],
    keywords: ["free luna", "free gpt luna", "gpt luna free", "free gpt"],
    status: "free",
    statusNote: "Still $0 on Experiential promo row + xKiro paid row varies — verify per call.",
    blurb:
      "OpenAI's cost-optimized Luna tier: 1M context, reasoning + tools + response format. Free on Experiential promo row (list $0.20/$1.20). Good GPT-flavored drafter when Astra is overkill.",
    inputPerM: "$0 promo · $0.20 list",
    outputPerM: "$0 promo · $1.20 list",
    context: "1M",
    routes: [
      { provider: "Experiential Labs", providerSlug: "experiential-labs", what: "Promo $0 in/$0 out", cost: "$0", verify: "Email; $1 overflow", url: "/providers/experiential-labs" },
      { provider: "MyDealz reports", providerSlug: "experiential-labs", what: "$5/day free Luna quoted post-$1", cost: "$1 settled", verify: "Card + $1", url: "/providers/experiential-labs" },
    ],
    faq: [{ q: "Is Luna free?", a: "On Experiential promo row, yes — $0/$0 at check time. List is $0.20/$1.20, so snapshot the promo page before big runs." }],
    lastChecked: "2026-09-11T02:00:00.000Z",
  },
  {
    slug: "mistral-codestral-free",
    name: "Codestral free",
    aliases: ["free codestral", "free mistral", "mistral free api"],
    keywords: ["free codestral", "free mistral", "mistral free api", "codestral free"],
    status: "free",
    statusNote: "Experiment tier ~1B tokens/mo (training opt-in) + xKiro $0 rows.",
    blurb:
      "Mistral's code specialist: 256k context, strong generation, batch-friendly. The experiment tier is the biggest monthly free volume we track — the price is data-training opt-in.",
    inputPerM: "$0 experiment",
    outputPerM: "$0 experiment",
    context: "256k",
    routes: [
      { provider: "Mistral", providerSlug: "mistral", what: "~1B tokens/mo experiment", cost: "$0", verify: "Phone + training opt-in", url: "/providers/mistral" },
      { provider: "xKiro", providerSlug: "xkiro", what: "mistralai/codestral-2508 — 5M/day pool", cost: "$0", verify: "Email only", url: "/providers/xkiro" },
    ],
    faq: [{ q: "Codestral vs Qwen coder free?", a: "Codestral wins raw codegen taste for many; Qwen wins context (1M vs 256k) and no-training terms. Keep both routes, fail over." }],
    lastChecked: "2026-09-11T02:00:00.000Z",
  },
  {
    slug: "gemini-flash-free",
    name: "Gemini Flash free",
    aliases: ["free gemini", "gemini free api", "free gemini flash"],
    keywords: ["free gemini", "gemini free api", "gemini flash free"],
    status: "free",
    statusNote: "Flash-tier free stands; Pro previews paid-only. Partial OpenAI compat.",
    blurb:
      "Google's free 1M-context multimodal workhorse: text+image+audio in, 10–15 RPM, 20–1500 req/day per project. Best free long-document reader.",
    inputPerM: "$0 · paid $0.30 list",
    outputPerM: "$0 · paid $2.50 list",
    context: "1M",
    routes: [
      { provider: "Google AI Studio", providerSlug: "google-ai-studio", what: "2.5 Flash 10 RPM / Lite 15 RPM", cost: "$0", verify: "Google account", url: "/providers/google-ai-studio" },
    ],
    faq: [{ q: "Can I use Gemini free commercially?", a: "Mar 2026 ToS narrows API use toward professional/business purposes and trains outside UK/CH/EEA/EU. Read the clause before shipping." }],
    lastChecked: "2026-09-11T02:00:00.000Z",
  },
  {
    slug: "glm-flash-free",
    name: "GLM Flash free",
    aliases: ["free glm", "glm free api", "zhipu free"],
    keywords: ["free glm", "glm free api", "glmv flash free"],
    status: "free",
    statusNote: "Permanent free Flash (4.7/4.5/4.6V) + 20M welcome tokens.",
    blurb:
      "Zhipu's permanent free Flash line with tool calling — no expiry published. Cheapest paid step-up too ($0.04/M in on 4.6v-flash), so $1 stretches furthest here.",
    inputPerM: "$0 free · $0.04 paid step-up",
    outputPerM: "$0 free · $0.40 paid step-up",
    context: "128k",
    routes: [
      { provider: "Zhipu AI", providerSlug: "zhipu-ai", what: "GLM-4.7/4.5/4.6V Flash permanent free", cost: "$0", verify: "Phone common", url: "/providers/zhipu-ai" },
    ],
    faq: [{ q: "How far does $1 go on GLM?", a: "~10M+ input-heavy tokens at $0.04/M — the best $1/token ratio in our table for agent loops." }],
    lastChecked: "2026-09-11T02:00:00.000Z",
  },
];
