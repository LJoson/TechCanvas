---
title: CUDA-Accelerated Robot Motion Generation in Milliseconds with NVIDIA cuRobo
date: 2023-11-10 10:30:12
sidebar: true
sidebarDepth: 5
tags:
- RL
categories:
- "AI及机器人等"
isShowComments: true
---

# 引言

https://curobo.org/source/getting_started/1_install_instructions.html

## faq

1.出现错误“subprocess.CalledProcessError: Command ‘[‘ninja‘, ‘-v‘]‘ returned non-zero exit status 1”
解决方法:将setup.py中的“cmdclass={'build_ext': BuildExtension}”这一行改为“cmdclass={'build_ext': BuildExtension.with_options(use_ninja=False)}”