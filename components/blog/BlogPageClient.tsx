// components/blog/BlogPageClient.tsx
"use client"

import { BlogCard } from "@/components/blog/Blog-card"
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Blog = {
  _id: string
  title: string
  description: string
  coverImage: string
  slug: string
  tags: string[]
  author: { name: string }
  status: string
  isFeatured: boolean
  publishedAt: string | null
  createdAt: string
}

interface BlogPageClientProps {
  initialBlogs: Blog[]
}

export default function BlogPageClient({ initialBlogs }: BlogPageClientProps) {
  // Filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

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
          blog.author.name.toLowerCase().includes(query)
      )
    }

    // Tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter((blog) =>
        selectedTags.every((tag) => blog.tags?.includes(tag))
      )
    }

    // Featured filter
    if (showFeaturedOnly) {
      filtered = filtered.filter((blog) => blog.isFeatured)
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.createdAt).getTime()
      const dateB = new Date(b.publishedAt || b.createdAt).getTime()
      return dateB - dateA
    })
  }, [initialBlogs, searchQuery, selectedTags, showFeaturedOnly])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTags([])
    setShowFeaturedOnly(false)
  }

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    selectedTags.length +
    (showFeaturedOnly ? 1 : 0)

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  // Separate featured and regular blogs
  const featuredBlog = filteredBlogs.find((b) => b.isFeatured)
  const regularBlogs = featuredBlog
    ? filteredBlogs.filter((b) => b._id !== featuredBlog._id)
    : filteredBlogs

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mt-5 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold">Blog</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
          Explore my latest blog posts, where I share insights, experiences, and tutorials on technology, development, and innovation.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Search and Filter Row */}
        <div className="flex flex-col sm:flex-row gap-4">
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
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-2 rounded-full px-2 py-0.5 text-xs"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {/* Featured Filter */}
              <DropdownMenuLabel>Show</DropdownMenuLabel>
              <div className="px-2 py-1.5">
                <DropdownMenuCheckboxItem
                  checked={showFeaturedOnly}
                  onCheckedChange={setShowFeaturedOnly}
                >
                  Featured posts only
                </DropdownMenuCheckboxItem>
              </div>

              <DropdownMenuSeparator />

              {/* Tags Filter */}
              <DropdownMenuLabel>Tags</DropdownMenuLabel>
              <div className="px-2 py-1.5 max-h-64 overflow-y-auto space-y-1">
                {availableTags.length === 0 ? (
                  <p className="text-sm text-muted-foreground px-2 py-1">
                    No tags available
                  </p>
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
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-muted-foreground"
            >
              <X className="h-4 w-4 mr-2" />
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
            {showFeaturedOnly && (
              <Badge variant="secondary" className="gap-1">
                Featured only
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setShowFeaturedOnly(false)}
                />
              </Badge>
            )}
            {selectedTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => toggleTag(tag)}
                />
              </Badge>
            ))}
          </div>
        )}

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          {filteredBlogs.length}{" "}
          {filteredBlogs.length === 1 ? "post" : "posts"} found
          {activeFiltersCount > 0 && ` (${initialBlogs.length} total)`}
        </div>
      </div>

      {/* Content */}
      {filteredBlogs.length === 0 ? (
        <EmptyState
          hasFilters={activeFiltersCount > 0}
          onClearFilters={clearFilters}
        />
      ) : (
        <>
          {/* Featured Blog */}
          {featuredBlog && (
            <div className="mb-8">
              <BlogCard
                title={featuredBlog.title}
                subtitle={featuredBlog.description}
                image={featuredBlog.coverImage}
                category={featuredBlog.tags?.[0] || "General"}
                readingTime={calculateReadingTime(featuredBlog.description)}
                date={formatDate(featuredBlog.publishedAt || featuredBlog.createdAt)}
                link={`/blog/${featuredBlog.slug}`}
                variant="featured"
                className="w-full"
              />
            </div>
          )}

          {/* Regular Blogs Grid */}
          {regularBlogs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {regularBlogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  title={blog.title}
                  subtitle={blog.description}
                  image={blog.coverImage}
                  category={blog.tags?.[0] || "General"}
                  readingTime={calculateReadingTime(blog.description)}
                  date={formatDate(blog.publishedAt || blog.createdAt)}
                  link={`/blog/${blog.slug}`}
                  variant="default"
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
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
    <div className="text-center py-20">
      <div className="mb-4">
        <svg
          className="mx-auto h-12 w-12 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-2">
        {hasFilters ? "No posts match your filters" : "No blog posts yet"}
      </h3>
      <p className="text-muted-foreground mb-4">
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
function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200
  const wordCount = text.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}