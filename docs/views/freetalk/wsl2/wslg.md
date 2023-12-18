---
title: WSL2 系统上运行 Linux GUI 应用
date: 2023-12-01 11:00:12
sidebar: true
sidebarDepth: 5
tags:
- LINUX
categories:
- "杂谈"
isShowComments: true
---

[官方说明](https://learn.microsoft.com/zh-cn/windows/wsl/tutorials/gui-apps)

最新的win系统的适用于 Linux 的 Windows 子系统 (WSL) 现在支持在 Windows 上运行 Linux GUI 应用程序（X11 和 Wayland），提供了完全集成的桌面体验。

WSL 2 使 Linux GUI 应用程序在 Windows 上使用起来原生且自然。

从 Windows 的“开始”菜单启动 Linux 应用
将 Linux 应用固定到 Windows 任务栏
使用 alt-tab 在 Linux 应用和 Windows 应用之间切换
跨 Windows 应用和 Linux 应用剪切并粘贴
现在，可将 Windows 应用程序和 Linux 应用程序集成到工作流中，以获得无缝的桌面体验。

Screenshot of Linux and Windows apps open on a desktop

对 Linux GUI 应用的安装支持
先决条件
需要使用 Windows 10 版本 19044+ 或 Windows 11 才能使用此功能。

已安装适用于 vGPU 的驱动程序

若要运行 Linux GUI 应用，应首先安装下面与你的系统匹配的驱动程序。 这样，就可以使用虚拟 GPU (vGPU)，使你可受益于硬件加速 OpenGL 渲染。

Intel GPU 驱动程序
AMD GPU 驱动程序
NVIDIA GPU 驱动程序
全新安装 - 没有以前的 WSL 安装
现在，可以在管理员 PowerShell 或 Windows 命令提示符中输入此命令，然后重启计算机来安装运行适用于 Linux 的 Windows 子系统 (WSL) 所需的全部内容。

PowerShell

复制
wsl --install
计算机完成重启后，安装将继续进行，并要求你输入用户名和密码。 这将是 Ubuntu 发行版的 Linux 凭据。

现在，可开始在 WSL 上使用 Linux GUI 应用了！

有关详细信息，请查看安装 WSL。

现有 WSL 安装
如果已在计算机上安装 WSL，可通过从提升的命令提示符运行更新命令来更新到包含 Linux GUI 支持的最新版本。

选择“开始”，键入 PowerShell，右键单击“Windows PowerShell”，然后选择“以管理员身份运行”。

输入 WSL 更新命令：

PowerShell

复制
wsl --update
需要重启 WSL，更新才能生效。 可通过在 PowerShell 中运行关闭命令来重启 WSL。

PowerShell

复制
wsl --shutdown
 备注

Linux GUI 应用仅受 WSL 2 支持，并且不能用于为 WSL 1 配置的 Linux 发行版。 了解如何将发行版从 WSL 1 更改为 WSL 2。

运行 Linux GUI 应用
可从 Linux 终端运行以下命令，下载并安装这些常用的 Linux 应用程序。 如果使用的是不同于 Ubuntu 的发行版，则它可能使用与 apt 不同的包管理器。 安装 Linux 应用程序后，可在“开始”菜单中的发行版名称下找到它。 例如：Ubuntu -> Microsoft Edge。

 备注

对 WSL 上的 GUI 应用的支持不提供完整的桌面体验。 它依赖于 Windows 桌面，因此可能不支持安装以桌面为中心的工具或应用。 若要请求其他支持，可以在 GitHub 上的 WSLg 存储库中提交问题。

更新发行版中的包
Bash

复制
sudo apt update
安装 Gnome 文本编辑器
Gnome 文本编辑器是 GNOME 桌面环境的默认文本编辑器。

Bash

复制
sudo apt install gnome-text-editor -y
若要在编辑器中启动 bashrc 文件，请输入：gnome-text-editor ~/.bashrc

 备注

GNOME 文本编辑器取代 gedit 成为 Ubuntu 22.10 中 GNOME/Ubuntu 的默认文本编辑器。 如果运行的是较旧版本的 Ubuntu，并且想要使用 gedit（以前的默认文本编辑器），则使用 sudo apt install gedit -y。

安装 GIMP
GIMP 是一种免费的开源光栅图形编辑器，用于图像操作和图像编辑、自由形态绘图、不同图像文件格式之间的转码，以及更专业的任务。

Bash

复制
sudo apt install gimp -y
若要启动，请输入：gimp

安装 Nautilus
Nautilus 也称为 GNOME Files，是 GNOME 桌面的文件管理器。 （类似于 Windows 文件资源管理器）。

Bash

复制
sudo apt install nautilus -y
若要启动，请输入：nautilus

安装 VLC
VLC 是一种免费的开源跨平台多媒体播放器和框架，可播放大多数多媒体文件。

Bash

复制
sudo apt install vlc -y
若要启动，请输入：vlc

安装 X11 应用
X11 是 Linux 窗口管理系统，这是随它一起提供的各种应用和工具的集合，例如 xclock、xcalc 计算器、用于剪切和粘贴的 xclipboard、用于事件测试的 xev 等。有关详细信息，请参阅 x.org 文档。

Bash

复制
sudo apt install x11-apps -y
若要启动，请输入要使用的工具的名称。 例如：

xcalc、xclock、xeyes
安装适用于 Linux 的 Google Chrome
安装适用于 Linux 的 Google Chrome：

将目录更改为 temp 文件夹：cd /tmp
使用 wget 下载它：wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
获取当前稳定版本：sudo dpkg -i google-chrome-stable_current_amd64.deb
修复包：sudo apt install --fix-broken -y
配置包：sudo dpkg -i google-chrome-stable_current_amd64.deb
若要启动，请输入：google-chrome

安装适用于 Linux 的 Microsoft Edge 浏览器
在 Edge Insider 站点上查找有关如何使用命令行安装适用于 Linux 的 Microsoft Edge 浏览器的信息。 选择页面命令行安装部分下的“获取说明”。

若要启动，请输入：microsoft-edge