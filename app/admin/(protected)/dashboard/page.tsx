import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Eye, Link2, Plus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { DASHBOARD_METADATA } from "@/lib/metadata"
import { getProjects } from "@/utils/getProjects.server"
import { getBlogsByUser, getBlogStats } from "@/utils/getBlogs"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { requireAdmin } from "@/lib/auth"
import { redirect } from "next/navigation"

export const metadata = DASHBOARD_METADATA

interface StatsCardProps {
  title: string
  value: string | number
  buttonText: string
  buttonIcon: React.ReactNode
  link?: string
}

export default async function AdminDashboardPage() {
  // ✅ Get current user session
  const session = await requireAdmin()

  if (!session?.user) {
    redirect('/login')
  }

  const currentUserId = session.user.id

  // ✅ Fetch real projects and blogs using direct DB access
  const [projects, blogs, blogStats] = await Promise.all([
    getProjects(),
    getBlogsByUser(currentUserId, {
      sortBy: 'createdAt',
      sortOrder: 'desc',
      limit: 3
    }),
    getBlogStats(currentUserId)
  ])

  // ✅ Calculate real stats
  const stats = {
    totalProjects: projects.length,
    completedProjects: projects.filter((p) => p.status === "completed").length,
    inProgressProjects: projects.filter((p) => p.status === "in-progress").length,
    freelanceProjects: projects.filter((p) => p.isFreelance).length,
  }

  const cardStats: StatsCardProps[] = [
    {
      title: "Total Visitors",
      value: "100K",
      buttonText: "View Site",
      buttonIcon: <Eye className="h-4 w-4" />,
      link: "/",
    },
    {
      title: "Total Projects",
      value: stats.totalProjects,
      buttonText: "Add Project",
      buttonIcon: <Plus className="h-4 w-4" />,
      link: "/admin/projects/add-project",
    },
    {
      title: "Total Blogs",
      value: blogStats.total,
      buttonText: "Add Blog",
      buttonIcon: <Plus className="h-4 w-4" />,
      link: "/admin/blog/add-blog",
    },
    {
      title: "Total Inquiries",
      value: 2,
      buttonText: "View Email",
      buttonIcon: <Link2 className="h-4 w-4" />,
      link: "/",
    },
  ]

  return (
    <div className="sm:p-6 space-y-6">
      <div className="space-y-2 mb-4">
        <h1 className="text-3xl font-bold">Welcome, {session.user.name || 'User'}</h1>
        <p className="text-muted-foreground mb-8">
          Quick overview of your projects and blogs. Upload, edit, or delete content.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader>
              <CardTitle>{stat.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <p className="text-2xl font-bold">{stat.value}</p>
              {stat.link && (
                <Link href={stat.link} className="flex items-center flex-row gap-1">
                  <Button variant="outline" size="sm" className="mt-2 w-full cursor-pointer">
                    {stat.buttonIcon}
                    {stat.buttonText}
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Projects</CardTitle>
          <Link href="/admin/projects">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No projects yet</p>
              <Link href="/admin/projects/add-project">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Project
                </Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.slice(0, 3).map((project) => (
                  <TableRow key={project._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                          width={40}
                          height={40}
                          src={project.image}
                          alt={project.title}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div>
                          <p className="font-medium">{project.title}</p>
                          <p className="text-xs truncate w-50 text-muted-foreground line-clamp-1">
                            {project.shortDescription}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{project.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          project.status === "completed"
                            ? "default"
                            : project.status === "in-progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(project.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Link href={`/admin/projects/edit/${project._id}`}>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/projects/${project.slug}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Blogs Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Blogs</CardTitle>
          <Link href="/admin/blog">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No blogs yet</p>
              <Link href="/admin/blog/add-blog">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Write Your First Blog
                </Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Blog</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                          width={40}
                          height={40}
                          src={blog.coverImage || '/images/logo.png'}
                          alt={blog.title}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div>
                          <p className="font-medium">{blog.title}</p>
                          <p className="text-xs truncate w-50 text-muted-foreground line-clamp-1">
                            {blog.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={blog.status === "published" ? "default" : "secondary"}
                        className="capitalize"
                      >
                        {blog.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {blog.tags.length > 0 ? (
                          <>
                            {blog.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {blog.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{blog.tags.length - 2}
                              </Badge>
                            )}
                          </>
                        ) : (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {blog.publishedAt
                        ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                        : new Date(blog.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Link href={`/admin/blog/edit/${blog._id}`}>
                        <Button variant="ghost" size="icon" title="Edit blog">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/blog/${blog.slug}`} target="_blank">
                        <Button variant="ghost" size="icon" title="View blog">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}