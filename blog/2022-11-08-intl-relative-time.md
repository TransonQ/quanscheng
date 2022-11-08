---
title: js 的 Intl 相对时间格式化
authors: [qsc]
tags: [JavaScript, Intl]
---

JavaScript 中的 `Intl.RelativeTimeFormat()` API 可用于获取人类可读的日期差异。

- 时间负差

```js
const olderDate = new Date('2022-10-31')
const currentDate = new Date('2022-11-01')

const diff = olderDate - currentDate

const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
console.log(formatter.format(Math.round(diff / 86400000), 'day'))
// yesterday
```

- numeric 参数

```js
const formatter = new Intl.RelativeTimeFormat('en', {
  numeric: 'always',
})

console.log(formatter.format(Math.round(diff / 86400000), 'day'))
// 1 day ago
```

- 时间正差

```js
const formatter = new Intl.RelativeTimeFormat('en', {
  numeric: 'auto',
  style: 'long',
  localeMatcher: 'best fit',
})

console.log(formatter.format(Math.round(diff / 86400000), 'day'))
// tomorrow
```

> 原文: [Human-readable date difference in JavaScript](https://www.amitmerchant.com/human-readable-date-difference-in-javascript/)
