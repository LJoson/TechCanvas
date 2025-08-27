'use client'

import { useState } from 'react'
import { BackgroundEffects } from '@/components/animations/BackgroundEffects'
import { ThreeBackground } from '@/components/three/ThreeBackground'
import { MouseFollower } from '@/components/animations/MouseFollower'
import { BackgroundToggle } from '@/components/ui/BackgroundToggle'

type BackgroundType = 'canvas' | 'three' | 'none'

interface ClientLayoutProps {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [backgroundType, setBackgroundType] = useState<BackgroundType>('canvas')

  return (
    <>
      {/* 背景动画效果 - 根据用户选择 */}
      {backgroundType === 'canvas' && <BackgroundEffects />}
      {backgroundType === 'three' && <ThreeBackground />}

      {/* 背景切换控制 */}
      <BackgroundToggle
        currentBackground={backgroundType}
        onBackgroundChange={setBackgroundType}
      />

      {/* 鼠标跟随效果 */}
      <MouseFollower />

      {/* 主要内容 */}
      {children}
    </>
  )
}
