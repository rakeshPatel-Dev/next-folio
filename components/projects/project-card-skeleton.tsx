"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface ProjectCardSkeletonProps {
  className?: string
}

export function ProjectCardSkeleton({ className }: ProjectCardSkeletonProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm",
        className
      )}
    >
      {/* Type Badge placeholder */}
      <Skeleton className="absolute right-3 top-3 z-10 h-6 w-16 rounded-full" />

      {/* Image placeholder */}
      <div className="relative aspect-video overflow-hidden p-2">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Title + Icons row */}
        <div className="flex items-start justify-between gap-3">
          <Skeleton className="h-7 w-3/5 rounded-md" />
          <div className="flex gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
        </div>

        {/* Description lines */}
        <div className="mt-3 space-y-2">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-4/5 rounded-md" />
        </div>

        {/* Tech Stack */}
        <div className="mt-4 flex flex-col gap-2">
          <Skeleton className="h-4 w-24 rounded-md" />
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-6 rounded-full" />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          {/* Status badge */}
          <Skeleton className="h-8 w-28 rounded-full" />
          {/* CTA */}
          <Skeleton className="h-5 w-24 rounded-md" />
        </div>
      </div>
    </div>
  )
}
