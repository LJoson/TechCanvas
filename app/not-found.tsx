'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, ArrowLeft, Search, Github } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cyber-bg-900 flex items-center justify-center px-4">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-fail-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-fail-blue/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fail-purple/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 404 图标 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="text-8xl md:text-9xl font-bold cyber-gradient mb-4">
            404
          </div>
          <div className="text-4xl md:text-6xl mb-4">🤖</div>
        </motion.div>

        {/* 错误信息 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            页面迷失在数字宇宙中
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            看起来这个页面正在进行跨界探索，暂时找不到回家的路了。
            <br />
            不过没关系，让我们一起去探索其他有趣的地方吧！
          </p>
        </motion.div>

        {/* 建议链接 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <div className="fail-card inline-block">
            <h3 className="text-lg font-semibold text-white mb-4">
              🎯 推荐探索路径
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <Link href="/">
                <motion.div
                  className="flex items-center space-x-3 p-3 bg-cyber-bg-700 hover:bg-cyber-bg-600 rounded-lg cursor-pointer transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Home className="w-5 h-5 text-fail-red" />
                  <div>
                    <div className="text-white font-medium">首页</div>
                    <div className="text-sm text-gray-400">回到跨界探索的起点</div>
                  </div>
                </motion.div>
              </Link>

              <Link href="/blog">
                <motion.div
                  className="flex items-center space-x-3 p-3 bg-cyber-bg-700 hover:bg-cyber-bg-600 rounded-lg cursor-pointer transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Search className="w-5 h-5 text-fail-blue" />
                  <div>
                    <div className="text-white font-medium">博客</div>
                    <div className="text-sm text-gray-400">查看技术学习笔记</div>
                  </div>
                </motion.div>
              </Link>

              <Link href="/projects">
                <motion.div
                  className="flex items-center space-x-3 p-3 bg-cyber-bg-700 hover:bg-cyber-bg-600 rounded-lg cursor-pointer transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Github className="w-5 h-5 text-fail-green" />
                  <div>
                    <div className="text-white font-medium">项目</div>
                    <div className="text-sm text-gray-400">探索跨界项目作品</div>
                  </div>
                </motion.div>
              </Link>

              <Link href="/about">
                <motion.div
                  className="flex items-center space-x-3 p-3 bg-cyber-bg-700 hover:bg-cyber-bg-600 rounded-lg cursor-pointer transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft className="w-5 h-5 text-fail-purple" />
                  <div>
                    <div className="text-white font-medium">关于</div>
                    <div className="text-sm text-gray-400">了解跨界探索者</div>
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* 操作按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <motion.button
              className="fail-button primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-5 h-5 mr-2" />
              回到首页
            </motion.button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="fail-button secondary"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回上页
          </button>
        </motion.div>

        {/* 装饰元素 */}
        <motion.div
          className="absolute -top-10 -left-10 w-20 h-20 bg-fail-red/20 rounded-full flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="text-2xl">⚡</div>
        </motion.div>

        <motion.div
          className="absolute -bottom-10 -right-10 w-16 h-16 bg-fail-blue/20 rounded-full flex items-center justify-center"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <div className="text-xl">🎮</div>
        </motion.div>

        <motion.div
          className="absolute top-1/2 -left-20 w-12 h-12 bg-fail-purple/20 rounded-full flex items-center justify-center"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="text-lg">💻</div>
        </motion.div>
      </div>
    </div>
  )
}
