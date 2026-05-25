"use client"

import { UseFormRegister } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ProjectFormValues } from "../ProjectForm"
import { Link2 } from "lucide-react"

type ProjectLinksProps = {
  register: UseFormRegister<ProjectFormValues>
}

export function ProjectLinks({ register }: ProjectLinksProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link2 className="h-5 w-5 text-muted-foreground" />
          Links
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="liveUrl" className="text-sm font-medium">
            Live URL
          </label>
          <Input
            id="liveUrl"
            type="url"
            placeholder="https://..."
            {...register("liveUrl")}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="repoUrl" className="text-sm font-medium">
            GitHub URL
          </label>
          <Input
            id="repoUrl"
            type="url"
            placeholder="https://github.com/..."
            {...register("repoUrl")}
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label htmlFor="videoUrl" className="text-sm font-medium">
            Video URL <span className="text-muted-foreground">(optional)</span>
          </label>
          <Input
            id="videoUrl"
            type="url"
            placeholder="https://www.youtube.com/embed/..."
            {...register("videoUrl")}
          />
        </div>
      </CardContent>
    </Card>
  )
}
