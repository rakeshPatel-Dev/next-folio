"use client"

import { useRouter } from "next/navigation"
import { updateProject, type Project } from "@/utils/getProjects"
import ProjectForm from "@/components/forms/ProjectForm"

type Props = {
  project: Project
  projectId: string
}

export default function EditProjectClient({ project, projectId }: Props) {
  const router = useRouter()

  async function handleUpdate(values: any) {
    await updateProject({
      _id: projectId,
      ...values,
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
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