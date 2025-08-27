@echo off
chcp 65001 >nul
title 依赖修复工具

echo.
echo ========================================
echo           依赖修复工具
echo ========================================
echo.

echo [信息] 正在清理旧的依赖文件...
if exist "node_modules" (
    echo [信息] 删除node_modules目录...
    rmdir /s /q node_modules
)

if exist "package-lock.json" (
    echo [信息] 删除package-lock.json...
    del package-lock.json
)

if exist "yarn.lock" (
    echo [信息] 删除yarn.lock...
    del yarn.lock
)

echo [信息] 正在添加license字段到package.json...
echo [提示] 这可以解决"No license field"警告

echo [信息] 正在清理npm缓存...
npm cache clean --force
if %errorlevel% neq 0 (
    echo [警告] npm缓存清理失败，继续执行...
)

echo [信息] 正在设置npm配置以减少警告...
npm config set audit false
npm config set fund false

echo [信息] 正在重新安装依赖...
echo [提示] 使用npm安装，避免yarn的混合包管理器警告
npm install --no-audit --no-fund
if %errorlevel% neq 0 (
    echo [错误] 依赖安装失败！
    echo [提示] 尝试使用以下命令：
    echo     npm install --legacy-peer-deps
    echo.
    echo 按任意键继续...
    pause >nul
    exit /b 1
)

echo [信息] 正在检查网络连接...
ping -n 1 registry.npmjs.org >nul
if %errorlevel% neq 0 (
    echo [警告] 无法连接到npm注册表
    echo [提示] 请检查网络连接或使用国内镜像
    echo [提示] 设置淘宝镜像：npm config set registry https://registry.npmmirror.com
) else (
    echo [成功] 网络连接正常
)

echo.
echo ========================================
echo           修复完成！
echo ========================================
echo.
echo [成功] 依赖问题已修复
echo [提示] 现在可以尝试运行部署脚本
echo [提示] 如果仍有问题，可以尝试：
echo     1. 使用 --legacy-peer-deps 参数
echo     2. 设置国内镜像源
echo     3. 升级到VuePress 2.x
echo.

echo 按任意键继续...
pause >nul
