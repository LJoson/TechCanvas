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

## 迁移 wsl 系统到其他盘符

1.查看WSL分发版本
在Windows PowerShell中输入如下命令:

```
wsl -l --all -v
```

2.导出分发版为tar文件到d盘

```
wsl --export Ubuntu-20.04 d:\wsl-ubuntu20.04.tar
```

3.注销当前分发版

```
wsl --unregister Ubuntu-20.04
```

4.重新导入并安装WSL在d:\wsl-ubuntu20.04

```
wsl --import Ubuntu-20.04 d:\wsl-ubuntu20.04 d:\wsl-ubuntu20.04.tar --version 2
```

5.设置默认登陆用户为安装时用户名

```
ubuntu2004 config --default-user Username
```

Username 为安装时设置的用户名
6.删除tar文件(可选)

```
del d:\wsl-ubuntu20.04.tar
```

7.结束
经过以上操作后，就将WSL的默认安装目录迁移到D:\wsl-ubuntu20.04目录下了。此目录即为WSL的根文件系统。

## 删除 WSL2 内部数据但是 Windows 磁盘空间不释放

1. 找到vhd文件位置
wsl使用虚拟硬盘(VHD)存储linux下的文件,要压缩磁盘空间,我们要做第一步就是先找到vhd文件位置,注意,可能由于ubuntu版本不一致,目录名稍有不同。

2. 关闭WSL服务
其次,在正式进行压缩前,我们需要先停掉wsl服务,一般情况下打开PowerShell, 输入如下命令即可

```
wsl --shutdown
```

待服务停止后,重新进入PowerShell窗口，输入如下命令：

```
wsl -l -v
```

可查看到wsl中ubuntu的运行状态,如果看到还是running状态，可尝试重新输入 wsl --shutdown

3. 压缩磁盘

wsl服务停止后，在 PowerShell中输入命令：

```
diskpart
```

此时，系统会自动打开 Diskpart 窗口，依次执行如下命令

```
select vdisk file="xxxx\ext4.vhdx"
attach vdisk readonly
compact vdisk
detach vdisk
exit
```

执行完后，我们再回到 windows 查看，检查磁盘空间是否正常释放。

## faq
