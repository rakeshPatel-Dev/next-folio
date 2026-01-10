"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Edit, Eye, Link, Link2, Trash } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ProjectData {
  id: number;
  title: string;
  status: "Completed" | "Pending";
  date: string;
}

interface BlogData {
  id: number;
  title: string;
  category: string;
  date: string;
}

// Demo Data
const projects: ProjectData[] = [
  { id: 1, title: "Portfolio Website", status: "Completed", date: "2026-01-01" },
  { id: 2, title: "E-commerce App", status: "Pending", date: "2026-01-05" },
  { id: 3, title: "Blog Platform", status: "Completed", date: "2026-01-07" },
];

const blogs: BlogData[] = [
  { id: 1, title: "React Tips", category: "Web", date: "2026-01-02" },
  { id: 2, title: "Next.js Best Practices", category: "Web", date: "2026-01-06" },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className=" space-y-2 mb-4">

        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Quick overview of your projects and blogs. Upload, edit, or delete content.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <Card>
          <CardHeader>
            <CardTitle>Total Visitors</CardTitle>

          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p className="text-2xl font-bold">100,000</p>
            <Button
              variant="outline"
              size="sm"
              className="inline-flex items-center gap-1 mt-2"
            >
              <Eye /> View Site
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Projects</CardTitle>

          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p className="text-2xl font-bold">{projects.length}</p>
            <Button
              variant="outline"
              size="sm"
              className="inline-flex items-center gap-1 mt-2"
            >
              + Add Project <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Blogs</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p className="text-2xl font-bold">{blogs.length}</p>
            <Button
              variant="outline"
              size="sm"
              className="inline-flex items-center gap-1 mt-2"
            >
              + Add Blog <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Application</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12</p>
            <Button
              variant="outline"
              size="sm"
              className="inline-flex items-center gap-1 mt-2"
            >
              <Link2 /> check Email
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((proj) => (
                <TableRow key={proj.id}>
                  <TableCell>{proj.id}</TableCell>
                  <TableCell>{proj.title}</TableCell>
                  <TableCell
                    className={
                      proj.status === "Completed" ? "text-green-500" : "text-orange-500"
                    }
                  >
                    {proj.status}
                  </TableCell>
                  <TableCell>{proj.date}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Blogs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Blogs</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>{blog.id}</TableCell>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{blog.category}</TableCell>
                  <TableCell>{blog.date}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
