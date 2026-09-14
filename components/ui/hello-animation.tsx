"use client"

import { AnimatedSVGText } from "svg-letter-draw"
import { cn } from "@/lib/utils"

// Local Space Grotesk TTF so opentype.js (used by svg-letter-draw) can parse it.
// The app loads Space Grotesk via next/font/google; this keeps the glyphs identical.
const FONT_URL = "/fonts/SpaceGrotesk.ttf"

// Space Grotesk Bold geometry at FONT_SIZE=60, letterSpacing=0 (measured via opentype.js):
// - the svg viewBox is `totalWidth` x (baseline + 20)
// - "Hello," glyphs span y = 30 -> 80.82, total width = 160.26
// Keep these in sync with FONT_SIZE/letterSpacing if you change them.
const FONT_SIZE = 60
const GLYPH_TOP = 0.1872 // fraction of svg width between the svg top and the cap-height top
const GLYPH_ASPECT = 160.26 / 50.82 // svg width : glyph-band height

/**
 * Letter-by-letter SVG draw animation of "Hello," (svg-letter-draw + opentype.js).
 * Uses the app's font: Space Grotesk. Colors follow the theme via currentColor.
 *
 * Sizing: the package renders its svg at width:100%, so visible size is governed by
 * the container width — not `fontSize`. Breakpoint max-widths keep it perfectly
 * proportioned on every device, and the crop is width-relative so it never clips.
 */
export function HelloAnimation({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full max-w-[min(100%,15rem)] text-foreground sm:max-w-[min(100%,22rem)] md:max-w-[min(100%,26rem)] lg:max-w-[min(100%,31rem)]",
        className
      )}
      role="img"
      aria-label="Hello,"
    >
      <div className="w-full overflow-hidden" style={{ aspectRatio: `${GLYPH_ASPECT} / 1` }}>
        <div style={{ marginTop: `${-GLYPH_TOP * 100}%` }}>
          <AnimatedSVGText
            fontUrl={FONT_URL}
            text="Hello,"
            fontSize={FONT_SIZE}
            letterSpacing={0}
            strokeWidth={2}
            letterAnimationDuration={1.2}
            letterDelay={0.15}
            fillAnimationType="draw"
            fillDrawDuration={0.6}
            lineColor="currentColor"
            fillColor="currentColor"
            pathDecimalPlaces={6}
          />
        </div>
      </div>
    </div>
  )
}