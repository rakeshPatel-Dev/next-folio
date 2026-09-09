// @ts-nocheck
import * as __fd_glob_16 from "../content/projects/solodesk.mdx?collection=projects"
import * as __fd_glob_15 from "../content/projects/moody-musik.mdx?collection=projects"
import * as __fd_glob_14 from "../content/projects/ishirablecom.mdx?collection=projects"
import * as __fd_glob_13 from "../content/projects/image-toolkit.mdx?collection=projects"
import * as __fd_glob_12 from "../content/projects/ghardailo-track.mdx?collection=projects"
import * as __fd_glob_11 from "../content/projects/cinebook.mdx?collection=projects"
import * as __fd_glob_10 from "../content/projects/academix.mdx?collection=projects"
import * as __fd_glob_9 from "../content/blogs/the-market-dominance-of-mern-in-2026.mdx?collection=docs"
import * as __fd_glob_8 from "../content/blogs/the-god-of-ai-in-2026-why-anthropic-leads-the-intelligence-race.mdx?collection=docs"
import * as __fd_glob_7 from "../content/blogs/imposter-syndrome-reflections.mdx?collection=docs"
import * as __fd_glob_6 from "../content/blogs/getting-started-with-nextjs-15.mdx?collection=docs"
import * as __fd_glob_5 from "../content/blogs/ai-first-development-and-agentic-workflows.mdx?collection=docs"
import * as __fd_glob_4 from "../content/case-studies/moody-musik.mdx?collection=caseStudies"
import * as __fd_glob_3 from "../content/case-studies/ishirablecom.mdx?collection=caseStudies"
import * as __fd_glob_2 from "../content/case-studies/image-toolkit.mdx?collection=caseStudies"
import * as __fd_glob_1 from "../content/case-studies/ghardailo-track.mdx?collection=caseStudies"
import * as __fd_glob_0 from "../content/case-studies/academix.mdx?collection=caseStudies"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const caseStudies = await create.doc("caseStudies", "content/case-studies", {"academix.mdx": __fd_glob_0, "ghardailo-track.mdx": __fd_glob_1, "image-toolkit.mdx": __fd_glob_2, "ishirablecom.mdx": __fd_glob_3, "moody-musik.mdx": __fd_glob_4, });

export const caseStudiesMeta = await create.meta("caseStudiesMeta", "content/case-studies", {});

export const docs = await create.doc("docs", "content/blogs", {"ai-first-development-and-agentic-workflows.mdx": __fd_glob_5, "getting-started-with-nextjs-15.mdx": __fd_glob_6, "imposter-syndrome-reflections.mdx": __fd_glob_7, "the-god-of-ai-in-2026-why-anthropic-leads-the-intelligence-race.mdx": __fd_glob_8, "the-market-dominance-of-mern-in-2026.mdx": __fd_glob_9, });

export const meta = await create.meta("meta", "content/blogs", {});

export const projects = await create.doc("projects", "content/projects", {"academix.mdx": __fd_glob_10, "cinebook.mdx": __fd_glob_11, "ghardailo-track.mdx": __fd_glob_12, "image-toolkit.mdx": __fd_glob_13, "ishirablecom.mdx": __fd_glob_14, "moody-musik.mdx": __fd_glob_15, "solodesk.mdx": __fd_glob_16, });

export const projectsMeta = await create.meta("projectsMeta", "content/projects", {});