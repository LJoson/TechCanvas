---
title: linux下无痛安装opencv
date: 2022-07-13 21:30:12
sidebar: true
sidebarDepth: 5
tags:
- opencv
categories:
- "AI及机器人等"
isShowComments: true
---

[[toc]]


#

https://github.com/opencv/opencv/tree/4.x
https://github.com/opencv/opencv_contrib/tree/4.3.0

## 编译

```
cmake -D CMAKE_BUILD_TYPE=RELEASE \
-D INSTALL_PYTHON_EXAMPLES=ON \
-D INSTALL_C_EXAMPLES=ON \
-D WITH_CUDA=OFF \
-D PYTHON_EXECUTABLE=$(which python) \
-D BUILD_opencv_python2=ON \
-D CMAKE_INSTALL_PREFIX=/usr/local \
-D PYTHON3_EXECUTABLE=$(which python3) \
-D PYTHON3_INCLUDE_DIR=$(python3 -c "from distutils.sysconfig import get_python_inc; print(get_python_inc())") \
-D PYTHON3_PACKAGES_PATH=$(python3 -c "from distutils.sysconfig import get_python_lib; print(get_python_lib())") \
-D WITH_GSTREAMER=ON \
-D OPENCV_EXTRA_MODULES_PATH=/root/workspace/opencv_contrib/modules \
-D BUILD_EXAMPLES=ON ..
```

https://zhuanlan.zhihu.com/p/152287543

https://blog.csdn.net/qq_43872529/article/details/100937091