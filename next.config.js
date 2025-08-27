/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态导出配置
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,

  // 只在生产环境使用out目录
  distDir: process.env.NODE_ENV === 'production' ? 'out' : '.next',

  // 优化构建配置
  swcMinify: true,

  // 压缩配置
  compress: true,

  // 图片优化配置
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 禁用图片优化以支持静态导出
    unoptimized: true,
  },

  // 启用实验性功能
  experimental: {
    // 启用Web Workers
    workerThreads: true,
    // 启用静态导出优化
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // Webpack配置
  webpack: (config, { isServer, dev }) => {
    // 支持WebAssembly
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    }

    // 支持Web Workers
    config.module.rules.push({
      test: /\.worker\.(js|ts)$/,
      use: { loader: 'worker-loader' },
    })

    // 优化Three.js
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      }
    }

    // 静态导出时优化配置
    if (!isServer && !dev) {
      // 优化代码分割，避免空chunk文件
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: -30,
            reuseExistingChunk: true,
          },
        },
      }

      // 优化模块解析
      config.resolve.alias = {
        ...config.resolve.alias,
        // 确保客户端组件正确加载
        'next/navigation': false,
        'next/server': false,
      }

      // 设置更长的超时时间
      config.watchOptions = {
        ...config.watchOptions,
        poll: 1000,
        aggregateTimeout: 300,
      }
    }

    return config
  },

  // 添加静态导出优化配置
  poweredByHeader: false,

  // GitHub Pages部署配置 - 支持master分支部署
  basePath: '',

  // 优化静态资源处理
  assetPrefix: '',

  // 添加缓存破坏机制
  generateBuildId: async () => {
    // 使用时间戳作为构建ID，确保每次构建都不同
    return `build-${Date.now()}`;
  },

  // 确保静态导出兼容性
  experimental: {
    // 启用Web Workers
    workerThreads: true,
    // 启用静态导出优化
    optimizePackageImports: ['framer-motion', 'lucide-react'],
    // 确保静态导出兼容性
    esmExternals: false,
  },
}

module.exports = nextConfig
