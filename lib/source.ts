// lib/source.ts
import { docs } from '@/.source/source.config.mjs'

type DocEntry = { title: string; description?: string; body: unknown; toc: unknown }
function toDocsList(): DocEntry[] {
  try {
    if (Array.isArray(docs)) return docs as DocEntry[]
    const d = docs as unknown
    if (d && typeof (d as { [Symbol.iterator]: unknown })[Symbol.iterator] === 'function')
      return Array.from(d as Iterable<DocEntry>)
    if (d && typeof d === 'object')
      return Object.values(d as Record<string, DocEntry>).filter((x): x is DocEntry => x != null && typeof x === 'object' && 'title' in x)
  } catch {
    // ignore
  }
  return []
}
const docsList: DocEntry[] = toDocsList()

// Helper to generate slug from title
function titleToSlug(title: string): string {
  return title
    ?.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '') || ''
}

export const source = {
  getPages(_language?: string) {
    const list = toDocsList()
    if (!Array.isArray(list) || typeof list.map !== 'function') return []
    return list.map((doc) => ({
      url: `/docs/${titleToSlug(doc.title)}`,
      path: `/docs/${titleToSlug(doc.title)}`,
      locale: undefined,
      data: {
        title: doc.title,
        description: doc.description,
        body: doc.body,
        toc: doc.toc,
        structuredData: { contents: [] },
      },
      id: titleToSlug(doc.title),
      title: doc.title,
      description: doc.description,
      breadcrumbs: [],
      content: typeof doc.body === 'string' ? doc.body : '',
      keywords: [],
    }))
  },
  getPage(slug?: string[]) {
    if (!slug || slug.length === 0) {
      return docsList[0] ? {
        data: {
          title: docsList[0].title,
          description: docsList[0].description,
          body: docsList[0].body,
          toc: docsList[0].toc,
          full: false,
        }
      } : null
    }

    const targetSlug = slug.join('/')
    const page = docsList.find((doc) => titleToSlug(doc.title) === targetSlug)

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
    return docsList.map((doc) => ({
      slug: [titleToSlug(doc.title)],
    }))
  },

  getPageTree(_locale?: string) {
    return {
      name: 'Documentation',
      children: docsList.map((doc) => ({
        type: 'page',
        name: doc.title,
        url: `/docs/${titleToSlug(doc.title)}`,
      })),
    }
  },
}