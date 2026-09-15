"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Content> & {
  /** Squishy spring / gooey entrance */
  gooey?: boolean
}

function TooltipContent({
  className,
  sideOffset = 0,
  side = "top",
  gooey = false,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        side={side}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-fit origin-(--radix-tooltip-content-transform-origin)",
          gooey
            ? "border-none bg-transparent p-0 shadow-none outline-none"
            : [
                "bg-foreground text-background rounded-md px-3 py-1.5 text-xs text-balance",
                "animate-in fade-in-0 zoom-in-95",
                "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
                "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              ],
          className
        )}
        {...props}
      >
        {gooey ? (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              scaleX: 0.55,
              scaleY: 0.45,
              filter: "blur(6px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scaleX: 1,
              scaleY: 1,
              filter: "blur(0px)",
            }}
            transition={{
              type: "spring",
              stiffness: 520,
              damping: 16,
              mass: 0.55,
            }}
            className={cn(
              "rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-balance text-background",
              "shadow-[0_8px_24px_-6px_rgba(0,0,0,0.35),0_2px_6px_-2px_rgba(0,0,0,0.2)]"
            )}
          >
            {children}
          </motion.div>
        ) : (
          children
        )}
        <TooltipPrimitive.Arrow
          className={cn(
            "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]",
            gooey
              ? "fill-foreground"
              : "bg-foreground fill-foreground"
          )}
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
