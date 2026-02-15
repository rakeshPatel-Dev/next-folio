import AdminBlogForm from '@/components/forms/BlogForm'
import { AppBreadcrumb } from '@/components/BreadCrumb'
import React from 'react'
import { ADDBLOGS_METADATA } from '@/lib/metadata'
import { connectDB } from '@/lib/mongoose'
import Blog from '@/models/blogModel'
import { redirect } from 'next/navigation'
import mongoose from 'mongoose'
import slugify from 'slugify'
import { requireAdmin } from '@/lib/auth'

export const metadata = ADDBLOGS_METADATA

// ✅ Server action to save a blog
async function saveBlog(values: any) {
  "use server"

  try {
    await connectDB()

    // Validate required fields
    const { title, slug, description, coverImage, author, status, tags, isFeatured } = values

    if (!title || !slug || !description || !coverImage || !author) {
      throw new Error("Required fields are missing")
    }

    // Validate description length
    if (description.length > 200) {
      throw new Error("Description must be 200 characters or less")
    }

    // Validate title length
    if (title.length > 150) {
      throw new Error("Title must be 150 characters or less")
    }

    // Validate author is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(author)) {
      throw new Error("Invalid author ID")
    }

    // Generate slug from title if not provided or sanitize provided slug
    const finalSlug = slugify(slug || title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    })

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug: finalSlug })
    if (existingBlog) {
      throw new Error("A blog with this slug already exists. Please use a different title or slug.")
    }

    // Prepare blog data
    const blogData: any = {
      title: title.trim(),
      slug: finalSlug,
      description: description.trim(),
      coverImage,
      author: new mongoose.Types.ObjectId(author),
      status,
      tags: tags || [],
      isFeatured: isFeatured || false,
    }

    // Set publishedAt if status is published
    if (status === 'published') {
      blogData.publishedAt = new Date()
    }

    // Create the blog
    await Blog.create(blogData)

    return {
      success: true,
      message: "Blog saved successfully",
    }
  } catch (error: any) {
    console.error("Error while saving blog:", error)

    // Handle duplicate key error
    if (error.code === 11000) {
      throw new Error("A blog with this slug already exists. Please use a different title or slug.")
    }
    return {
      success: false,
      message: error.message || "Failed to save blog"
    }

    // throw new Error(error.message || "Failed to save blog")
  }
}

const Page = async () => {
  // ✅ Get current user session
  const session = await requireAdmin()

  if (!session?.user) {
    redirect('/login')
  }

  // ✅ Get user ID from session
  const currentUserId = session.user.id

  // Validate that we have a user ID
  if (!currentUserId) {
    throw new Error("User ID not found in session")
  }

  return (
    <div className='sm:p-6'>
      <div className='flex flex-col gap-2 mb-6'>
        <h1 className="text-3xl font-bold">Add New Blog</h1>
        <p className="text-muted-foreground">
          Use the form below to add a new blog to your portfolio.
        </p>
        <span className='mt-4'>
          <AppBreadcrumb
            items={[
              { label: "dashboard", href: "/admin/dashboard" },
              { label: "blog", href: "/admin/blog" },
              { label: "add-blog", href: "/admin/blog/add-blog" },
            ]}
          />
        </span>
      </div>
      <AdminBlogForm
        path="/admin/blog"
        saveBlog={saveBlog}
        currentUserId={currentUserId}
      />
    </div>
  )
}

export default Page