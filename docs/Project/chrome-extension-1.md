---
sidebar_position: 3
title: 开发谷歌扩展(一)
---

## 知识

扩展使用与创建 Web 应用程序相同的 Web 技术编写：

- [HTML](https://web.dev/learn/html/)用作内容标记语言。

- [CSS](https://web.dev/learn/css/)用于样式。

- [JavaScript](https://developer.mozilla.org/docs/Learn/JavaScript)用于脚本和逻辑。

## Chrome Extension API

扩展可以使用浏览器提供的所有[JavaScript API 。](https://developer.mozilla.org/docs/Web/API)使扩展程序比 Web 应用程序更强大的是它们对[Chrome API](https://developer.chrome.com/docs/extensions/reference/)的访问。以下只是扩展程序可以执行的几个示例：

- 更改网站的功能或行为。
- 允许用户跨网站收集和组织信息。
- 向 Chrome DevTools 添加功能。

有关 API 功能的完整列表，请参阅[扩展开发概述](https://developer.chrome.com/docs/extensions/mv3/devguide/)。

## Extension文件

扩展包含不同的文件，具体取决于提供的功能。以下是一些最常用的文件：

1. manifest

   manifest唯一**必须**具有特定文件名的必需文件：`manifest.json`. 它还必须位于扩展的根目录中。清单记录重要的元数据、定义资源、声明权限并标识要在后台和页面上运行的文件。

2. service worker

   扩展[service worker](https://developer.chrome.com/docs/extensions/mv3/service_workers/)处理和监听浏览器事件。有许多类型的事件，例如导航到新页面、删除书签或关闭选项卡。它可以使用所有的[Chrome API](https://developer.chrome.com/docs/extensions/reference/)，但不能直接与网页内容交互；这就是内容脚本(Content scripts)的工作。

3. Content scripts

   [Content scripts](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)在网页上下文中执行 Javascript。他们还可以读取和修改他们被注入的页面的[DOM 。](https://developer.mozilla.org/docs/Web/API/Document_Object_Model) Content scripts只能使用[Chrome API](https://developer.chrome.com/docs/extensions/reference/)的一个子集，但可以通过与扩展服务工作者交换消息来间接访问其余部分。

4. 弹出窗口和其他页面

   扩展可以包含各种 HTML 文件，例如[弹出窗口(popup)](https://developer.chrome.com/docs/extensions/mv3/user_interface/#popup)、[选项页面](https://developer.chrome.com/docs/extensions/mv3/options/)和[其他 HTML 页面](https://developer.chrome.com/docs/extensions/mv3/architecture-overview/#html-files)。所有这些页面都可以访问[Chrome API](https://developer.chrome.com/docs/extensions/reference/)。

> 访问[扩展架构](https://developer.chrome.com/docs/extensions/mv3/architecture-overview/)和[设计用户界面](https://developer.chrome.com/docs/extensions/mv3/user_interface/)以深入了解。

## 开发

尽管 Web 应用程序和扩展共享许多相同的技术，但扩展开发体验是不同的。查看[Development Basics](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/)以创建“Hello, Extensions”示例并熟悉扩展开发工作流程。

## 设计扩展功能

当您开始设计扩展程序并选择要支持的功能时，请确保它实现了一个定义狭隘且易于理解的[单一目的。](https://developer.chrome.com/docs/webstore/program_policies/#single-purpose)这将允许您的扩展通过 Chrome 网上应用店进行分发。

## 发布扩展

[您可以使用Chrome 网上应用店](https://chrome.google.com/webstore/)设置开发者帐户来托管和分发您的扩展程序。请记住，扩展必须遵守[开发者计划政策](https://developer.chrome.com/docs/webstore/program_policies/)。

请参阅[在 Chrome 网上应用店中发布](https://developer.chrome.com/docs/webstore/publish/)以了解如何分发您的扩展程序。



## 教程包含

选择以下任何教程开始您的扩展学习之旅。

| 扩大                                                         | 你会学到什么                         |
| ------------------------------------------------------------ | ------------------------------------ |
| [阅读时间](https://developer.chrome.com/docs/extensions/mv3/getstarted/tut-reading-time/) | 在每个页面上自动插入一个元素。       |
| [对焦模式](https://developer.chrome.com/docs/extensions/mv3/getstarted/tut-focus-mode/) | 单击扩展操作后在当前页面上运行代码。 |
| [标签管理器](https://developer.chrome.com/docs/extensions/mv3/getstarted/tut-tabs-manager/) | 创建一个管理浏览器选项卡的弹出窗口。 |

作为奖励，这些教程旨在改善您在阅读 Chrome 扩展程序和 Chrome 网上商店文档时的体验：

- 阅读时间将预期阅读时间添加到每篇文档文章中。
- 焦点模式会改变页面的样式，以帮助您专注于文档内容。
- 选项卡管理器允许您组织扩展文档选项卡。
