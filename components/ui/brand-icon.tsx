import type { CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Icon-only wrapper. Visual look is configured here / via props.
 * Border pills, hover expand, etc. belong on the parent — not here.
 */
const brandIconConfig = {
  size: 36,
  iconSize: 18,
  radius: "9999px",
  gradientAngle: "145deg",
  gradientHighlight: 0.22,
  gradientShade: 0.28,
  glow: 0.4,
  depth: 0.32,
  insetHighlight: 0.55,
  border: 0.45,
  blur: 10,
  glowBlur: 12,
  iconColor: "#ffffff",
} as const

type BrandIconConfig = {
  size?: number
  iconSize?: number
  radius?: string | number
  gradientAngle?: string
  gradientHighlight?: number
  gradientShade?: number
  glow?: number
  depth?: number
  insetHighlight?: number
  border?: number
  blur?: number
  glowBlur?: number
  iconColor?: string
}

export type BrandIconProps = BrandIconConfig & {
  color: string
  colorDark?: string
  className?: string
  /** The icon element to wrap */
  icon: ReactNode
}

export function BrandIcon({
  icon,
  color,
  colorDark,
  size = brandIconConfig.size,
  iconSize = brandIconConfig.iconSize,
  radius = brandIconConfig.radius,
  gradientAngle = brandIconConfig.gradientAngle,
  gradientHighlight = brandIconConfig.gradientHighlight,
  gradientShade = brandIconConfig.gradientShade,
  glow = brandIconConfig.glow,
  depth = brandIconConfig.depth,
  insetHighlight = brandIconConfig.insetHighlight,
  border = brandIconConfig.border,
  blur = brandIconConfig.blur,
  glowBlur = brandIconConfig.glowBlur,
  iconColor = brandIconConfig.iconColor,
  className,
}: BrandIconProps) {
  const style = {
    "--brand-icon-size": `${size}px`,
    "--brand-icon-glyph": `${iconSize}px`,
    "--brand-icon-radius": typeof radius === "number" ? `${radius}px` : radius,
    "--brand-icon-angle": gradientAngle,
    "--brand-icon-highlight": String(gradientHighlight),
    "--brand-icon-shade": String(gradientShade),
    "--brand-icon-glow": String(glow),
    "--brand-icon-depth": String(depth),
    "--brand-icon-inset": String(insetHighlight),
    "--brand-icon-border": String(border),
    "--brand-icon-blur": `${blur}px`,
    "--brand-icon-glow-blur": `${glowBlur}px`,
    "--brand-icon-fg": iconColor,
    "--brand-icon-color": color,
    "--brand-icon-color-dark": colorDark ?? color,
  } as CSSProperties

  return (
    <span
      data-slot="brand-icon"
      style={style}
      className={cn(
        "brand-icon relative inline-flex shrink-0 items-center justify-center isolate",
        "text-[var(--brand-icon-fg)]",
        className
      )}
    >
      <span className="relative z-10 inline-flex items-center justify-center">
        {icon}
      </span>
    </span>
  )
}

export { brandIconConfig }
