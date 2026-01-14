import mongoose from "mongoose"

const projectSchema = new mongoose.Schema(
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
      index: true,
    },

    shortDescription: {
      type: String,
      required: true,
      maxlength: 200,
    },

    image: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["frontend", "backend", "fullStack", "mobile", "other"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Building", "Completed", "Paused"],
      default: "Building",
    },

    technologies: {
      type: [String],
      default: [],
    },

    liveUrl: String,
    repoUrl: String,

    // 🔥 Freelance-related (OPTIONAL)
    isFreelance: {
      type: Boolean,
      default: false,
    },

    clientName: {
      type: String,
      trim: true,
    },

    clientLocation: String,

    clientIndustry: String,

    isClientPublic: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

projectSchema.pre("validate", function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
  }
  next()
})

export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema)
