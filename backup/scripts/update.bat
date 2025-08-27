@echo off
chcp 65001 >nul
title 博客代码更新工具

echo.
echo ========================================
echo           博客代码更新工具
echo ========================================
echo.

echo [信息] 正在检查Git环境...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到Git，请先安装Git
    echo [提示] 下载地址：https://git-scm.com/
    echo.
    echo 按任意键继续...
    pause >nul
    exit /b 1
)

echo [信息] 正在检查Git用户配置...
git config --global user.name >nul 2>&1
if %errorlevel% neq 0 (
    echo [警告] Git用户名未配置
    echo [提示] 请运行：git config --global user.name "您的用户名"
) else (
    echo [成功] Git用户名已配置
)

git config --global user.email >nul 2>&1
if %errorlevel% neq 0 (
    echo [警告] Git邮箱未配置
    echo [提示] 请运行：git config --global user.email "您的邮箱"
) else (
    echo [成功] Git邮箱已配置
)

echo [信息] 正在检查当前目录...
if not exist ".git" (
    echo [信息] 当前目录不是Git仓库，正在初始化...
    git init
    if %errorlevel% neq 0 (
        echo [错误] Git初始化失败！
        echo [提示] 请检查Git配置和权限
        echo.
        echo 按任意键继续...
        pause >nul
        exit /b 1
    )
) else (
    echo [信息] 检测到Git仓库，跳过初始化
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

echo [信息] 正在检查是否有文件变更...
git status --porcelain | findstr . >nul
if %errorlevel% neq 0 (
    echo [信息] 没有检测到文件变更，无需提交
    echo.
    echo 按任意键继续...
    pause >nul
    exit /b 0
)

echo [信息] 正在提交更改...
git commit -m "update - %date% %time%"
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

echo [信息] 正在检查远程仓库配置...
git remote -v | findstr "origin" >nul
if %errorlevel% neq 0 (
    echo [信息] 正在添加远程仓库...
    git remote add origin git@github.com:LJoson/myblog.git
    if %errorlevel% neq 0 (
        echo [错误] 添加远程仓库失败！
        echo.
        echo 按任意键继续...
        pause >nul
        exit /b 1
    )
)

echo [信息] 正在推送到GitHub...
git push -f origin master
if %errorlevel% neq 0 (
    echo [错误] 推送到GitHub失败！
    echo [提示] 可能的原因：
    echo     1. 网络连接问题
    echo     2. SSH密钥未配置
    echo     3. 仓库权限问题
    echo [提示] 请检查SSH密钥：ssh -T git@github.com
    echo.
    echo 按任意键继续...
    pause >nul
    exit /b 1
)

echo.
echo ========================================
echo           更新完成！
echo ========================================
echo.
echo [成功] 博客代码已成功更新到GitHub
echo [提示] 您可以访问 https://github.com/LJoson/myblog 查看更新
echo.

echo 按任意键继续...
pause >nul
