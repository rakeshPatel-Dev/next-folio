import { Plus, FolderKanban } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PROJECTS_METADATA } from "@/lib/metadata"
import { requireAdmin } from "@/lib/auth"
import { redirect } from "next/navigation"
import { ProjectTable } from "@/components/project/ProjectTable"
import { AppBreadcrumb } from "@/components/BreadCrumb"
import { getProjects } from "@/utils/getProjects"

export const metadata = PROJECTS_METADATA

interface PageProps {
  searchParams: Promise<{
    search?: string
    status?: string
    featured?: string
    sortBy?: string
    sortOrder?: string
  }>
}

export default async function AdminProjectPage({ searchParams }: PageProps) {
  const session = await requireAdmin()
  if (!session?.user) redirect("/login")

  const params = await searchParams
  const query: any = {
    sortBy: params.sortBy || "createdAt",
    sortOrder: (params.sortOrder as "asc" | "desc") || "desc",
  }
  if (params.status) query.status = params.status
  if (params.featured === "true") query.isFeatured = true
  if (params.search) query.search = params.search

  const projects = await getProjects(query)

  return (
    <div className="sm:p-6">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-muted-foreground">
          Manage projects and case studies. Each project has an MDX case study
          rendered on its detail page.
        </p>
        <span className="mt-4">
          <AppBreadcrumb
            items={[
              { label: "dashboard", href: "/admin/dashboard" },
              { label: "project", href: "/admin/project" },
            ]}
          />
        </span>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FolderKanban className="h-5 w-5 text-muted-foreground" />
            All projects
          </CardTitle>
          <Button asChild>
            <Link href="/admin/project/add-project">
              <Plus className="h-4 w-4 mr-2" />
              Add project
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <ProjectTable projects={projects} />
        </CardContent>
      </Card>
    </div>
  )
}
