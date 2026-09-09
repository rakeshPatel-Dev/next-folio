import { projects } from '@/.source/server'

type ProjectDoc = {
  slug?: string
  title?: string
  shortDescription?: string
  longDescription?: string
  image?: string
  imagePublicId?: string
  type?: string
  status?: string
  category?: string
  year?: string
  techStack?: Array<{ label?: string; icon?: string }>
  technologies?: string[]
  liveUrl?: string
  repoUrl?: string
  githubUrl?: string
  videoUrl?: string
  isFreelance?: boolean
  clientName?: string
  clientLocation?: string
  clientIndustry?: string
  isClientPublic?: boolean
  challenge?: string
  solution?: string
  createdAt?: string
  updatedAt?: string
  info?: { path?: string }
}

export type TechItem = {
  label: string
  icon?: string
}

export type ProjectType = {
  _id: string
  title: string
  shortDescription: string
  longDescription?: string
  image: string
  imagePublicId: string
  slug: string
  type: string
  status: string
  category?: string
  year?: string
  techStack: TechItem[]
  technologies?: string[]
  liveUrl?: string
  repoUrl?: string
  githubUrl?: string
  videoUrl?: string
  isFreelance: boolean
  clientName?: string
  clientLocation?: string
  clientIndustry?: string
  isClientPublic: boolean
  challenge?: string
  solution?: string
  features?: Array<{ title: string; description: string }> | string[]
  results?: Array<{ metric: string; description: string }>
  gallery?: string[]
  createdAt: string
  updatedAt: string
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

function serializeProject(doc: ProjectDoc): ProjectType {
  return {
    _id: doc.slug || getDocSlug(doc),
    title: doc.title ?? '',
    shortDescription: doc.shortDescription ?? '',
    longDescription: doc.longDescription ?? undefined,
    image: doc.image ?? '',
    imagePublicId: doc.imagePublicId ?? '',
    slug: doc.slug || getDocSlug(doc),
    type: doc.type ?? '',
    status: doc.status ?? '',
    category: doc.category,
    year: doc.year,
    techStack: Array.isArray(doc.techStack)
      ? doc.techStack
          .filter((t): t is { label: string; icon?: string } => Boolean(t.label))
          .map((t) => ({ label: t.label, icon: t.icon }))
      : [],
    technologies: doc.technologies,
    liveUrl: doc.liveUrl,
    repoUrl: doc.repoUrl,
    githubUrl: doc.githubUrl,
    videoUrl: doc.videoUrl,
    isFreelance: !!doc.isFreelance,
    clientName: doc.clientName,
    clientLocation: doc.clientLocation,
    clientIndustry: doc.clientIndustry,
    isClientPublic: !!doc.isClientPublic,
    createdAt: doc.createdAt ?? '',
    updatedAt: doc.updatedAt ?? '',
  }
}

export function getAllProjectDocs() {
  return (Array.isArray(projects) ? projects : []) as ProjectDoc[]
}

/** Public projects: excludes paused, sorted newest first */
export function getProjects(): ProjectType[] {
  return getAllProjectDocs()
    .filter((doc) => doc.status !== 'paused')
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    )
    .map(serializeProject)
}

export function getProjectSlugs(): string[] {
  return getProjects().map((p) => p.slug)
}

export function getProjectBySlug(slug: string): ProjectType | null {
  const project = getProjects().find((p) => p.slug === slug)
  return project ?? null
}

/** Related projects by shared type/category, excluding current, filled with latest */
export function getRelatedProjects(currentSlug: string, limit: number = 3): ProjectType[] {
  const all = getProjects()
  const current = all.find((p) => p.slug === currentSlug)
  if (!current) return []

  const related = all.filter((p) => {
    if (p.slug === currentSlug) return false
    return p.type === current.type || (p.category && p.category === current.category)
  })

  const remaining = all
    .filter((p) => p.slug !== currentSlug && !related.some((r) => r.slug === p.slug))
    .sort(
      (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    )

  return [...related, ...remaining].slice(0, limit)
}
