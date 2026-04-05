import { BlogCardSkeleton } from "@/components/blog/blog-card-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function BlogLoading() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mt-5 mb-8">
        <Skeleton className="h-12 w-32 mx-auto rounded-lg" />
        <Skeleton className="h-5 w-full max-w-2xl mx-auto mt-3 rounded-md" />
        <Skeleton className="h-5 w-3/4 max-w-xl mx-auto mt-2 rounded-md" />
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="flex-1 h-10 rounded-md" />
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>
        <Skeleton className="h-4 w-28 rounded-md" />
      </div>

      {/* Featured Blog Skeleton */}
      <div className="mb-8">
        <BlogCardSkeleton variant="featured" className="w-full" />
      </div>

      {/* Regular Blogs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <BlogCardSkeleton key={i} variant="default" />
        ))}
      </div>
    </main>
  )
}
