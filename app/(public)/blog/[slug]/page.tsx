import { notFound } from 'next/navigation'
import { getBlogPage, getBlogSlugs, getAllBlogPages } from '@/lib/blogSource'
import { getBlogByIdOrSlug, getRelatedBlogs } from '@/utils/getBlogs'
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowLeft, Redo2, Undo2, Star } from "lucide-react"
import Link from "next/link"
import { BlogCard } from "@/components/blog/Blog-card"

interface BlogDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getBlogSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const blogMeta = await getBlogByIdOrSlug(slug)

  if (!blogMeta) {
    return {
      title: "Blog Not Found",
    }
  }

  return {
    title: blogMeta.title,
    description: blogMeta.description,
    openGraph: {
      title: blogMeta.title,
      description: blogMeta.description,
      images: [blogMeta.coverImage],
      type: "article",
      publishedTime: blogMeta.publishedAt || blogMeta.createdAt,
      authors: [blogMeta.author.name],
    },
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params

  // Get MDX content from Fumadocs
  const mdxPage = getBlogPage(slug)

  // Get metadata from MongoDB
  const blogMeta = await getBlogByIdOrSlug(slug)

  if (!mdxPage || !blogMeta) {
    notFound()
  }

  // Get all blogs for prev/next navigation
  const allBlogs = getAllBlogPages()
  const allMongoBlogs = await Promise.all(
    allBlogs.map(async (page: any) => {
      const pageSlug = page.title
        ?.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
      return await getBlogByIdOrSlug(pageSlug)
    })
  )

  // Filter out null values and sort by published date
  const publishedBlogs = allMongoBlogs
    .filter(blog => blog !== null)
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.createdAt).getTime()
      const dateB = new Date(b.publishedAt || b.createdAt).getTime()
      return dateB - dateA // Newest first
    })

  // Find current blog index
  const currentIndex = publishedBlogs.findIndex(blog => blog._id === blogMeta._id)

  // Get prev and next blogs
  const prevBlog = currentIndex > 0 ? publishedBlogs[currentIndex - 1] : null
  const nextBlog = currentIndex < publishedBlogs.length - 1 ? publishedBlogs[currentIndex + 1] : null

  // Get related blogs
  const relatedBlogs = await getRelatedBlogs(blogMeta._id, 3)

  // Get MDX content
  const MDXContent = mdxPage.body

  // Calculate reading time
  const readingTime = Math.ceil(
    blogMeta.description.split(/\s+/).length / 200
  )

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
          {blogMeta.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
          {blogMeta.isFeatured && (
            <Badge variant="default" className="bg-yellow-600">
              <Star />
              Featured
            </Badge>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {blogMeta.title}
        </h1>

        {/* Description */}
        <p className="text-xl text-muted-foreground mb-6">
          {blogMeta.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{blogMeta.author.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={blogMeta.publishedAt || blogMeta.createdAt}>
              {new Date(
                blogMeta.publishedAt || blogMeta.createdAt
              ).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
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
            src={blogMeta.coverImage}
            alt={blogMeta.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* MDX Content */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MDXContent />
        </div>
      </div>

      {/* Prev/Next Navigation - shadcn style */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="flex flex-col sm:flex-row gap-4 border-t pt-12">
          {/* Previous Blog */}
          {prevBlog && (
            <Link
              href={`/blog/${prevBlog.slug}`}
              className="flex-1 group"
            >
              <div className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent transition-colors">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-background">
                  <Undo2 className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Previous
                  </p>
                  <p className="text-sm font-semibold group-hover:underline">
                    {prevBlog.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {prevBlog.description}
                  </p>
                </div>
              </div>
            </Link>
          )}

          {/* Spacer if no prev blog */}
          {!prevBlog && <div className="flex-1" />}

          {/* Next Blog */}
          {nextBlog && (
            <Link
              href={`/blog/${nextBlog.slug}`}
              className="flex-1 group"
            >
              <div className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent transition-colors">
                <div className="flex-1 space-y-1 text-right">
                  <p className="text-sm font-medium text-muted-foreground">
                    Next
                  </p>
                  <p className="text-sm font-semibold group-hover:underline">
                    {nextBlog.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {nextBlog.description}
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-background">
                  <Redo2 className="h-5 w-5" />
                </div>
              </div>
            </Link>
          )}
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
                readingTime={`${Math.ceil(
                  relatedBlog.description.split(/\s+/).length / 200
                )} min read`}
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