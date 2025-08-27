# 🚀 部署指南

## 📋 部署方案概览

### 1. GitHub Pages + Cloudflare CDN（推荐）
- **优势**：保持现有GitHub Pages部署，添加全球CDN加速
- **适用场景**：想要最佳性能和稳定性
- **配置复杂度**：中等

### 2. Cloudflare Pages（最佳性能）
- **优势**：全球最快的CDN，自动HTTPS，DDoS防护
- **适用场景**：追求极致性能
- **配置复杂度**：简单

### 3. GitHub Pages（基础方案）
- **优势**：简单易用，免费
- **适用场景**：快速部署，基础需求
- **配置复杂度**：简单

---

## ☁️ Cloudflare CDN + GitHub Pages 详细配置

### 第一步：注册Cloudflare账户

1. **访问注册页面**
   - 打开：https://dash.cloudflare.com/sign-up
   - 使用邮箱注册免费账户

2. **验证邮箱**
   - 检查邮箱，点击验证链接
   - 设置密码和安全问题

### 第二步：添加你的网站

1. **添加站点**
   - 登录Cloudflare Dashboard
   - 点击"Add a Site"
   - 输入域名：`ljoson.github.io`
   - 选择免费计划（Free）

2. **选择计划**
   - 选择"Free"计划
   - 点击"Continue with Free"

### 第三步：配置DNS设置

1. **查看当前DNS记录**
   - Cloudflare会自动扫描你的DNS记录
   - 确认以下记录存在：
     ```
     Type: CNAME
     Name: @
     Target: LJoson.github.io
     Proxy status: Proxied (橙色云朵)
     ```

2. **更新DNS服务器**
   - Cloudflare会提供两个DNS服务器地址
   - 例如：
     ```
     Primary: nina.ns.cloudflare.com
     Secondary: rick.ns.cloudflare.com
     ```
   - 在你的域名注册商处更新DNS服务器

3. **等待DNS传播**
   - DNS更新通常需要24-48小时
   - 可以使用在线工具检查：https://www.whatsmydns.net/

### 第四步：配置性能优化

1. **进入Speed设置**
   - 在Cloudflare Dashboard点击"Speed"
   - 选择"Optimization"

2. **启用优化选项**
   - ✅ **Auto Minify**: 启用JS、CSS、HTML压缩
   - ✅ **Brotli**: 启用Brotli压缩
   - ✅ **Rocket Loader**: 启用Rocket Loader
   - ✅ **Early Hints**: 启用Early Hints
   - ✅ **HTTP/2**: 启用HTTP/2
   - ✅ **HTTP/3**: 启用HTTP/3

3. **配置缓存设置**
   - 进入"Caching" → "Configuration"
   - 缓存级别：Standard
   - 浏览器缓存TTL：4 hours
   - 边缘缓存TTL：4 hours

### 第五步：配置安全设置

1. **进入Security设置**
   - 点击"Security" → "Settings"

2. **配置安全选项**
   - **安全级别**: Medium
   - ✅ **Always Use HTTPS**: 启用
   - ✅ **HSTS**: 启用
   - ✅ **TLS 1.3**: 启用
   - ✅ **Opportunistic Encryption**: 启用

3. **配置防火墙规则**
   - 进入"Security" → "WAF"
   - 启用"Cloudflare Security Level"
   - 设置为"Medium"

### 第六步：配置页面规则

1. **创建页面规则**
   - 进入"Rules" → "Page Rules"
   - 点击"Create Page Rule"

2. **配置规则**
   ```
   URL: ljoson.github.io/*
   设置:
   - Cache Level: Cache Everything
   - Edge Cache TTL: 4 hours
   - Browser Cache TTL: 4 hours
   - Always Use HTTPS: On
   - Security Level: Medium
   ```

### 第七步：配置缓存规则

1. **进入缓存设置**
   - 点击"Caching" → "Configuration"

