'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

// 页面过渡动画组件
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      {children}
    </motion.div>
  )
}

// 增强的页面进入动画
export function AnimatedPage({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
      transition={{
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      {children}
    </motion.div>
  )
}

// 增强的卡片动画组件
export function AnimatedCard({
  children,
  className = "",
  delay = 0,
  hover = true
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  hover?: boolean
}) {
  return (
    <motion.div
      className={`fail-card ${className}`}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={hover ? {
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      } : {}}
    >
      {children}
    </motion.div>
  )
}

// 增强的按钮动画组件
export function AnimatedButton({
  children,
  className = "",
  onClick,
  disabled = false
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
}) {
  return (
    <motion.button
      className={`fail-button ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
    >
      {children}
    </motion.button>
  )
}

// 增强的列表项动画组件
export function AnimatedListItem({
  children,
  index = 0,
  className = ""
}: {
  children: React.ReactNode
  index?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{
        x: 5,
        transition: { duration: 0.2 }
      }}
    >
      {children}
    </motion.div>
  )
}

// 增强的渐变文字组件
export function GradientText({
  children,
  className = "",
  animated = true
}: {
  children: React.ReactNode
  className?: string
  animated?: boolean
}) {
  return (
    <motion.span
      className={`cyber-gradient ${className}`}
      animate={animated ? {
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      } : {}}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {children}
    </motion.span>
  )
}

// 增强的加载动画组件
export function LoadingAnimation({
  size = "medium",
  className = ""
}: {
  size?: "small" | "medium" | "large"
  className?: string
}) {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12"
  }

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} border-2 border-fail-red border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}

// 增强的脉冲动画组件
export function PulseAnimation({
  children,
  className = "",
  duration = 2
}: {
  children: React.ReactNode
  className?: string
  duration?: number
}) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// 增强的浮动动画组件
export function FloatingAnimation({
  children,
  className = "",
  duration = 3
}: {
  children: React.ReactNode
  className?: string
  duration?: number
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10, 0]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// 增强的旋转动画组件
export function RotateAnimation({
  children,
  className = "",
  duration = 8,
  direction = "clockwise"
}: {
  children: React.ReactNode
  className?: string
  duration?: number
  direction?: "clockwise" | "counterclockwise"
}) {
  return (
    <motion.div
      className={className}
      animate={{
        rotate: direction === "clockwise" ? 360 : -360
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {children}
    </motion.div>
  )
}

// 增强的缩放呼吸动画组件
export function BreatheAnimation({
  children,
  className = "",
  duration = 3
}: {
  children: React.ReactNode
  className?: string
  duration?: number
}) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// 增强的淡入动画组件
export function FadeInAnimation({
  children,
  className = "",
  delay = 0,
  duration = 0.6
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      {children}
    </motion.div>
  )
}

// 增强的滑入动画组件
export function SlideInAnimation({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.6
}: {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
}) {
  const variants = {
    up: { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } },
    down: { initial: { opacity: 0, y: -30 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 } }
  }

  return (
    <motion.div
      className={className}
      initial={variants[direction].initial}
      animate={variants[direction].animate}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      {children}
    </motion.div>
  )
}

// 增强的弹跳动画组件
export function BounceAnimation({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: delay,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      {children}
    </motion.div>
  )
}

// 增强的摇摆动画组件
export function WiggleAnimation({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, rotate: -5 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{
        duration: 0.6,
        delay: delay,
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      whileHover={{
        rotate: [0, -3, 3, -3, 0],
        transition: { duration: 0.5 }
      }}
    >
      {children}
    </motion.div>
  )
}

// 增强的闪光动画组件
export function ShineAnimation({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.6,
        delay: delay
      }}
    >
      {children}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: delay + 0.5
        }}
      />
    </motion.div>
  )
}

// 增强的波浪动画组件
export function WaveAnimation({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{
        y: [0, -5, 0],
        transition: { duration: 0.3 }
      }}
    >
      {children}
    </motion.div>
  )
}

// 增强的弹跳进入动画组件
export function BounceInAnimation({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.3, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: delay,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
    >
      {children}
    </motion.div>
  )
}

// 增强的翻转动画组件
export function FlipAnimation({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, rotateY: 90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  )
}

// 增强的缩放进入动画组件
export function ScaleInAnimation({
  children,
  className = "",
  delay = 0,
  from = 0.5
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  from?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: from }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      {children}
    </motion.div>
  )
}

// 增强的淡入淡出动画组件
export function FadeInOutAnimation({
  children,
  className = "",
  delay = 0,
  duration = 2
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

