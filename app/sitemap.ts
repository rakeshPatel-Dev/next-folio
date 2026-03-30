import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getProjects } from "@/utils/getProjects.server";
import { getPublishedBlogs } from "@/utils/getBlogs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Fetch dynamic routes
  const [projects, blogs] = await Promise.all([
    getProjects(),
    getPublishedBlogs(),
  ]);

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  return [...staticUrls, ...projectUrls, ...blogUrls];
}
