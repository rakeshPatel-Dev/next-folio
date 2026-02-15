import { getBlogByIdOrSlug, getRelatedBlogs } from "@/utils/getBlogs"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { BlogCard } from "@/components/blog/Blog-card"

interface BlogDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const blog = await getBlogByIdOrSlug(slug)

  if (!blog) {
    return {
      title: "Blog Not Found",
    }
  }

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [blog.coverImage],
      type: "article",
      publishedTime: blog.publishedAt || blog.createdAt,
      authors: [blog.author.name],
    },
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const blog = await getBlogByIdOrSlug(slug)

  if (!blog) {
    notFound()
  }

  // Get related blogs
  const relatedBlogs = await getRelatedBlogs(blog._id, 3)

  // Calculate reading time
  const readingTime = Math.ceil(blog.description.split(/\s+/).length / 200)

  return (
    <article className="min-h-screen">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blogs
        </Link>
      </div>

      {/* Header */}
      <header className="max-w-4xl mx-auto px-6 pb-8">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
          {blog.isFeatured && (
            <Badge variant="default" className="bg-yellow-600">
              Featured
            </Badge>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {blog.title}
        </h1>

        {/* Description */}
        <p className="text-xl text-muted-foreground mb-6">
          {blog.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{blog.author.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={blog.publishedAt || blog.createdAt}>
              {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }
              )}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{readingTime} min read</span>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* TODO: Add rich text content here when you implement it */}
          <p className="text-muted-foreground italic">
            Full blog content will be displayed here.
            You can add a rich text editor in the admin panel to create full blog posts.
          </p>
        </div>
      </div>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 py-12 border-t">
          <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedBlogs.map((relatedBlog) => (
              <BlogCard
                key={relatedBlog._id}
                title={relatedBlog.title}
                subtitle={relatedBlog.description}
                image={relatedBlog.coverImage}
                category={relatedBlog.tags[0] || "General"}
                readingTime={`${Math.ceil(relatedBlog.description.split(/\s+/).length / 200)} min read`}
                date={new Date(
                  relatedBlog.publishedAt || relatedBlog.createdAt
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                link={`/blog/${relatedBlog.slug}`}
                variant="default"
              />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}