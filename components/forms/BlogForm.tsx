"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { blogSchema, BlogFormValues } from "@/config/blogFormSchema"
import { Form } from "@/components/ui/form"
import { BlogBasics } from "./blog/BlogBasics"
import { BlogClassification } from "./blog/BlogClassification"
import { BlogSEO } from "./blog/BlogSEO"
import { BlogActions } from "./blog/BlogActions"

export default function AdminBlogForm({
  defaultValues,
  path,
}: {
  defaultValues?: Partial<BlogFormValues>
  path: string
}) {
  const router = useRouter()

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      coverImage: "",
      tags: [],
      author: "Admin",
      readingTime: 5,
      status: "draft",
      isFeatured: false,
      seo: {},
      ...defaultValues,
    },
  })

  const saveBlog = (values) => {
    console.log(values);
  }

  async function onSubmit(values: BlogFormValues) {
    try {
      // TODO: Replace with actual API call or server action
      await saveBlog(values)
      toast.success("Blog saved", {
        description: "Your blog has been saved successfully.",
      })
      router.push(path)
    } catch {
      toast.error("Failed to save blog", {
        description: "Please try again.",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-5xl">
        <BlogBasics control={form.control} />
        <BlogClassification control={form.control} />
        <BlogSEO control={form.control} />
        <BlogActions path={path} />
      </form>
    </Form>
  )
}
