'use client'

import Link from 'next/link'
import { Heart, Github, Twitter, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      className="bg-cyber-bg-800/90 backdrop-blur-sm border-t border-cyber-bg-700 relative z-35"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌信息 */}
          <div className="col-span-1 md:col-span-2">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="text-2xl font-bold cyber-gradient">
                  🚀 "废柴"探索者
                </div>
              </Link>
            </motion.div>
            <p className="text-gray-400 mb-4 max-w-md">
              从技术"废柴"到跨界探索者的进化之路！从机器人到游戏，从代码到内容创作，用技术点亮创意！
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/LJoson"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-fail-red transition-colors duration-200"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://x.com/glimmer_AIlab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-fail-red transition-colors duration-200"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:junli440883@gmail.com"
                className="text-gray-400 hover:text-fail-red transition-colors duration-200"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <motion.h3
              className="text-lg font-semibold mb-4 neon-text"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              快速链接
            </motion.h3>
            <ul className="space-y-2">
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link href="/blog" className="text-gray-400 hover:text-fail-red transition-colors duration-200">
                  博客
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link href="/projects" className="text-gray-400 hover:text-fail-red transition-colors duration-200">
                  个人项目
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link href="/glimmerlab" className="text-gray-400 hover:text-fail-red transition-colors duration-200">
                  品牌项目
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link href="/about" className="text-gray-400 hover:text-fail-red transition-colors duration-200">
                  关于
                </Link>
              </motion.li>
            </ul>
          </div>

          {/* 技术栈 */}
          <div>
            <motion.h3
              className="text-lg font-semibold mb-4 neon-text"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              技术栈
            </motion.h3>
            <ul className="space-y-2">
              <motion.li className="text-gray-400" whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>🤖 AI & 机器学习</motion.li>
              <motion.li className="text-gray-400" whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>🎮 游戏开发</motion.li>
              <motion.li className="text-gray-400" whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>💻 Web技术</motion.li>
              <motion.li className="text-gray-400" whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>🎨 动画与交互</motion.li>
            </ul>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="border-t border-cyber-bg-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} LJoson 的"废柴"小窝. 保留所有权利.
          </p>
          <div className="text-gray-400 text-sm flex items-center mt-2 md:mt-0">
            <span>Made with </span>
            <motion.div whileHover={{ scale: 1.2 }}>
              <Heart className="w-4 h-4 mx-1 text-fail-red" />
            </motion.div>
            <span> by LJoson</span>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
