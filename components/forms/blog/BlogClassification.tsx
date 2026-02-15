import { Control } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BlogFormValues } from "../BlogForm"
import { Shapes, X } from "lucide-react"
import { useState, KeyboardEvent } from "react"

export function BlogClassification({ control }: { control: Control<BlogFormValues> }) {
  const [tagInput, setTagInput] = useState("")

  const handleAddTag = (
    currentTags: string[],
    onChange: (tags: string[]) => void
  ) => {
    const trimmedTag = tagInput.trim().toLowerCase()

    if (trimmedTag && !currentTags.includes(trimmedTag)) {
      onChange([...currentTags, trimmedTag])
      setTagInput("")
    }
  }

  const handleRemoveTag = (
    tagToRemove: string,
    currentTags: string[],
    onChange: (tags: string[]) => void
  ) => {
    onChange(currentTags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    currentTags: string[],
    onChange: (tags: string[]) => void
  ) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag(currentTags, onChange)
    } else if (e.key === "Backspace" && !tagInput && currentTags.length > 0) {
      // Remove last tag if backspace is pressed on empty input
      onChange(currentTags.slice(0, -1))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shapes className="h-5 w-5 text-muted-foreground" />
          Classification
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured</FormLabel>
              <Select onValueChange={(v) => field.onChange(v === "true")} value={String(field.value)}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Featured?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="tags"
          render={({ field }) => (
            <FormItem className="md:col-span-3">
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Input
                    placeholder="Type a tag and press Enter"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, field.value, field.onChange)}
                    onBlur={() => {
                      if (tagInput.trim()) {
                        handleAddTag(field.value, field.onChange)
                      }
                    }}
                  />
                  {field.value.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {field.value.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="px-3 py-1 text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag, field.value, field.onChange)}
                            className="ml-2 hover:text-destructive focus:outline-none"
                            aria-label={`Remove ${tag} tag`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <p className="text-sm text-muted-foreground">
                Press Enter or click away to add a tag. Click X to remove.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}