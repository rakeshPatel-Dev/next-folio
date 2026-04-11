export const siteConfig = {
  // Core identity
  name: "Rakesh Patel",
  title: "Rakesh Patel | Full-Stack Developer from Kathmandu, Nepal",
  description:
    "Rakesh Patel is a full-stack developer based in Kathmandu, Nepal, specializing in building scalable web applications using React, Next.js, TypeScript, Node.js, and modern web technologies. Explore projects, case studies, and development insights.",

  // URLs
  url:
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://rakeshthedev.vercel.app",
  basePath: "/",

  // Branding
  ogImage: "https://rakeshthedev.vercel.app/og-image.png",
  favicon: "/favicon.ico",

  // SEO verification
  googleVerification: "google4b9a8ebb48599781",

  // Author info
  author: {
    name: "Rakesh Patel",
    email: "rakeshpatel.dev@gmail.com", // optional but good for schema
  },

  // Social links
  links: {
    twitter: "https://twitter.com/rakeshthedev",
    github: "https://github.com/rakeshthedev",
    linkedin: "https://linkedin.com/in/rakeshpatel-dev", // add this if not already
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
    ""
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
    url: "https://rakeshthedev.vercel.app",
    siteName: "Rakesh Patel Portfolio",
    images: [
      {
        url: "https://rakeshthedev.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rakesh Patel Portfolio",
      },
    ],
  },

  // Twitter metadata
  twitter: {
    handle: "@rakeshthedev",
    cardType: "summary_large_image",
  },

  // Schema (for structured data)
  schema: {
    type: "Person",
    name: "Rakesh Patel",
    url: "https://rakeshthedev.vercel.app",
    sameAs: [
      "https://github.com/rakeshthedev",
      "https://twitter.com/rakeshthedev",
      "https://linkedin.com/in/rakeshpatel-dev",
    ],
    jobTitle: "Full-Stack Developer",
    location: "Kathmandu, Nepal",
  },
};