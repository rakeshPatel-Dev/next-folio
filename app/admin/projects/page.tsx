"use client"

import {
  Plus,
  Search,
  Folder,
  CheckCircle,
  FileEdit,
  Filter,
  ArrowUpDown,
  Pencil,
  Trash2,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import ProjectForm from "@/components/ProjectForm"
import { useState } from "react"
import Link from "next/link"

export default function AdminProjectsPage() {

  const [openForm, setOpenForm] = useState(false);


  const handleAddProject = () => {
    setOpenForm(true)
    return (
      <div>
        Add project
      </div>
    )
  }

  return (
    <main className="flex-1 overflow-y-auto p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Project Management
            </h1>
            <p className="text-muted-foreground">
              Manage your portfolio projects and case studies
            </p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search projects..." className="pl-9" />
            </div>
            <Link href="/admin/projects/add-project">
              <Button onClick={() => setOpenForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Project
              </Button>
            </Link>
          </div>
        </div>

        {/* {openForm && <ProjectForm path="/admin/projects" />} */}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Total Projects"
            value="12"
            description="+2 this month"
            icon={<Folder className="h-5 w-5" />}
          />
          <StatCard
            title="Published"
            value="8"
            description="Visible to public"
            icon={<CheckCircle className="h-5 w-5" />}
          />
          <StatCard
            title="Drafts"
            value="4"
            description="Work in progress"
            icon={<FileEdit className="h-5 w-5" />}
          />
        </div>

        {/* Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Projects</CardTitle>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost">
                <Filter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50">
                <tr className="text-muted-foreground">
                  <th className="px-6 py-3 text-left">Project</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Client</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {PROJECTS.map((project) => (
                  <tr
                    key={project.id}
                    className="group hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium">
                      {project.title}
                      <div className="text-xs text-muted-foreground">
                        {project.subtitle}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {project.category}
                    </td>

                    <td className="px-6 py-4">
                      {project.client}
                    </td>

                    <td className="px-6 py-4 text-muted-foreground">
                      {project.date}
                    </td>

                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          project.status === "Published"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {project.status}
                      </Badge>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition">
                        <Button size="icon" variant="ghost">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t px-6 py-3">
            <span className="text-sm text-muted-foreground">
              Showing 1–4 of 12 results
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" disabled>
                Previous
              </Button>
              <Button size="sm" variant="outline">
                Next
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}

/* ---------------- Reusable ---------------- */

function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardContent className="p-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>
          <p className="text-2xl font-bold">
            {value}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        </div>
        <div className="text-muted-foreground">
          {icon}
        </div>
      </CardContent>
    </Card>
  )
}

const PROJECTS = [
  {
    id: 1,
    title: "Fintech App Redesign",
    subtitle: "UI/UX Case Study",
    category: "Mobile App",
    client: "NovaBank",
    date: "Oct 24, 2023",
    status: "Published",
  },
  {
    id: 2,
    title: "E-commerce Dashboard",
    subtitle: "Admin Panel",
    category: "Web App",
    client: "Shoply",
    date: "Sep 12, 2023",
    status: "Draft",
  },
]
