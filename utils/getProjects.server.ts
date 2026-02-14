import { cache } from "react"
import { connectDB } from "@/lib/mongoose"
import Project from "@/models/projectModel"

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

export const getProjects = cache(async (): Promise<Project[]> => {
  try {
    await connectDB()
    
    const projects = await Project.find().sort({ createdAt: -1 }).lean()
    
    return projects.map((project) => ({
      ...project,
      _id: project._id.toString(),
      createdAt: project.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: project.updatedAt?.toISOString() || new Date().toISOString(),
    })) as Project[]
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
})

export const getProjectBySlug = cache(async (slug: string): Promise<Project | null> => {
  try {
    await connectDB()
    const project = await Project.findOne({ slug }).lean()
    if (!project) return null
    
    return {
      ...project,
      _id: project._id.toString(),
      createdAt: project.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: project.updatedAt?.toISOString() || new Date().toISOString(),
    } as Project
  } catch (error) {
    console.error(`Error fetching project with slug "${slug}":`, error)
    return null
  }
})

export const getProjectById = cache(async (id: string): Promise<Project | null> => {
  try {
    await connectDB()
    const project = await Project.findById(id).lean()
    if (!project) return null
    
    return {
      ...project,
      _id: project._id.toString(),
      createdAt: project.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: project.updatedAt?.toISOString() || new Date().toISOString(),
    } as Project
  } catch (error) {
    console.error(`Error fetching project with ID "${id}":`, error)
    return null
  }
})