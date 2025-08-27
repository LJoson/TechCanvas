@echo off
chcp 65001 >nul
title 博客部署工具 - 简化版

echo.
echo ========================================
echo        博客部署工具 - 简化版
echo ========================================
echo.

echo [信息] 正在检查Node.js环境...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到Node.js，请先安装Node.js
    echo [提示] 下载地址：https://nodejs.org/
    echo.
    echo 按任意键继续...
    pause >nul
    exit /b 1
)
echo [成功] Node.js环境检查通过

echo [信息] 正在检查npm环境...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到npm，请检查Node.js安装
    echo.
    echo 按任意键继续...
    pause >nul
    exit /b 1
)
echo [成功] npm环境检查通过

echo [信息] 正在检查项目依赖...
if not exist "node_modules" (
    echo [信息] 检测到缺少依赖，正在安装...
    echo [信息] 使用npm安装依赖...
    npm install --legacy-peer-deps --no-audit --no-fund
    if %errorlevel% neq 0 (
        echo [错误] 依赖安装失败！
        echo [提示] 请检查网络连接和package.json文件
        echo [提示] 可以尝试运行 install-cn.bat 使用国内镜像
        echo.
        echo 按任意键继续...
        pause >nul
        exit /b 1
    )
) else (
    echo [信息] 依赖已存在，跳过安装
)

echo [信息] 正在构建静态文件...
echo [信息] 使用npm构建...
npm run docs:build
if %errorlevel% neq 0 (
    echo [错误] 构建失败！请检查项目配置
    echo [提示] 可能的原因：
    echo     1. VuePress配置错误
    echo     2. 依赖版本不兼容
    echo     3. 文件路径问题
    echo.
    echo 按任意键继续...
    pause >nul
    exit /b 1
)

echo [信息] 正在检查构建目录...
if not exist "docs\.vuepress\dist" (
    echo [错误] 构建目录不存在！
    echo [提示] 构建可能失败，请检查构建日志
    echo.
    echo 按任意键继续...
    pause >nul
    exit /b 1
)

echo [信息] 正在进入构建目录...
cd docs\.vuepress\dist
if %errorlevel% neq 0 (
    echo [错误] 进入构建目录失败！
    echo [提示] 请检查目录权限
    echo.
    echo 按任意键继续...
    pause >nul
    exit /b 1
)

echo [信息] 正在初始化Git仓库...
git init
if %errorlevel% neq 0 (
    echo [错误] Git初始化失败！
    echo [提示] 请检查Git配置和权限
    echo.
    echo 按任意键继续...
    pause >nul
    exit /b 1
)

echo [信息] 正在添加所有文件到暂存区...
git add -A
if %errorlevel% neq 0 (
    echo [错误] 添加文件失败！
    echo [提示] 请检查文件权限和磁盘空间
    echo.
    echo 按任意键继续...
    pause >nul
    exit /b 1
)

echo [信息] 正在提交更改...
git commit -m "deploy - %date% %time%"
if %errorlevel% neq 0 (
    echo [错误] 提交更改失败！
    echo [提示] 可能是没有配置Git用户信息
    echo [提示] 请运行以下命令配置：
    echo     git config --global user.name "您的用户名"
    echo     git config --global user.email "您的邮箱"
    echo.
    echo 按任意键继续...
    pause >nul
    exit /b 1
)

echo [信息] 正在推送到GitHub Pages...
git push -f git@github.com:LJoson/ljoson.github.io.git master
if %errorlevel% neq 0 (
    echo [警告] 推送到GitHub Pages失败！
    echo [提示] 可能的原因：
    echo     1. 网络连接问题
    echo     2. SSH密钥未配置
    echo     3. 仓库权限问题
    echo [提示] 请检查SSH密钥：ssh -T git@github.com
    echo [提示] 继续尝试推送到Gitee...
) else (
    echo [成功] GitHub Pages部署完成！
)

echo [信息] 正在推送到Gitee...
git push -f git@gitee.com:Lj_Evan/Lj_Evan.git master
if %errorlevel% neq 0 (
    echo [警告] 推送到Gitee失败！
    echo [提示] 可能的原因：
    echo     1. 网络连接问题
    echo     2. SSH密钥未配置
    echo     3. 仓库权限问题
    echo [提示] 请检查SSH密钥：ssh -T git@gitee.com
) else (
    echo [成功] Gitee部署完成！
)

echo [信息] 正在返回项目根目录...
cd ..\..\..

echo.
echo ========================================
echo           部署完成！
echo ========================================
echo.
echo [成功] 博客部署流程已完成
echo [提示] GitHub Pages: https://ljoson.github.io
echo [提示] Gitee Pages: https://lj_evan.gitee.io
echo [提示] 部署可能需要几分钟时间生效
echo.

echo 按任意键继续...
pause >nul
