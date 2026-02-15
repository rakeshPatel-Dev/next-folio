"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Pencil, Trash2, Eye, Star } from "lucide-react"
import { useToast } from "@/components/zenblocks/toast"
import { format } from "date-fns"
import Image from "next/image"

type Blog = {
  _id: string
  title: string
  slug: string
  description: string
  coverImage: string
  tags: string[]
  author: {
    _id: string
    name: string
    email: string
    image?: string
  }
  status: string
  isFeatured: boolean
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export function BlogTable({ blogs }: { blogs: Blog[] }) {
  const router = useRouter()
  const { toast } = useToast()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!deleteId) return

    try {
      setIsDeleting(true)

      const response = await fetch(`/api/blog/${deleteId}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || "Failed to delete blog")
      }

      toast({
        title: "Blog deleted",
        description: "The blog has been successfully deleted.",
        variant: "success",
      })

      router.refresh()
      setDeleteId(null)
    } catch (error: any) {
      toast({
        title: "Failed to delete blog",
        description: error.message || "Please try again.",
        variant: "error",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  if (blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center space-y-3">
          <p className="text-muted-foreground text-lg">No blogs found</p>
          <p className="text-sm text-muted-foreground">
            Get started by creating your first blog post
          </p>
          <Button
            onClick={() => router.push("/admin/blog/add-blog")}
            className="mt-4"
          >
            Create Your First Blog
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr className="text-muted-foreground">
              <th className="px-6 py-3 text-left font-medium">Title</th>
              <th className="px-6 py-3 text-center font-medium">Status</th>
              <th className="px-6 py-3 text-center font-medium">Tags</th>
              <th className="px-6 py-3 text-center font-medium">Featured</th>
              <th className="px-6 py-3 text-center font-medium">Date</th>
              <th className="px-6 py-3 text-center font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {blogs.map((blog) => (
              <tr key={blog._id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    <Image
                      width={64}
                      height={64}
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-16 h-16 object-cover rounded-md shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {blog.title}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                        {blog.description}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-center">
                  <Badge
                    variant={blog.status === "published" ? "default" : "secondary"}
                    className="capitalize"
                  >
                    {blog.status}
                  </Badge>
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1 justify-center">
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
                </td>

                <td className="px-6 py-4 text-center">
                  {blog.isFeatured ? (
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 inline-block" />
                  ) : (
                    <span className="text-muted-foreground text-xs">-</span>
                  )}
                </td>

                <td className="px-6 py-4 text-center text-muted-foreground">
                  {blog.publishedAt
                    ? format(new Date(blog.publishedAt), "MMM d, yyyy")
                    : format(new Date(blog.createdAt), "MMM d, yyyy")}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => window.open(`/blog/${blog.slug}`, "_blank")}
                      title="View blog"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => router.push(`/admin/blog/edit/${blog._id}`)}
                      title="Edit blog"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setDeleteId(blog._id)}
                      title="Delete blog"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog
              post and remove it from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}