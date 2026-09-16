import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"

const DEFAULT_BARS = 40

/** Seeded shuffle so SSR + client match, but values look random. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildBarMeta(count: number) {
  const rand = mulberry32(0x6d757369) // "musi"
  return Array.from({ length: count }, () => {
    const duration = `${(1.4 + rand() * 1.8).toFixed(2)}s` // 1.4s–3.2s
    const delay = `${(-rand() * 2.8).toFixed(2)}s`
    const peak = (0.35 + rand() * 0.65).toFixed(2) // 0.35–1
    return { duration, delay, peak }
  })
}

const BAR_META = buildBarMeta(32)

type MusicVisualizerProps = {
  className?: string
  /** Number of bars around the circle (max 32). */
  bars?: number
}

/** Pure-CSS equalizer bars in a ring outside the album art. Parent should be `relative`. */
export function MusicVisualizer({ className, bars = DEFAULT_BARS }: MusicVisualizerProps) {
  const count = Math.min(Math.max(bars, 1), BAR_META.length)

  return (
    <div aria-hidden className={cn("music-viz", className)}>
      {BAR_META.slice(0, count).map((meta, i) => (
        <span
          key={i}
          className="music-viz-spoke"
          style={{ transform: `rotate(${(360 / count) * i}deg)` }}
        >
          <span
            className="music-viz-bar status-green"
            style={
              {
                animationDuration: meta.duration,
                animationDelay: meta.delay,
                "--peak": meta.peak,
              } as CSSProperties
            }
          />
        </span>
      ))}
    </div>
  )
}
