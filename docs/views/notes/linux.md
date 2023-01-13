---
title: Linux日常小记
date: 2021-05-15 22:11:12
sidebar: true
sidebarDepth: 5
tags:
- 文档笔记
categories:
- "笔记等"
isShowComments: true
---

[[toc]]
# 引言
Linux系统使用的过程中常用命令实录，多为Ubuntu下的命令，注意文件夹与文件的区别，相对路径与绝对路径的区别。
不断更新之中
## ubuntu 18.04
- Linux 查看文件大小常用命令

1. 使用stat命令查看

stat命令一般用于查看文件的状态信息。stat命令的输出信息比ls命令的输出信息要更详细。

stat命令 - display file or file system status<br>
显示文件状态信息：stat <file name><br>
显示文件在系统的状态信息：stat -f <file name><br>
简明显示文件的状态信息：stat -t <file name><br>
2. 使用wc命令

wc命令一般用于统计文件的信息，比如文本的行数，文件所占的字节数。

3. 使用du命令

du命令一般用于统计文件和目录所占用的空间大小。

5. 使用ls命令

ls 命令一般用于查看文件和目录的信息，包括文件和目录权限、拥有者、所对应的组、文件大小、修改时间、文件对应的路径等等信息。<br>
ls命令 - list directory contents<br>
显示文件详细信息：ls -l <file name><br>

6. file命令 — determine file type

determine file type ：file <file name><br>
output MIME type strings (--mime-type and --mime-encoding) ：file -i <file name><br>

7. Ubuntu 下载 deb 包，使用命令dpkg -i xxx.deb安装

- 直接在shell里设定的命令别名，在终端关闭或者系统重新启动后都会失效，如何才能永久有效呢？
使用编辑器打开~/.bashrc，在文件中加入别名设置，如：alias rm='rm -i'，保存后执行source ~/.bashrc，这样就可以永久保存命令的别名了。因为修改的是当前用户目录下的~/.bashrc文件，所以这样的方式只对当前用户有用。如果要对所有用户都有效，修改/etc/bashrc文件就可以了
## Linux 两种终端分屏工具
一、使用screen分屏（只能上下分屏，不能左右分屏）

（1）安装工具

在ubuntu系统中使用sudo apt-get install screen 安装screen工具

（2）使用工具

1，输入命令screen使用工具

2，上下分屏：ctrl + a  再按shift + s

3，切换屏幕：ctrl + a  再按tab键

4，新建一个终端：ctrl + a  再按c

5，关闭一个终端：ctrl + a  再按x （或直接按exit退出）

二、使用tmux分屏（既可以左右分屏，也可以上下分屏）、

（1）安装工具

在ubuntu系统中使用sudo apt-get install tmux安装tmux工具

（2）使用工具

1，输入命令tmux使用工具

2，上下分屏：ctrl + b  再按 "

3，左右分屏：ctrl + b  再按 %

4，切换屏幕：ctrl + b  再按o

5，关闭一个终端：ctrl + b  再按x

6，上下分屏与左右分屏切换： ctrl + b  再按空格键

其他：

! 将当前面板置于新窗口,即新建一个窗口,其中仅包含当前面板
Ctrl+方向键 以1个单元格为单位移动边缘以调整当前面板大小
Alt+方向键 以5个单元格为单位移动边缘以调整当前面板大小
空格键 可以在默认面板布局中切换，试试就知道了
q 显示面板编号
方向键 移动光标选择对应面板
{ 向前置换当前面板
} 向后置换当前面板
Alt+o 逆时针旋转当前窗口的面板
Ctrl+o 顺时针旋转当前窗口的面板

## Linux命令大全
- nohup 命令
nohup 英文全称 no hang up（不挂起），用于在系统后台不挂断地运行命令，退出终端不会影响程序的运行。

nohup 命令，在默认情况下（非重定向时），会输出一个名叫 nohup.out 的文件到当前目录下，如果当前目录的 nohup.out 文件不可写，输出重定向到 $HOME/nohup.out 文件中。

使用权限:
所有使用者

语法格式:
```
nohup Command [ Arg … ] [ & ]
```
参数说明：
Command：要执行的命令。

Arg：一些参数，可以指定输出文件。

&：让命令在后台执行，终端退出后命令仍旧执行。


- Linux下穿件带点文件夹和隐藏文件显示隐藏文件命令
```
ls -a
```

- 在终端连接ssh的断开关闭退出的方法

```

```

- linux usb摄像头设备信息查看

直接参考：https://blog.csdn.net/pyt1234567890/article/details/109558644

- linux下杀死进程（kill）的N种方法

参考：https://blog.csdn.net/andy572633/article/details/7211546

- Linux备份SD卡数据

https://codeantenna.com/a/vIvRYQbDhC
看进度
https://blog.csdn.net/puppylpg/article/details/51290363

- 在终端连接ssh的断开关闭退出的方法
https://blog.csdn.net/zhichaosong/article/details/89193767

- Linux 清理make、configure生成的文件

```
make clean #清除上一次make命令生成的文件
make distclean #清除上一次make以及configure命令生成的文件

```

- linux下杀死进程（kill）的N种方法

https://blog.csdn.net/andy572633/article/details/7211546


- 永久修改与同步系统时间

首先使用date命令修改系统时间，例如
```
sudo date -s 2022-10-11
sudo date -s 19:40:30
```

然后使用
```
sudo hwclock -w
```
同步硬件时间实现更改Linux系统时间方法。

另外，修改所有文件的时间戳，
```
touch *
```


## ubuntu 20.04

- 检查U盘是否有损坏
```
sudo badblocks -sv /dev/sdb

```