// source.config.ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
var { docs, meta } = defineDocs({
  dir: "content/blogs"
});
var { docs: caseStudies, meta: caseStudiesMeta } = defineDocs({
  dir: "content/case-studies"
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
  meta
};
