import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ClientLayout } from '@/components/layout/ClientLayout'
import { PageTransition } from '@/components/animations/GlobalAnimations'
import { ThemeProvider } from '@/lib/contexts/ThemeContext'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'LJoson 的"废柴"小窝 - 从技术废柴到跨界探索者的进化之路',
    template: '%s | LJoson 的"废柴"小窝'
  },
  description: '从机器人到游戏，从代码到内容创作，用跨界思维探索技术边界，让学习变得有趣而富有创意',
  keywords: ['技术博客', '跨界探索', '机器人', '游戏开发', 'AI', '前端开发', 'LJoson', '技术废柴', 'GlimmerLab'],
  authors: [{ name: 'LJoson' }],
  creator: 'LJoson',
  publisher: 'LJoson',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ljoson.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://ljoson.com',
    title: 'LJoson 的"废柴"小窝 - 从技术废柴到跨界探索者的进化之路',
    description: '从机器人到游戏，从代码到内容创作，用跨界思维探索技术边界，让学习变得有趣而富有创意',
    siteName: 'LJoson 的"废柴"小窝',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LJoson 的"废柴"小窝',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LJoson 的"废柴"小窝 - 从技术废柴到跨界探索者的进化之路',
    description: '从机器人到游戏，从代码到内容创作，用跨界思维探索技术边界，让学习变得有趣而富有创意',
    images: ['/og-image.jpg'],
    creator: '@glimmer_AIlab',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  other: {
    'theme-color': '#ff6b6b',
    'color-scheme': 'dark',
    'viewport-fit': 'cover',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff6b6b" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* 预加载关键资源 */}
        {/* 移除不存在的字体文件预加载 */}
        {/* <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /> */}

        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "LJoson 的废柴小窝",
              "description": "从技术废柴到跨界探索者的进化之路",
              "url": "https://ljoson.com",
              "author": {
                "@type": "Person",
                "name": "LJoson",
                "url": "https://ljoson.com"
              },
              "publisher": {
                "@type": "Organization",
                "name": "GlimmerLab",
                "url": "https://glimmerlab.com"
              }
            })
          }}
        />
      </head>
      <body className="bg-cyber-bg-900 text-white antialiased font-sans selection:bg-fail-red/20 selection:text-white">
        <ThemeProvider>
          <ClientLayout>
            <PageTransition>
              <div className="min-h-screen flex flex-col relative">
                {/* 全局背景装饰 */}
                <div className="fixed inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-fail-red/5 via-transparent to-fail-purple/5"></div>
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,107,0.1),transparent_50%)]"></div>
                </div>

                {/* 主要内容 */}
                <div className="relative z-10 flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-1 relative">
                    {children}
                  </main>
                  <Footer />
                </div>
              </div>
            </PageTransition>
          </ClientLayout>
        </ThemeProvider>

        {/* 性能监控 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // 性能监控
              if (typeof window !== 'undefined') {
                window.addEventListener('load', () => {
                  if ('performance' in window) {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                      console.log('页面加载性能:', {
                        'DOM内容加载': perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart + 'ms',
                        '页面完全加载': perfData.loadEventEnd - perfData.loadEventStart + 'ms',
                        '首次内容绘制': performance.getEntriesByName('first-contentful-paint')[0]?.startTime + 'ms'
                      });
                    }
                  }
                });
              }
            `
          }}
        />
      </body>
    </html>
  )
}
