'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Play, Code, Gamepad2, Brain, Globe } from 'lucide-react'

// 模拟项目数据
const projects = [
  {
    id: 1,
    title: '🤡 技术废柴个人站点',
    description: '基于Next.js 14的现代化个人站点，集成了Three.js、WebGPU、WebAudio等前沿技术，完美体现技术废柴IP特色。',
    category: 'Web开发',
    tags: ['Next.js', 'TypeScript', 'Three.js', 'WebGPU'],
    image: '/images/projects/personal-site.jpg',
    liveUrl: 'https://ljoson.com',
            githubUrl: 'https://github.com/LJoson/personal-site',
    featured: true,
    icon: Globe
  },
  {
    id: 2,
    title: '🎮 废柴冒险记',
    description: '一个基于Unity开发的2D平台跳跃游戏，讲述一个技术废柴在代码世界中冒险的故事。虽然游戏很简单，但充满了废柴的幽默感。',
    category: '游戏开发',
    tags: ['Unity', 'C#', '2D游戏', '平台跳跃'],
    image: '/images/projects/fail-adventure.jpg',
    liveUrl: 'https://itch.io/fail-adventure',
            githubUrl: 'https://github.com/LJoson/fail-adventure',
    featured: true,
    icon: Gamepad2
  },
  {
    id: 3,
    title: '🤖 AI废柴助手',
    description: '基于OpenAI API开发的智能助手，专门为技术废柴提供编程帮助和代码审查。它理解废柴的思维方式，给出更接地气的建议。',
    category: 'AI应用',
    tags: ['OpenAI', 'Python', 'FastAPI', 'React'],
    image: '/images/projects/ai-assistant.jpg',
    liveUrl: 'https://ai-fail-assistant.vercel.app',
            githubUrl: 'https://github.com/LJoson/ai-assistant',
    featured: false,
    icon: Brain
  },
  {
    id: 4,
    title: '💻 废柴代码编辑器',
    description: '一个专为技术废柴设计的代码编辑器，集成了智能提示、错误检测、代码美化等功能。界面简洁，功能强大，让编程变得更轻松。',
    category: '桌面应用',
    tags: ['Electron', 'TypeScript', 'Monaco Editor'],
    image: '/images/projects/code-editor.jpg',
    liveUrl: null,
            githubUrl: 'https://github.com/LJoson/code-editor',
    featured: false,
    icon: Code
  },
  {
    id: 5,
    title: '🎨 3D废柴世界',
    description: '使用Three.js和WebGPU开发的3D交互式网站，展示了一个充满废柴元素的虚拟世界。用户可以在这个世界中探索和互动。',
    category: 'Web开发',
    tags: ['Three.js', 'WebGPU', 'WebGL', '3D'],
    image: '/images/projects/3d-world.jpg',
    liveUrl: 'https://3d-fail-world.vercel.app',
            githubUrl: 'https://github.com/LJoson/3d-world',
    featured: false,
    icon: Globe
  },
  {
    id: 6,
    title: '📱 废柴学习App',
    description: '一个移动端学习应用，专门为技术废柴设计。包含编程教程、实战项目、社区交流等功能，让学习变得更有趣。',
    category: '移动开发',
    tags: ['React Native', 'TypeScript', 'Firebase'],
    image: '/images/projects/learning-app.jpg',
    liveUrl: null,
            githubUrl: 'https://github.com/LJoson/learning-app',
    featured: false,
    icon: Code
  }
]

export function ProjectGrid() {
  return (
    <div className="space-y-8">
      {/* 特色项目 */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center cyber-gradient">
          ⭐ 特色项目
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.filter(project => project.featured).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="fail-card group hover:scale-105 transition-all duration-300 border-2 border-fail-red/20"
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-fail-red/20 text-fail-red text-sm font-medium rounded-full">
                  ⭐ 特色项目
                </span>
                <span className="inline-block px-3 py-1 bg-cyber-bg-700 text-gray-300 text-sm font-medium rounded-full ml-2">
                  {project.category}
                </span>
              </div>

              <div className="flex items-center mb-4">
                <project.icon className="w-8 h-8 text-fail-red mr-3" />
                <h3 className="text-xl font-bold group-hover:text-fail-red transition-colors duration-200">
                  {project.title}
                </h3>
              </div>

              <p className="text-gray-400 mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="tag text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-fail-red hover:text-fail-orange transition-colors duration-200 font-medium"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    在线预览
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-fail-red hover:text-fail-orange transition-colors duration-200 font-medium"
                >
                  <Github className="w-4 h-4 mr-1" />
                  查看源码
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 其他项目 */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center cyber-gradient">
          🚀 更多项目
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.filter(project => !project.featured).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="fail-card group hover:scale-105 transition-all duration-300"
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-cyber-bg-700 text-gray-300 text-sm font-medium rounded-full">
                  {project.category}
                </span>
              </div>

              <div className="flex items-center mb-3">
                <project.icon className="w-6 h-6 text-fail-red mr-2" />
                <h3 className="text-lg font-bold group-hover:text-fail-red transition-colors duration-200">
                  {project.title}
                </h3>
              </div>

              <p className="text-gray-400 mb-4 line-clamp-2 text-sm">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {project.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="tag text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-fail-red hover:text-fail-orange transition-colors duration-200 font-medium text-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    预览
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-fail-red hover:text-fail-orange transition-colors duration-200 font-medium text-sm"
                >
                  <Github className="w-4 h-4 mr-1" />
                  源码
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 更多项目链接 */}
      <div className="text-center mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="fail-card inline-block"
        >
          <p className="text-lg font-medium mb-2">🔗 更多项目</p>
          <p className="text-gray-400 text-sm mb-4">
            更多项目请访问我的 GitHub 主页
          </p>
          <a
                            href="https://github.com/LJoson"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center fail-button primary"
          >
            <Github className="w-4 h-4 mr-2" />
            查看 GitHub
          </a>
        </motion.div>
      </div>
    </div>
  )
}
