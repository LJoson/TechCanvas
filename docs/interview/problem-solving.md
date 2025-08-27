# 问题解决能力面试题库

## 🎯 面试目标

本题库旨在评估候选人的问题解决能力，包括：
- 技术问题分析和解决能力
- 架构设计思维
- 代码质量控制意识
- 团队协作能力
- 持续改进意识

## 📋 面试题目

### 🏗️ 架构设计类问题

#### 1. Next.js App Router 布局问题

**题目**：在一个 Next.js 14 项目中，你发现页脚在多个页面中重复显示。请分析可能的原因并提供解决方案。

**考察点**：
- Next.js App Router 的理解
- 组件架构设计思维
- 问题分析和解决能力

**参考答案**：

**问题分析**：
1. 检查根布局 (`app/layout.tsx`) 是否已定义 Footer
2. 检查各个页面是否重复定义了 Footer
3. 理解 Next.js App Router 的布局嵌套机制

**可能原因**：
- 根布局中已定义全局 Footer
- 页面组件中又重复定义了 Footer
- 没有理解布局嵌套机制

**解决方案**：
```typescript
// 根布局 app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />  // 全局定义
      </body>
    </html>
  )
}

// 页面组件 - 错误做法
export default function BlogPage() {
  return (
    <>
      <Header />  // 重复定义
      <main>...</main>
      <Footer />  // 重复定义
    </>
  )
}

// 页面组件 - 正确做法
export default function BlogPage() {
  return (
    <div className="blog-content">
      <BlogList />
      <BlogSidebar />
    </div>
  )
}
```

**预防措施**：
- 建立组件重复检查清单
- 理解框架的架构机制
- 建立代码审查流程

#### 2. 组件层级冲突问题

**题目**：在一个 React 项目中，你发现导航栏被背景动画遮挡，页脚显示异常。请分析问题并提供解决方案。

**考察点**：
- CSS 层级管理
- 组件架构设计
- 系统性思维

**参考答案**：

**问题分析**：
1. 检查 z-index 层级关系
2. 分析组件渲染顺序
3. 评估整体架构设计

**根本原因**：
- 缺乏标准化的层级体系
- 修改 z-index 时没有考虑整体影响
- 组件层级管理混乱

**解决方案**：
建立标准化的层级体系：
```css
/* 层级体系标准 */
.modal { z-index: 50; }        /* 模态框 */
.toggle { z-index: 45; }       /* 控制按钮 */
.header { z-index: 40; }       /* 导航栏 */
.footer { z-index: 35; }       /* 页脚 */
.cursor-main { z-index: 30; }  /* 鼠标跟随主光标 */
.cursor-follow { z-index: 25; } /* 鼠标跟随跟随光标 */
.cursor-particles { z-index: 20; } /* 鼠标跟随粒子 */
.cursor-pulse { z-index: 15; } /* 鼠标跟随脉冲 */
.content { z-index: 10; }      /* 主要内容 */
.background { z-index: 0; }    /* 背景动画 */
```

**预防措施**：
- 建立层级修改规则
- 每次修改前评估整体影响
- 建立测试验证流程

### 🎨 UI/UX 类问题

#### 3. 性能优化问题

**题目**：用户反馈网站背景动画导致页面卡顿，鼠标移动时动画疯狂漂移。请分析问题并提供优化方案。

**考察点**：
- 性能优化意识
- 用户体验思维
- 技术实现能力

**参考答案**：

**问题分析**：
1. 动画复杂度过高
2. 鼠标交互过于激进
3. 缺乏性能监控

**优化方案**：
```typescript
// 优化前 - 性能问题
const particles = Array.from({ length: 120 }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  speedX: (Math.random() - 0.5) * 2,  // 速度过快
  speedY: (Math.random() - 0.5) * 2,
  opacity: Math.random() * 0.8 + 0.2
}))

// 优化后 - 性能优化
const particles = Array.from({ length: 80 }, () => ({  // 减少数量
  x: Math.random() * width,
  y: Math.random() * height,
  speedX: (Math.random() - 0.5) * 0.8,  // 降低速度
  speedY: (Math.random() - 0.5) * 0.8,
  opacity: Math.random() * 0.6 + 0.1    // 降低透明度
}))

// 移除激进的鼠标交互
// 优化前：鼠标移动时大幅改变动画
// 优化后：移除鼠标交互或使用温和的交互
```

**性能监控**：
- 使用 React DevTools Profiler
- 监控 FPS 和内存使用
- 建立性能基准测试

### 🔧 技术实现类问题

#### 4. 组件导入错误

**题目**：在开发过程中，你遇到了组件导入错误，页面无法正常渲染。请描述你的调试和解决流程。

**考察点**：
- 调试能力
- 问题解决流程
- 技术细节掌握

**参考答案**：

**调试流程**：
1. **错误信息分析**：查看控制台错误信息
2. **导入路径检查**：确认导入路径是否正确
3. **组件导出检查**：确认组件是否正确导出
4. **文件结构验证**：检查文件是否存在
5. **TypeScript 检查**：利用类型检查发现错误

**常见原因**：
```typescript
// 1. 导入路径错误
import { Component } from '@/components/Component'  // 路径不存在

// 2. 导出方式不匹配
// 文件使用 default export
export default function Component() {}

// 但使用 named import
import { Component } from './Component'  // 错误

// 3. 文件扩展名问题
import { Component } from './Component'  // 缺少 .tsx 扩展名
```

**解决流程**：
1. 检查导入路径的正确性
2. 确认组件的导出方式
3. 同步文件结构变更
4. 使用 TypeScript 类型检查
5. 重启开发服务器

### 📚 经验总结类问题

#### 5. 团队协作问题

**题目**：在团队开发中，你发现团队成员经常犯同样的错误（如组件重复定义）。请描述你会如何解决这个问题。

**考察点**：
- 团队协作能力
- 流程改进意识
- 知识管理能力

**参考答案**：

**问题分析**：
1. 缺乏统一的开发规范
2. 没有建立知识共享机制
3. 缺乏代码审查流程

**解决方案**：

1. **建立开发规范**：
   - 制定组件开发规范
   - 建立代码审查标准
   - 创建最佳实践文档

2. **知识共享机制**：
   - 建立团队知识库
   - 记录常见问题和解决方案
   - 定期技术分享

3. **流程改进**：
   - 建立代码审查流程
   - 使用自动化工具检查
   - 建立持续改进机制

4. **工具支持**：
   - 使用 ESLint 规则检查
   - 建立自动化测试
   - 使用 TypeScript 类型检查

**预防措施**：
- 建立问题解决手册
- 创建面试题库
- 建立业务手册
- 定期更新文档

## 🎯 评估标准

### 优秀表现
- 能够系统性地分析问题
- 提供完整的解决方案
- 考虑预防措施和长期改进
- 具备团队协作意识

### 良好表现
- 能够分析问题原因
- 提供基本解决方案
- 考虑部分预防措施
- 具备基本协作意识

### 需要改进
- 问题分析不够深入
- 解决方案不够完整
- 缺乏预防措施
- 协作意识不足

## 📖 相关资源

- [问题解决手册](../business/problem-solving.md)
- [架构设计文档](../architecture/README.md)
- [开发规范文档](../development/README.md)
- [最佳实践文档](../business/best-practices.md)
