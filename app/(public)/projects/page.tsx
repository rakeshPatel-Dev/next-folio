import { getProjects } from '@/lib/projectSource'
import ProjectsClient from '@/components/projects/ProjectsClient'
import { BreadcrumbJsonLd } from '@/components/sections/BreadcrumbJsonLd'

export const metadata = {
  title: 'Projects',
  description:
    'Five production web apps built with React, Next.js, and TypeScript — from multi-tenant SaaS with role-based access to AI-native features, plus case studies.',
}

export default function ProjectPage() {
  const projects = getProjects()

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Projects', href: '/projects' },
        ]}
      />
      <ProjectsClient
        initialProjects={projects}
    />
    </>
  )
}