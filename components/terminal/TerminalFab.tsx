"use client"

import { motion } from "motion/react"
import { ArrowUpRight, SquareTerminal } from "lucide-react"

const SHELL_URL = "https://shell.rakeshpatel.me"

export function TerminalFab() {
  // Shared entrance: the pill drops in.
  const entrance = {
    initial: { opacity: 0, y: -32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }

  return (
    <motion.div {...entrance} className="fixed right-5 bottom-5 z-[80] flex flex-col items-center">
      <motion.a
        href={SHELL_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Terminal — open shell.rakeshpatel.me"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 520, damping: 18, mass: 0.6 }}
        className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-foreground/10 bg-foreground py-2 pr-4 pl-3 font-mono text-[13px] tracking-wide text-background lowercase shadow-lg focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:outline-none"
      >
        {/* Default content */}
        <span className="relative z-20 flex items-center gap-2 transition-all duration-300 ease-out group-hover:-translate-y-6 group-hover:opacity-0">
          <SquareTerminal className="size-4" strokeWidth={2.2} />
          <span>terminal</span>
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-background/50 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-background/80" />
          </span>
        </span>

        {/* Flood circle */}
        <span
          aria-hidden
          className="absolute top-full left-1/2 z-0 aspect-square w-[140%] -translate-x-1/2 rounded-full bg-background transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-focus-within:-translate-y-[62%] group-hover:-translate-y-[62%]"
        />

        {/* Swap content */}
        <span className="pointer-events-none absolute inset-0 z-20 flex translate-y-6 items-center justify-center gap-1.5 font-mono text-[13px] text-foreground lowercase opacity-0 transition-all delay-200 duration-300 ease-out group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
          switch <ArrowUpRight className="size-3.5" />
        </span>
      </motion.a>
    </motion.div>
  )
}
