---
title: WSL/WSL2优雅开发实录
date: 2023-10-17 12:00:12
sidebar: true
sidebarDepth: 5
tags:
- LINUX
categories:
- "杂谈"
isShowComments: true
---

[[toc]]

1.查看WSL分发版本
在Windows PowerShell中输入如下命令:

wsl -l --all -v
2.导出分发版为tar文件到d盘
1
wsl --export Ubuntu-20.04 d:\wsl-ubuntu20.04.tar


3.注销当前分发版
1
wsl --unregister Ubuntu-20.04


4.重新导入并安装WSL在d:\wsl-ubuntu20.04
1
wsl --import Ubuntu-20.04 d:\wsl-ubuntu20.04 d:\wsl-ubuntu20.04.tar --version 2


5.设置默认登陆用户为安装时用户名
1
ubuntu2004 config --default-user Username


6.删除tar文件(可选)
1
del d:\wsl-ubuntu20.04.tar

7.结束
经过以上操作后，就将WSL的默认安装目录迁移到D:\wsl-ubuntu20.04目录下了。此目录即为WSL的跟文件系统。