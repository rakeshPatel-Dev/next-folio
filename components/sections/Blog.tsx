"use client";

import { blogData } from "@/data/blogData";
import { BlogCard } from "@/components/Blog-card";

interface BlogSectionProps {
  featuredCount?: number; // how many featured cards
  showCount?: number; // total number of blogs to show
}

export default function BlogSection({
  featuredCount = 1,
  showCount = 3, // default show only 3
}: BlogSectionProps) {
  // Slice the data to limit how many blogs to show
  const displayedBlogs = blogData.slice(0, showCount);

  return (
    <section className="grid gap-8">
      <h1 className="text-2xl mt-20 font-sans font-semibold tracking-tight">
        Projects
      </h1>
      {/* Featured card(s) */}
      {displayedBlogs.slice(0, featuredCount).map((blog, idx) => (
        <BlogCard
          key={idx}
          {...blog}
          variant="featured"
          className="col-span-full w-full lg:h-100"
        />
      ))}

      {/* Default cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {displayedBlogs.slice(featuredCount).map((blog, idx) => (
          <BlogCard key={idx} {...blog} variant="default" />
        ))}
      </div>
    </section>
  );
}
