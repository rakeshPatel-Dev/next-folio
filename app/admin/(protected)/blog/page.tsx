"use client"

import {
  Plus,
  FileText,
  Eye,
  Users,
  Search,
  Pencil,
  Trash2,
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
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function AdminBlogPage() {
  return (
    <main className="flex-1 overflow-y-auto p-6 lg:p-10">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Total Posts"
            value="16"
            icon={<FileText />}
          />
          <StatCard
            title="Total Views"
            value="15.2k"
            icon={<Eye />}
          />
          <StatCard
            title="Subscribers"
            value="1.2k"
            icon={<Users />}
          />
        </div>

        {/* Blog Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Blogs</CardTitle>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost">
                <Filter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr className="text-muted-foreground">
                  <th className="px-6 py-3 text-left">Title</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3 text-right">Views</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {BLOGS.map((blog) => (
                  <tr key={blog.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 font-medium">
                      {blog.title}
                    </td>

                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          blog.status === "Published"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {blog.status}
                      </Badge>
                    </td>

                    <td className="px-6 py-4 text-muted-foreground">
                      {blog.date}
                    </td>

                    <td className="px-6 py-4 text-right font-mono">
                      {blog.views}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
}: {
  title: string
  value: string
  icon: React.ReactNode
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
        </div>
        <div className="text-muted-foreground">
          {icon}
        </div>
      </CardContent>
    </Card>
  )
}

const BLOGS = [
  {
    id: 1,
    title: "The Future of AI Design Systems",
    status: "Published",
    date: "Oct 24, 2023",
    views: "4,231",
  },
  {
    id: 2,
    title: "Understanding React Server Components",
    status: "Published",
    date: "Oct 12, 2023",
    views: "2,105",
  },
  {
    id: 3,
    title: "My 2024 Portfolio Update",
    status: "Draft",
    date: "--",
    views: "0",
  },
]
