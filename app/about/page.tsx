import { Metadata } from 'next'
import { AboutHero } from '@/components/about/AboutHero'
import { AboutExpertise } from '@/components/about/AboutExpertise'
import { AboutTimeline } from '@/components/about/AboutTimeline'
import { AboutSkills } from '@/components/about/AboutSkills'
import { AboutPhilosophy } from '@/components/about/AboutPhilosophy'

export const metadata: Metadata = {
  title: '关于我 - LJoson 的"废柴"小窝',
  description: '了解LJoson的跨界探索之路，从机器人到游戏开发，从Web技术到AI算法的技术成长历程',
  keywords: ['关于我', 'LJoson', '跨界探索者', '技术成长', '机器人', '游戏开发', 'AI算法'],
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cyber-bg-900">
      {/* 英雄区域 */}
      <AboutHero />

      {/* 专业领域 */}
      <AboutExpertise />

      {/* 成长时间线 */}
      <AboutTimeline />

      {/* 技能展示 */}
      <AboutSkills />

      {/* 技术哲学 */}
      <AboutPhilosophy />
    </div>
  )
}
