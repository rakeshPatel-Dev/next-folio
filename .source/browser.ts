// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  caseStudies: create.doc("caseStudies", {"academix.mdx": () => import("../content/case-studies/academix.mdx?collection=caseStudies"), "ishirablecom.mdx": () => import("../content/case-studies/ishirablecom.mdx?collection=caseStudies"), "ledg-smart-spend.mdx": () => import("../content/case-studies/ledg-smart-spend.mdx?collection=caseStudies"), "otrack.mdx": () => import("../content/case-studies/otrack.mdx?collection=caseStudies"), "snaphost.mdx": () => import("../content/case-studies/snaphost.mdx?collection=caseStudies"), }),
  docs: create.doc("docs", {"ai-built-my-react-app.mdx": () => import("../content/blogs/ai-built-my-react-app.mdx?collection=docs"), "ai-first-development-and-agentic-workflows.mdx": () => import("../content/blogs/ai-first-development-and-agentic-workflows.mdx?collection=docs"), "imposter-syndrome-reflections.mdx": () => import("../content/blogs/imposter-syndrome-reflections.mdx?collection=docs"), "the-god-of-ai-in-2026-why-anthropic-is-so-hard-to-ignore.mdx": () => import("../content/blogs/the-god-of-ai-in-2026-why-anthropic-is-so-hard-to-ignore.mdx?collection=docs"), "the-market-dominance-of-mern-in-2026.mdx": () => import("../content/blogs/the-market-dominance-of-mern-in-2026.mdx?collection=docs"), }),
  projects: create.doc("projects", {"academix.mdx": () => import("../content/projects/academix.mdx?collection=projects"), "ishirablecom.mdx": () => import("../content/projects/ishirablecom.mdx?collection=projects"), "ledg-smart-spend.mdx": () => import("../content/projects/ledg-smart-spend.mdx?collection=projects"), "otrack.mdx": () => import("../content/projects/otrack.mdx?collection=projects"), "snaphost.mdx": () => import("../content/projects/snaphost.mdx?collection=projects"), }),
};
export default browserCollections;