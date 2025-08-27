'use client'

import { motion } from 'framer-motion'
import { Lightbulb, Target, Heart, Zap, Users, Globe } from 'lucide-react'

export function AboutPhilosophy() {
  const philosophies = [
    {
      icon: Lightbulb,
      title: '💡 跨界思维',
      description: '不同技术领域的交叉融合往往能产生意想不到的创新',
      color: 'text-fail-red',
      details: [
        '机器人技术与游戏开发的结合',
        'AI算法在Web应用中的实践',
        '3D图形技术与用户体验的融合'
      ]
    },
    {
      icon: Target,
      title: '🎯 持续学习',
      description: '技术世界日新月异，保持学习热情是成长的关键',
      color: 'text-fail-orange',
      details: [
        '每周至少学习一项新技术',
        '参与开源项目和技术社区',
        '记录学习心得和踩坑经验'
      ]
    },
    {
      icon: Heart,
      title: '❤️ 用户至上',
      description: '技术服务于人，用户体验永远是第一位的',
      color: 'text-fail-pink',
      details: [
        '以用户需求为导向的设计',
        '简洁直观的交互体验',
        '性能优化和可访问性'
      ]
    },
    {
      icon: Zap,
      title: '⚡ 快速迭代',
      description: '小步快跑，快速验证，从错误中学习，在实践中成长',
      color: 'text-fail-green',
      details: [
        '敏捷开发方法论',
        'MVP快速原型验证',
        '持续集成和部署'
      ]
    },
    {
      icon: Users,
      title: '🤝 开放协作',
      description: '技术不是孤岛，开放分享才能推动整个行业进步',
      color: 'text-fail-blue',
      details: [
        '开源代码和技术分享',
        '技术博客和教程创作',
        '社区贡献和知识传播'
      ]
    },
    {
      icon: Globe,
      title: '🌍 技术普惠',
      description: '让技术变得简单易懂，降低学习门槛，让更多人受益',
      color: 'text-fail-purple',
      details: [
        '通俗易懂的技术讲解',
        '游戏化的学习方式',
        '免费的技术教育资源'
      ]
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 cyber-gradient">
            🎭 我的技术哲学
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            技术不仅仅是工具，更是一种思维方式和生活态度。这些理念指导着我的每一次技术探索
          </p>
        </motion.div>

        {/* 哲学网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {philosophies.map((philosophy, index) => (
            <motion.div
              key={philosophy.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="fail-card group hover:scale-105 transition-all duration-300"
            >
              {/* 图标和标题 */}
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${philosophy.color} bg-cyber-bg-700 rounded-lg flex items-center justify-center mr-4`}>
                  <philosophy.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{philosophy.title}</h3>
              </div>

              {/* 描述 */}
              <p className="text-gray-400 mb-4 leading-relaxed">
                {philosophy.description}
              </p>

              {/* 详细内容 */}
              <div className="space-y-2">
                {philosophy.details.map((detail, detailIndex) => (
                  <motion.div
                    key={detailIndex}
                    className="flex items-start space-x-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + detailIndex * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className={`w-1.5 h-1.5 ${philosophy.color.replace('text-', 'bg-')} rounded-full mt-2 flex-shrink-0`} />
                    <span className="text-sm text-gray-300">{detail}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 个人宣言 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="fail-card inline-block max-w-4xl">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-4 cyber-gradient">
              跨界探索者的宣言
            </h3>
            <div className="text-lg text-gray-300 leading-relaxed mb-6">
              "技术学习不应该有门槛。从机器人编程到游戏开发，从AI算法到内容创作，
              我用跨界的方式探索每一个技术领域。每一次尝试都是成长，每一次失败都是经验。
              我相信，通过持续的学习和分享，我们可以让技术变得更加有趣和有用。"
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-fail-red/20 text-fail-red rounded-full text-sm font-medium">
                #跨界探索
              </span>
              <span className="px-4 py-2 bg-fail-blue/20 text-fail-blue rounded-full text-sm font-medium">
                #技术分享
              </span>
              <span className="px-4 py-2 bg-fail-green/20 text-fail-green rounded-full text-sm font-medium">
                #持续学习
              </span>
              <span className="px-4 py-2 bg-fail-purple/20 text-fail-purple rounded-full text-sm font-medium">
                #开放协作
              </span>
            </div>
          </div>
        </motion.div>

        {/* 联系信息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">
            如果你也对跨界技术探索感兴趣，欢迎与我交流
          </p>
          <div className="flex justify-center space-x-6">
            <motion.a
              href="mailto:junli440883@gmail.com"
              className="fail-button primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              发送邮件
            </motion.a>
            <motion.a
              href="https://github.com/LJoson"
              target="_blank"
              rel="noopener noreferrer"
              className="fail-button secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              查看GitHub
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
