'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { BlogList } from '@/components/blog/BlogList'
import { BlogSidebar } from '@/components/blog/BlogSidebar'

export default function BlogPage() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)

  // 从URL参数获取页码
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const page = parseInt(searchParams.get('page') || '1')
    setCurrentPage(page)
  }, [])

  const updatePage = (page: number) => {
    setCurrentPage(page)
    // 更新URL参数
    const url = new URL(window.location.href)
    url.searchParams.set('page', page.toString())
    router.push(url.pathname + url.search)
  }

  return (
    <div className="min-h-screen bg-cyber-bg-900 text-white">
      {/* 页面标题 */}
      <div className="pt-20 pb-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyber-pink-400 to-cyber-blue-400 bg-clip-text text-transparent mb-4">
            技术废柴的学习笔记
          </h1>
        </motion.div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 主要内容区域 */}
          <div className="lg:col-span-3 w-full">
            <BlogList externalPage={currentPage} onPageChange={updatePage} />
          </div>

          {/* 侧边栏 */}
          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
