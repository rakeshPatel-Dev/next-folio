// app/projects/layout.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Projects",
    template: "%s | Projects",
  },
  description:
    "A curated list of real-world projects with technologies, challenges, and outcomes.",
  openGraph: {
    title: "Projects | Rakesh Patel",
    description:
      "A curated list of real-world projects with technologies, challenges, and outcomes.",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "https://rakeshthedev.vercel.app"}/projects`,
    type: "website",
    images: [
      {
        url: "https://rakeshthedev.vercel.app/og-image.png",
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
    images: ["https://rakeshthedev.vercel.app/og-image.png"],
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
