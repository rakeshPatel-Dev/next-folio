// @ts-nocheck
import * as __fd_glob_3 from "../content/blogs/the-market-dominance-of-mern-in-2026.mdx?collection=docs"
import * as __fd_glob_2 from "../content/blogs/getting-started-with-nextjs.mdx?collection=docs"
import * as __fd_glob_1 from "../content/blogs/getting-started-with-nextjs-15.mdx?collection=docs"
import * as __fd_glob_0 from "../content/blogs/ai-first-development-and-agentic-workflows.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.doc("docs", "content/blogs", {"ai-first-development-and-agentic-workflows.mdx": __fd_glob_0, "getting-started-with-nextjs-15.mdx": __fd_glob_1, "getting-started-with-nextjs.mdx": __fd_glob_2, "the-market-dominance-of-mern-in-2026.mdx": __fd_glob_3, });

export const meta = await create.meta("meta", "content/blogs", {});