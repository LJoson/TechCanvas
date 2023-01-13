---
title: Git使用笔记文档
date: 2021-01-28 17:30:12
sidebar: true
sidebarDepth: 5
tags:
- 文档笔记
categories:
- "笔记等"
isShowComments: true
---


- 《git教程》https://www.liaoxuefeng.com/wiki/896043488029600 remote set-url origin git@github.com:“仓库地址”

git config --global user.name “git用户名”

git config –global user.email “git用户邮箱”

ssh -T git@github.com

2、创建本地库

mkidir learngit //自定义文件夹
cd learngit

touch test.md //创建test.md文件
pwd //显示当前目录


3、常用CRT

git init //初始化代码仓库
git add learngit.txt     //-A:参数把所有要提交的文件修改放到暂存区
git commit -m 'add a file'                      //把暂存区的所有内容提交到当前分支
git status                                            //查看工作区状态
git diff                                                //查看文件修改内容
git log                                                //查看提交历史
git log --pretty=oneline                       //单行显示
git reset --hard HEAD^　　　　　　　　 //回退到上一个版本，其中（HEAD^^(上上版本),HEAD~100(往上100个版本)）

commit id                                          //(版本号) 可回到指定版本
git reflog                                           //查看历史命令

其中说明(
工作区（Working Directory）
版本库（Repository） #.git
stage(index) 暂存区
main Git自动创建的分支
HEAD 指针



git diff HEAD -- <file>                                  //查看工作区和版本库里最新版本的区别
git checkout -- <file>                                   //用版本库的版本替换工作区的版本，无论是工作区的修改还是删除，都可以'一键还原'
git reset HEAD <file>                                   //把暂存区的修改撤销掉，重新放回工作区。
git rm <file>                                               //删除文件，若文件已提交到版本库，不用担心误删，但是只能恢复文件到最新版本


4、创建SSH Key，建立本地Git仓库和GitHub仓库之间的传输的秘钥

ssh-keygen -t rsa -C '1250377062@qq.com'                                                    //创建SSH Key
git remote add origin git@github.com:username/repostery.git                  //关联本地仓库，远程库的名字为origin

//第一次把当前分支main推送到远程，-u参数不但推送，而且将本地的分支和远程的分支关联起来
git push -u origin main
git push origin main                                                                //把当前分支main推送到远程
git clone git@github.com:username/repostery.git                            //从远程库克隆一个到本地库


5、分支
git checkout -b dev                                   //创建并切换分支
#相当于git branch dev 和git checkout dev
git branch                                            //查看当前分支，当前分支前有个*号
git branch <name>                                   //创建分支
git checkout <name>                                //切换分支
git merge <name>                                   //合并某个分支到当前分支
git branch -d <name>                               //删除分支
git log --graph                                   //查看分支合并图
git merge --no-ff -m 'message' dev                //禁用Fast forward合并dev分支

git stash                                                 //隐藏当前工作现场，等恢复后继续工作
git stash list                                            //查看stash记录
git stash apply                                         //仅恢复现场，不删除stash内容
git stash drop                                          //删除stash内容
git stash pop                                           //恢复现场的同时删除stash内容
git branch -D <name>                              //强行删除某个未合并的分支

//开发新feature最好新建一个分支
git remote                                               //查看远程仓库
git remote -v                                           //查看远程库详细信息

git pull                                                   //抓取远程提交
git checkout -b branch-name origin/branch-name                  //在本地创建和远程分支对应的分支
git branch --set-upstream branch-name origin/branch-name   //建立本地分支和远程分支的关联

6、其他---标签/release
git tag v1.0                                                                      //给当前分支最新的commit打标签
git tag -a v0.1 -m 'version 0.1 released' 3628164                 //-a指定标签名，-m指定说明文字
git tag -s <tagname> -m 'blabla'                                        //可以用PGP签名标签
git tag                                                                             //查看所有标签
git show v1.0                                                                   //查看标签信息
git tag -d v0.1                                                                 //删除标签
git push origin <tagname>                                               //推送某个标签到远程
git push origin --tags                                                       //推送所有尚未推送的本地标签

git remote -v // 查看当前远程分支
git fetch origin main // 获取远端的origin/main分支
git log -p main..origin/main // 查看本地main和远端origin/main的版本差异
git merge origin/main // 合并远端origin/main分支到当前本地分支

7.Git submodule 子模块的管理和使用
https://www.jianshu.com/p/9000cd49822c

- 如果首次克隆仓库及其模块，使用：
```
git clone --recursive 仓库地址
```
- 对于仓库首次拉取模块，可以使用：
```
git submodule update --init --recursive
```
- 更新单个子模块xxx
```
git submodule update --init xxx
```
- 更新子模块：
```
# 适用于git 1.8.2及以上版本
git submodule update --recursive --remote

# 适用于git 1.7.3及以上版本
git submodule update --recursive
#或者
git pull --recurse-submodules
```
GitHub改host加速：

![1](https://gitee.com/Lj_Evan/images/raw/master/git/20210608225024.png)

win10下密钥地址一般在：

 ![2](https://gitee.com/Lj_Evan/images/raw/master/git/20210608225037.png)


YAMLException: can not read a block mapping entry; a multiline key may not be an implicit key

[https://chrischen0405.github.io/2018/11/21/post20181121-2/](https://chrischen0405.github.io/2018/11/21/post20181121-2/)


gnutls_handshake() failed: The TLS connection was non-properly terminated
https://blog.csdn.net/songtianlun/article/details/115611734

### Git更新远程仓库代码到本地
当我们在多台电脑上开发一个项目的时候，需要经常修改提交内容并在另一台电脑上更新远程最新的代码，今天看了一下如何从远程代码仓库获取更新到本地，总结了一下网上的文章，采用如下的方式比较简单。

当我们在多台电脑上或者多人共同开发一个项目的时候，远程仓库会不时地被修改，而自己也在不断修改自己的本地仓库，因此仓库的远程版本与本地版本势必会导致不一致。比如A同学基于版本1修改了远程仓库并提交了，形成了版本2；B同学的本地仓库是基于版本1的，并对版本1做了自己的修改，当B同学更新本地仓库的时候会自动地将本地仓库与远端版本2仓库合并，这个合并被期望能够保护B同学基于版本1进行的一些修改。
这里说明这种情况下，Git的处理机制以及我们保护本地基于旧版本仓库修改的内容的的应对措施。

方法一
查看远程分支
使用如下命令可以查看远程仓库（我这里有一个origin仓库）

$ git remote -v

从远程获取最新版本到本地
使用如下命令可以在本地新建一个temp分支，并将远程origin仓库的master分支代码下载到本地temp分支

$ git fetch origin master:temp


比较本地仓库与下载的temp分支
使用如下命令来比较本地代码与刚刚从远程下载下来的代码的区别：

$ git diff temp


合并temp分支到本地的master分支
对比区别之后，如果觉得没有问题，可以使用如下命令进行代码合并：

$ git merge temp


删除temp分支
如果temp分支不想要保留，可以使用如下命令删除该分支：

$ git branch -d temp

如果该分支的代码之前没有merge到本地，那么删除该分支会报错，可以使用git branch -D temp强制删除该分支。

方法二
git pull的作用是，从远程库中获取某个分支的更新，再与本地指定的分支进行自动merge。完整格式是：

$ git pull <远程库名> <远程分支名>:<本地分支名>
比如，取回远程库中的develop分支，与本地的develop分支进行merge，要写成：

git pull origin develop:develop
如果是要与本地当前分支merge，则冒号后面的<本地分支名>可以不写。

git pull origin develop
通常，git会将本地库分支与远程分支之间建立一种追踪关系。比如，在git clone的时候，所有本地分支默认与远程库的同名分支建立追踪关系。也就是说，本地的master分支自动追踪origin/master分支。因此，如果当前处于本地develop分支上，并且本地develop分支与远程的develop分支有追踪关系，那么远程的分支名可以省略：

git pull origin

其实，git pull 命令等同于先做了git fetch ，再做了git merge。即：

git fetch origin develop
git checkout develop
git merge origin/develop

或者

git fetch origin master:tmp
git diff tmp
git merge tmp
git branch -d tmp


### 使用git日常免不了遇到conflicts，那么如何消除conflicts呢

Step 1: From your project repository, check out a new branch and test the changes.

git checkout -b apache-master master
git pull https://github.com/apache/incubator-apisix.git master

Step 2: Merge the changes and update on GitHub.

git checkout master
git merge --no-ff apache-master
git push origin master

以上的的例子， 我们从A合入到B：B <== A。
A: https://github.com/apache/incubator-apisix.git
B: xxxx/incubator-apisix.git

例子中有一个README.md的冲突，并且给出了解决的命令行参考。
我们将逐条命令来解释如何按照提示解决冲突。

假设我们已经在B的git 根目录下。
git checkout -b apache-master master #建立B的 apache-master分支，并切换到apache-master
git pull https://github.com/apache/incubator-apisix.git master # 将A最新的内容合入apache-master
因为有冲突，所以上条执行时，会提示冲突：
From https://github.com/apache/incubator-apisix
 * branch            master     -> FETCH_HEAD
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
解决冲突[ ... resolve any conflicts ... ]：手动打开冲突文件，根据提示修改，删除冲突的内容，留下想要的结果内容。
git add [files that were conflicted]
git commit,将冲突修改提交本地仓库：
git commit -m "resolve the conflict"
[apache-master 6ad2d5e] resolve the conflict
git checkout master # 将B切换为master
git merge --no-ff apache-master #将B仓库的apache-master 合入 master
git push origin master #将B仓库的最终的本地库推到云端master
最终解决了冲突，完成了对B master的更新。

## 挂代理

```
git config --global http.proxy http://169.254.224.64:7890
git config --global https.proxy https://169.254.224.64:7890
git config --global --unset http.proxy
git config --global --unset https.proxy
npm config delete proxy
git config --global http.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy 'socks5://127.0.0.1:1080'
```

https://www.shuzhiduo.com/A/QV5Z86Xwzy/
查看代理：
```
git config --global --get http.proxy
git config --global --get https.proxy
```
## pr小知识

https://github.com/aermin/blog/issues/50


## 解决 Git 更新本地冲突：commit your changes or stash them before you can merge
```
#方法一：stash

git stash
git pull
git stash pop
#方法二：直接完全覆盖本地修改
git reset --hard
git pull

```

## 详解 Git 大文件存储（Git LFS）
```
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
sudo apt-get install git-lfs
git lfs install

```

https://zhuanlan.zhihu.com/p/146683392