import { defineConfig, defineDocs } from 'fumadocs-mdx/config'

export const { docs, meta } = defineDocs({
  dir: 'content/blogs',
})

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})