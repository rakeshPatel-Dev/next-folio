import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getProjects } from "@/lib/projectSource";
import { getPublishedBlogPosts } from "@/lib/blogSource";

function safeLastModified(value?: string): Date {
  if (!value) return new Date()
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? new Date() : date
}

function latest(values: (string | undefined)[]): Date | undefined {
  const stamps = values
    .map((value) => new Date(value ?? "").getTime())
    .filter((time) => !Number.isNaN(time))
  if (stamps.length === 0) return undefined
  return new Date(Math.max(...stamps))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Fetch dynamic routes from static content
  const projects = getProjects();
  const blogs = getPublishedBlogPosts();

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: safeLastModified(project.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: safeLastModified(blog.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const projectDates = projects.map((project) => project.updatedAt);
  const blogDates = blogs.map((blog) => blog.updatedAt);

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: latest([...projectDates, ...blogDates]),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: latest(projectDates),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latest(blogDates),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  return [...staticUrls, ...projectUrls, ...blogUrls];
}
