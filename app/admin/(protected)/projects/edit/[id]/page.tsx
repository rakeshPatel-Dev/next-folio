"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getProjectByIdClient, updateProject, type Project } from "@/utils/getProjects.client"
import ProjectForm from "@/components/forms/ProjectForm"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/zenblocks/toast"

export default function EditProjectPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    loadProject()
  }, [resolvedParams.id])

  async function loadProject() {
    try {
      // ✅ Use the helper function that filters for you
      const foundProject = await getProjectByIdClient(resolvedParams.id)

      if (!foundProject) {
        toast({
          title: "Error",
          description: "Project not found",
          variant: "error",
        })
        router.push("/admin/projects")
        return
      }

      setProject(foundProject)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load project",
        variant: "error",
      })
      router.push("/admin/projects")
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdate(values: any) {
    await updateProject({
      _id: resolvedParams.id,
      ...values,
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!project) return null

  return (
    <div className="max-w-4xl mx-auto py-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <p className="text-muted-foreground">Update project details</p>
      </div>

      <ProjectForm
        path="/admin/projects"
        saveProject={handleUpdate}
        initialData={project}
      />
    </div>
  )
}