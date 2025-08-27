'use client'

import { motion } from 'framer-motion'
import { Rocket, Github, ExternalLink, Star, Users, Code } from 'lucide-react'

export function ProjectHero() {
  const stats = [
    { icon: Rocket, label: '跨界项目', value: '15+', description: '涵盖多个技术领域' },
    { icon: Github, label: '开源贡献', value: '50+', description: 'GitHub星标和贡献' },
    { icon: Users, label: '技术分享', value: '100+', description: '技术文章和教程' },
    { icon: Star, label: '项目亮点', value: '∞', description: '持续创新探索' }
  ]

  const categories = [
    { name: '🤖 机器人仿真', count: 4, color: 'text-fail-blue' },
    { name: '🎮 游戏开发', count: 6, color: 'text-fail-green' },
    { name: '💻 Web应用', count: 8, color: 'text-fail-orange' },
    { name: '🧠 AI算法', count: 3, color: 'text-fail-purple' },
    { name: '🎨 创意设计', count: 5, color: 'text-fail-pink' }
  ]

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-fail-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-fail-blue/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fail-purple/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* 主标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 cyber-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🚀 跨界项目作品集
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            从机器人仿真到游戏开发，从Web应用到AI算法，从创意设计到性能优化，
            <br />
            每一个项目都是跨界探索的见证，每一次实践都是技术成长的足迹
          </motion.p>
        </motion.div>

        {/* 统计信息 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-cyber-bg-800/50 backdrop-blur-sm border border-cyber-bg-700 rounded-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex justify-center mb-3">
                <stat.icon className="w-8 h-8 text-fail-red" />
              </div>
              <div className="text-2xl md:text-3xl font-bold cyber-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-white font-medium mb-1">{stat.label}</div>
              <div className="text-sm text-gray-400">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* 项目分类 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-center mb-8 cyber-gradient">
            🎯 项目分类
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                className="text-center p-4 bg-cyber-bg-800/30 backdrop-blur-sm border border-cyber-bg-700 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(31, 41, 55, 0.5)' }}
              >
                <div className={`text-lg font-semibold mb-2 ${category.color}`}>
                  {category.name}
                </div>
                <div className="text-2xl font-bold text-white">
                  {category.count}
                </div>
                <div className="text-sm text-gray-400">个项目</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 项目理念 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="fail-card inline-block max-w-4xl">
            <div className="text-3xl mb-4">💡</div>
            <h3 className="text-xl font-bold mb-4 cyber-gradient">
              跨界项目开发理念
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="text-lg font-semibold text-fail-red mb-2">🎨 创新设计</h4>
                <p className="text-gray-400 text-sm">
                  将不同技术领域的优势结合，创造独特的用户体验
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-fail-green mb-2">⚡ 技术实践</h4>
                <p className="text-gray-400 text-sm">
                  用最新的技术栈解决实际问题，验证技术可行性
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-fail-blue mb-2">🤝 开源分享</h4>
                <p className="text-gray-400 text-sm">
                  开源项目代码，分享技术经验，推动社区发展
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 快速链接 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex justify-center space-x-6 mt-12"
        >
          <motion.a
            href="https://github.com/LJoson"
            target="_blank"
            rel="noopener noreferrer"
            className="fail-button primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5 mr-2" />
            查看GitHub
          </motion.a>
          <motion.a
            href="/blog"
            className="fail-button secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Code className="w-5 h-5 mr-2" />
            技术博客
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
