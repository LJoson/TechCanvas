'use client'

import { motion } from 'framer-motion'
import { Cpu, Palette, Camera, Music, Gamepad2, BookOpen, ChefHat, Heart } from 'lucide-react'

export function AboutExpertise() {
  const expertiseAreas = [
    {
      title: '🤖 技术专长',
      icon: Cpu,
      color: 'text-fail-blue',
      items: [
        {
          category: '3D创作专家',
          description: 'Blender玩家，UE5/Unity引擎开发者，专注3D建模与游戏开发'
        },
        {
          category: '编程能手',
          description: '精通C/C++，活跃于开源社区的技术贡献者，追求代码优雅与性能'
        },
        {
          category: '前沿技术探索者',
          description: '专注计算机视觉与机器人技术研发，探索AI与硬件的结合'
        },
        {
          category: '性能优化专家',
          description: '擅长端侧/边缘计算模型部署与算法加速，追求极致性能'
        }
      ]
    },
    {
      title: '🎨 创意生活',
      icon: Palette,
      color: 'text-fail-purple',
      items: [
        {
          category: '数字艺术',
          description: '游戏开发/3D建模/CG动画创作，用技术实现艺术梦想'
        },
        {
          category: '视觉艺术',
          description: '摄影爱好者/数字绘画创作者，捕捉生活中的美好瞬间'
        },
        {
          category: '文化休闲',
          description: '番剧鉴赏/书法研习/音乐欣赏，在艺术中寻找灵感'
        },
        {
          category: '美食达人',
          description: '热衷于探索烹饪艺术与美食文化，享受生活的味道'
        }
      ]
    }
  ]

  const lifePhilosophy = {
    title: '💡 职业信念',
    description: '坚持技术深度与创意广度的平衡发展，追求在工程实现与艺术表达之间的完美结合。有个人的执着，自我价值实现以及目标。',
    principles: [
      {
        icon: Heart,
        title: '跨界融合',
        description: '不同技术领域的交叉融合往往能产生意想不到的创新'
      },
      {
        icon: Gamepad2,
        title: '趣味驱动',
        description: '用游戏化的方式学习技术，让枯燥的代码变得有趣'
      },
             {
         icon: BookOpen,
         title: '持续学习',
         description: '在跨界探索的道路上不断学习，从失败中汲取经验'
       }
    ]
  }

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
            🎯 我的专业领域
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            致力于构建从芯片仿真设计到上层应用的全链路开发能力，追求硬件-软件协同优化的技术闭环
          </p>
        </motion.div>

        {/* 专业领域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {expertiseAreas.map((area, areaIndex) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: areaIndex * 0.2 }}
              viewport={{ once: true }}
              className="fail-card"
            >
              <div className="flex items-center mb-8">
                <area.icon className={`w-10 h-10 ${area.color} mr-4`} />
                <h3 className="text-2xl font-bold text-white">{area.title}</h3>
              </div>

              <div className="space-y-6">
                {area.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.category}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: areaIndex * 0.2 + itemIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <h4 className="text-lg font-semibold text-fail-red mb-2 group-hover:text-fail-orange transition-colors">
                      {item.category}
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 职业信念 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="fail-card max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 cyber-gradient">
              {lifePhilosophy.title}
            </h3>
            <p className="text-lg text-gray-400 leading-relaxed">
              {lifePhilosophy.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lifePhilosophy.principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-cyber-bg-800/50 rounded-lg border border-cyber-bg-700"
              >
                <principle.icon className="w-12 h-12 text-fail-red mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">
                  {principle.title}
                </h4>
                <p className="text-gray-400 text-sm">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 个人宣言 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="fail-card inline-block max-w-4xl">
            <div className="text-6xl mb-6">🌟</div>
                         <blockquote className="text-xl text-gray-300 italic leading-relaxed">
               "技术学习不应该有门槛。从机器人编程到游戏开发，从AI算法到内容创作，
               我用跨界的方式探索每一个技术领域。每一次尝试都是成长，每一次失败都是经验。
               在跨界探索的道路上，我依然保持着对技术的热爱和对创新的追求。"
             </blockquote>
            <div className="mt-6 text-fail-red font-semibold">
              — LJoson，跨界探索者
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
