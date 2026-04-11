// app/blogs/layout.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Blogs",
    template: "%s | Blogs",
  },
  description:
    "Articles on web development, software engineering, and real-world learning.",
  openGraph: {
    title: "Blogs | Rakesh Patel",
    description:
      "Articles on web development, software engineering, and real-world learning.",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "https://rakeshthedev.vercel.app"}/blog`,
    type: "website",
    images: [
      {
        url: "https://rakeshthedev.vercel.app/og-image.png",
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
    images: ["https://rakeshthedev.vercel.app/og-image.png"],
  },
}

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
