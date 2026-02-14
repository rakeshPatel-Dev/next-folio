"use client"

import slugify from "slugify"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useToast } from "../zenblocks/toast"

import CoreInfo from "./project/CoreInfo"
import ProjectLinks from "./project/ProjectLinks"
import ProjectMeta from "./project/ProjectMeta"
import TechStack from "./project/TechStack"
import FreelanceInfo from "./project/FreelanceInfo"
import { Project } from "@/utils/getProjects"

export type ProjectFormValues = {
  title: string
  shortDescription: string
  image: File | null
  type: string
  status: string
  techStack: { label: string; icon?: string }[]
  liveUrl?: string
  repoUrl?: string
  isFreelance: boolean
  clientName?: string
  clientLocation?: string
  clientIndustry?: string
  isClientPublic: boolean
}

type Props = {
  path: string
  saveProject: (values: any) => Promise<void>
  initialData?: Project | null // Add this
}

export default function ProjectForm({ path, saveProject, initialData }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const { uploadImage } = useCloudinaryUpload()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<ProjectFormValues>({
    defaultValues: initialData
      ? {
        title: initialData.title,
        shortDescription: initialData.shortDescription,
        type: initialData.type,
        status: initialData.status,
        techStack: initialData.techStack,
        liveUrl: initialData.liveUrl,
        repoUrl: initialData.repoUrl,
        isFreelance: initialData.isFreelance,
        clientName: initialData.clientName,
        clientLocation: initialData.clientLocation,
        clientIndustry: initialData.clientIndustry,
        isClientPublic: initialData.isClientPublic,
        image: null, // Will be set if user uploads new image
      }
      : {
        techStack: [],
        isFreelance: false,
        isClientPublic: true,
        image: null,
      },
  })

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      if (!data.title?.trim()) {
        throw new Error("Title is required")
      }

      let imageUrl = initialData?.image // Keep existing image by default
      let imagePublicId = initialData?.imagePublicId

      // Only upload if new image selected
      if (data.image) {
        const upload = await uploadImage(data.image)
        imageUrl = upload.url
        imagePublicId = upload.publicId
      } else if (!initialData) {
        // New project must have image
        throw new Error("Image is required")
      }
      if (!imageUrl) {
        throw new Error("Image is required")
      };

      const slug = initialData?.slug ?? slugify(data.title, {
        lower: true,
        strict: true,
        trim: true,
      })

      const { image: _, ...restData } = data
      const payload = {
        ...restData,
        slug,
        image: imageUrl,
        imagePublicId,
      }

      await saveProject(payload)

      toast({
        title: initialData ? "Project updated" : "Project saved",
        description: initialData
          ? "Your project has been updated successfully."
          : "Your project has been saved successfully.",
        variant: "success",
      })
      router.push(path)
    } catch (err: any) {
      console.error("Error while saving:", err)
      toast({
        title: "Error",
        description: err.message || "Something went wrong",
        variant: "error",
      })
    }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <CoreInfo register={register} errors={Error} setValue={setValue} />

      <ProjectMeta errors={Error} control={control} />

      <ProjectLinks errors={Error} register={register} />

      <TechStack errors={Error} watch={watch} setValue={setValue} />

      <FreelanceInfo
        errors={Error}
        control={control}
        register={register}
        watch={watch}
      />

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            toast({
              title: "Cancelled",
              description: "No changes were saved.",
              variant: "warning",
            })
            router.push(path)
          }}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Project"
          )}
        </Button>
      </div>
    </form>
  )
}
