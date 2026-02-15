"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface BlogFiltersProps {
  currentUserId: string
  initialSearch?: string
  initialStatus?: string
  initialFeatured?: string
  initialTag?: string
}

export function BlogFilters({
  currentUserId,
  initialSearch = '',
  initialStatus = '',
  initialFeatured = '',
  initialTag = '',
}: BlogFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(initialSearch)
  const [status, setStatus] = useState(initialStatus)
  const [featured, setFeatured] = useState(initialFeatured)
  const [tag, setTag] = useState(initialTag)
  const [tags, setTags] = useState<string[]>([])

  // Fetch available tags
  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await fetch(`/api/blog/tags?userId=${currentUserId}`)
        const data = await response.json()
        if (data.success) {
          setTags(data.tags)
        }
      } catch (error) {
        console.error('Failed to fetch tags:', error)
      }
    }
    fetchTags()
  }, [currentUserId])

  // Update URL with filters
  const updateFilters = (newFilters: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    router.push(`/admin/blog?${params.toString()}`)
  }

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters({ search, status, featured, tag })
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  const handleStatusChange = (newStatus: string) => {
    const updatedStatus = status === newStatus ? '' : newStatus
    setStatus(updatedStatus)
    updateFilters({ search, status: updatedStatus, featured, tag })
  }

  const handleFeaturedChange = (newFeatured: string) => {
    const updatedFeatured = featured === newFeatured ? '' : newFeatured
    setFeatured(updatedFeatured)
    updateFilters({ search, status, featured: updatedFeatured, tag })
  }

  const handleTagChange = (newTag: string) => {
    const updatedTag = tag === newTag ? '' : newTag
    setTag(updatedTag)
    updateFilters({ search, status, featured, tag: updatedTag })
  }

  const activeFiltersCount = [status, featured, tag].filter(Boolean).length

  return (
    <>
      {/* Search Input */}
      <div className="relative flex-1 md:w-64">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search blogs..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filter Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Filter className="h-4 w-4" />
            {activeFiltersCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={status === 'published'}
            onCheckedChange={() => handleStatusChange('published')}
          >
            Published
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={status === 'draft'}
            onCheckedChange={() => handleStatusChange('draft')}
          >
            Draft
          </DropdownMenuCheckboxItem>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Filter by Featured</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={featured === 'true'}
            onCheckedChange={() => handleFeaturedChange('true')}
          >
            Featured Only
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={featured === 'false'}
            onCheckedChange={() => handleFeaturedChange('false')}
          >
            Not Featured
          </DropdownMenuCheckboxItem>

          {tags.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Filter by Tag</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-48 overflow-y-auto">
                {tags.map((tagItem) => (
                  <DropdownMenuCheckboxItem
                    key={tagItem}
                    checked={tag === tagItem}
                    onCheckedChange={() => handleTagChange(tagItem)}
                  >
                    {tagItem}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}