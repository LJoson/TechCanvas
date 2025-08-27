'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Tag, Calendar, User, BookOpen, TrendingUp, Sparkles } from 'lucide-react'
import { formatDateSafely } from '@/lib/utils'
import {
  type BlogPost,
  type BlogCategory,
  type BlogTag,
  getAllBlogPosts,
  getAllCategories,
  getAllTags,
  getRecentPosts,
  getFeaturedPosts,
  loadBlogDataInClient
} from '@/lib/content/mdx-parser'

interface BlogSidebarProps {
  onCategorySelect?: (category: string) => void
  onTagSelect?: (tag: string) => void
  selectedCategory?: string
  selectedTag?: string
}

export function BlogSidebar({
  onCategorySelect,
  onTagSelect,
  selectedCategory,
  selectedTag
}: BlogSidebarProps) {
  const [isClient, setIsClient] = useState(false)
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [allTags, setAllTags] = useState<BlogTag[]>([])
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  // 获取博客数据 - 只使用静态导入的数据
  useEffect(() => {
    const loadBlogData = async () => {
      try {
        // 使用新的数据加载方法
        const posts = await loadBlogDataInClient()
        const cats = getAllCategories()
        const tags = getAllTags()
        const recent = getRecentPosts(5)
        const featured = getFeaturedPosts()

        setCategories(cats || [])
        setAllTags(tags || [])
        setLatestPosts(recent || [])
        setFeaturedPosts(featured || [])
      } catch (error) {
        console.error('Error loading blog data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadBlogData()
    setIsClient(true)
  }, [])

  // 获取热门标签（按使用频率排序）
  const popularTags = allTags
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  if (loading) {
    return (
      <div className="space-y-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="fail-card">
            <div className="animate-pulse">
              <div className="h-4 bg-cyber-bg-700 rounded mb-4"></div>
              <div className="h-4 bg-cyber-bg-700 rounded mb-2"></div>
              <div className="h-4 bg-cyber-bg-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8 w-full">
      {/* 博客统计 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fail-card bg-gradient-to-br from-cyber-bg-800 to-cyber-bg-900"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-fail-red" />
          博客统计
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-cyber-bg-700/50 rounded-lg">
            <div className="text-2xl font-bold text-fail-red mb-1">
              {latestPosts.length + featuredPosts.length}
            </div>
            <div className="text-xs text-gray-400">总文章数</div>
          </div>
          <div className="text-center p-3 bg-cyber-bg-700/50 rounded-lg">
            <div className="text-2xl font-bold text-fail-blue mb-1">
              {categories.length}
            </div>
            <div className="text-xs text-gray-400">分类数</div>
          </div>
          <div className="text-center p-3 bg-cyber-bg-700/50 rounded-lg">
            <div className="text-2xl font-bold text-fail-green mb-1">
              {allTags.length}
            </div>
            <div className="text-xs text-gray-400">标签数</div>
          </div>
          <div className="text-center p-3 bg-cyber-bg-700/50 rounded-lg">
            <div className="text-2xl font-bold text-fail-purple mb-1">
              {featuredPosts.length}
            </div>
            <div className="text-xs text-gray-400">精选文章</div>
          </div>
        </div>
      </motion.div>

      {/* 分类 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="fail-card"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <Tag className="w-5 h-5 mr-2 text-fail-red" />
          文章分类
        </h3>
        <div className="space-y-2">
          <AnimatePresence>
            {categories.map((category: BlogCategory, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center justify-between p-3 rounded-md hover:bg-cyber-bg-700 transition-all duration-300 cursor-pointer group"
              >
                <span className="font-medium group-hover:text-fail-red transition-colors text-white">
                  {category.name}
                </span>
                <span className="text-sm text-gray-400 bg-cyber-bg-700 px-2 py-1 rounded-full group-hover:bg-fail-red/20 group-hover:text-fail-red transition-colors">
                  {category.count}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 热门标签 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fail-card"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <Tag className="w-5 h-5 mr-2 text-fail-red" />
          热门标签
        </h3>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {popularTags.map((tag: BlogTag, index) => (
              <motion.span
                key={tag.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-3 py-1 bg-cyber-bg-700 text-gray-300 text-sm rounded-full hover:bg-fail-red hover:text-white transition-all duration-300 cursor-pointer shadow-lg hover:shadow-fail-red/25"
              >
                {tag.name} ({tag.count})
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 最新文章 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="fail-card"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-fail-red" />
          最新文章
        </h3>
        <div className="space-y-3">
          <AnimatePresence>
            {latestPosts.map((post: BlogPost, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="p-3 rounded-md hover:bg-cyber-bg-700 transition-all duration-300 border border-transparent hover:border-fail-red/20">
                    <h4 className="font-medium text-white group-hover:text-fail-red transition-colors line-clamp-2 mb-1">
                      {post.title}
                    </h4>
                    <div className="flex items-center text-xs text-gray-400">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDateSafely(post.date, isClient)}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 精选文章 */}
      {featuredPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="fail-card bg-gradient-to-br from-fail-red/5 to-fail-orange/5 border border-fail-red/20"
        >
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-fail-red" />
            精选文章
          </h3>
          <div className="space-y-3">
            <AnimatePresence>
              {featuredPosts.slice(0, 3).map((post: BlogPost, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="p-3 rounded-md hover:bg-cyber-bg-700/50 transition-all duration-300 border border-fail-red/20 hover:border-fail-red/40">
                      <div className="flex items-center mb-1">
                        <span className="text-fail-red text-xs mr-2 animate-pulse">⭐</span>
                        <h4 className="font-medium text-white group-hover:text-fail-red transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDateSafely(post.date, isClient)}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* 关于作者 */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="fail-card bg-gradient-to-br from-cyber-bg-800 to-cyber-bg-900"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-fail-red" />
          关于作者
        </h3>
        <div className="text-gray-300 text-sm leading-relaxed">
          <p className="mb-3">技术废柴一枚，热爱跨界探索各种技术领域。</p>
          <p className="mb-3">从机器人编程到游戏开发，从AI算法到内容创作，</p>
          <p>用轻松幽默的方式分享技术学习心得。</p>
        </div>
        <div className="mt-4 pt-4 border-t border-cyber-bg-700">
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
            <span>🤖 机器人</span>
            <span>🎮 游戏</span>
            <span>💻 编程</span>
            <span>🎨 创作</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
