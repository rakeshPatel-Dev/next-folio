"use client"

import { LocationTag } from "@/components/location-tag"
import { Button } from "@/components/ui/button"
import { Highlighter } from "@/components/ui/highlighter"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { MagneticHover, Reveal } from "../motion/Reveal"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

// Dynamically import Ripple to defer loading - this is a heavy animation
const Ripple = dynamic(() => import("@/components/ui/ripple").then(mod => mod.Ripple), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10" />,
})

const HeroData = () => {
  return (
    <section className="relative mb-2 flex h-[90svh] max-h-195 min-h-145 w-full flex-col items-center justify-center overflow-hidden rounded-2xl text-center">

      {/* Subtle radial glow behind content — theme-aware */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, color-mix(in srgb, var(--primary) 6%, transparent), transparent)",
        }}
      />

      {/* Content stack */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-6">

        {/* Location badge */}
        <Reveal variant="fadeIn" delay={0.05}>
          <LocationTag city="Kathmandu" country="Nepal" timezone="NPT" />
        </Reveal>

        {/* Name - Add priority for LCP */}
        <h1 className="font-sans text-5xl font-black tracking-tight text-primary drop-shadow-sm sm:text-6xl md:text-7xl lg:text-8xl">
          Rakesh Patel
        </h1>

        {/* Tagline */}
        <Reveal variant="fadeUp" delay={0.1}>
          <p className="max-w-2xl text-base leading-relaxed text-foreground/60 sm:text-lg md:text-xl lg:text-2xl">
            A{" "}
            <Highlighter action="underline" color="#FF9800">
              <span className="font-bold font-sans text-foreground/90">
                Frontend Developer
              </span>
            </Highlighter>{" "}
            focused on clean interfaces, motion, and usability.
          </p>
        </Reveal>

        {/* CTA buttons */}
        <Reveal variant="fadeUp" delay={0.2}>
          <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
            <MagneticHover strength={0.3}>
              <Link href="/projects" prefetch>
                <Button size="lg" className="min-w-37 border-dashed border-3 cursor-pointer rounded-xl font-semibold">
                  View My Work
                </Button>
              </Link>
            </MagneticHover>

            <MagneticHover strength={0.4}>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-37 border-dashed border-3 rounded-xl font-bold"
                >
                  Resume
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </a>
            </MagneticHover>
          </div>
        </Reveal>

        {/* Scroll hint - defer animation */}
        <Reveal variant="fadeIn" delay={0.4}>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="mt-6 flex flex-col items-center gap-1.5"
          >
            <div className="h-8 w-px rounded-full bg-linear-to-b from-transparent via-border to-transparent" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50 uppercase">
              scroll
            </span>
          </motion.div>
        </Reveal>
      </div>

      {/* Ripple stays behind content - lazy loaded */}
      {/* Removed Ripple for better LCP performance */}
      <div className="absolute inset-0 -z-10 flex items-end justify-center">
        {/* <Ripple /> */}
      </div>

      {/* Toast portal anchor — kept for compat */}
      <div id="toastContainer" className="fixed right-5 top-5 z-50 flex flex-col gap-2" />
    </section>
  )
}

export default HeroData
