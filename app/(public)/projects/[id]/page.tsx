"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useParams } from "next/navigation"

import { projectData } from "@/data/projectData"
import type { ProjectType } from "@/data/projectData"
import { caseStudies } from "@/data/caseStudy"
import type { CaseStudy } from "@/data/caseStudy"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

import { Github, Globe, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react"
import { FaReact, FaHtml5, FaCss3Alt } from "react-icons/fa"
import { RiTailwindCssFill } from "react-icons/ri"
import { SiNextdotjs } from "react-icons/si"

export default function ProjectDetailsPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id

  const [project, setProject] = useState<ProjectType | undefined>()
  const [caseStudy, setCaseStudy] = useState<CaseStudy | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Wait for params to be available
    if (!id) {
      return
    }

    console.log("Looking for project with ID:", id)
    console.log("Available projects:", projectData.map(p => p.id))

    const foundProject = projectData.find((p) => p.id === id)
    const foundCaseStudy = caseStudies.find((c) => c.id === id)

    console.log("Found Project:", foundProject)
    console.log("Found Case Study:", foundCaseStudy)

    if (!foundProject) {
      console.error("Project not found for ID:", id)
      notFound()
      return
    }

    setProject(foundProject)
    setCaseStudy(foundCaseStudy)
    setIsLoading(false)
  }, [id])

  if (isLoading || !project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 space-y-16">

        {/* Back Button */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* Project Header */}
        <header className="space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="mb-2">
              <Sparkles className="w-3 h-3 mr-1" />
              Featured Project
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {project.title}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-wrap">
            <Button size="lg" asChild className="group">
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                <Globe className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                Live Demo
              </a>
            </Button>

            <Button size="lg" variant="outline" asChild className="group">
              <a href={project.sourceLink} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                View Source
              </a>
            </Button>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-3">
            {project.icons.map((iconData, idx) => {
              const Icon = iconData.icon
              return (
                <Tooltip key={idx}>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-0.5">
                      <Icon className="w-5 h-5" style={{ color: iconData.color }} />
                      <span className="text-sm font-medium">{iconData.tooltip}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>{iconData.tooltip}</TooltipContent>
                </Tooltip>
              )
            })}
          </div>

          {/* Project Image */}
          <div className="relative w-full aspect-video overflow-hidden rounded-2xl shadow-2xl border">
            <Image
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        </header>

        {/* Case Study Section */}
        {caseStudy ? (
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Case Study
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A deep dive into the development process, challenges, and solutions
              </p>
            </div>

            <div className="grid gap-8">
              {/* Problem Section */}
              <Card className="border-l-4 border-l-destructive">
                <CardContent className="p-6 md:p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="text-2xl font-bold">The Problem</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {caseStudy.problem}
                  </p>
                </CardContent>
              </Card>

              {/* Solution Section */}
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6 md:p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="text-2xl font-bold">The Solution</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {caseStudy.solution}
                  </p>
                </CardContent>
              </Card>

              {/* Key Features */}
              <Card>
                <CardContent className="p-6 md:p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <span className="text-2xl">✨</span>
                    </div>
                    <h3 className="text-2xl font-bold">Key Features</h3>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {caseStudy.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tech Stack */}
              <Card>
                <CardContent className="p-6 md:p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <span className="text-2xl">🛠️</span>
                    </div>
                    <h3 className="text-2xl font-bold">Tech Stack</h3>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {caseStudy.techStack.map((tech, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border bg-background hover:bg-accent transition-colors shadow-sm hover:shadow-md hover:-translate-y-0.5"
                      >
                        {tech.toLowerCase().includes("react") && (
                          <FaReact className="text-[#61dafb] w-5 h-5" />
                        )}
                        {tech.toLowerCase().includes("next") && (
                          <SiNextdotjs className="w-5 h-5" />
                        )}
                        {tech.toLowerCase().includes("html") && (
                          <FaHtml5 className="text-[#e34f26] w-5 h-5" />
                        )}
                        {tech.toLowerCase().includes("css") && (
                          <FaCss3Alt className="text-[#1572b6] w-5 h-5" />
                        )}
                        {tech.toLowerCase().includes("tailwind") && (
                          <RiTailwindCssFill className="text-[#38bdf8] w-5 h-5" />
                        )}
                        <span className="font-medium">{tech}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Result & Impact */}
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6 md:p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <h3 className="text-2xl font-bold">Result & Impact</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {caseStudy.result}
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        ) : (
          <Card className="border-dashed">
            <CardContent className="p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold">Case Study Coming Soon</h3>
              <p className="text-muted-foreground">
                Were currently working on a detailed case study for this project. Check back soon!
              </p>
            </CardContent>
          </Card>
        )}

        {/* Explore More Section */}
        <section className="text-center space-y-8 py-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Explore More Projects
            </h2>
            <p className="text-muted-foreground">
              Check out other projects from my portfolio
            </p>
          </div>

          <Button size="lg" variant="outline" asChild>
            <Link href="/projects">
              View All Projects
            </Link>
          </Button>
        </section>
      </div>
    </main>
  )
}