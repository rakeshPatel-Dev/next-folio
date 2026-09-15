"use client"

import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface FlowStepsProps {
  steps: string[]
  className?: string
}

export function FlowSteps({ steps, className }: FlowStepsProps) {
  return (
    <div
      className={cn(
        "not-prose flex flex-wrap items-center gap-2 py-4",
        className
      )}
    >
      {steps.map((step, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-3 py-1.5 text-sm font-medium text-foreground">
            {step}
          </span>
          {i < steps.length - 1 && (
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/50" />
          )}
        </span>
      ))}
    </div>
  )
}
