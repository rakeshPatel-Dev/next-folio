"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { ArrowLeft, Calendar, User } from "lucide-react"

interface Blog {
  id: number
  title: string
  description: string
  content_text: string
  photo_url: string
  category: string
  created_at: string
}

const BlogDetailsPage = () => {
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  const url =
    "https://api.slingacademy.com/v1/sample-data/blog-posts?limit=1&offset=0"

  const fetchBlog = async () => {
    try {
      const res = await axios.get(url)
      setBlog(res.data.blogs[0])
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchBlog()
  }, [])

  if (loading) {
    return <p className="text-center mt-20">Loading article...</p>
  }

  if (!blog) {
    return <p className="text-center mt-20">Blog not found</p>
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Back */}
      <Link href="/blog">
        <Button variant="outline" className="mb-6 gap-2">
          <ArrowLeft size={16} /> Back to Blogs
        </Button>
      </Link>

      {/* Category */}
      <Badge variant="secondary" className="mb-3">
        {blog.category}
      </Badge>

      {/* Title */}
      <h1 className="text-4xl font-bold leading-tight">
        {blog.title}
      </h1>

      {/* Description */}
      <p className="text-lg text-muted-foreground mt-4">
        {blog.description}
      </p>

      {/* Meta Card */}
      <Card className="mt-6">
        <CardContent className="flex flex-wrap gap-6 py-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{new Date(blog.created_at).toDateString()}</span>
          </div>
          <span>• 5 min read</span>
        </CardContent>
      </Card>

      {/* Cover Image */}
      <div className="relative w-full h-[420px] mt-10 rounded-2xl overflow-hidden">
        <Image
          src={blog.photo_url}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none mt-10">
        <p>{blog.content_text}</p>
      </div>

      {/* Insight Card (in-between card) */}
      <Card className="my-12 border-dashed">
        <CardHeader>
          <CardTitle>Key Insight</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          This article highlights practical, real-world lessons that can
          directly improve how developers approach problem-solving and system
          design in modern applications.
        </CardContent>
      </Card>

      {/* Closing Section */}
      <div className="prose prose-lg max-w-none">
        <p>
          Building systems like this requires clarity, consistency, and a
          willingness to think beyond tutorials. Focus on fundamentals, and the
          complexity becomes manageable.
        </p>
      </div>
    </article>
  )
}

export default BlogDetailsPage
