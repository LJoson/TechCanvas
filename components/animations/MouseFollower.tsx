'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; opacity: number }>>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)

      // 创建更多跟随粒子
      const newParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        opacity: 1
      }

      setParticles(prev => [...prev.slice(-8), newParticle]) // 保持最多9个粒子
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
      setParticles([])
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // 清理过期的粒子
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.filter(p => p.opacity > 0.1))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* 主光标 - 白色圆点 */}
      <motion.div
        className="fixed pointer-events-none z-30"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
          mass: 0.3
        }}
      >
        <div className="w-3 h-3 bg-white rounded-full shadow-lg shadow-white/50" />
      </motion.div>

      {/* 跟随光标 - 红色光晕 */}
      <motion.div
        className="fixed pointer-events-none z-25"
        animate={{
          x: mousePosition.x - 25,
          y: mousePosition.y - 25,
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 0.5 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 1.2
        }}
      >
        <div className="w-12 h-12 bg-fail-red rounded-full blur-md shadow-lg shadow-fail-red/40" />
      </motion.div>

      {/* 外圈光晕 */}
      <motion.div
        className="fixed pointer-events-none z-20"
        animate={{
          x: mousePosition.x - 40,
          y: mousePosition.y - 40,
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 0.3 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 1.5
        }}
      >
        <div className="w-20 h-20 bg-fail-blue rounded-full blur-lg shadow-lg shadow-fail-blue/30" />
      </motion.div>

      {/* 脉冲环 */}
      <motion.div
        className="fixed pointer-events-none z-15"
        animate={{
          x: mousePosition.x - 50,
          y: mousePosition.y - 50,
          scale: isVisible ? [1, 1.8, 1] : 0,
          opacity: isVisible ? [0.4, 0, 0.4] : 0
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-24 h-24 border-2 border-fail-blue rounded-full" />
      </motion.div>

      {/* 粒子轨迹 */}
      {particles.map((particle, index) => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none z-20"
          initial={{
            x: particle.x - 2,
            y: particle.y - 2,
            opacity: 1,
            scale: 1
          }}
          animate={{
            x: particle.x - 2 + (Math.random() - 0.5) * 30,
            y: particle.y - 2 + (Math.random() - 0.5) * 30,
            opacity: 0,
            scale: 0
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut"
          }}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              index % 4 === 0 ? 'bg-fail-green' :
              index % 4 === 1 ? 'bg-fail-purple' :
              index % 4 === 2 ? 'bg-fail-orange' : 'bg-fail-cyan'
            }`}
          />
        </motion.div>
      ))}
    </>
  )
}
