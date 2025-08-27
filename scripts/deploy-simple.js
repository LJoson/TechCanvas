#!/usr/bin/env node

/**
 * 简单部署脚本
 * 支持master分支直接部署到GitHub Pages
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 简单部署脚本');
console.log('================\n');

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

// 创建.nojekyll文件
function createNoJekyll() {
  const noJekyllPath = path.join(process.cwd(), 'out', '.nojekyll');
  if (!fs.existsSync(noJekyllPath)) {
    fs.writeFileSync(noJekyllPath, '# 禁用Jekyll构建\n');
    console.log('✅ 创建.nojekyll文件');
  }
}

// 部署到master分支
function deployToMaster() {
  console.log('\n🚀 开始部署到master分支...');

  try {
    // 确保在out目录中
    process.chdir('out');

    // 初始化git仓库（如果不存在）
    if (!fs.existsSync('.git')) {
      execSync('git init', { stdio: 'inherit' });
      console.log('✅ 初始化git仓库');
    }

    // 添加所有文件
    execSync('git add .', { stdio: 'inherit' });
    console.log('✅ 添加文件到暂存区');

    // 提交更改
    execSync('git commit -m "Deploy to GitHub Pages"', { stdio: 'inherit' });
    console.log('✅ 提交更改');

    // 添加远程仓库（如果不存在）
    try {
      execSync('git remote get-url origin', { stdio: 'pipe' });
    } catch {
      execSync('git remote add origin https://github.com/LJoson/ljoson.github.io.git', { stdio: 'inherit' });
      console.log('✅ 添加远程仓库');
    }

    // 推送到master分支
    execSync('git push origin HEAD:master --force', { stdio: 'inherit' });
    console.log('✅ 推送到master分支');

    // 返回原目录
    process.chdir('..');

    console.log('\n🎉 部署完成！');
    console.log('📅 等待几分钟后访问: https://ljoson.github.io/');
    console.log('\n📋 请确保GitHub Pages设置:');
    console.log('   - Source: "Deploy from a branch"');
    console.log('   - Branch: "master"');
    console.log('   - Folder: "/ (root)"');

    console.log('\n🔄 如果看不到最新内容，请尝试:');
    console.log('   1. 强制刷新页面 (Ctrl+F5 或 Cmd+Shift+R)');
    console.log('   2. 清除浏览器缓存');
    console.log('   3. 等待5-10分钟让GitHub Pages更新');
    console.log('   4. 使用无痕模式访问');

  } catch (error) {
    console.error('❌ 部署失败:', error.message);
    process.chdir('..');
    process.exit(1);
  }
}

// 主函数
function main() {
  // 1. 构建项目
  if (!buildProject()) {
    process.exit(1);
  }

  // 2. 检查构建输出
  if (!checkBuild()) {
    process.exit(1);
  }

  // 3. 创建.nojekyll文件
  createNoJekyll();

  // 4. 部署到master分支
  deployToMaster();
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = {
  buildProject,
  checkBuild,
  createNoJekyll,
  deployToMaster
};
