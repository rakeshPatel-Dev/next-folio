"use client"

import { motion } from "motion/react"
import { ArrowUpRight, SquareTerminal } from "lucide-react"

const SHELL_URL = "https://shell.rakeshpatel.me"

export function TerminalFab() {
  return (
    <motion.a
      href={SHELL_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Terminal — open shell.rakeshpatel.me"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96, borderRadius: "16px" }}
      transition={{ type: "spring", stiffness: 520, damping: 18, mass: 0.6 }}
      className="group fixed right-5 bottom-5 z-[80] flex items-center gap-2 overflow-hidden rounded-full border border-foreground/10 bg-foreground py-2 pr-4 pl-3 font-mono text-[13px] tracking-wide text-background lowercase shadow-[0_8px_24px_-6px_rgba(0,0,0,0.35),0_2px_6px_-2px_rgba(0,0,0,0.2)] focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:outline-none"
    >
      {/* Inner top highlight — gives the pill a lit upper edge */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-30 h-1/2 rounded-t-full bg-gradient-to-b from-white/10 to-transparent"
      />

      {/* Default content — fades/slides out on hover */}
      <span className="relative z-20 flex items-center gap-2 transition-all duration-300 ease-out group-hover:-translate-y-6 group-hover:opacity-0">
        <SquareTerminal className="size-4" strokeWidth={2.2} />
        <span>terminal</span>
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-background/50 opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-background/80" />
        </span>
      </span>

      {/* Single circle — rises from bottom, swells to fill the whole pill */}
      <span
        aria-hidden
        className="absolute top-full left-1/2 z-0 aspect-square w-[140%] -translate-x-1/2 rounded-full bg-background transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-focus-within:-translate-y-[62%] group-hover:-translate-y-[62%]"
      >
        {/* Radial depth — brighter top, darker bottom, like a sphere */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.9),rgba(255,255,255,0)_55%,rgba(0,0,0,0.12)_100%)]"
        />
        {/* Soft inner rim shadow — the "curved edge" of the liquid surface */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full shadow-[inset_0_-8px_16px_-8px_rgba(0,0,0,0.25),inset_0_6px_12px_-6px_rgba(255,255,255,0.6)]"
        />
        {/* Top specular highlight — the little sheen that sells the volume */}
        <span
          aria-hidden
          className="absolute top-[8%] left-1/2 h-[18%] w-[55%] -translate-x-1/2 rounded-full bg-white/70 blur-md"
        />
      </span>

      {/* Switch content — slides up into view */}
      <span className="pointer-events-none absolute inset-0 z-20 flex translate-y-6 items-center justify-center gap-1.5 font-mono text-[13px] text-foreground lowercase opacity-0 transition-all delay-200 duration-300 ease-out group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
        switch <ArrowUpRight className="size-3.5" />
      </span>
    </motion.a>
  )
}
