import { getProjects } from '@/lib/projectSource'
import ProjectsClient from '@/components/projects/ProjectsClient'

export const metadata = {
  title: 'Projects',
  description: 'Discover a collection of my past and ongoing projects.',
}

export default function ProjectPage() {
  const projects = getProjects()

  return (
    <ProjectsClient
      initialProjects={projects}
    />
  )
}