"use client"

import { useEffect, useState, useRef } from "react"
import { createPortal } from "react-dom"

export default function TOCPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const lastActiveRef = useRef<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const container = containerRef.current
    if (!container) return

    function findActive(containerEl: HTMLDivElement) {
      return (
        containerEl.querySelector('[data-active="true"]') ||
        containerEl.querySelector('[data-active=true]') ||
        containerEl.querySelector('[aria-current="true"]') ||
        containerEl.querySelector('.active')
      ) as HTMLElement | null
    }

    // Scroll active into view when it changes
    const mo = new MutationObserver(() => {
      const active = findActive(container)
      if (active) {
        const id = active.getAttribute('href') || active.id || ''    
            if (lastActiveRef.current !== id) {
          lastActiveRef.current = id
          try {
            active.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
          } catch {}
        }
      }
    })

    mo.observe(container, { attributes: true, subtree: true, childList: true })

    // Also run once to position correctly on load
    const init = () => {
      const a = findActive(container)
      if (a) a.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    }
    init()

    return () => mo.disconnect()
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
    <div ref={containerRef} className="fixed right-4 top-[6.5rem] z-50 w-56 max-h-[78vh] overflow-auto py-4 toc-scrollbar-hidden">
      {children}
    </div>,
    document.body
  )
}
