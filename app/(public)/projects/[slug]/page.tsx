import { getProjectBySlug, getRelatedProjects } from '@/utils/getProjects.server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  const url = `${siteConfig.url}/projects/${project.slug}`

  return {
    title: project.title,
    description: project.shortDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      url: url,
      type: "article",
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.shortDescription,
      images: [project.image],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params

  // Get project directly from database
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  // Get related projects
  const relatedProjects = await getRelatedProjects(project._id, 3)

  return (
    <article className="min-h-screen">
      {/* Back Button */}
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>
      </div>

      {/* Hero */}
      <section className="relative w-full h-[60vh] min-h-[500px] mb-16">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-6 pb-12">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {project.shortDescription}
              </p>
              <div className="flex gap-4">
                {project.liveUrl && (
                  <Button asChild size="lg">
                    <Link href={project.liveUrl} target="_blank">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      View Live
                    </Link>
                  </Button>
                )}
                {(project.repoUrl || project.githubUrl) && (
                  <Button asChild variant="outline" size="lg">
                    <Link href={project.repoUrl || project.githubUrl || '#'} target="_blank">
                      <Github className="mr-2 h-5 w-5" />
                      Source Code
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>Overview</h2>
          <p>{project.longDescription || project.shortDescription}</p>

          <h2>Tech Stack</h2>
          <div className="flex flex-wrap gap-2 not-prose">
            {project.techStack?.map((tech) => (
              <span key={tech.label} className="px-3 py-1 bg-primary/10 rounded-md text-sm">
                {tech.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-16 border-t pt-16">
          <h2 className="text-3xl font-bold mb-8">Related Projects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProjects.map((related) => (
              <Link
                key={related._id}
                href={`/projects/${related.slug}`}
                className="group"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <Image
                    src={related.image}
                    alt={related.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="font-semibold group-hover:text-primary">
                  {related.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {related.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}