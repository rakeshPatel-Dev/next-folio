"use client";

import * as React from "react";
import { ArrowUpRight, Github, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "@/types/project";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project }, ref) => {
    const router = useRouter();

    const goToDetails = () => {
      router.push(`/projects/${project.id}`);
    };

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        onClick={goToDetails}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            goToDetails();
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
          style={{ backgroundColor: project.typeColor + "CC" }}
        >
          {project.type.toUpperCase()}
        </span>

        {/* Image */}
        <div className="relative aspect-video p-2 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          {/* Title + Icons */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-sans font-semibold">{project.title}</h3>

            <div className="flex gap-3">
              {project.liveLink && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      title="Live link"
                      href={project.liveLink}
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

              {project.sourceLink && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      title="Source code"
                      href={project.sourceLink}
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
          <p className="mt-3 flex-1 text-muted-foreground">
            {project.description}
          </p>

          {/* Tech Icons */}
          <div className="mt-4 flex flex-col gap-2">
            <h4 className="font-sans">Technologies</h4>
            <div className="flex gap-4 items-center">
              {project.icons.map((icon, idx) => {
                const Icon = icon.icon;
                return (
                  <Tooltip key={idx}>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className=" inline-flex"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      >
                        <Icon
                          className="h-6 w-6 transition-transform hover:scale-110"
                          style={{ color: icon.color }}
                        />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>{icon.tooltip}</TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between">
            {/* Status */}
            <div
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium",
                project.status === "Completed"
                  ? "border-green-500 text-green-500"
                  : "border-orange-500 text-orange-500"
              )}
            >
              <span className="relative flex h-3 w-3">
                <span
                  className={cn(
                    "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                    project.status === "Completed"
                      ? "bg-green-400"
                      : "bg-orange-400"
                  )}
                />
                <span
                  className={cn(
                    "relative inline-flex h-3 w-3 rounded-full",
                    project.status === "Completed"
                      ? "bg-green-500"
                      : "bg-orange-500"
                  )}
                />
              </span>
              {project.status}
            </div>

            {/* Visual CTA (no navigation logic here) */}
            <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-primary">
              View details
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";
export { ProjectCard };
