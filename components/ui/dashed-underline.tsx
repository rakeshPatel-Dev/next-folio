import type { SVGProps } from "react"
import { cn } from "@/lib/utils"

/**
 * Defaults — tweak here; props override per-instance.
 *
 * Circular dots: dash length stays 0 + round linecaps.
 * Dot size = strokeWidth. Spacing = gap (second dashArray value).
 */
const dashedUnderlineConfig = {
  /** ViewBox / intrinsic width */
  width: 64,
  /** ViewBox / intrinsic height */
  height: 8,
  /** Dot diameter */
  strokeWidth: 2,
  /**
   * SVG stroke-dasharray.
   * Use "0 <gap>" for circular dots (e.g. "0 8").
   */
  dashArray: "0 8",
  /** SVG stroke-dashoffset */
  dashOffset: 0,
  /** Must stay "round" for circular dots */
  strokeLinecap: "round" as const,
  /** Vertical center of the line (0–height) */
  y: 4,
} as const

type DashedUnderlineConfig = {
  width?: number
  height?: number
  strokeWidth?: number
  dashArray?: string
  dashOffset?: number
  strokeLinecap?: "butt" | "round" | "square"
  y?: number
}

export type DashedUnderlineProps = Omit<
  SVGProps<SVGSVGElement>,
  "width" | "height" | "viewBox"
> &
  DashedUnderlineConfig & {
    /** Accessible label; omit for decorative (default) */
    title?: string
  }

export function DashedUnderline({
  width = dashedUnderlineConfig.width,
  height = dashedUnderlineConfig.height,
  strokeWidth = dashedUnderlineConfig.strokeWidth,
  dashArray = dashedUnderlineConfig.dashArray,
  dashOffset = dashedUnderlineConfig.dashOffset,
  strokeLinecap = dashedUnderlineConfig.strokeLinecap,
  y = dashedUnderlineConfig.y,
  className,
  title,
  ...props
}: DashedUnderlineProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className={cn("shrink-0 max-w-full text-foreground/25", className)}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <line
        x1={strokeWidth}
        y1={y}
        x2={width - strokeWidth}
        y2={y}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeDasharray={dashArray}
        strokeDashoffset={dashOffset}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export { dashedUnderlineConfig }
