"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

export interface BlogCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle: string;
  image: string;
  blurDataURL?: string;
  category: string;
  readingTime: string;
  date: string;
  link: string;
  variant?: "featured" | "default";
}

const BlogCard = React.forwardRef<HTMLDivElement, BlogCardProps>(
  ({
    title,
    subtitle,
    image,
    blurDataURL,
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
      <div
        className={cn(
          " relative overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl",
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
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            {...(blurDataURL && { placeholder: "blur", blurDataURL })}
          />
        </div>

        {/* Content */}
        <div className={contentClasses}>
          <div>
            <div className="flex items-center justify-between">
              {/* Category */}
              <span className="inline-block mb-2 px-3 py-1 text-xs font-medium rounded-full bg-background border-primary/20 uppercase border text-primary">
                {category}
              </span>
              {/* Variant Badge */}
              {variant === "featured" && (
                <Badge variant="default" className="bg-yellow-600 gap-1">
                  <Star className="h-3 w-3" />
                  Featured
                </Badge>
              )}
            </div>

            {/* Title */}
            <Link href={link}>
              <h3 className="text-xl hover:underline cursor-pointer md:text-2xl font-semibold transition-all  group-hover:text-primary line-clamp-2">
                {title}
              </h3>
            </Link>

            {/* Subtitle */}
            <p className="mt-2 md:mt-3 text-muted-foreground line-clamp-3">
              {subtitle}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>{readingTime}</span>
            <span>{date}</span>
          </div>

          {/* CTA */}
          <div className="w-full flex justify-end mt-4">
            <Link href={link}>
              <span
                className="inline-flex group items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-input bg-background/5 text-muted-foreground transition-all duration-300 hover:scale-105"
              >
                Read More
                <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:rotate-45 duration-100 transition-all" />
              </span>
            </Link>          </div>
        </div>
      </div>
    );
  }
);

BlogCard.displayName = "BlogCard";
export { BlogCard };