---
title: doctor报错AS找不到Java版本
authors: [qsc]
tags: [flutter,开发环境]
---

## 更新Android Studio (version 2022.1)后doctor报错

```js
# [Unable to find bundled Java version [duplicate]](https://stackoverflow.com/questions/75115909/flutter-android-studio-version-2022-1-x-unable-to-find-bundled-java-versio)
```

![flutter-doctor报错](./image/flutter-doctor-1.png)

## 解决步骤 - MAC



### 一 : 找到引用程序,点击右键显示包内容

![找到AS包点击右键](./image/flutter-doctor-2.png)

### 二: 复制 jbr , 粘贴副本改名成 jre

![AS内部复制jbr副本改名jre](./image/flutter-doctor-3.png)
