'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Box, Sparkles, X } from 'lucide-react'

type BackgroundType = 'canvas' | 'three' | 'none'

interface BackgroundToggleProps {
  onBackgroundChange: (type: BackgroundType) => void
  currentBackground: BackgroundType
}

export function BackgroundToggle({ onBackgroundChange, currentBackground }: BackgroundToggleProps) {
  const [isOpen, setIsOpen] = useState(false)

  const backgroundOptions = [
    {
      type: 'canvas' as BackgroundType,
      name: 'Canvas 粒子',
      icon: Sparkles,
      description: '2D Canvas 粒子动画效果'
    },
    {
      type: 'three' as BackgroundType,
      name: '3D 几何体',
      icon: Box,
      description: 'Three.js 3D 几何体动画'
    },
    {
      type: 'none' as BackgroundType,
      name: '无背景',
      icon: X,
      description: '关闭背景动画效果'
    }
  ]

  return (
    <div className="fixed top-4 right-4 z-45">
      {/* 主按钮 */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-cyber-bg-800/80 backdrop-blur-sm border border-cyber-bg-700 rounded-full flex items-center justify-center text-white hover:bg-cyber-bg-700/80 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Palette className="w-5 h-5" />
      </motion.button>

      {/* 选项面板 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 right-0 bg-cyber-bg-800/90 backdrop-blur-sm border border-cyber-bg-700 rounded-lg p-3 min-w-[200px] shadow-xl"
          >
            <div className="text-sm font-medium text-gray-300 mb-3">背景效果</div>
            <div className="space-y-2">
              {backgroundOptions.map((option) => (
                <motion.button
                  key={option.type}
                  onClick={() => {
                    onBackgroundChange(option.type)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 p-2 rounded-md text-left transition-all duration-200 ${
                    currentBackground === option.type
                      ? 'bg-fail-red/20 text-fail-red border border-fail-red/30'
                      : 'text-gray-300 hover:bg-cyber-bg-700/50 hover:text-white'
                  }`}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <option.icon className="w-4 h-4 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{option.name}</div>
                    <div className="text-xs text-gray-400">{option.description}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
