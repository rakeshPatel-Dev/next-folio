export const siteConfig = {
  // Core identity
  name: "Rakesh Patel",
  description:
    "Full-stack engineer in Kathmandu, Nepal, building AI-native products and multi-tenant SaaS systems with React, Next.js, TypeScript, and Node.js.",

  // URLs
  url:
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://rakeshpatel.me",
  basePath: "/",

  // Branding
  ogImage: "https://rakeshpatel.me/og-image.png",
  logo: {
    light: "/images/rakesh-light.png",
    dark: "/images/rakesh-dark.png",
  },

  // Layout — change once; applied on root via `max-w-app` / `px-app`
  layout: {
    maxWidth: "48rem", // ≈ max-w-3xl; try 56rem (4xl), 64rem (5xl), 72rem (6xl)
    paddingX: "clamp(1.25rem, 3vw, 52px)",
  },

  // SEO verification
  googleVerification: "google4b9a8ebb48599781",

  // Author info
  author: {
    name: "Rakesh Patel",
    email: "dev@rakeshpatel.me", // optional but good for schema
  },

  // Social links
  links: {
    twitter: "https://x.com/1o1rakesh",
    github: "https://github.com/rakeshpatel-dev",
    linkedin: "https://linkedin.com/in/1o1rakesh",
    instagram: "https://instagram.com/1o1rakesh",
    facebook: "https://facebook.com/1o1rakesh",
  },

  // SEO keywords (secondary signal only)
  keywords: [
    "Rakesh Patel developer",
    "Rakesh Patel portfolio",
    "Full-stack developer Nepal",
    "React developer Kathmandu",
    "Next.js developer Nepal",
    "TypeScript developer",
    "MERN stack developer",
    "Frontend developer Nepal",
    "Backend developer Node.js",
    "Web developer portfolio",
    "Web developer Kathmandu",
    "Web developer Nepal",
    "Web developer Kathmandu Nepal",
    "Rakesh Patel Nepal",
    "Rakesh Patel Kathmandu",
    "Rakesh Patel Kathmandu Nepal",
    "Rakesh Patel Full-Stack Engineer",
    "AI-native product development",
    "LLM application development",
    "GenAI developer Nepal",
    "AI engineer Kathmandu",
    "AI product engineer Nepal",
    "agentic development",
    "SaaS developer Nepal",
    "SaaS engineer Kathmandu",
    "SaaS full-stack developer",
    "multi-tenant SaaS architecture",
  ],

  // Schema lives in components/sections/JsonLd.tsx, which is what actually renders.
  // Nav lives in data/headerData.ts, which is what the Header renders.
};

// Canonical URL helper. Omitted outside production so that on localhost
// (e.g. during `npm run dev`) Utterances builds its OAuth redirect_uri from
// the page origin and the sign-in popup returns to localhost instead of the
// deployed site.
export function canonicalUrl(path = "/"): string | undefined {
  if (process.env.NODE_ENV !== "production") return undefined
  return `${siteConfig.url.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`
}