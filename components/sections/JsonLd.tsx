import { siteConfig } from "@/lib/site-config";
import Script from "next/script";

export function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    jobTitle: "Full-Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.github,
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
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
