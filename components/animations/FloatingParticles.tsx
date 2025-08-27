'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
  pulse: number
  pulseSpeed: number
}

export function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 创建粒子
    const createParticles = () => {
      const particles: Particle[] = []
      const colors = [
        '#ff6b6b', // 废柴红
        '#ffa726', // 废柴橙
        '#66bb6a', // 废柴绿
        '#42a5f5', // 废柴蓝
        '#ab47bc', // 废柴紫
        '#ec407a', // 废柴粉
        '#00bcd4', // 废柴青
        '#ffeb3b'  // 废柴黄
      ]

      // 增加粒子数量到150个，让效果更明显
      for (let i = 0; i < 150; i++) {
        particles.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 6 + 3, // 进一步增大粒子尺寸
          speedX: (Math.random() - 0.5) * 1.5, // 增加速度
          speedY: (Math.random() - 0.5) * 1.5,
          opacity: Math.random() * 0.9 + 0.3, // 增加透明度
          color: colors[Math.floor(Math.random() * colors.length)],
          pulse: Math.random() * Math.PI * 2, // 脉冲动画
          pulseSpeed: Math.random() * 0.03 + 0.015 // 增加脉冲速度
        })
      }
      return particles
    }

    particlesRef.current = createParticles()

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 绘制背景渐变 - 增强效果
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      )
      gradient.addColorStop(0, 'rgba(255, 107, 107, 0.05)') // 增加透明度
      gradient.addColorStop(0.5, 'rgba(66, 165, 245, 0.03)')
      gradient.addColorStop(1, 'rgba(171, 71, 188, 0.05)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach(particle => {
        // 更新脉冲
        particle.pulse += particle.pulseSpeed
        const pulseFactor = Math.sin(particle.pulse) * 0.4 + 1 // 增加脉冲幅度

        // 更新位置
        particle.x += particle.speedX
        particle.y += particle.speedY

        // 边界检测和反弹
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }

        // 绘制粒子光晕 - 增强效果
        const glowGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 4 * pulseFactor // 增大光晕
        )
        glowGradient.addColorStop(0, `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`)
        glowGradient.addColorStop(0.5, `${particle.color}${Math.floor(particle.opacity * 0.6 * 255).toString(16).padStart(2, '0')}`)
        glowGradient.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 4 * pulseFactor, 0, Math.PI * 2)
        ctx.fillStyle = glowGradient
        ctx.fill()

        // 绘制粒子核心
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * pulseFactor, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // 绘制连接线 - 增强效果
        particlesRef.current.forEach(otherParticle => {
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) +
            Math.pow(particle.y - otherParticle.y, 2)
          )

          if (distance < 200 && distance > 0) { // 增加连接距离
            const opacity = (1 - distance / 200) * 0.6 * particle.opacity // 增加连接线透明度
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `${particle.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`
            ctx.lineWidth = 1.5 // 增加线条宽度
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: 'transparent',
        filter: 'blur(0.3px)' // 减少模糊，让效果更清晰
      }}
    />
  )
}
