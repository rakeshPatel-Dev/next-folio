import { ProjectCard } from '@/components/projects/project-card'
import { ArrowRight } from 'lucide-react'
import { MagneticHover } from '../motion/Reveal'
import { SectionHeading } from '@/components/sections/section-heading'
import { CtaButton } from '@/components/ui/cta-button'
import type { ProjectType } from '@/lib/projectSource'

interface HomeProjectsProps {
  initialProjects: ProjectType[]
}

/** Server Component — MagneticHover is the only client island for the CTA. */
export default function HomeProjects({ initialProjects }: HomeProjectsProps) {
  const projects = initialProjects

  if (projects.length === 0) {
    return null
  }

  return (
    <div>
      <SectionHeading className="mb-8">Featured Projects</SectionHeading>

      <div className="mt-10 grid grid-cols-1  ">
        {projects.slice(0, 4).map((project, index) => (
          <ProjectCard key={project._id} project={project} priority={index === 0} />
        ))}
      </div>

      {projects.length > 4 && (
        <div className="mt-10 flex w-full justify-center">
          <MagneticHover strength={0.4}>
            <CtaButton href="/projects" label="View More" icon={ArrowRight} />
          </MagneticHover>
        </div>
      )}
    </div>
  )
}
