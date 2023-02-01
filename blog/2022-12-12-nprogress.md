---
slug: intro-nprogress
title: ant 系列的 UI 引入 nprogress
authors: [qsc]
tags: [nprogress]
---

由于之前一直在 shopify-polaris 的 UI 开发工作，antd、arco design 系列更适合中台业务，最近尝试用 arco 做了一个中台系统，其实这两个差不多，然后 arco 个人感觉更好看，没有其他理由。当然前段时间 ant 更新了 ant5 ，arco 和 antd 的实现差别就很大了。详情不多说了。

在 polaris 里面自带有个 loading 组件的，然后在 arco 里面没看到类似的组件， 发现他们用的 nprogress 这个库，github 有将近 30k 的 ⭐️，在此记录一下。

## 安装

```bash
npm install --save nprogress
```

## 使用

```jsx
import 'nprogress/nprogress.css' // 全局引入

import NProgress from 'nprogress'

NProgress.start()
NProgress.done()
```

## 封装成 hook

```jsx
import NProgress from 'nprogress'

export const useLoading = () => {
  const setLoading = (boolean) => {
    if (boolean) {
      NProgress.start()
    } else {
      NProgress.done()
    }
  }

  return { setLoading }
}
```

## 使用 hook

```jsx
const { setLoading } = useLoading()

const req = async () => {
  setLoading(true)
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 4000)
  })
  setLoading(false)
}
```
