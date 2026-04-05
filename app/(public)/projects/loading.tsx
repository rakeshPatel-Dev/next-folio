import { ProjectCardSkeleton } from "@/components/projects/project-card-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectsLoading() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mt-5">
        <Skeleton className="h-12 w-48 mx-auto rounded-lg" />
        <Skeleton className="h-5 w-full max-w-2xl mx-auto mt-3 rounded-md" />
        <Skeleton className="h-5 w-3/4 max-w-xl mx-auto mt-2 rounded-md" />
      </div>

      {/* Filters */}
      <div className="mt-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="flex-1 h-10 rounded-md" />
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>
        <Skeleton className="h-4 w-32 rounded-md" />
      </div>

      {/* Projects Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </main>
  )
}
