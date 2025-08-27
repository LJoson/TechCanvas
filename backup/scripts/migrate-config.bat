@echo off
chcp 65001 >nul
title 配置迁移工具

echo.
echo ========================================
echo         VuePress配置迁移工具
echo ========================================
echo.

echo [信息] 正在创建VuePress 2.x配置文件...

echo [信息] 创建docs/.vuepress/config.ts...
echo import { defineUserConfig } from 'vuepress'>> docs\.vuepress\config.ts
echo import { defaultTheme } from '@vuepress/theme-default'>> docs\.vuepress\config.ts
echo import { searchPlugin } from '@vuepress/plugin-search'>> docs\.vuepress\config.ts
echo import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'>> docs\.vuepress\config.ts
echo import { pwaPlugin } from '@vuepress/plugin-pwa'>> docs\.vuepress\config.ts
echo import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup'>> docs\.vuepress\config.ts
echo import { copyCodePlugin } from 'vuepress-plugin-copy-code2'>> docs\.vuepress\config.ts
echo import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance'>> docs\.vuepress\config.ts
echo.>> docs\.vuepress\config.ts
echo export default defineUserConfig({>> docs\.vuepress\config.ts
echo   base: '/',>> docs\.vuepress\config.ts
echo   title: 'GLIMMER小作坊的工具人',>> docs\.vuepress\config.ts
echo   description: '时间太瘦，指尖太宽，且行且珍惜',>> docs\.vuepress\config.ts
echo   head: [>> docs\.vuepress\config.ts
echo     ['link', { rel: 'icon', href: '/vuepress/image.png' }],>> docs\.vuepress\config.ts
echo     ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],>> docs\.vuepress\config.ts
echo     ['script', { src: 'https://cdn.staticfile.org/jquery/1.7.2/jquery.min.js' }],>> docs\.vuepress\config.ts
echo     ['script', { src: '/js/MouseClickEffect.js' }]>> docs\.vuepress\config.ts
echo   ],>> docs\.vuepress\config.ts
echo   theme: defaultTheme({>> docs\.vuepress\config.ts
echo     navbar: [>> docs\.vuepress\config.ts
echo       { text: 'Home', link: '/' },>> docs\.vuepress\config.ts
echo       { text: 'Projects', link: '/projects/' },>> docs\.vuepress\config.ts
echo       { text: '时间线', link: '/timeLine/' },>> docs\.vuepress\config.ts
echo       { text: '关于', link: '/about/' }>> docs\.vuepress\config.ts
echo     ],>> docs\.vuepress\config.ts
echo     sidebar: 'auto',>> docs\.vuepress\config.ts
echo     logo: '/vuepress/Headimage.jpg',>> docs\.vuepress\config.ts
echo     repo: 'LJoson/myblog',>> docs\.vuepress\config.ts
echo     docsDir: 'docs',>> docs\.vuepress\config.ts
echo     editLink: true,>> docs\.vuepress\config.ts
echo     lastUpdated: true,>> docs\.vuepress\config.ts
echo     contributors: true>> docs\.vuepress\config.ts
echo   }),>> docs\.vuepress\config.ts
echo   plugins: [>> docs\.vuepress\config.ts
echo     searchPlugin({>> docs\.vuepress\config.ts
echo       maxSuggestions: 10>> docs\.vuepress\config.ts
echo     }),>> docs\.vuepress\config.ts
echo     googleAnalyticsPlugin({>> docs\.vuepress\config.ts
echo       id: 'UA-162861883-1'>> docs\.vuepress\config.ts
echo     }),>> docs\.vuepress\config.ts
echo     pwaPlugin({>> docs\.vuepress\config.ts
echo       skipWaiting: true>> docs\.vuepress\config.ts
echo     }),>> docs\.vuepress\config.ts
echo     pwaPopupPlugin({>> docs\.vuepress\config.ts
echo       locales: {>> docs\.vuepress\config.ts
echo         '/': {>> docs\.vuepress\config.ts
echo           message: '发现新内容可用',>> docs\.vuepress\config.ts
echo           buttonText: '刷新'>> docs\.vuepress\config.ts
echo         }>> docs\.vuepress\config.ts
echo       }>> docs\.vuepress\config.ts
echo     }),>> docs\.vuepress\config.ts
echo     copyCodePlugin({>> docs\.vuepress\config.ts
echo       locales: {>> docs\.vuepress\config.ts
echo         '/': {>> docs\.vuepress\config.ts
echo           copy: '复制代码',>> docs\.vuepress\config.ts
echo           hint: '复制成功!'>> docs\.vuepress\config.ts
echo         }>> docs\.vuepress\config.ts
echo       }>> docs\.vuepress\config.ts
echo     }),>> docs\.vuepress\config.ts
echo     mdEnhancePlugin({>> docs\.vuepress\config.ts
echo       container: true,>> docs\.vuepress\config.ts
echo       tabs: true,>> docs\.vuepress\config.ts
echo       codetabs: true,>> docs\.vuepress\config.ts
echo       align: true,>> docs\.vuepress\config.ts
echo       attrs: true,>> docs\.vuepress\config.ts
echo       sub: true,>> docs\.vuepress\config.ts
echo       sup: true,>> docs\.vuepress\config.ts
echo       footnote: true,>> docs\.vuepress\config.ts
echo       mark: true,>> docs\.vuepress\config.ts
echo       tasklist: true,>> docs\.vuepress\config.ts
echo       flowchart: true,>> docs\.vuepress\config.ts
echo       mermaid: true>> docs\.vuepress\config.ts
echo     })>> docs\.vuepress\config.ts
echo   ],>> docs\.vuepress\config.ts
echo   markdown: {>> docs\.vuepress\config.ts
echo     lineNumbers: true>> docs\.vuepress\config.ts
echo   }>> docs\.vuepress\config.ts
echo })>> docs\.vuepress\config.ts

