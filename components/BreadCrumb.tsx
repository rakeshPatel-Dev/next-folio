"use client"

import Link from "next/link"
import { SlashIcon } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type BreadcrumbItemType = {
  label: string
  href?: string
}

type AppBreadcrumbProps = {
  items: BreadcrumbItemType[]
  separator?: React.ReactNode
}

export function AppBreadcrumb({
  items,
  separator = <SlashIcon className="h-4 w-4" />,
}: AppBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList >
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <div key={index} className="flex  items-center">
              <BreadcrumbItem>
                {item.href && !isLast ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}&ensp;</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <BreadcrumbSeparator>
                  {separator}
                </BreadcrumbSeparator>
              )}
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
