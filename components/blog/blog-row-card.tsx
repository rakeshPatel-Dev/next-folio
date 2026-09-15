"use client"

import * as React from "react"
import { FileText, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { CursorFill } from "@/components/motion/cursor-fill"

export interface BlogRowCardProps {
  title: string
  subtitle: string
  image: string
  blurDataURL?: string
  category: string
  readingTime: string
  date: string
  link: string
}

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNzAwJyBoZWlnaHQ9JzQ3NScgdmlld0JveD0nMCAwIDcwMCA0NzUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzcwMCcgaGVpZ2h0PSc0NzUnIGZpbGw9JyMyMjInIC8+PC9zdmc+"

const BlogRowCard = React.forwardRef<HTMLDivElement, BlogRowCardProps>(
  ({ title, subtitle, image, blurDataURL: customBlur, category, readingTime, date, link }, ref) => {
    return (
      <div className="w-full">
        <CursorFill
          ref={ref}
          wholeFill
          invert
          className={cn(
            "group relative flex items-center gap-4 py-4 transition-all duration-200",
            "hover:shadow-md",
            "focus-within:outline-none"
          )}
        >
          {/* Whole-card link to the article */}
          <Link
            href={link}
            aria-label={`${title} — read article`}
            className="absolute inset-0 z-40 outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />

          {/* Arrow icon — tucked to the right edge, slides outward on hover */}
          <ArrowUpRight
            aria-hidden
            className={cn(
              "pointer-events-none absolute right-1 top-1/2 z-30 h-4 w-4 -translate-y-1/2 text-foreground",
              "translate-x-8 scale-75 opacity-0",
              "transition-all duration-300 ease-out",
              "group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
            )}
          />

          {/* Thumbnail + content shifts inward on hover */}
          <div className="relative z-10 flex w-full min-w-0 items-center gap-4 transition-transform duration-300 ease-out group-hover:translate-x-2">
            {/* Cover thumbnail */}
            <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md sm:h-14 sm:w-20">
              {image ? (
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="80px"
                  placeholder="blur"
                  blurDataURL={customBlur || blurDataURL}
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  <FileText className="h-5 w-5" />
                </div>
              )}
            </div>

            {/* Title + short description + meta */}
            <div className="min-w-0 flex-1">
              <span className="block truncate font-sans text-lg font-semibold">
                {title}
              </span>
              <p className="mt-0.5 truncate text-sm text-muted-foreground">
                {subtitle}
              </p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {category} · {readingTime} · {date}
              </p>
            </div>
          </div>
        </CursorFill>
        <span className="block h-px w-full bg-muted-foreground/70 text-primary" />
      </div>
    )
  }
)

BlogRowCard.displayName = "BlogRowCard"
export { BlogRowCard }