"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { headerData } from "@/config/headerData"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Home, Menu, X } from "lucide-react"
import { LetsTalkDialog } from "@/components/ui/lets-talk-dialog"

/**
 * Mobile  → static pill bar. No scroll listener, no blur, no animations.
 * Desktop → original animated pill with scroll-shrink + sliding CTA.
 */
const Header = () => {
  const pathname = usePathname()
  const [isTalkOpen, setIsTalkOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Only run on desktop; gate with matchMedia so mobile pays nothing.
  const [isScrolled, setIsScrolled] = useState(false)
  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(min-width: 768px)")
    if (!mq.matches) return

    const sentinel = document.createElement("div")
    sentinel.setAttribute("aria-hidden", "true")
    sentinel.style.cssText =
      "position:absolute;top:20px;left:0;width:1px;height:1px;pointer-events:none;visibility:hidden;"
    document.body.prepend(sentinel)

    const io = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      { threshold: 0 }
    )
    io.observe(sentinel)

    return () => {
      io.disconnect()
      sentinel.remove()
    }
  }, [])

  // Lock body scroll while menu is open
  useEffect(() => {
    if (!isMenuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="font-sans fixed inset-x-0 top-3 z-50 px-3 md:top-4 md:px-6">
        {/* ============================================================
         * MOBILE — static, flat, no effects
         * ============================================================ */}
        <div className="mx-auto w-full md:hidden">
          <div className="flex items-center justify-between rounded-full border border-foreground/10 bg-background/95 px-3 py-2">
            {/* Home */}
            <Link
              href="/"
              aria-label="Home"
              className="flex h-10 items-center gap-2 rounded-full px-2 active:bg-foreground/8"
            >
              <Home className="size-5 shrink-0" />
              <span className="text-base font-medium">
                {headerData.find((d) => d.href === "/")?.label ?? "Home"}
              </span>
            </Link>

            {/* Menu toggle */}
            <button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 active:bg-foreground/8"
            >
              {isMenuOpen ? (
                <X className="size-5" strokeWidth={2} />
              ) : (
                <Menu className="size-5" strokeWidth={2} />
              )}
            </button>
          </div>

          {/* Dropdown */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="mt-2 overflow-hidden rounded-2xl border border-foreground/10 bg-background/95 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.2)]"
              >
                <nav className="flex flex-col p-2">
                  {headerData
                    .filter((d) => d.href !== "/")
                    .map((data) => {
                      const isActive = pathname?.startsWith(data.href)
                      return (
                        <Link
                          key={data.href}
                          href={data.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={cn(
                            "flex min-h-12 items-center rounded-xl px-4 text-base font-medium",
                            isActive
                              ? "bg-foreground/8 text-foreground"
                              : "text-foreground/70 active:bg-foreground/8"
                          )}
                        >
                          {data.label}
                        </Link>
                      )
                    })}

                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false)
                      setIsTalkOpen(true)
                    }}
                    className="mt-1 flex min-h-12 items-center justify-between rounded-xl bg-foreground px-4 text-base font-semibold text-background active:scale-[0.98] dark:bg-white dark:text-black"
                  >
                    Let&apos;s Talk
                    <ArrowUpRight className="size-4" strokeWidth={2.5} />
                  </button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ============================================================
         * DESKTOP — original animated pill
         * ============================================================ */}
        <div className="relative mx-auto hidden w-fit md:block">
          <div
            className={cn(
              "pointer-events-none absolute -inset-x-6 -inset-y-2 rounded-full bg-foreground/5 blur-2xl transition-opacity duration-500",
              isScrolled ? "opacity-100" : "opacity-0"
            )}
            aria-hidden
          />

          <div
            className={cn(
              "relative flex max-w-fit items-center justify-center rounded-full border backdrop-blur-3xl",
              "transition-[background-color,border-color,box-shadow,padding] duration-300",
              isScrolled
                ? [
                  "gap-3",
                  "border-foreground/10 bg-background/70 py-1.5 pl-4 pr-1.5 dark:border-white/12 dark:bg-background/60",
                  "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-2px_rgba(0,0,0,0.08),0_12px_32px_-8px_rgba(0,0,0,0.12)]",
                  "ring-1 ring-inset ring-white/40 dark:ring-white/5",
                ].join(" ")
                : "gap-0 border-transparent bg-transparent px-4 py-3"
            )}
          >
            <nav className="flex items-center gap-0.5 md:gap-2">
              {headerData.map((data, idx) => {
                const isActive =
                  data.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(data.href)
                const isHome = data.href === "/"

                return (
                  <Link
                    key={idx}
                    href={data.href}
                    aria-label={isHome ? "Home" : undefined}
                    className={cn(
                      "group/home relative rounded-full transition-all duration-200 ease-out",
                      isHome
                        ? "flex h-8 items-center justify-center"
                        : "px-3 py-1.5 text-base font-medium",
                      isActive
                        ? "text-foreground"
                        : "px-1.5 pl-2 text-foreground/55 [@media(hover:hover)]:hover:bg-foreground/6 [@media(hover:hover)]:hover:text-foreground active:scale-[0.97]"
                    )}
                    style={{
                      animation: "fadeIn 0.3s ease forwards",
                      animationDelay: `${idx * 0.05}s`,
                      opacity: 0,
                    }}
                  >
                    {isHome ? (
                      <span className="relative flex items-center">
                        <Home className="size-5 shrink-0 transition-transform duration-300 ease-out group-hover/home:-translate-x-0.5" />
                        <span className="ml-0 w-0 overflow-hidden whitespace-nowrap text-base font-medium opacity-0 transition-all duration-300 ease-out group-hover/home:ml-2 group-hover/home:w-12 group-hover/home:opacity-100">
                          <span className="inline-block translate-x-2 transition-transform duration-300 ease-out group-hover/home:translate-x-0">
                            {data.label}
                          </span>
                        </span>
                      </span>
                    ) : (
                      data.label
                    )}

                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className={cn(
                          "absolute bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-foreground/80",
                          isHome ? "w-3" : "w-4"
                        )}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            <AnimatePresence initial={false}>
              {isScrolled && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setIsTalkOpen(true)}
                    className={cn(
                      "group/cta relative mr-1 inline-flex items-center whitespace-nowrap rounded-full",
                      "bg-foreground px-4 py-1.5 dark:bg-white",
                      "text-sm font-semibold text-background dark:text-black",
                      "shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_10px_-2px_rgba(0,0,0,0.15)]",
                      "transition-[box-shadow,transform] duration-200 active:scale-[0.98]",
                      "[@media(hover:hover)]:hover:shadow-[0_1px_2px_rgba(0,0,0,0.12),0_6px_16px_-2px_rgba(0,0,0,0.2)]"
                    )}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-linear-to-b from-white/20 to-transparent opacity-60"
                    />
                    <span className="relative flex items-center">
                      <span className="transition-transform duration-300 ease-out group-hover/cta:-translate-x-1">
                        Let&apos;s Talk
                      </span>
                      <span className="ml-0 w-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover/cta:ml-1.5 group-hover/cta:w-4 group-hover/cta:opacity-100">
                        <ArrowUpRight
                          className="h-4 w-4 shrink-0 translate-x-2 transition-transform duration-300 ease-out group-hover/cta:translate-x-0"
                          strokeWidth={2.5}
                        />
                      </span>
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <LetsTalkDialog open={isTalkOpen} onClose={() => setIsTalkOpen(false)} />
    </>
  )
}

export default Header