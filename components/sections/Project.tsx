"use client"

import { ProjectCard } from '@/components/projects/project-card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { MagneticHover } from '../motion/Reveal'
import type { Project } from '@/utils/getProjects.client'

interface HomeProjectsProps {
  initialProjects: Project[]
}

const HomeProjects = ({ initialProjects }: HomeProjectsProps) => {
  const projects = initialProjects

  if (projects.length === 0) {
    return null // Don't show section if no projects
  }

  return (
    <div>
      <h1 className="text-2xl font-sans font-semibold mb-8 tracking-tight">
        Featured Projects
      </h1>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-10">
        {projects.slice(0, 4).map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>

      {projects.length > 4 && (
        <div className="mt-10 flex w-full justify-center">
          <Link href="/projects">
            <MagneticHover strength={0.4}>
              <Button
                variant="outline"
                className="hover:bg-muted-foreground transition-all active:scale-95 cursor-pointer border-2 border-dashed"
              >
                View More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </MagneticHover>
          </Link>
        </div>
      )}
    </div>
  )
}

export default HomeProjects
