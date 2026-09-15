export const siteConfig = {
  // Core identity
  name: "Rakesh Patel",
  title: "Rakesh Patel | Full-Stack Developer from Kathmandu, Nepal",
  description:
    "Rakesh Patel is a full-stack developer based in Kathmandu, Nepal, specializing in building scalable web applications using React, Next.js, TypeScript, Node.js, and modern web technologies. Explore projects, case studies, and development insights.",

  // URLs
  url:
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://rakeshpatel.me",
  basePath: "/",

  // Branding
  ogImage: "https://rakeshpatel.me/og-image.png",
  favicon: "/favicon.ico",
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
    "Rakesh Patel Full-Stack Developer",
  ],

  // Navigation (helps sitemap + structure later)
  nav: [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],

  // Dynamic SEO defaults (for pages)
  seo: {
    titleTemplate: "%s | Rakesh Patel",
    defaultTitle: "Rakesh Patel | Full-Stack Developer",
    description:
      "Full-stack developer building modern, scalable, and high-performance web applications using React, Next.js, and TypeScript.",
  },

  // Open Graph defaults
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rakeshpatel.me",
    siteName: "Rakesh Patel Portfolio",
    images: [
      {
        url: "https://rakeshpatel.me/og-image.png", // same as ogImage above
        width: 1200,
        height: 630,
        alt: "Rakesh Patel Portfolio",
      },
    ],
  },

  // Twitter metadata
  twitter: {
    handle: "@1o1rakesh",
    cardType: "summary_large_image",
  },

  // Schema (for structured data)
  schema: {
    type: "Person",
    name: "Rakesh Patel",
    url: "https://rakeshpatel.me",
    sameAs: [
      "https://github.com/rakeshpatel-dev",
      "https://x.com/1o1rakesh",
      "https://linkedin.com/in/1o1rakesh",
      "https://instagram.com/1o1rakesh",
      "https://facebook.com/1o1rakesh",
    ],
    jobTitle: "Full-Stack Developer",
    location: "Kathmandu, Nepal",
  },
};

// Canonical URL helper. Omitted outside production so that on localhost
// (e.g. during `npm run dev`) Utterances builds its OAuth redirect_uri from
// the page origin and the sign-in popup returns to localhost instead of the
// deployed site.
export function canonicalUrl(path = "/"): string | undefined {
  if (process.env.NODE_ENV !== "production") return undefined
  return `${siteConfig.url.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`
}