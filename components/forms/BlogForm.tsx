"use client"

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import slugify from "slugify"

import { Form } from "@/components/ui/form"
import { BlogBasics } from "./blog/BlogBasics"
import { BlogClassification } from "./blog/BlogClassification"
import { Button } from "../ui/button"
import { useToast } from "../zenblocks/toast"
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload"
import { Spinner } from "../ui/spinner"

export type BlogFormValues = {
  title: string
  slug: string
  description: string
  coverImage: string | File
  tags: string[]
  author: string
  status: "draft" | "published"
  isFeatured: boolean
}

export default function AdminBlogForm({
  defaultValues,
  path,
  saveBlog,
  currentUserId,
  isEditMode = false,
}: {
  defaultValues?: Partial<BlogFormValues>
  path: string
  saveBlog: (values: BlogFormValues) => Promise<{ success: boolean; message: string }>
  currentUserId: string
  isEditMode?: boolean
}) {
  const router = useRouter()
  const { toast } = useToast()
  const { uploadImage } = useCloudinaryUpload()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<BlogFormValues>({
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      coverImage: "",
      tags: [],
      author: currentUserId,
      status: "draft",
      isFeatured: false,
      ...defaultValues,
    },
  })

  // Auto-generate slug from title (only for new blogs)
  const handleTitleChange = (title: string) => {
    if (!isEditMode && !defaultValues?.slug) {
      const generatedSlug = slugify(title, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
      })
      form.setValue("slug", generatedSlug)
    }
  }

  async function onSubmit(values: BlogFormValues) {
    if (isSubmitting) return

    try {
      setIsSubmitting(true)

      // Validation
      if (!values.title?.trim()) {
        throw new Error("Title is required")
      }

      if (!values.slug?.trim()) {
        throw new Error("Slug is required")
      }

      if (!values.description?.trim()) {
        throw new Error("Description is required")
      }

      if (!values.coverImage) {
        throw new Error("Cover image is required")
      }

      // Handle image upload only if it's a File object
      let coverImageUrl = values.coverImage

      if (values.coverImage instanceof File) {
        toast({
          title: "Uploading image...",
          description: "Please wait while we upload your cover image.",
        })

        const upload = await uploadImage(values.coverImage)
        coverImageUrl = upload.url
      }

      const payload: BlogFormValues = {
        ...values,
        coverImage: typeof coverImageUrl === 'string' ? coverImageUrl : '',
        author: currentUserId,
      }


      const result = await saveBlog(payload)


      if (result.success) {
        toast({
          title: isEditMode ? "Blog updated" : "Blog created",
          description: result.message,
          variant: "success",
        })

        // Clear form state
        form.reset()

        // Force router refresh and redirect
        router.push(path)
      } else {
        throw new Error(result.message || "Failed to save blog")
      }
    } catch (err: unknown) {
      console.error("Form submission error:", err)

      const errorMessage = err instanceof Error ? err.message : "Please try again."

      toast({
        title: isEditMode ? "Failed to update blog" : "Failed to create blog",
        description: errorMessage,
        variant: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    if (form.formState.isDirty) {
      const confirmCancel = confirm("You have unsaved changes. Are you sure you want to cancel?")
      if (!confirmCancel) return
    }
    router.push(path)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-5xl"
      >
        <BlogBasics
          control={form.control}
          onTitleChange={handleTitleChange}
          isEditMode={isEditMode}
        />
        <BlogClassification control={form.control} />

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner data-icon="inline-start" className="size-4" />
                {isEditMode ? "Updating..." : "Creating..."}
              </>
            ) : (
              isEditMode ? "Update Blog" : "Create Blog"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}