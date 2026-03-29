import { getProjects } from '@/utils/getProjects.server'
import ProjectsClient from '@/components/projects/ProjectsClient'

export const metadata = {
  title: 'Projects',
  description: 'Discover a collection of my past and ongoing projects.',
}

export const revalidate = 3600; // Cache pages for 1 hour to reduce TTFB

export default async function ProjectPage() {
  const projects = await getProjects()

  // Extract unique values for filters
  const types = [...new Set(projects.map((p: any) => p.type).filter(Boolean))]
  const statuses = [...new Set(projects.map((p: any) => p.status).filter(Boolean))]
  const technologies = [...new Set(
    projects.flatMap((p: any) => p.techStack?.map((t: any) => t.label) || [])
  )].sort()

  return (
    <ProjectsClient 
      initialProjects={projects} 
      types={types} 
      statuses={statuses} 
      technologies={technologies} 
    />
  )
}