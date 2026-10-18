"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "relative flex h-full min-h-[22rem] w-full flex-col justify-between overflow-hidden rounded-2xl p-7 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:p-8",
  {
    variants: {
      gradient: {
        orange:
          "bg-gradient-to-br from-orange-100 to-amber-200/50 dark:from-orange-950/80 dark:to-amber-900/40",
        gray: "bg-gradient-to-br from-slate-100 to-slate-200/50 dark:from-slate-900 dark:to-slate-800",
        purple:
          "bg-gradient-to-br from-purple-100 to-indigo-200/50 dark:from-purple-950/80 dark:to-indigo-900/40",
        green:
          "bg-gradient-to-br from-emerald-100 to-teal-200/50 dark:from-emerald-950/80 dark:to-teal-900/40",
      },
    },
    defaultVariants: { gradient: "gray" },
  },
)

export interface GradientCardProps extends VariantProps<typeof cardVariants> {
  className?: string
  badgeText: string
  badgeColor: string
  title: string
  description: string
  ctaText?: string
  imageUrl: string
  compact?: boolean
}

const GradientCard = React.forwardRef<HTMLDivElement, GradientCardProps>(
  (
    { className, gradient, badgeText, badgeColor, title, description, ctaText, imageUrl, compact },
    ref,
  ) => {
    return (
      <motion.div
        ref={ref}
        whileHover={{ scale: 1.01, y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className={cn("h-full", className)}
      >
        <div className={cn(cardVariants({ gradient }), compact && "min-h-[18rem]")}>
          <motion.div
            aria-hidden="true"
            initial={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.08, rotate: 3 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="pointer-events-none absolute right-[-11%] bottom-[-18%] aspect-square w-[78%] opacity-60 mix-blend-multiply dark:opacity-20 dark:mix-blend-screen"
          >
            <Image src={imageUrl} alt="" fill sizes="360px" className="object-cover" />
          </motion.div>

          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-background/50 px-3 py-1.5 text-xs font-medium text-foreground/75 backdrop-blur-sm">
              <span className="size-2 rounded-full" style={{ backgroundColor: badgeColor }} />
              {badgeText}
            </div>

            <div className="flex-grow">
              <h3 className="max-w-xs text-2xl font-bold tracking-[-0.04em] text-foreground sm:text-3xl">
                {title}
              </h3>
              <p className="mt-4 max-w-sm leading-7 text-foreground/65">{description}</p>
            </div>

            {ctaText && (
              <span className="group mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-foreground">
                {ctaText}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            )}
          </div>
        </div>
      </motion.div>
    )
  },
)

GradientCard.displayName = "GradientCard"

export { GradientCard, cardVariants }
