"use client"

import { ProjectCard } from '@/components/project-card'
import { Button } from '@/components/ui/button'
import { projectData } from '@/data/projectData'
import { ArrowRight } from 'lucide-react'
import React from 'react'

const HomeProjects = () => {
  return (
    <div>
      <h1 className="text-2xl font-sans font-semibold mb-8 tracking-tight">
        Projects
      </h1>

      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 gap-10'>
        {projectData.slice(0, 4).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <div className=' mt-4 flex w-full justify-end'>

        <Button variant="outline">

          View More
          <ArrowRight />
        </Button>
      </div>
    </div>
  )
}

export default HomeProjects
