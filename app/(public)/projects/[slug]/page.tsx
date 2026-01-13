// app/projects/[id]/page.tsx
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { projectData } from "@/data/projectData"
import type { ProjectType } from "@/data/projectData"
import { caseStudies } from "@/data/caseStudy"
import type { CaseStudy } from "@/data/caseStudy"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

import { Github, Globe } from "lucide-react"
import { FaReact, FaHtml5, FaCss3Alt } from "react-icons/fa"
import { RiTailwindCssFill } from "react-icons/ri"
import { SiNextdotjs } from "react-icons/si"

// import ProjectFolder from "@/components/ProjectFolder"

interface PageProps {
  params: {
    id: string
  }
}

export default function ProjectDetailsPage({ params }: PageProps) {
  const { id } = params

  const project: ProjectType | undefined = projectData.find(
    (p) => p.id === id
  )

  if (!project) {
    notFound()
  }

  const caseStudy: CaseStudy | undefined = caseStudies.find(
    (c) => c.id === id
  )

  const caseSections: Array<{ title: string; key: "problem" | "solution" }> = [
    { title: "Problem", key: "problem" },
    { title: "Solution", key: "solution" },
  ]

  console.log("PARAM ID:", params.id)


  return (
    <main className="max-w-4xl mx-auto p-6 md:p-10 space-y-12 mt-20">

      {/* ───────── Project Header ───────── */}
      <header className="flex flex-col gap-6">
        <h1 className="heading-bold text-3xl md:text-4xl font-bold">
          {project.title}
        </h1>

        <p className="font-body text-neutral-600 dark:text-neutral-300">
          {project.description}
        </p>

        {/* Project Image */}
        <div className="relative w-full h-[220px] sm:h-[320px] md:h-[420px] overflow-hidden rounded-xl">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Tech Icons */}
        <div className="flex flex-wrap gap-3 mt-2">
          {project.icons.map((iconData, idx) => {
            const Icon = iconData.icon
            return (
              <Tooltip key={idx}>
                <TooltipTrigger asChild>
                  <button
                    aria-label={iconData.tooltip}
                    className="flex items-center justify-center min-h-10 min-w-10 rounded-xl hover:bg-primary/10 transition"
                  >
                    <Icon className="w-5 h-5" style={{ color: iconData.color }} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>{iconData.tooltip}</TooltipContent>
              </Tooltip>
            )
          })}
        </div>

        {/* Links */}
        <div className="flex gap-4 flex-wrap mt-4">
          <Button asChild>
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
              <Globe className="mr-2" /> Live Demo
            </a>
          </Button>

          <Button variant="outline" asChild>
            <a href={project.sourceLink} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2" /> Source Code
            </a>
          </Button>
        </div>
      </header>

      {/* ───────── Case Study Section ───────── */}
      <section className="space-y-8">
        <h2 className="heading-bold text-2xl font-bold border-b pb-2">
          Case Study
        </h2>

        {caseStudy ? (
          <>
            {/* Problem & Solution */}
            {caseSections.map(({ title, key }) => (
              <div key={key} className="px-4">
                <h3 className="heading-medium text-xl font-semibold mb-2">
                  {title}
                </h3>
                <p className="font-body text-neutral-700 dark:text-neutral-300">
                  {caseStudy[key]}
                </p>
              </div>
            ))}

            {/* Features */}
            <Accordion type="single" collapsible>
              <AccordionItem value="features">
                <AccordionTrigger className="heading-medium text-xl font-semibold px-4">
                  Key Features
                </AccordionTrigger>
                <AccordionContent className="px-4 mt-2">
                  <ul className="flex flex-col gap-2">
                    {caseStudy.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="px-3 py-2 rounded-xl text-sm hover:bg-primary/10 transition"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Tech Stack */}
            <div className="px-4">
              <h3 className="heading-medium text-xl font-semibold mb-2">
                Tech Stack
              </h3>

              <div className="flex flex-wrap gap-3">
                {caseStudy.techStack.map((tech, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-2 border rounded-xl text-sm hover:bg-primary/10"
                  >
                    {tech.toLowerCase().includes("react") && (
                      <FaReact className="text-[#61dafb]" />
                    )}
                    {tech.toLowerCase().includes("next") && (
                      <SiNextdotjs />
                    )}
                    {tech.toLowerCase().includes("html") && (
                      <FaHtml5 className="text-[#e34f26]" />
                    )}
                    {tech.toLowerCase().includes("css") && (
                      <FaCss3Alt className="text-[#1572b6]" />
                    )}
                    {tech.toLowerCase().includes("tailwind") && (
                      <RiTailwindCssFill className="text-[#38bdf8]" />
                    )}
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Result */}
            <div className="px-4">
              <h3 className="heading-medium text-xl font-semibold mb-2">
                Result & Impact
              </h3>
              <p className="font-body text-neutral-700 dark:text-neutral-300">
                {caseStudy.result}
              </p>
            </div>
          </>
        ) : (
          <p className="px-4 italic text-neutral-500">
            Case study coming soon.
          </p>
        )}
      </section>

      {/* ───────── Explore More ───────── */}
      <section className="flex flex-col items-center gap-8">
        <h2 className="text-2xl heading-bold">Explore more projects</h2>
        <Button variant="link" asChild>
          <Link href="/projects">Back to projects</Link>
        </Button>
      </section>
    </main>
  )
}
