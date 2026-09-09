import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getBlogSlugs, getRelatedBlogs, getPublishedBlogPosts } from '@/lib/blogSource'
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowLeft, Redo2, Undo2, Star } from "lucide-react"
import Link from "next/link"
import { BlogCard } from "@/components/blog/Blog-card"
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import BlogTOC from '@/components/blog/BlogTOC'
import { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'

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

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const blogMeta = getBlogPostBySlug(slug)

  if (!blogMeta) {
    return {
      title: "Blog Not Found",
    }
  }

  const url = `${siteConfig.url}/blog/${blogMeta.slug}`

  return {
    title: blogMeta.title,
    description: blogMeta.description,
    keywords: blogMeta.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: blogMeta.title,
      description: blogMeta.description,
      url: url,
      images: [
        {
          url: blogMeta.coverImage,
          width: 1200,
          height: 630,
          alt: blogMeta.title,
        },
      ],
      type: "article",
      publishedTime: blogMeta.publishedAt || blogMeta.createdAt,
      authors: [blogMeta.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: blogMeta.title,
      description: blogMeta.description,
      images: [blogMeta.coverImage],
    },
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params

  // Get all blog metadata from static MDX
  const blogMeta = getBlogPostBySlug(slug)

  if (!blogMeta) {
    notFound()
  }

  const MDXContent = blogMeta.body

  if (!MDXContent) {
    notFound()
  }

  // Get all published blogs for prev/next navigation
  const publishedBlogs = getPublishedBlogPosts()

  const currentIndex = publishedBlogs.findIndex(blog => blog.slug === blogMeta.slug)

  const prevBlog = currentIndex > 0 ? publishedBlogs[currentIndex - 1] : null
  const nextBlog = currentIndex < publishedBlogs.length - 1 ? publishedBlogs[currentIndex + 1] : null

  // Get related blogs
  const relatedBlogs = getRelatedBlogs(blogMeta.slug, 3)

  // Calculate reading time (~200 WPM on description; body word count unavailable at list-card sites)
  const readingTime = Math.max(
    1,
    Math.ceil(blogMeta.description.split(/\s+/).length / 200)
  )

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blogMeta.title,
    description: blogMeta.description,
    image: blogMeta.coverImage,
    url: `${siteConfig.url}/blog/${blogMeta.slug}`,
    datePublished: blogMeta.publishedAt || blogMeta.createdAt,
    dateModified: blogMeta.updatedAt || blogMeta.publishedAt || blogMeta.createdAt,
    author: {
      "@type": "Person",
      name: blogMeta.author.name,
    },
    publisher: {
      "@type": "Person",
      name: "Rakesh Patel",
      url: siteConfig.url,
    },
    keywords: blogMeta.tags.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${blogMeta.slug}`,
    },
  }

  return (
    <article className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-8">
        <Link
          href="/blog"
        >
          <Button variant="ghost" className=' group cursor-pointer'>
            <ArrowLeft className="h-4 w-4 group-hover:opacity-100 opacity-50 transition-all group-hover:-translate-x-1 translate-x-1 group-hover:scale-110" />
            Back to Blogs
          </Button>
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

        <Separator />

        {/* Meta Info */}
        <div className="flex mt-2 flex-wrap items-center gap-4 text-sm text-muted-foreground">
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

      {/* Article body — TOC floats outside on xl+ */}
      <div className="mx-auto max-w-4xl px-6 pb-12">
        <BlogTOC items={blogMeta.toc ?? []} variant="mobile" />
        <div className="prose prose-lg dark:prose-invert max-w-none blog-prose">
          <MDXContent />
        </div>
      </div>
      <BlogTOC items={blogMeta.toc ?? []} variant="desktop" />
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
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-l group-hover:border  bg-background/5 ">
                  <Undo2 className="h-5 w-5 translate-x-2 group-hover:translate-x-0 transition-all" />
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
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-r group-hover:border  bg-background/5 ">
                  <Redo2 className="h-5 w-5 -translate-x-2 group-hover:translate-x-0 transition-all" />
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
                readingTime={`${Math.max(
                  1,
                  Math.ceil(relatedBlog.description.split(/\s+/).length / 200)
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
