'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Tag, Clock, ArrowLeft, Share2, X, Copy, ExternalLink, User, Eye } from 'lucide-react'
import { formatDateSafely } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import { useState, useEffect, Suspense } from 'react'

import { type BlogPost } from '@/lib/content/mdx-parser'

interface BlogDetailProps {
  post: BlogPost
}

// 错误边界组件
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('BlogDetail组件错误:', error)
      setHasError(true)
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  if (hasError) {
    return (
      <div className="min-h-screen bg-cyber-bg-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-fail-red mb-4">
            🤖 组件加载失败
          </h1>
          <p className="text-gray-400 mb-4">
            抱歉，文章组件加载时出现了问题
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 bg-fail-red text-white rounded-lg hover:bg-fail-orange transition-colors"
          >
            重新加载
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

// 加载组件
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-cyber-bg-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fail-red mx-auto mb-4"></div>
        <p className="text-gray-400">正在加载文章内容...</p>
      </div>
    </div>
  )
}

export function BlogDetail({ post }: BlogDetailProps) {
  const [isClient, setIsClient] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 确保客户端渲染
    setIsClient(true)

    // 模拟加载延迟，确保组件完全加载
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // 添加ESC键关闭弹窗功能
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showShareModal) {
        setShowShareModal(false)
      }
    }

    if (showShareModal) {
      document.addEventListener('keydown', handleEscape)
      // 防止背景滚动
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [showShareModal])

  const handleShare = () => {
    setShowShareModal(true)
  }

  const handleCopyLink = async () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href)
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      } catch (error) {
        console.error('复制失败:', error)
      }
    }
  }

  const sharePlatforms = [
    {
      name: '微信',
      icon: '💬',
      action: () => {
        // 微信分享需要特殊处理，这里先复制链接
        handleCopyLink()
      }
    },
    {
      name: '微博',
      icon: '📱',
      action: () => {
        const url = encodeURIComponent(window.location.href)
        const text = encodeURIComponent(`${post.title} - ${post.description}`)
        window.open(`https://service.weibo.com/share/share.php?url=${url}&title=${text}`, '_blank')
      }
    },
    {
      name: 'QQ',
      icon: '🐧',
      action: () => {
        const url = encodeURIComponent(window.location.href)
        const text = encodeURIComponent(`${post.title} - ${post.description}`)
        window.open(`https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${text}`, '_blank')
      }
    },
    {
      name: '豆瓣',
      icon: '📚',
      action: () => {
        const url = encodeURIComponent(window.location.href)
        const text = encodeURIComponent(`${post.title} - ${post.description}`)
        window.open(`https://www.douban.com/share/service?href=${url}&name=${text}`, '_blank')
      }
    }
  ]

  // 确保内容存在
  const content = post.content || post.excerpt || '内容加载中...'

  // 如果还在加载或客户端未准备好，显示加载状态
  if (isLoading || !isClient) {
    return <LoadingFallback />
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <div className="w-full">
          {/* 返回按钮 - 增加更多顶部间距避免堆叠 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 pt-8"
          >
            <a
              href="/blog/"
              className="inline-flex items-center px-6 py-3 bg-cyber-bg-800 text-white rounded-lg hover:bg-cyber-bg-700 transition-all duration-300 hover:scale-105 border border-cyber-bg-700 hover:border-fail-orange group shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">返回博客列表</span>
            </a>
          </motion.div>

          {/* 文章标题区域 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            {/* 分类标签 */}
            <div className="mb-4">
              <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-fail-red/20 to-fail-orange/20 text-fail-orange rounded-full text-sm font-medium border border-fail-red/30">
                <Tag className="w-3 h-3 mr-2" />
                {post.category}
              </span>
            </div>

            {/* 主标题 */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight bg-gradient-to-r from-fail-red via-fail-orange to-fail-purple bg-clip-text text-transparent">
              {post.title}
            </h1>

            {/* 文章描述 */}
            <div className="bg-gradient-to-r from-cyber-bg-800/80 to-cyber-bg-900/80 backdrop-blur-sm rounded-xl p-6 border border-cyber-bg-700 mb-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                {post.description}
              </p>
            </div>
          </motion.div>

          {/* 文章元信息 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8"
          >
            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-fail-orange" />
                <span className="font-medium">{formatDateSafely(post.date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-fail-orange" />
                <span className="font-medium">{post.readTime || '5分钟'}</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 text-fail-orange" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-2 text-fail-orange" />
                <span className="font-medium">{Math.floor(Math.random() * 1000) + 100} 阅读</span>
              </div>
            </div>

            {/* 标签云 */}
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-4 py-2 bg-cyber-bg-800 text-fail-orange rounded-full text-sm border border-cyber-bg-700 hover:border-fail-orange transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-fail-orange/25"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* 文章内容 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="w-full"
          >
            <div className="bg-cyber-bg-800 rounded-xl p-8 border border-cyber-bg-700 shadow-2xl">
              <ReactMarkdown
                components={{
                  // 自定义标题样式
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-white mb-6 mt-8 border-b border-cyber-bg-700 pb-3">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-white mb-4 mt-6 text-fail-orange">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold text-white mb-3 mt-5">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-lg font-semibold text-white mb-2 mt-4">
                      {children}
                    </h4>
                  ),

                  // 自定义段落样式
                  p: ({ children }) => (
                    <p className="text-gray-300 mb-6 leading-relaxed text-base">
                      {children}
                    </p>
                  ),

                  // 自定义列表样式
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-4">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside text-gray-300 mb-6 space-y-2 ml-4">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-300 leading-relaxed">
                      {children}
                    </li>
                  ),

                  // 自定义引用样式
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-fail-red pl-6 italic text-gray-400 mb-6 bg-cyber-bg-900/50 p-4 rounded-r-lg">
                      {children}
                    </blockquote>
                  ),

                  // 自定义代码块样式
                  code: ({ node, className, children, ...props }: any) => {
                    const match = /language-(\w+)/.exec(className || '')
                    const isInline = !match
                    return !isInline ? (
                      <div className="mb-6">
                        <div className="bg-cyber-bg-900 rounded-t-lg px-4 py-2 border-b border-cyber-bg-700">
                          <span className="text-sm text-fail-orange font-mono">{match[1]}</span>
                        </div>
                        <pre className="bg-cyber-bg-900 p-4 rounded-b-lg overflow-x-auto border border-cyber-bg-700">
                          <code className={`${className} text-sm`} {...props}>
                            {children}
                          </code>
                        </pre>
                      </div>
                    ) : (
                      <code className="bg-cyber-bg-700 px-2 py-1 rounded text-fail-orange text-sm font-mono" {...props}>
                        {children}
                      </code>
                    )
                  },

                  // 自定义链接样式
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-fail-orange hover:text-fail-red transition-colors underline decoration-dotted underline-offset-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children} <ExternalLink className="inline w-3 h-3 ml-1" />
                    </a>
                  ),

                  // 自定义表格样式
                  table: ({ children }) => (
                    <div className="overflow-x-auto mb-6">
                      <table className="min-w-full border border-cyber-bg-700 rounded-lg">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="px-4 py-3 bg-cyber-bg-700 text-white font-semibold border-b border-cyber-bg-600">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-4 py-3 text-gray-300 border-b border-cyber-bg-700">
                      {children}
                    </td>
                  ),

                  // 自定义分割线样式
                  hr: () => (
                    <hr className="my-8 border-cyber-bg-700" />
                  ),

                  // 自定义强调样式
                  strong: ({ children }) => (
                    <strong className="font-bold text-white">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-fail-orange">
                      {children}
                    </em>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </motion.div>

          {/* 文章底部分享按钮 - 确保与推荐阅读区域对齐 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            className="mt-12 flex flex-wrap items-center justify-center"
          >
            <button
              onClick={handleShare}
              className="inline-flex items-center px-8 py-4 bg-fail-red text-white rounded-lg hover:bg-fail-orange transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Share2 className="w-5 h-5 mr-2" />
              分享文章
            </button>
          </motion.div>

          {/* 分享弹窗 */}
          <AnimatePresence>
            {showShareModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setShowShareModal(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-cyber-bg-800 rounded-xl p-6 max-w-md w-full border border-cyber-bg-700 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">分享文章</h3>
                    <button
                      onClick={() => setShowShareModal(false)}
                      className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-cyber-bg-700 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {sharePlatforms.map((platform) => (
                      <button
                        key={platform.name}
                        onClick={platform.action}
                        className="flex items-center justify-center p-4 bg-cyber-bg-700 rounded-lg hover:bg-cyber-bg-600 transition-all duration-300 hover:scale-105"
                      >
                        <span className="text-2xl mr-3">{platform.icon}</span>
                        <span className="text-white font-medium">{platform.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={typeof window !== 'undefined' ? window.location.href : ''}
                      readOnly
                      className="flex-1 px-4 py-3 bg-cyber-bg-700 text-white rounded-lg border border-cyber-bg-600 text-sm"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="px-4 py-3 bg-fail-red text-white rounded-lg hover:bg-fail-orange transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  {copySuccess && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-400 text-sm mt-3 text-center font-medium"
                    >
                      ✅ 链接已复制到剪贴板！
                    </motion.p>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}