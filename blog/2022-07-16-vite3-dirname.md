---
slug: vite3-hasnt-dirname
title: vite3(ESM)无__dirname变量
authors: [qsc]
tags: [vite, alias]
---

## ESM 不支持\_\_dirname,需要自定义

```js
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const _dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : dirname(fileURLToPath(import.meta.url))
```

## 路径别名示例

```js title="vite.config.js"
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

//  __dirname is not available in ES module.
const _dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(_dirname, 'src'),
    },
  },
})

```
