---
title: CI/CD自动化集成测试部署
date: 2022-04-17 20:11:12
sidebar: true
sidebarDepth: 5
tags:
- CI/CD
categories:
- "杂谈"
isShowComments: true
---

用 GitHub Actions 自动打包发布 Python 项目

## 前言

还在手动打包上传 PyPI？GitHub Actions 自动化真香～！

在《Python 代码一键转流程图》一文里，我介绍了我的开源项目 PyFlowchart。最近，几位小伙伴为这个项目提出了建议或报告了 Bug。在他们的帮助下，项目迭代了几个版本。之前，每次版本更新，我都需要做很多编码之外的麻烦事：

1. 在 GitHub 上发布一个 release
2. 手动打包上传 PyPI

这个过程非常反人类，发布一个版本要做两项工作。更可怕的是，打包上传 PyPI 的工作十分模板化（我在《如何用 pip 安装自己写的包》一文中介绍了这个过程）。我认为作为开发者，不应该把时间浪费在这种套路工作上。

我想起了之前写过的《还在手动发博客？GitHub Actions自动化真香》，介绍了如何利用 GitHub Actions 自动更新博客网站。于是，这次我尝试用 GitHub Actions 搭建了一套在发布新版本时自动打包上传 PyPI 📦 的工作流程。

现在，发布新版本时，只需在 GitHub 上新建一个 Release。GitHub Actions 会自动完成构建、打包、上传 PyPI 的工作。

本文将介绍如何利用 GitHub Actions 自动发布 Python 包到 PyPI。

（注：我在 PyFlowchart 项目中使用的实现和下文略有不同，我根据需求做了一些修改。如果你感兴趣，可以看看我的实现：https://github.com/cdfmlr/pyflowchart/tree/master/.github/workflows）

下文翻译自 PyPA 的文章《Publishing package distribution releases using GitHub Actions CI/CD workflows》

原文链接：https://packaging.python.org/guides/publishing-package-distribution-releases-using-github-actions-ci-cd-workflows/

GitHub Actions CI/CD 允许在 GitHub 平台上特定事件发生时自动运行一系列命令。我们可以用它设置一个响应 push 事件的工作流程。本文将展示如何在 git push 时发布新的 Python 包（到 PyPI）。我们将使用 pypa/gh-action-pypi-publish GitHub Action。

注意：本教程假设你已在 GitHub 上有一个 Python 项目，并且知道如何构建包并发布到 PyPI。

## 在 GitHub 上保存 token

在本文中，我们会把项目上传到 PyPI 和 TestPyPI。因此需要生成两个独立的 token，并将它们保存到 GitHub 的仓库设置中。

让我们开始吧！🚀

1. 访问 https://pypi.org/manage/account/#api-tokens ，创建一个新的 API token。如果你已在 PyPI 发布过项目，应将 token 范围(token scope) 限定为只能操作该项目。可将新 token 命名为 "GitHub Actions CI/CD —project-org/project-repo" 之类的，便于识别。生成 token 后不要关闭浏览器页面—— token 只会显示一次。

2. 在另一个浏览器标签或窗口中，打开 GitHub 上你的项目页面，点击 Settings 标签，然后点击左侧边栏的 Secrets。

3. 创建一个新的 secret，命名为 PYPI_API_TOKEN，然后复制粘贴第一步生成的 token。

4. 访问 https://test.pypi.org/manage/account/#api-tokens ，重复之前的步骤，将 TestPyPI 的 token 保存为 TEST_PYPI_API_TOKEN。

注意：如果你还没有 TestPyPI 账号，应该注册一个。TestPyPI 和 PyPI 的账号是独立的。

## 创建 workflow

GitHub CI/CD 工作流程（workflow）是用 YAML 格式的文件存储在仓库的 .github/workflows/ 目录中的。

我们创建一个 .github/workflows/publish-to-test-pypi.yml 文件。

首先，我们用一个有意义的名称开始，然后定义触发 GitHub 运行此工作流程的事件：

```yaml
name: Publish Python 🐍 distributions 📦 to PyPI and TestPyPI

on: push
```

### 定义工作流程的工作环境

现在，我们为工作（job）添加初始设置。这个过程将执行我们稍后定义的命令。在这里，我们将使用 Ubuntu 18.04：

```yaml
jobs:
  build-n-publish:
    name: Build and publish Python 🐍 distributions 📦 to PyPI and TestPyPI
    runs-on: ubuntu-18.04
```

### 签出项目，构建发行版

然后，在该 build-n-publish 部分下添加以下内容：

```yaml
steps:
- uses: actions/checkout@master
- name: Set up Python 3.7
  uses: actions/setup-python@v1
  with:
    python-version: 3.7
```

这些操作会将我们的项目源码下载到 CI 运行容器中，然后安装并激活 Python 3.7 环境。

现在，我们就可以从源码构建 dist 了。在此示例中，我们将使用 build 包，所以假设项目中已正确设置 pyproject.toml（请参见 PEP 517 / PEP 518）。

（注：其实这里不写 pyproject.toml 问题也不大）

提示：你可以使用任何其他方法来构建发行版，只要将准备好上传的包保存到 dist/ 文件夹中即可。

将下面的代码加到 steps 中：

```yaml
- name: Install pypa/build
  run: >-
    python -m
    pip install
    build
    --user
- name: Build a binary wheel and a source tarball
  run: >-
    python -m
    build
    --sdist
    --wheel
    --outdir dist/
    .
```

### 发布到 PyPI 和 TestPyPI

最后，添加如下代码：

```yaml
- name: Publish distribution 📦 to Test PyPI
  uses: pypa/gh-action-pypi-publish@master
  with:
    password: ${{ secrets.TEST_PYPI_API_TOKEN }}
    repository_url: https://test.pypi.org/legacy/
- name: Publish distribution 📦 to PyPI
  if: startsWith(github.ref, 'refs/tags')
  uses: pypa/gh-action-pypi-publish@master
  with:
    password: ${{ secrets.PYPI_API_TOKEN }}
```

这两个 step 调用了 pypa/gh-action-pypi-publish GitHub Action：

第一个步骤无条件地将 dist/ 文件夹的内容上传到 TestPyPI。第二个步骤将其内容上传到 PyPI，这一步只会对被打了标签（git tag）的提交执行。

https://github.com/github-actions-x/commit/blob/master/entrypoint.py

https://github.com/actions-x/commit/blob/master/entrypoint.sh