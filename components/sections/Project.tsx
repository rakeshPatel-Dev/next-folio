"use client"

import { ProjectCard } from '@/components/projects/project-card'
import { Button } from '@/components/ui/button'
import { projectData } from '@/data/projectData'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
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
      <div className=' mt-10 flex w-full justify-center'>
        <Link href="/projects" className=''>
          <Button variant="outline" className='hover:bg-muted-foreground transition-all active:scale-95 hover:scale-105 border-2  border-dashed' >
            View More
            <ArrowRight />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default HomeProjects
