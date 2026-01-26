// app/projects/layout.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Projects",
    template: "Projects | %s",
  },
  description:
    "A curated list of real-world projects with technologies, challenges, and outcomes.",
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
