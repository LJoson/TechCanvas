'use client'

import { motion } from 'framer-motion'

// 博客图标
export function BlogIcon({ className = "w-6 h-6", animated = false }: { className?: string, animated?: boolean }) {
  const Icon = (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
      <path d="M14 2v6h6"/>
      <path d="M16 13H8"/>
      <path d="M16 17H8"/>
      <path d="M10 9H8"/>
    </svg>
  )

  return animated ? (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className="inline-block"
    >
      {Icon}
    </motion.div>
  ) : Icon
}

// 项目图标
export function ProjectIcon({ className = "w-6 h-6", animated = false }: { className?: string, animated?: boolean }) {
  const Icon = (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  )

  return animated ? (
    <motion.div
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
      className="inline-block"
    >
      {Icon}
    </motion.div>
  ) : Icon
}

// GlimmerLab图标
export function GlimmerLabIcon({ className = "w-6 h-6", animated = false }: { className?: string, animated?: boolean }) {
  const Icon = (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )

  return animated ? (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 180 }}
      whileTap={{ scale: 0.9 }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="inline-block"
    >
      {Icon}
    </motion.div>
  ) : Icon
}

// 关于图标
export function AboutIcon({ className = "w-6 h-6", animated = false }: { className?: string, animated?: boolean }) {
  const Icon = (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/>
      <path d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  )

  return animated ? (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="inline-block"
    >
      {Icon}
    </motion.div>
  ) : Icon
}

// 机器人图标
export function RobotIcon({ className = "w-6 h-6", animated = false }: { className?: string, animated?: boolean }) {
  const Icon = (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
      <circle cx="12" cy="16" r="1"/>
      <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
      <path d="M7 11h10"/>
      <path d="M9 7h6"/>
    </svg>
  )

  return animated ? (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="inline-block"
    >
      {Icon}
    </motion.div>
  ) : Icon
}

// 游戏图标
export function GameIcon({ className = "w-6 h-6", animated = false }: { className?: string, animated?: boolean }) {
  const Icon = (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 6H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z"/>
      <path d="M7 12h2"/>
      <path d="M15 12h2"/>
      <path d="M12 9v2"/>
      <path d="M12 13v2"/>
    </svg>
  )

  return animated ? (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="inline-block"
    >
      {Icon}
    </motion.div>
  ) : Icon
}

// 设计图标
export function DesignIcon({ className = "w-6 h-6", animated = false }: { className?: string, animated?: boolean }) {
  const Icon = (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )

  return animated ? (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="inline-block"
    >
      {Icon}
    </motion.div>
  ) : Icon
}

// 芯片图标
export function ChipIcon({ className = "w-6 h-6", animated = false }: { className?: string, animated?: boolean }) {
  const Icon = (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
      <path d="M9 9h6v6H9z"/>
      <path d="M9 4v4"/>
      <path d="M15 4v4"/>
      <path d="M9 20v-4"/>
      <path d="M15 20v-4"/>
      <path d="M4 9h4"/>
      <path d="M4 15h4"/>
      <path d="M20 9h-4"/>
      <path d="M20 15h-4"/>
    </svg>
  )

  return animated ? (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      className="inline-block"
    >
      {Icon}
    </motion.div>
  ) : Icon
}

// 网络图标
export function NetworkIcon({ className = "w-6 h-6", animated = false }: { className?: string, animated?: boolean }) {
  const Icon = (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
      <circle cx="12" cy="12" r="2"/>
      <path d="M12 10v4"/>
      <path d="M10 12h4"/>
    </svg>
  )

  return animated ? (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="inline-block"
    >
      {Icon}
    </motion.div>
  ) : Icon
}
