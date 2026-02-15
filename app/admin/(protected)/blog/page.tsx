import {
  Plus,
  FileText,
  Eye,
  Users,
  Search,
  Filter,
  ArrowUpDown,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { BLOGS_METADATA } from "@/lib/metadata"
import { connectDB } from '@/lib/mongoose'
import Blog from '@/models/blogModel'
import { requireAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { BlogTable } from '@/components/BlogTable'
import { AppBreadcrumb } from '@/components/BreadCrumb'

export const metadata = BLOGS_METADATA

export default async function AdminBlogPage() {
  const session = await requireAdmin()

  if (!session?.user) {
    redirect('/login')
  }

  const currentUserId = session.user.id

  // Fetch all blogs by the current user
  await connectDB()
  const blogs = await Blog.find({ author: currentUserId })
    .sort({ createdAt: -1 })
    .populate('author', 'name email image')
    .lean()

  // Convert MongoDB documents to plain objects
  const blogsData = blogs.map((blog) => ({
    _id: blog._id.toString(),
    title: blog.title,
    slug: blog.slug,
    description: blog.description,
    coverImage: blog.coverImage,
    tags: blog.tags || [],
    author: {
      _id: blog.author._id.toString(),
      name: blog.author.name,
      email: blog.author.email,
      image: blog.author.image,
    },
    status: blog.status,
    isFeatured: blog.isFeatured || false,
    publishedAt: blog.publishedAt ? blog.publishedAt.toISOString() : null,
    createdAt: blog.createdAt.toISOString(),
    updatedAt: blog.updatedAt.toISOString(),
  }))

  // Calculate stats
  const totalPosts = blogsData.length
  const publishedPosts = blogsData.filter(blog => blog.status === 'published').length
  const draftPosts = blogsData.filter(blog => blog.status === 'draft').length
  const featuredPosts = blogsData.filter(blog => blog.isFeatured).length

  return (
    <main className="flex-1 overflow-y-auto sm:p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Blog Management
            </h1>
            <p className="text-muted-foreground">
              Create, edit, and manage your blog posts
            </p>
            <span className='mt-4 block'>
              <AppBreadcrumb
                items={[
                  { label: "dashboard", href: "/admin/dashboard" },
                  { label: "blog", href: "/admin/blog" },
                ]}
              />
            </span>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search blogs..." className="pl-9" />
            </div>
            <Link href="/admin/blog/add-blog">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Post
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Posts"
            value={totalPosts.toString()}
            icon={<FileText />}
            description={`${publishedPosts} published, ${draftPosts} draft`}
          />
          <StatCard
            title="Published"
            value={publishedPosts.toString()}
            icon={<Eye />}
            description="Live on your site"
          />
          <StatCard
            title="Drafts"
            value={draftPosts.toString()}
            icon={<FileText />}
            description="Not yet published"
          />
          <StatCard
            title="Featured"
            value={featuredPosts.toString()}
            icon={<Users />}
            description="Highlighted posts"
          />
        </div>

        {/* Blog Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>All Blog Posts</CardTitle>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" disabled>
                <Filter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" disabled>
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <BlogTable blogs={blogsData} />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

/* ---------------- Helpers ---------------- */

function StatCard({
  title,
  value,
  icon,
  description,
}: {
  title: string
  value: string
  icon: React.ReactNode
  description?: string
}) {
  return (
    <Card>
      <CardContent className="p-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>
          <p className="text-2xl font-bold">
            {value}
          </p>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">
              {description}
            </p>
          )}
        </div>
        <div className="text-muted-foreground">
          {icon}
        </div>
      </CardContent>
    </Card>
  )
}