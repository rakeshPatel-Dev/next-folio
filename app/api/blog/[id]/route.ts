import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import Blog from "@/models/blogModel"
import { requireAdmin } from "@/lib/auth"
import mongoose from "mongoose"

// GET /api/blog/[id] - Get a single blog by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()

    const { id } = await params

    let blog

    // Check if it's a valid ObjectId or a slug
    if (mongoose.Types.ObjectId.isValid(id)) {
      blog = await Blog.findById(id).populate("author", "name email image").lean()
    } else {
      blog = await Blog.findOne({ slug: id }).populate("author", "name email image").lean()
    }

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog not found",
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: blog,
    })
  } catch (error: any) {
    console.error("Error fetching blog:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch blog",
      },
      { status: 500 }
    )
  }
}

// PATCH /api/blog/[id] - Update a blog
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdmin()

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      )
    }

    await connectDB()

    const { id } = await params
    const body = await request.json()

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid blog ID",
        },
        { status: 400 }
      )
    }

    // Find the blog
    const existingBlog = await Blog.findById(id)

    if (!existingBlog) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog not found",
        },
        { status: 404 }
      )
    }

    // Check if user is the author
    if (existingBlog.author.toString() !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Forbidden: You can only edit your own blogs",
        },
        { status: 403 }
      )
    }

    // Validate fields if they're being updated
    if (body.title && body.title.length > 150) {
      return NextResponse.json(
        {
          success: false,
          error: "Title must be 150 characters or less",
        },
        { status: 400 }
      )
    }

    if (body.description && body.description.length > 200) {
      return NextResponse.json(
        {
          success: false,
          error: "Description must be 200 characters or less",
        },
        { status: 400 }
      )
    }

    // Check if slug is being changed and if it already exists
    if (body.slug && body.slug !== existingBlog.slug) {
      const duplicateSlug = await Blog.findOne({ slug: body.slug })
      if (duplicateSlug) {
        return NextResponse.json(
          {
            success: false,
            error: "A blog with this slug already exists",
          },
          { status: 409 }
        )
      }
    }

    // Prepare update data
    const updateData: any = {}

    if (body.title) updateData.title = body.title.trim()
    if (body.slug) updateData.slug = body.slug.toLowerCase().trim()
    if (body.description) updateData.description = body.description.trim()
    if (body.coverImage) updateData.coverImage = body.coverImage
    if (body.tags !== undefined) updateData.tags = body.tags
    if (body.status) updateData.status = body.status
    if (body.isFeatured !== undefined) updateData.isFeatured = body.isFeatured

    // Handle publishedAt
    if (body.status === "published" && existingBlog.status === "draft") {
      // If changing from draft to published, set publishedAt
      updateData.publishedAt = new Date()
    } else if (body.status === "draft") {
      // If changing to draft, clear publishedAt
      updateData.publishedAt = null
    }

    // Update the blog
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate("author", "name email image")

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    })
  } catch (error: any) {
    console.error("Error updating blog:", error)

    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          error: "A blog with this slug already exists",
        },
        { status: 409 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to update blog",
      },
      { status: 500 }
    )
  }
}

// DELETE /api/blog/[id] - Delete a blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdmin()

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      )
    }

    await connectDB()

    const { id } = await params

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid blog ID",
        },
        { status: 400 }
      )
    }

    // Find the blog
    const blog = await Blog.findById(id)

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          error: "Blog not found",
        },
        { status: 404 }
      )
    }

    // Check if user is the author
    if (blog.author.toString() !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Forbidden: You can only delete your own blogs",
        },
        { status: 403 }
      )
    }

    // Delete the blog
    await Blog.findByIdAndDelete(id)

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    })
  } catch (error: any) {
    console.error("Error deleting blog:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to delete blog",
      },
      { status: 500 }
    )
  }
}