import mongoose from "mongoose"

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: true,
      maxlength: 200, // for cards + meta description
    },

    coverImage: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
      default: [],
      index: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    readingTime: {
      type: Number, // minutes
      default: 0, // calculate from content
    },

    views: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    seo: {
      metaTitle: {
        type: String,
        maxlength: 60,
      },
      metaDescription: {
        type: String,
        maxlength: 160,
      },
      ogImage: {
        type: String,
      },
    },

    publishedAt: {
      type: Date,
    },
  },
  { timestamps: true }
)

// Auto-set published date
blogSchema.pre("save", function (next) {
  if (this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date()
  }
  next()
})

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema)

export default Blog
