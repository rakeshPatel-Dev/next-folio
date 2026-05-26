import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: {
    default: "Blogs",
    template: "%s | Blogs",
  },
  description:
    "Articles on web development, software engineering, and real-world learning.",
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    title: "Blogs | Rakesh Patel",
    description:
      "Articles on web development, software engineering, and real-world learning.",
    url: `${siteConfig.url}/blog`,
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Rakesh Patel — Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | Rakesh Patel",
    description:
      "Articles on web development, software engineering, and real-world learning.",
    images: [`${siteConfig.url}/og-image.png`],
  },
}

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
