---
slug: git-env-proxy
title: Git的vpn代理配置
authors: [qsc]
tags: [git]
---

## 背景

问题案例: 克隆仓库时候报连接被拒绝

```bash
fatal: unable to access 'https://github.com/克隆的仓库xxx.git/':
Failed to connect to github.com port 443 after 4 ms: Connection refused
```

## 问题

> 挂了 vpn 可以访问外网但是无法 pull/push

## 代理配置

1. 首先找到网络 https/http 代理端口,设置代理端口

```bash
git config --global http.proxy 127.0.0.1:代理端口号
```

2. 不需要时可以取消代理

```bash
git config --global --unset http.proxy
```

3. 查看 git 设置

```bash
git config --list

# 如果设置了端口的话会找到如下的信息
# http.proxy=127.0.0.1:端口号
```
