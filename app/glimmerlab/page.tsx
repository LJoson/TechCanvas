'use client'

import { motion } from 'framer-motion'
import { Sparkles, ExternalLink, ArrowRight, ArrowLeft, Github, Globe, Users, Award } from 'lucide-react'
import { RobotIcon, GameIcon, DesignIcon, ChipIcon, NetworkIcon } from '@/components/ui/SvgIcons'
import Link from 'next/link'

export default function GlimmerLabPage() {
  return (
    <div className="min-h-screen bg-cyber-bg-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 返回按钮 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/">
            <button className="inline-flex items-center text-fail-red hover:text-fail-orange transition-colors duration-200 font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </button>
          </Link>
        </motion.div>

        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 cyber-gradient">
            ✨ GlimmerLab 创意工作室
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            探索AI应用与机器人技术的未来，专注于智能科技研究与工具开发
            <br />
            在这里，我们用技术点亮创意，让想法闪闪发光
          </p>
        </motion.div>

        {/* 工作室介绍 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="fail-card mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 cyber-gradient">关于 GlimmerLab</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  GlimmerLab 是我创立的智能科技实验室，专注于AI应用与机器人技术的研究与开发。
                  在这里，我们用技术点亮创意，让想法闪闪发光。每一个项目都是技术探索的尝试，
                  从大语言模型应用到芯片架构设计，从机器人操作技术到智能工具开发。
                </p>
                <p>
                  我们致力于探索前沿技术领域，包括芯片架构设计、深度学习优化、机器人技术等，
                  不断扩展技术边界，在AI与机器人之间寻找完美的平衡点。
                </p>
                <div className="bg-cyber-bg-700/50 border border-cyber-bg-600 rounded-lg p-4 mt-6">
                  <p className="text-sm text-gray-400 italic">
                    💡 <strong>工作室理念：</strong>风起于青萍之末，浪成于微澜之间。
                    GlimmerLab 既是创意工作室，也是技术探索平台，我们不断调整完善，
                    在创意与技术之间寻找完美的平衡点。
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-6 bg-cyber-bg-700/50 rounded-lg">
                <Users className="w-8 h-8 text-fail-blue mx-auto mb-3" />
                <h3 className="font-bold mb-2">技术探索</h3>
                <p className="text-sm text-gray-400">AI、机器人、芯片多领域研究</p>
              </div>
              <div className="text-center p-6 bg-cyber-bg-700/50 rounded-lg">
                <Award className="w-8 h-8 text-fail-green mx-auto mb-3" />
                <h3 className="font-bold mb-2">实用工具</h3>
                <p className="text-sm text-gray-400">职多多、今日Paper、ModelFlow</p>
              </div>
              <div className="text-center p-6 bg-cyber-bg-700/50 rounded-lg">
                <Globe className="w-8 h-8 text-fail-purple mx-auto mb-3" />
                <h3 className="font-bold mb-2">前沿技术</h3>
                <p className="text-sm text-gray-400">大语言模型、芯片架构、机器人</p>
              </div>
              <div className="text-center p-6 bg-cyber-bg-700/50 rounded-lg">
                <Github className="w-8 h-8 text-fail-red mx-auto mb-3" />
                <h3 className="font-bold mb-2">开源精神</h3>
                <p className="text-sm text-gray-400">技术分享与社区建设</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 核心业务 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center cyber-gradient">核心业务</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="fail-card text-center">
              <RobotIcon className="w-16 h-16 text-fail-blue mx-auto mb-4" animated={true} />
              <h3 className="text-xl font-bold mb-4">AI与机器人技术</h3>
              <div className="space-y-3 text-gray-400">
                <p>• 大语言模型应用</p>
                <p>• 运动控制技术</p>
                <p>• 机器人操作技术</p>
                <p>• 智能算法优化</p>
              </div>
            </div>
            <div className="fail-card text-center">
              <GameIcon className="w-16 h-16 text-fail-green mx-auto mb-4" animated={true} />
              <h3 className="text-xl font-bold mb-4">芯片与编译优化</h3>
              <div className="space-y-3 text-gray-400">
                <p>• AI芯片架构设计</p>
                <p>• 深度学习框架优化</p>
                <p>• 模型压缩与量化</p>
                <p>• 性能调优技术</p>
              </div>
            </div>
            <div className="fail-card text-center">
              <DesignIcon className="w-16 h-16 text-fail-purple mx-auto mb-4" animated={true} />
              <h3 className="text-xl font-bold mb-4">智能工具开发</h3>
              <div className="space-y-3 text-gray-400">
                <p>• 职多多求职助手</p>
                <p>• 今日Paper学术工具</p>
                <p>• ModelFlow模型转换</p>
                <p>• 实用工具开发</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 技术探索 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center cyber-gradient">前沿技术探索</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="fail-card">
              <div className="flex items-center mb-4">
                <ChipIcon className="w-8 h-8 text-fail-blue mr-3" animated={true} />
                <h3 className="text-xl font-bold">芯片架构与设计</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                探索新一代AI芯片架构，优化计算效率。我们深入研究神经网络加速器设计、
                内存层次结构优化、以及低功耗设计技术，为AI应用提供更高效的硬件支持。
              </p>
            </div>
            <div className="fail-card">
              <div className="flex items-center mb-4">
                <NetworkIcon className="w-8 h-8 text-fail-green mr-3" animated={true} />
                <h3 className="text-xl font-bold">网络与编译优化</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                深度学习框架优化，提升模型性能。我们专注于模型压缩、量化技术、
                自动微分优化，以及分布式训练框架的改进，让AI模型运行更快速、更高效。
              </p>
            </div>
          </div>
        </motion.div>

        {/* 项目展示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center cyber-gradient">精选项目</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="fail-card">
              <div className="h-48 bg-gradient-to-br from-fail-blue/20 to-fail-purple/20 rounded-lg mb-4 flex items-center justify-center">
                <RobotIcon className="w-16 h-16 text-fail-blue" animated={true} />
              </div>
              <h3 className="text-lg font-bold mb-2">职多多</h3>
              <p className="text-gray-400 text-sm mb-4">
                为求职者提供全方位的智能支持，包括专业知识库、AI智能辅导、知识卡片、双语学习
              </p>
              <span className="inline-block px-3 py-1 bg-fail-blue/20 text-fail-blue text-sm rounded-full">
                求职助手
              </span>
            </div>
            <div className="fail-card">
              <div className="h-48 bg-gradient-to-br from-fail-green/20 to-fail-blue/20 rounded-lg mb-4 flex items-center justify-center">
                <GameIcon className="w-16 h-16 text-fail-green" animated={true} />
              </div>
              <h3 className="text-lg font-bold mb-2">今日Paper</h3>
              <p className="text-gray-400 text-sm mb-4">
                提升学术研究效率的智能工具，包括实时翻译、智能标注、自动获取、笔记系统
              </p>
              <span className="inline-block px-3 py-1 bg-fail-green/20 text-fail-green text-sm rounded-full">
                学术工具
              </span>
            </div>
            <div className="fail-card">
              <div className="h-48 bg-gradient-to-br from-fail-purple/20 to-fail-red/20 rounded-lg mb-4 flex items-center justify-center">
                <DesignIcon className="w-16 h-16 text-fail-purple" animated={true} />
              </div>
              <h3 className="text-lg font-bold mb-2">ModelFlow</h3>
              <p className="text-gray-400 text-sm mb-4">
                便捷的深度学习模型格式转换工具，支持多格式转换、快速转换、参数优化、准确性验证
              </p>
              <span className="inline-block px-3 py-1 bg-fail-purple/20 text-fail-purple text-sm rounded-full">
                模型转换
              </span>
            </div>
          </div>
        </motion.div>

        {/* 行动区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <div className="fail-card max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 cyber-gradient">加入我们的创意之旅</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              想要了解更多项目详情、技术分享，或者有合作意向？
              欢迎访问我们的官方网站，探索更多精彩内容！
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              <motion.a
                href="mailto:glimmerlab.team@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center fail-button secondary"
              >
                联系我们
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
