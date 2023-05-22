---
title: 常用下载函数
authors: [qsc]
tags: [工具函数]
---

## 链接下载

```ts
export function downLoadFile(url: string, filename: string, blank = true) {
  if (!isURL(url)) return
  let downloadLink = document.createElement('a')
  downloadLink.download = filename
  downloadLink.href = url
  blank && (downloadLink.target = '_blank')
  downloadLink.click()
  window.URL.revokeObjectURL(downloadLink.href)
}
```

## blob 下载

> 需要设置 responseType: 'blob'
>
> axios 案例
>
> ```js
> export const postDownloadLetter = () =>
>   axios.request({
>     method: 'post',
>     url: 'url',
>     responseType: 'blob',
>   })
> ```

代码

```ts
export const downloadBlob = (blob: any, fileName: string) => {
  const elink = document.createElement('a')
  elink.download = fileName
  elink.style.display = 'none'
  elink.href = URL.createObjectURL(blob)
  document.body.appendChild(elink)
  elink.click()
  URL.revokeObjectURL(elink.href)
  document.body.removeChild(elink)
}
```
