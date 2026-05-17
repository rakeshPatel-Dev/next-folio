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
  const { theme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
          className="rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm overflow-hidden transition-opacity duration-150 hover:opacity-85"
        >
          <Image
            width={55}
            height={55}
            src="/images/logo.png"
            alt="Logo"
            className={cn("h-18 w-18 bg-black  rounded-xl object-contain md:h-20 md:w-20", isScrolled ? "h-12 transition-all duration-300 w-12 md:h-14 md:w-14" : "")}
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
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-[14px] rounded-full bg-foreground/80 dark:bg-white/80" />
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
