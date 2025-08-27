'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Clock, Tag, Eye, Sparkles, TrendingUp, Clock as ClockIcon } from 'lucide-react'
import { formatDateSafely } from '@/lib/utils'
import { type BlogPost } from '@/lib/content/mdx-parser'
import { useState } from 'react'

interface RelatedPostsProps {
  posts: BlogPost[]
  currentPost: BlogPost
}

export function RelatedPosts({ posts, currentPost }: RelatedPostsProps) {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null)

  if (posts.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-6xl mx-auto"
    >
      {/* 标题区域 */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-fail-red/10 to-fail-orange/10 rounded-full border border-fail-red/20 mb-6"
        >
          <Sparkles className="w-5 h-5 text-fail-red mr-2" />
          <span className="text-fail-orange font-medium">推荐阅读</span>
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-fail-red via-fail-orange to-fail-purple bg-clip-text text-transparent">
          相关文章推荐
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          继续探索更多{currentPost.category}相关的内容，发现更多技术废柴的成长故事
        </p>
      </div>

      {/* 文章网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative"
            onMouseEnter={() => setHoveredPost(post.slug)}
            onMouseLeave={() => setHoveredPost(null)}
          >
            <a
              href={`/blog/${post.slug}/`}
              className="block bg-gradient-to-br from-cyber-bg-800 to-cyber-bg-900 rounded-xl p-6 border border-cyber-bg-700 hover:border-fail-orange transition-all duration-500 hover:shadow-2xl hover:shadow-fail-red/20 group-hover:-translate-y-2 relative overflow-hidden"
            >
              {/* 背景装饰 */}
              <div className="absolute inset-0 bg-gradient-to-br from-fail-red/5 via-transparent to-fail-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* 热门标签 */}
              {index === 0 && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-fail-red to-fail-orange text-white text-xs font-medium rounded-full shadow-lg">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    热门
                  </span>
                </div>
              )}

              {/* 文章内容 */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-fail-orange transition-colors line-clamp-2 leading-tight">
                  {post.title}
                </h3>

                {/* 文章描述 */}
                <p className="text-gray-400 mb-4 line-clamp-3 leading-relaxed text-sm">
                  {post.description}
                </p>

                {/* 文章元信息 */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{formatDateSafely(post.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{post.readTime || '5分钟'}</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    <span>{Math.floor(Math.random() * 500) + 50}</span>
                  </div>
                </div>

                {/* 分类和标签 */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-cyber-bg-700 text-fail-orange rounded-full text-xs font-medium border border-cyber-bg-600">
                    {post.category}
                  </span>
                </div>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-cyber-bg-700 text-fail-orange rounded-full text-xs border border-cyber-bg-600 hover:border-fail-orange transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="px-2 py-1 bg-cyber-bg-700 text-gray-400 rounded-full text-xs border border-cyber-bg-600">
                      +{post.tags.length - 2}
                    </span>
                  )}
                </div>

                {/* 阅读更多按钮 */}
                <div className="flex items-center text-fail-orange group-hover:text-fail-red transition-colors">
                  <span className="text-sm font-medium">阅读更多</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* 悬停效果装饰 */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-fail-red to-fail-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </a>
          </motion.article>
        ))}
      </div>

      {/* 底部操作区域 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center mt-16"
      >
        <div className="flex flex-col items-center space-y-6">
          {/* 统计信息 */}
          <div className="flex items-center space-x-8 text-gray-400">
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-2 text-fail-orange" />
              <span className="text-sm">共 {posts.length} 篇相关文章</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="w-4 h-4 mr-2 text-fail-orange" />
              <span className="text-sm">预计阅读时间 {posts.length * 5} 分钟</span>
            </div>
          </div>

          {/* 探索更多文章按钮 */}
          <a
            href="/blog/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-fail-red to-fail-orange text-white rounded-lg hover:from-fail-orange hover:to-fail-purple transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            <span className="font-medium">探索更多文章</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* 分类快速导航 */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">快速导航：</span>
            <div className="flex items-center space-x-2">
              <a
                href={`/blog/?category=${currentPost.category}`}
                className="px-3 py-1 bg-cyber-bg-800 text-fail-orange rounded-full text-xs border border-cyber-bg-700 hover:border-fail-orange transition-colors"
              >
                {currentPost.category}
              </a>
              {currentPost.tags.slice(0, 2).map((tag, index) => (
                <a
                  key={index}
                  href={`/blog/?tag=${tag}`}
                  className="px-3 py-1 bg-cyber-bg-800 text-gray-400 rounded-full text-xs border border-cyber-bg-700 hover:border-fail-orange hover:text-fail-orange transition-colors"
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
