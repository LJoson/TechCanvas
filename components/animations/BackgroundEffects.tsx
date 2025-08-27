'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
  rotation: number
  rotationSpeed: number
  scale: number
  pulse: number
  pulseSpeed: number
}

interface FloatingObject {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  rotationSpeed: number
  opacity: number
  color: string
  shape: 'cube' | 'sphere' | 'pyramid' | 'star'
  pulse: number
  pulseSpeed: number
  scale: number
}

export function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const objectsRef = useRef<FloatingObject[]>([])
  const animationRef = useRef<number>()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseMoving, setIsMouseMoving] = useState(false)
  const mouseTimeoutRef = useRef<NodeJS.Timeout>()

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

    // 鼠标移动监听 - 减少频率
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsMouseMoving(true)

      // 清除之前的定时器
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current)
      }

      // 设置鼠标停止移动的定时器
      mouseTimeoutRef.current = setTimeout(() => {
        setIsMouseMoving(false)
      }, 100)
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

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

      for (let i = 0; i < 80; i++) { // 减少粒子数量
        particles.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1.5, // 减小粒子尺寸
          speedX: (Math.random() - 0.5) * 0.8, // 降低速度
          speedY: (Math.random() - 0.5) * 0.8,
          opacity: Math.random() * 0.6 + 0.1, // 降低透明度
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01, // 降低旋转速度
          scale: Math.random() * 0.5 + 0.5,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.005 // 降低脉冲速度
        })
      }
      return particles
    }

    // 创建浮动3D物件
    const createFloatingObjects = () => {
      const objects: FloatingObject[] = []
      const colors = ['#ff6b6b', '#42a5f5', '#66bb6a', '#ab47bc', '#ffa726']
      const shapes: ('cube' | 'sphere' | 'pyramid' | 'star')[] = ['cube', 'sphere', 'pyramid', 'star']

      for (let i = 0; i < 6; i++) { // 减少物件数量
        objects.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 25 + 15, // 减小尺寸
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.005, // 大幅降低旋转速度
          opacity: Math.random() * 0.4 + 0.1, // 降低透明度
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.01 + 0.002, // 降低脉冲速度
          scale: Math.random() * 0.5 + 0.5
        })
      }
      return objects
    }

    particlesRef.current = createParticles()
    objectsRef.current = createFloatingObjects()

    // 绘制3D物件
    const draw3DObject = (obj: FloatingObject, ctx: CanvasRenderingContext2D) => {
      ctx.save()
      ctx.translate(obj.x, obj.y)
      ctx.rotate(obj.rotation)
      ctx.scale(obj.scale, obj.scale)
      ctx.globalAlpha = obj.opacity

      const pulseFactor = Math.sin(obj.pulse) * 0.1 + 1 // 减少脉冲幅度
      const size = obj.size * pulseFactor

      switch (obj.shape) {
        case 'cube':
          drawCube(ctx, size, obj.color)
          break
        case 'sphere':
          drawSphere(ctx, size, obj.color)
          break
        case 'pyramid':
          drawPyramid(ctx, size, obj.color)
          break
        case 'star':
          drawStar(ctx, size, obj.color)
          break
      }

      ctx.restore()
    }

    // 绘制立方体
    const drawCube = (ctx: CanvasRenderingContext2D, size: number, color: string) => {
      const halfSize = size / 2

      // 前面
      ctx.fillStyle = color
      ctx.fillRect(-halfSize, -halfSize, size, size)

      // 边框
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.lineWidth = 1
      ctx.strokeRect(-halfSize, -halfSize, size, size)

      // 侧面（简单的3D效果）
      ctx.fillStyle = `${color}60`
      ctx.fillRect(halfSize, -halfSize, halfSize, size)
      ctx.fillRect(-halfSize, halfSize, size, halfSize)
    }

    // 绘制球体
    const drawSphere = (ctx: CanvasRenderingContext2D, size: number, color: string) => {
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size / 2)
      gradient.addColorStop(0, color)
      gradient.addColorStop(1, `${color}30`)

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
      ctx.fill()

      // 高光
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.beginPath()
      ctx.arc(-size / 6, -size / 6, size / 8, 0, Math.PI * 2)
      ctx.fill()
    }

    // 绘制金字塔
    const drawPyramid = (ctx: CanvasRenderingContext2D, size: number, color: string) => {
      const halfSize = size / 2

      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(0, -halfSize)
      ctx.lineTo(-halfSize, halfSize)
      ctx.lineTo(halfSize, halfSize)
      ctx.closePath()
      ctx.fill()

      // 边框
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // 绘制星星
    const drawStar = (ctx: CanvasRenderingContext2D, size: number, color: string) => {
      const spikes = 5
      const outerRadius = size / 2
      const innerRadius = outerRadius * 0.4

      ctx.fillStyle = color
      ctx.beginPath()

      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius
        const angle = (i * Math.PI) / spikes
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.closePath()
      ctx.fill()

      // 边框
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 绘制背景渐变
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      )
      gradient.addColorStop(0, 'rgba(255, 107, 107, 0.02)')
      gradient.addColorStop(0.5, 'rgba(66, 165, 245, 0.01)')
      gradient.addColorStop(1, 'rgba(171, 71, 188, 0.02)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 更新和绘制3D物件 - 移除鼠标交互
      objectsRef.current.forEach(obj => {
        obj.rotation += obj.rotationSpeed
        obj.pulse += obj.pulseSpeed

        draw3DObject(obj, ctx)
      })

      // 更新和绘制粒子
      particlesRef.current.forEach(particle => {
        particle.pulse += particle.pulseSpeed
        particle.rotation += particle.rotationSpeed
        const pulseFactor = Math.sin(particle.pulse) * 0.2 + 1 // 减少脉冲幅度

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

        // 绘制粒子光晕
        const glowGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2 * pulseFactor // 减小光晕
        )
        glowGradient.addColorStop(0, `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`)
        glowGradient.addColorStop(0.5, `${particle.color}${Math.floor(particle.opacity * 0.3 * 255).toString(16).padStart(2, '0')}`)
        glowGradient.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 2 * pulseFactor, 0, Math.PI * 2)
        ctx.fillStyle = glowGradient
        ctx.fill()

        // 绘制粒子核心
        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate(particle.rotation)
        ctx.scale(particle.scale * pulseFactor, particle.scale * pulseFactor)

        ctx.beginPath()
        ctx.arc(0, 0, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        ctx.restore()

        // 绘制连接线 - 减少连接距离和透明度
        particlesRef.current.forEach(otherParticle => {
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) +
            Math.pow(particle.y - otherParticle.y, 2)
          )

          if (distance < 120 && distance > 0) { // 减少连接距离
            const opacity = (1 - distance / 120) * 0.3 * particle.opacity // 降低连接线透明度
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `${particle.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`
            ctx.lineWidth = 0.5 // 减小线条宽度
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current)
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{
        background: 'transparent',
        filter: 'blur(0.1px)', // 减少模糊
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh'
      }}
    />
  )
}
