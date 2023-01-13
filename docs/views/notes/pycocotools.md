---
title: Win10下无痛安装pycocotools
date: 2022-05-28 12:30:12
sidebar: true
sidebarDepth: 5
tags:
- 文档笔记
categories:
- "笔记等"
isShowComments: true
---
[[toc]]

## 介绍
pycocotools就是帮助我们处理coco格式的数据集的工具，在我们安装很多其他库时可能都会同时安装pycocotools，但是它本身是在linux下开发的，并没有针对windows下的官方版本，所以我们在Windows下安装的是第三方的，大神的版本。

在Windows下主要安装步骤为：

- 安装Microsoft Visual c++ Build Tools工具
- 安装pycocotools

但是，在不想安装vs2019的情况下，会发现会有很多坑，这里总结了一下实际可行的方案，从此告别摸鱼。

## 方案一：

```
pip install cython
pip install git+https://gitee.com/jiangjiajun/philferriere-cocoapi.git#subdirectory=PythonAPI
```

## 方案二：
使用conda源，
```
conda install -c esri pycocotools
```