---
title: ROS下淌过的坑
date: 2022-12-10 10:30:12
sidebar: true
sidebarDepth: 5
tags:
- ROS
categories:
- "计算机技术等"
isShowComments: true
---

[[toc]]

# Gazebo [Err] [REST.cc:205] Error in REST request 问题的解决

修改文件：

```
sudo gedit ~/.ignition/fuel/config.yaml
```

将以下内容在行头添加#注释：

```
url : https://api.ignitionfuel.org
```

修改成：

```
url: https://api.ignitionrobotics.org
```

# 雷达环境

```
sudo apt-get install ros-melodic-base-local-planner
sudo apt-get install ros-melodic-costmap-converter
sudo apt-get install ros-melodic-mbf-costmap-core
sudo apt-get install ros-melodic-mbf-msgs
sudo apt-get install libsuitesparse-dev
sudo apt-get install ros-melodic-libg2o
```

# python中使用ROS的注意点

之前在ROS安装和编译等常见问题.md提到了python3.8和python2.7冲突的问题，那次是不同文件可以分别用不同版本的python运行，但是如果同一个文件里用到了python的两个版本，那就不好解决了。

比如一个文件需要用到python3的函数，然后发现import tf报错，没法用tf了，因为tf2_ros是针对python2编译的，为了适应python3 (melodic)，进行如下步骤：

```
sudo apt update
sudo apt install python3-catkin-pkg-modules python3-rospkg-modules python3-empy
Prepare catkin workspace

mkdir -p ~/catkin_ws/src; cd ~/catkin_ws
catkin_make
source devel/setup.bash
wstool init
wstool set -y src/geometry2 --git https://github.com/ros/geometry2 -v 0.6.5
wstool up
rosdep install --from-paths src --ignore-src -y -r
Finally compile for Python 3

catkin_make --cmake-args \
            -DCMAKE_BUILD_TYPE=Release \
            -DPYTHON_EXECUTABLE=/usr/bin/python3 \
            -DPYTHON_INCLUDE_DIR=/usr/include/python3.6m \
            -DPYTHON_LIBRARY=/usr/lib/x86_64-linux-gnu/libpython3.6m.so
source devel/setup.bash
```

python支持中文注释

在源文件的初始部分，而且必须放在第一行，添加#coding=utf-8 或者 #coding=gbk 或# -- coding: gb2312 --

- ROS报错：-- Could NOT find PY_em (missing: PY_EM)

这是因为catkin make时，查找的 python版本为anaconda下面的版本，所以需要改为指定采用下面的命令
catkin_make -DPYTHON_EXECUTABLE=/usr/bin/python3


- 运行roscore出现ImportError: No module named defusedxml.xmlrpc 解决方案
原因：根据提示是找不到defusedxml模块，原因是未安装defusedxml模块;
解决方案：在ROS窗口输入：pip install defusedxml;
