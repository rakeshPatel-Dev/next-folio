import type { ElementType, ReactNode } from "react"
import { cn } from "@/lib/utils"

const sectionHeadingClass =
  "font-sans text-2xl font-semibold tracking-tight text-primary sm:text-3xl"

type SectionHeadingProps = {
  children: ReactNode
  className?: string
  as?: ElementType
}

/** Shared homepage / section title typography. */
export function SectionHeading({
  children,
  className,
  as: Comp = "h2",
}: SectionHeadingProps) {
  return <Comp className={cn(sectionHeadingClass, className)}>{children}</Comp>
}
