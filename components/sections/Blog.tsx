import { BlogCard } from "@/components/blog/Blog-card"
import { getFeaturedBlogs, getLatestBlogs } from "@/utils/getBlogs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface BlogSectionProps {
  featuredCount?: number
  showCount?: number
}

export default async function BlogSection({
  featuredCount = 1,
  showCount = 3,
}: BlogSectionProps) {

  // Fetch featured and latest blogs
  const [featuredBlogs, latestBlogs] = await Promise.all([
    getFeaturedBlogs(featuredCount),
    getLatestBlogs(showCount)
  ])

  // Use featured blogs if available, otherwise use latest
  const displayFeatured = featuredBlogs.length > 0
    ? featuredBlogs.slice(0, featuredCount)
    : latestBlogs.slice(0, featuredCount)

  // Remove featured from latest to avoid duplicates
  const featuredIds = new Set(displayFeatured.map(blog => blog._id))
  const remainingCount = showCount - displayFeatured.length
  const displayRegular = latestBlogs
    .filter(blog => !featuredIds.has(blog._id))
    .slice(0, remainingCount)

  // Total blogs to display
  const allDisplayBlogs = [...displayFeatured, ...displayRegular]

  // Don't show section if no blogs
  if (allDisplayBlogs.length === 0) {
    return null
  }

  return (
    <section className="grid gap-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl mt-20 font-sans font-semibold tracking-tight">
          Latest Blogs
        </h2>
        <Link href="/blog">
          <Button variant="ghost" className="gap-2">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Featured card(s) */}
      {displayFeatured.map((blog) => (
        <BlogCard
          key={blog._id}
          title={blog.title}
          subtitle={blog.description}
          image={blog.coverImage}
          category={blog.tags?.[0] || "General"}
          readingTime={calculateReadingTime(blog.description)}
          date={formatDate(blog.publishedAt || blog.createdAt)}
          link={`/blog/${blog.slug}`}
          variant="featured"
          className="col-span-full w-full lg:h-100"
        />
      ))}

      {/* Default cards */}
      {displayRegular.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {displayRegular.map((blog) => (
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
    </section>
  )
}

// Helper function to calculate reading time
function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200
  const wordCount = text.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

// Helper function to format date
function formatDate(dateString: string): string {
  if (!dateString) return ""
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return ""
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}