"use client"

import type { ReactNode } from "react"
import { BrandIcon, type BrandIconProps } from "@/components/ui/brand-icon"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export type TechIconProps = {
  label: string
  icon: ReactNode
  color: string
  colorDark?: string
  size?: number
  iconSize?: number
  className?: string
  brandIconProps?: Omit<
    BrandIconProps,
    "icon" | "color" | "colorDark" | "size" | "iconSize" | "className"
  >
}

/** Inline tech mark with gooey spring tooltip (no expand-on-hover). */
export function TechIcon({
  label,
  icon,
  color,
  colorDark,
  size = 28,
  iconSize = 15,
  className,
  brandIconProps,
}: TechIconProps) {
  return (
    <Tooltip delayDuration={80}>
      <TooltipTrigger asChild>
        <span
          className={cn(
            "inline-flex shrink-0 translate-y-[-0.1em] align-middle outline-none",
            className
          )}
        >
          <BrandIcon
            color={color}
            colorDark={colorDark}
            size={size}
            iconSize={iconSize}
            icon={icon}
            {...brandIconProps}
          />
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={8} gooey>
        {label}
      </TooltipContent>
    </Tooltip>
  )
}
