import { caseStudies } from '@/.source/server'

/** Get slug from a doc (filename without .mdx is the canonical slug, matching the project slug) */
function getDocSlug(doc: { info?: { path?: string }; slug?: string; title?: string }): string {
  if (doc.slug) return doc.slug
  if (doc.info?.path) return doc.info.path.replace(/\.mdx$/i, '')
  return (doc.title ?? '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '') || 'unknown'
}

/**
 * Get a single case study by slug.
 * Matches by: 1) frontmatter slug, 2) filename (info.path without .mdx), 3) title normalized.
 */
export function getCaseStudy(slug: string) {
  const docsArray = Array.isArray(caseStudies) ? caseStudies : []
  const found = docsArray.find((doc) => getDocSlug(doc) === slug)
  return found ?? null
}