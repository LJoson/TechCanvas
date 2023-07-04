---
title: 运维错误及解决笔记
date: 2021-02-17 17:00:12
sidebar: true
sidebarDepth: 5
tags:
- bug
categories:
- "笔记等"
isShowComments: true
---


[[toc]]
# WIN10

**背景：有时windows会莫名没有网，此时可能需要重置下网络**

操作：用**管理员身份**，打开cmd窗口，一般输入下面1、2条目，然后**重启系统**



1、重置IP 设置，恢复到默认自动获取IP 和DNS 服务器地址

```bash
netsh int ip reset
```

2、修复网络配置及winsock协议

```bash
netsh winsock reset
```

3、解除代理设置

```bash
netsh winhttp  reset  proxy
```

4、重置防火墙设置。

```bash
netsh advfirewall reset
```

5、清除DNS缓存

```bash
ipconfig /flushdns
```
6.此环境变量太大, 此对话框允许将值设置为最长2047个字符

https://blog.csdn.net/jinshelj/article/details/80193021
https://blog.csdn.net/caiyaty/article/details/91978402

- win10 cmd窗口中文乱码,永久解决方法

```
https://blog.csdn.net/ml863606/article/details/86007579
```

# Linux

Git: gnutls_handshake() failed: Error in the pull function
```
apt-get -y install build-essential nghttp2 libnghttp2-dev libssl-dev
```
linux 安装protobuf
https://gist.github.com/diegopacheco/cd795d36e6ebcd2537cd18174865887b



- netstat -apn
确定在Linux上进行UDP流量的进程


- 命令行连接wifi
在Linux命令行中连接WiFi的步骤如下：

打开终端，输入以下命令查看当前的网络接口：

ifconfig
找到您的无线网卡接口名称，通常是“wlan0”或“wlp2s0”。

扫描可用的WiFi网络。输入以下命令：
```
sudo iwlist wlan0 scan
```
（请将“wlan0”替换为您的无线网卡接口名称）

这个命令会列出您当前范围内的所有WiFi网络，包括它们的名称（ESSID）、频率、信号强度、加密方式等信息。

选择您要连接的WiFi网络，然后输入以下命令连接：
```
sudo iwconfig wlan0 essid "network_name" key "password"
```
（请将“wlan0”替换为您的无线网卡接口名称，将“network_name”替换为您要连接的WiFi网络名称，将“password”替换为该网络的密码。如果该网络没有密码，则省略“key”选项。）

最后，检查您是否成功连接到WiFi网络。输入以下命令：
```
ifconfig wlan0
```
（请将“wlan0”替换为您的无线网卡接口名称）

如果您成功连接到WiFi网络，则您应该能够看到类似于以下内容的输出：
```
inet addr:192.168.0.101  Bcast:192.168.0.255  Mask:255.255.255.0
```