---
title: doctor报错AS找不到Java版本
authors: [qsc]
tags: [flutter,开发环境]
---

## 更新Android Studio (version 2022.1)后doctor报错

```js
# [Unable to find bundled Java version [duplicate]](https://stackoverflow.com/questions/75115909/flutter-android-studio-version-2022-1-x-unable-to-find-bundled-java-versio)
```

![flutter-doctor报错](./image/flutter-doctor%E6%8A%A5%E9%94%99-1.png)

## 解决步骤 - MAC



### 一 : 找到引用程序,点击右键显示包内容

![找到AS包点击右键](./image/%E6%89%BE%E5%88%B0AS%E5%8C%85%E7%82%B9%E5%87%BB%E5%8F%B3%E9%94%AE.png)

### 二: 复制 jbr , 粘贴副本改名成 jre

![AS内部复制jbr副本改名jre](./image/AS%E5%86%85%E9%83%A8%E5%A4%8D%E5%88%B6jbr%E5%89%AF%E6%9C%AC%E6%94%B9%E5%90%8Djre.png)
