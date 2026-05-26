import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: {
    default: "Projects",
    template: "%s | Projects",
  },
  description:
    "A curated list of real-world projects with technologies, challenges, and outcomes.",
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
  openGraph: {
    title: "Projects | Rakesh Patel",
    description:
      "A curated list of real-world projects with technologies, challenges, and outcomes.",
    url: `${siteConfig.url}/projects`,
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Rakesh Patel — Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Rakesh Patel",
    description:
      "A curated list of real-world projects with technologies, challenges, and outcomes.",
    images: [`${siteConfig.url}/og-image.png`],
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
