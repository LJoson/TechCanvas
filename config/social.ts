export const socialConfig = {
  platforms: {
    github: {
      name: 'GitHub',
      url: 'https://github.com/LJoson',
      icon: 'github',
      color: '#333',
      description: '开源项目和技术分享',
      apiEndpoint: 'https://api.github.com/users/LJoson',
      metrics: ['repos', 'followers', 'stars']
    },
    youtube: {
      name: 'YouTube',
      url: 'https://www.youtube.com/@L-Joson',
      icon: 'youtube',
      color: '#FF0000',
      description: '技术视频和教程分享',
      metrics: ['subscribers', 'videos', 'views']
    },
    bilibili: {
      name: 'B站',
      url: 'https://space.bilibili.com/362176684',
      icon: 'bilibili',
      color: '#00A1D6',
      description: '技术视频和教程分享',
      apiEndpoint: 'https://api.bilibili.com/x/space/acc/info',
      metrics: ['followers', 'videos', 'views']
    },
    xiaohongshu: {
      name: '小红书',
      url: 'https://xhslink.com/m/4WbYToeY64a',
      icon: 'xiaohongshu',
      color: '#FF2442',
      description: '技术笔记和生活分享',
      metrics: ['followers', 'notes', 'likes']
    },
    douyin: {
      name: '抖音',
      url: 'https://www.douyin.com/user/MS4wLjABAAAAd6lG62HOZHLSYzcK7EOCL-Hjd8EgOEPr9slUTY3rykDlmZgP7F1rm0jIxhmtwoXh',
      icon: 'douyin',
      color: '#000000',
      description: '短视频技术分享',
      metrics: ['followers', 'videos', 'likes']
    },
    zhihu: {
      name: '知乎',
      url: 'https://www.zhihu.com/people/LJoson',
      icon: 'zhihu',
      color: '#0084FF',
      description: '技术问答和深度文章',
      metrics: ['followers', 'answers', 'articles']
    },
    twitter: {
      name: 'Twitter',
      url: 'https://x.com/glimmer_AIlab',
      icon: 'twitter',
      color: '#1DA1F2',
      description: '技术分享和行业动态',
      metrics: ['followers', 'tweets', 'likes']
    },
    csdn: {
      name: 'CSDN',
      url: 'https://blog.csdn.net/qq_43743037',
      icon: 'csdn',
      color: '#FC5531',
      description: '技术博客和社区分享',
      metrics: ['followers', 'articles', 'views']
    }
  },
  brandLinks: {
    glimmerlab: {
      name: 'GlimmerLab',
      description: '我的创意工作室品牌',
      url: 'https://glimmerlab.top',
      color: '#FF6B6B',
      isExternal: true,
      features: ['创意设计', '技术咨询', '项目合作']
    },
    community: {
      name: '技术废柴社区',
      description: '废柴们的技术交流群',
      url: '/community',
      color: '#FF8E53',
      isExternal: false,
      features: ['技术交流', '学习分享', '项目合作']
    }
  },
  contact: {
    email: 'junli440883@gmail.com',
    wechat: 'LJoson_1',
    qq: '1250377062',
    telegram: '@ljoson'
  },
  sharing: {
    platforms: ['weibo', 'wechat', 'qq', 'douyin', 'bilibili'],
    defaultText: '分享一个技术废柴的成长故事：',
    hashtags: ['#技术废柴', '#程序员', '#技术分享', '#学习笔记']
  }
}
