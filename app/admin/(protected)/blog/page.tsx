import {
  Plus,
  FileText,
  Eye,
  Users,
  // Search,
  // Filter,
  // ArrowUpDown,
  X,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
import Link from "next/link"
import { BLOGS_METADATA } from "@/lib/metadata"
import { requireAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { BlogTable } from '@/components/blog/BlogTable'
import { AppBreadcrumb } from '@/components/BreadCrumb'
import { getBlogsByUser, getBlogStats } from '@/utils/getBlogs'
import { BlogFilters } from '@/components/blog/BlogsFilters'

export const metadata = BLOGS_METADATA

interface PageProps {
  searchParams: Promise<{
    search?: string
    status?: string
    featured?: string
    tag?: string
    sortBy?: string
    sortOrder?: string
  }>
}

export default async function AdminBlogPage({ searchParams }: PageProps) {
  const session = await requireAdmin()

  if (!session?.user) {
    redirect('/login')
  }

  const currentUserId = session.user.id

  // Await searchParams
  const params = await searchParams
  const searchQuery = params.search || ''
  const statusFilter = params.status || ''
  const featuredFilter = params.featured || ''
  const tagFilter = params.tag || ''
  const sortBy = params.sortBy || 'createdAt'
  const sortOrder = (params.sortOrder || 'desc') as 'asc' | 'desc'

  // Build query for getBlogsByUser
  const query: any = {
    sortBy,
    sortOrder,
  }

  if (searchQuery) {
    query.search = searchQuery
  }

  if (statusFilter) {
    query.status = statusFilter as 'draft' | 'published'
  }

  if (featuredFilter) {
    query.isFeatured = featuredFilter === 'true'
  }

  if (tagFilter) {
    query.tag = tagFilter
  }

  // Fetch blogs and stats
  const [blogs, stats] = await Promise.all([
    getBlogsByUser(currentUserId, query),
    getBlogStats(currentUserId)
  ])

  // Check if any filters are active
  const hasActiveFilters = !!(searchQuery || statusFilter || featuredFilter || tagFilter)

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
            <BlogFilters
              currentUserId={currentUserId}
              initialSearch={searchQuery}
              initialStatus={statusFilter}
              initialFeatured={featuredFilter}
              initialTag={tagFilter}
            />
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
            value={stats.total.toString()}
            icon={<FileText />}
            description={`${stats.published} published, ${stats.draft} draft`}
          />
          <StatCard
            title="Published"
            value={stats.published.toString()}
            icon={<Eye />}
            description="Live on your site"
          />
          <StatCard
            title="Drafts"
            value={stats.draft.toString()}
            icon={<FileText />}
            description="Not yet published"
          />
          <StatCard
            title="Featured"
            value={stats.featured.toString()}
            icon={<Users />}
            description="Highlighted posts"
          />
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {searchQuery && (
              <Link href="/admin/blog">
                <Button variant="secondary" size="sm" className="gap-2">
                  Search: {searchQuery}
                  <X className="h-3 w-3" />
                </Button>
              </Link>
            )}
            {statusFilter && (
              <Link href={`/admin/blog?${new URLSearchParams({ search: searchQuery }).toString()}`}>
                <Button variant="secondary" size="sm" className="gap-2">
                  Status: {statusFilter}
                  <X className="h-3 w-3" />
                </Button>
              </Link>
            )}
            {featuredFilter && (
              <Link href={`/admin/blog?${new URLSearchParams({ search: searchQuery, status: statusFilter }).toString()}`}>
                <Button variant="secondary" size="sm" className="gap-2">
                  Featured: {featuredFilter === 'true' ? 'Yes' : 'No'}
                  <X className="h-3 w-3" />
                </Button>
              </Link>
            )}
            {tagFilter && (
              <Link href={`/admin/blog?${new URLSearchParams({ search: searchQuery, status: statusFilter, featured: featuredFilter }).toString()}`}>
                <Button variant="secondary" size="sm" className="gap-2">
                  Tag: {tagFilter}
                  <X className="h-3 w-3" />
                </Button>
              </Link>
            )}
            <Link href="/admin/blog">
              <Button variant="ghost" size="sm">
                Clear all
              </Button>
            </Link>
          </div>
        )}

        {/* Blog Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              All Blog Posts
              {blogs.length > 0 && (
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({blogs.length} {blogs.length === 1 ? 'post' : 'posts'})
                </span>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <BlogTable blogs={blogs} />
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