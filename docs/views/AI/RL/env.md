---
title: WSL2 Ubuntu20.04下使用Isaac 强化学习仿真环境
date: 2024-01-01 20:00:12
sidebar: true
sidebarDepth: 5
tags:
- RL
categories:
- "AI及机器人等"
isShowComments: true
---

# 引言

本文记录了如何在wsl2 Ubuntu20.04中安装以及使用Isaac gym仿真训练平台,需要注意的是，这里选择在Ubuntu20.04以上的版本，原因是gym可能使用了vulkan,
而vulkan，目前比较方便的是20以及以上的版本下面的安装。


## cuda下载安装
升级到WSL 2版本之后，新版本的 Windows NVIDIA 显卡驱动已经内置了对 WSL 2 的支持，这也就意味着只需 Windows 中有 NVIDIA 显卡驱动即可，而不需要 WSL 2 中另外再安装。WSL 2 中只需要安装 CUDA Toolkit for WSL 2 即可。CUDA 安装方式可以[参考官网](https://developer.nvidia.com/cuda-downloads)，注意选择 WSL 版，选择完之后下方就可以看到一个对应版本的安装命令，下面以4070ti，cuda 11.6作为例子。
安装指令
```
wget https://developer.download.nvidia.com/compute/cuda/repos/wsl-ubuntu/x86_64/cuda-wsl-ubuntu.pin
sudo mv cuda-wsl-ubuntu.pin /etc/apt/preferences.d/cuda-repository-pin-600
wget https://developer.download.nvidia.com/compute/cuda/11.6.2/local_installers/cuda-repo-wsl-ubuntu-11-6-local_11.6.2-1_amd64.deb
sudo dpkg -i cuda-repo-wsl-ubuntu-11-6-local_11.6.2-1_amd64.deb
sudo apt-key add /var/cuda-repo-wsl-ubuntu-11-6-local/7fa2af80.pub
sudo apt-get update
sudo apt-get -y install cuda
```
## 设置cuda环境变量

在主目录下的~/.bashrc文件添加如下路径：
```
sudo vim ~/.bashrc
```

末尾添加并保存：
```
export CUDA_HOME=/usr/local/cuda
export PATH=$PATH:$CUDA_HOME/bin
export LD_LIBRARY_PATH=/usr/local/cuda-11.6/lib64${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}
```
如果提示缺少相应的依赖库，直接执行如下代码自动安装相应的依赖库
```
sudo apt-get install freeglut3-dev build-essential libx11-dev libxmu-dev libxi-dev libgl1-mesa-glx libglu1-mesa libglu1-mesa-dev
```
查看cuda是否安装成功：
```
nvcc -V
```
## 安装cudnn

安装cudnn的时候也需要登录Nvidia账号，直接下载:cuDNN Library for Linux (x86)
[下载链接](https://developer.nvidia.com/rdp/cudnn-archive)
然后打开终端执行：
```
tar -zxvf cudnn-linux-x86_64-8.9.3.28_cuda11-archive.tar.xz
sudo cp -P cuda/lib64/libcudnn* /usr/local/cuda-11.6/lib64/
sudo cp  cuda/include/cudnn.h /usr/local/cuda-11.6/include/
```
为所有用户设置读取权限：
```
sudo chmod a+r /usr/local/cuda-11.6/include/cudnn.h
sudo chmod a+r /usr/local/cuda-11.6/lib64/libcudnn*
```

[参考文档](https://zhuanlan.zhihu.com/p/350399229)

## 安装vulkan
[官方文档](https://vulkan.lunarg.com/doc/sdk/1.3.268.0/linux/getting_started_ubuntu.html)

Ubuntu 20.04 (Focal Fossa)
```
wget -qO - http://packages.lunarg.com/lunarg-signing-key-pub.asc | sudo apt-key add -
sudo wget -qO /etc/apt/sources.list.d/lunarg-vulkan-focal.list http://packages.lunarg.com/vulkan/lunarg-vulkan-focal.list
sudo apt update
sudo apt install vulkan-sdk
```
## 安装 isaac gym
官网下载地址：[https://developer.nvidia.com/isaac-gym/download](https://developer.nvidia.com/isaac-gym/download),
需要注册nvidia并成为会员，整个过程是不需要付费的。下载解压放在主目录下，进入IsaacGym_Preview_3_Package\isaacgym\docs，双击index.html，可打开官方文档，按照步骤安装。
一般建议选择建立新的虚拟环境，步骤：
```
 cd isaacgym/python/
 sh ../create_conda_env_rlgpu.sh
```

容易遇到网络中断，下载完后还可能提示环境创建失败，但也没有关系，依然可以继续往下
激活虚拟环境：
```
conda activate rlgpu
```
进入 python子目录下，执行
```
pip install -e .
```
进行安装，并可以通过

```
pip show isaacgym
```

显示细节；如果想要卸载，执行

```
pip uninstall isaacgym
```
到此就可以开始愉快跟isaac gym玩耍了
## faq
进入example目录下执行demo，有报错：

ImportError: libpython3.7m.so.1.0: cannot open shared ogject file:.....

解决方法：执行安装

```
sudo apt install libpython3.7
```
在官方文档install.html中还有其它针对anaconda用户的错误解决，可自行查找。