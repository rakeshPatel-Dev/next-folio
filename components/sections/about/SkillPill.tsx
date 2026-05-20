"use client"

import { forwardRef } from "react"
import * as Tooltip from "@radix-ui/react-tooltip"
import IconRenderer from "@/components/forms/project/IconRenderer"
import { cn } from "@/lib/utils"

type SkillProps = {
  name: string
  Icon: string
  color?: string
  index?: number
  size?: "sm" | "md" | "lg"
  interactive?: boolean
  className?: string
  onClick?: () => void
}

const sizeMap = {
  sm: "h-9 w-9 rounded-lg",
  md: "h-13 w-13 rounded-xl",
  lg: "h-16 w-16 rounded-2xl",
}

const iconSizeMap = {
  sm: "w-3.5 h-3.5",
  md: "w-5 h-5",
  lg: "w-6 h-6",
}

export default function SkillPill({ 
  name, 
  Icon, 
  color = "#64748b",
  index = 0,
  size = "md",
  interactive = false,
  className,
  onClick
}: SkillProps) {
  const isInteractive = interactive || !!onClick
  
  return (
    <Tooltip.Provider delayDuration={150} skipDelayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div
            className={cn(
              "skill-pill group relative flex items-center justify-center",
              "border border-border bg-muted transition-all duration-300",
              "cursor-default select-none",
              sizeMap[size],
              // Animation
              "hover:-translate-y-0.5",
              // Interactive styles
              isInteractive && "cursor-pointer hover:border-foreground/20 hover:bg-muted/80",
              // Stagger animation (if index provided)
              index !== undefined && "animate-in fade-in-0 zoom-in-95",
              className
            )}
            style={{ animationDelay: `${index * 30}ms` }}
            onClick={onClick}
            onKeyDown={(e) => {
              if (isInteractive && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault()
                onClick?.()
              }
            }}
            role={isInteractive ? "button" : "figure"}
            tabIndex={isInteractive ? 0 : -1}
            aria-label={name}
          >
            <IconRenderer
              name={Icon}
              style={{ color }}
              className={cn(
                "transition-all duration-300 opacity-35",
                iconSizeMap[size],
                "group-hover:opacity-95 group-hover:scale-105",
                isInteractive && "group-hover:opacity-100"
              )}
            />
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={cn(
              "z-50 overflow-hidden rounded-md border border-border",
              "bg-popover px-3 py-1.5 text-[11px] font-medium",
              "text-popover-foreground tracking-wide shadow-md",
              "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              "data-[side=bottom]:slide-in-from-top-2",
              "data-[side=left]:slide-in-from-right-2",
              "data-[side=right]:slide-in-from-left-2",
              "data-[side=top]:slide-in-from-bottom-2"
            )}
            sideOffset={5}
            avoidCollisions
          >
            {name}
            <Tooltip.Arrow className="fill-border" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}