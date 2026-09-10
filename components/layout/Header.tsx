"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { headerData } from "@/config/headerData"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react";

/**
 * Client island: scroll shrink + active pathname.
 * Centered pill nav; "Let's Talk" CTA slides in on scroll.
 */
const Header = () => {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "font-sans fixed z-50 w-full transition-all duration-300 px-4 sm:px-6 top-4",
      )}
    >
      <div className="relative mx-auto w-fit">
        {/* Soft ambient glow behind the pill (only when scrolled) */}
        <div
          className={cn(
            "pointer-events-none absolute -inset-x-6 -inset-y-2 rounded-full bg-foreground/5 blur-2xl transition-opacity duration-500",
            isScrolled ? "opacity-100" : "opacity-0"
          )}
          aria-hidden
        />

        <div
          className={cn(
            "relative flex max-w-fit items-center justify-center rounded-full border backdrop-blur-3xl transition-all duration-300",
            isScrolled
              ? [
                  // borders
                  "border-foreground/10 dark:border-white/12",
                  // background
                  "bg-background/70 dark:bg-background/60",
                  // padding + gap
                  "py-1.5 pl-4 pr-1.5 gap-3",
                  // layered shadow: tight ring + soft drop + deep ambient
                  "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-2px_rgba(0,0,0,0.08),0_12px_32px_-8px_rgba(0,0,0,0.12)]",
                  "dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_4px_16px_-2px_rgba(0,0,0,0.5),0_16px_40px_-8px_rgba(0,0,0,0.6)]",
                  // inner highlight for a "glass" top edge
                  "ring-1 ring-inset ring-white/40 dark:ring-white/5",
                ].join(" ")
              : "border-transparent bg-transparent py-3 px-4 gap-0"
          )}
        >
          {/* Nav */}
          <nav>
            <div className="flex items-center gap-0.5 md:gap-1">
              {headerData.map((data, idx) => {
                const isActive =
                  data.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(data.href)

                return (
                  <Link
                    key={idx}
                    href={data.href}
                    className={cn(
                      "relative px-3 py-1.5 text-base font-medium rounded-full",
                      "transition-all duration-200 ease-out",
                      isActive
                        ? "text-foreground"
                        : "text-foreground/55 hover:text-foreground hover:bg-foreground/6 active:scale-[0.97]"
                    )}
                    style={{
                      animation: "fadeIn 0.3s ease forwards",
                      animationDelay: `${idx * 0.05}s`,
                      opacity: 0,
                    }}
                  >
                    {data.label}

                    {/* Active underline — animated in */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-foreground/80"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* CTA — slides in on scroll */}
        <AnimatePresence initial={false}>
  {isScrolled && (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "auto" }}
      exit={{ opacity: 0, width: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      <Link
        href="/contact"
        className={cn(
          "group/cta relative inline-flex items-center whitespace-nowrap rounded-full",
          "bg-foreground dark:bg-white px-4 py-1.5",
          "text-sm font-semibold text-background dark:text-black",
          "transition-all duration-200",
          "shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_10px_-2px_rgba(0,0,0,0.15)]",
          "hover:shadow-[0_1px_2px_rgba(0,0,0,0.12),0_6px_16px_-2px_rgba(0,0,0,0.2)]",
          "active:scale-[0.98]"
        )}
      >
        {/* Subtle top gloss */}
        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-linear-to-b from-white/20 to-transparent opacity-60"
          aria-hidden
        />

        {/* Label + arrow — arrow slides in, label nudges left */}
        <span className="relative flex items-center">
          <span className="transition-transform duration-300 ease-out group-hover/cta:-translate-x-1">
            Let&apos;s Talk
          </span>

          {/* Arrow: slides in from the right */}
          <span className="ml-0 w-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover/cta:ml-1.5 group-hover/cta:w-4 group-hover/cta:opacity-100">
            <ArrowUpRight
              className="h-4 w-4 shrink-0 translate-x-2 transition-transform duration-300 ease-out group-hover/cta:translate-x-0"
              strokeWidth={2.5}
            />
          </span>
        </span>
      </Link>
    </motion.div>
  )}
</AnimatePresence>
        </div>
      </div>
    </header>
  )
}

export default Header