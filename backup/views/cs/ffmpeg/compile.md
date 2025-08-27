---
title: ffmpeg 编译问题收集《一》
date: 2024-01-31 14:10:12
sidebar: true
sidebarDepth: 5
tags:
- 音视频开发
categories:
- "计算机技术等"
isShowComments: true
---


## 引言

ffmpeg 不同版本以及平台编译可能遇到情况不同，以下是网络收集到的资料，仅供参考。


1. error: undefined reference to ‘av_version_info()’
出错原因： ffmpeg是纯C的库，头文件没有做好C++调用的准备

解决方案：用extern “C”{}套住ffmpeg头文件，用C语言的编译规则来编译ffmpeg代码，就可以了
```
extern "C"{
    #include <libavutil/avutil.h>
}
```
2. libavutil/log.c:186: error: undefined reference to ‘stderr’
出错原因：

代码中使用了大量的标准IO设备：stderr 等，这些在NDK15以后，这些都不被支持了，代码本身没问题，只是编译器链接时找不到对应的静态库定义了；

解决方案：

在编译选项中添加语句-DANDROID_API=[你的android API版本号]即可； 比如我的测试手机为android 5.1.1 对应 API = 22，编译选项中应该添加：-DANDROID_API=22

adb shell 获取 android 系统版本： adb shell getprop ro.build.version.release

adb shell 获取 android 系统 API 版本： adb shell getprop ro.build.version.sdk

3. libavformat/utils.c:513: error: undefined reference to ‘av_parser_close’
出错原因： 链接静态库先后顺序不正确，引起的符号定义找不到。

解决方案：2种

修改静态库的链接顺序。
```
target_link_libraries(
				native-lib
        # 先把有依赖的库，先依赖进来
        avformat avcodec avfilter avutil swresample swscale
        log)
```
忽略静态库的链接顺序。

```
target_link_libraries(
native-lib
-Wl,--start-group
avcodec avfilter avformat avutil swresample swscale
-Wl,--end-group
log)
```

4. libavformat/http.c:1649: error: undefined reference to ‘inflateEnd’
出错原因： 找不到的z库中的函数的实现。因为 ffmpeg 依赖了z库。编译ffmpeg的时候如果仔细看编译时输出的日志，就可以看到 External libraries: zlib

解决方案：添加z库的依赖。

```
target_link_libraries(
        native-lib
        -Wl,--start-group
        avcodec avfilter avformat avutil swresample swscale
        -Wl,--end-group
        log
        z
)
```

5. libavformat/hls.c:845: error: undefined reference to ‘atof’
出错原因：

```
Google have moved some of the C standard library functions like atof() from being inline functions in header files to normal functions. The latest NDKs will default to building a .so that is only compatible with the latest Android devices that have the atof() function in the device’s standard C library (libc.so). This means if you run a library on an older device that has an older version of the C library, you will get an error loading the dll as the expected atof() function will not exist.
```

Google已经将一些C标准库函数（如atof（））从头文件中的内联函数移到了普通函数。最新的ndk将默认构建一个.so，它只与在设备的标准C库（libc.so）中具有atof（）函数的最新Android设备兼容。这意味着，如果在具有较旧版本的C库的较旧设备上运行库，由于预期的atof（）函数不存在，因此在加载该dll时将出现错误。

解决方案： 修改ffmpeg编译脚本，指定Android API版本为17，重新编译。

这里又有一个问题：

```
libavcodec/v4l2_buffers.c:434:44: error: call to 'mmap' declared with attribute error: mmap is not available > with _FILE_OFFSET_BITS=64 when using GCC until android-21. Either raise your minSdkVersion, disable > _FILE_OFFSET_BITS=64, or switch to Clang.
```

所以21版本以下，需要取消 _FILE_OFFSET_BITS 宏定义。添加编译参数： -U_FILE_OFFSET_BITS

[原文链接](https://blog.csdn.net/hxl517116279/article/details/105385311)

