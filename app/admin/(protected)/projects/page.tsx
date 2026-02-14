"use client"

import { useEffect, useState } from "react"
import {
  Plus,
  Search,
  Folder,
  CheckCircle,
  FileEdit,
  ArrowUpDown,
  Pencil,
  Trash2,
  Loader2,
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
import { getProjectsClient, deleteProject, type Project } from "@/utils/getProjects.client"
import { useToast } from "@/components/zenblocks/toast"
import { useRouter } from "next/navigation"
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
import Image from "next/image"

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()
  // const router = useRouter()

  // Load projects
  useEffect(() => {
    loadProjects()
  }, [])

  // Filter projects based on search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProjects(projects)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = projects.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.type.toLowerCase().includes(query) ||
          p.clientName?.toLowerCase().includes(query)
      )
      setFilteredProjects(filtered)
    }
  }, [searchQuery, projects])

  async function loadProjects() {
    try {
      setLoading(true)
      const data = await getProjectsClient()
      setProjects(data)
      setFilteredProjects(data)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load projects",
        variant: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!deleteId) return

    try {
      setIsDeleting(true)
      await deleteProject(deleteId)
      setProjects(projects.filter((p) => p._id !== deleteId))
      toast({
        title: "Success",
        description: "Project deleted successfully",
        variant: "success",
      })
      setDeleteId(null)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete project",
        variant: "error",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  // Stats calculation
  const stats = {
    total: projects.length,
    completed: projects.filter((p) => p.status === "completed").length,
    inProgress: projects.filter((p) => p.status === "building").length,
    freelance: projects.filter((p) => p.isFreelance).length,
  }

  return (
    <>
      <main className="flex-1 overflow-y-auto lg:p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Project Management
              </h1>
              <p className="text-muted-foreground">
                Manage your portfolio projects and case studies
              </p>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Link href="/admin/projects/add-project">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Project
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <StatCard
              title="Total Projects"
              value={stats.total.toString()}
              description={`${stats.freelance} freelance`}
              icon={<Folder className="h-5 w-5" />}
            />
            <StatCard
              title="Completed"
              value={stats.completed.toString()}
              description="Live & visible"
              icon={<CheckCircle className="h-5 w-5" />}
            />
            <StatCard
              title="In Progress"
              value={stats.inProgress.toString()}
              description="Currently working"
              icon={<FileEdit className="h-5 w-5" />}
            />
            <StatCard
              title="Freelance"
              value={stats.freelance.toString()}
              description="Client projects"
              icon={<Folder className="h-5 w-5" />}
            />
          </div>

          {/* Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Projects</CardTitle>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={loadProjects}>
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0 overflow-x-auto">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Folder className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {searchQuery ? "No projects found" : "No projects yet"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery
                      ? "Try adjusting your search"
                      : "Get started by creating your first project"}
                  </p>
                  {!searchQuery && (
                    <Link href="/admin/projects/add-project">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Project
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="border-b bg-muted/50">
                    <tr className="text-muted-foreground">
                      <th className="px-6 py-3 text-left">Project</th>
                      <th className="px-6 py-3">Type</th>
                      <th className="px-6 py-3">Client</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {filteredProjects.map((project) => (
                      <tr
                        key={project._id}
                        className="group hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium">
                          <div className="flex items-center gap-3">
                            <Image
                              width={40}
                              height={40}
                              src={project.image}
                              alt={project.title}
                              className="w-10 h-10 rounded object-cover"
                            />
                            <div>
                              <div className="font-medium">{project.title}</div>
                              <div className="text-xs text-muted-foreground line-clamp-1">
                                {project.shortDescription}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-center">
                          <Badge variant="outline">{project.type}</Badge>
                        </td>

                        <td className="px-6 py-4 text-center">
                          {project.isFreelance && project.clientName ? (
                            <div>
                              <div className="font-medium text-sm">
                                {project.clientName}
                              </div>
                              {project.clientLocation && (
                                <div className="text-xs text-muted-foreground">
                                  {project.clientLocation}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>

                        <td className="px-6 py-4 text-muted-foreground text-center text-xs">
                          {new Date(project.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>

                        <td className="px-6 py-4 text-center">
                          <Badge
                            variant={
                              project.status === "completed"
                                ? "default"
                                : project.status === "building"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {project.status}
                          </Badge>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2 opacity-100 focus-within:opacity-100 transition">
                            <Link href={`/admin/projects/edit/${project._id}`}>
                              <Button size="icon" variant="ghost">
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-destructive hover:text-destructive"
                              onClick={() => setDeleteId(project._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardContent>

            {/* Pagination */}
            {filteredProjects.length > 0 && (
              <div className="flex items-center justify-between border-t px-6 py-3">
                <span className="text-sm text-muted-foreground">
                  Showing {filteredProjects.length} of {projects.length} projects
                </span>
              </div>
            )}
          </Card>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              project from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

/* ---------------- Reusable ---------------- */

function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardContent className="p-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
        <div className="text-muted-foreground">{icon}</div>
      </CardContent>
    </Card>
  )
}