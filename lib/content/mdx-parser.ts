import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  id: string
  title: string
  description: string
  date: string
  readTime: string
  tags: string[]
  category: string
  slug: string
  featured: boolean
  author: string
  status: 'published' | 'draft' | 'archived'
  content: string
  excerpt?: string
}

export interface BlogCategory {
  name: string
  count: number
  description?: string
}

export interface BlogTag {
  name: string
  count: number
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

// 检查是否在服务端环境
const isServer = typeof window === 'undefined'

// 缓存静态数据
let cachedPosts: BlogPost[] | null = null

/**
 * 读取所有博客文章
 */
export function getAllBlogPosts(): BlogPost[] {
  // 如果在客户端，使用静态数据文件
  if (!isServer) {
    if (cachedPosts) {
      return cachedPosts
    }

    // 尝试从静态数据文件加载
    try {
      // 在客户端环境中，我们需要通过其他方式获取数据
      // 这里返回空数组，让组件处理数据加载
      return []
    } catch (error) {
      console.error('Error loading blog data in client:', error)
      return []
    }
  }

  const posts: BlogPost[] = []

  // 递归遍历所有子目录
  function traverseDirectory(dir: string) {
    try {
      const items = fs.readdirSync(dir)

      for (const item of items) {
        const fullPath = path.join(dir, item)
        const stat = fs.statSync(fullPath)

        if (stat.isDirectory()) {
          // 递归遍历子目录
          traverseDirectory(fullPath)
        } else if (stat.isFile() && item.endsWith('.md')) {
          // 读取MD文件
          const post = readBlogPost(fullPath)
          if (post && post.status === 'published') {
            posts.push(post)
          }
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dir}:`, error)
    }
  }

  try {
    traverseDirectory(BLOG_DIR)
  } catch (error) {
    console.error('Error reading blog directory:', error)
  }

  // 按日期排序，最新的在前
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * 在客户端环境中加载博客数据
 */
export async function loadBlogDataInClient(): Promise<BlogPost[]> {
  if (isServer) {
    return getAllBlogPosts()
  }

  if (cachedPosts) {
    return cachedPosts
  }

  try {
    const response = await fetch('/blog-data.json')
    if (response.ok) {
      const data = await response.json()
      cachedPosts = data.posts || []
      return cachedPosts || []
    }
  } catch (error) {
    console.error('Error loading blog data:', error)
  }

  return []
}

/**
 * 读取单个博客文章
 */
export function readBlogPost(filePath: string): BlogPost | null {
  if (!isServer) {
    return null
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)

    // 生成slug（如果不存在）
    const slug = data.slug || path.basename(filePath, '.md')

    // 生成ID
    const id = slug

    // 生成摘要
    const excerpt = content
      .replace(/[#*`]/g, '') // 移除markdown标记
      .substring(0, 200) + '...'

    return {
      id,
      title: data.title || '未命名文章',
      description: data.description || excerpt,
      date: data.date || new Date().toISOString().split('T')[0],
      readTime: data.readTime || '5分钟',
      tags: data.tags || [],
      category: data.category || '未分类',
      slug,
      featured: data.featured || false,
      author: data.author || 'LJoson',
      status: data.status || 'published',
      content,
      excerpt
    }
  } catch (error) {
    console.error(`Error reading blog post ${filePath}:`, error)
    return null
  }
}

/**
 * 根据slug获取博客文章
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getAllBlogPosts()
  return posts.find(post => post.slug === slug) || null
}

/**
 * 获取所有分类
 */
export function getAllCategories(): BlogCategory[] {
  const posts = getAllBlogPosts()
  const categoryMap = new Map<string, number>()

  posts.forEach(post => {
    const count = categoryMap.get(post.category) || 0
    categoryMap.set(post.category, count + 1)
  })

  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    count
  }))
}

/**
 * 获取所有标签
 */
export function getAllTags(): BlogTag[] {
  const posts = getAllBlogPosts()
  const tagMap = new Map<string, number>()

  posts.forEach(post => {
    post.tags.forEach(tag => {
      const count = tagMap.get(tag) || 0
      tagMap.set(tag, count + 1)
    })
  })

  return Array.from(tagMap.entries()).map(([name, count]) => ({
    name,
    count
  }))
}

/**
 * 根据分类获取文章
 */
export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllBlogPosts()
  return posts.filter(post => post.category === category)
}

/**
 * 根据标签获取文章
 */
export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getAllBlogPosts()
  return posts.filter(post => post.tags.includes(tag))
}

/**
 * 搜索文章
 */
export function searchPosts(query: string): BlogPost[] {
  const posts = getAllBlogPosts()
  const lowerQuery = query.toLowerCase()

  return posts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.description.toLowerCase().includes(lowerQuery) ||
    post.content.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    post.category.toLowerCase().includes(lowerQuery)
  )
}

/**
 * 获取精选文章
 */
export function getFeaturedPosts(): BlogPost[] {
  const posts = getAllBlogPosts()
  return posts.filter(post => post.featured)
}

/**
 * 获取最新文章
 */
export function getRecentPosts(limit: number = 5): BlogPost[] {
  const posts = getAllBlogPosts()
  return posts.slice(0, limit)
}
