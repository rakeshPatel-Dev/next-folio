import type { Metadata } from "next"
import { canonicalUrl, siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  description:
    "Articles on web development, software engineering, and real-world learning.",
  alternates: {
    canonical: canonicalUrl("/blog"),
  },
  openGraph: {
    title: "Blog | Rakesh Patel",
    description:
      "Articles on web development, software engineering, and real-world learning.",
    url: `${siteConfig.url}/blog`,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Rakesh Patel — Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Rakesh Patel",
    description:
      "Articles on web development, software engineering, and real-world learning.",
    images: [siteConfig.ogImage],
  },
}

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
