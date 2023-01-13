---
title: 那些年，在Ubuntu18下踩过的坑
date: 2020-07-28 15:00:12
sidebar: true
sidebarDepth: 5
tags:
- bug
categories:
- "笔记等"
isShowComments: true
---

**wget: server returned error: HTTP/1.1 416 Requested Range Not Satisfiable**



https://blog.csdn.net/mociml/article/details/6254106


- ifconfig command not found

https://www.jianshu.com/p/75dbfb91f4fd
https://www.cnblogs.com/xioawu-blog/p/10993633.html

- 虚拟机上Ubuntu报错：检测到系统程序出现问题 system program problem detected
解决办法：
```
sudo vim /etc/default/apport
```

先键入i，把enable值改为0，在ESC键后输入:wq 保存退出

- linux下删除.swp文件方法
由于某种原因，生成了.swp的文件，每次vi或者vim进去的时候都会有一段提示，又因为某种原因，按照提示删除无效。
话不多说，比如编辑test.php时留下了个.swp文件，又因为上述原因怎么也删除不了，只需在rm -rf .test.php.swp就行

- 在 VMware ubuntu 18.04虚拟机中使用主机clash for window代理上网

https://zhuanlan.zhihu.com/p/377150903

-  E: You don't have enough free space in /var/cache/apt/archives/.
```
cd /var/cache/apt/archives
sudo apt-get clean

```

- Linux——问题解决： fatal error: msgpack.hpp: No such file or directory #include ＜msgpack.hpp＞
```
sudo apt install libmsgpack*
```


- /usr/bin/ld: 找不到 -ludev
```
sudo apt-get install libudev1 libudev-dev
```
- 由于时钟同步问题，出现 warning:  Clock skewdetected.  Your build may be incomplete.这样的警告。下面是两种解决这个问题的办法:

方法一：修改所有源代码的时间后重新编译
```
find . -type f | xargs -n 5 touch
make clean
make
```
方法二：修改编译环境的系统时间后重新编译
例如
```
sudo date -s 2022-10-11
sudo date -s 19:40:30
```

然后使用
```
sudo hwclock -w
```
同步硬件时间实现更改Linux系统时间方法。

另外，修改所有文件的时间戳，
```
touch *
```