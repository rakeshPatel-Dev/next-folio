"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler"
import { headerData } from "@/config/headerData"
import { cn } from "@/lib/utils"

const Header = () => {
  const pathname = usePathname()

  return (
    <header className="font-sans sticky top-0 z-50 w-full border-b border-border/40 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-4xl flex-row items-center justify-between px-6 py-3">

        {/* Logo */}
        <Link
          href="/"
          className="rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm overflow-hidden bg-black transition-opacity duration-150 hover:opacity-85"
        >
          <Image
            width={64}
            height={64}
            src="/images/logo.png"
            alt="Logo"
            className="h-12 w-12 object-contain"
            priority
          />
        </Link>

        {/* Navigation - using CSS animations instead of framer-motion */}
        <nav>
          <div className="flex items-center gap-1">
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
                    "relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-150",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
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
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-3 rounded-full bg-foreground" />
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Theme toggle */}
        <AnimatedThemeToggler className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-muted/50 transition-colors duration-150" />
      </div>
    </header>
  )
}

export default Header
