import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(date: string | Date) {
  try {
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) {
      return '未知日期'
    }
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dateObj)
  } catch (error) {
    return '未知日期'
  }
}

export function formatDateShort(date: string | Date) {
  try {
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) {
      return '未知日期'
    }
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(dateObj)
  } catch (error) {
    return '未知日期'
  }
}

// 安全的日期格式化函数，避免水合错误
export function formatDateSafely(date: string | Date, isClient: boolean = false) {
  try {
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) {
      return '未知日期'
    }

    if (!isClient) {
      // 服务端渲染时返回简单格式
      return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`
    }
    return formatDateShort(date)
  } catch (error) {
    return '未知日期'
  }
}

export function truncateText(text: string, length: number) {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
