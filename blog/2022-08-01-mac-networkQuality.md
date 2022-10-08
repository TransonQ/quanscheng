---
slug: mac-network-quality
title: mac终端便捷测网速
authors: [qsc]
tags: [MacOS, network]
---

## 打开终端输入

```bash
networkQuality
```

## 运行效果示例

```bash
current download capacity: 26.039 Mbps - current upload capacity: 2.233 Mbps
```

## 网络质量报告

```bash
Upload capacity: 2.393 Mbps     # 上传带宽
Download capacity: 40.437 Mbps  # 下载带宽
Upload flows: 20                #
Download flows: 12              #
Responsiveness: High (2191 RPM) # [响应能力的评价] 每分钟往返次数 (RPM)

# 「Low」（低），说明同一网络的设备会互相影响，导致其他设备的网络连接不可靠；
# 「Medium」（中），则表明多设备共享网络时会造成短暂卡顿；
# 「High」（高）则最为理想，表明网络通畅，多设备并行联网也能和平共处，保持良好连通。
# 更多参数和说明，可以用如下命令查阅手册页面 networkQuality(8)：man networkQuality
```
