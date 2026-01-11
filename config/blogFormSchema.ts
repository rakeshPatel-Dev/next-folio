import { z } from "zod"


export const blogSchema = z.object({
  title: z.string().min(5),
  subtitle: z.string().min(10),
  image: z.string().url(),
  category: z.string(),
  readingTime: z.string(),
  date: z.string(),
  link: z.string().startsWith("/"),
  variant: z.enum(["featured", "normal"]),
})

export type BlogFormValues = z.infer<typeof blogSchema>