// components/blog/BlogPageClient.tsx
"use client"

import { BlogRowCard } from "@/components/blog/blog-row-card"
import { calculateReadTimeFromWordCount } from "@/lib/read-time"
import { useState, useMemo } from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";

type Blog = {
  _id: string
  title: string
  description: string
  coverImage: string
  slug: string
  tags: string[]
  author: { name: string }
  status: string
  publishedAt: string | null
  createdAt: string
  wordCount: number
}

interface BlogPageClientProps {
  initialBlogs: Blog[]
}

export default function BlogPageClient({ initialBlogs }: BlogPageClientProps) {
  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Extract unique tags from initial blogs
  const availableTags = useMemo(() => {
    const allTags = new Set<string>()
    initialBlogs.forEach((blog) => {
      blog.tags?.forEach((tag) => allTags.add(tag))
    })
    return Array.from(allTags).sort()
  }, [initialBlogs])

  // Apply filters
  const filteredBlogs = useMemo(() => {
    let filtered = [...initialBlogs]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query) ||
          blog.description.toLowerCase().includes(query) ||
          blog.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
          blog.author.name.toLowerCase().includes(query),
      )
    }

    // Tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter((blog) => selectedTags.every((tag) => blog.tags?.includes(tag)))
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.createdAt).getTime()
      const dateB = new Date(b.publishedAt || b.createdAt).getTime()
      return dateB - dateA
    })
  }, [initialBlogs, searchQuery, selectedTags])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTags([])
  }

  const activeFiltersCount = (searchQuery ? 1 : 0) + selectedTags.length

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <main className="py-6">
      {/* Header */}
      <div className="mt-5 mb-8">
        <h1 className="text-4xl font-bold md:text-5xl">Things I&apos;ve written</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Explore my latest blog posts, where I share insights, experiences, and tutorials on
          technology, development, and innovation.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Search and Filter Row */}
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Search */}
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="relative">
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2 rounded-full px-2 py-0.5 text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {/* Tags Filter */}
              <DropdownMenuLabel>Tags</DropdownMenuLabel>
              <div className="max-h-64 space-y-1 overflow-y-auto px-2 py-1.5">
                {availableTags.length === 0 ? (
                  <p className="px-2 py-1 text-sm text-muted-foreground">No tags available</p>
                ) : (
                  availableTags.map((tag) => (
                    <DropdownMenuCheckboxItem
                      key={tag}
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={() => toggleTag(tag)}
                    >
                      {tag}
                    </DropdownMenuCheckboxItem>
                  ))
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <Button variant="ghost" onClick={clearFilters} className="text-muted-foreground">
              <X className="mr-2 h-4 w-4" />
              Clear
            </Button>
          )}
        </div>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <Badge variant="secondary" className="gap-1 pr-1">
                Search: {searchQuery}
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="ml-1 rounded-full hover:bg-muted"
                  aria-label="Remove search filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {selectedTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <X className="h-3 w-3 cursor-pointer" onClick={() => toggleTag(tag)} />
              </Badge>
            ))}
          </div>
        )}

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          {filteredBlogs.length} {filteredBlogs.length === 1 ? "post" : "posts"} found
          {activeFiltersCount > 0 && ` (${initialBlogs.length} total)`}
        </div>
      </div>

      {/* Content */}
      {filteredBlogs.length === 0 ? (
        <EmptyState hasFilters={activeFiltersCount > 0} onClearFilters={clearFilters} />
      ) : (
        // Blog rows
        <div>
          {filteredBlogs.map((blog, index) => (
            <BlogRowCard
              key={blog._id}
              title={blog.title}
              subtitle={blog.description}
              image={blog.coverImage}
              category={blog.tags?.[0] || "General"}
              readingTime={`${calculateReadTimeFromWordCount(blog.wordCount)} min read`}
              date={formatDate(blog.publishedAt || blog.createdAt)}
              link={`/blog/${blog.slug}`}
              priority={index === 0}
            />
          ))}
        </div>
      )}
    </main>
  )
}

// Empty State Component
function EmptyState({
  hasFilters,
  onClearFilters,
}: {
  hasFilters: boolean
  onClearFilters: () => void
}) {
  return (
    <div className="py-20 text-center">
      <div className="mb-4">

        <Image src="/icons/no-data.png" alt="No data" width={96} height={100} className="mx-auto mb-2" />
      </div>
      <h3 className="mb-2 text-lg font-semibold">
        {hasFilters ? "No posts match your filters" : "No blog posts yet"}
      </h3>
      <p className="mb-4 text-muted-foreground">
        {hasFilters
          ? "Try adjusting your search or filters"
          : "Check back soon for insights and tutorials!"}
      </p>
      {hasFilters && (
        <Button variant="outline" onClick={onClearFilters}>
          Clear Filters
        </Button>
      )}
    </div>
  )
}

// Helper functions

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
