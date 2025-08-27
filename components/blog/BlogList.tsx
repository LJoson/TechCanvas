'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Tag, Clock, Search, Filter, X, ArrowLeft, ArrowRight } from 'lucide-react'
import { formatDateSafely } from '@/lib/utils'
import {
  type BlogPost,
  type BlogCategory,
  type BlogTag,
  getAllBlogPosts,
  getAllCategories,
  getAllTags,
  loadBlogDataInClient
} from '@/lib/content/mdx-parser'

interface BlogListProps {
  externalPage?: number
  onPageChange?: (page: number) => void
  postsPerPage?: number
}

export function BlogList({
  externalPage,
  onPageChange,
  postsPerPage = 9
}: BlogListProps) {
  const [isClient, setIsClient] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedTag, setSelectedTag] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(externalPage || 1)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [allTags, setAllTags] = useState<BlogTag[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  // 同步外部页码
  useEffect(() => {
    if (externalPage && externalPage !== currentPage) {
      setCurrentPage(externalPage)
    }
  }, [externalPage, currentPage])

  // 获取博客数据 - 只使用静态导入的数据
  useEffect(() => {
    const loadBlogData = async () => {
      try {
        // 使用新的数据加载方法
        const posts = await loadBlogDataInClient()
        const cats = getAllCategories()
        const tags = getAllTags()

        setBlogPosts(posts || [])
        setCategories(cats || [])
        setAllTags(tags || [])
      } catch (error) {
        console.error('Error loading blog data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadBlogData()
    setIsClient(true)
  }, [])

  // 搜索文章 - 使用客户端搜索
  useEffect(() => {
    const searchPosts = () => {
      if (!searchQuery && !selectedCategory && !selectedTag) {
        // 如果没有搜索条件，重新获取所有文章
        try {
          const posts = getAllBlogPosts()
          setBlogPosts(posts || [])
        } catch (error) {
          console.error('Error loading all posts:', error)
        }
        return
      }

      try {
        // 使用客户端搜索
        let allPosts = getAllBlogPosts()

        // 按搜索词过滤
        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          allPosts = allPosts.filter(post =>
            post.title.toLowerCase().includes(query) ||
            post.description.toLowerCase().includes(query) ||
            post.content.toLowerCase().includes(query) ||
            post.tags.some(tag => tag.toLowerCase().includes(query))
          )
        }

        // 按分类过滤
        if (selectedCategory) {
          allPosts = allPosts.filter(post => post.category === selectedCategory)
        }

        // 按标签过滤
        if (selectedTag) {
          allPosts = allPosts.filter(post =>
            post.tags.some(tag => tag === selectedTag)
          )
        }

        setBlogPosts(allPosts)
      } catch (error) {
        console.error('Error searching posts:', error)
      }
    }

    searchPosts()
  }, [searchQuery, selectedCategory, selectedTag])

  // 过滤文章
  let filteredPosts = blogPosts

  // 分页
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category)
    setSelectedTag('')
    setSearchQuery('')
    const newPage = 1
    setCurrentPage(newPage)
    if (onPageChange) onPageChange(newPage)
  }

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag === selectedTag ? '' : tag)
    setSelectedCategory('')
    setSearchQuery('')
    const newPage = 1
    setCurrentPage(newPage)
    if (onPageChange) onPageChange(newPage)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setSelectedCategory('')
    setSelectedTag('')
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedTag('')
    setCurrentPage(1)
  }

  const hasActiveFilters = searchQuery || selectedCategory || selectedTag

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-fail-red border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-400">正在加载文章...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 页面标题 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 cyber-gradient">
          技术废柴的学习笔记
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          记录我的技术学习历程，分享踩坑经验和成长心得
        </p>
      </motion.div>

      {/* 搜索和筛选工具栏 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* 搜索框 */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="搜索技术废柴的文章..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-cyber-bg-700 border border-cyber-bg-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-fail-red transition-all duration-300"
            />
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          </div>

          {/* 筛选按钮 */}
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-cyber-bg-700 border border-cyber-bg-600 rounded-lg text-white hover:bg-cyber-bg-600 transition-colors"
            >
              <Filter className="w-4 h-4" />
              筛选
            </motion.button>

            {hasActiveFilters && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-3 bg-fail-red/20 border border-fail-red/30 rounded-lg text-fail-red hover:bg-fail-red/30 transition-colors"
              >
                <X className="w-4 h-4" />
                清除
              </motion.button>
            )}
          </div>
        </div>

        {/* 筛选面板 */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-6 bg-cyber-bg-800/50 backdrop-blur-sm border border-cyber-bg-700 rounded-lg"
            >
              {/* 分类筛选 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-white flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-fail-red" />
                  按分类筛选：
                </h3>
                <div className="flex flex-wrap gap-3">
                  {categories.map((category: BlogCategory) => (
                    <motion.button
                      key={category.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCategoryChange(category.name)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category.name
                          ? 'bg-fail-red text-white shadow-lg shadow-fail-red/25'
                          : 'bg-cyber-bg-700 text-gray-300 hover:bg-cyber-bg-600 hover:text-white'
                      }`}
                    >
                      {category.name} ({category.count})
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* 标签筛选 */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-white flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-fail-red" />
                  按标签筛选：
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.slice(0, 20).map((tag: BlogTag) => (
                    <motion.button
                      key={tag.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTagChange(tag.name)}
                      className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                        selectedTag === tag.name
                          ? 'bg-fail-red text-white shadow-lg shadow-fail-red/25'
                          : 'bg-cyber-bg-700 text-gray-300 hover:bg-cyber-bg-600 hover:text-white'
                      }`}
                    >
                      {tag.name} ({tag.count})
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 当前筛选状态 */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-cyber-bg-800/30 border border-cyber-bg-700 rounded-lg"
          >
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-gray-400">当前筛选：</span>
              {searchQuery && (
                <span className="px-2 py-1 bg-fail-red/20 text-fail-red rounded-full">
                  搜索: "{searchQuery}"
                </span>
              )}
              {selectedCategory && (
                <span className="px-2 py-1 bg-fail-blue/20 text-fail-blue rounded-full">
                  分类: {selectedCategory}
                </span>
              )}
              {selectedTag && (
                <span className="px-2 py-1 bg-fail-green/20 text-fail-green rounded-full">
                  标签: {selectedTag}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* 文章列表 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="space-y-6 w-full"
      >
        <AnimatePresence mode="wait">
          {currentPosts.length > 0 ? (
            <motion.div
              key="posts-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {currentPosts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} isClient={isClient} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 mx-auto mb-4 text-gray-500">
                <Search className="w-full h-full" />
              </div>
              <p className="text-gray-400 text-lg">
                {hasActiveFilters ? '没有找到符合条件的文章' : '暂无文章'}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-fail-red hover:text-fail-orange transition-colors"
                >
                  清除筛选条件
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 分页 */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const newPage = Math.max(1, currentPage - 1)
                setCurrentPage(newPage)
                if (onPageChange) onPageChange(newPage)
              }}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-cyber-bg-700 text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyber-bg-600 transition-colors"
            >
              上一页
            </motion.button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentPage(page)
                  if (onPageChange) onPageChange(page)
                }}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentPage === page
                    ? 'bg-fail-red text-white shadow-lg shadow-fail-red/25'
                    : 'bg-cyber-bg-700 text-gray-300 hover:bg-cyber-bg-600 hover:text-white'
                }`}
              >
                {page}
              </motion.button>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const newPage = Math.min(totalPages, currentPage + 1)
                setCurrentPage(newPage)
                if (onPageChange) onPageChange(newPage)
              }}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-cyber-bg-700 text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyber-bg-600 transition-colors"
            >
              下一页
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

