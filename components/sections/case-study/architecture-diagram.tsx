"use client"

import { cn } from "@/lib/utils"
import { ArrowDown } from "lucide-react"

interface Layer {
  label: string
  detail?: string
}

interface ArchitectureDiagramProps {
  layers: Layer[]
  className?: string
}

export function ArchitectureDiagram({ layers, className }: ArchitectureDiagramProps) {
  return (
    <div className={cn("not-prose flex flex-col items-center gap-0 py-6", className)}>
      {layers.map((layer, i) => (
        <span key={i} className="flex flex-col items-center">
          <span className="flex w-full max-w-xs flex-col items-center rounded-lg border border-border/60 bg-muted/30 px-4 py-3 text-center">
            <span className="text-sm font-semibold text-foreground">
              {layer.label}
            </span>
            {layer.detail && (
              <span className="mt-0.5 text-xs text-muted-foreground">
                {layer.detail}
              </span>
            )}
          </span>
          {i < layers.length - 1 && (
            <ArrowDown className="my-1 h-4 w-4 shrink-0 text-muted-foreground/40" />
          )}
        </span>
      ))}
    </div>
  )
}
