"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

const UTTERANCES_REPO = "rakeshpatel-dev/next-folio"

export function Comments() {
  const containerRef = useRef<HTMLDivElement>(null)
  // Tracks which path the embed was mounted for, so client-side navigation
  // between posts loads the issue for the new post instead of keeping the old one.
  const mountedFor = useRef<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const container = containerRef.current
    if (!container || mountedFor.current === pathname) return

    mountedFor.current = pathname
    container.replaceChildren()

    const script = document.createElement("script")
    script.src = "https://utteranc.es/client.js"
    script.async = true
    script.setAttribute("repo", UTTERANCES_REPO)
    script.setAttribute("issue-term", "pathname")
    script.setAttribute("label", "Comment")
    script.setAttribute("theme", "preferred-color-scheme")
    script.setAttribute("crossorigin", "anonymous")
    container.appendChild(script)
  }, [pathname])

  return (
    <section className="mx-auto max-w-3xl pb-12">
      <h2 className="mb-6 border-t pt-12 text-2xl font-bold tracking-tight">Comments</h2>
      <div ref={containerRef} />
    </section>
  )
}
