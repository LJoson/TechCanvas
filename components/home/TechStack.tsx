'use client'

import { motion } from 'framer-motion'
import { Brain, Gamepad2, Code, Zap, Cpu, Palette, ArrowRight, User } from 'lucide-react'
import Link from 'next/link'

const techCategories = [
  {
    name: '🤖 机器人仿真',
    icon: Brain,
    color: 'text-fail-blue',
    skills: [
      { name: '物理仿真', level: 85, description: 'MuJoCo/物理引擎' },
      { name: '无人机仿真', level: 80, description: 'AirSim/飞行仿真' },
      { name: '机器人系统', level: 75, description: 'ROS/机器人控制' },
      { name: 'Unity仿真', level: 70, description: 'Unity3D/物理仿真' }
    ]
  },
  {
    name: '🎮 游戏开发',
    icon: Gamepad2,
    color: 'text-fail-green',
    skills: [
      { name: '虚幻引擎', level: 90, description: 'UE5/游戏引擎' },
      { name: 'Unity引擎', level: 85, description: 'Unity3D/3D游戏' },
      { name: '游戏编程', level: 80, description: 'C++/游戏开发' },
      { name: 'Web3D', level: 70, description: 'Three.js/Web游戏' }
    ]
  },
  {
    name: '🧠 AI & 机器学习',
    icon: Cpu,
    color: 'text-fail-cyan',
    skills: [
      { name: 'AI算法', level: 85, description: 'Python/机器学习' },
      { name: '深度学习', level: 75, description: 'TensorFlow/神经网络' },
      { name: '计算机视觉', level: 80, description: 'OpenCV/图像处理' },
      { name: '硬件编程', level: 75, description: 'Arduino/嵌入式AI' }
    ]
  },
  {
    name: '💻 Web技术',
    icon: Code,
    color: 'text-fail-orange',
    skills: [
      { name: '前端框架', level: 90, description: 'React/现代前端' },
      { name: '全栈框架', level: 85, description: 'Next.js/SSR/SSG' },
      { name: '类型安全', level: 80, description: 'TypeScript/类型系统' },
      { name: '样式框架', level: 85, description: 'Tailwind CSS/原子化CSS' }
    ]
  },
  {
    name: '⚡ 性能优化',
    icon: Zap,
    color: 'text-fail-pink',
    skills: [
      { name: '高性能编程', level: 70, description: 'C++/系统级优化' },
      { name: '浏览器性能', level: 65, description: 'WebAssembly/原生性能' },
      { name: '多线程', level: 75, description: 'Web Workers/并发处理' },
      { name: '性能调优', level: 80, description: '算法优化/性能分析' }
    ]
  },
  {
    name: '🎨 创意设计',
    icon: Palette,
    color: 'text-fail-purple',
    skills: [
      { name: 'UI/UX设计', level: 75, description: '用户体验设计' },
      { name: '动画制作', level: 70, description: '动效设计/After Effects' },
      { name: '3D建模', level: 65, description: 'Maya/C4D/Blender' },
      { name: '视觉特效', level: 70, description: 'Houdini/JangaFX系列' }
    ]
  }
]

export function TechStack() {
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
            🛠️ 我的技术武器库
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            从机器人编程到游戏开发，从Web技术到AI算法，这些是我在跨界探索中积累的技术栈
          </p>
        </motion.div>

        {/* 技术栈网格 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="fail-card"
            >
              {/* 分类标题 */}
              <div className="flex items-center mb-6">
                <category.icon className={`w-8 h-8 ${category.color} mr-3`} />
                <h3 className="text-xl font-bold text-white">{category.name}</h3>
              </div>

              {/* 技能列表 */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-white group-hover:text-fail-red transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-xs text-gray-400 ml-2">
                          {skill.description}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400">{skill.level}%</span>
                    </div>

                    {/* 进度条 */}
                    <div className="w-full bg-cyber-bg-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                        className={`h-2 rounded-full ${category.color.replace('text-', 'bg-')} shadow-neon-red`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 了解更多关于我的故事 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Link href="/about">
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="fail-card inline-block max-w-2xl cursor-pointer group"
            >
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-3">
                  <User className="w-8 h-8 text-fail-red" />
                  <div className="text-left">
                    <h3 className="text-2xl font-bold cyber-gradient">
                      了解更多关于我的故事
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      探索我的成长历程、技术哲学和跨界探索之路
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-fail-red group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
