import { defineConfig, defineDocs } from 'fumadocs-mdx/config'

export const { docs, meta } = defineDocs({
  dir: 'content/blogs',
})

export const { docs: caseStudies, meta: caseStudiesMeta } = defineDocs({
  dir: 'content/case-studies',
})

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})