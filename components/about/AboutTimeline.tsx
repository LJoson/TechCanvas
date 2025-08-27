'use client'

import { motion } from 'framer-motion'
import { Brain, Gamepad2, Code, Zap, Rocket, Award } from 'lucide-react'

export function AboutTimeline() {
  const timelineEvents = [
    {
      year: '2019',
      title: '技术学习起点',
      description: '从传统软件开发转向新兴技术领域，开始跨界学习之旅，立志成为跨界探索者',
      icon: Award,
      color: 'text-fail-yellow',
      achievements: ['编程基础', '算法思维', '技术视野']
    },
    {
      year: '2020',
      title: 'Web技术进阶',
      description: '掌握React、Next.js等现代前端技术，开始全栈开发的学习，从VuePress到Docker，从图像处理到算法竞赛，同时学习Python编程',
      icon: Code,
      color: 'text-fail-orange',
      achievements: ['React生态系统', 'Next.js全栈', '现代前端技术', 'Python编程']
    },
    {
      year: '2021',
      title: '技术深度探索',
      description: '深入计算机视觉、深度学习、嵌入式系统等领域，构建跨平台技术栈',
      icon: Brain,
      color: 'text-fail-blue',
      achievements: ['计算机视觉', '深度学习', '嵌入式开发']
    },
    {
      year: '2022',
      title: '机器人编程',
      description: '专注机器人技术和ROS系统开发，从四足机器人到双足机器人，探索机器人运动控制算法和硬件控制',
      icon: Zap,
      color: 'text-fail-purple',
      achievements: ['ROS系统开发', '机器人控制', '运动算法', '硬件控制']
    },
    {
      year: '2023',
      title: '技术深度探索',
      description: '深入机器人控制、AI算法、图形学等领域，从Vulkan到CUDA，从MPC到强化学习，构建全链路技术能力',
      icon: Brain,
      color: 'text-fail-blue',
      achievements: ['机器人控制算法', 'AI深度学习', '图形学技术']
    },
    {
      year: '2024',
      title: 'GlimmerLab创意工作室',
      description: '创立GlimmerLab创意工作室，专注于机器人仿真、游戏开发和创意设计的跨界融合，同时深入端侧/边缘计算模型部署与算法加速，追求技术深度与创意广度的平衡',
      icon: Rocket,
      color: 'text-fail-red',
      achievements: ['创意工作室', '跨界项目', '技术整合', '边缘计算', '模型部署', '算法加速']
    },
    {
      year: '2025',
      title: '游戏开发与跨界技术融合',
      description: '深入Three.js、WebGPU等前沿技术，开始探索机器人、AI和机器学习以及游戏综合的应用，结合美学创作，构建全栈跨界技术体系',
      icon: Gamepad2,
      color: 'text-fail-green',
      achievements: ['Three.js 3D开发', 'WebGPU图形编程', 'AI游戏融合', '美学创作']
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
            🕐 我的跨界探索之路
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            从Web技术到机器人编程，从AI算法到游戏开发，每一步都是跨界探索，每一次尝试都是技术突破
          </p>
        </motion.div>

        {/* 时间线 */}
        <div className="relative">
          {/* 时间线中心线 */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-fail-red via-fail-blue to-fail-purple" />

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* 时间线节点 */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <motion.div
                    className={`w-12 h-12 ${event.color} bg-cyber-bg-800 border-2 border-current rounded-full flex items-center justify-center`}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <event.icon className="w-6 h-6" />
                  </motion.div>
                </div>

                {/* 内容卡片 */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <motion.div
                    className="fail-card group hover:scale-105 transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`text-2xl font-bold ${event.color} mr-3`}>
                        {event.year}
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {event.title}
                      </h3>
                    </div>

                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {event.description}
                    </p>

                                         {/* 成就标签 */}
                     <div className="flex flex-wrap gap-2">
                       {event.achievements.map((achievement, achievementIndex) => (
                         <motion.span
                           key={achievement}
                           className="inline-block px-3 py-1 bg-cyber-bg-700 text-gray-300 text-sm rounded-full"
                           initial={{ opacity: 0, scale: 0.8 }}
                           whileInView={{ opacity: 1, scale: 1 }}
                           transition={{ duration: 0.5, delay: achievementIndex * 0.1 }}
                           viewport={{ once: true }}
                         >
                           {achievement}
                         </motion.span>
                       ))}
                     </div>


                  </motion.div>
                </div>
              </motion.div>
                         ))}
           </div>
         </div>

         {/* 未来探索提示 - 单独显示在2025年之后 */}
         <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.5 }}
           viewport={{ once: true }}
           className="text-center mt-16"
         >
           <div className="inline-block p-6 bg-cyber-bg-800/50 backdrop-blur-sm border border-cyber-bg-700 rounded-lg">
             <div className="text-2xl mb-2">🚀</div>
             <p className="text-lg font-semibold text-white mb-2">继续探索中...</p>
             <p className="text-gray-400 text-sm">
               技术世界永无止境，我将继续在跨界探索的道路上前进
             </p>
           </div>
         </motion.div>
       </div>
     </section>
   )
 }
