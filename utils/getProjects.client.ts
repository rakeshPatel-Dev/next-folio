export type Project = {
  _id: string
  title: string
  shortDescription: string
  image: string
  imagePublicId: string
  slug: string
  type: string
  status: string
  techStack: { label: string; icon?: string }[]
  liveUrl?: string
  repoUrl?: string
  isFreelance: boolean
  clientName?: string
  clientLocation?: string
  clientIndustry?: string
  isClientPublic: boolean
  createdAt: string
  updatedAt: string
}

export async function getProjectsClient(): Promise<Project[]> {
  try {
    const response = await fetch("/api/project", { cache: "no-store" })
    if (!response.ok) {
      if (response.status === 404) return []
      throw new Error(`Failed to fetch projects: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching projects (client):", error)
    throw error
  }
}

export async function getProjectByIdClient(id: string): Promise<Project | null> {
  try {
    const projects = await getProjectsClient()
    return projects.find((p) => p._id === id) || null
  } catch (error) {
    console.error(`Error fetching project with ID "${id}":`, error)
    return null
  }
}

export async function deleteProject(id: string): Promise<void> {
  const response = await fetch(`/api/project?id=${encodeURIComponent(id)}`, { method: "DELETE" })
  if (!response.ok) {
    let errorMessage = "Failed to delete project"
    try {
      const error = await response.json()
      errorMessage = error.error || errorMessage
    } catch {
      // Response wasn't JSON, use status text
      errorMessage = `Failed to delete project: ${response.status} ${response.statusText}`
    }
    throw new Error(errorMessage)
  }
}

export async function updateProject(data: Partial<Project> & { _id: string }): Promise<Project> {
  const response = await fetch("/api/project", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) {

    let errorMessage = "Failed to update project"
    try {
      const error = await response.json()
      errorMessage = error.error || errorMessage
    } catch {
      // Response wasn't JSON, use status text
      errorMessage = `Failed to update project: ${response.status} ${response.statusText}`
    }

    throw new Error(errorMessage)
  }
  return await response.json()
}