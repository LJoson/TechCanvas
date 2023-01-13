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