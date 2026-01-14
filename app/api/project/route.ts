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

    return NextResponse.json(projects)
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

