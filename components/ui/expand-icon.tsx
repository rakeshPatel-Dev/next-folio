import type { ReactNode } from "react"
import { BrandIcon, type BrandIconProps } from "@/components/ui/brand-icon"
import { cn } from "@/lib/utils"

/**
 * Defaults — tweak here; props override per-instance.
 *
 * Opens immediately on hover; collapses with a short delay so the
 * cursor can cross the gap between icons without flicker thrash.
 */
const expandIconConfig = {
  size: 36,
  iconSize: 18,
  labelWidthClass: "group-hover/expand:w-[4.75rem]",
  labelTextClass:
    "text-[13px] font-medium leading-none tracking-tight text-primary",
  openDurationMs: 200,
  closeDelayMs: 180,
} as const

export type ExpandIconProps = {
  label: string
  icon: ReactNode
  color: string
  colorDark?: string
  size?: number
  iconSize?: number
  /**
   * When false, parent must provide `group/expand`
   * (e.g. SocialIcon link wraps this).
   */
  grouped?: boolean
  /** Tailwind width class on hover, e.g. group-hover/expand:w-14 */
  labelWidthClass?: string
  brandIconProps?: Omit<
    BrandIconProps,
    "icon" | "color" | "colorDark" | "size" | "iconSize" | "className"
  >
  className?: string
  labelClassName?: string
}

/**
 * Brand icon + name that expands on hover (in-flow shift).
 * Pill / border / link chrome belong on the parent (see SocialIcon).
 */
export function ExpandIcon({
  label,
  icon,
  color,
  colorDark,
  size = expandIconConfig.size,
  iconSize = expandIconConfig.iconSize,
  grouped = true,
  labelWidthClass = expandIconConfig.labelWidthClass,
  brandIconProps,
  className,
  labelClassName,
}: ExpandIconProps) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center",
        grouped && "group/expand",
        "hover:z-10",
        className
      )}
      style={
        grouped
          ? {
              transitionTimingFunction: "cubic-bezier(0.18, 0.89, 0.32, 1.27)",
            }
          : undefined
      }
    >
      <BrandIcon
        color={color}
        colorDark={colorDark}
        size={size}
        iconSize={iconSize}
        icon={icon}
        {...brandIconProps}
      />
      <span
        aria-hidden
        className={cn(
          "ml-0 w-0 overflow-hidden whitespace-nowrap opacity-0",
          expandIconConfig.labelTextClass,
          // In-flow shift animation
          "transition-[width,margin,opacity,transform] duration-200",
          // Delay close only — open is instant (no delay on hover)
          "delay-[180ms] group-hover/expand:delay-0",
          "group-hover/expand:ml-2 group-hover/expand:opacity-100",
          labelWidthClass,
          labelClassName
        )}
        style={{
          transitionTimingFunction: "cubic-bezier(0.18, 0.89, 0.32, 1.27)",
        }}
      >
        <span
          className={cn(
            "inline-block translate-x-2",
            "transition-transform duration-200 delay-[180ms] group-hover/expand:delay-0",
            "group-hover/expand:translate-x-0"
          )}
          style={{
            transitionTimingFunction: "cubic-bezier(0.18, 0.89, 0.32, 1.27)",
          }}
        >
          {label}
        </span>
      </span>
      {grouped ? <span className="sr-only">{label}</span> : null}
    </span>
  )
}

export { expandIconConfig }
