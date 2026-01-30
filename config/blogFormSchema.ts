import { z } from "zod"

// SEO sub-schema
const seoSchema = z.object({
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  ogImage: z.string().url().optional(),
})

export const blogSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title cannot exceed 150 characters")
    .trim(),

  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(100, "Slug cannot exceed 100 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(200, "Description cannot exceed 200 characters")
    .trim(),

  coverImage: z
    .string()
    .url("Cover image must be a valid URL"),

  tags: z
    .array(z.string().min(1).max(50))
    .optional()
    .default([]),

  author: z
    .string()
    .min(3, "Author must be at least 3 characters")
    .optional()
    .default("Admin"), // if using ObjectId, handle validation separately

  readingTime: z
    .number()
    .int("Reading time must be an integer")
    .min(1)
    .max(120)
    .optional()
    .default(5),

  status: z.enum(["draft", "published", "archived"]).default("draft"),

  isFeatured: z.boolean().default(false),

  seo: seoSchema.optional(),
})

export type BlogFormValues = z.infer<typeof blogSchema>
