/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // 技术废柴主题色彩
      colors: {
        // 废柴主题色系
        'fail-red': '#ff6b6b',
        'fail-orange': '#ffa726',
        'fail-yellow': '#ffeb3b',
        'fail-green': '#66bb6a',
        'fail-blue': '#42a5f5',
        'fail-purple': '#ab47bc',
        'fail-pink': '#ec407a',
        'fail-cyan': '#00bcd4',

        // 赛博朋克背景色
        'cyber-bg': {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#0a0a0a',
        },

        // 浅色主题专用色系 - 浅黑色调
        'light-bg': {
          50: '#2a2a2a',
          100: '#1a1a1a',
          200: '#2a2a2a',
          300: '#3a3a3a',
          400: '#4a4a4a',
          500: '#5a5a5a',
          600: '#6a6a6a',
          700: '#7a7a7a',
          800: '#8a8a8a',
          900: '#9a9a9a',
        },

        // 科技感文字色
        'tech-text': {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#0a0a0a',
        },

        // 霓虹光效色
        'neon': {
          red: '#ff6b6b',
          blue: '#42a5f5',
          green: '#66bb6a',
          purple: '#ab47bc',
          pink: '#ec407a',
          cyan: '#4ecdc4',
        }
      },

      // 动画配置
      animation: {
        'fail-bounce': 'fail-bounce 1s ease-in-out',
        'cyber-glow': 'cyber-glow 2s ease-in-out infinite',
        'typewriter': 'typewriter 3s steps(40, end)',
        'floating': 'floating 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      // 关键帧动画
      keyframes: {
        'fail-bounce': {
          '0%, 20%, 53%, 80%, 100%': {
            transform: 'translate3d(0, 0, 0)',
          },
          '40%, 43%': {
            transform: 'translate3d(0, -30px, 0)',
          },
          '70%': {
            transform: 'translate3d(0, -15px, 0)',
          },
          '90%': {
            transform: 'translate3d(0, -4px, 0)',
          },
        },
        'cyber-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(255, 107, 107, 0.5)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(255, 107, 107, 0.8)',
          },
        },
        'typewriter': {
          from: {
            width: '0',
          },
          to: {
            width: '100%',
          },
        },
        'floating': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
      },

      // 字体配置
      fontFamily: {
        'cyber': ['monospace'],
        'display': ['system-ui', 'sans-serif'],
        'body': ['system-ui', 'sans-serif'],
      },

      // 背景渐变
      backgroundImage: {
        'cyber-gradient-primary': 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)',
        'cyber-gradient-secondary': 'linear-gradient(135deg, #667eea, #764ba2)',
        'cyber-gradient-accent': 'linear-gradient(90deg, #f093fb, #f5576c)',
        'neon-glow': 'radial-gradient(circle, rgba(255, 107, 107, 0.3) 0%, transparent 70%)',
        // 浅色主题科技感渐变 - 浅黑色调
        'light-tech-gradient': 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
        'light-card-gradient': 'linear-gradient(135deg, rgba(42, 42, 42, 0.95) 0%, rgba(34, 34, 34, 0.95) 100%)',
      },

      // 阴影效果
      boxShadow: {
        'neon-red': '0 0 20px rgba(255, 107, 107, 0.5)',
        'neon-blue': '0 0 20px rgba(66, 165, 245, 0.5)',
        'neon-green': '0 0 20px rgba(102, 187, 106, 0.5)',
        'neon-purple': '0 0 20px rgba(171, 71, 188, 0.5)',
        'neon-pink': '0 0 20px rgba(236, 64, 122, 0.5)',
        'neon-cyan': '0 0 20px rgba(78, 205, 196, 0.5)',
        // 浅色主题阴影 - 浅黑色调
        'light-card': '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
        'light-card-hover': '0 4px 6px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)',
      },

      // 文本阴影
      textShadow: {
        'neon-red': '0 0 10px rgba(255, 107, 107, 0.8)',
        'neon-blue': '0 0 10px rgba(66, 165, 245, 0.8)',
        'neon-green': '0 0 10px rgba(102, 187, 106, 0.8)',
        'neon-purple': '0 0 10px rgba(171, 71, 188, 0.8)',
        'neon-pink': '0 0 10px rgba(236, 64, 122, 0.8)',
        'neon-cyan': '0 0 10px rgba(78, 205, 196, 0.8)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
