---
slug: react-router-6-5
title: react-router-6.5支持可选路由段
authors: [qsc]
tags: [react-router-dom]
---

## 可选路径参数

在 path 结尾添加`?`可以使得整个路由参数变为`可选的`，比如：
```tsx
<Route path=":lang?/about"> 
```
将会匹配为:
-   `/:lang/about`
-   `/about`

```tsx
<Route path="/multistep/:widget1?/widget2?/widget3?">
```
将会匹配为:
-   `/multistep`
-   `/multistep/:widget1`
-   `/multistep/:widget1/:widget2`
-   `/multistep/:widget1/:widget2/:widget3`

## 可选的静态路径参数

```tsx
<Route path="/home?">
```
将会匹配为: 
-   `/`
-   `/home`

```tsx
<Route path="/fr?/about">
```
-   `/about`
-   `/fr/about`

:::info 
[更新说明](https://github.com/remix-run/react-router/releases/tag/react-router%406.5.0)
:::