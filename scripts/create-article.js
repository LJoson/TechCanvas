#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

async function createArticle() {
  console.log('🎯 创建新文章模板')
  console.log('==================\n')

  // 获取文章信息
  const title = await question('文章标题: ')
  const description = await question('文章描述: ')
  const category = await question('分类 (计算机技术/算法/游戏开发/AI及机器人/学习笔记/杂谈): ')
  const tags = await question('标签 (用逗号分隔): ')
  const featured = await question('是否精选文章? (y/n): ')
  const status = await question('状态 (published/draft/archived): ')

  // 生成slug
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .trim()

  // 生成日期
  const date = new Date().toISOString().split('T')[0]

  // 生成文件内容
  const content = `---
title: '${title}'
description: '${description}'
date: '${date}'
readTime: 'X分钟'
tags: [${tags.split(',').map(tag => `'${tag.trim()}'`).join(', ')}]
category: '${category}'
slug: '${slug}'
featured: ${featured.toLowerCase() === 'y'}
author: 'LJoson'
status: '${status}'
---

# ${title}

## 前言

在这里写文章的前言部分...

## 正文内容

### 第一部分

在这里写第一部分内容...

### 第二部分

在这里写第二部分内容...

## 总结

在这里写文章总结...

---

*标签：${tags}*
`

  // 确定文件路径
  const categoryPath = category.replace(/\s+/g, '-').toLowerCase()
  const dirPath = path.join(process.cwd(), 'content', 'blog', categoryPath)
  const filePath = path.join(dirPath, `${slug}.md`)

  // 创建目录
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }

  // 写入文件
  fs.writeFileSync(filePath, content, 'utf8')

  console.log('\n✅ 文章创建成功!')
  console.log(`📁 文件路径: ${filePath}`)
  console.log(`🔗 访问链接: /blog/${slug}`)
  console.log('\n💡 提示:')
  console.log('- 编辑文章内容')
  console.log('- 更新readTime为实际阅读时间')
  console.log('- 根据需要调整tags和category')
  console.log('- 设置status为published以发布文章')

  rl.close()
}

createArticle().catch(console.error)
