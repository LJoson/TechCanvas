---
title: Python错误及解决方案集合
date: 2021-02-07T00:00:00.000Z
description: 学习Python过程中遇到的各种错误及解决方案，包括编码问题、导入错误、环境配置等常见问题
tags:
  - Python
  - 错误解决
  - 编码问题
  - 环境配置
  - pip
  - anaconda
category: 学习笔记
author: LJoson
status: published
featured: false
---

# Python错误及解决方案集合

## 引言

学习Python总会不可避免的出现一些error，因此做一个解决error的集合，方便查阅。

## 编码相关错误

### 1. "no encoding declared （没有编码声明）"的解决方法

**问题抛出**：

```
SyntaxError: Non-ASCII character '\xe8' in file C:/Users/ME/Desktop/Python project//requestĻ÷.py on line 8, but no encoding declared; see http://python.org/dev/peps/pep-0263/ for details
```

**解决方案**：

环境是python2无法通过，python3就可以通过。

写代码时往往喜欢注释，而且使用的是中文：

```python
#params 这个参数是用来构造链接的
```

如果要在python2的py文件里面写中文，则必须要添加一行声明文件编码的注释，否则python2会默认使用ASCII编码。

因此我们必须要在第一行里将编码转换过来，第一行，必须是第一行。因为python是一种解释性语言，从上往下开始解释代码。

可以使用：

```python
# -*- coding:utf-8 -*-
```

也可以这样：

```python
#coding=utf-8
```

### 2. UnicodeDecodeError: 'gbk' codec can't decode byte 0x93 in position 596: illegal multibyte sequence

使用python读取文件时，需要注意一下编码格式，类似此种错误，可能是要处理的字符串本身不是gbk编码，但是却以gbk编码去解码，所以解决思路就是确定一下编码格式。例如加入如下编码解码格式：

```python
encoding='UTF-8'
```

## 环境配置问题

### 1. pip 加速

指定清华源：

```bash
-i https://pypi.tuna.tsinghua.edu.cn/simple
```

### 2. anaconda prompt显示中文

所以需要在cmd或者prompt中输入下面的指令，就可以正确显示了：

```bash
CHCP 65001
```

这样就会更改控制台编码为utf-8

出现LookupError: unknown encoding: cp65001此错误后改变编码方式即可解决：来回切换吧~

```bash
chcp 1252
```

**编码对照表**：

| 十进制码值 | 对应编码名称 |
|------------|-------------|
| 950        | 繁体中文    |
| 65001      | Unicode (UTF-8) |
| 936        | 简体中文默认的GBK |
| 437        | MS-DOS 美国英语 |

## 导入错误

### 解决python中cannot import name 'Bar' from 'pyecharts'问题

1. **首先，先保证自己已经安装了pyecharts**，没有安装的话请：

   win+R，运行cmd，然后键入`pip install pyecharts`，完成pyecharts的安装

2. **因为pyecharts的版本更新问题**，现在已经不能写成：

   ```python
   from pyecharts import Bar
   ```

   需要改调用方法，应写成：

   ```python
   from pyecharts.charts import Bar
   ```

   此时就可以解决上面的问题了

### Python 解决：NameError: name 'reload' is not defined 问题

**对于 Python 2.X**：

```python
import sys
reload(sys)
sys.setdefaultencoding("utf-8")
```

**对于 <= Python 3.3**：

```python
import imp
imp.reload(sys)
```

## 常见问题解决

### 1. 虚拟环境问题

创建虚拟环境：

```bash
python -m venv myenv
```

激活虚拟环境：

```bash
# Windows
myenv\Scripts\activate

# Linux/Mac
source myenv/bin/activate
```

### 2. 包管理问题

升级pip：

```bash
python -m pip install --upgrade pip
```

安装特定版本：

```bash
pip install package==version
```

### 3. 路径问题

添加Python路径到环境变量：

```bash
# Windows
set PATH=%PATH%;C:\Python39

# Linux/Mac
export PATH=$PATH:/usr/local/bin/python3
```

## 调试技巧

### 1. 使用print调试

```python
print(f"变量值: {variable}")
print(f"类型: {type(variable)}")
```

### 2. 使用pdb调试

```python
import pdb
pdb.set_trace()  # 设置断点
```

### 3. 使用logging

```python
import logging
logging.basicConfig(level=logging.DEBUG)
logging.debug("调试信息")
```

## 总结

Python开发中遇到错误是正常的，关键是要学会：

1. **查看错误信息**：理解错误类型和位置
2. **搜索解决方案**：利用搜索引擎和文档
3. **记录解决方案**：建立自己的错误解决库
4. **预防错误**：养成良好的编码习惯

通过不断积累和总结，你会发现Python开发变得越来越顺畅！

