import type { FC } from 'react'
import { docs } from '@/.source/server'

type BlogDoc = {
  slug?: string
  title?: string
  description?: string
  info?: { path?: string }
  tags?: string[]
  author?: string
  date?: string | Date
  coverImage?: string
  status?: string
  isFeatured?: boolean
  publishedAt?: string
  createdAt?: string
  updatedAt?: string
  body?: FC<{ components?: Record<string, unknown> }> | null
  toc?: Array<{ title?: unknown; url: string; depth: number }>
}

export type BlogPost = {
  _id: string
  title: string
  slug: string
  description: string
  coverImage: string
  tags: string[]
  author: {
    name: string
  }
  status: 'draft' | 'published'
  isFeatured: boolean
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  /** Compiled MDX content */
  body: FC<{ components?: Record<string, unknown> }> | null
  toc: Array<{ title?: unknown; url: string; depth: number }>
}

/** Get slug from a doc (filename without .mdx is the canonical slug) */
function getDocSlug(doc: { info?: { path?: string }; slug?: string; title?: string }): string {
  if (doc.slug) return doc.slug
  if (doc.info?.path) return doc.info.path.replace(/\.mdx$/i, '')
  return (doc.title ?? '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '') || 'unknown'
}

function serializeBlog(doc: BlogDoc): BlogPost {
  const date = new Date(doc.date ?? '')
  const fallbackDate = isNaN(date.getTime()) ? null : date.toISOString()
  return {
    _id: doc.slug || getDocSlug(doc),
    title: doc.title ?? '',
    slug: doc.slug || getDocSlug(doc),
    description: doc.description ?? '',
    coverImage: doc.coverImage ?? '',
    tags: Array.isArray(doc.tags) ? doc.tags : [],
    author: {
      name: doc.author || 'Rakesh Patel',
    },
    status: doc.status === 'published' ? 'published' : 'draft',
    isFeatured: !!doc.isFeatured,
    publishedAt: doc.publishedAt ?? fallbackDate,
    createdAt: doc.createdAt ?? fallbackDate ?? '',
    updatedAt: doc.updatedAt ?? fallbackDate ?? '',
    body: doc.body ?? null,
    toc: doc.toc ?? [],
  }
}

function getAllDocs() {
  return (Array.isArray(docs) ? docs : []) as BlogDoc[]
}

/** All published blog posts, newest first */
export function getPublishedBlogPosts(): BlogPost[] {
  return getAllDocs()
    .map(serializeBlog)
    .filter((blog) => blog.status === 'published')
    .sort(
      (a, b) =>
        new Date(b.publishedAt || b.createdAt || 0).getTime() -
        new Date(a.publishedAt || a.createdAt || 0).getTime()
    )
}

export function getBlogSlugs(): string[] {
  return getPublishedBlogPosts().map((b) => b.slug)
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  return getPublishedBlogPosts().find((b) => b.slug === slug) ?? null
}

export function getFeaturedBlogs(limit: number = 3): BlogPost[] {
  return getPublishedBlogPosts().filter((b) => b.isFeatured).slice(0, limit)
}

export function getLatestBlogs(limit: number = 10): BlogPost[] {
  return getPublishedBlogPosts().slice(0, limit)
}

/** Related blogs sharing tags, excluding current, filled with latest */
export function getRelatedBlogs(currentSlug: string, limit: number = 3): BlogPost[] {
  const all = getPublishedBlogPosts()
  const current = all.find((b) => b.slug === currentSlug)
  if (!current) return []

  const related = all.filter((b) => {
    if (b.slug === currentSlug) return false
    return current.tags.some((tag) => b.tags.includes(tag))
  })

  const remaining = all.filter((b) => b.slug !== currentSlug && !related.some((r) => r.slug === b.slug))
  return [...related, ...remaining].slice(0, limit)
}