function PostCard({ post, index, isClient }: { post: BlogPost; index: number; isClient: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block w-full">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 20px 40px rgba(255, 107, 107, 0.1)"
        }}
        className="fail-card cursor-pointer group border border-transparent hover:border-fail-red/20 transition-all duration-300 w-full"
      >
        {/* 分类和特色标签 */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-cyber-bg-700 text-gray-300 text-sm font-medium rounded-full mr-3 group-hover:bg-fail-red/20 group-hover:text-fail-red transition-colors">
            {post.category}
          </span>
          {post.featured && (
            <span className="inline-block px-3 py-1 bg-fail-red/20 text-fail-red text-sm font-medium rounded-full animate-pulse">
              ⭐ 特色文章
            </span>
          )}
        </div>

        {/* 标题 */}
        <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-fail-red transition-colors duration-300">
          {post.title}
        </h2>

        {/* 描述 */}
        <p className="text-gray-400 mb-4 leading-relaxed group-hover:text-gray-300 transition-colors">
          {post.description}
        </p>

        {/* 元信息 */}
        <div className="flex flex-wrap items-center justify-between mb-4">
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDateSafely(post.date, isClient)}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {post.readTime}
            </div>
          </div>
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 5).map(tag => (
            <span key={tag} className="tag text-sm group-hover:bg-fail-red/20 group-hover:text-fail-red transition-colors">
              {tag}
            </span>
          ))}
          {post.tags.length > 5 && (
            <span className="text-gray-500 text-sm">+{post.tags.length - 5}</span>
          )}
        </div>
      </motion.article>
    </Link>
  )
}
