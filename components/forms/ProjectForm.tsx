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
}

export default function ProjectForm({ path, saveProject }: Props) {
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
    defaultValues: {
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

      const file = data.image
      if (!file) {
        throw new Error("No image selected")
      }

      // 1️⃣ Upload image
      const upload = await uploadImage(file)

      // 2️⃣ Slug
      const slug = slugify(data.title, {
        lower: true,
        strict: true,
        trim: true,
      })

      // 3️⃣ Final payload - exclude the File object, include the URL
      const { image: _, ...restData } = data  // Remove File object from data
      const payload = {
        ...restData,
        slug,
        image: upload.url,              // ✅ Add URL
        imagePublicId: upload.publicId,
      }

      // 4️⃣ Save
      await saveProject(payload)

      toast({
        title: "Project saved",
        description: "Your project has been saved successfully.",
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
