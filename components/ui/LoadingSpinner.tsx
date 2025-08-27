'use client'

import { motion } from 'framer-motion'

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        className="w-16 h-16 border-4 border-cyber-bg-700 border-t-fail-red rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

export function LoadingCard() {
  return (
    <div className="fail-card animate-pulse">
      <div className="h-4 bg-cyber-bg-700 rounded mb-4"></div>
      <div className="h-3 bg-cyber-bg-700 rounded mb-2"></div>
      <div className="h-3 bg-cyber-bg-700 rounded w-3/4"></div>
    </div>
  )
}
