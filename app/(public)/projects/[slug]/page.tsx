import { getProjectBySlug, getRelatedProjects, getProjects, type ProjectType } from '@/lib/projectSource'
import { getCaseStudy } from '@/lib/caseStudySource'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Dot, ExternalLink, Github } from 'lucide-react'
import { CtaButton } from '@/components/ui/cta-button'
import { ExpandIcon } from '@/components/ui/expand-icon'
import { DynamicIslandTOC } from '@/components/ui/dynamic-island-toc'
import { ProjectCard } from '@/components/projects/project-card'
import { FlowSteps } from '@/components/sections/case-study/flow-steps'
import { ArchitectureDiagram } from '@/components/sections/case-study/architecture-diagram'
import { Callout } from '@/components/sections/case-study/callout'
import { Badge } from '@/components/ui/badge'
import IconRenderer from '@/components/ui/IconRenderer'
import { getIconColors } from '@/lib/icon-map'
import { Metadata } from 'next'
import { canonicalUrl, siteConfig } from '@/lib/site-config'
import { BreadcrumbJsonLd } from '@/components/sections/BreadcrumbJsonLd'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-lg text-muted-foreground leading-relaxed not-prose mb-6">
      {children}
    </div>
  )
}

export function generateStaticParams() {
  const projects = getProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return { title: 'Project Not Found' }
  }

  const url = `${siteConfig.url}/projects/${project.slug}`
  const socialTitle = `${project.title} | ${siteConfig.name}`

  return {
    title: project.title,
    description: project.shortDescription,
    keywords: project.techStack?.map((t) => t.label) ?? [],
    alternates: { canonical: canonicalUrl(`/projects/${project.slug}`) },
    openGraph: {
      title: socialTitle,
      description: project.shortDescription,
      url,
      type: 'article',
      images: [{ url: project.image, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: project.shortDescription,
      images: [project.image],
    },
  }
}

const PROGRAMMING_LANGUAGES = new Set([
  'TypeScript',
  'JavaScript',
  'Python',
  'Java',
  'Go',
  'Rust',
  'C++',
  'C#',
  'PHP',
  'Ruby',
  'Swift',
  'Kotlin',
])

/** Describe the project itself so it is a first-class entity, not just a page
 *  inside the sitewide Person/WebSite block. Every field is already in frontmatter. */
function projectSchema(project: ProjectType) {
  const canonical = `${siteConfig.url}/projects/${project.slug}`
  const languages = (project.techStack ?? [])
    .map((tech) => tech.label)
    .filter((label) => PROGRAMMING_LANGUAGES.has(label))

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': canonical,
    name: project.title,
    description: project.shortDescription || project.longDescription,
    url: project.liveUrl || canonical,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    ...(project.image ? { image: project.image } : {}),
    ...(project.createdAt ? { dateCreated: project.createdAt } : {}),
    ...(project.updatedAt ? { dateModified: project.updatedAt } : {}),
    ...(project.repoUrl ? { codeRepository: project.repoUrl } : {}),
    ...(languages.length ? { programmingLanguage: languages } : {}),
    ...(project.category ? { creativeWorkStatus: project.category } : {}),
    keywords: (project.techStack ?? []).map((tech) => tech.label).join(', '),
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params

  const project = getProjectBySlug(slug)

  if (!project || project.status === 'paused') {
    notFound()
  }

  const relatedProjects = getRelatedProjects(project.slug, 2)
  const caseStudy = getCaseStudy(slug)
  const CaseStudyContent = caseStudy?.body

  // Build the spec row items — only render what exists
  const specs = [
    project.role && { label: 'Role', value: project.role },
    project.timeline && { label: 'Timeline', value: project.timeline },
    project.year && { label: 'Year', value: project.year },
    project.category && { label: 'Category', value: project.category },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <article className="min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Projects', href: '/projects' },
          { name: project.title, href: `/projects/${project.slug}` },
        ]}
      />
      <DynamicIslandTOC selector="article h2, article h3, article h4" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema(project)) }}
      />
      <div className="mx-auto max-w-3xl">
        {/* Back link */}
        <div className="pt-8 pb-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Projects
          </Link>
        </div>

        {/* Header */}
        <header className="pb-8">
         

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-balance">
            {project.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-4">
            {project.status && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-2.5 py-0.5 text-xs font-medium capitalize">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${project.status === 'completed' || project.status === 'active'
                    ? 'bg-emerald-500'
                    : project.status === 'in-progress' || project.status === 'building'
                      ? 'bg-amber-500'
                      : 'bg-muted-foreground'
                    }`}
                />
                {project.status}
              </span>
            )}
            {project.year && <span><Dot className="text-muted-foreground"/> {project.year}</span>}
            {project.createdAt && (
              <>
                <span>
                  <Dot className="text-muted-foreground inline" />{" "}
                  {new Date(project.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </>
            )}
            {project.category && (
              <>
                <span> <Dot className="text-muted-foreground inline"/> {project.category}</span>
              </>
            )}
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <CtaButton
                href={project.liveUrl}
                external
                label="View Live"
                icon={ExternalLink}
              />
            )}
            {(project.repoUrl || project.githubUrl) && (
              <CtaButton
                variant="outline"
                href={project.repoUrl || project.githubUrl || '#'}
                external
                label="Source Code"
                icon={Github}
              />
            )}
          </div>
        </header>

        {/* Hero image — contained card */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/60 bg-muted mb-10">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Spec row */}
        {specs.length > 0 && (
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 py-6 border-y border-border/60 mb-10">
            {specs.map((spec) => (
              <div key={spec.label}>
                <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
                  {spec.label}
                </dt>
                <dd className="text-sm text-foreground">{spec.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* Tech stack chips */}
        {project.techStack && project.techStack.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => {
                const colors = getIconColors(tech.icon)
                return (
                  <ExpandIcon
                    key={tech.label}
                    label={tech.label}
                    color={colors.color}
                    colorDark={colors.colorDark}
                    size={35}
                    iconSize={19}
                    labelWidthClass={colors.labelWidth}
                    labelClassName="text-[15px]"
                    brandIconProps={
                      colors.iconColor ? { iconColor: colors.iconColor } : undefined
                    }
                    icon={<IconRenderer name={tech.icon} />}
                  />
                )
              })}
            </div>
          </section>
        )}

        {/* Case Study — the depth lives here */}
        {CaseStudyContent && (
          <section className="mt-12 pt-8 border-t border-border/60">
            <h2 className="text-2xl font-semibold tracking-tight mb-6">
              Case Study
            </h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:tracking-tight prose-headings:font-semibold prose-p:leading-relaxed prose-p:text-muted-foreground">
              <CaseStudyContent
              components={{
                Lead,
                FlowSteps,
                ArchitectureDiagram,
                Callout,
                Badge,
              }}
            />
            </div>
          </section>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="mt-12 py-10 border-t border-border/60">
            <h2 className="text-2xl font-semibold tracking-tight mb-8">
              Related Projects
            </h2>
            <div className="grid grid-cols-1">
              {relatedProjects.map((related) => (
                <ProjectCard key={related._id} project={related} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}