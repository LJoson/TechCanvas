
---
title: Windows 10下使用CMake编译YOLOv4详细教程
date: 2020-05-13 20:41:12
sidebar: true
sidebarDepth: 5
tags:
- 图像处理
- 机器学习
- YOLO
categories:
- 计算机技术
isShowComments: true
---

[[toc]]

# YOLOv4简介

## 背景介绍

2020年4月，YOLOv4重磅发布。该版本由俄罗斯开发者Alexey Bochkovskiy和台湾开发者Chien-Yao Wang、Hong-Yuan Mark Liao共同开发。这一发布引起了计算机视觉领域的广泛关注，特别是在YOLO之父Joseph Redmon宣布退出CV界后，YOLOv4的发布为YOLO系列带来了新的生机。

## 主要特点

YOLOv4的主要创新点在于：

1. **性能提升**：在MS COCO数据集上实现了43.5% AP（65.7% AP50）的优秀成绩
2. **速度优化**：在Tesla V100 GPU上可达到约65 FPS的处理速度
3. **实用性强**：整合了近年来CNN领域的多项改进技术
4. **工程优化**：在保持高精度的同时实现了更快的推理速度

## 技术创新

YOLOv4主要在以下几个方面进行了优化：

- 数据处理方面的改进
- 网络训练策略的优化
- 损失函数的改进
- 网络结构的优化

# Windows环境下编译YOLOv4

## 环境准备

### 必需工具

1. **CUDA和cuDNN**
   - CUDA版本要求：10.0及以上
   - 对应版本的cuDNN
   - 安装验证：
     ```bash
     nvidia-smi  # 查看CUDA版本
     nvcc -V     # 查看CUDA编译器版本
     ```

2. **OpenCV**
   - 版本要求：4.2及以上
   - 推荐使用预编译版本而非源码编译

3. **CMake-GUI**
   - 从官网下载最新版本
   - 用于生成Visual Studio项目文件

### 环境配置注意事项

- 确保CUDA和cuDNN正确安装并配置环境变量
- OpenCV环境变量配置（如需要）
- Visual Studio需安装C++开发组件

## 编译步骤

### 1. 准备工作

1. 下载YOLOv4源码：
   ```bash
   git clone https://github.com/AlexeyAB/darknet.git
   ```

2. 打开CMake-GUI工具


1. 设置源码和生成目录：
   - Source code：选择darknet源码目录
   - Build：选择生成目录（建议在源码目录下创建build文件夹）

2. 点击Configure，选择Visual Studio版本

3. 配置选项：
   - WITH_CUDA：启用CUDA支持
   - CUDA_ARCH_ALL：根据显卡选择对应架构
   - OPENCV：启用OpenCV支持

### 3. 项目生成与编译

1. 点击Generate生成Visual Studio项目文件
2. 点击Open Project打开VS项目
3. 在VS中：
   - 选择Release配置
   - 右键生成ALL_BUILD
   - 右键生成INSTALL

## 常见问题解决

### OpenCV相关问题

如果同时安装了源码编译和预编译的OpenCV，可能会遇到以下问题：

```
but it set OpenCV_FOUND to FALSE so package "OpenCV" is considered to be NOT FOUND.
```

解决方案：
1. 在CMake配置时指定OpenCV目录
2. 修改OpenCVConfig.cmake文件：
   - 找到OpenCV安装目录下的OpenCVConfig.cmake
   - 在文件末尾添加：`set(OpenCV_FOUND 1)`

### 编译后的使用

编译成功后，在darknet目录下会生成darknet.exe文件。使用时需要：
1. 确保所有依赖DLL在系统路径中
2. 准备好预训练模型
3. 按照官方文档进行目标检测任务

# 参考资料

- [YOLOv4官方代码仓库](https://github.com/AlexeyAB/darknet)
- [YOLOv4论文](https://arxiv.org/pdf/2004.10934.pdf)
- [YOLOv4详细解读](https://mp.weixin.qq.com/s/3vdhQ5wsacxuvmpQ4Jl5pw)
- [在Windows下编译Darknet](https://blog.csdn.net/Discoverhfub/article/details/79951480)
- [YOLOv4训练自定义数据集指南](https://blog.csdn.net/yapifeitu/article/details/105749693)
