---
title: blob 下载函数
authors: [qsc]
tags: [JavaScript]
---

# blob 下载函数

## JavaScript 版本

```js
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}
```

- 这个函数接收两个参数，第一个参数是一个Blob对象，第二个参数是要下载的文件名。
- 该函数使用`createObjectURL`方法将Blob对象转换为URL，然后创建一个a标签并设置其href属性为该URL，download属性为文件名。
- 接着将a标签添加到DOM中，并模拟用户点击该a标签来触发下载。
- 最后，我们需要等待浏览器完成下载后，从DOM中移除a标签，并使用`revokeObjectURL`方法释放该URL。

## TypeScript 版本

```ts
function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}
```

这个函数跟上面的代码是一样的，只是加上了类型注解。第一个参数是一个Blob对象，类型为Blob，第二个参数是要下载的文件名，类型为字符串。函数的返回值为void，因为我们只是触发了浏览器的下载操作，并没有返回任何值。