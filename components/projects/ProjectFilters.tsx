'use client'

import { motion } from 'framer-motion'
import { Filter, Code, Gamepad2, Brain, Globe, Smartphone, Monitor } from 'lucide-react'

const categories = [
  { id: 'all', name: '全部项目', icon: Filter, count: 15 },
  { id: 'web', name: 'Web开发', icon: Globe, count: 6 },
  { id: 'game', name: '游戏开发', icon: Gamepad2, count: 3 },
  { id: 'ai', name: 'AI应用', icon: Brain, count: 2 },
  { id: 'mobile', name: '移动开发', icon: Smartphone, count: 2 },
  { id: 'desktop', name: '桌面应用', icon: Monitor, count: 2 }
]

export function ProjectFilters() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fail-card"
    >
      <h3 className="text-lg font-bold mb-6 flex items-center">
        <Filter className="w-5 h-5 mr-2 text-fail-red" />
        项目分类
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group relative p-4 rounded-lg bg-cyber-bg-700 hover:bg-cyber-bg-600 border border-cyber-bg-600 hover:border-fail-red transition-all duration-300 text-center"
          >
            <category.icon className="w-6 h-6 mx-auto mb-2 text-fail-red group-hover:text-fail-orange transition-colors" />
            <div className="text-sm font-medium text-white group-hover:text-fail-red transition-colors">
              {category.name}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {category.count} 个项目
            </div>

            {/* 选中状态指示器 */}
            {category.id === 'all' && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-fail-red rounded-full"></div>
            )}
          </motion.button>
        ))}
      </div>

      {/* 技术栈标签 */}
      <div className="mt-8">
        <h4 className="text-md font-bold mb-4">技术栈筛选</h4>
        <div className="flex flex-wrap gap-2">
          {['React', 'TypeScript', 'Unity', 'Python', 'Next.js', 'Three.js', 'WebGPU', 'AI/ML'].map((tech, index) => (
            <motion.button
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
              className="tag text-xs cursor-pointer hover:bg-fail-red hover:text-white transition-colors"
            >
              {tech}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
