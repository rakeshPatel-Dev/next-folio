import { siteConfig } from "@/lib/site-config";

export function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.logo.dark}`,
    jobTitle: "Full-Stack Engineer",
    knowsAbout: [
      "AI-native product development",
      "SaaS engineering",
      "LLM application development",
      "Multi-tenant SaaS architecture",
      "Authentication and role-based access control",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Agentic development workflows",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.instagram,
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati",
      addressCountry: "Nepal",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
