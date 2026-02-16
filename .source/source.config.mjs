// source.config.ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
var { docs, meta } = defineDocs({
  dir: "content/blogs"
});
var source_config_default = defineConfig({
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: []
  }
});
export {
  source_config_default as default,
  docs,
  meta
};
