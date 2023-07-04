---
title: vite-react-ts
authors: [qsc]
tags: [vite]
---

## 包管理器

如果使用`yarn`安装, 新版本 yarn 管理会把下载的包管理至.yarn 文件夹,node_modules 里面基本就是链接的形式, 所以会出现下面的情况, ==正常运行,但是 ts 服务器检测不到包==:

![vite-react-ts-01-yarn.png](./img/vite-react-ts-01-yarn.png)

使用`npm`或者`pnpm`就没有这个问题.



## 关于软/硬链接的知识

[从pnpm来看软硬链接的应用](https://mp.weixin.qq.com/s/IQjgzwFHDdXeTMG3GZunzw)

[一文带你深度理解pnpm](https://mp.weixin.qq.com/s/7gwJZruwCbKwxqWlXvA3fQ)

