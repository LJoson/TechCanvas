'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Code, Gamepad2, Brain, Sparkles, Zap } from 'lucide-react'
import { FailAnimation } from '@/components/animations/FailAnimation'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-fail-red/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-fail-blue/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fail-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 主标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-12 h-12 text-fail-red mr-4" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              <span className="cyber-gradient">
                <FailAnimation text="LJoson" />
            </span>
              <br />
                              <span className="text-white">的"废柴"小窝</span>
            </h1>
            <Sparkles className="w-12 h-12 text-fail-red ml-4" />
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            从机器人到游戏，从代码到内容创作
            <br />
            用跨界思维探索技术边界，让学习变得有趣而富有创意
          </p>
        </motion.div>

        {/* 跨界标签 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: Brain, text: '机器人/AI', color: 'text-fail-blue' },
              { icon: Gamepad2, text: '游戏开发', color: 'text-fail-green' },
              { icon: Code, text: 'Web技术', color: 'text-fail-orange' },
              { icon: Zap, text: '内容创作', color: 'text-fail-pink' }
            ].map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex items-center space-x-2 bg-cyber-bg-800/50 backdrop-blur-sm border border-cyber-bg-700 rounded-full px-4 py-2"
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-sm font-medium text-white">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 行动按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="fail-button primary large"
            >
              探索我的作品
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          </Link>

          <Link href="/blog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="fail-button secondary large"
            >
              查看学习笔记
            </motion.button>
          </Link>
        </motion.div>

        {/* 个人简介 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold cyber-gradient mb-2">5年+</div>
              <div className="text-gray-400">技术探索</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold cyber-gradient mb-2">10+</div>
              <div className="text-gray-400">跨界项目</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold cyber-gradient mb-2">∞</div>
              <div className="text-gray-400">学习热情</div>
            </div>
          </div>

          {/* 个人宣言 */}
                     <div className="mt-12 p-6 bg-cyber-bg-800/50 backdrop-blur-sm border border-cyber-bg-700 rounded-lg">
             <p className="text-lg text-gray-300 italic">
               "技术学习不应该有门槛。从机器人编程到游戏开发，从AI算法到内容创作，
               我用跨界的方式探索每一个技术领域。每一次尝试都是成长，每一次失败都是经验。"
             </p>
           </div>
        </motion.div>
      </div>

      {/* 滚动指示器 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-fail-red rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-fail-red rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
