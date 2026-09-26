import { BlogRowCard } from "@/components/blog/blog-row-card"
import { getLatestBlogs } from "@/lib/blogSource"
import { calculateReadTimeFromWordCount } from "@/lib/read-time"
import { MagneticHover } from "../motion/Reveal"
import { SectionHeading } from "@/components/sections/section-heading"
import { CtaButton } from "@/components/ui/cta-button"

interface BlogSectionProps {
  showCount?: number
}

export default function BlogSection({
  showCount = 3,
}: BlogSectionProps) {

  // Fetch latest blogs from static MDX
  const latestBlogs = getLatestBlogs(showCount)

  // Don't show section if no blogs
  if (latestBlogs.length === 0) {
    return null
  }

return (
    <section>
      <SectionHeading className="mb-8">Latest Blogs</SectionHeading>

      {/* Blog rows */}
      <div className="mt-10">
        {latestBlogs.map((blog, index) => (
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

      <div className="mt-10 flex w-full justify-center">
        <MagneticHover strength={0.4}>
          <CtaButton href="/blog" label="Read More" />
        </MagneticHover>
      </div>
    </section>
  )
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