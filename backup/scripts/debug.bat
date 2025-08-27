@echo off
chcp 65001 >nul
title 环境诊断工具

echo.
echo ========================================
echo           环境诊断工具
echo ========================================
echo.

echo [信息] 正在检查系统环境...
echo.

echo [检查] Git版本：
git --version
if %errorlevel% neq 0 (
    echo [错误] Git未安装或未添加到PATH
) else (
    echo [成功] Git已安装
)
echo.

echo [检查] Node.js版本：
node --version
if %errorlevel% neq 0 (
    echo [错误] Node.js未安装或未添加到PATH
) else (
    echo [成功] Node.js已安装
)
echo.

echo [检查] npm版本：
npm --version
if %errorlevel% neq 0 (
    echo [错误] npm未安装或未添加到PATH
) else (
    echo [成功] npm已安装
)
echo.

echo [检查] Yarn版本：
yarn --version
if %errorlevel% neq 0 (
    echo [错误] Yarn未安装或未添加到PATH
) else (
    echo [成功] Yarn已安装
)
echo.

echo [检查] 当前目录：
echo %cd%
echo.

echo [检查] 项目文件：
if exist "package.json" (
    echo [成功] 找到package.json
) else (
    echo [错误] 未找到package.json，请确保在项目根目录运行
)
echo.

if exist "docs\.vuepress\config.js" (
    echo [成功] 找到VuePress配置文件
) else (
    echo [错误] 未找到VuePress配置文件
)
echo.

echo [检查] 依赖文件：
if exist "node_modules" (
    echo [成功] 找到node_modules目录
) else (
    echo [警告] 未找到node_modules目录，需要安装依赖
)
echo.

if exist "package-lock.json" (
    echo [信息] 找到package-lock.json
) else (
    echo [信息] 未找到package-lock.json
)
echo.

if exist "yarn.lock" (
    echo [信息] 找到yarn.lock
) else (
    echo [信息] 未找到yarn.lock
)
echo.

echo [检查] Git配置：
echo 用户名：
git config --global user.name
echo 邮箱：
git config --global user.email
echo.

echo [检查] npm配置：
echo 镜像源：
npm config get registry
echo.

echo [检查] SSH连接测试：
echo 测试GitHub SSH连接：
ssh -T git@github.com
echo.

echo 测试Gitee SSH连接：
ssh -T git@gitee.com
echo.

echo [检查] 网络连接：
ping -n 1 registry.npmjs.org >nul
if %errorlevel% neq 0 (
    echo [错误] 无法连接到npm官方注册表
) else (
    echo [成功] 可以连接到npm官方注册表
)

ping -n 1 registry.npmmirror.com >nul
if %errorlevel% neq 0 (
    echo [错误] 无法连接到淘宝镜像
) else (
    echo [成功] 可以连接到淘宝镜像
)
echo.

echo ========================================
echo           诊断完成
echo ========================================
echo.
echo 请根据上述检查结果解决相应问题
echo.

echo 按任意键继续...
pause >nul
