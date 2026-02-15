import { connectDB } from '@/lib/mongoose'
import Blog from '@/models/blogModel'
import mongoose from 'mongoose'

export type BlogQuery = {
  status?: 'draft' | 'published'
  isFeatured?: boolean
  tag?: string
  tags?: string[]
  author?: string
  search?: string
  limit?: number
  skip?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export type BlogDocument = {
  _id: string
  title: string
  slug: string
  description: string
  coverImage: string
  tags: string[]
  author: {
    _id: string
    name: string
    email: string
    image?: string
  }
  status: 'draft' | 'published'
  isFeatured: boolean
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

/**
 * Serialize MongoDB document to plain object
 */
function serializeBlog(blog: any): BlogDocument {

    const author = blog.author || {};

  return {
    _id: blog._id.toString(),
    title: blog.title,
    slug: blog.slug,
    description: blog.description,
    coverImage: blog.coverImage,
    tags: blog.tags || [],
    author: {
      _id: author._id.toString() || '',
      name: author.name || 'Admin User',
      email: author.email || '',
      image: author.image,
    },
    status: blog.status,
    isFeatured: blog.isFeatured || false,
    publishedAt: blog.publishedAt ? blog.publishedAt.toISOString() : null,
    createdAt: blog.createdAt.toISOString(),
    updatedAt: blog.updatedAt.toISOString(),
  }
}

/**
 * Get all blogs with optional filters and pagination
 */
export async function getBlogs(query: BlogQuery = {}): Promise<BlogDocument[]> {
  await connectDB()

  const {
    status,
    isFeatured,
    tag,
    tags,
    author,
    search,
    limit,
    skip,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = query

  // Build MongoDB query
  const filter: any = {}

  if (status) {
    filter.status = status
  }

  if (isFeatured !== undefined) {
    filter.isFeatured = isFeatured
  }

  if (tag) {
    filter.tags = tag
  }

  if (tags && tags.length > 0) {
    filter.tags = { $in: tags }
  }

  if (author && mongoose.Types.ObjectId.isValid(author)) {
    filter.author = author
  }

  function escapeRegex(str: string) : string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  if (search) {

    const escapedSearch = escapeRegex(search)

    filter.$or = [
      { title: { $regex: escapedSearch, $options: 'i' } },
      { description: { $regex: escapedSearch, $options: 'i' } },
    ]
  }

  // Build sort object
  const sort: any = {}
  sort[sortBy] = sortOrder === 'asc' ? 1 : -1

  // Execute query
  let queryBuilder = Blog.find(filter)
    .sort(sort)
    .populate('author', 'name email image')
    .lean()

  if (skip !== undefined) {
    queryBuilder = queryBuilder.skip(skip)
  }

  if (limit !== undefined) {
    queryBuilder = queryBuilder.limit(limit)
  }

  const blogs = await queryBuilder

  return blogs.map(serializeBlog)
}

/**
 * Get a single blog by ID or slug
 */
export async function getBlogByIdOrSlug(idOrSlug: string): Promise<BlogDocument | null> {
  await connectDB()

  let blog

  // Try to find by ID first
  if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
    blog = await Blog.findById(idOrSlug)
      .populate('author', 'name email image')
      .lean()
  }

  // If not found, try by slug
  if (!blog) {
    blog = await Blog.findOne({ slug: idOrSlug })
      .populate('author', 'name email image')
      .lean()
  }

  return blog ? serializeBlog(blog) : null
}

/**
 * Get blogs by current user
 */
export async function getBlogsByUser(userId: string, query: BlogQuery = {}): Promise<BlogDocument[]> {
  return getBlogs({ ...query, author: userId })
}

/**
 * Get all published blogs (for public-facing pages)
 */
export async function getPublishedBlogs(query: Omit<BlogQuery, 'status'> = {}): Promise<BlogDocument[]> {
  return getBlogs({ ...query, status: 'published' })
}

/**
 * Get featured blogs
 */
export async function getFeaturedBlogs(limit: number = 3): Promise<BlogDocument[]> {
  return getBlogs({
    status: 'published',
    isFeatured: true,
    limit,
    sortBy: 'publishedAt',
    sortOrder: 'desc',
  })
}

/**
 * Get latest blogs
 */
export async function getLatestBlogs(limit: number = 10): Promise<BlogDocument[]> {
  return getBlogs({
    status: 'published',
    limit,
    sortBy: 'publishedAt',
    sortOrder: 'desc',
  })
}

/**
 * Get blogs by tag
 */
export async function getBlogsByTag(tag: string, limit?: number): Promise<BlogDocument[]> {
  return getBlogs({
    status: 'published',
    tag,
    limit,
    sortBy: 'publishedAt',
    sortOrder: 'desc',
  })
}

/**
 * Get blogs by multiple tags (any match)
 */
export async function getBlogsByTags(tags: string[], limit?: number): Promise<BlogDocument[]> {
  return getBlogs({
    status: 'published',
    tags,
    limit,
    sortBy: 'publishedAt',
    sortOrder: 'desc',
  })
}

/**
 * Search blogs
 */
export async function searchBlogs(searchTerm: string, limit?: number): Promise<BlogDocument[]> {
  return getBlogs({
    status: 'published',
    search: searchTerm,
    limit,
    sortBy: 'publishedAt',
    sortOrder: 'desc',
  })
}

/**
 * Get related blogs (by tags, excluding current blog)
 */
export async function getRelatedBlogs(blogId: string, limit: number = 3): Promise<BlogDocument[]> {
  await connectDB()

  // Get current blog to find its tags
  const currentBlog = await Blog.findById(blogId).lean()

  if (!currentBlog || !currentBlog.tags || currentBlog.tags.length === 0) {
    // If no tags, just return latest blogs
    return getLatestBlogs(limit)
  }

  // Find blogs with matching tags, excluding current blog
  const blogs = await Blog.find({
    _id: { $ne: blogId },
    status: 'published',
    tags: { $in: currentBlog.tags },
  })
    .sort({ publishedAt: -1 })
    .limit(limit)
    .populate('author', 'name email image')
    .lean()

  return blogs.map(serializeBlog)
}

/**
 * Get blog statistics for a user
 */
export async function getBlogStats(userId: string) {
  await connectDB()

  const [totalBlogs, publishedBlogs, draftBlogs, featuredBlogs] = await Promise.all([
    Blog.countDocuments({ author: userId }),
    Blog.countDocuments({ author: userId, status: 'published' }),
    Blog.countDocuments({ author: userId, status: 'draft' }),
    Blog.countDocuments({ author: userId, isFeatured: true }),
  ])

  return {
    total: totalBlogs,
    published: publishedBlogs,
    draft: draftBlogs,
    featured: featuredBlogs,
  }
}

/**
 * Get all unique tags from published blogs
 */
export async function getAllTags(): Promise<string[]> {
  await connectDB()

  const result = await Blog.aggregate([
    { $match: { status: 'published' } },
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ])

  return result.map((item) => item._id)
}

/**
 * Get tag with blog count
 */
export async function getTagsWithCount(): Promise<Array<{ tag: string; count: number }>> {
  await connectDB()

  const result = await Blog.aggregate([
    { $match: { status: 'published' } },
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ])

  return result.map((item) => ({
    tag: item._id,
    count: item.count,
  }))
}

/**
 * Check if slug exists (for validation)
 */
export async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  await connectDB()

  const query: any = { slug }

  if (excludeId && mongoose.Types.ObjectId.isValid(excludeId)) {
    query._id = { $ne: excludeId }
  }

  const blog = await Blog.findOne(query).lean()

  return !!blog
}