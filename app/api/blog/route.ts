import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import Blog from "@/models/blogModel"
import { requireAdmin } from "@/lib/auth"
import mongoose from "mongoose"

// GET /api/blog - Get all blogs with filtering, sorting, and pagination
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    
    // Pagination
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Filters
    const status = searchParams.get("status")
    const isFeatured = searchParams.get("isFeatured")
    const tag = searchParams.get("tag")
    const author = searchParams.get("author")
    const search = searchParams.get("search")

    // Sorting
    const sortBy = searchParams.get("sortBy") || "createdAt"
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1

    // Build query
    const query: any = {}

    if (status) {
      query.status = status
    }

    if (isFeatured !== null && isFeatured !== undefined) {
      query.isFeatured = isFeatured === "true"
    }

    if (tag) {
      query.tags = tag
    }

    if (author && mongoose.Types.ObjectId.isValid(author)) {
      query.author = author
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ]
    }

    // Execute query
    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit)
        .populate("author", "name email image")
        .lean(),
      Blog.countDocuments(query),
    ])

    return NextResponse.json({
      success: true,
      data: blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    })
  } catch (error: any) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch blogs",
      },
      { status: 500 }
    )
  }
}

// POST /api/blog - Create a new blog
export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const {
      title,
      slug,
      description,
      coverImage,
      tags,
      status,
      isFeatured,
    } = body

    // Validation
    if (!title || !slug || !description || !coverImage) {
      return NextResponse.json(
        {
          success: false,
          error: "Required fields are missing",
        },
        { status: 400 }
      )
    }

    if (description.length > 200) {
      return NextResponse.json(
        {
          success: false,
          error: "Description must be 200 characters or less",
        },
        { status: 400 }
      )
    }

    if (title.length > 150) {
      return NextResponse.json(
        {
          success: false,
          error: "Title must be 150 characters or less",
        },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug })
    if (existingBlog) {
      return NextResponse.json(
        {
          success: false,
          error: "A blog with this slug already exists",
        },
        { status: 409 }
      )
    }

    // Prepare blog data
    const blogData: any = {
      title: title.trim(),
      slug: slug.toLowerCase().trim(),
      description: description.trim(),
      coverImage,
      author: new mongoose.Types.ObjectId(session.user.id),
      status: status || "draft",
      tags: tags || [],
      isFeatured: isFeatured || false,
    }

    // Set publishedAt if status is published
    if (blogData.status === "published") {
      blogData.publishedAt = new Date()
    }

    // Create the blog
    const blog = await Blog.create(blogData)

    // Populate author details
    await blog.populate("author", "name email image")

    return NextResponse.json(
      {
        success: true,
        message: "Blog created successfully",
        data: blog,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Error creating blog:", error)

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
        error: error.message || "Failed to create blog",
      },
      { status: 500 }
    )
  }
}