'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react'
import { useTheme } from '@/lib/contexts/ThemeContext'
import { cn } from '@/lib/utils'

const themeOptions = [
  { value: 'light', label: '浅色模式', icon: Sun },
  { value: 'dark', label: '深色模式', icon: Moon },
  { value: 'system', label: '跟随系统', icon: Monitor },
] as const

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // 确保组件在客户端渲染
  useEffect(() => {
    setMounted(true)
  }, [])

  // 如果还没有挂载，显示加载状态
  if (!mounted) {
    return (
      <div className="p-2 rounded-lg bg-cyber-bg-800/50 border border-cyber-bg-600/50">
        <div className="w-4 h-4 animate-pulse bg-gray-400 rounded" />
      </div>
    )
  }

  // 使用 try-catch 包装 useTheme 调用
  let themeContext
  try {
    themeContext = useTheme()
  } catch (error) {
    console.warn('ThemeToggle: useTheme failed, showing fallback:', error)
    return (
      <div className="p-2 rounded-lg bg-cyber-bg-800/50 border border-cyber-bg-600/50">
        <div className="w-4 h-4 text-gray-400">
          <Sun className="w-4 h-4" />
        </div>
      </div>
    )
  }

  const { theme, setTheme, resolvedTheme } = themeContext
  const currentOption = themeOptions.find(option => option.value === theme)
  const CurrentIcon = currentOption?.icon || Monitor

  return (
    <div className="relative">
      {/* 主按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 backdrop-blur-sm",
          "bg-cyber-bg-800/50 hover:bg-cyber-bg-700/50",
          "border border-cyber-bg-600/50 hover:border-fail-red/30",
          "text-gray-300 hover:text-fail-red",
          // 浅色主题样式 - 浅黑色调
          "dark:bg-cyber-bg-800/50 dark:hover:bg-cyber-bg-700/50",
          "light:bg-gray-700/80 light:hover:bg-gray-600/90",
          "light:border-gray-600/80 light:hover:border-fail-red/30",
          "light:text-gray-200 light:hover:text-fail-red",
          "light:shadow-light-card light:hover:shadow-light-card-hover"
        )}
        aria-label="切换主题"
      >
        <CurrentIcon className="w-4 h-4" />
        <ChevronDown
          className={cn(
            "w-3 h-3 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* 下拉菜单 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute right-0 top-full mt-2 w-40 rounded-lg backdrop-blur-md border shadow-lg z-50",
              // 深色主题样式
              "dark:bg-cyber-bg-800/95 dark:border-cyber-bg-600/50",
              // 浅色主题样式 - 浅黑色调
              "light:bg-gray-700/95 light:border-gray-600/80 light:shadow-light-card-hover"
            )}
          >
            <div className="p-1">
              {themeOptions.map((option) => {
                const Icon = option.icon
                const isActive = theme === option.value

                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      setTheme(option.value)
                      setIsOpen(false)
                    }}
                    className={cn(
                      "w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-all duration-200",
                      // 深色主题样式
                      "dark:text-gray-300 dark:hover:text-white",
                      "dark:hover:bg-cyber-bg-700/50",
                      // 浅色主题样式 - 浅黑色调
                      "light:text-gray-200 light:hover:text-white",
                      "light:hover:bg-gray-600/80",
                      // 激活状态
                      isActive && "dark:bg-fail-red/20 dark:text-fail-red dark:border dark:border-fail-red/30",
                      isActive && "light:bg-fail-red/10 light:text-fail-red light:border light:border-fail-red/30"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{option.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="w-1.5 h-1.5 rounded-full bg-fail-red ml-auto"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 背景遮罩 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

// 简化版主题切换按钮（用于移动端或紧凑布局）
export function SimpleThemeToggle() {
  const [mounted, setMounted] = useState(false)

  // 确保组件在客户端渲染
  useEffect(() => {
    setMounted(true)
  }, [])

  // 如果还没有挂载，显示加载状态
  if (!mounted) {
    return (
      <div className="p-2 rounded-lg bg-cyber-bg-800/50 border border-cyber-bg-600/50">
        <div className="w-5 h-5 animate-pulse bg-gray-400 rounded" />
      </div>
    )
  }

  // 使用 try-catch 包装 useTheme 调用
  let themeContext
  try {
    themeContext = useTheme()
  } catch (error) {
    console.warn('SimpleThemeToggle: useTheme failed, showing fallback:', error)
    return (
      <div className="p-2 rounded-lg bg-cyber-bg-800/50 border border-cyber-bg-600/50">
        <div className="w-5 h-5 text-gray-400">
          <Sun className="w-5 h-5" />
        </div>
      </div>
    )
  }

  const { theme, setTheme, resolvedTheme } = themeContext

  const toggleTheme = () => {
    if (theme === 'system') {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    } else if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-lg transition-all duration-200 backdrop-blur-sm",
        // 深色主题样式
        "dark:bg-cyber-bg-800/50 dark:hover:bg-cyber-bg-700/50",
        "dark:border dark:border-cyber-bg-600/50 dark:hover:border-fail-red/30",
        "dark:text-gray-300 dark:hover:text-fail-red",
        // 浅色主题样式 - 浅黑色调
        "light:bg-gray-700/80 light:hover:bg-gray-600/90",
        "light:border light:border-gray-600/80 light:hover:border-fail-red/30",
        "light:text-gray-200 light:hover:text-fail-red",
        "light:shadow-light-card light:hover:shadow-light-card-hover"
      )}
      aria-label="切换主题"
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  )
}
