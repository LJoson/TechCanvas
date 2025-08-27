'use client'

import { motion } from 'framer-motion'
import { Brain, Gamepad2, Code, Zap } from 'lucide-react'

export default function Loading() {
  const icons = [Brain, Gamepad2, Code, Zap]
  const colors = ['text-fail-red', 'text-fail-blue', 'text-fail-green', 'text-fail-purple']

  return (
    <div className="min-h-screen bg-cyber-bg-900 flex items-center justify-center px-4">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-fail-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-fail-blue/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fail-purple/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto">
        {/* 加载动画 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="text-2xl font-bold cyber-gradient mb-2">
            跨界探索者
          </h1>
          <p className="text-gray-400">正在加载精彩内容...</p>
        </motion.div>

        {/* 旋转图标 */}
        <motion.div
          className="flex justify-center space-x-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {icons.map((Icon, index) => (
            <motion.div
              key={index}
              className={`w-12 h-12 ${colors[index]} bg-cyber-bg-800 border border-cyber-bg-700 rounded-lg flex items-center justify-center`}
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: "linear", delay: index * 0.2 },
                scale: { duration: 1, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }
              }}
            >
              <Icon className="w-6 h-6" />
            </motion.div>
          ))}
        </motion.div>

        {/* 进度条 */}
        <motion.div
          className="w-full bg-cyber-bg-700 rounded-full h-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            className="h-2 bg-gradient-to-r from-fail-red via-fail-blue to-fail-purple rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </motion.div>

        {/* 加载提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-sm text-gray-400"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            正在探索技术边界...
          </motion.div>
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
