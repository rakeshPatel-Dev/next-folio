// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  caseStudies: create.doc("caseStudies", {"academix.mdx": () => import("../content/case-studies/academix.mdx?collection=caseStudies"), "image-toolkit.mdx": () => import("../content/case-studies/image-toolkit.mdx?collection=caseStudies"), "ishirablecom.mdx": () => import("../content/case-studies/ishirablecom.mdx?collection=caseStudies"), "moody-musik.mdx": () => import("../content/case-studies/moody-musik.mdx?collection=caseStudies"), "otrack.mdx": () => import("../content/case-studies/otrack.mdx?collection=caseStudies"), }),
  docs: create.doc("docs", {"ai-built-my-react-app.mdx": () => import("../content/blogs/ai-built-my-react-app.mdx?collection=docs"), "ai-first-development-and-agentic-workflows.mdx": () => import("../content/blogs/ai-first-development-and-agentic-workflows.mdx?collection=docs"), "imposter-syndrome-reflections.mdx": () => import("../content/blogs/imposter-syndrome-reflections.mdx?collection=docs"), "the-god-of-ai-in-2026-why-anthropic-is-so-hard-to-ignore.mdx": () => import("../content/blogs/the-god-of-ai-in-2026-why-anthropic-is-so-hard-to-ignore.mdx?collection=docs"), "the-market-dominance-of-mern-in-2026.mdx": () => import("../content/blogs/the-market-dominance-of-mern-in-2026.mdx?collection=docs"), }),
  projects: create.doc("projects", {"academix.mdx": () => import("../content/projects/academix.mdx?collection=projects"), "cinebook.mdx": () => import("../content/projects/cinebook.mdx?collection=projects"), "image-toolkit.mdx": () => import("../content/projects/image-toolkit.mdx?collection=projects"), "ishirablecom.mdx": () => import("../content/projects/ishirablecom.mdx?collection=projects"), "moody-musik.mdx": () => import("../content/projects/moody-musik.mdx?collection=projects"), "otrack.mdx": () => import("../content/projects/otrack.mdx?collection=projects"), "solodesk.mdx": () => import("../content/projects/solodesk.mdx?collection=projects"), }),
};
export default browserCollections;