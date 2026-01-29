import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Link2, Plus, Trash } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { DASHBOARD_METADATA } from "@/lib/metadata";

export const metadata = DASHBOARD_METADATA;

interface StatsCardProps {
  title: string;
  value: string | number;
  buttonText: string;
  buttonIcon: React.ReactNode;
  link?: string;
}
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

const cardStats: StatsCardProps[] = [
  { title: "Total Visitors", value: 100000, buttonText: "View Site", buttonIcon: <Eye />, link: "/" },
  { title: "Total Projects", value: 10, buttonText: "Add Project", buttonIcon: <Plus />, link: "/admin/projects/add-project" },
  { title: "Total Blog", value: 5, buttonText: "Add Blog", buttonIcon: <Plus />, link: "/admin/blog/add-blog" },
  { title: "Total Inquiries", value: 2, buttonText: "View Email", buttonIcon: <Link2 />, link: "/" },
]

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
    <div className=" sm:p-6 space-y-6">
      <div className=" space-y-2 mb-4">

        <h1 className="text-3xl font-bold">Welcom, Rakesh</h1>
        <p className="text-muted-foreground mb-8">
          Quick overview of your projects and blogs. Upload, edit, or delete content.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader>
              <CardTitle>{stat.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <p className="text-2xl font-bold">{stat.value}</p>
              {stat.link && (
                <Link href={stat.link} className=" flex items-center flex-row gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full cursor-pointer "
                  >
                    {stat.buttonIcon}
                    {stat.buttonText}
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
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
