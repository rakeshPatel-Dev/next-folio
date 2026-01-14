import mongoose from "mongoose"

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: true,
      maxlength: 200,
    },

    content: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    author: {
      type: String,
      default: "Admin",
    },

    readingTime: {
      type: Number,
      default: 5,
    },

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

const Blog =
  mongoose.models.Blog || mongoose.model("Blog", blogSchema)

export default Blog
