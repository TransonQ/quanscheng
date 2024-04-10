---
title: 去除在 vscode 中无法识别 tailwindcss 的警告
authors: [qsc]
tags: [hooks]
---

## 问题描述

![image-20240410200754613](https://raw.githubusercontent.com/TransonQ/image-share/main/img/202404102007750.png)

> Unknown at rule @tailwindcss(unknownAtRules)



## 解决方法

打开 vscode 设置，输入`file associations` 添加项：

```
*.css											tailwindcss
*.scss										tailwindcss
```

![image-20240410201406358](https://raw.githubusercontent.com/TransonQ/image-share/main/img/202404102014408.png)

> 到此就可以了，治好了强迫症。