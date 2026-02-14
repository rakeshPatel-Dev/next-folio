import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import Project from "@/models/projectModel"
import { requireAdmin } from "@/lib/auth"
import slugify from "slugify"

// POST /api/project - Create a new project
export async function POST(req: Request) {
  try {
    await requireAdmin()
    await connectDB()

    const body = await req.json()

    const slug = slugify(body.title, { lower: true, strict: true })

    const project = await Project.create({
      ...body,
      slug,
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create project" },
      { status: 400 }
    )
  }
}

// GET /api/project - Get all projects 
export async function GET() {
  try {
    await requireAdmin()
    await connectDB()

    const projects = await Project.find().sort({ createdAt: -1 })

    // Handle case when no projects are found
    if (!projects || projects.length === 0) {
      return NextResponse.json(
        { error: "No projects found", projects: [] }, 
        { status: 404 }
      )
    }

    return NextResponse.json(projects)
  } catch (error: any) {
    // Check for authorization errors
    if (error.message?.includes('Unauthorized') || error.name === 'UnauthorizedError') {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required to view projects" }, 
        { status: 401 }
      )
    }

    // Check for database connection errors
    if (error.message?.includes('connect') || error.name === 'MongooseError') {
      return NextResponse.json(
        { error: "Failed to fetch projects: Database connection error" }, 
        { status: 503 }
      )
    }

    // Generic error fallback
    return NextResponse.json(
      { error: "Failed to fetch projects: An unexpected error occurred" }, 
      { status: 500 }
    )
  }
}

// PUT /api/project - Update a project
export async function PUT(req: Request) {
  try {
    await requireAdmin()
    await connectDB()

    const body = await req.json()
    const { _id, ...updateData } = body

    if (!_id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      )
    }

    // Update slug if title changed
    if (updateData.title) {
      updateData.slug = slugify(updateData.title, { lower: true, strict: true })
    }

    const project = await Project.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: true }
    )

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(project)
  } catch (error: any) {
    // Check for authorization errors
    if (error.message?.includes('Unauthorized') || error.name === 'UnauthorizedError') {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" }, 
        { status: 401 }
      )
    }

    // Check for validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: `Validation failed: ${error.message}` },
        { status: 400 }
      )
    }

    // Check for cast errors (invalid ID format)
    if (error.name === 'CastError') {
      return NextResponse.json(
        { error: "Invalid project ID format" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: error.message || "Failed to update project" },
      { status: 500 }
    )
  }
}

// DELETE /api/project - Delete a project
export async function DELETE(req: Request) {
  try {
    await requireAdmin()
    await connectDB()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      )
    }

    const project = await Project.findByIdAndDelete(id)

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: "Project deleted successfully", project },
      { status: 200 }
    )
  } catch (error: any) {
    // Check for authorization errors
    if (error.message?.includes('Unauthorized') || error.name === 'UnauthorizedError') {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" }, 
        { status: 401 }
      )
    }

    // Check for cast errors (invalid ID format)
    if (error.name === 'CastError') {
      return NextResponse.json(
        { error: "Invalid project ID format" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: error.message || "Failed to delete project" },
      { status: 500 }
    )
  }
}