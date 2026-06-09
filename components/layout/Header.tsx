"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { headerData } from "@/config/headerData"
import { cn } from "@/lib/utils"

const Header = () => {
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [ isScrolled])

  return (
    <header
      className={cn(
        "font-sans fixed  z-50 w-full transition-all duration-300 px-4 sm:px-6",
        isScrolled ? "top-2" : "top-4"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-5xl flex-row items-center justify-between rounded-full border border-transparent transition-all duration-300  px-4 md:px-5",
          isScrolled
            ? "border-foreground/15 bg-background/75 dark:border-white/15 dark:bg-black/75 py-2"
            : "py-3"
        )}
      >

        {/* Logo */}
        <Link
          href="/"
          aria-label="Home"
          className={cn(
            "relative overflow-hidden rounded-xl transition-opacity duration-150 hover:opacity-85",
            isScrolled ? "h-12 w-12 md:h-14 md:w-14 transition-all duration-300" : "h-15 w-15 md:h-18 md:w-18"
          )}
        >
          {/* Dark mode logo (white mark on black bg) */}
          <Image
            width={72}
            height={72}
            src="https://res.cloudinary.com/dzebbt9j5/image/upload/v1781007642/rakesh-dark_npr0v6.png"
            alt="Logo"
            className={cn(
              "absolute inset-0 h-full w-full rounded-xl object-contain transition-opacity duration-300",
              mounted && resolvedTheme === "dark" ? "opacity-100" : "opacity-0"
            )}
            priority
          />
          {/* Light mode logo (black mark on white bg) */}
          <Image
            width={72}
            height={72}
            src="https://res.cloudinary.com/dzebbt9j5/image/upload/v1781007660/rakesh-light_tsdkju.png"
            alt="Logo"
            className={cn(
              "absolute inset-0 h-full w-full rounded-xl object-contain transition-opacity duration-300",
              mounted && resolvedTheme !== "dark" ? "opacity-100" : "opacity-0"
            )}
            priority
          />
        </Link>

        {/* Navigation - using CSS animations instead of framer-motion */}
        <nav>
          <div className="flex items-center gap-1 md:gap-2">
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
                    "relative px-3 py-1.5 text-[13px] md:text-sm font-medium rounded-lg transition-colors duration-150",
                    isActive
                      ? "text-foreground dark:text-white"
                      : "text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white hover:bg-foreground/5 dark:hover:bg-white/5"
                  )}
                  style={{
                    animation: 'fadeIn 0.3s ease forwards',
                    animationDelay: `${idx * 0.05}s`,
                    opacity: 0
                  }}
                >
                  {data.label}
                  {/* Active underline dot */}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-foreground/80 dark:bg-white/80" />
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Empty placeholder for symmetry if needed, or a 'Hire Me' CTA */}
        <div className="hidden sm:block">
          {isScrolled && (
            <Link
              href="/contact"
              className="rounded-full bg-foreground dark:bg-white px-4 py-2 text-xs font-semibold text-background dark:text-black transition-opacity hover:opacity-90"
            >
              Let&apos;s Talk
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}


export default Header
