import { notFound } from "next/navigation"
import { getProjectPage, getProjectSlugs } from "@/lib/projectSource"
import {
  getProjectByIdOrSlug,
  getRelatedProjects,
} from "@/utils/getProjects"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  ArrowLeft,
  ExternalLink,
  Github,
  Layers,
  User,
  Briefcase,
} from "lucide-react"
import Link from "next/link"
import { ProjectCard } from "@/components/project/Project-card"

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const project = await getProjectByIdOrSlug(slug)
  if (!project) return { title: "Project not found" }
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.coverImage],
      type: "article",
      publishedTime: project.publishedAt || project.createdAt,
    },
  }
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params

  const mdxPage = getProjectPage(slug)
  const projectMeta = await getProjectByIdOrSlug(slug)

  if (!mdxPage || !projectMeta) notFound()

  const relatedProjects = await getRelatedProjects(projectMeta._id, 3)
  const MDXContent = mdxPage.body

  const links = projectMeta.links || {}
  const hasLinks =
    links.liveUrl || links.githubUrl || links.demoUrl

  return (
    <article className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>
      </div>

      <header className="max-w-4xl mx-auto px-6 pb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {projectMeta.category && (
            <Badge variant="secondary">{projectMeta.category}</Badge>
          )}
          {projectMeta.techStack?.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
          {projectMeta.isFeatured && (
            <Badge variant="default" className="bg-yellow-600">
              Featured
            </Badge>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {projectMeta.title}
        </h1>

        <p className="text-xl text-muted-foreground mb-6">
          {projectMeta.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {projectMeta.client && (
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span>{projectMeta.client}</span>
            </div>
          )}
          {projectMeta.role && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{projectMeta.role}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time
              dateTime={
                projectMeta.publishedAt || projectMeta.createdAt
              }
            >
              {new Date(
                projectMeta.publishedAt || projectMeta.createdAt
              ).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
        </div>

        {hasLinks && (
          <div className="flex flex-wrap gap-3 mt-6">
            {links.liveUrl && (
              <a
                href={links.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-background hover:bg-muted transition-colors text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                Live site
              </a>
            )}
            {links.githubUrl && (
              <a
                href={links.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-background hover:bg-muted transition-colors text-sm"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            )}
            {links.demoUrl && (
              <a
                href={links.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-background hover:bg-muted transition-colors text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                Demo
              </a>
            )}
          </div>
        )}
      </header>

      <div className="max-w-4xl mx-auto px-6 mb-12">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
          <Image
            src={projectMeta.coverImage}
            alt={projectMeta.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-6 pb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Layers className="h-6 w-6 text-muted-foreground" />
          Case study
        </h2>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MDXContent />
        </div>
      </section>

      {relatedProjects.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 py-12 border-t">
          <h2 className="text-2xl font-bold mb-8">Related projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((related) => (
              <ProjectCard
                key={related._id}
                title={related.title}
                subtitle={related.description}
                image={related.coverImage}
                category={related.category || "Project"}
                techStack={related.techStack}
                date={new Date(
                  related.publishedAt || related.createdAt
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                link={`/projects/${related.slug}`}
                variant="default"
              />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
