#!/usr/bin/env node

/**
 * Cloudflare CDN 设置脚本
 * 为GitHub Pages添加Cloudflare CDN加速
 */

console.log('☁️ Cloudflare CDN + GitHub Pages 详细配置指南');
console.log('============================================\n');

console.log('📋 完整配置步骤:');
console.log('================');
console.log('');

console.log('🌐 第一步：注册Cloudflare账户');
console.log('---------------------------');
console.log('1. 访问: https://dash.cloudflare.com/sign-up');
console.log('2. 使用邮箱注册免费账户');
console.log('3. 验证邮箱并设置密码');
console.log('');

console.log('🔗 第二步：添加你的网站');
console.log('---------------------');
console.log('1. 登录Cloudflare Dashboard');
console.log('2. 点击"Add a Site"');
console.log('3. 输入域名: ljoson.github.io');
console.log('4. 选择免费计划（Free）');
console.log('5. 点击"Continue with Free"');
console.log('');

console.log('📍 第三步：配置DNS设置');
console.log('-------------------');
console.log('1. 查看当前DNS记录（Cloudflare会自动扫描）');
console.log('2. 确认以下记录存在:');
console.log('   Type: CNAME');
console.log('   Name: @');
console.log('   Target: LJoson.github.io');
console.log('   Proxy status: Proxied (橙色云朵)');
console.log('');
console.log('3. 更新DNS服务器:');
console.log('   - Cloudflare会提供两个DNS服务器地址');
console.log('   - 例如: nina.ns.cloudflare.com, rick.ns.cloudflare.com');
console.log('   - 在你的域名注册商处更新DNS服务器');
console.log('');
console.log('4. 等待DNS传播（24-48小时）');
console.log('   - 使用工具检查: https://www.whatsmydns.net/');
console.log('');

console.log('⚡ 第四步：配置性能优化');
console.log('-------------------');
console.log('1. 进入Speed → Optimization');
console.log('2. 启用以下选项:');
console.log('   ✅ Auto Minify (JS, CSS, HTML)');
console.log('   ✅ Brotli');
console.log('   ✅ Rocket Loader');
console.log('   ✅ Early Hints');
console.log('   ✅ HTTP/2');
console.log('   ✅ HTTP/3');
console.log('');
console.log('3. 配置缓存设置:');
console.log('   - 进入Caching → Configuration');
console.log('   - 缓存级别: Standard');
console.log('   - 浏览器缓存TTL: 4 hours');
console.log('   - 边缘缓存TTL: 4 hours');
console.log('');

console.log('🛡️ 第五步：配置安全设置');
console.log('-------------------');
console.log('1. 进入Security → Settings');
console.log('2. 配置安全选项:');
console.log('   - 安全级别: Medium');
console.log('   ✅ Always Use HTTPS');
console.log('   ✅ HSTS');
console.log('   ✅ TLS 1.3');
console.log('   ✅ Opportunistic Encryption');
console.log('');
console.log('3. 配置防火墙规则:');
console.log('   - 进入Security → WAF');
console.log('   - 启用Cloudflare Security Level');
console.log('   - 设置为Medium');
console.log('');

console.log('🔄 第六步：配置页面规则');
console.log('-------------------');
console.log('1. 进入Rules → Page Rules');
console.log('2. 点击"Create Page Rule"');
console.log('3. 配置规则:');
console.log('   URL: ljoson.github.io/*');
console.log('   设置:');
console.log('   - Cache Level: Cache Everything');
console.log('   - Edge Cache TTL: 4 hours');
console.log('   - Browser Cache TTL: 4 hours');
console.log('   - Always Use HTTPS: On');
console.log('   - Security Level: Medium');
console.log('');

console.log('📊 第七步：配置缓存规则');
console.log('-------------------');
console.log('1. 进入Caching → Configuration');
console.log('2. 配置缓存规则:');
console.log('');
console.log('   HTML文件:');
console.log('   - Cache Level: Standard');
console.log('   - Edge Cache TTL: 0 seconds');
console.log('   - Browser Cache TTL: 0 seconds');
console.log('');
console.log('   JS/CSS文件:');
console.log('   - Cache Level: Standard');
console.log('   - Edge Cache TTL: 4 hours');
console.log('   - Browser Cache TTL: 4 hours');
console.log('');
console.log('   图片文件:');
console.log('   - Cache Level: Standard');
console.log('   - Edge Cache TTL: 1 day');
console.log('   - Browser Cache TTL: 1 day');
console.log('');

console.log('🔧 第八步：配置Workers（可选）');
console.log('------------------------');
console.log('1. 进入Workers & Pages');
console.log('2. 点击"Create application" → "Create Worker"');
console.log('3. 使用以下代码:');
console.log(`
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const response = await fetch(request)
  const newResponse = new Response(response.body, response)

  if (request.url.includes('.html') || request.url.endsWith('/')) {
    newResponse.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    newResponse.headers.set('Pragma', 'no-cache')
    newResponse.headers.set('Expires', '0')
  }

  return newResponse
}
`);
console.log('');

console.log('✅ 第九步：验证配置');
console.log('----------------');
console.log('1. 检查DNS传播:');
console.log('   dig ljoson.github.io');
console.log('   https://www.whatsmydns.net/');
console.log('');
console.log('2. 测试网站访问:');
console.log('   https://ljoson.github.io');
console.log('   - 检查是否通过Cloudflare代理');
console.log('   - 查看页面加载速度');
console.log('');
console.log('3. 检查安全头:');
console.log('   curl -I https://ljoson.github.io');
console.log('');

console.log('📈 第十步：监控和分析');
console.log('------------------');
console.log('1. 查看分析数据:');
console.log('   - Analytics → Overview');
console.log('   - 查看访问量、带宽使用等数据');
console.log('');
console.log('2. 性能监控:');
console.log('   - Speed → Insights');
console.log('   - 查看Core Web Vitals数据');
console.log('');
console.log('3. 安全监控:');
console.log('   - Security → Events');
console.log('   - 查看安全事件和威胁');
console.log('');

console.log('🎉 配置完成后，你的网站将获得:');
console.log('============================');
console.log('✅ 全球CDN加速');
console.log('✅ 自动HTTPS');
console.log('✅ DDoS防护');
console.log('✅ 智能缓存');
console.log('✅ 性能优化');
console.log('✅ 安全防护');
console.log('✅ 实时分析');
console.log('');

console.log('🌍 访问你的网站: https://ljoson.github.io');
console.log('📈 性能监控: https://dash.cloudflare.com');
console.log('📊 详细文档: docs/DEPLOYMENT.md');
console.log('');

console.log('💡 提示:');
console.log('=====');
console.log('1. DNS传播可能需要24-48小时');
console.log('2. 如果看不到最新内容，清除Cloudflare缓存');
console.log('3. 使用强制刷新（Ctrl+F5）测试');
console.log('4. 定期检查性能分析数据');
console.log('');

console.log('🚨 常见问题:');
console.log('==========');
console.log('Q: DNS更新后网站无法访问？');
console.log('A: 等待24-48小时DNS传播，使用在线工具检查');
console.log('');
console.log('Q: 更新后看不到最新内容？');
console.log('A: 在Cloudflare Dashboard清除缓存，使用强制刷新');
console.log('');
console.log('Q: HTTPS证书错误？');
console.log('A: 确保SSL/TLS设置为Full，等待证书自动签发');
console.log('');
console.log('Q: 网站加载速度慢？');
console.log('A: 检查优化设置，启用Brotli压缩，配置缓存规则');
console.log('');