echo [成功] config.ts已创建

echo [信息] 正在创建客户端配置文件...
echo import { defineClientConfig } from '@vuepress/client'>> docs\.vuepress\client.ts
echo.>> docs\.vuepress\client.ts
echo export default defineClientConfig({>> docs\.vuepress\client.ts
echo   enhance({ app, router, siteData }) {>> docs\.vuepress\client.ts
echo     // 客户端增强配置>> docs\.vuepress\client.ts
echo   },>> docs\.vuepress\client.ts
echo   setup() {>> docs\.vuepress\client.ts
echo     // 组合式API设置>> docs\.vuepress\client.ts
echo   },>> docs\.vuepress\client.ts
echo   rootComponents: [],>> docs\.vuepress\client.ts
echo })>> docs\.vuepress\client.ts

echo [成功] client.ts已创建

echo [信息] 正在创建README.md...
echo # VuePress 2.x 博客>> docs\README.md
echo.>> docs\README.md
echo 欢迎来到我的博客！>> docs\README.md
echo.>> docs\README.md
echo ## 特性>> docs\README.md
echo.>> docs\README.md
echo - 🚀 基于 VuePress 2.x>> docs\README.md
echo - 📝 Markdown 增强>> docs\README.md
echo - 🔍 全文搜索>> docs\README.md
echo - 📱 PWA 支持>> docs\README.md
echo - 🎨 现代化主题>> docs\README.md

echo [成功] README.md已创建

echo.
echo ========================================
echo           迁移完成！
echo ========================================
echo.
echo [重要] 接下来需要：
echo     1. 检查并调整配置文件
echo     2. 迁移自定义组件和样式
echo     3. 测试构建和部署
echo.
echo [提示] 原始配置已备份在 backup 目录
echo [提示] 可以运行 test-build.bat 测试构建
echo.

echo 按任意键继续...
pause >nul
