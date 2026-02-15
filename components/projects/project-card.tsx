"use client"

import * as React from "react"
import { ArrowUpRight, Github, Globe, Code } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Project } from "@/utils/getProjects.client"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { useTechIcon } from "@/hooks/useTechIcon"

interface ProjectCardProps {
  project: Project
}

// Tech Icon Component
function TechIcon({ tech }: { tech: { label: string; icon?: string } }) {
  const Icon = useTechIcon(tech.icon)

  if (!Icon) {
    // Fallback to badge if icon not found
    return (
      <Badge variant="secondary" className="text-xs">
        {tech.label}
      </Badge>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="cursor-pointer transition-transform hover:scale-110">
          <Icon className="h-6 w-6 text-muted-foreground hover:text-foreground" />
        </div>
      </TooltipTrigger>
      <TooltipContent>{tech.label}</TooltipContent>
    </Tooltip>
  )
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project }, ref) => {
    const router = useRouter()

    const goToDetails = () => {
      router.push(`/projects/${project.slug}`)
    }

    const statusDisplay = {
      "completed": "Completed",
      "in-progress": "In Progress",
      "planning": "Planning"
    }[project.status] || project.status

    const typeColors = {
      "web": "#3b82f6",
      "mobile": "#10b981",
      "desktop": "#8b5cf6",
      "fullstack": "#f59e0b",
      "frontend": "#06b6d4",
      "backend": "#ef4444",
    }

    const typeColor = typeColors[project.type.toLowerCase() as keyof typeof typeColors] || "#6b7280"

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        onClick={goToDetails}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            goToDetails()
          }
        }}
        className={cn(
          "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300",
          "hover:-translate-y-2 hover:shadow-xl",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        )}
      >
        {/* Type Badge */}
        <span
          className="absolute right-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-medium text-white backdrop-blur-md"
          style={{ backgroundColor: typeColor + "CC" }}
        >
          {project.type.toUpperCase()}
        </span>

        {/* Freelance Badge */}
        {project.isFreelance && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-purple-600/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            FREELANCE
          </span>
        )}

        {/* Image */}
        <div className="relative aspect-video overflow-hidden p-2">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          {/* Title + Icons */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-sans text-xl font-semibold">{project.title}</h3>

            <div className="flex gap-3">
              {project.liveUrl && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      title="Live link"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="Live website"
                    >
                      <Globe className="h-5 w-5 text-muted-foreground hover:text-primary" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>Live Website</TooltipContent>
                </Tooltip>
              )}

              {project.repoUrl && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      title="Source code"
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="Source code"
                    >
                      <Github className="h-5 w-5 text-muted-foreground hover:text-primary" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>Source Code</TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="mt-3 flex-1 text-muted-foreground line-clamp-2">
            {project.shortDescription}
          </p>

          {/* Client Info */}
          {project.isFreelance && project.isClientPublic && project.clientName && (
            <div className="mt-3 rounded-lg bg-muted/50 p-3">
              <p className="text-xs font-medium text-muted-foreground">Client</p>
              <p className="text-sm font-semibold">{project.clientName}</p>
              {project.clientLocation && (
                <p className="text-xs text-muted-foreground">{project.clientLocation}</p>
              )}
            </div>
          )}

          {/* Tech Stack with Dynamic Icons */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="mt-4 flex flex-col gap-2">
              <h4 className="font-sans text-sm font-medium">Technologies</h4>
              <div className="flex flex-wrap gap-3 items-center">
                {project.techStack.slice(0, 8).map((tech, idx) => (
                  <TechIcon key={idx} tech={tech} />
                ))}
                {project.techStack.length > 8 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.techStack.length - 8}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between">
            {/* Status */}
            <div
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium",
                project.status === "completed"
                  ? "border-green-500 text-green-500"
                  : project.status === "in-progress"
                    ? "border-orange-500 text-orange-500"
                    : "border-blue-500 text-blue-500"
              )}
            >
              <span className="relative flex h-3 w-3">
                <span
                  className={cn(
                    "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                    project.status === "completed"
                      ? "bg-green-400"
                      : project.status === "in-progress"
                        ? "bg-orange-400"
                        : "bg-blue-400"
                  )}
                />
                <span
                  className={cn(
                    "relative inline-flex h-3 w-3 rounded-full",
                    project.status === "completed"
                      ? "bg-green-500"
                      : project.status === "in-progress"
                        ? "bg-orange-500"
                        : "bg-blue-500"
                  )}
                />
              </span>
              {statusDisplay}
            </div>

            {/* Visual CTA */}
            <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-primary">
              View details
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    )
  }
)

ProjectCard.displayName = "ProjectCard"
export { ProjectCard }