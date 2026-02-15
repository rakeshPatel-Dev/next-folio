import AdminBlogForm from '@/components/forms/BlogForm'
import { AppBreadcrumb } from '@/components/BreadCrumb'
import React from 'react'
import { connectDB } from '@/lib/mongoose'
import Blog from '@/models/blogModel'
import { requireAdmin } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import mongoose from 'mongoose'
import slugify from 'slugify'

// ✅ Server action to update a blog
async function updateBlog(id: string, values: any) {
  "use server"

  try {
    await connectDB()

    const session = await requireAdmin()
    if (!session?.user) {
      throw new Error("Unauthorized")
    }

    // Validate required fields
    const { title, slug, description, coverImage, author, status, tags, isFeatured } = values

    if (!title || !slug || !description || !coverImage) {
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

    // Find existing blog
    const existingBlog = await Blog.findById(id)
    if (!existingBlog) {
      throw new Error("Blog not found")
    }

    // Check ownership
    if (existingBlog.author.toString() !== session.user.id) {
      throw new Error("Forbidden: You can only edit your own blogs")
    }

    // Generate slug from title if changed
    const finalSlug = slugify(slug || title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    })

    // Check if slug already exists (but not for the current blog)
    if (finalSlug !== existingBlog.slug) {
      const duplicateSlug = await Blog.findOne({ slug: finalSlug })
      if (duplicateSlug) {
        throw new Error("A blog with this slug already exists. Please use a different title or slug.")
      }
    }

    // Prepare update data
    const updateData: any = {
      title: title.trim(),
      slug: finalSlug,
      description: description.trim(),
      coverImage,
      status,
      tags: tags || [],
      isFeatured: isFeatured || false,
    }

    // Handle publishedAt
    if (status === 'published' && existingBlog.status === 'draft') {
      // If changing from draft to published, set publishedAt
      updateData.publishedAt = new Date()
    } else if (status === 'draft') {
      // If changing to draft, clear publishedAt
      updateData.publishedAt = null
    } else if (status === 'published' && existingBlog.publishedAt) {
      // Keep existing publishedAt if already published
      updateData.publishedAt = existingBlog.publishedAt
    }

    // Update the blog
    await Blog.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })

    return {
      success: true,
      message: "Blog updated successfully",
    }
  } catch (error: any) {
    console.error("Error while updating blog:", error)

    // Handle duplicate key error
    if (error.code === 11000) {
      throw new Error("A blog with this slug already exists. Please use a different title or slug.")
    }
    return {
      success: false,
      message: error.message || "Failed to update blog",
    }

    // throw new Error(error.message || "Failed to update blog")
  }
}

interface PageProps {
  params: Promise<{
    id: string
  }>
}

const Page = async ({ params }: PageProps) => {
  // ✅ Await params to get the id
  const { id } = await params

  // ✅ Get current user session
  const session = await requireAdmin()

  if (!session?.user) {
    redirect('/login')
  }

  const currentUserId = session.user.id

  if (!currentUserId) {
    throw new Error("User ID not found in session")
  }

  // ✅ Validate the blog ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound()
  }

  // ✅ Connect to database and fetch the blog
  await connectDB()
  const blog = await Blog.findById(id).lean()

  if (!blog) {
    notFound()
  }

  // ✅ Check if user is the author
  if (blog.author.toString() !== currentUserId) {
    redirect('/admin/blog') // Redirect if not the owner
  }

  // ✅ Prepare default values for the form
  const defaultValues = {
    title: blog.title,
    slug: blog.slug,
    description: blog.description,
    coverImage: blog.coverImage,
    tags: blog.tags || [],
    author: blog.author.toString(),
    status: blog.status as "draft" | "published",
    isFeatured: blog.isFeatured || false,
  }

  // ✅ Wrap updateBlog with the blog ID
  const updateBlogWithId = async (values: any) => {
    "use server"
    return updateBlog(id, values)
  }

  return (
    <div className='sm:p-6'>
      <div className='flex flex-col gap-2 mb-6'>
        <h1 className="text-3xl font-bold">Edit Blog</h1>
        <p className="text-muted-foreground">
          Update your blog post using the form below.
        </p>
        <span className='mt-4'>
          <AppBreadcrumb
            items={[
              { label: "dashboard", href: "/admin/dashboard" },
              { label: "blog", href: "/admin/blog" },
              { label: "edit", href: `/admin/blog/edit/${id}` },
            ]}
          />
        </span>
      </div>
      <AdminBlogForm
        path="/admin/blog"
        saveBlog={updateBlogWithId}
        currentUserId={currentUserId}
        defaultValues={defaultValues}
        isEditMode={true}
      />
    </div>
  )
}

export default Page

// ✅ Generate metadata
export async function generateMetadata({ params }: PageProps) {
  const { id } = await params

  await connectDB()
  const blog = await Blog.findById(id).lean()

  return {
    title: blog ? `Edit: ${blog.title}` : 'Edit Blog',
    description: 'Edit your blog post',
  }
}