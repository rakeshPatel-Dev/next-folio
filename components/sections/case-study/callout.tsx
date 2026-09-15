"use client"

import type { ReactNode } from "react"
import { Info, Lightbulb, NotebookPen, TriangleAlert } from "lucide-react"
import { cn } from "@/lib/utils"

type CalloutVariant = "info" | "tip" | "note" | "warning"

const calloutStyles: Record<
  CalloutVariant,
  { label: string; icon: typeof Info; classes: string; iconColor: string }
> = {
  info: {
    label: "Info",
    icon: Info,
    classes: "border-sky-500/30 bg-sky-500/5",
    iconColor: "text-sky-500",
  },
  tip: {
    label: "Tip",
    icon: Lightbulb,
    classes: "border-emerald-500/30 bg-emerald-500/5",
    iconColor: "text-emerald-500",
  },
  note: {
    label: "Note",
    icon: NotebookPen,
    classes: "border-amber-500/30 bg-amber-500/5",
    iconColor: "text-amber-500",
  },
  warning: {
    label: "Warning",
    icon: TriangleAlert,
    classes: "border-red-500/30 bg-red-500/5",
    iconColor: "text-red-500",
  },
}

interface CalloutProps {
  variant?: CalloutVariant
  title?: string
  children: ReactNode
  className?: string
}

export function Callout({
  variant = "info",
  title,
  children,
  className,
}: CalloutProps) {
  const { label, icon: Icon, classes, iconColor } = calloutStyles[variant]

  return (
    <div
      className={cn(
        "not-prose my-6 flex gap-3 rounded-lg border p-4",
        classes,
        className
      )}
    >
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", iconColor)} />
      <div className="min-w-0 space-y-1">
        <p className="text-sm font-semibold">
          {title ?? label}
        </p>
        <div className="text-sm leading-relaxed text-muted-foreground">
          {children}
        </div>
      </div>
    </div>
  )
}