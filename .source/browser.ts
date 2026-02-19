// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"ai-first-development-and-agentic-workflows.mdx": () => import("../content/blogs/ai-first-development-and-agentic-workflows.mdx?collection=docs"), "getting-started-with-nextjs-15.mdx": () => import("../content/blogs/getting-started-with-nextjs-15.mdx?collection=docs"), "getting-started-with-nextjs.mdx": () => import("../content/blogs/getting-started-with-nextjs.mdx?collection=docs"), "the-market-dominance-of-mern-in-2026.mdx": () => import("../content/blogs/the-market-dominance-of-mern-in-2026.mdx?collection=docs"), }),
};
export default browserCollections;