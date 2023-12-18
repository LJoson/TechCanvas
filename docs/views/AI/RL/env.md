---
title: WSL2 Ubuntu20.04下安装Isaac仿真环境
date: 2023-10-10 11:30:12
sidebar: true
sidebarDepth: 5
tags:
- RL
categories:
- "AI及机器人等"
isShowComments: true
---

# 引言

本文记录了如何在wsl2中安装以及使用Isaac sim仿真平台

4.设置cuda环境变量
在主目录下的~/.bashrc文件添加如下路径：

sudo su -
vim ~/.bashrc
末尾添加并保存：

export CUDA_HOME=/usr/local/cuda
export PATH=$PATH:$CUDA_HOME/bin
export LD_LIBRARY_PATH=/usr/local/cuda-10.1/lib64${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}
如果提示缺少相应的依赖库，直接执行如下代码自动安装相应的依赖库

sudo apt-get install freeglut3-dev build-essential libx11-dev libxmu-dev libxi-dev libgl1-mesa-glx libglu1-mesa libglu1-mesa-dev
查看cuda是否安装成功：

nvcc -V
5.安装cudnn
安装cudnn的时候也需要登录Nvidia账号，直接下载:cuDNN Library for Linux (x86)
[下载链接](https://developer.nvidia.com/rdp/cudnn-archive)
然后打开终端执行：

tar -zxvf cudnn-10.2-linux-x64-v8.0.4.30.tgz
sudo cp -P cuda/lib64/libcudnn* /usr/local/cuda-11.0/lib64/
sudo cp  cuda/include/cudnn.h /usr/local/cuda-11.0/include/
为所有用户设置读取权限：

sudo chmod a+r /usr/local/cuda-11.0/include/cudnn.h
sudo chmod a+r /usr/local/cuda-11.0/lib64/libcudnn*

[参考文档](https://zhuanlan.zhihu.com/p/350399229)