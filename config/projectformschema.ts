import { z } from "zod"

export const projectSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase and URL-friendly"),
  shortDescription: z
    .string()
    .min(10, "Short description must be at least 10 characters")
    .max(200, "Short description cannot exceed 200 characters"),

  image: z
    .string()
    .url("Project image must be a valid URL"),

  type: z.enum(
    ["frontend", "backend", "fullStack", "mobile", "other"],
    { message: "Select a valid project type" }
  ),

  status: z.enum(
    ["Building", "Completed", "Paused"],
    { message: "Invalid project status" }
  ),

  technologies: z
    .array(
      z.object({
        label: z.string().min(1, "Label is required"),
        value: z.string().min(1, "Value is required"),
        icon: z.string().optional(),
      })
    )
    .min(1, "Add at least one technology"),

  liveUrl: z
    .string()
    .url("Live URL must be a valid URL")
    .optional()
    .or(z.literal("")),

  repoUrl: z
    .string()
    .url("Repository URL must be a valid URL")
    .optional()
    .or(z.literal("")),

  // Freelance-related (optional but consistent)
  isFreelance: z.boolean().default(false),

  clientName: z
    .string()
    .trim()
    .optional(),

  clientLocation: z.string().optional(),

  clientIndustry: z.string().optional(),

  isClientPublic: z.boolean().default(true),
})

export type ProjectFormValues = z.infer<typeof projectSchema>
