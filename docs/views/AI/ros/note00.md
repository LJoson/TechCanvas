---
title: ROS下淌过的坑
date: 2022-12-10 10:30:12
sidebar: true
sidebarDepth: 5
tags:
- ROS
categories:
- "AI及机器人等"
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
``
修改成：
```
url: https://api.ignitionrobotics.org
```

sudo apt-get install ros-melodic-base-local-planner
sudo apt-get install ros-melodic-costmap-converter
sudo apt-get install ros-melodic-mbf-costmap-core
sudo apt-get install ros-melodic-mbf-msgs
sudo apt-get install libsuitesparse-dev
sudo apt-get install ros-melodic-libg2o