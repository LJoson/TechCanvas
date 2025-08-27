import { Metadata } from 'next'
import { ProjectHero } from '@/components/projects/ProjectHero'
import { ProjectGrid } from '@/components/projects/ProjectGrid'
import { ProjectFilters } from '@/components/projects/ProjectFilters'

export const metadata: Metadata = {
  title: '个人项目 - LJoson 的"废柴"小窝',
  description: '展示我的跨界项目作品，从机器人仿真到游戏开发，从Web应用到AI算法，从创意设计到性能优化，见证跨界探索的技术实践',
  keywords: ['个人项目', '跨界项目', '机器人仿真', '游戏开发', 'Web应用', 'AI算法', '创意设计', '技术实践'],
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-cyber-bg-900">
      {/* 项目英雄区域 */}
      <ProjectHero />

      {/* 项目筛选器 */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <ProjectFilters />
        </div>
      </div>

      {/* 项目网格 */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <ProjectGrid />
        </div>
      </div>
    </div>
  )
}
