@echo off
chcp 65001 >nul
title VuePress升级工具

echo.
echo ========================================
echo         VuePress 1.x 升级到 2.x
echo ========================================
echo.

echo [信息] 正在备份当前配置...
if not exist "backup" (
    mkdir backup
    echo [成功] 创建备份目录
)

echo [信息] 正在备份package.json...
copy package.json backup\package.json.backup >nul
echo [成功] package.json已备份

echo [信息] 正在备份VuePress配置...
xcopy docs\.vuepress backup\.vuepress /E /I /Y >nul
echo [成功] VuePress配置已备份

echo [信息] 正在清理旧的依赖...
if exist "node_modules" (
    rmdir /s /q node_modules
    echo [成功] 删除node_modules
)

if exist "package-lock.json" (
    del package-lock.json
    echo [成功] 删除package-lock.json
)

if exist "yarn.lock" (
    del yarn.lock
    echo [成功] 删除yarn.lock
)

echo [信息] 正在创建新的package.json...
echo {> package.json
echo   "name": "myblog-vuepress2",>> package.json
echo   "version": "2.0.0",>> package.json
echo   "description": "VuePress 2.x 博客",>> package.json
echo   "license": "MIT",>> package.json
echo   "scripts": {>> package.json
echo     "docs:dev": "vuepress dev docs",>> package.json
echo     "docs:build": "vuepress build docs",>> package.json
echo     "docs:clean-dev": "vuepress dev docs --clean-cache",>> package.json
echo     "deploy": "bash deploy.sh">> package.json
echo   },>> package.json
echo   "devDependencies": {>> package.json
echo     "@vuepress/client": "^2.0.0-rc.9",>> package.json
echo     "vue": "^3.3.4",>> package.json
echo     "vuepress": "^2.0.0-rc.9">> package.json
echo   },>> package.json
echo   "dependencies": {>> package.json
echo     "@vuepress/theme-default": "^2.0.0-rc.9",>> package.json
echo     "@vuepress/plugin-search": "^2.0.0-rc.9",>> package.json
echo     "@vuepress/plugin-google-analytics": "^2.0.0-rc.9",>> package.json
echo     "@vuepress/plugin-pwa": "^2.0.0-rc.9",>> package.json
echo     "@vuepress/plugin-pwa-popup": "^2.0.0-rc.9",>> package.json
echo     "vuepress-plugin-copy-code2": "^2.0.0-rc.9",>> package.json
echo     "vuepress-plugin-md-enhance": "^2.0.0-rc.9">> package.json
echo   }>> package.json
echo }>> package.json

echo [成功] 新的package.json已创建

echo [信息] 正在安装VuePress 2.x依赖...
npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    echo [错误] 依赖安装失败！
    echo [提示] 请检查网络连接
    echo.
    echo 按任意键继续...
    pause >nul
    exit /b 1
)

echo [成功] VuePress 2.x依赖安装完成

echo.
echo ========================================
echo           升级完成！
echo ========================================
echo.
echo [重要] 接下来需要手动迁移配置：
echo     1. 运行 migrate-config.bat 迁移配置文件
echo     2. 检查并更新主题配置
echo     3. 测试构建和部署
echo.
echo [提示] 备份文件保存在 backup 目录中
echo [提示] 如果升级失败，可以恢复备份
echo.

echo 按任意键继续...
pause >nul
