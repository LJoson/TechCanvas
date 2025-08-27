#!/usr/bin/env node

/**
 * Cloudflare Pages 部署脚本
 * 使用Wrangler CLI部署到Cloudflare Pages
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('☁️ Cloudflare Pages 部署脚本');
console.log('============================\n');

// 检查Wrangler CLI
function checkWrangler() {
  console.log('🔍 检查Wrangler CLI...');

  try {
    execSync('wrangler --version', { stdio: 'pipe' });
    console.log('✅ Wrangler CLI 已安装');
    return true;
  } catch (error) {
    console.log('❌ Wrangler CLI 未安装');
    console.log('📦 请运行: npm install -g wrangler');
    return false;
  }
}

// 构建项目
function buildProject() {
  console.log('🔨 开始构建项目...');

  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ 构建完成');
    return true;
  } catch (error) {
    console.error('❌ 构建失败:', error.message);
    return false;
  }
}

// 检查构建输出
function checkBuild() {
  console.log('📁 检查构建输出...');

  const outDir = path.join(process.cwd(), 'out');

  if (!fs.existsSync(outDir)) {
    console.log('❌ out目录不存在，构建可能失败');
    return false;
  }

  const requiredFiles = ['index.html', '_next'];
  for (const file of requiredFiles) {
    if (!fs.existsSync(path.join(outDir, file))) {
      console.log(`❌ 缺少必需文件: ${file}`);
      return false;
    }
  }

  console.log('✅ 构建输出检查通过');
  return true;
}

// 部署到Cloudflare Pages
function deployToCloudflare() {
  console.log('\n🚀 开始部署到Cloudflare Pages...');

  try {
    // 使用Wrangler部署
    execSync('wrangler pages deploy out --project-name=ljoson-blog', { stdio: 'inherit' });
    console.log('✅ 部署到Cloudflare Pages完成');

    console.log('\n🎉 部署成功！');
    console.log('📅 等待几分钟后访问你的Cloudflare Pages域名');
    console.log('\n📋 部署信息:');
    console.log('   - 项目名称: ljoson-blog');
    console.log('   - 输出目录: out');
    console.log('   - 自动HTTPS: 是');
    console.log('   - 全球CDN: 是');

    console.log('\n🔗 有用的链接:');
    console.log('   - Cloudflare Dashboard: https://dash.cloudflare.com');
    console.log('   - Pages项目: https://dash.cloudflare.com/pages');

  } catch (error) {
    console.error('❌ 部署失败:', error.message);
    console.log('\n💡 可能的解决方案:');
    console.log('   1. 确保已登录Wrangler: wrangler login');
    console.log('   2. 检查项目名称是否正确');
    console.log('   3. 确保有足够的权限');
    process.exit(1);
  }
}

// 主函数
function main() {
  // 1. 检查Wrangler CLI
  if (!checkWrangler()) {
    process.exit(1);
  }

  // 2. 构建项目
  if (!buildProject()) {
    process.exit(1);
  }

  // 3. 检查构建输出
  if (!checkBuild()) {
    process.exit(1);
  }

  // 4. 部署到Cloudflare Pages
  deployToCloudflare();
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = {
  checkWrangler,
  buildProject,
  checkBuild,
  deployToCloudflare
};
