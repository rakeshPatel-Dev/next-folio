import { z } from "zod"

export const projectSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description too short"),
  image: z.any().optional(),
  type: z.enum(["fullstack", "frontend", "backend", "uiux"]),
  status: z.enum(["draft", "building", "published"]),
  liveUrl: z.string().url("Invalid URL"),
  sourceUrl: z.string().url("Invalid URL").optional(),
  techStack: z.array(
    z.object({
      label: z.string(),
      icon: z.string(),
    })
  ).min(1, "Add at least one technology"),
})

export type ProjectFormValues = z.infer<typeof projectSchema>
