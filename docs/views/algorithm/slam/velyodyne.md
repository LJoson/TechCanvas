---
title: Velodyne的16线激光雷达使用以及可视化
date: 2023-12-13 20:10:12
sidebar: true
sidebarDepth: 5
tags:
- slam
categories:
- "算法等"
isShowComments: true
---

## 简介

Velodyne 的 Puck 激光雷达传感器（ VLP-16）是 Velodyne 公司出品的小型的3维激光雷达，保留了电机转速可调节的功能。实时上传周围距离和反射率的测量值。16线激光雷达 VLP-16 具有 100 米的远量程测量距离。精巧的外观设计使得安装非常方便。重量轻，只有830g，非常适合安装在小型无人机和小型移动机器人上。虽然，如今很多实验室应该是买速腾或者这个品牌的多线激光雷达，其实原理都一样，有条件的话依然可以作为学习的设备。

激光雷达 VLP-16 每秒高达30万个点数据输出。±15°的垂直视场，360°水平视场扫描。IP67的防护等级，支持两次回波接收，可以测量次回波和后一次回波的距离值和反射强度值。


## 硬件连接

带转接板的 Velodyne 的 Puck 激光雷达传感器（ VLP-16）主要两个接口：
一个是供电接口，插头插在 220v 电源，也可以使用 9-30v , 4a 左右电源对其供电使用，具体参考官方手册；另一个是数据信号线，接以太网网线，连接在 PC 的网口。

## 配置网络
上面提到 VLP-16 雷达是通过以太网进行数据传输的，所以需要对有线网的地址进行设置

首先打开网络设置，选择网络，打开有线连接并进入设置，将IPv4的方式调整为手动，

Velodyne 雷达默认出厂 IP 为 192.168.1.201，如果手动修改过默认 IP 则需要修改为对应网段。这里也需要注意的雷达内部也有一个
接收数据的 HOST 主机 IP 配置，所以主机 IP 配置也需要与其对应。

由于我修改过雷达默认IP,PC示例配置IP地址为
```
192.168.20.25
```
修改子网掩码为
```
255.255.255.0
```
保存即可



## 创建ROS工程
使用如下命令安装Velodyne的依赖包，相关内容见产品手册
```
sudo apt-get install ros-melodic-velodyne
```
注意，代码中的melodic需要替换为对应的Ubuntu版本名称。


随后，创建ROS的项目工作空间文件
```
mkdir -p ~/vel16_ws/src
```
进入项目文件目录下
```
cd ~/vel16_w/src
```

然后需要拉取Velodyne雷达的驱动包，这里使用的是

[https://github.com/ros-drivers/velodyne](https://github.com/ros-drivers/velodyne)


## 编译使用
```
cd ~/vel16_w/src
git clone https://github.com/ros-drivers/velodyne
cd ..
catkin_make
source devel/setup.bash
```

## 启动并可视化

查看项目文件树结构

```
tree -L 3
```

我用的是16线雷达，
```
roslaunch velodyne_pointcloud VLP16_points.launch
```
启动时需要注意的是默认的deviceIP以及接收数据的port,需要与雷达配置一致。

运行后，使用 Ctrl+Alt+T 快捷键开一个新终端,启动RVIZ。

然后在rviz中先点击左侧的Add，添加可视化的条目

随后，点击By topic，双击PointCloud2以选择添加点云信息

在添加的点云中选择topic，右侧选择输出的信息节点

将 RVIZ 之中的 Fixed Frame 的名称替换为Topic名称的前缀，使用的是velodyne雷达所以就是velodyne。


## ROS录包与播放

使用以下命令可以进行点云数据的录制

仅录制velodyne_point的数据
```
rosbag record /velodyne_point
```
录制所有数据
```
rosbag record -a
```