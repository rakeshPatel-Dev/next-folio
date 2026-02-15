"use client"

import { ProjectCard } from '@/components/projects/project-card'
import React, { useEffect, useState } from 'react'
import { getProjectsClient, type Project } from '@/utils/getProjects.client'
import { Loader2 } from 'lucide-react'

const ProjectPage = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getProjectData = async () => {
      try {
        const data = await getProjectsClient();
        setProjects(data)
      } catch (err) {
        console.log("Failed to fetch projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    getProjectData();
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="text-center mt-5">
        <h1 className="text-4xl md:text-5xl text-center font-sans font-bold">
          Projects
        </h1>
        <p className="text-muted-foreground mt-2">
          The projects I have built and currently working on.
        </p>
      </div>

      {error ? (
        <div className="text-center py-20">
          <p className="text-destructive text-lg">{error}</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No projects available yet.</p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectPage