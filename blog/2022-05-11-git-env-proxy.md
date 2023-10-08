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

> `https` 代理同理

## 上传问题

如果出现`Git: fatal: unable to access 'https://xxxxxxxx.git/': Recv failure: Connection reset by peer` 此种类似的问题, 就是代理了对应的协议端口不行了, 尤其是私有仓库/公司仓库有的限定了访问端口或者不让用代理的. 

解决方法:

之前代理了什么清除一下

```
git config --global --unset http.proxy
```

```
git config --global --unset https.proxy
```

