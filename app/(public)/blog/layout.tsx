// app/blogs/layout.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Blogs",
    template: "Blogs | %s",
  },
  description:
    "Articles on web development, software engineering, and real-world learning.",
}

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
