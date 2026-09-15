import type { LucideIcon } from "lucide-react"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

/* ─────────────────────────────────────────────────────────────────────────────
   <CtaButton /> — glossy pill call-to-action with deep shadow + arrow slide-in
   
   Mirrors the header "Let's Talk" CTA: foreground pill, layered shadow that
   deepens on hover, subtle press, and an arrow/label choreography on hover.
   
   Usage:
     <CtaButton href="/projects" label="View More" />
     <CtaButton href="/contact" label="Let's Talk" icon={ArrowRight} />
───────────────────────────────────────────────────────────────────────────── */

interface CtaButtonProps {
  href: string
  label: string
  icon?: LucideIcon
  variant?: "default" | "outline"
  external?: boolean
  className?: string
}

export function CtaButton({
  href,
  label,
  icon: Icon = ArrowUpRight,
  variant = "default",
  external,
  className,
}: CtaButtonProps) {
  const classes = cn(
    "group/cta relative inline-flex items-center whitespace-nowrap rounded-full",
    variant === "default"
      ? cn(
          "bg-foreground px-6 py-3 dark:bg-white",
          "text-base font-semibold text-background dark:text-black",
          "shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_10px_-2px_rgba(0,0,0,0.15)]",
          "[@media(hover:hover)]:hover:shadow-[0_1px_2px_rgba(0,0,0,0.12),0_6px_16px_-2px_rgba(0,0,0,0.2)]"
        )
      : cn(
          "border border-foreground/25 bg-transparent px-6 py-3",
          "text-base font-semibold text-foreground",
          "shadow-none",
          "[@media(hover:hover)]:hover:border-foreground/50"
        ),
    "transition-[box-shadow,border-color,transform] duration-200 active:scale-[0.98]",
    "duration-300",
    className
  )

  const content = (
    <>
      {variant === "default" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-linear-to-b from-white/20 to-transparent opacity-60"
        />
      )}
      <span className="relative flex items-center">
        <span className="transition-transform duration-300 ease-out group-hover/cta:-translate-x-1">
          {label}
        </span>
        <span className="ml-0 w-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover/cta:ml-1.5 group-hover/cta:w-4 group-hover/cta:opacity-100">
          <Icon
            className="h-4 w-4 shrink-0 translate-x-2 transition-transform duration-300 ease-out group-hover/cta:translate-x-0"
            strokeWidth={2.5}
          />
        </span>
      </span>
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
      </Link>
    )
  }

  return (
    <button type="button" className={cn("cursor-pointer", classes)}>
      {content}
    </button>
  )
}