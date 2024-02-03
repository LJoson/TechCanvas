---
title: tensorRT win11下的环境安装以及使用
date: 2024-01-08 11:10:12
sidebar: true
sidebarDepth: 5
tags:
- 部署
categories:
- "AI及机器人等"
isShowComments: true
---


## tensorrt 安装
[官方安装文档](https://docs.nvidia.com/deeplearning/tensorrt/install-guide/index.html#installing)

[tensorRT下载链接](https://developer.nvidia.com/tensorrt-download)

选择对应的平台，以及所需要的版本，win11选择win10的zip包（需要注意自己安装的 cuda 版本），下载下来之后，解压找到 python 文件夹，里面有现成的 whl 二进制文件，直接使用 pip 安装 whl 文件就好

## torch2trt安装
```
git clone https://github.com/NVIDIA-AI-IOT/torch2trt
cd torch2trt
python setup.py install
```
## faq

FileNotFoundError: [WinError 2] 系统找不到指定的文件

根据报错链接跳转，找到 subprocess.py 文件，并打开找到以下函数
```
   def __init__(self, args, bufsize=-1, executable=None,
                 stdin=None, stdout=None, stderr=None,
                 preexec_fn=None, close_fds=True,
                 shell=True, cwd=None, env=None, universal_newlines=None,
                 startupinfo=None, creationflags=0,
                 restore_signals=True, start_new_session=False,
                 pass_fds=(), *, user=None, group=None, extra_groups=None,
                 encoding=None, errors=None, text=None, umask=-1)

```
将 shell=False ,改为 shell=True