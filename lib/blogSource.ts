import { docs } from '@/.source/server'

/** Get slug from a doc (filename without .mdx is the canonical slug) */
function getDocSlug(doc: { info?: { path?: string }; slug?: string; title?: string }): string {
  if (doc.slug) return doc.slug
  if (doc.info?.path) return doc.info.path.replace(/\.mdx$/i, '')
  return (doc.title ?? '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '') || 'unknown'
}

/**
 * Get a single blog page by slug.
 * Matches by: 1) frontmatter slug, 2) filename (info.path without .mdx), 3) title normalized.
 */
export function getBlogPage(slug: string) {
  const docsArray = Array.isArray(docs) ? docs : []
  const found = docsArray.find((doc: any) => getDocSlug(doc) === slug)
  return found ?? null
}

/**
 * Get all blog pages
 */
export function getAllBlogPages() {
  return Array.isArray(docs) ? docs : []
}

/**
 * Get slugs for static generation (must match URL slugs, so use filename-based slug).
 */
export function getBlogSlugs(): string[] {
  return (Array.isArray(docs) ? docs : []).map((doc: any) => getDocSlug(doc))
}