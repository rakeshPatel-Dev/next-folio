import { Control } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BlogFormValues } from "../BlogForm"
import Image from "next/image"

interface BlogBasicsProps {
  control: Control<BlogFormValues>
  onTitleChange?: (title: string) => void
  isEditMode?: boolean
}

export function BlogBasics({ control, onTitleChange, isEditMode = false }: BlogBasicsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Basic Information</h2>

      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title *</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter blog title"
                {...field}
                onChange={(e) => {
                  field.onChange(e)
                  onTitleChange?.(e.target.value)
                }}
                maxLength={150}
              />
            </FormControl>
            <p className="text-sm text-muted-foreground">
              {field.value?.length || 0}/150 characters
            </p>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Slug *</FormLabel>
            <FormControl>
              <Input
                placeholder="blog-post-slug"
                {...field}
              />
            </FormControl>
            <p className="text-sm text-muted-foreground">
              {isEditMode
                ? "URL-friendly version of the title. Changing this will change the blog's URL."
                : "Auto-generated from title. You can customize it if needed."
              }
            </p>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Brief description of your blog post"
                {...field}
                maxLength={200}
                rows={4}
              />
            </FormControl>
            <p className="text-sm text-muted-foreground">
              {field.value?.length || 0}/200 characters
            </p>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="coverImage"
        render={({ field: { onChange, value, ...field } }) => (
          <FormItem>
            <FormLabel>Cover Image *</FormLabel>
            <FormControl>
              <div className="space-y-4">
                {/* Current image preview */}
                {typeof value === 'string' && value && (
                  <div className="relative">
                    <Image
                      width={400}
                      height={300}
                      src={value}
                      alt="Current cover"
                      className="w-full max-w-2xl h-64 object-cover rounded-lg border"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Current cover image
                    </p>
                  </div>
                )}

                {/* File input */}
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        onChange(file)
                      }
                    }}
                    {...field}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {isEditMode
                      ? "Upload a new image to replace the current cover (optional)"
                      : "Upload a cover image for your blog post"
                    }
                  </p>
                </div>

                {/* Preview new file if selected */}
                {value instanceof File && (
                  <div className="relative">
                    <Image
                      width={400}
                      height={300}
                      src={URL.createObjectURL(value)}
                      alt="New cover preview"
                      className="w-full max-w-2xl h-64 object-cover rounded-lg border border-primary"
                    />
                    <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                      ✓ New image selected (will be uploaded on save)
                    </p>
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}