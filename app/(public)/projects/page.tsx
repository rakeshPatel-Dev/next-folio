import { getProjects } from '@/lib/projectSource'
import ProjectsClient from '@/components/projects/ProjectsClient'

export const metadata = {
  title: 'Projects',
  description: 'Discover a collection of my past and ongoing projects.',
}

export default function ProjectPage() {
  const projects = getProjects()

  // Extract unique values for filters
  const types = [...new Set(projects.map((p) => p.type).filter(Boolean))]
  const statuses = [...new Set(projects.map((p) => p.status).filter(Boolean))]
  const technologies = [...new Set(
    projects.flatMap((p) => p.techStack?.map((t) => t.label) || [])
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
