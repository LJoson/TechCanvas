'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const navigation = [
  { name: '首页', href: '/' },
  { name: '博客', href: '/blog/' },
  { name: '个人项目', href: '/projects/' },
  { name: '品牌项目', href: '/glimmerlab/' },
  { name: '关于', href: '/about/' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-cyber-bg-900/90 backdrop-blur-md border-b border-cyber-bg-700'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold text-white relative"
            >
              <span className="relative z-10 bg-gradient-to-r from-fail-red via-fail-orange to-fail-purple bg-clip-text text-transparent">
                🚀 LJoson 的"废柴"小窝
              </span>
              {/* 悬停背景效果 */}
              <div className="absolute inset-0 bg-fail-red/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-gray-300 hover:text-fail-red transition-colors duration-200 font-medium group"
              >
                <span className="relative z-10">{item.name}</span>
                {/* 悬停下划线效果 */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-fail-red group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* 桌面端使用完整主题切换 */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* 移动端使用简化主题切换 */}
            <div className="md:hidden">
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-cyber-bg-800/50 hover:bg-cyber-bg-700/50 transition-colors duration-200 backdrop-blur-sm"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-cyber-bg-800/90 backdrop-blur-md border-t border-cyber-bg-700"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-fail-red hover:bg-cyber-bg-700/50 transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
