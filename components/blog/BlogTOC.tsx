"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ListTree, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMounted } from "@/hooks/useIsMounted"

export type TocItem = {
  title?: unknown
  url: string
  depth: number
}

function getHeadingId(url: string) {
  return url.startsWith("#") ? url.slice(1) : url
}

/** Track which heading is in view — IntersectionObserver (no scroll listeners). */
function useActiveHeading(items: TocItem[]) {
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    if (items.length === 0) return

    const headings = items
      .map((item) => document.getElementById(getHeadingId(item.url)))
      .filter((el): el is HTMLElement => Boolean(el))

    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id)
          return
        }

        const above = headings
          .filter((h) => h.getBoundingClientRect().top < window.innerHeight * 0.25)
          .at(-1)
        if (above) setActiveId(above.id)
      },
      {
        rootMargin: "-15% 0px -70% 0px",
        threshold: [0, 1],
      }
    )

    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [items])

  return activeId
}

function TocNav({
  items,
  activeId,
  onNavigate,
  className,
}: {
  items: TocItem[]
  activeId: string
  onNavigate?: () => void
  className?: string
}) {
  return (
    <nav aria-label="Table of contents" className={className}>
      <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        <ListTree className="size-3.5 opacity-70" aria-hidden />
        On this page
      </p>
      <ul className="space-y-0.5 border-l border-border/70">
        {items.map((item) => {
          const id = getHeadingId(item.url)
          const isActive = activeId === id
          const indent =
            item.depth <= 2 ? "pl-3" : item.depth === 3 ? "pl-5" : "pl-7"

          return (
            <li key={item.url}>
              <a
                href={item.url}
                aria-current={isActive ? "location" : undefined}
                onClick={(e) => {
                  const el = document.getElementById(id)
                  if (!el) return
                  e.preventDefault()
                  el.scrollIntoView({ behavior: "smooth", block: "start" })
                  history.replaceState(null, "", `#${id}`)
                  onNavigate?.()
                }}
                className={cn(
                  "relative -ml-px block border-l-2 py-1.5 text-[13px] leading-snug transition-colors",
                  indent,
                  isActive
                    ? "border-foreground font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground focus-visible:text-foreground"
                )}
              >
                {item.title as React.ReactNode}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

type BlogTOCProps = {
  items: TocItem[]
  variant: "mobile" | "desktop"
}

/**
 * Blog TOC
 * - mobile: collapsible above the article
 * - desktop: fixed float portaled to document.body (escapes PageTransition transforms
 *   so position:fixed actually sticks while scrolling)
 */
export default function BlogTOC({ items, variant }: BlogTOCProps) {
  const toc = useMemo(
    () => items.filter((item) => item.depth >= 2 && item.depth <= 3),
    [items]
  )
  const activeId = useActiveHeading(toc)
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const mounted = useIsMounted()

  if (toc.length < 2) return null

  if (variant === "mobile") {
    return (
      <details
        ref={detailsRef}
        className="group mb-8 rounded-xl border border-border/70 bg-card/40 open:bg-card/60 xl:hidden"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2">
            <ListTree className="size-4 text-muted-foreground" aria-hidden />
            On this page
            <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-normal text-muted-foreground">
              {toc.length}
            </span>
          </span>
          <ChevronDown className="size-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden />
        </summary>
        <div className="border-t border-border/60 px-4 py-3">
          <TocNav
            items={toc}
            activeId={activeId}
            onNavigate={() => {
              if (detailsRef.current) detailsRef.current.open = false
            }}
          />
        </div>
      </details>
    )
  }

  // Portal to <body> so `fixed` isn't trapped by framer-motion / PageTransition transforms.
  if (!mounted) return null

  return createPortal(
    <aside
      aria-label="Article outline"
      className={cn(
        "pointer-events-none fixed top-24 z-40 hidden max-h-[calc(100vh-8rem)] w-52 overflow-y-auto overscroll-contain xl:block",
        "left-[max(1rem,calc(50%+min(28rem,50%-1.5rem)+1.75rem))]",
        "[scrollbar-width:thin]"
      )}
    >
      <div className="pointer-events-auto pr-2">
        <TocNav items={toc} activeId={activeId} />
      </div>
    </aside>,
    document.body
  )
}
