// utils/getProjects.server.ts
import { connectDB } from '@/lib/mongoose'
import Project from '@/models/projectModel'

export type ProjectType = {
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
  challenge?: string
  solution?: string
  features?: Array<{ title: string; description: string }> | string[]
  results?: Array<{ metric: string; description: string }>
  gallery?: string[]
  createdAt: string
  updatedAt: string
}

// Serialize MongoDB document
function serializeProject(project: any): ProjectType {
  // Strip any nested ObjectIds from arrays
  const cleanTechStack = project.techStack?.map((t: any) => ({
    label: t.label,
    icon: t.icon,
  })) || []

  const cleanFeatures = Array.isArray(project.features)
    ? project.features.map((f: any) => typeof f === 'string' ? f : {
        title: f.title,
        description: f.description,
      })
    : []

  const cleanResults = project.results?.map((r: any) => ({
    metric: r.metric,
    description: r.description,
  })) || []

  return {
    ...project,
    _id: project._id.toString(),
    techStack: cleanTechStack,
    features: cleanFeatures,
    results: cleanResults,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  }
}

// ✅ Server-side - Get all projects
export async function getProjects(): Promise<ProjectType[]> {
  try {
    await connectDB()
    
    const projects = await Project.find({})
      .sort({ createdAt: -1 })
      .lean()
    
    return projects.map(serializeProject)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

// ✅ Server-side - Get project by slug
export async function getProjectBySlug(slug: string): Promise<ProjectType | null> {
  try {
    await connectDB()
    
    const project = await Project.findOne({ slug }).lean()
    
    if (!project) return null
    
    return serializeProject(project)
  } catch (error) {
    console.error(`Error fetching project with slug "${slug}":`, error)
    return null
  }
}

// ✅ Server-side - Get project by ID
export async function getProjectById(id: string): Promise<ProjectType | null> {
  try {
    await connectDB()
    
    const project = await Project.findById(id).lean()
    
    if (!project) return null
    
    return serializeProject(project)
  } catch (error) {
    console.error(`Error fetching project with ID "${id}":`, error)
    return null
  }
}

// ✅ Server-side - Get related projects
export async function getRelatedProjects(
  currentProjectId: string,
  limit: number = 3
): Promise<ProjectType[]> {
  try {
    await connectDB()
    
    const currentProject = await Project.findById(currentProjectId).lean()
    
    if (!currentProject) return []
    
    // Find projects with same type or category
    const related = await Project.find({
      _id: { $ne: currentProjectId },
      $or: [
        { type: currentProject.type },
        { category: currentProject.category }
      ]
    })
      .limit(limit)
      .lean()
    
    // If not enough, fill with latest
    if (related.length < limit) {
      const remaining = await Project.find({
        _id: { 
          $ne: currentProjectId,
          $nin: related.map(p => p._id)
        }
      })
        .sort({ createdAt: -1 })
        .limit(limit - related.length)
        .lean()
      
      related.push(...remaining)
    }
    
    return related.map(serializeProject)
  } catch (error) {
    console.error('Error fetching related projects:', error)
    return []
  }
}

// ✅ Server-side - Get featured projects
export async function getFeaturedProjects(limit: number = 3): Promise<ProjectType[]> {
  try {
    await connectDB()
    
    const projects = await Project.find({ status: 'completed' })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()
    
    return projects.map(serializeProject)
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}

// ✅ Server-side - Get projects by type
export async function getProjectsByType(type: string): Promise<ProjectType[]> {
  try {
    await connectDB()
    
    const projects = await Project.find({ type })
      .sort({ createdAt: -1 })
      .lean()
    
    return projects.map(serializeProject)
  } catch (error) {
    console.error(`Error fetching projects by type "${type}":`, error)
    return []
  }
}

// ✅ Server-side - Get projects by category
export async function getProjectsByCategory(category: string): Promise<ProjectType[]> {
  try {
    await connectDB()
    
    const projects = await Project.find({ category })
      .sort({ createdAt: -1 })
      .lean()
    
    return projects.map(serializeProject)
  } catch (error) {
    console.error(`Error fetching projects by category "${category}":`, error)
    return []
  }
}

// ✅ Server-side - Search projects
export async function searchProjects(query: string): Promise<ProjectType[]> {
  try {
    await connectDB()
    
    const projects = await Project.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { shortDescription: { $regex: query, $options: 'i' } },
        { longDescription: { $regex: query, $options: 'i' } },
      ]
    })
      .sort({ createdAt: -1 })
      .lean()
    
    return projects.map(serializeProject)
  } catch (error) {
    console.error('Error searching projects:', error)
    return []
  }
}

// ✅ Server-side - Get project stats
export async function getProjectStats() {
  try {
    await connectDB()
    
    const [total, completed, inProgress, freelance] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ status: 'completed' }),
      Project.countDocuments({ status: 'building' }),
      Project.countDocuments({ isFreelance: true }),
    ])
    
    return {
      total,
      completed,
      inProgress,
      freelance,
    }
  } catch (error) {
    console.error('Error fetching project stats:', error)
    return {
      total: 0,
      completed: 0,
      inProgress: 0,
      freelance: 0,
    }
  }
}