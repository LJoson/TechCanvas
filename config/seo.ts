export const seoConfig = {
  default: {
    title: 'LJoson 的"废柴"小窝',
    description: '从机器人到游戏，从代码到内容创作，用跨界思维探索技术边界，让学习变得有趣而富有创意',
    keywords: ['技术博客', '跨界探索', '机器人', '游戏开发', 'AI', '前端开发', 'LJoson'],
    author: 'LJoson',
    robots: 'index, follow',
    ogType: 'website',
    ogImage: '/images/og-default.jpg',
    twitterCard: 'summary_large_image'
  },
  pages: {
    home: {
      title: 'LJoson 的"废柴"小窝 - 从技术废柴到跨界探索者的进化之路',
      description: '从机器人到游戏，从代码到内容创作，用跨界思维探索技术边界，让学习变得有趣而富有创意',
      keywords: ['技术博客', '跨界探索', '机器人', '游戏开发', 'AI', '前端开发', 'LJoson'],
      ogImage: '/images/og-home.jpg'
    },
    blog: {
      title: '技术博客 - LJoson 的"废柴"小窝',
      description: '分享我的技术学习心得、踩坑经历和项目经验，记录技术废柴的成长之路',
      keywords: ['技术博客', '学习笔记', '踩坑经验', '项目分享', '技术废柴'],
      ogImage: '/images/og-blog.jpg'
    },
    projects: {
      title: '个人项目 - LJoson 的"废柴"小窝',
      description: '展示我的个人项目、开源作品和技术实践，见证技术废柴的成长轨迹',
      keywords: ['项目展示', '开源项目', '技术实践', '作品集', '技术废柴'],
      ogImage: '/images/og-projects.jpg'
    },
    glimmerlab: {
      title: 'GlimmerLab - 创意工作室',
      description: '我的创意工作室品牌，专注于创意设计、技术咨询和项目合作',
      keywords: ['GlimmerLab', '创意工作室', '技术咨询', '项目合作', '创意设计'],
      ogImage: '/images/og-glimmerlab.jpg'
    },
    about: {
      title: '关于我 - LJoson 的"废柴"小窝',
      description: '了解更多关于这个技术废柴的故事，从菜鸟到大神的成长历程',
      keywords: ['关于我', '技术废柴', '个人介绍', '成长历程', '技术学习'],
      ogImage: '/images/og-about.jpg'
    }
  },
  structuredData: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'LJoson 的"废柴"小窝',
      url: 'https://ljoson.vercel.app',
      logo: 'https://ljoson.vercel.app/images/logo.png',
      description: '从机器人到游戏，从代码到内容创作，用跨界思维探索技术边界',
      sameAs: [
        'https://github.com/LJoson',
        'https://www.youtube.com/@L-Joson',
        'https://space.bilibili.com/362176684',
        'https://xhslink.com/m/4WbYToeY64a',
        'https://www.douyin.com/user/MS4wLjABAAAAd6lG62HOZHLSYzcK7EOCL-Hjd8EgOEPr9slUTY3rykDlmZgP7F1rm0jIxhmtwoXh',
        'https://www.zhihu.com/people/LJoson',
        'https://x.com/glimmer_AIlab',
        'https://blog.csdn.net/qq_43743037'
      ]
    },
    person: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'LJoson',
      url: 'https://ljoson.vercel.app',
      image: 'https://ljoson.vercel.app/images/avatar.jpg',
      description: '从技术"废柴"到跨界探索者的进化之路！从机器人到游戏，从代码到内容创作，用技术点亮创意！',
      jobTitle: '全栈开发工程师',
      worksFor: {
        '@type': 'Organization',
        name: 'GlimmerLab'
      },
      sameAs: [
        'https://github.com/LJoson',
        'https://www.youtube.com/@L-Joson',
        'https://space.bilibili.com/362176684',
        'https://xhslink.com/m/4WbYToeY64a',
        'https://www.douyin.com/user/MS4wLjABAAAAd6lG62HOZHLSYzcK7EOCL-Hjd8EgOEPr9slUTY3rykDlmZgP7F1rm0jIxhmtwoXh',
        'https://www.zhihu.com/people/LJoson',
        'https://x.com/glimmer_AIlab',
        'https://blog.csdn.net/qq_43743037'
      ]
    },
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'LJoson 的"废柴"小窝',
      url: 'https://ljoson.vercel.app',
      description: '从机器人到游戏，从代码到内容创作，用跨界思维探索技术边界',
      author: {
        '@type': 'Person',
        name: 'LJoson'
      },
      publisher: {
        '@type': 'Organization',
        name: 'GlimmerLab'
      }
    },
    blog: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'LJoson 的"废柴"小窝',
      url: 'https://ljoson.vercel.app/blog',
      description: '技术学习笔记和踩坑经验分享',
      author: {
        '@type': 'Person',
        name: 'LJoson'
      },
      publisher: {
        '@type': 'Organization',
        name: 'GlimmerLab'
      }
    }
  },
  analytics: {
    googleAnalytics: {
      measurementId: 'G-XXXXXXXXXX',
      enabled: true
    },
    baiduAnalytics: {
      siteId: 'xxxxxxxx',
      enabled: true
    },
    cnzzAnalytics: {
      siteId: 'xxxxxxxx',
      enabled: false
    }
  },
  sitemap: {
    enabled: true,
    changefreq: 'weekly',
    priority: 0.8,
    excludePaths: ['/admin', '/api', '/_next']
  },
  robots: {
    enabled: true,
    userAgent: '*',
    allow: ['/'],
    disallow: ['/admin', '/api', '/_next', '/private']
  }
}
