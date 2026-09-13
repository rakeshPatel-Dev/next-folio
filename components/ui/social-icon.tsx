import type { ReactNode } from "react"
import { ExpandIcon, type ExpandIconProps } from "@/components/ui/expand-icon"
import { cn } from "@/lib/utils"

/**
 * Defaults — tweak here; props override per-instance.
 */
const socialIconConfig = {
  size: 36,
  iconSize: 18,
  labelWidthClass: "group-hover/expand:w-[4.75rem]",
} as const

export type SocialIconProps = {
  label: string
  href: string
  icon: ReactNode
  color: string
  colorDark?: string
  size?: number
  iconSize?: number
  labelWidthClass?: string
  className?: string
  brandIconProps?: ExpandIconProps["brandIconProps"]
}

/**
 * Social link with pill chrome + expand-on-hover name (in-flow shift).
 */
export function SocialIcon({
  label,
  href,
  icon,
  color,
  colorDark,
  size = socialIconConfig.size,
  iconSize = socialIconConfig.iconSize,
  labelWidthClass = socialIconConfig.labelWidthClass,
  className,
  brandIconProps,
}: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "group/expand relative z-0 inline-flex h-11 items-center rounded-full p-1 pr-1 text-primary",
        "border border-foreground/10 bg-background/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md",
        "dark:bg-background/40",
        "transition-[padding,background-color,border-color,box-shadow] duration-200",
        "delay-[180ms] hover:z-10 hover:delay-0",
        "hover:border-foreground/16 hover:bg-background/80 hover:pr-3",
        "active:scale-[0.97]",
        className
      )}
      style={{
        transitionTimingFunction: "cubic-bezier(0.18, 0.89, 0.32, 1.27)",
      }}
    >
      <ExpandIcon
        label={label}
        icon={icon}
        color={color}
        colorDark={colorDark}
        size={size}
        iconSize={iconSize}
        labelWidthClass={labelWidthClass}
        brandIconProps={brandIconProps}
        grouped={false}
      />
    </a>
  )
}

export { socialIconConfig }
