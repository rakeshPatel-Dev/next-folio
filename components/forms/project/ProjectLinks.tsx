"use client"

import { Control, UseFormRegister } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ProjectFormValues } from "../ProjectForm"
import { Link2 } from "lucide-react"

type ProjectLinksProps = {
  control: Control<ProjectFormValues>
  register: UseFormRegister<ProjectFormValues>
}

export function ProjectLinks({ control, register }: ProjectLinksProps) {
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
      </CardContent>
    </Card>
  )
}
