"use client"

import { ProjectCard } from '@/components/projects/project-card'
import React, { useEffect, useState } from 'react'
import { getProjectsClient, type Project } from '@/utils/getProjects.client'
import { Loader2, Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const ProjectPage = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedTech, setSelectedTech] = useState<string[]>([])

  // Get unique values for filters
  const [types, setTypes] = useState<string[]>([])
  const [statuses, setStatuses] = useState<string[]>([])
  const [technologies, setTechnologies] = useState<string[]>([])

  useEffect(() => {
    const getProjectData = async () => {
      try {
        const data = await getProjectsClient()
        setProjects(data)
        setFilteredProjects(data)

        // Extract unique values for filters
        const uniqueTypes = [...new Set(data.map(p => p.type).filter(Boolean))]
        const uniqueStatuses = [...new Set(data.map(p => p.status).filter(Boolean))]
        const uniqueTechs = [...new Set(
          data.flatMap(p => p.techStack?.map(t => t.label) || [])
        )].sort()

        setTypes(uniqueTypes)
        setStatuses(uniqueStatuses)
        setTechnologies(uniqueTechs)
      } catch (err) {
        console.log("Failed to fetch projects:", err)
        setError("Failed to load projects. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    getProjectData()
  }, [])

  // Apply filters
  useEffect(() => {
    let filtered = [...projects]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        p =>
          p.title.toLowerCase().includes(query) ||
          p.shortDescription?.toLowerCase().includes(query) ||
          p.techStack?.some(t => t.label.toLowerCase().includes(query))
      )
    }

    // Type filter
    if (selectedType) {
      filtered = filtered.filter(p => p.type === selectedType)
    }

    // Status filter
    if (selectedStatus) {
      filtered = filtered.filter(p => p.status === selectedStatus)
    }

    // Technology filter
    if (selectedTech.length > 0) {
      filtered = filtered.filter(p =>
        selectedTech.every(tech =>
          p.techStack?.some(t => t.label === tech)
        )
      )
    }

    setFilteredProjects(filtered)
  }, [projects, searchQuery, selectedType, selectedStatus, selectedTech])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedType(null)
    setSelectedStatus(null)
    setSelectedTech([])
  }

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    (selectedType ? 1 : 0) +
    (selectedStatus ? 1 : 0) +
    selectedTech.length

  const toggleTech = (tech: string) => {
    setSelectedTech(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mt-5">
        <h1 className="text-4xl md:text-5xl text-center font-sans font-bold">
          Projects
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
          Discover a collection of my past and ongoing projects, showcasing my expertise in software development, design, and problem-solving.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-8 space-y-4">
        {/* Search and Filter Button Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="relative">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-2 rounded-full px-2 py-0.5 text-xs"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {/* Type Filter */}
              <DropdownMenuLabel>Type</DropdownMenuLabel>
              <div className="px-2 py-1.5 space-y-1">
                {types.map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={selectedType === type}
                    onCheckedChange={(checked) =>
                      setSelectedType(checked ? type : null)
                    }
                  >
                    {type}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>

              <DropdownMenuSeparator />

              {/* Status Filter */}
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <div className="px-2 py-1.5 space-y-1">
                {statuses.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={selectedStatus === status}
                    onCheckedChange={(checked) =>
                      setSelectedStatus(checked ? status : null)
                    }
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>

              <DropdownMenuSeparator />

              {/* Technology Filter */}
              <DropdownMenuLabel>Technology</DropdownMenuLabel>
              <div className="px-2 py-1.5 max-h-64 overflow-y-auto space-y-1">
                {technologies.map((tech) => (
                  <DropdownMenuCheckboxItem
                    key={tech}
                    checked={selectedTech.includes(tech)}
                    onCheckedChange={() => toggleTech(tech)}
                  >
                    {tech}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-muted-foreground"
            >
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                Search: {searchQuery}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setSearchQuery('')}
                />
              </Badge>
            )}
            {selectedType && (
              <Badge variant="secondary" className="gap-1">
                Type: {selectedType}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setSelectedType(null)}
                />
              </Badge>
            )}
            {selectedStatus && (
              <Badge variant="secondary" className="gap-1">
                Status: {selectedStatus}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => setSelectedStatus(null)}
                />
              </Badge>
            )}
            {selectedTech.map((tech) => (
              <Badge key={tech} variant="secondary" className="gap-1">
                {tech}
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="ml-1 rounded-full hover:bg-muted"
                  aria-label="Remove search filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} found
          {activeFiltersCount > 0 && ` (${projects.length} total)`}
        </div>
      </div>

      {/* Projects Grid */}
      {error ? (
        <div className="text-center py-20">
          <p className="text-destructive text-lg">{error}</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            {activeFiltersCount > 0
              ? 'No projects match your filters.'
              : 'No projects available yet.'}
          </p>
          {activeFiltersCount > 0 && (
            <Button
              variant="outline"
              className="mt-4"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          )}
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectPage