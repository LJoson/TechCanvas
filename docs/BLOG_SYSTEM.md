# 博客内容管理系统使用指南

## 概述

这是一个基于MDX的博客内容管理系统，支持自动读取文章元数据、分类管理、标签系统等功能。

## 文章格式

### 元数据格式

每篇文章都需要在开头包含YAML格式的元数据：

```yaml
---
title: '🎯 文章标题'
description: '文章简短描述，用于在列表中显示，建议控制在100-150字以内'
date: 'YYYY-MM-DD'
readTime: 'X分钟'
tags: ['标签1', '标签2', '标签3']
category: '分类名称'
slug: 'article-slug'
featured: false
author: 'LJoson'
status: 'published' # published, draft, archived
---
```

### 元数据字段说明

- **title**: 文章标题，支持emoji
- **description**: 文章描述，用于列表显示和SEO
- **date**: 发布日期，格式：YYYY-MM-DD
- **readTime**: 预计阅读时间
- **tags**: 标签数组，用于分类和搜索
- **category**: 文章分类
- **slug**: URL友好的标识符，自动生成
- **featured**: 是否为精选文章
- **author**: 作者名称
- **status**: 文章状态（published/draft/archived）

### 分类系统

预定义的分类：

- **计算机技术**: 编程、开发工具、技术架构等
- **算法**: 数据结构、算法、LeetCode等
- **游戏开发**: Unity、UE5、游戏设计等
- **AI及机器人**: 机器学习、深度学习、机器人等
- **学习笔记**: 学习心得、教程笔记等
- **杂谈**: 个人感悟、技术思考等

## 创建新文章

### 方法1：使用脚本（推荐）

```bash
npm run create-article
```

脚本会引导你输入文章信息，自动生成模板文件。

### 方法2：手动创建

1. 在 `content/blog/` 下创建对应的分类目录
2. 创建 `.md` 文件
3. 添加元数据
4. 编写文章内容

### 文件结构示例

```
content/blog/
├── computer-tech/
│   ├── design-patterns-practical.md
│   └── ...
├── algorithm/
│   ├── algorithm-learning-notes.md
│   └── ...
├── game-dev/
│   ├── game-development-practical.md
│   └── ...
└── ...
```

## 文章内容规范

### 标题层级

- `#` 一级标题（文章标题）
- `##` 二级标题（章节标题）
- `###` 三级标题（小节标题）
- `####` 四级标题（子小节标题）

### 代码块

使用三个反引号包裹代码：

````markdown
```javascript
function example() {
  console.log('Hello World');
}
```
````

### 链接

```markdown
[链接文本](URL)
```

### 图片

```markdown
![图片描述](图片URL)
```

### 列表

```markdown
- 无序列表项1
- 无序列表项2

1. 有序列表项1
2. 有序列表项2
```

## 功能特性

### 自动功能

- **自动读取**: 系统自动扫描 `content/blog/` 目录下的所有 `.md` 文件
- **元数据解析**: 自动解析文章开头的YAML元数据
- **分类统计**: 自动统计每个分类的文章数量
- **标签统计**: 自动统计每个标签的使用次数
- **搜索功能**: 支持标题、描述、内容、标签、分类的全文搜索
- **分页功能**: 自动分页显示文章列表

### 显示功能

- **文章列表**: 支持搜索、分类过滤、标签过滤
- **文章详情**: 完整的文章内容展示
- **侧边栏**: 分类、标签、最新文章、精选文章
- **响应式设计**: 适配各种屏幕尺寸

### SEO优化

- **自动生成元数据**: 根据文章内容自动生成SEO元数据
- **Open Graph**: 支持社交媒体分享
- **Twitter Cards**: 支持Twitter分享
- **结构化数据**: 自动生成结构化数据

## 开发指南

### 添加新功能

1. 修改 `lib/content/mdx-parser.ts` 添加新的解析逻辑
2. 更新组件以使用新功能
3. 更新类型定义

### 自定义样式

- 全局样式：`app/globals.css`
- 组件样式：使用Tailwind CSS类名
- 主题配置：`tailwind.config.js`

### 部署

1. 构建项目：`npm run build`
2. 启动服务：`npm run start`

## 常见问题

### Q: 文章不显示怎么办？

A: 检查以下几点：
- 确保 `status` 设置为 `published`
- 检查文件路径是否正确
- 检查YAML元数据格式是否正确

### Q: 如何修改文章分类？

A: 修改文章元数据中的 `category` 字段，系统会自动重新分类。

### Q: 如何添加新的分类？

A: 直接在文章元数据中使用新的分类名称，系统会自动创建。

### Q: 如何设置精选文章？

A: 将文章元数据中的 `featured` 设置为 `true`。

## 更新日志

### v2.0.0
- 重构为基于MDX的内容管理系统
- 添加自动元数据解析
- 支持文章状态管理
- 优化搜索和过滤功能
- 添加文章创建脚本

### v1.0.0
- 初始版本
- 基础博客功能
- 静态文章数据
