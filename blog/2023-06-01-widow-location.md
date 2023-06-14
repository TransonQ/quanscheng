---
title: window.location
authors: [qsc]
tags: [JavaScript]
---



`window.location`对象是一个包含当前页面URL信息的对象。

```js
{
    "href": "https://transon.netlify.app/blog/2023-05-24-download-blob#typescript-%E7%89%88%E6%9C%AC",
    "protocol": "https:",
    "host": "transon.netlify.app",
    "hostname": "transon.netlify.app",
    "port": "",
    "pathname": "/blog/2023-05-24-download-blob",
    "search": "",
    "hash": "#typescript-%E7%89%88%E6%9C%AC",
    "origin": "https://transon.netlify.app",
    assign:()=>{},
    reload:()=>{},
    replace:()=>{},
    "ancestorOrigins": {},
}
```

## 1. `.href`

`href`属性返回当前页面的URL地址，可以读取和设置。例如：

```js
// 获取当前页面的URL地址
var url = window.location.href;
console.log(url);

// 通过设置href属性来重定向页面
window.location.href = "http://www.example.com";
```

## 2. `.protocol`

`protocol`属性返回当前页面的协议名称（例如`http:`或`https:`），可以读取和设置。例如：

```js
// 获取当前页面的协议名称
var protocol = window.location.protocol;
console.log(protocol);

// 通过设置protocol属性来切换协议
window.location.protocol = "https:";
```

## 3. `.host`

`host`属性返回当前页面的主机名和端口号（例如`www.example.com:8080`），可以读取和设置。例如：

```js
// 获取当前页面的主机名和端口号
var host = window.location.host;
console.log(host);

// 通过设置host属性来修改主机名和端口号
window.location.host = "www.example.com:8080";
```

## 4. `.hostname`

`hostname`属性返回当前页面的主机名（例如`www.example.com`），可以读取和设置。例如：

```js
// 获取当前页面的主机名
var hostname = window.location.hostname;
console.log(hostname);

// 通过设置hostname属性来修改主机名
window.location.hostname = "www.example.com";
```

## 5. `.port`

`port`属性返回当前页面的端口号（例如`8080`），可以读取和设置。例如：

```js
// 获取当前页面的端口号
var port = window.location.port;
console.log(port);

// 通过设置port属性来修改端口号
window.location.port = "8080";
```

## 6. `.pathname`

`pathname`属性返回当前页面的路径（例如`/index.html`），可以读取和设置。例如：

```js
// 获取当前页面的路径
var pathname = window.location.pathname;
console.log(pathname);

// 通过设置pathname属性来修改路径
window.location.pathname = "/newpage.html";
```

## 7. `.search`

`search`属性返回当前页面的查询字符串部分（例如`?id=123&name=John`），可以读取和设置。例如：

```js
// 获取当前页面的查询字符串部分
var search = window.location.search;
console.log(search);

//通过设置search属性来添加查询参数
window.location.search = "?id=123&name=John";
```

## 8. `.hash`

`hash`属性返回当前页面的锚点部分（例如`#section1`），可以读取和设置。例如：

```js
// 获取当前页面的锚点部分
var hash = window.location.hash;
console.log(hash);

// 通过设置hash属性来跳转到指定的锚点
window.location.hash = "#section2";
```


## 9. `.origin`

`origin`属性返回当前页面的域名（包括协议和端口号），例如`http://www.example.com:8080`。该属性只读。例如：

```js
// 获取当前页面的域名（包括协议和端口号）
var origin = window.location.origin;
console.log(origin);
```

## 10. `.assign(url)`

`assign()`方法会将当前窗口重定向到指定的URL地址，可以用来实现页面跳转。例如：

```js
// 将当前页面重定向到指定的URL地址
window.location.assign("http://www.example.com");
```

## 11. `.reload()`

`reload()`方法会重新加载当前页面，可以用来实现页面刷新。例如：

```js
// 刷新当前页面
window.location.reload();
```

## 12. `.replace(url)`

`replace()`方法会将当前窗口的URL地址替换为指定的URL地址，可以用来实现页面跳转。它与`assign()`方法的区别在于，`replace()`方法不会将新的URL地址添加到浏览器的历史记录中，因此用户不能使用“后退”按钮返回该URL地址之前的页面。例如：

```js
// 将当前页面的URL地址替换为指定的URL地址
window.location.replace("http://www.example.com");
```

## 13. `.ancestorOrigins`
`window.location.ancestorOrigins`属性返回一个DOMString列表，其中包含了当前页面所有祖先页面的域名（协议+主机名+端口号）。

如果当前页面在一个iframe或嵌套的子页面中，则这个列表会包含所有祖先页面的域名。如果当前页面不在iframe或嵌套的子页面中，则这个列表为空。

这个属性只读，不支持设置。以下是一个示例代码：

```javascript
// 获取当前页面所有祖先页面的域名
var ancestorOrigins = window.location.ancestorOrigins;

// 遍历所有祖先页面的域名
for (var i = 0; i < ancestorOrigins.length; i++) {
  console.log(ancestorOrigins[i]);
}
```

如果当前页面在一个iframe或嵌套的子页面中，以上代码会输出所有祖先页面的域名。如果当前页面不在iframe或嵌套的子页面中，则输出一个空列表。

> 需要注意的是，`window.location.ancestorOrigins`属性只在一些较新的浏览器中支持，如果你的代码需要在老旧的浏览器中运行，建议先判断一下是否支持该属性再使用。

以上就是`window.location`对象的常用属性及其用法。这些属性可以让我们方便地获取和设置页面的URL信息，从而实现各种功能，例如重定向、切换协议、修改查询参数等等。