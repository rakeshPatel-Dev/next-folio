import { canonicalUrl } from "@/lib/site-config";

export type Crumb = {
  name: string;
  href: string;
};

/**
 * BreadcrumbList structured data. Google uses this to render a readable trail in
 * the SERP in place of the raw URL path. `canonicalUrl` returns undefined outside
 * production, which is the correct behaviour for local/dev crawls.
 */
export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.href),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
