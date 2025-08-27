'use client'

import { motion } from 'framer-motion'
import {
  Github,
  Twitter,
  Youtube,
  Instagram,
  MessageCircle,
  ExternalLink,
  Globe,
  BookOpen
} from 'lucide-react'
import Link from 'next/link'

const socialPlatforms = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/LJoson',
    color: '#333',
    description: '开源项目和技术分享',
    followers: '80+ repos'
  },
  {
    name: 'YouTube',
    icon: Youtube,
    url: 'https://www.youtube.com/@L-Joson',
    color: '#FF0000',
    description: '技术视频和教程分享',
    followers: '技术分享'
  },
  {
    name: 'B站',
    icon: MessageCircle,
    url: 'https://space.bilibili.com/362176684',
    color: '#00A1D6',
    description: '技术视频和教程分享',
    followers: '技术内容'
  },
  {
    name: '小红书',
    icon: Instagram,
    url: 'https://xhslink.com/m/4WbYToeY64a',
    color: '#FF2442',
    description: '技术笔记和生活分享',
    followers: '学习笔记'
  },
  {
    name: '抖音',
    icon: Youtube,
    url: 'https://www.douyin.com/user/MS4wLjABAAAAd6lG62HOZHLSYzcK7EOCL-Hjd8EgOEPr9slUTY3rykDlmZgP7F1rm0jIxhmtwoXh',
    color: '#000000',
    description: '短视频技术分享',
    followers: '技术短视频'
  },
  {
    name: '知乎',
    icon: MessageCircle,
    url: 'https://www.zhihu.com/people/LJoson',
    color: '#0084FF',
    description: '技术问答和深度文章',
    followers: '技术问答'
  },
  {
    name: 'Twitter',
    icon: Twitter,
    url: 'https://x.com/glimmer_AIlab',
    color: '#1DA1F2',
    description: '技术分享和行业动态',
    followers: '技术动态'
  },
  {
    name: 'CSDN',
    icon: MessageCircle,
    url: 'https://blog.csdn.net/qq_43743037',
    color: '#FC5531',
    description: '技术博客和社区分享',
    followers: '2,244 粉丝'
  }
]

const brandLinks = [
  {
    name: '🎯 个人项目',
    description: '从机器人仿真到创意设计的跨界项目作品',
    url: '/projects',
    color: '#4ECDC4',
    isExternal: false
  },
  {
    name: '📚 技术博客',
    description: '技术学习笔记和跨界探索心得',
    url: '/blog',
    color: '#FF6B6B',
    isExternal: false
  }
]

export function SocialLinks() {
  return (
    <div className="space-y-16 pb-12">
      {/* 社交平台 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 cyber-gradient">
          🌐 社交网络
        </h2>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">
          在各个平台上分享技术心得和跨界探索，欢迎关注交流！
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {socialPlatforms.map((platform, index) => (
          <motion.a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="fail-card group hover:scale-105 transition-all duration-300 h-48 flex flex-col justify-between"
          >
            <div className="flex items-center mb-4">
              <platform.icon
                className="w-10 h-10 mr-4"
                style={{ color: platform.color }}
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{platform.name}</h3>
                <p className="text-sm text-gray-500">{platform.followers}</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-4 flex-1">
              {platform.description}
            </p>

            <div className="flex items-center text-fail-red group-hover:text-fail-orange transition-colors duration-200">
              <span className="text-sm font-medium">关注我</span>
              <ExternalLink className="w-4 h-4 ml-2" />
            </div>
          </motion.a>
        ))}
      </div>

      {/* 品牌链接 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center mt-20"
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-10 cyber-gradient">
          🎯 更多探索
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {brandLinks.map((brand, index) => (
            <motion.a
              key={brand.name}
              href={brand.url}
              target={brand.isExternal ? "_blank" : "_self"}
              rel={brand.isExternal ? "noopener noreferrer" : ""}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="fail-card group hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-fail-red h-32 flex items-center"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-3" style={{ color: brand.color }}>
                    {brand.name}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {brand.description}
                  </p>
                </div>
                {brand.isExternal && (
                  <ExternalLink className="w-6 h-6 text-fail-red group-hover:text-fail-orange transition-colors duration-200 ml-4" />
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* 联系信息 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="text-center mt-20 mb-8"
      >
                        <div className="fail-card inline-block max-w-2xl bg-gradient-to-br from-cyber-bg-800 to-cyber-bg-900 border border-cyber-bg-600 hover:border-fail-red/30 transition-all duration-300">
          <div className="p-4">
            <div className="flex items-center justify-center mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-fail-red to-fail-orange rounded-full flex items-center justify-center mr-2">
                <span className="text-lg">💬</span>
              </div>
              <h3 className="text-lg font-bold cyber-gradient">联系我</h3>
            </div>

            <p className="text-gray-300 text-sm mb-4 text-center">
              欢迎交流技术心得和合作机会！
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div className="flex items-center justify-center p-2 bg-cyber-bg-700 rounded-lg hover:bg-cyber-bg-600 transition-colors duration-200">
                <a
                  href="mailto:junli440883@gmail.com"
                  className="flex items-center text-fail-red hover:text-fail-orange transition-colors duration-200 text-xs font-medium"
                >
                  <span className="mr-1">📧</span>
                  junli440883@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center p-2 bg-cyber-bg-700 rounded-lg hover:bg-cyber-bg-600 transition-colors duration-200">
                <span className="flex items-center text-gray-300 text-xs font-medium">
                  <span className="mr-1">💬</span>
                  微信: LJoson_1
                </span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-400 text-xs">
                期待与你一起在技术探索的道路上相遇！
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
