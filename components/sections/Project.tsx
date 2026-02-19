"use client"

import { ProjectCard } from '@/components/projects/project-card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getProjectsClient, type Project } from '@/utils/getProjects.client'
import { MagneticHover } from '../motion/Reveal'

const HomeProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const data = await getProjectsClient()
      // Filter to show only completed projects on homepage
      const completedProjects = data.filter(p => p.status === 'completed')
      setProjects(completedProjects)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

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