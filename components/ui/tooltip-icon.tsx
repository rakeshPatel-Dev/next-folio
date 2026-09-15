"use client"

import type { ReactNode } from "react"
import { BrandIcon, type BrandIconProps } from "@/components/ui/brand-icon"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export type TooltipIconProps = {
  label: string
  icon: ReactNode
  color: string
  colorDark?: string
  size?: number
  iconSize?: number
  className?: string
  /** Render the icon as an external link. */
  href?: string
  /** Render the icon as a button (no href). */
  onClick?: () => void
  brandIconProps?: Omit<
    BrandIconProps,
    "icon" | "color" | "colorDark" | "size" | "iconSize" | "className"
  >
}

/** Brand icon badge with a gooey spring tooltip (no expand-on-hover). */
export function TooltipIcon({
  label,
  icon,
  color,
  colorDark,
  size = 28,
  iconSize = 15,
  href,
  onClick,
  className,
  brandIconProps,
}: TooltipIconProps) {
  const badgeClass = cn(
    "inline-flex shrink-0 translate-y-[-0.1em] align-middle",
    className
  )
  const badge = (
    <BrandIcon
      color={color}
      colorDark={colorDark}
      size={size}
      iconSize={iconSize}
      icon={icon}
      {...brandIconProps}
    />
  )

  return (
    <Tooltip delayDuration={80}>
      <TooltipTrigger asChild>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={badgeClass}
          >
            {badge}
          </a>
        ) : onClick ? (
          <button
            type="button"
            onClick={onClick}
            aria-label={label}
            className={badgeClass}
          >
            {badge}
          </button>
        ) : (
          <span aria-label={label} className={badgeClass}>
            {badge}
          </span>
        )}
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={8} gooey>
        {label}
      </TooltipContent>
    </Tooltip>
  )
}
