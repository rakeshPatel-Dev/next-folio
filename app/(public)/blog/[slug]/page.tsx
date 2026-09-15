import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getBlogSlugs, getRelatedBlogs, getPublishedBlogPosts } from '@/lib/blogSource'
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowLeft, Redo2, Undo2 } from "lucide-react"
import Link from "next/link"
import { BlogRowCard } from "@/components/blog/blog-row-card"
import { BlogShare } from "@/components/blog/BlogShare"
import { Comments } from "@/components/blog/Comments"
import { calculateReadTimeFromWordCount } from "@/lib/read-time"
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { DynamicIslandTOC } from '@/components/ui/dynamic-island-toc'
import { Metadata } from 'next'
import { canonicalUrl, siteConfig } from '@/lib/site-config'

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
      canonical: canonicalUrl(`/blog/${blogMeta.slug}`),
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
      modifiedTime: blogMeta.updatedAt || blogMeta.publishedAt || blogMeta.createdAt,
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

  const blogMeta = getBlogPostBySlug(slug)

  if (!blogMeta) {
    notFound()
  }

  const MDXContent = blogMeta.body

  if (!MDXContent) {
    notFound()
  }

  const publishedBlogs = getPublishedBlogPosts()
  const currentIndex = publishedBlogs.findIndex(blog => blog.slug === blogMeta.slug)

  const prevBlog = currentIndex > 0 ? publishedBlogs[currentIndex - 1] : null
  const nextBlog = currentIndex < publishedBlogs.length - 1 ? publishedBlogs[currentIndex + 1] : null

  const relatedBlogs = getRelatedBlogs(blogMeta.slug, 3)

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
      name: blogMeta.author.name,
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
      <div className="max-w-4xl mx-auto pt-24 pb-8">
          <Button asChild variant="ghost" >
          <Link href="/blog" className="group cursor-pointer">
            <ArrowLeft className="h-4 w-4 opacity-50 translate-x-1 transition-all group-hover:opacity-100 group-hover:-translate-x-1 group-hover:scale-110" />
            Back to Blogs
        </Link>
          </Button>
      </div>

      {/* Header */}
      <header className="max-w-4xl mx-auto pb-8">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {blogMeta.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-balance">
          {blogMeta.title}
        </h1>

        {/* Description */}
        <p className="text-base text-muted-foreground mb-6 leading-relaxed">
          {blogMeta.description}
        </p>

        <Separator />

        {/* Meta Info */}
        <div className="flex mt-4 flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
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
            <span>{calculateReadTimeFromWordCount(blogMeta.wordCount)} min read</span>
          </div>
          <BlogShare
            title={blogMeta.title}
            url={`${siteConfig.url}/blog/${blogMeta.slug}`}
          />
        </div>
      </header>

      {/* Cover Image */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/60 bg-muted">
          <Image
            src={blogMeta.coverImage}
            alt={blogMeta.title}
            fill
            sizes="(min-width: 896px) 896px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Article body — TOC is a floating dynamic island */}
      <div className="mx-auto max-w-3xl pb-12 px-6">
        <DynamicIslandTOC selector='[data-toc="article"] h2, [data-toc="article"] h3, [data-toc="article"] h4' />
        <div
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:tracking-tight prose-headings:font-semibold prose-p:leading-relaxed"
          data-toc="article"
        >
          <MDXContent />
        </div>
      </div>

      {/* Utterances comments */}
      <Comments />

      {/* Prev/Next Navigation */}
      <div className="max-w-4xl mx-auto pb-12 px-6">
        <div className="flex flex-col sm:flex-row gap-4 border-t pt-12">
          {prevBlog && (
            <Link href={`/blog/${prevBlog.slug}`} className="flex-1 group">
              <div className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors h-full">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-background/50 text-muted-foreground group-hover:text-foreground group-hover:bg-accent transition-colors">
                  <Undo2 className="h-5 w-5 translate-x-1 transition-transform group-hover:translate-x-0" />
                </div>
                <div className="flex-1 space-y-1 min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Previous
                  </p>
                  <p className="text-sm font-semibold group-hover:underline line-clamp-2">
                    {prevBlog.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {prevBlog.description}
                  </p>
                </div>
              </div>
            </Link>
          )}

          {nextBlog && (
            <Link href={`/blog/${nextBlog.slug}`} className="flex-1 group">
              <div className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors h-full">
                <div className="flex-1 space-y-1 text-right min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Next
                  </p>
                  <p className="text-sm font-semibold group-hover:underline line-clamp-2">
                    {nextBlog.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {nextBlog.description}
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-background/50 text-muted-foreground group-hover:text-foreground group-hover:bg-accent transition-colors">
                  <Redo2 className="h-5 w-5 -translate-x-1 transition-transform group-hover:translate-x-0" />
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="max-w-4xl mx-auto py-12 border-t px-6">
          <h2 className="text-2xl font-bold mb-8 tracking-tight">Related Posts</h2>
          <div>
            {relatedBlogs.map((relatedBlog) => (
              <BlogRowCard
                key={relatedBlog._id}
                title={relatedBlog.title}
                subtitle={relatedBlog.description}
                image={relatedBlog.coverImage}
                category={relatedBlog.tags[0] || "General"}
                readingTime={`${calculateReadTimeFromWordCount(relatedBlog.wordCount)} min read`}
                date={new Date(
                  relatedBlog.publishedAt || relatedBlog.createdAt
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                link={`/blog/${relatedBlog.slug}`}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}