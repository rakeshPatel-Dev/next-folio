"use client"

import * as React from "react"
import { Code } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProjectType } from "@/lib/projectSource"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { CursorFill } from "@/components/motion/cursor-fill"
import Image from "next/image"
import Link from "next/link"
import WorldIcon from "../ui/world-icon"
import GithubIcon from "../ui/github-icon"

interface ProjectCardProps {
  project: ProjectType
}

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNzAwJyBoZWlnaHQ9JzQ3NScgdmlld0JveD0nMCAwIDcwMCA0NzUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzcwMCcgaGVpZ2h0PSc0NzUnIGZpbGw9JyMyMjInIC8+PC9zdmc+"

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project }, ref) => {
    // Determine the favicon / icon source
    const faviconSrc =
      project.liveUrl && project.faviconUrl
        ? new URL(project.liveUrl).origin + project.faviconUrl
        : null

    return (
      <CursorFill
        ref={ref}
        wholeFill
        invert
        className={cn(
          "group relative flex items-center gap-4 border-y-2 py-4 shadow-sm transition-all duration-200",
          "hover:shadow-md ",
          "focus-within:outline-none"
        )}
      >
        {/* Whole-card link to project details */}
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`${project.title} — details`}
          className="absolute inset-0 z-40 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />

        {/* Favicon + title row shifts inward on hover, action icons stay put */}
        <div className="relative z-10 flex w-full min-w-0 items-center gap-4 transition-transform duration-300 ease-out group-hover:translate-x-2">
          {/* Favicon / Thumbnail */}
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md">
            {faviconSrc ? (
              <Image
                src={faviconSrc}
                alt={project.title}
                fill
                sizes="40px"
                placeholder="blur"
                blurDataURL={blurDataURL}
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <Code className="h-5 w-5" />
              </div>
            )}
          </div>

          {/* Main content: title + short description */}
          <div className="min-w-0 flex-1">
            <span className="block truncate font-sans text-xl font-semibold">
              {project.title}
            </span>
            <p className="mt-0.5 truncate text-sm text-muted-foreground">
              {project.shortDescription}
            </p>
          </div>
        </div>

        {/* Action links: live & source (pinned) */}
        <div className="relative z-50 flex shrink-0 items-center gap-2">
          {project.liveUrl && (
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live website"
                  className="inline-flex rounded-full p-2 text-muted-foreground transition-colors duration-300 hover:bg-muted hover:text-foreground"
                >
                  <WorldIcon size={18} />
                </a>
              </TooltipTrigger>
              <TooltipContent gooey>Live Website</TooltipContent>
            </Tooltip>
          )}

          {project.repoUrl && (
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Source code"
                  className="inline-flex rounded-full p-2 text-muted-foreground transition-colors duration-300 hover:bg-muted hover:text-foreground"
                >
                  <GithubIcon size={18} />
                </a>
              </TooltipTrigger>
              <TooltipContent gooey>Source Code</TooltipContent>
            </Tooltip>
          )}
        </div>
      </CursorFill>
    )
  }
)

ProjectCard.displayName = "ProjectCard"
export { ProjectCard }