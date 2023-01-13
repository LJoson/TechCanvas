---
title: 构建 PyPi 服务
date: 2022-01-04 11:00:12
sidebar: true
sidebarDepth: 5
tags: 
- pypi
categories:
- "笔记等"
isShowComments: true
---

[[toc]]

## 自建调研

一些pypi源方案：

[https://mirrors.tuna.tsinghua.edu.cn/help/pypi/](https://mirrors.tuna.tsinghua.edu.cn/help/pypi/)
GitHub： 
[https://github.com/tuna/opentuna](https://github.com/tuna/opentuna)

pypi源使用
```
pip install numpy -i http://10.198.21.39:9090/simple --trusted-host 10.198.21.39
```

::: tip
如果出现无法找到对应包，导致安装失败，可从以下几个方面检查
1.检查包名是否正确，如果加了版本，版本号是否对应
2.检查当前使用python环境的python版本是哪个,一般需要python3.0+

:::

### 自建
- pypiserver
简介
上手难度最小，使用方便，功能简单
#### 服务端
服务器上搭建记录
1.！！！需要python环境，一开始没用anaconda管理，差点把整个python环境折腾崩(虽然已经崩了一点）
2.anaconda安装
```
wget https://repo.anaconda.com/archive/Anaconda3-2020.07-Linux-x86_64.sh
sh Anaconda3-2020.07-Linux-x86_64.sh
```
记得激活conda环境！


3.pypiserver搭建

```
cd /mnt/data1/lijun1/
mkdir pypiserver
# 安装
pip install pypiserver  --target=/mnt/data1/lijun1/pypiserver
# 创建本地安装包缓存文件夹
mkdir pypi
# copy some source packages or eggs to this directory
cd pypi && pip download numpy
# 创建日记文件夹
cd ..
mkdir log
# 指定端口和文件夹启动pypiserver服务，并且挂在后台
nohup /mnt/data1/lijun1/pypiserver/bin/pypi-server -p 9090 -v --log-file /mnt/data1/lijun1/log/pypiserver_pypiserver.log /mnt/data1/lijun1/pypi
```
- 参数说明
- /mnt/data1/lijun1/：整个pypi部署工作文件夹
- 
- pypiserver：文件夹，pypiserver安装路径，后面优化前端页面以及魔改pypiserver服务入手点
- 
- pypi：文件夹，pypi源发包点
-  
- log/pypiserver_pypiserver.log: 日记统计

- nohup:服务挂在后台

#### 客户端
使用服务器的pip源下载包，服务器的 IP 地址为 10.198.21.39
```
 
```

#### 缓存包
本地下载
```
cd cd /mnt/data1/lijun1/pypi
pip download [package]

```
后话
远程
Win
可使用Filezilla
Linux
使用lftp
scp

::: tip 文档

https://pypi.org/project/pypiserver/


:::
## faq

https://blog.csdn.net/weixin_38501796/article/details/79313317