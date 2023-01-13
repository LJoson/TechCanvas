---
title: Python错误及解决集合
date: 2021-02-07 23:00:12
sidebar: true
sidebarDepth: 5
tags:
- bug
categories:
- "笔记等"
isShowComments: true
---
[[toc]]

# 引言
学习Python总会不可避免的出现一些error，因此做一个解决error的集合，方便查阅。

## error："no encoding declared （没有编码声明）的"解决方法

问题抛出：

```
SyntaxError: Non-ASCII character '\xe8' in file C:/Users/ME/Desktop/Python project/����/request�Ļ����÷�.py on line 8, but no encoding declared; see http://python.org/dev/peps/pep-0263/ for details
```

环境是python2无法通过，python3就可以通过。

写代码时往往喜欢注释，而且使用的是中文
```
#params 这个参数是用来构造链接的
```
如果要在python2的py文件里面写中文，则必须要添加一行声明文件编码的注释，否则python2会默认使用ASCII编码。

因此我们必须要在第一行里将编码转换过来，第一行，必须是第一行。因为python是一种解释性语言，从上往下开始解释代码。

可以使用
```
# -*- coding:utf-8 -*-
```
也可以这样
```
#coding=utf-8
```
## UnicodeDecodeError: 'gbk' codec can't decode byte 0x93 in position 596: illegal multibyte sequence

使用python读取文件时，需要注意一下编码格式，类似此种错误，可能是要处理的字符串本身不是gbk编码，但是却以gbk编码去解码，所以解决思路就是确定一下编码格式。例如加入如下编码解码格式。
```
encoding='UTF-8'

```
## pip 加速
- 指定清华源
```
-i https://pypi.tuna.tsinghua.edu.cn/simple
```
## anaconda prompt显示中文
所以需要在cmd或者prompt中输入下面的指令，就可以正确显示了：
```
CHCP 65001
```
这样就会更改控制台编码为utf-8

出现LookupError: unknown encoding: cp65001此错误后改变编码方式即可解决：来回切换吧~
```
chcp 1252
```
十进制码值      对应编码名称
950             繁体中文
65001	        Unicode (UTF-8)
936	            简体中文默认的GBK
437	            MS-DOS 美国英语
## 解决python中cannot import name 'Bar' from 'pyecharts'问题
1、首先，先保证自己已经安装了pyecharts，没有安装的话请：

win+R，运行cmd，然后键入pip install pyecharts，完成pyecharts的安装

2、因为pyecharts的版本更新问题，现在已经不能写成
```
from pyecharts import Bar
```
需要改调用方法，应写成：
```
from pyecharts.charts import Bar
```
此时就可以解决上面的问题了


## Python 解决 ：NameError: name 'reload' is not defined 问题

对于 Python 2.X：
```
import sys
reload(sys)
sys.setdefaultencoding("utf-8")
```
对于 <= Python 3.3：
```
import imp
imp.reload(sys)
```

注意：
1. Python 3 与 Python 2 有很大的区别，其中Python 3 系统默认使用的就是utf-8编码。
2. 所以，对于使用的是Python 3 的情况，就不需要sys.setdefaultencoding("utf-8")这段代码。
3. 最重要的是，Python 3 的 sys 库里面已经没有 setdefaultencoding() 函数了。

对于 >= Python 3.4：
```
import importlib
importlib.reload(sys)

```

## Python问题分析：AttributeError: module 'sys' has no attribute 'setdefaultencoding'

在新版本的python中，已经不支持setdefaultencoding函数了。

解决方法
直接移除掉即可。

## ImportError: The _imagingft C module is not installed

更新版本即可

## AttributeError: 'NoneType' object has no attribute 'group'


正则表达式没有匹配到正确字段


## OSError: [Errno 28] No space left on device

解决问题
OSError: [Errno 28] No space left on device

解决思路
设备上没有剩余空间

解决方法
当前电脑盘存储空间不够，仔细查看当前盘存储情况，删除不必要文件即可！

## bs4.FeatureNotFound: Couldn’t find a tree builder with the features you requested: html_parser. Do you need to install a parser library?

解决方法：

在报错代码中把函数参数中所有的"lxml"改成"html.parser"
```
bs = BeautifulSoup(r, 'lxml').find(
#改成 bs = BeautifulSoup(r, 'html.parser').find()
```

## VS Code保存文件时自动删除行尾空格

https://blog.csdn.net/cc18868876837/article/details/107099521


## 重名大坑

https://python.iitter.com/other/315702.html

- Python报错: ValueError: not enough values to unpack expected 3, got 2

报错:
意思是：期望有三个返回值，但其实函数只有两个返回值。

ValueError: not enough values to unpack expected 3, got 2
解决方法：
检查函数本身的返回值和接收函数返回值的参数个数是否一致，改成一致即可。
https://blog.csdn.net/pearl8899/article/details/109553774

## 执行setup.py时出现no commands supplied 错误
python setup.py 改为 python setup.py  install 即可

- 解决Python.h: No such file or directory

```
sudo apt-get install python-dev   # for python2.x
sudo apt-get install python3-dev  # for python3.x
```

## python调用dll报错：OSError: [WinError 193] %1 不是有效的 Win32 应用程序

注意python工具架构类型，dll是64位的，安装64位的python，dll是32位的，安装32位的python。