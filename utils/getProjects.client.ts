export type Project = {
  _id: string
  title: string
  shortDescription: string
  longDescription?: string
  image: string
  imagePublicId: string
  slug: string
  type: string
  status: string
  category?: string
  year?: string
  techStack: { label: string; icon?: string }[]
  technologies?: string[]
  liveUrl?: string
  repoUrl?: string
  githubUrl?: string
  isFreelance: boolean
  clientName?: string
  clientLocation?: string
  clientIndustry?: string
  isClientPublic: boolean
  // Case study fields
  challenge?: string
  solution?: string
  features?: Array<{ title: string; description: string }> | string[]
  results?: Array<{ metric: string; description: string }>
  gallery?: string[]
  createdAt: string
  updatedAt: string
}

// ✅ Public - No auth required (GET is public)
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

// ✅ Public - Get single project by ID
export async function getProjectByIdClient(id: string): Promise<Project | null> {
  try {
    const projects = await getProjectsClient()
    return projects.find((p) => p._id === id) || null
  } catch (error) {
    console.error(`Error fetching project with ID "${id}":`, error)
    return null
  }
}

// ✅ Public - Get single project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const projects = await getProjectsClient()
    return projects.find((p) => p.slug === slug) || null
  } catch (error) {
    console.error(`Error fetching project with slug "${slug}":`, error)
    return null
  }
}

// ✅ Public - Get related projects (same type or category)
export async function getRelatedProjects(
  currentProjectId: string,
  limit: number = 3
): Promise<Project[]> {
  try {
    const projects = await getProjectsClient()
    const currentProject = projects.find((p) => p._id === currentProjectId)
    
    if (!currentProject) return []

    // Filter projects that match type or category, excluding current
    const related = projects
      .filter((p) => {
        if (p._id === currentProjectId) return false
        
        // Match by type or category
        return (
          p.type === currentProject.type ||
          (p.category && currentProject.category && p.category === currentProject.category)
        )
      })
      .slice(0, limit)

    // If we don't have enough related projects, fill with latest
    if (related.length < limit) {
      const remaining = projects
        .filter((p) => {
          return p._id !== currentProjectId && !related.find((r) => r._id === p._id)
        })
        .sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })
        .slice(0, limit - related.length)

      related.push(...remaining)
    }

    return related
  } catch (error) {
    console.error("Error fetching related projects:", error)
    return []
  }
}

// ✅ Public - Get featured projects
export async function getFeaturedProjects(limit: number = 3): Promise<Project[]> {
  try {
    const projects = await getProjectsClient()
    
    // Get completed projects, sorted by date
    return projects
      .filter((p) => p.status === 'completed')
      .sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
      .slice(0, limit)
  } catch (error) {
    console.error("Error fetching featured projects:", error)
    return []
  }
}

// ✅ Public - Get projects by type
export async function getProjectsByType(type: string): Promise<Project[]> {
  try {
    const projects = await getProjectsClient()
    return projects.filter((p) => p.type === type)
  } catch (error) {
    console.error(`Error fetching projects by type "${type}":`, error)
    return []
  }
}

// ✅ Public - Get projects by category
export async function getProjectsByCategory(category: string): Promise<Project[]> {
  try {
    const projects = await getProjectsClient()
    return projects.filter((p) => p.category === category)
  } catch (error) {
    console.error(`Error fetching projects by category "${category}":`, error)
    return []
  }
}

// ✅ Public - Get all unique categories
export async function getProjectCategories(): Promise<string[]> {
  try {
    const projects = await getProjectsClient()
    const categories = new Set<string>()
    
    projects.forEach((p) => {
      if (p.category) {
        categories.add(p.category)
      }
    })
    
    return Array.from(categories).sort()
  } catch (error) {
    console.error("Error fetching project categories:", error)
    return []
  }
}

// ✅ Public - Get all unique types
export async function getProjectTypes(): Promise<string[]> {
  try {
    const projects = await getProjectsClient()
    const types = new Set<string>()
    
    projects.forEach((p) => {
      if (p.type) {
        types.add(p.type)
      }
    })
    
    return Array.from(types).sort()
  } catch (error) {
    console.error("Error fetching project types:", error)
    return []
  }
}

// ✅ Public - Search projects
export async function searchProjects(query: string): Promise<Project[]> {
  try {
    const projects = await getProjectsClient()
    const lowerQuery = query.toLowerCase()
    
    return projects.filter((p) => {
      return (
        p.title.toLowerCase().includes(lowerQuery) ||
        p.shortDescription.toLowerCase().includes(lowerQuery) ||
        p.longDescription?.toLowerCase().includes(lowerQuery) ||
        p.techStack.some((tech) => tech.label.toLowerCase().includes(lowerQuery)) ||
        p.technologies?.some((tech) => tech.toLowerCase().includes(lowerQuery))
      )
    })
  } catch (error) {
    console.error("Error searching projects:", error)
    return []
  }
}

// ✅ Public - Get project stats
export async function getProjectStats() {
  try {
    const projects = await getProjectsClient()
    
    return {
      total: projects.length,
      completed: projects.filter((p) => p.status === 'completed').length,
      inProgress: projects.filter((p) => p.status === 'in-progress').length,
      freelance: projects.filter((p) => p.isFreelance).length,
      byType: projects.reduce((acc, p) => {
        acc[p.type] = (acc[p.type] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      byCategory: projects.reduce((acc, p) => {
        if (p.category) {
          acc[p.category] = (acc[p.category] || 0) + 1
        }
        return acc
      }, {} as Record<string, number>),
    }
  } catch (error) {
    console.error("Error fetching project stats:", error)
    return {
      total: 0,
      completed: 0,
      inProgress: 0,
      freelance: 0,
      byType: {},
      byCategory: {},
    }
  }
}

// 🔒 Admin only
export async function deleteProject(id: string): Promise<void> {
  const response = await fetch(`/api/project?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    let errorMessage = "Failed to delete project"
    try {
      const error = await response.json()
      errorMessage = error.error || errorMessage
    } catch {
      errorMessage = `Failed to delete project: ${response.status} ${response.statusText}`
    }
    throw new Error(errorMessage)
  }
}

// 🔒 Admin only
export async function updateProject(
  data: Partial<Project> & { _id: string }
): Promise<Project> {
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
      errorMessage = `Failed to update project: ${response.status} ${response.statusText}`
    }
    throw new Error(errorMessage)
  }
  return await response.json()
}

// 🔒 Admin only - Create project
export async function createProject(data: Partial<Project>): Promise<Project> {
  const response = await fetch("/api/project", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    let errorMessage = "Failed to create project"
    try {
      const error = await response.json()
      errorMessage = error.error || errorMessage
    } catch {
      errorMessage = `Failed to create project: ${response.status} ${response.statusText}`
    }
    throw new Error(errorMessage)
  }
  return await response.json()
}