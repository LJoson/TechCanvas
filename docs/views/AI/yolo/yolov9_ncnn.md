---
title: 详细记录YOLOv9-c目标检测 ncnn 实现
date: 2024-03-08 20:00:12
sidebar: true
sidebarDepth: 5
tags:
- 模型部署
categories:
- "AI及机器人等"
isShowComments: true
---

# 引言

目标检测作为计算机视觉领域的一项核心技术，已经广泛应用于各个领域，如无人驾驶、智能监控、人脸识别等。随着深度学习技术的快速发展，目标检测算法也在不断进步，其中 YOLO 系列算法以其高速和高精度的特点受到了广泛关注。

YOLO（You Only Look Once）算法自 2016 年提出以来，已经经历了多次迭代更新，每个版本都在速度和精度上有所提升。YOLOv9 是 Yolo 系列算法的最新版本，它在保持高速度的同时，进一步提高了检测精度。YOLOv9-c 作为 YOLOv9 系列中的一个变种，针对特定应用场景进行了优化，使其在实际应用中表现更加出色。

ncnn 作为一个为移动端和嵌入式端优化的高性能神经网络前向计算框架，具有跨平台、轻量级和高效性的特点。它支持多种平台和操作系统，包括Android、iOS、Linux等，因此在移动设备上部署深度学习模型时，ncnn 是一个非常合适的选择。

在本篇博客中，我们将详细记录 YOLOv9-c 目标检测算法在ncnn框架下的实现过程，帮助读者更好地理解和运用 YOLOv9-c 和 ncnn，以实现高效准确目标检测。

通过本篇博客的学习，读者将能够掌握 ncnn 框架的基本使用方法，并能够独立完成模型的部署和优化。


## 概述

模型部署一般涉及流程主要就是模型的选择、转换以及最终的集成。
对于 YOLO 系列部署,需要我们着手处理的几个问题：

1. 前处理（letterbox resize）

此问题 NCNN 已经有了很好的解决方案，并且支持动态形状。所以 ncnn yyds !

2. Focus 模块

在 yolo v7.0 版本之后已经移除了此模块, 而且 NCNN也提供了针对 focus 的实现在部署时的处理示例,可以参考[详细记录u版YOLOv5目标检测ncnn实现](https://zhuanlan.zhihu.com/p/275989233),[yolov5.cpp](https://github.com/Tencent/ncnn/blob/3b048d1923bf34c87a082fbca417d4448568391a/examples/yolov5.cpp#L39)

3. 后处理

后处理一般框解码和 NMS，以及一些自定义算子处理等等,一般情况下需要针对模型修改其中的源码，然后再导出即可。

下面便一起看看 YOLOv9-c 目标检测 ncnn 实现

## 导出onnx并优化

首先是下载当前时间最新的 YOLOv9
```
git clone https://github.com/WongKinYiu/yolov9.git  # git clone
cd yolov9
pip install -r requirements.txt  # install
```

查看 yolov9/models/detect/yolov9-c.yaml 我们可以了解模型基本构成，如 yolov9-c 在detect部分使用的是 DualDDetect ,因此我们在改动 forward阶段的源码时需要改动 [models/yolo.py](https://github.com/WongKinYiu/yolov9/blob/0f3928e0d14a7a1c25b51ca93f3df5f06d1e590b/models/yolo.py#L220) 中的 220-244 行注释掉，换成下面的内容：
```

def forward(self, x):
  z = []  # inference output
  for i in range(self.nl):
      feat = self.m[i](x[i])  # conv
      # x(bs,255,20,20) -> x(bs,20,20,255)
      feat = feat.permute(0, 2, 3, 1).contiguous()
      z.append(feat.sigmoid())
  return tuple(z)
```
然后导出为 onnx：
```
python export.py --weights yolov9-c.pt --include onnx
```
会在当前工作目录下生成 yolov9-c.onnx 。

然后我们可以使用 [onnx-simplifier](https://github.com/daquexian/onnx-simplifier) 优化一下onnx模型,

安装：
```
pip3 install -U pip && pip3 install onnxsim
```

使用

```
onnxsim yolov9-c.onnx yolov9-c-sim.onnx
```

- yolov9 原始输出解读：

使用 netron 查看修改 forward 前的 onnx 导出输出可以看到(1, 84, 8400),

其中 84 = box(4) + boxID(80) = 一个框（中心点坐标加长和宽信息）4 个数值  + 80 个类

而 8400 = 80×80 + 40×40 + 20×20 ， yolov9 模型输出推理三种尺寸的框,列出一个候选框,所以要输出 8400 个候选框

- Yolov9 和 Yolov5 输出差异

yolov9 选用 unchor free 的算法，自动过滤出最优解，所以每个分辨率指出一个候选框，这样就可以比yolov5少三分之二,后处理速度会提高。在计算推理 80 个类别中，每个类别都有一个置信度，所以就去掉了单独计算置信度的值

## 转换为ncnn格式

ncnn 的编译安装可以参考[how-to-build](https://github.com/Tencent/ncnn/blob/master/docs/how-to-build/how-to-build.md)的文档，需要确定 tools 的编译选项正常开启。编译完之后使用：
```
onnx2ncnn yolov9-c-sim.onnx yolov9-c.param yolov9-c.bin
```

转换主要产物为yolov9-c.param 和 yolov9-c.bin,

查看分析yolov9-c.param 可知：

images 对应输入，尺寸是 3×640×640 或者动态输入的尺寸。

output0 对应输出，尺寸是 80×80×144 或者动态输出的尺寸。

1257 对应输出，尺寸是 40×40×144 或者动态输出的尺寸。

1275 对应输出，尺寸是 20×20×144 或者动态输出的尺寸。

## c版YOLOv9后处理

ncnn 实现代码和转好的模型已上传到github:

[https://github.com/GlimmerLab/Glimmerncnn/blob/main/cpp/yolov9/src/yolov9.cpp](https://github.com/GlimmerLab/Glimmerncnn/blob/main/cpp/yolov9/src/yolov9.cpp)

## FAQ

- undefined reference to cv::dnn::dnn4_v20191202::Net::~Net()

需要改CMakeList.txt,添加库链接 opencv_dnn

```
find_package(OpenCV 4 REQUIRED opencv_core opencv_imgproc opencv_highgui opencv_calib3d opencv_videoio opencv_imgcodecs opencv_dnn )

```

- Python报错：TypeError: 'function' object is not subscriptable

在针对函数传参时应采用小括号( )，具体参数赋值用中括号[ ]。

- No toolchains found in the NDK toolchains folder for ABI with prefix: arm-linux-androideabi

NDK版本过高,降低版本既可解决

## 最后

感谢超神，西瓜东君，[三木佬](https://zhuanlan.zhihu.com/p/606440867)以及C++书法群佬们的指点！！！