---
title: ppq神经网络量化实战《二》
date: 2024-01-11 10:10:12
sidebar: true
sidebarDepth: 5
tags:
- 量化
categories:
- "算法等"
isShowComments: true
---


## 问题总结

### error: asm operand type size(8) does not match type/size implied by constraint 'r'

原因是编译 cuda kernel 时在 win11 64 位系统下面使用的是 32 位的工具链。由于 ppq 在 win 下需要用到 vs 2019 之上版本 msvc 因此需要切换到 x64 Native Tools Command Prompt for VS 2019 命令行窗口。

### error: too few arguments for template template parameter "Tuple" detected during instantiation of class "pybind11::detail::tuple_caster<Tuple, Ts...>

找到....\pybind11\cast.h文件中的 // Base implementation for std::tuple and std::pair 的内容然后替换以下内容:

```
// Base implementation for std::tuple and std::pair
template <template <typename...> class Tuple, typename... Ts>
class tuple_caster;

template <typename T1, typename T2>
class type_caster<std::pair<T1, T2>> : public tuple_caster<std::pair, T1, T2> {};

template <typename... Ts>
class type_caster<std::tuple<Ts...>> : public tuple_caster<std::tuple, Ts...> {};

template <template <typename...> class Tuple, typename... Ts>
class tuple_caster {
(the rest class is identical)}
```
前提是 cuda 环境已经全部准备好了。

### Ninja is required to load C++ extensions

系统需要安装 ninja 以及配置好 ninja 系统环境变量，
