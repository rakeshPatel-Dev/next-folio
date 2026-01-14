import mongoose from "mongoose"

const caseStudySchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      unique: true, // one case study per project
    },

    problemStatement: {
      type: String,
      required: true,
    },

    solution: {
      type: String,
      required: true,
    },

    approach: {
      type: String,
    },

    challenges: {
      type: [String],
      default: [],
    },

    keyFeatures: {
      type: [String],
      default: [],
    },

    architecture: {
      type: String, // text or image URL
    },

    results: {
      type: String,
    },

    metrics: {
      type: Map,
      of: String, // e.g. "Performance": "+40%"
    },

    timeline: {
      type: String,
    },

    screenshots: [
      {
        url: String,
        caption: String,
      },
    ],

    seo: {
      title: String,
      description: String,
    },

    lessonsLearned: {
      type: String,
    },

    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

export default mongoose.models.CaseStudy ||
  mongoose.model("CaseStudy", caseStudySchema)