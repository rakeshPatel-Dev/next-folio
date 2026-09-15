"use client"

import { ProjectCard } from '@/components/projects/project-card'
import { SectionHeading } from '@/components/sections/section-heading'
import type { ProjectType } from '@/lib/projectSource'

interface ProjectsClientProps {
  initialProjects: ProjectType[]
}

export default function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  return (
    <main className="py-6 max-w-app mx-auto">
      {/* Header */}
      <div className="mt-5">
        <SectionHeading as="h1">Projects</SectionHeading>
        <p className="text-muted-foreground  mt-2">
          Discover a collection of my past and ongoing projects, showcasing my expertise in software development, design, and problem-solving.
        </p>
      </div>

      {/* Projects List */}
      <div className="mt-10 grid grid-cols-1 ">
        {initialProjects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </main>
  )
}