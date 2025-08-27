'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'

interface FailAnimationProps {
  className?: string
  text?: string
}

export function FailAnimation({ className = '', text = '🤡 技术废柴' }: FailAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return

    // 创建复杂的废柴动画序列
    const timeline = anime.timeline({
      easing: 'easeInOutQuad',
      duration: 1500,
      loop: true
    })

    // 基础呼吸效果
    timeline.add({
      targets: textRef.current,
      scale: [1, 1.08, 1],
      opacity: [1, 0.85, 1],
      duration: 2000,
      easing: 'easeInOutSine'
    })

    // 轻微的左右摆动
    timeline.add({
      targets: textRef.current,
      translateX: [0, 4, 0, -4, 0],
      rotate: [0, 1, 0, -1, 0],
      duration: 2500,
      easing: 'easeInOutSine'
    }, '-=2000')

    // 随机的小动画效果
    const randomAnimations = [
      () => anime({
        targets: textRef.current,
        scale: [1, 1.15, 1],
        duration: 400,
        easing: 'easeInOutQuad'
      }),
      () => anime({
        targets: textRef.current,
        translateY: [0, -8, 0],
        duration: 500,
        easing: 'easeOutQuad'
      }),
      () => anime({
        targets: textRef.current,
        rotate: [0, 5, 0, -5, 0],
        duration: 600,
        easing: 'easeInOutQuad'
      }),
      () => anime({
        targets: textRef.current,
        scale: [1, 1.2, 1],
        translateX: [0, 6, 0],
        duration: 450,
        easing: 'easeInOutQuad'
      })
    ]

    // 随机触发小动画
    const triggerRandomAnimation = () => {
      const randomIndex = Math.floor(Math.random() * randomAnimations.length)
      const randomDelay = Math.random() * 2000 + 1000 // 1-3秒随机延迟
      setTimeout(() => {
        randomAnimations[randomIndex]()
        triggerRandomAnimation()
      }, randomDelay)
    }

    // 启动随机动画
    triggerRandomAnimation()

    return () => {
      // 清理动画
    }
  }, [])

  return (
    <div ref={containerRef} className={`fail-animation ${className}`}>
      <div
        ref={textRef}
        className="inline-block font-bold text-fail-red cursor-pointer select-none"
        style={{
          textShadow: '0 0 25px rgba(255, 107, 107, 0.9)',
          filter: 'drop-shadow(0 0 15px rgba(255, 107, 107, 0.6))',
          WebkitTextStroke: '1px rgba(255, 107, 107, 0.4)',
          transformOrigin: 'center center',
          background: (text.includes('技术废柴') || text.includes('跨界探索者')) ? 'linear-gradient(45deg, rgba(255, 107, 107, 0.1), rgba(255, 142, 83, 0.1))' : 'transparent',
          padding: (text.includes('技术废柴') || text.includes('跨界探索者')) ? '4px 8px' : '0',
          borderRadius: (text.includes('技术废柴') || text.includes('跨界探索者')) ? '8px' : '0',
          border: (text.includes('技术废柴') || text.includes('跨界探索者')) ? '1px solid rgba(255, 107, 107, 0.3)' : 'none'
        }}
      >
        {text}
      </div>
    </div>
  )
}
