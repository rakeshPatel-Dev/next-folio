"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface BlogCardSkeletonProps {
  variant?: "featured" | "default"
  className?: string
}

export function BlogCardSkeleton({ variant = "default", className }: BlogCardSkeletonProps) {
  const isFeatured = variant === "featured"

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card shadow-sm",
        isFeatured ? "flex flex-col md:flex-row" : "flex flex-col",
        className
      )}
    >
      {/* Image placeholder */}
      <div
        className={cn(
          "relative overflow-hidden",
          isFeatured
            ? "w-full md:w-1/2 aspect-video md:aspect-auto min-h-[250px]"
            : "aspect-video"
        )}
      >
        <Skeleton className="h-full w-full" />
      </div>

      {/* Content */}
      <div
        className={cn(
          "flex flex-1 flex-col",
          isFeatured ? "p-6 md:p-8 justify-between" : "p-6"
        )}
      >
        <div>
          <div className="flex items-center justify-between">
            {/* Category badge */}
            <Skeleton className="h-6 w-20 rounded-full mb-2" />
            {/* Featured badge */}
            {isFeatured && <Skeleton className="h-6 w-24 rounded-md" />}
          </div>

          {/* Title */}
          <Skeleton className="h-7 w-4/5 rounded-md mt-1" />

          {/* Subtitle / description lines */}
          <div className="mt-2 md:mt-3 space-y-2">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-3/5 rounded-md" />
          </div>
        </div>

        {/* Footer: reading time + date */}
        <div className="mt-4 flex items-center justify-between">
          <Skeleton className="h-4 w-20 rounded-md" />
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>

        {/* CTA button */}
        <div className="w-full flex justify-end mt-4">
          <Skeleton className="h-9 w-36 rounded-md" />
        </div>
      </div>
    </div>
  )
}
