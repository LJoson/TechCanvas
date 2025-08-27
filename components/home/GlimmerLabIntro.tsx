'use client'

import { motion } from 'framer-motion'
import { Sparkles, ExternalLink, ArrowRight } from 'lucide-react'
import { RobotIcon, GameIcon, DesignIcon } from '@/components/ui/SvgIcons'
import Link from 'next/link'

export function GlimmerLabIntro() {
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
            ✨ GlimmerLab 创意工作室
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            探索AI应用与机器人技术的未来，专注于智能科技研究与工具开发
          </p>
        </motion.div>

        {/* 核心业务展示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="fail-card max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <RobotIcon className="w-12 h-12 text-fail-blue mx-auto mb-4" animated={true} />
              <h3 className="text-lg font-bold mb-2">AI与机器人技术</h3>
              <p className="text-gray-400 text-sm">
                大语言模型应用、运动控制、机器人操作技术
              </p>
            </div>
            <div className="text-center">
              <GameIcon className="w-12 h-12 text-fail-green mx-auto mb-4" animated={true} />
              <h3 className="text-lg font-bold mb-2">芯片与编译优化</h3>
              <p className="text-gray-400 text-sm">
                AI芯片架构设计、深度学习框架优化
              </p>
            </div>
            <div className="text-center">
              <DesignIcon className="w-12 h-12 text-fail-purple mx-auto mb-4" animated={true} />
              <h3 className="text-lg font-bold mb-2">智能工具开发</h3>
              <p className="text-gray-400 text-sm">
                职多多、今日Paper、ModelFlow等实用工具
              </p>
            </div>
          </div>

          {/* 工作室理念 */}
          <div className="bg-cyber-bg-700/50 border border-cyber-bg-600 rounded-lg p-6 mb-8">
            <p className="text-gray-300 text-center leading-relaxed">
              <strong className="text-fail-red">风起于青萍之末，浪成于微澜之间。</strong>
              <br />
              GlimmerLab 既是创意工作室，也是技术探索平台，我们不断调整完善，
              在创意与技术之间寻找完美的平衡点。
            </p>
          </div>

          {/* 行动按钮 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="https://glimmerlab.top"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center fail-button primary"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              访问 GlimmerLab 官网
              <ExternalLink className="w-5 h-5 ml-2" />
            </motion.a>

            <Link href="/glimmerlab">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center fail-button secondary"
              >
                了解更多
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
