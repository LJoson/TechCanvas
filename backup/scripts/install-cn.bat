@echo off
chcp 65001 >nul
title 国内镜像安装工具

echo.
echo ========================================
echo        国内镜像安装工具
echo ========================================
echo.

echo [信息] 正在设置淘宝镜像源...
npm config set registry https://registry.npmmirror.com
if %errorlevel% neq 0 (
    echo [错误] 设置镜像源失败！
    echo.
    echo 按任意键继续...
    pause >nul
    exit /b 1
)

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

echo [信息] 正在清理npm缓存...
npm cache clean --force

echo [信息] 正在使用国内镜像安装依赖...
echo [提示] 使用 --legacy-peer-deps 参数解决兼容性问题
npm install --legacy-peer-deps --no-audit --no-fund --ignore-engines
if %errorlevel% neq 0 (
    echo [错误] npm安装失败，尝试使用yarn...
    yarn install --ignore-engines
    if %errorlevel% neq 0 (
        echo [错误] yarn安装也失败！
        echo [提示] 尝试其他解决方案：
        echo     1. 检查网络连接
        echo     2. 升级Node.js版本
        echo     3. 清理缓存后重试
        echo.
        echo 按任意键继续...
        pause >nul
        exit /b 1
    ) else (
        echo [成功] 使用yarn安装成功！
    )
) else (
    echo [成功] 使用npm安装成功！
)

echo [信息] 正在恢复默认镜像源...
npm config set registry https://registry.npmjs.org

echo.
echo ========================================
echo           安装完成！
echo ========================================
echo.
echo [成功] 依赖已使用国内镜像安装完成
echo [提示] 现在可以尝试运行部署脚本
echo [提示] 如果仍有问题，请运行 debug.bat 检查环境
echo.

echo 按任意键继续...
pause >nul
