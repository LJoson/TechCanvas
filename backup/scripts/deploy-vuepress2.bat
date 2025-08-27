@echo off
chcp 65001 >nul
title VuePress 2.x 部署工具

echo.
echo ========================================
echo         VuePress 2.x 部署工具
echo ========================================
echo.

echo [信息] 正在检查环境...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] Node.js未安装
    echo.
    echo 按任意键继续...
    pause >nul
    exit /b 1
)

echo [信息] 正在检查依赖...
if not exist "node_modules" (
    echo [错误] 依赖未安装，请先运行 upgrade-vuepress.bat
    echo.
    echo 按任意键继续...
    pause >nul
    exit /b 1
)

echo [信息] 正在检查配置文件...
if not exist "docs\.vuepress\config.ts" (
    echo [错误] 配置文件不存在，请先运行 migrate-config.bat
    echo.
    echo 按任意键继续...
    pause >nul
    exit /b 1
)

echo [信息] 正在构建静态文件...
npm run docs:build
if %errorlevel% neq 0 (
    echo [错误] 构建失败！
    echo [提示] 请检查配置文件或依赖
    echo.
    echo 按任意键继续...
    pause >nul
    exit /b 1
)

echo [信息] 正在检查构建目录...
if not exist "docs\.vuepress\dist" (
    echo [错误] 构建目录不存在！
    echo.
    echo 按任意键继续...
    pause >nul
    exit /b 1
)

echo [信息] 正在进入构建目录...
cd docs\.vuepress\dist
if %errorlevel% neq 0 (
    echo [错误] 进入构建目录失败！
    echo.
    echo 按任意键继续...
    pause >nul
    exit /b 1
)

echo [信息] 正在初始化Git仓库...
git init
if %errorlevel% neq 0 (
    echo [错误] Git初始化失败！
    echo.
    echo 按任意键继续...
    pause >nul
    exit /b 1
)

echo [信息] 正在添加所有文件到暂存区...
git add -A
if %errorlevel% neq 0 (
    echo [错误] 添加文件失败！
    echo.
    echo 按任意键继续...
    pause >nul
    exit /b 1
)

echo [信息] 正在提交更改...
git commit -m "deploy vuepress2 - %date% %time%"
if %errorlevel% neq 0 (
    echo [错误] 提交更改失败！
    echo [提示] 可能是没有配置Git用户信息
    echo.
    echo 按任意键继续...
    pause >nul
    exit /b 1
)

echo [信息] 正在推送到GitHub Pages...
git push -f git@github.com:LJoson/ljoson.github.io.git master
if %errorlevel% neq 0 (
    echo [警告] 推送到GitHub Pages失败！
    echo [提示] 请检查SSH密钥和网络连接
) else (
    echo [成功] GitHub Pages部署完成！
)

echo [信息] 正在推送到Gitee...
git push -f git@gitee.com:Lj_Evan/Lj_Evan.git master
if %errorlevel% neq 0 (
    echo [警告] 推送到Gitee失败！
    echo [提示] 请检查SSH密钥和网络连接
) else (
    echo [成功] Gitee部署完成！
)

echo [信息] 正在返回项目根目录...
cd ..\..\..

echo.
echo ========================================
echo           VuePress 2.x 部署完成！
echo ========================================
echo.
echo [成功] 博客已成功部署
echo [提示] GitHub Pages: https://ljoson.github.io
echo [提示] Gitee Pages: https://lj_evan.gitee.io
echo [提示] 部署可能需要几分钟时间生效
echo.

echo 按任意键继续...
pause >nul
