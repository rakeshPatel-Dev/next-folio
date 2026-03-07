// app/(public)/blog/page.tsx
import { getPublishedBlogs } from "@/utils/getBlogs"
import BlogPageClient from "@/components/blog/BlogPageClient"

export default async function BlogPage() {
  // Fetch all published blogs server-side
  const blogs = await getPublishedBlogs()

  // Pass to client component for filtering
  return <BlogPageClient initialBlogs={blogs} />
}