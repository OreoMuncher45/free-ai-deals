import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/providers";

// MVP robots: humans + every major LLM crawler explicitly allowed.
// No disallow anywhere — freshest content must be reachable.
// AI-trainer opt-outs (Google-Extended etc.) are intentionally NOT blocked:
// this is a public directory that wants to be cited.
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "Amazonbot",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "Diffbot",
  "FacebookBot",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((ua) => ({ userAgent: ua, allow: "/" })),
    ],
    sitemap: [
      `${SITE_URL}/sitemap-index.xml`,
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/providers/sitemap.xml`,
      `${SITE_URL}/models/sitemap.xml`,
      `${SITE_URL}/promos/sitemap.xml`,
    ],
    host: SITE_URL.replace(/^https?:\/\//, ""),
  };
}
