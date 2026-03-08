// Re-export client-side project utilities and types for use in client components
export {
  type Project,
  getProjectsClient,
  getProjectByIdClient,
  getProjectBySlug,
  getRelatedProjects,
  getFeaturedProjects,
  getProjectsByType,
  getProjectsByCategory,
  getProjectCategories,
  getProjectTypes,
  searchProjects,
  getProjectStats,
  updateProject,
  createProject,
  deleteProject,
} from "@/utils/getProjects.client"
