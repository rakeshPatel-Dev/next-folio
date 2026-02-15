import { BlogCard } from "@/components/blog/Blog-card"
import { getPublishedBlogs, getFeaturedBlogs } from "@/utils/getBlogs"

interface BlogSectionProps {
  featuredCount?: number
}

export default async function BlogSection({
  featuredCount = 1,
}: BlogSectionProps) {

  // Fetch featured and regular blogs
  const [featuredBlogs, allPublishedBlogs] = await Promise.all([
    getFeaturedBlogs(featuredCount),
    getPublishedBlogs()
  ])

  // Remove featured blogs from the regular list to avoid duplicates
  const featuredIds = new Set(featuredBlogs.map(blog => blog._id))
  const regularBlogs = allPublishedBlogs.filter(blog => !featuredIds.has(blog._id))

  // If no featured blogs, use the latest blogs as featured
  const displayFeatured = featuredBlogs.length > 0
    ? featuredBlogs
    : allPublishedBlogs.slice(0, featuredCount)

  const displayRegular = featuredBlogs.length > 0
    ? regularBlogs
    : allPublishedBlogs.slice(featuredCount)

  return (
    <section className="grid max-w-4xl p-6 sm:p-10 mx-auto gap-8">
      <div className="text-center mt-5">
        <h1 className="text-4xl md:text-5xl text-center font-sans font-bold">
          Blogs
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
          Explore my latest blog posts, where I share insights, experiences, and tutorials on technology, development, and innovation.
        </p>
      </div>

      {/* No blogs message */}
      {allPublishedBlogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
        </div>
      )}

      {/* Featured card(s) */}
      {displayFeatured.length > 0 && displayFeatured.map((blog) => (
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
              category={blog.tags[0] || "General"}
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

// Helper function to calculate reading time (rough estimate)
function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200
  const wordCount = text.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

// Helper function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}