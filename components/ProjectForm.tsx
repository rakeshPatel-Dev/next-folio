"use client"

import React, { useState } from "react"
import {
  Folder,
  AlignLeft,
  Image as ImageIcon,
  Layers,
  Activity,
  ExternalLink,
  Github,
  Cpu,
} from "lucide-react"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ProjectFormValues } from "@/config/projectformschema"
import { projectSchema } from "@/config/projectformschema"

type TechItem = {
  label: string
  icon: string
}

const TECH_STACK_OPTIONS = [
  { value: "react", label: "React", icon: "⚛️" },
  { value: "nextjs", label: "Next.js", icon: "▲" },
  { value: "typescript", label: "TypeScript", icon: "🟦" },
  { value: "javascript", label: "JavaScript", icon: "🟨" },
  { value: "tailwind", label: "Tailwind CSS", icon: "🌬️" },
  { value: "nodejs", label: "Node.js", icon: "🟢" },
  { value: "express", label: "Express.js", icon: "🚀" },
  { value: "mongodb", label: "MongoDB", icon: "🍃" },
  { value: "postgres", label: "PostgreSQL", icon: "🐘" },
  { value: "mysql", label: "MySQL", icon: "🐬" },
  { value: "prisma", label: "Prisma", icon: "🔷" },
  { value: "docker", label: "Docker", icon: "🐳" },
  { value: "github", label: "GitHub", icon: "🐙" },
  { value: "vercel", label: "Vercel", icon: "▲" },
  { value: "firebase", label: "Firebase", icon: "🔥" },
]

// ----------------------
// Component
// ----------------------
const ProjectForm = ({ path }: { path: string }) => {
  const router = useRouter()

  const [techLabel, setTechLabel] = useState("")
  const [techIcon, setTechIcon] = useState("")
  const [data, setData] = useState([]);

  const { register, handleSubmit, control, setValue, watch, formState } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: { techStack: [] },
  })

  const techStack = watch("techStack")

  const onSubmit = (data: ProjectFormValues) => {
    console.log(data)
    toast.success("Project saved", {
      description: "Your project has been saved successfully.",
      style: {
        color: "#0B6623",
        border: "1px solid #0B6623",
      },
    })
    router.push(path)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Core Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Folder className="h-5 w-5 text-muted-foreground" />
            Core Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Folder className="h-4 w-4" />
              Project Title
            </Label>
            <Input
              placeholder="e.g. isHirable – GitHub Profile Analyzer"
              {...register("title")}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <AlignLeft className="h-4 w-4" />
              Description
            </Label>
            <Textarea
              placeholder="Short, recruiter-focused project description"
              rows={4}
              {...register("description")}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Cover Image
            </Label>
            <Input type="file" {...register("image")} />
          </div>
        </CardContent>
      </Card>

      {/* Meta */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-muted-foreground" />
            Project Meta
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Project Type
            </Label>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fullstack">Full Stack</SelectItem>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="uiux">UI / UX</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Status
            </Label>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="building">Building</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5 text-muted-foreground" />
            Project Links
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Live URL
            </Label>
            <Input placeholder="https://ishirable.com" {...register("liveUrl")} />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              Source Code (optional)
            </Label>
            <Input placeholder="https://github.com/username/repo" {...register("sourceUrl")} />
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-muted-foreground" />
            Tech Stack
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Select
            onValueChange={(value) => {
              const tech = TECH_STACK_OPTIONS.find(t => t.value === value)
              if (!tech) return

              setTechLabel(tech.label)
              setTechIcon(tech.icon)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select technology" />
            </SelectTrigger>
            <SelectContent>
              {TECH_STACK_OPTIONS.map((tech) => (
                <SelectItem key={tech.value} value={tech.value}>
                  {tech.icon} {tech.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tech Label</Label>
              <Input
                value={techLabel}
                onChange={(e) => setTechLabel(e.target.value)}
                placeholder="e.g. Next.js"
              />
            </div>

            <div className="space-y-2">
              <Label>Icon</Label>
              <Input
                value={techIcon}
                onChange={(e) => setTechIcon(e.target.value)}
                placeholder="e.g. ⚛️ or lucide-name"
              />
            </div>
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              if (!techLabel || !techIcon) return
              setValue("techStack", [...techStack, { label: techLabel, icon: techIcon }])
              setTechLabel("")
              setTechIcon("")
            }}
          >
            Add Technology
          </Button>

          {techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
                >
                  <span>{tech.icon}</span>
                  <span>{tech.label}</span>
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            toast.warning("Cancelled", {
              description: "No changes were saved.",
              style: { color: "#FF0000", border: "1px solid #FF0000" },
            })
            router.push(path)
          }}
        >
          Cancel
        </Button>

        <Button type="submit">Save Project</Button>
      </div>
    </form>
  )
}

export default ProjectForm
