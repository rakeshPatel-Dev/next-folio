import { getPublishedBlogs } from "@/utils/getBlogs"
import BlogPageClient from "@/components/blog/BlogPageClient"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, tutorials, and thoughts on full-stack development, AI, and software engineering.',
}

export default async function BlogPage() {
  // Fetch all published blogs server-side
  const blogs = await getPublishedBlogs()

  // Pass to client component for filtering
  return <BlogPageClient initialBlogs={blogs} />
}