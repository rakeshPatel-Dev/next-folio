"use client"

import { ProjectCard } from '@/components/project-card'
import { projectData } from '@/data/projectData'
import React from 'react'

const page = () => {
  return (
    <div className=' max-w-4xl mx-auto'>
      <div className='text-center mt-5 '>
        <h1 className="text-4xl md:text-5xl  text-center font-sans font-bold">
          Projects
        </h1>
        <p className=' text-muted-foreground'>The projects all i have build till now and working on.</p>
      </div>

      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 gap-10'>
        {projectData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

export default page
