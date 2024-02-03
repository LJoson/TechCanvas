---
title: opencv错误及解决集合
date: 2022-02-16 14:00:12
sidebar: true
sidebarDepth: 5
tags:
- bug
categories:
- "笔记等"
isShowComments: true
---

[[toc]]

- cv2.imwrite 报错 could not find a writer for the specified extension in function imwrite_

报错提示不能为imwrite()找到特定扩展名的writer, 因为outputloc必须是后缀png或者jpg等图像后缀。将outputloc改成带后缀的图片即可

- Ubuntu系统opencv4.4安装常见问题 找不到 feature2d/test/test_detectors_regression.impl.hpp 文件

https://blog.csdn.net/xiewenrui1996/article/details/108683866

https://pythontechworld.com/article/detail/6NVJec4E1mbz

- fatal error: boostdesc_bgm.i: No such file or directory

https://blog.csdn.net/curious_undergather/article/details/111639199

- python+openCV利用函数cv2.findContours()和cv2.drawContours查找并绘制轮廓

https://blog.csdn.net/weixin_42216109/article/details/89840323


- 解决 fatal error: Eigen/Core: No such file or directory


https://blog.csdn.net/qq_43872529/article/details/100937091

- 找不到opencv_world3413.dll的解决办法
https://www.cnblogs.com/MorStar/p/14824081.html

- OpenCV-Python installation - CMake error missing vtkRenderingOpenGL

```
-D WITH_VTK=OFF -D BUILD_opencv_viz=OFF
```

- Undefined reference to `omp_get_max_threads_'
-
  The code needs to be compiled with -fopenmp