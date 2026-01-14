import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import Project from "@/models/projectModel"
import { requireAdmin } from "@/lib/auth"
import slugify from "slugify"

// GET /api/project/:id — get single project
export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()
    await connectDB()

    const project = await Project.findById(params.id)

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(project)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch project" },
      { status: 400 }
    )
  }
}

// PUT /api/project/:id — update project
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()
    await connectDB()

    const body = await req.json()

    // regenerate slug if title changes
    if (body.title) {
      body.slug = slugify(body.title, { lower: true, strict: true })
    }

    const updatedProject = await Project.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    )

    if (!updatedProject) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedProject)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update project" },
      { status: 400 }
    )
  }
}

// DELETE /api/project/:id — delete project
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()
    await connectDB()

    const deleted = await Project.findByIdAndDelete(params.id)

    if (!deleted) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete project" },
      { status: 400 }
    )
  }
}
