# TechCanvas 🎨

> **现代化技术博客创作平台** - 用最先进的技术栈构建你独特的数字身份

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Anime.js](https://img.shields.io/badge/Anime.js-4.0-FF6B6B?logo=javascript)](https://animejs.com/)

<div align="center">
  <img src="public/favicon.svg" alt="TechCanvas Logo" width="120" height="120">
  <br>
  <em>每个开发者都是艺术家，每个技术博客都是艺术品</em>
</div>

## ✨ 核心特性

### 🎨 **完全可定制化**
- **主题系统**：内置精美主题，支持深度定制
- **组件库**：丰富的可定制组件，满足各种需求
- **动画系统**：流畅的动画效果，提升用户体验
- **3D场景**：沉浸式3D背景，打造独特视觉体验

### 🚀 **现代化技术栈**
- **Next.js 14** (App Router) - 最新的React渲染技术
- **TypeScript 5.x** - 类型安全的开发体验
- **Tailwind CSS** - 实用优先的CSS框架
- **Anime.js 4.0** - 专业级动画库
- **Three.js + WebGPU** - 下一代3D图形技术
- **WebAudio API** - 沉浸式音频体验
- **MDX + Contentlayer** - 内容管理系统

### ⚡ **生产就绪**
- **SEO优化** - 内置完整的SEO优化方案
- **PWA支持** - 完整的渐进式Web应用支持
- **性能优化** - 自动性能优化，确保最佳体验
- **移动优先** - 响应式设计，适配所有设备
- **无障碍访问** - 符合WCAG标准的无障碍设计

### 🛠️ **开发者体验**
- **热重载** - 即时开发反馈
- **类型安全** - 完整的TypeScript支持
- **代码分割** - 自动代码优化
- **图片优化** - 内置图片优化
- **字体优化** - 自动字体优化

## 🎯 适用场景

- **个人技术博客** - 展示你的技术专长
- **开发者作品集** - 构建你的专业品牌
- **团队博客** - 在组织内分享知识
- **技术社区** - 创建引人入胜的社区平台
- **文档站点** - 美观的技术文档
- **项目展示** - 以风格展示你的项目

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm、yarn 或 pnpm

### 安装

```bash
# 创建新的 TechCanvas 项目
npx create-techcanvas@latest my-blog

# 进入项目目录
cd my-blog

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看你的博客。

### 生产构建

```bash
# 构建应用
npm run build

# 启动生产服务器
npm start
```

## 🎨 定制化

### 主题配置

```typescript
// config/theme.ts
export const themeConfig = {
  colors: {
    primary: '#ff6b6b',
    secondary: '#4ecdc4',
    accent: '#45b7d1',
    background: '#ffffff',
    surface: '#f8f9fa',
    text: '#2d3748',
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
    code: 'Fira Code',
  },
  animationStyle: 'smooth',
  layout: 'centered',
}
```

### 组件定制

```typescript
// components/custom/MyComponent.tsx
import { ComponentConfig } from '@/types'

export const MyComponent: React.FC<ComponentConfig> = ({ config }) => {
  return (
    <div className="custom-component">
      {/* 你的自定义组件 */}
    </div>
  )
}
```

## 📚 文档

- [快速开始](https://github.com/LJoson/TechCanvas#-快速开始) - 快速设置指南
- [定制化指南](https://github.com/LJoson/TechCanvas#-定制化) - 深度定制
- [组件库](https://github.com/LJoson/TechCanvas#-组件库) - 可用组件
- [内置主题](https://github.com/LJoson/TechCanvas#-内置主题) - 可用主题
- [项目结构](https://github.com/LJoson/TechCanvas#-项目结构) - 项目组织

## 🎭 内置主题

### 技术探索者主题
- **风格**：现代科技美学
- **色彩**：蓝色和橙色渐变
- **动画**：流畅过渡
- **适用**：技术博客和作品集

### 赛博朋克主题
- **风格**：未来霓虹美学
- **色彩**：绿色和粉色霓虹
- **动画**：故障效果
- **适用**：游戏和未来内容

### 极简主题
- **风格**：简洁干净
- **色彩**：黑白配色
- **动画**：微妙动效
- **适用**：专业作品集

### 复古主题
- **风格**：80/90年代美学
- **色彩**：暖橙色和棕色
- **动画**：有机动效
- **适用**：怀旧内容

## 🏗️ 项目结构

```
TechCanvas/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   ├── blog/              # 博客页面
│   ├── projects/          # 项目页面
│   └── about/             # 关于页面
├── components/            # React组件
│   ├── ui/               # 基础UI组件
│   ├── animations/       # 动画组件
│   ├── three/            # 3D组件
│   └── layout/           # 布局组件
├── lib/                  # 工具库
│   ├── animations/       # 动画工具
│   ├── audio/            # 音频工具
│   ├── three/            # 3D工具
│   └── utils/            # 通用工具
├── content/              # MDX内容
│   ├── blog/             # 博客文章
│   └── projects/         # 项目文档
├── public/               # 静态资源
│   ├── images/           # 图片资源
│   ├── audio/            # 音频资源
│   └── models/           # 3D模型
├── config/               # 配置文件
├── styles/               # 全局样式
└── scripts/              # 构建脚本
```

## 🎨 组件库

### UI组件
- **Button** - 带动画的交互按钮
- **Card** - 带悬停效果的内容卡片
- **Modal** - 带平滑过渡的覆盖模态框
- **LoadingSpinner** - 自定义加载动画
- **SvgIcons** - 可缩放矢量图标

### 动画组件
- **FailAnimation** - 技术废柴主题动画
- **LoadingAnimation** - 自定义加载序列
- **TypewriterEffect** - 打字机效果
- **FloatingParticles** - 背景粒子效果

### 3D组件
- **TechFailPlanet** - 交互式3D星球
- **FloatingParticles** - 3D粒子系统
- **InteractiveLogo** - 3D Logo交互
- **ThreeBackground** - 3D背景场景

## 🚀 部署

### Vercel (推荐)

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署到 Vercel
vercel
```

### Netlify

```bash
# 构建项目
npm run build

# 部署到 Netlify
netlify deploy --prod --dir=out
```

### Cloudflare Pages

```bash
# 构建项目
npm run build

# 部署到 Cloudflare Pages
wrangler pages publish out
```

## 🤝 贡献

我们欢迎贡献！请查看我们的[贡献指南](CONTRIBUTING.md)了解详情。

### 开发设置

```bash
# Fork 并克隆仓库
git clone https://github.com/your-username/techcanvas.git

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行测试
npm test

# 生产构建
npm run build
```

### 代码风格

- **TypeScript** - 所有代码必须类型化
- **ESLint** - 代码检查和格式化
- **Prettier** - 代码格式化
- **Husky** - Git钩子质量保证

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- **Next.js 团队** - 感谢优秀的框架
- **Vercel** - 感谢托管和部署服务
- **Tailwind CSS** - 感谢实用优先的CSS框架
- **Anime.js** - 感谢动画库
- **Three.js** - 感谢3D图形能力
- **社区** - 感谢所有贡献和反馈

## 📞 支持

- **GitHub Issues**：[报告问题和请求功能](https://github.com/LJoson/TechCanvas/issues)
- **GitHub Discussions**：[加入讨论](https://github.com/LJoson/TechCanvas/discussions)

## 🌟 Star 历史

[![Star History Chart](https://api.star-history.com/svg?repos=LJoson/TechCanvas&type=Date)](https://star-history.com/#LJoson/TechCanvas&Date)

---

<div align="center">
  <strong>由 TechCanvas 社区用 ❤️ 制作</strong>
  <br>
  <em>每个开发者都是艺术家，每个技术博客都是艺术品</em>
</div>
