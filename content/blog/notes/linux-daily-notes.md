---
title: Linux日常使用笔记
date: 2021-05-15T00:00:00.000Z
description: Linux系统使用过程中的常用命令实录，多为Ubuntu下的命令，包括文件操作、终端分屏等实用技巧
tags:
  - Linux
  - Ubuntu
  - 命令行
  - 系统管理
  - 终端工具
category: 学习笔记
author: LJoson
status: published
featured: false
---

# Linux日常使用笔记

## 引言

Linux系统使用的过程中常用命令实录，多为Ubuntu下的命令，注意文件夹与文件的区别，相对路径与绝对路径的区别。

**注意**：本文内容不断更新中...

## Ubuntu 18.04 常用命令

### 查看文件大小常用命令

#### 1. 使用stat命令查看

stat命令一般用于查看文件的状态信息。stat命令的输出信息比ls命令的输出信息要更详细。

```bash
# 显示文件状态信息
stat <file name>

# 显示文件在系统的状态信息
stat -f <file name>

# 简明显示文件的状态信息
stat -t <file name>
```

#### 2. 使用wc命令

wc命令一般用于统计文件的信息，比如文本的行数，文件所占的字节数。

```bash
# 统计行数、单词数、字节数
wc filename

# 只统计行数
wc -l filename

# 只统计单词数
wc -w filename

# 只统计字节数
wc -c filename
```

#### 3. 使用du命令

du命令一般用于统计文件和目录所占用的空间大小。

```bash
# 显示目录大小
du -sh directory_name

# 显示当前目录下所有文件和目录的大小
du -sh *

# 显示指定深度的目录大小
du -h --max-depth=1
```

#### 4. 使用ls命令

ls命令一般用于查看文件和目录的信息，包括文件和目录权限、拥有者、所对应的组、文件大小、修改时间、文件对应的路径等等信息。

```bash
# 显示文件详细信息
ls -l <file name>

# 显示所有文件（包括隐藏文件）
ls -la

# 按文件大小排序
ls -lhS

# 按修改时间排序
ls -lht
```

#### 5. file命令

file命令用于确定文件类型。

```bash
# 确定文件类型
file <file name>

# 输出MIME类型字符串
file -i <file name>
```

#### 6. Ubuntu deb包安装

```bash
# 下载deb包后，使用dpkg安装
dpkg -i xxx.deb

# 如果安装失败，可以尝试修复依赖
sudo apt-get install -f
```

### 命令别名永久设置

直接在shell里设定的命令别名，在终端关闭或者系统重新启动后都会失效，如何才能永久有效呢？

1. **对当前用户有效**：
   ```bash
   # 编辑用户配置文件
   nano ~/.bashrc

   # 在文件中加入别名设置
   alias rm='rm -i'
   alias ll='ls -la'
   alias ..='cd ..'

   # 保存后执行
   source ~/.bashrc
   ```

2. **对所有用户有效**：
   ```bash
   # 编辑系统配置文件
   sudo nano /etc/bashrc

   # 添加相同的别名设置
   ```

## Linux 终端分屏工具

### 一、使用screen分屏

screen只能上下分屏，不能左右分屏。

#### 安装工具

```bash
sudo apt-get install screen
```

#### 使用工具

```bash
# 启动screen
screen

# 上下分屏
Ctrl + a，然后按 Shift + s

# 切换屏幕
Ctrl + a，然后按 Tab键

# 新建一个终端
Ctrl + a，然后按 c

# 关闭一个终端
Ctrl + a，然后按 x（或直接按exit退出）
```

### 二、使用tmux分屏

tmux既可以左右分屏，也可以上下分屏。

#### 安装工具

```bash
sudo apt-get install tmux
```

#### 使用工具

```bash
# 启动tmux
tmux

# 上下分屏
Ctrl + b，然后按 "

# 左右分屏
Ctrl + b，然后按 %

# 切换屏幕
Ctrl + b，然后按 o

# 关闭一个终端
Ctrl + b，然后按 x

# 上下分屏与左右分屏切换
Ctrl + b，然后按空格键
```

#### tmux高级操作

```bash
# 将当前面板置于新窗口
!

# 以1个单元格为单位移动边缘以调整当前面板大小
Ctrl + 方向键

# 以5个单元格为单位移动边缘以调整当前面板大小
Alt + 方向键

# 列出所有会话
tmux list-sessions

# 连接到指定会话
tmux attach-session -t session_name

# 创建新会话
tmux new-session -s session_name
```

## 常用系统管理命令

### 进程管理

```bash
# 查看进程
ps aux

# 查看特定进程
ps aux | grep process_name

# 杀死进程
kill -9 process_id

# 查看端口占用
netstat -tulpn | grep port_number
```

### 磁盘管理

```bash
# 查看磁盘使用情况
df -h

# 查看目录大小
du -sh /path/to/directory

# 清理系统缓存
sudo apt-get clean
sudo apt-get autoremove
```

### 网络管理

```bash
# 查看网络接口
ifconfig

# 查看网络连接
netstat -an

# 测试网络连通性
ping hostname

# 查看路由表
route -n
```

### 用户管理

```bash
# 添加用户
sudo adduser username

# 删除用户
sudo deluser username

# 修改用户密码
passwd username

# 查看用户信息
id username
```

## 实用技巧

### 1. 文件查找

```bash
# 按名称查找文件
find /path/to/search -name "filename"

# 按类型查找文件
find /path/to/search -type f

# 按大小查找文件
find /path/to/search -size +100M

# 按修改时间查找文件
find /path/to/search -mtime -7
```

### 2. 文本处理

```bash
# 查看文件内容
cat filename

# 查看文件末尾
tail -f filename

# 查看文件开头
head -n 10 filename

# 搜索文本
grep "search_text" filename

# 替换文本
sed 's/old_text/new_text/g' filename
```

### 3. 压缩解压

```bash
# 压缩文件
tar -czf archive.tar.gz directory/

# 解压文件
tar -xzf archive.tar.gz

# 压缩为zip格式
zip -r archive.zip directory/

# 解压zip文件
unzip archive.zip
```

## 总结

Linux命令行是系统管理的重要工具，掌握这些常用命令能够大大提高工作效率。关键要点包括：

1. **文件操作**：掌握查看、复制、移动、删除等基本操作
2. **进程管理**：了解如何查看和管理系统进程
3. **终端工具**：熟练使用screen和tmux进行多任务处理
4. **系统监控**：掌握磁盘、内存、网络等系统资源监控方法

通过不断练习和实践，Linux命令行的使用会变得越来越熟练！

