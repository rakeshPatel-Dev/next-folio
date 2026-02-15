import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoose"
import Blog from "@/models/blogModel"
import mongoose from "mongoose"

// GET /api/blog/tags - Get all unique tags for a user's blogs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        {
          success: false,
          error: "Valid user ID is required",
        },
        { status: 400 }
      )
    }

    await connectDB()

    // Get all unique tags from user's blogs
    const result = await Blog.aggregate([
      { $match: { author: new mongoose.Types.ObjectId(userId) } },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])

    const tags = result.map((item) => item._id)

    return NextResponse.json({
      success: true,
      tags,
    })
  } catch (error: any) {
    console.error("Error fetching tags:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch tags",
      },
      { status: 500 }
    )
  }
}