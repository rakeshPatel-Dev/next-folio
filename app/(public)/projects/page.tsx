"use client"

import { ProjectCard } from '@/components/projects/project-card'
import { projectData } from '@/data/projectData'
import React from 'react'


// import type { Metadata } from "next"
// import { getProjectById } from "@/lib/data/projects"

// type Props = {
//   params: { id: string }
// }

// export async function generateMetadata(
//   { params }: Props
// ): Promise<Metadata> {
//   const project = await getProjectById(params.id)

//   if (!project) {
//     return {
//       title: "Project Not Found",
//       description: "The requested project does not exist.",
//     }
//   }

//   return {
//     title: project.name,
//     description: project.shortDescription,
//     openGraph: {
//       title: project.name,
//       description: project.shortDescription,
//       images: [project.thumbnail],
//     },
//   }
// }

const ProjectPage = () => {
  return (
    <div className=' p-6 max-w-4xl mx-auto'>
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

export default ProjectPage
