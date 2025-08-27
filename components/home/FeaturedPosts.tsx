'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Brain, Gamepad2, Code, Zap } from 'lucide-react'
import { formatDateShort } from '@/lib/utils'

// 模拟精选文章数据
const featuredPosts = [
  {
    id: 1,
    title: '🤖 手残党的机器人编程入门指南',
    description: '从零开始学习机器人编程，记录我在ROS、Arduino、Python中的踩坑经历。谁说手残党不能玩转硬件？',
    date: '2024-01-15',
    readTime: '12分钟',
    category: '机器人/AI',
    icon: Brain,
    color: 'text-fail-blue',
    slug: 'robot-programming-guide'
  },
  {
    id: 2,
    title: '🎮 Unity物理仿真：让机器人动起来',
    description: '使用Unity3D开发机器人物理仿真游戏，从简单的机械臂到复杂的无人机飞行模拟。',
    date: '2024-01-10',
    readTime: '15分钟',
    category: '游戏开发',
    icon: Gamepad2,
    color: 'text-fail-green',
    slug: 'unity-robot-simulation'
  },
  {
    id: 3,
    title: '⚡ WebGPU实战：下一代图形API初体验',
    description: '探索WebGPU的强大功能，用它来渲染3D机器人模型和复杂的物理效果。',
    date: '2024-01-05',
    readTime: '18分钟',
    category: 'Web技术',
    icon: Code,
    color: 'text-fail-orange',
    slug: 'webgpu-3d-rendering'
  },
  {
    id: 4,
    title: '🎨 跨界创作：用AI生成游戏素材',
    description: '结合AI技术和游戏开发，探索如何用机器学习生成游戏中的机器人角色和场景。',
    date: '2024-01-01',
    readTime: '10分钟',
    category: 'AI创作',
    icon: Zap,
    color: 'text-fail-pink',
    slug: 'ai-game-assets'
  }
]

export function FeaturedPosts() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 标题 */}
                 <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="text-center mb-12"
         >
           <h2 className="text-3xl md:text-4xl font-bold mb-4 cyber-gradient">
             精选学习笔记
           </h2>
           <p className="text-lg text-gray-400 max-w-3xl mx-auto">
             记录我在跨界探索中的学习心得、踩坑经历和技术思考
           </p>
         </motion.div>

        {/* 文章网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="fail-card group hover:scale-105 transition-all duration-300"
            >
              {/* 文章头部 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <post.icon className={`w-6 h-6 ${post.color} mr-2`} />
                  <span className="text-sm font-medium text-gray-300">
                    {post.category}
                  </span>
                </div>
                <span className="text-xs text-gray-500 bg-cyber-bg-700 px-2 py-1 rounded-full">
                  精选
                </span>
              </div>

              {/* 文章标题 */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-fail-red transition-colors duration-200 line-clamp-2">
                {post.title}
              </h3>

              {/* 文章描述 */}
              <p className="text-gray-400 mb-4 line-clamp-3 text-sm">
                {post.description}
              </p>

              {/* 文章元信息 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDateShort(post.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
              </div>

              {/* 阅读链接 */}
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-fail-red hover:text-fail-orange transition-colors duration-200 font-medium"
              >
                阅读全文
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.article>
          ))}
        </div>

        {/* 查看更多 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/blog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="fail-button primary large"
            >
              查看更多文章
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          </Link>
        </motion.div>

        {/* 学习理念 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="fail-card inline-block max-w-3xl">
            <h3 className="text-xl font-bold mb-4 cyber-gradient">
              📚 我的学习理念
            </h3>
                         <p className="text-gray-300 leading-relaxed">
               "技术学习不应该枯燥乏味。我用跨界的方式记录每一次探索，
               用游戏化的思维理解复杂概念，用创新的方式寻找技术灵感。
               在这里，你会看到真实的学习过程，包括那些令人兴奋的突破和令人深思的思考。"
             </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