2. **配置缓存规则**
   ```
   HTML文件:
   - Cache Level: Standard
   - Edge Cache TTL: 0 seconds
   - Browser Cache TTL: 0 seconds

   JS/CSS文件:
   - Cache Level: Standard
   - Edge Cache TTL: 4 hours
   - Browser Cache TTL: 4 hours

   图片文件:
   - Cache Level: Standard
   - Edge Cache TTL: 1 day
   - Browser Cache TTL: 1 day
   ```

### 第八步：配置Workers（可选）

1. **创建Worker**
   - 进入"Workers & Pages"
   - 点击"Create application"
   - 选择"Create Worker"

2. **Worker代码示例**
   ```javascript
   addEventListener('fetch', event => {
     event.respondWith(handleRequest(event.request))
   })

   async function handleRequest(request) {
     // 添加自定义缓存头
     const response = await fetch(request)
     const newResponse = new Response(response.body, response)

     // 为HTML文件添加no-cache头
     if (request.url.includes('.html') || request.url.endsWith('/')) {
       newResponse.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
       newResponse.headers.set('Pragma', 'no-cache')
       newResponse.headers.set('Expires', '0')
     }

     return newResponse
   }
   ```

### 第九步：验证配置

1. **检查DNS传播**
   ```bash
   # 使用dig命令检查
   dig ljoson.github.io

   # 或使用在线工具
   https://www.whatsmydns.net/
   ```

2. **测试网站访问**
   - 访问：https://ljoson.github.io
   - 检查是否通过Cloudflare代理
   - 查看页面加载速度

3. **检查安全头**
   ```bash
   # 使用curl检查响应头
   curl -I https://ljoson.github.io
   ```

### 第十步：监控和分析

1. **查看分析数据**
   - 进入"Analytics" → "Overview"
   - 查看访问量、带宽使用等数据

2. **性能监控**
   - 进入"Speed" → "Insights"
   - 查看Core Web Vitals数据

3. **安全监控**
   - 进入"Security" → "Events"
   - 查看安全事件和威胁

---

## 🎯 部署命令

### 部署到GitHub Pages
```bash
# 部署到gh-pages分支
npm run deploy

# 部署到master分支
npm run deploy:master
```

### 查看Cloudflare CDN设置指南
```bash
npm run setup:cloudflare-cdn
```

---

## ✅ 配置完成检查清单

- [ ] Cloudflare账户注册完成
- [ ] 域名添加到Cloudflare
- [ ] DNS服务器更新完成
- [ ] DNS传播验证通过
- [ ] 性能优化配置完成
- [ ] 安全设置配置完成
- [ ] 页面规则创建完成
- [ ] 缓存规则配置完成
- [ ] 网站访问测试通过
- [ ] 安全头验证通过

---

## 🚨 常见问题解决

### 1. DNS传播问题
**问题**：DNS更新后网站无法访问
**解决**：
- 等待24-48小时DNS传播
- 使用在线工具检查DNS状态
- 清除本地DNS缓存

### 2. 缓存问题
**问题**：更新后看不到最新内容
**解决**：
- 在Cloudflare Dashboard清除缓存
- 使用强制刷新（Ctrl+F5）
- 检查缓存规则配置

### 3. HTTPS问题
**问题**：HTTPS证书错误
**解决**：
- 确保Cloudflare SSL/TLS设置为"Full"
- 检查域名DNS设置
- 等待证书自动签发

### 4. 性能问题
**问题**：网站加载速度慢
**解决**：
- 检查Cloudflare优化设置
- 启用Brotli压缩
- 配置合适的缓存规则

---

## 📊 性能优化建议

### 1. 图片优化
- 使用WebP格式
- 启用图片压缩
- 使用懒加载

### 2. 代码优化
- 启用代码压缩
- 使用HTTP/2
- 启用Early Hints

### 3. 缓存策略
- HTML文件：不缓存
- JS/CSS文件：缓存4小时
- 图片文件：缓存1天
- 字体文件：缓存1年

---

## 🔗 有用链接

- **Cloudflare Dashboard**: https://dash.cloudflare.com
- **DNS检查工具**: https://www.whatsmydns.net/
- **性能测试**: https://pagespeed.web.dev/
- **安全测试**: https://observatory.mozilla.org/
- **GitHub Pages**: https://pages.github.com/
