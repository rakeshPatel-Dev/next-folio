import { getPublishedBlogPosts } from "@/lib/blogSource"
import BlogPageClient from "@/components/blog/BlogPageClient"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, tutorials, and thoughts on full-stack development, AI, and software engineering.',
}

export default function BlogPage() {
  // Fetch all published blogs from static MDX, strip MDX runtime
  const blogs = getPublishedBlogPosts().map((b) => ({
    _id: b._id,
    title: b.title,
    slug: b.slug,
    description: b.description,
    coverImage: b.coverImage,
    tags: b.tags,
    author: b.author,
    status: b.status,
    isFeatured: b.isFeatured,
    publishedAt: b.publishedAt,
    createdAt: b.createdAt,
  }))

  // Pass to client component for filtering
  return <BlogPageClient initialBlogs={blogs} />
}
