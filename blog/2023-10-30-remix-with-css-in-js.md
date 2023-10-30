---
title: 在Remix中使用styled-components
authors: [qsc]
tags: [remix]
---

## 背景

> 最近业务开始使用remix用于开发, 相对于之前纯客户端渲染开发, `styled-components`这一高效的`css-in-js`库一直想用在ssr上面, 前段时间卡壳在于对原生node请求响应这一方向接触较少, 较为生疏的情况下, 看着人家[styled-components SSR](https://styled-components.com/docs/advanced#server-side-rendering)文档看了, 原理了解了之后总结就是: 服务端渲染需要将生成的css和html从服务端发往客户端,`css-in-js`的库基本都有==避免双重渲染== 的手段. 如下就是`styled-components`收集样式后加入详情头解决方法.

## 代码案例

```ts
import {
  createReadableStreamFromReadable,
  type EntryContext,
} from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { PassThrough } from "stream";
import { ServerStyleSheet } from "styled-components"; // 1.导入ServerStyleSheet
import { addDocumentResponseHeaders } from "./shopify.server";

const ABORT_DELAY = 5000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  addDocumentResponseHeaders(request, responseHeaders);

  const callbackName = isbot(request.headers.get("user-agent"))
    ? "onAllReady"
    : "onShellReady";

  return new Promise((resolve, reject) => {
    const sheet = new ServerStyleSheet(); // 2.创建ServerStyleSheet实例

    const { pipe, abort } = renderToPipeableStream(
      // 3.使用collectStyles方法收集样式
      sheet.collectStyles(
        <RemixServer
          context={remixContext}
          url={request.url}
          abortDelay={ABORT_DELAY}
        />
      ),
      {
        [callbackName]: () => {
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          const styleTags = sheet.getStyleTags(); // 4.获取样式标签

          responseHeaders.set("Content-Type", "text/html");
          responseHeaders.set("Link", styleTags); // 5.将样式标签添加到响应头中

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          console.error(error);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

```

