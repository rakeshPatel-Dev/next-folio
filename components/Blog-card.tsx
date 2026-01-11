"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export interface BlogCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle: string;
  image: string;
  category: string;
  readingTime: string;
  date: string;
  link: string;
  variant?: "featured" | "default"; // New variant prop
}

const BlogCard = React.forwardRef<HTMLDivElement, BlogCardProps>(
  ({
    title,
    subtitle,
    image,
    category,
    readingTime,
    date,
    link,
    variant = "default",
    className,
    ...props
  }, ref) => {
    // Layout classes based on variant
    const layoutClasses =
      variant === "featured"
        ? "flex flex-col md:flex-row"
        : "flex flex-col";

    const imageWrapperClasses =
      variant === "featured"
        ? "relative w-full md:w-1/2 aspect-video md:aspect-auto overflow-hidden"
        : "relative aspect-video overflow-hidden";

    const contentClasses =
      variant === "featured"
        ? "flex flex-1 flex-col p-6 md:p-8 justify-between"
        : "flex flex-1 flex-col p-6";

    return (
      <Link
        href={link}
        className={cn(
          "group relative cursor-pointer overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl",
          layoutClasses,
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Image */}
        <div className={imageWrapperClasses}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            placeholder="blur"
            blurDataURL={image}
          />
        </div>

        {/* Content */}
        <div className={contentClasses}>
          <div>
            <div className="flex items-center justify-between">

              {/* Category */}
              <span className="inline-block mb-2 px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary">
                {category}
              </span>
              {/* Variant Badge */}
              {variant === "featured" && (

                <Badge variant="default" className="bg-yellow-600"><Star />{variant}</Badge>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-semibold transition-colors duration-300 group-hover:text-primary">
              {title}
            </h3>

            {/* Subtitle */}
            <p className="mt-2 md:mt-3 text-muted-foreground">{subtitle}</p>
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>{readingTime}</span>
            <span>{date}</span>
          </div>

          {/* CTA */}
          <div className="w-full flex justify-end mt-4">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-muted-foreground transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Read More
              <ArrowUpRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Link>
    );
  }
);

BlogCard.displayName = "BlogCard";
export { BlogCard };
