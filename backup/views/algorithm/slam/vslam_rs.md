---
title: D435i相机开发笔记-固件更新工具 (rs-fw-update)
date: 2023-06-13 09:10:12
sidebar: true
sidebarDepth: 5
tags:
- slam
categories:
- "算法等"
isShowComments: true
---

[[toc]]

目标
rs-fw-update 工具是一个用于更新深度相机固件的控制台应用程序。
先决条件
为了更新深度相机固件，需要签名的图像文件。
最新的 D400/L500 相机固件可在此处获取。
固件打包为 zip 文件，并包含一个扩展名为“bin”的文件，其命名约定如下：“SignedImage_UVC<firmware_version>.bin”
笔记：
对于 Windows 10 用户，预构建的 Intel.RealSense.FW.Update.exe 可执行文件 (.exe) 位于 https://github.com/IntelRealSense/librealsense/releases/latest 。
=> 对于其他操作系统请安装SDK
❗️
激光雷达相机 L515 用户请注意
请使用 librealsense SDK 从 2.35.2 版本开始附带的设备固件更新工具。
用法
安装 librealsense 后，运行 rs-fw-update -l 启动该工具并打印已连接设备的列表。
D415 相机的输出示例如下：
连接的设备：
1) 名称：Intel RealSense D415，序列号：725112060411，ASIC 序列号：012345678901，固件版本：05.11.01.100，USB 类型：3.2
然后，我们将提供用于识别设备的序列号以及要更新的固件文件的路径 rs-fw-update -s 725112060411 -f Signed_Image_UVC_5_11_6_250.bin。
预期输出的一个示例是：
搜索序列号为：725112060411 的设备
更新固件：Signed_Image_UVC_5_11_6_250.bin
更新设备：
名称：Intel RealSense D415，序列号：725112060411，ASIC 序列号：012345678901，固件版本：05.11.01.100，USB 类型：3.2
固件更新开始
固件更新进度：100[%]
固件更新完成
设备 725112060411 已成功更新至固件：05.11.06.250
如果仅连接一台相机，您只需运行 rs-fw-update -f Signed_Image_UVC_5_11_6_250.bin。
相机可能处于恢复状态，在这种情况下列出设备将输出以下内容：
连接的设备：
1) 名称：Intel RealSense D4xx Recovery，序列号：未知，ASIC 序列号：012345678901，固件版本：未知，USB 类型：未知
在这种情况下，我们可以使用恢复标志并运行 rs-fw-update -r -f Signed_Image_UVC_5_11_6_250.bin
预期输出的一个示例是：
更新固件：Signed_Image_UVC_5_11_6_250.bin
恢复装置：
名称：Intel RealSense D4xx Recovery，序列号：未知，ASIC 序列号：012345678901，固件版本：未知，USB 类型：未知
固件更新开始
固件更新进度：100[%]
固件更新完成
恢复完成
命令行参数
标志说明
-s要更新的设备的序列号，如果连接多个设备，则此为必填项
-f 固件镜像文件的路径
-r恢复所有处于恢复模式的已连接设备
-l列出所有可用设备并退出
-v 显示版本信息并退出
-h 显示使用信息并退出
NoneList 支持的流模式