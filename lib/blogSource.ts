import type { FC } from 'react'
import { docs } from '@/.source/server'
import fs from 'fs'
import path from 'path'

/** Count words from raw MDX files at build time (server-only). */
function getRawWordCount(slug: string, fallbackText = ''): number {
  const countWords = (text: string) => {
    const matches = text.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? []
    return matches.length
  }

  const fallback = () => countWords(fallbackText)

  const filePath = path.join(process.cwd(), 'content', 'blogs', `${slug}.mdx`)
  try {
    if (!fs.existsSync(filePath)) return fallback()
    const raw = fs.readFileSync(filePath, 'utf-8')

    const content = raw
      .replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, '') // frontmatter
      .replace(/```[\s\S]*?```/g, ' ') // fenced code blocks
      .replace(/`[^`]*`/g, ' ') // inline code
      .replace(/^\s*>(?:\s|$)/gm, '') // blockquotes
      .replace(/^\s*(?:#{1,6})\s+/gm, '') // heading markers
      .replace(/^\s*(-{3,}|={3,}|\*{3,})\s*$/gm, ' ') // hr
      .replace(/^\s*(?:[-+*]|\d+[.)])\s+/gm, ' ') // list markers
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links (keep label)
      .replace(/<[^>]+>/g, ' ') // HTML tags

    const words = countWords(content)
    return words > 0 ? words : fallback()
  } catch {
    return fallback()
  }
}

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
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  /** Total word count of the article body (build-time, from raw MDX). */
  wordCount: number
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
  const slug = doc.slug || getDocSlug(doc)
  return {
    _id: slug,
    title: doc.title ?? '',
    slug,
    description: doc.description ?? '',
    coverImage: doc.coverImage ?? '',
    tags: Array.isArray(doc.tags) ? doc.tags : [],
    wordCount: getRawWordCount(slug, doc.description ?? ''),
    author: {
      name: doc.author || 'Rakesh Patel',
    },
    status: doc.status === 'published' ? 'published' : 'draft',
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
