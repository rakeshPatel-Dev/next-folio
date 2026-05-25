"use client"

import { useEffect, useState, useRef } from "react"
import { createPortal } from "react-dom"

type TocItem = {
  title: React.ReactNode
  url: string
  depth: number
}

export default function TOCPortal({ items }: { items: TocItem[] }) {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [activeHash, setActiveHash] = useState<string>("")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const syncHash = () => setActiveHash(window.location.hash)

    syncHash()
    window.addEventListener("hashchange", syncHash)

    return () => window.removeEventListener("hashchange", syncHash)
  }, [mounted])

  // Intercept anchor clicks inside the TOC so scrolling is smooth
  useEffect(() => {
    if (!mounted) return
    const container = containerRef.current
    if (!container) return

    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      const a = target.closest ? (target.closest('a[href^="#"]') as HTMLAnchorElement | null) : null
      if (!a) return
      const href = a.getAttribute('href')
      if (!href || !href.startsWith('#')) return

      const id = href.slice(1)
      const el = document.getElementById(id)
      if (!el) return

      e.preventDefault()
      try {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // update hash without jumping
        history.replaceState(null, '', `#${id}`)
      } catch {
        // fallback
        window.location.hash = `#${id}`
      }
    }

    container.addEventListener('click', onClick)
    return () => container.removeEventListener('click', onClick)
  }, [mounted])

  if (!mounted) return null

  return createPortal(
    <div ref={containerRef} className="fixed right-4 top-26 z-50 w-56 max-h-[78vh] overflow-auto py-4 toc-scrollbar-hidden">
      <nav aria-label="Table of contents" className="space-y-1 text-sm">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
          On this page
        </p>
        <ul className="space-y-1">
          {items.map((item) => {
            const isActive = activeHash === item.url
            const indentClass =
              item.depth <= 2
                ? "pl-3"
                : item.depth === 3
                  ? "pl-6"
                  : item.depth === 4
                    ? "pl-9"
                    : "pl-12"

            return (
              <li key={item.url}>
                <a
                  href={item.url}
                  aria-current={isActive ? "true" : undefined}
                  className={`block rounded-md py-1 transition-colors ${indentClass} ${isActive ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {item.title}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>,
    document.body
  )
}
