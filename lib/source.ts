// lib/source.ts
import { docs } from '@/.source/source.config.mjs'

// Helper to generate slug from title
function titleToSlug(title: string): string {
  return title
    ?.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '') || ''
}

export const source = {
  getPage(slug?: string[]) {
    if (!slug || slug.length === 0) {
      return docs[0] ? {
        data: {
          title: docs[0].title,
          description: docs[0].description,
          body: docs[0].body,
          toc: docs[0].toc,
          full: false,
        }
      } : null
    }

    const targetSlug = slug.join('/')
    const page = docs.find((doc: any) => titleToSlug(doc.title) === targetSlug)

    if (!page) return null

    return {
      data: {
        title: page.title,
        description: page.description,
        body: page.body,
        toc: page.toc,
        full: false,
      },
      url: `/docs/${targetSlug}`,
    }
  },

  generateParams() {
    return docs.map((doc: any) => ({
      slug: [titleToSlug(doc.title)],
    }))
  },

  getPageTree() {
    return {
      name: 'Documentation',
      children: docs.map((doc: any) => ({
        type: 'page',
        name: doc.title,
        url: `/docs/${titleToSlug(doc.title)}`,
      })),
    }
  },
}