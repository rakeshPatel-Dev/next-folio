"use client"

import { useEffect, useRef } from "react"

const UTTERANCES_REPO = "rakeshpatel-dev/next-folio"

export function Comments() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || container.hasChildNodes()) return

    const script = document.createElement("script")
    script.src = "https://utteranc.es/client.js"
    script.async = true
    script.setAttribute("repo", UTTERANCES_REPO)
    script.setAttribute("issue-term", "pathname")
    script.setAttribute("label", "Comment")
    script.setAttribute("theme", "preferred-color-scheme")
    script.setAttribute("crossorigin", "anonymous")
    container.appendChild(script)

    // Utterances replaces its own script element with the iframe in place.
    return () => {
      container.innerHTML = ""
    }
  }, [])

  return (
    <section className="mx-auto max-w-3xl px-6 pb-12">
      <h2 className="mb-6 text-2xl font-bold tracking-tight border-t pt-12">Comments</h2>
      <div ref={containerRef} />
    </section>
  )
}