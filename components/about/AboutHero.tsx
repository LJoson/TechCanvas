'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Calendar, Github, Twitter, Youtube } from 'lucide-react'

export function AboutHero() {
  const personalInfo = [
    { icon: Mail, label: '邮箱', value: 'junli440883@gmail.com' },
    { icon: MapPin, label: '位置', value: '中国 · 杭州' },
    { icon: Calendar, label: '生日', value: '1999年' },
    { icon: Github, label: 'GitHub', value: '@LJoson' }
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/LJoson', label: 'GitHub' },
    { icon: Twitter, href: 'https://x.com/glimmer_AIlab', label: 'Twitter' },
    { icon: Youtube, href: 'https://www.youtube.com/@L-Joson', label: 'YouTube' }
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 左侧：个人信息 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6 cyber-gradient"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                🚀 LJoson
              </motion.h1>
              <motion.p
                className="text-2xl md:text-3xl font-semibold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                跨界探索者
              </motion.p>
              <motion.p
                className="text-lg text-gray-400 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                才疏学浅的跨界探索者，致力于构建从芯片仿真设计到上层应用的全链路开发能力。
                从机器人编程到游戏开发，从Web技术到AI算法，我用跨界思维探索技术的无限可能。
                每一个项目都是一次冒险，每一次失败都是一次成长。
              </motion.p>
            </div>

            {/* 基本信息 */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">基本信息</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {personalInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    className="flex items-center space-x-3 p-3 bg-cyber-bg-800/50 backdrop-blur-sm border border-cyber-bg-700 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <info.icon className="w-5 h-5 text-fail-red" />
                    <div>
                      <div className="text-sm text-gray-400">{info.label}</div>
                      <div className="text-white font-medium">{info.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 社交链接 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">关注我</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-cyber-bg-800/50 backdrop-blur-sm border border-cyber-bg-700 rounded-lg hover:bg-cyber-bg-700 transition-colors duration-200"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    <social.icon className="w-6 h-6 text-fail-red" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* 右侧：头像和装饰 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* 头像 */}
              <motion.div
                className="w-80 h-80 bg-gradient-to-br from-fail-red/20 via-fail-blue/20 to-fail-purple/20 rounded-full p-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-full bg-cyber-bg-800 rounded-full flex items-center justify-center">
                  <div className="text-8xl">🤖</div>
                </div>
              </motion.div>

              {/* 装饰元素 */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-fail-red/20 rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="text-2xl">⚡</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-fail-blue/20 rounded-full flex items-center justify-center"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <div className="text-xl">🎮</div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-8 w-10 h-10 bg-fail-purple/20 rounded-full flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-lg">💻</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
