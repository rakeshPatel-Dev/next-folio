// source.config.ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { z } from "zod";
var blogSchema = z.object({
  title: z.string().default(""),
  description: z.string().default(""),
  slug: z.string().optional(),
  tags: z.array(z.string()).default([]),
  author: z.string().default("Rakesh Patel"),
  date: z.union([z.string(), z.date()]).optional(),
  coverImage: z.string().default(""),
  status: z.enum(["draft", "published"]).default("draft"),
  isFeatured: z.boolean().default(false),
  publishedAt: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
});
var projectSchema = z.object({
  title: z.string().default(""),
  description: z.string().optional(),
  shortDescription: z.string().default(""),
  longDescription: z.string().optional(),
  slug: z.string().default(""),
  image: z.string().default(""),
  imagePublicId: z.string().default(""),
  type: z.string().default(""),
  status: z.string().default(""),
  category: z.string().optional(),
  year: z.string().optional(),
  videoUrl: z.string().optional(),
  isFreelance: z.boolean().default(false),
  isClientPublic: z.boolean().default(true),
  clientName: z.string().optional(),
  clientLocation: z.string().optional(),
  clientIndustry: z.string().optional(),
  liveUrl: z.string().optional(),
  repoUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  createdAt: z.string().default("1970-01-01T00:00:00.000Z"),
  updatedAt: z.string().default("1970-01-01T00:00:00.000Z"),
  techStack: z.array(z.object({ label: z.string(), icon: z.string().optional() })).default([])
});
var { docs, meta } = defineDocs({
  dir: "content/blogs",
  docs: { schema: blogSchema }
});
var { docs: caseStudies, meta: caseStudiesMeta } = defineDocs({
  dir: "content/case-studies"
});
var { docs: projects, meta: projectsMeta } = defineDocs({
  dir: "content/projects",
  docs: { schema: projectSchema }
});
var source_config_default = defineConfig({
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: []
  }
});
export {
  caseStudies,
  caseStudiesMeta,
  source_config_default as default,
  docs,
  meta,
  projects,
  projectsMeta
};
