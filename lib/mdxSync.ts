import fs from 'fs/promises'
import path from 'path'

interface CreateMDXFileParams {
  slug: string
  title: string
  description: string
  tags: string[]
  author: string
  date: string
  content?: string
}

/**
 * Creates an MDX file in the content/blogs directory
 */
export async function createMDXFile({
  slug,
  title,
  description,
  tags,
  author,
  date,
  content = '',
}: CreateMDXFileParams): Promise<string> {
  
  // Format date
  const formattedDate = new Date(date).toISOString().split('T')[0]
  
  // Create frontmatter
  const frontmatter = `---
title: ${title}
description: ${description}
slug: ${slug}
tags: [${tags.join(', ')}]
author: ${author}
date: ${formattedDate}
---

# ${title}

${description}

${content || '<!-- Start writing your blog content here -->'}
`

  // Ensure content/blogs directory exists
  const blogsDir = path.join(process.cwd(), 'content', 'blogs')
  
  try {
    await fs.mkdir(blogsDir, { recursive: true })
  } catch (error) {
    console.error('Error creating blogs directory:', error)
  }

  // Create file path
  const filePath = path.join(blogsDir, `${slug}.mdx`)

  // Write file
  await fs.writeFile(filePath, frontmatter, 'utf-8')
  
  console.log(`✅ MDX file created: ${filePath}`)
  
  return filePath
}

/**
 * Updates an existing MDX file
 */
export async function updateMDXFile({
  slug,
  title,
  description,
  tags,
  author,
  date,
  content,
}: CreateMDXFileParams): Promise<string> {
  
  const filePath = path.join(process.cwd(), 'content', 'blogs', `${slug}.mdx`)
  
  // Check if file exists
  try {
    await fs.access(filePath)
  } catch {
    // File doesn't exist, create it
    return createMDXFile({ slug, title, description, tags, author, date, content })
  }

  // Read existing content
  const existingContent = await fs.readFile(filePath, 'utf-8')
  
  // Extract content after frontmatter (preserve user's content)
  const contentMatch = existingContent.match(/---[\s\S]*?---\s*([\s\S]*)/)
  const preservedContent = content || (contentMatch ? contentMatch[1].trim() : '')

  // Format date
  const formattedDate = new Date(date).toISOString().split('T')[0]
  
  // Create updated frontmatter with preserved content
  const updatedContent = `---
title: ${title}
description: ${description}
slug: ${slug}
tags: [${tags.join(', ')}]
author: ${author}
date: ${formattedDate}
---

${preservedContent}
`

  // Write updated file
  await fs.writeFile(filePath, updatedContent, 'utf-8')
  
  console.log(`✅ MDX file updated: ${filePath}`)
  
  return filePath
}

/**
 * Deletes an MDX file
 */
export async function deleteMDXFile(slug: string): Promise<boolean> {
  const filePath = path.join(process.cwd(), 'content', 'blogs', `${slug}.mdx`)
  
  try {
    await fs.unlink(filePath)
    console.log(`✅ MDX file deleted: ${filePath}`)
    return true
  } catch (error) {
    console.error(`❌ Failed to delete MDX file: ${filePath}`, error)
    return false
  }
}

/**
 * Check if MDX file exists
 */
export async function mdxFileExists(slug: string): Promise<boolean> {
  const filePath = path.join(process.cwd(), 'content', 'blogs', `${slug}.mdx`)
  
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}