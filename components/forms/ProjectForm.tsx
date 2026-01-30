"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

import { ProjectFormValues, projectSchema } from "@/config/projectformschema"

import CoreInfo from "./project/CoreInfo"
import ProjectLinks from "./project/ProjectLinks"
import ProjectMeta from "./project/ProjectMeta"
import TechStack from "./project/TechStack"
import { useToast } from "../zenblocks/toast"

type Props = {
  path: string
}

export default function ProjectForm({ path }: Props) {
  const router = useRouter()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState,
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: { techStack: [] },
  })

  const onSubmit = (data: ProjectFormValues) => {
    // TODO: Replace with actual API call in production.
    console.log("Form Data:", data)
    toast({
      title: "Project saved",
      description: "Your project has been saved successfully.",
      variant: "success"
    })

    router.push(path)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <CoreInfo register={register} errors={formState.errors} />


      <ProjectMeta control={control} errors={formState.errors} />

      <ProjectLinks register={register} errors={formState.errors} />

      <TechStack watch={watch} setValue={setValue} errors={formState.errors} />

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            toast({
              title: "Cancelled",
              description: "No changes were saved.",
              variant: "warning"
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
