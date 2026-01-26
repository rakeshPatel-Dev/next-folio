"use client";

import { blogData } from "@/data/blogData";
import { BlogCard } from "@/components/Blog-card";

interface BlogSectionProps {
  featuredCount?: number; // how many featured cards
}

export default function BlogSection({
  featuredCount = 1,
}: BlogSectionProps) {

  return (
    <section className="grid max-w-4xl p-6 sm:p-10 mx-auto gap-8">
      <h1 className="text-2xl mt-20 font-sans font-semibold tracking-tight">
        Blogs
      </h1>
      {/* Featured card(s) */}
      {blogData.slice(0, featuredCount).map((blog, idx) => (
        <BlogCard
          key={idx}
          {...blog}
          variant="featured"
          className="col-span-full w-full lg:h-100"
        />
      ))}

      {/* Default cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {blogData.slice(featuredCount).map((blog, idx) => (
          <BlogCard key={idx} {...blog} variant="default" />
        ))}
      </div>
    </section>
  );
}
