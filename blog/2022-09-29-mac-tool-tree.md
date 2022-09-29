---
slug: mac-tool-tree
title: MacOS工具-tree
authors: [qsc]
tags: [MacOS, tree]
---

## homebrew 安装

```
brew install tree
```

## 常用命令

### 帮助

```bash
tree --help
```

### 显示制定层级

```bash
tree -L 3 # 显示当前目录下 3 层结构
```

### 只显示文件夹

```bash
tree -d
```

### 过滤文件/夹

```bash
tree -I "node_modules" # 过滤 node_modules 文件夹
```

### 奖树形结构导入到 readme.md 文件中

```bash
tree -L 2 > README.md
```

### 案例

```bash
# 过滤目录下的 node_modules 文件夹，显示目录下的 4 层结构，并导出到 README.md 文件中
tree -I "node_modules" -L 4 > README.md
```
