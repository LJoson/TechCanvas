---
title: 虚拟机/linux下无痛安装ROS系统
date: 2022-07-10 11:30:12
sidebar: true
sidebarDepth: 5
tags:
- ROS
categories:
- "AI及机器人等"
isShowComments: true
---

[[toc]]

# 1. 安装ROS
ROS安装可直接参考[ROS Wiki](http://wiki.ros.org/)的说明安装即可，与Ubuntu 18.04对应的ROS版本是ROS-melodic，安装一般没什么问题，但由于网络污染，ROS初始化，一般容易不成功，可以看看对应分享的解决办法，也可以使用第三方提供的“一键安装”方法。

安装ROS参考链接：
https://blog.csdn.net/qq_43310597/article/details/105756819
https://blog.shipengx.com/archives/f969107a.html

## 1.1 调整Ubuntu镜像源,添加公钥

- 在 Software Updater 中设置下载源为 http://mirrors.ustc.edu.cn/ubuntu。

这一步是为了让接下来的下载过程中加快速度，ROS官方推荐软件源设置为中国科技大学（USTC）或清华大学（Tsinghua），下面举例将软件源切换成中科大的源。

- 添加source.list
```
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
```
这一步配置将镜像添加到Ubuntu系统源列表中，建议使用国内的镜像源，这样能够保证下载速度，例子使用的是中国科技大学的源。

- 加keys
```
sudo apt install curl # if you haven't already installed curl
curl -s https://raw.githubusercontent.com/ros/rosdistro/master/ros.asc | sudo apt-key add -
```
公钥是Ubuntu系统的一种安全机制，也是ROS安装中不可缺的一部分。

- 然后
```
sudo apt update
```


## 安装桌面完整版，包含ROS、rqt、rviz、机器人通用库、2D/3D 模拟器、导航以及2D/3D感知等。
```
sudo apt install ros-melodic-desktop-full
```

也可以安装某个指定的ROS软件包（使用软件包名称替换掉下面的PACKAGE）：
```
sudo apt install ros-melodic-PACKAGE
```
例如：
```
sudo apt install ros-melodic-slam-gmapping
```
-  初始化rosdep

```
sudo -E rosdep init
```
::: tip 注意

如果出现错误：

● --找不到命令
```
sudo apt install python-rosdep
```
● --Website may be down

方法一：
```
sudo gedit /etc/hosts
```
增加199.232.68.133 raw.githubusercontent.com

raw.githubusercontent.com的ip可以通过https://www.ipaddress.com/

方法二：

参考链接
https://blog.csdn.net/weixin_43311920/article/details/114796748
https://blog.csdn.net/nanianwochengshui/article/details/105702188
https://www.cnblogs.com/xuhaoforwards/p/9399744.html
https://zhuanlan.zhihu.com/p/43345574
:::

```
rosdep update
```
::: tip 注意

如果有黑科技一般不会报错，如果报错：

解决办法参考：
https://blog.csdn.net/weixin_43311920/article/details/114796748
https://blog.csdn.net/nanianwochengshui/article/details/105702188
https://blog.csdn.net/mrh1714348719/article/details/103803110
https://blog.csdn.net/super_sean/article/details/105433250

:::

## 配置环境
```
echo "source /opt/ros/melodic/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

- 构建库依赖
```
sudo apt-get install python-rosinstall python-rosinstall-generator python-wstool build-essential
```
rosinstall是一个经常使用的命令行工具，它使你能够轻松地从一个命令下载许多ROS包的源码树。

## 测试ROS
```
roscore
```
- 创建ROS工作空间
```
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws/
catkin_make
source devel/setup.bash
echo "source ~/catkin_ws/devel/setup.bash" >> ~/.bashrc
```
至此，一个ROS工作环境搭建完成。


::: tip 参考
http://wiki.ros.org/melodic/Installation/Ubuntu



:::