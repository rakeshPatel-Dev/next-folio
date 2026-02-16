"use client"

import { Control } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectFormValues } from "../ProjectForm"
import { FileText } from "lucide-react"
import dynamic from "next/dynamic"
import { Suspense } from "react"

const MDXEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 border rounded-md flex items-center justify-center bg-muted">
        <p className="text-muted-foreground">Loading editor...</p>
      </div>
    ),
  }
)

export function ProjectContent({
  control,
}: {
  control: Control<ProjectFormValues>
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          Case study content (MDX)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Case study body</FormLabel>
              <FormDescription>
                Write the case study in Markdown/MDX. Use headings, lists, code
                blocks, and images for a structured format. This is rendered on
                the project detail page.
              </FormDescription>
              <FormControl>
                <Suspense fallback={<div className="h-96 border rounded-md bg-muted" />}>
                  <MDXEditor
                    value={field.value}
                    onChange={field.onChange}
                    height={500}
                    preview="edit"
                    hideToolbar={false}
                    enableScroll={true}
                    visibleDragbar={true}
                  />
                </Suspense>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
