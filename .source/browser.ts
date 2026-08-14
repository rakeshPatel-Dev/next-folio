// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  caseStudies: create.doc("caseStudies", {"academix.mdx": () => import("../content/case-studies/academix.mdx?collection=caseStudies"), "ghardailo-track.mdx": () => import("../content/case-studies/ghardailo-track.mdx?collection=caseStudies"), "image-toolkit.mdx": () => import("../content/case-studies/image-toolkit.mdx?collection=caseStudies"), "ishirablecom.mdx": () => import("../content/case-studies/ishirablecom.mdx?collection=caseStudies"), "moody-musik.mdx": () => import("../content/case-studies/moody-musik.mdx?collection=caseStudies"), }),
  docs: create.doc("docs", {"ai-first-development-and-agentic-workflows.mdx": () => import("../content/blogs/ai-first-development-and-agentic-workflows.mdx?collection=docs"), "getting-started-with-nextjs-15.mdx": () => import("../content/blogs/getting-started-with-nextjs-15.mdx?collection=docs"), "getting-started-with-nextjs.mdx": () => import("../content/blogs/getting-started-with-nextjs.mdx?collection=docs"), "imposter-syndrome-reflections.mdx": () => import("../content/blogs/imposter-syndrome-reflections.mdx?collection=docs"), "the-god-of-ai-in-2026-why-anthropic-leads-the-intelligence-race.mdx": () => import("../content/blogs/the-god-of-ai-in-2026-why-anthropic-leads-the-intelligence-race.mdx?collection=docs"), "the-market-dominance-of-mern-in-2026.mdx": () => import("../content/blogs/the-market-dominance-of-mern-in-2026.mdx?collection=docs"), }),
};
export default browserCollections;