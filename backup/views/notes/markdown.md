---
title: markown使用笔记文档
date: 2021-05-02 15:05:12
sidebar: true
sidebarDepth: 5
tags: 
- 文档笔记
categories:
- "笔记等"
isShowComments: true
---

[[toc]]
# 目录

## markdown 插入视频
- 插入B站视频链接参数
如：
```
 <iframe 
 src="https://player.bilibili.com/player.html?bvid=BV1J5411V7VZ&&page=1&as_wide=1&high_quality=1&danmaku=0&t=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> 
 </iframe>
```
### B站视频链接参数key 说明
- cid	chat id，每个chat id对应一组弹幕池和，如填了 aid, 这个字段不填也没关系
- aid	article id, 视频的av号，也就是B站的 avxxxx 后面的数字
- bvid	bilibili video id, 视频的bv号,2020.03 时候, B站把 AV 号根据一定的算法转成这个了,如果填了 bvid, 那么 aid 不填也可以
- page	第几个视频, 起始下标为 1 (默认值也是为1),就是B站视频, 选集里的, 第几个视频
- as_wide	是否宽屏,1: 宽屏, 0: 小屏
- high_quality	是否高清,1: 高清, 0: 最低视频质量(默认),如视频有 360p 720p 1080p 三种, 默认或者 high_quality=0 是最低 360p,high_quality=1 是最高1080p
- danmaku	是否开启弹幕,1: 开启(默认), 0: 关闭
- t	打开时, 自动跳转到某个时间, 并且自动播放(单位秒)


## markdown 插入gif

```
<iframe height=500 width=500 src="gif地址">
```

## 生成Markdown中的树状目录结构
- 环境要求:
安装node.js，查看是否安装，请输入命令 node -v 和 npm -v 如有版本输出，便可顺利往下进行。否则先自行安装node.js，node.js安装过程这里就不在再一点点描述了。

安装全局工具tree
```
npm i tree-node-cli -g
```
这里有个地方需要注意一下，在安装前先cmd打开命令窗口，输入命令tree 如果显示目录结构说明window系统本身有tree工具，所有在安装过程后，不能再用tree命令了（window中的tree工具生成的目录不是很美观），那变成什么了呢，其实不用担心，执行完以上命令后，会输出安装的路径，你会清晰的看到tree变成treee，多了个e，treee就是npm安装的命令，这样就可以使用treee了。

查看tree命令帮助
```
treee --help
```
treee 命令部分常用命令<br/>

treee -a 显示所有

treee -d 只显示文档夹

treee -L n 显示项目的层级，n表示层级数，比如想要显示项目三层结构，可以用tree -l 3；

treee -I pattern 用于过滤不想要显示的文档或者文档夹。

treee > tree.md 将项目结构输出到 tree.md 这个文档

生成树状目录结构-L 是确定要几级目录，-I是排除哪个文件夹，然后我是要在README里面生成项目结构树,先cd到需要生成目录的文件夹下，然后输入命令，及将结构输入到文件中
如：
- 我们可以在目录遍历时使用 -L 参数指定遍历层级
```
treee -L 2
```
- 如果你想把一个目录的结构树导出到文件可以这样操作
```
treee -L 2 >README.md //然后我们看下当前目录下的 README.md 文件
```
- 只显示文件夹
```
treee -d 
```
- 显示项目的层级，n表示层级数。例：显示项目三层结构，tree -l 3；
```
treee -L n 
```
- tree -I pattern 用于过滤不想要显示的文件或者文件夹。比如要过滤项目中的node_modules文件夹；
```
treee -I “node_modules”
```
