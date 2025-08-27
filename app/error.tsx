'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 记录错误到控制台
    console.error('页面错误:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-cyber-bg-900 flex items-center justify-center px-4">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-fail-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-fail-blue/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fail-purple/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 错误图标 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="text-6xl mb-4">⚠️</div>
          <div className="w-20 h-20 bg-fail-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-10 h-10 text-fail-red" />
          </div>
        </motion.div>

        {/* 错误信息 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            技术探索遇到了一些问题
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed mb-6">
            看起来在跨界探索的过程中遇到了一些技术难题。
            <br />
            不过没关系，每一次错误都是学习的机会！
          </p>

          {/* 错误详情 */}
          <div className="fail-card text-left">
            <h3 className="text-lg font-semibold text-white mb-3">
              🔍 错误详情
            </h3>
            <div className="bg-cyber-bg-800 p-4 rounded-lg border border-cyber-bg-700">
              <p className="text-sm text-gray-300 font-mono break-all">
                {error.message || '未知错误'}
              </p>
              {error.digest && (
                <p className="text-xs text-gray-500 mt-2">
                  错误ID: {error.digest}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* 解决方案 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <div className="fail-card inline-block">
            <h3 className="text-lg font-semibold text-white mb-4">
              🛠️ 解决方案
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start space-x-3 p-3 bg-cyber-bg-700 rounded-lg">
                <RefreshCw className="w-5 h-5 text-fail-blue mt-0.5" />
                <div>
                  <div className="text-white font-medium">重新加载</div>
                  <div className="text-sm text-gray-400">刷新页面尝试解决问题</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-cyber-bg-700 rounded-lg">
                <Home className="w-5 h-5 text-fail-green mt-0.5" />
                <div>
                  <div className="text-white font-medium">返回首页</div>
                  <div className="text-sm text-gray-400">回到跨界探索的起点</div>
                </div>
              </div>
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
          <motion.button
            onClick={reset}
            className="fail-button primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            重新尝试
          </motion.button>

          <motion.a
            href="/"
            className="fail-button secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-5 h-5 mr-2" />
            回到首页
          </motion.a>
        </motion.div>

        {/* 技术提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 text-sm text-gray-500"
        >
          <p>
            如果问题持续存在，请检查网络连接或稍后再试。
            <br />
            技术探索的道路上，偶尔的故障是成长的一部分！
          </p>
        </motion.div>

        {/* 装饰元素 */}
        <motion.div
          className="absolute -top-10 -left-10 w-16 h-16 bg-fail-red/20 rounded-full flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="text-xl">⚡</div>
        </motion.div>

        <motion.div
          className="absolute -bottom-10 -right-10 w-12 h-12 bg-fail-blue/20 rounded-full flex items-center justify-center"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <div className="text-lg">🎮</div>
        </motion.div>

        <motion.div
          className="absolute top-1/2 -left-16 w-10 h-10 bg-fail-purple/20 rounded-full flex items-center justify-center"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="text-sm">💻</div>
        </motion.div>
      </div>
    </div>
  )
}
