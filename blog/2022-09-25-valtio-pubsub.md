---
slug: valtio-pub-sub
title: 使用valtio实现请求响应错误toast
authors: [qsc]
tags: [valtio, useSyncExternalStore]
---

## 关于全局的请求响应错误提示

1. UI 库自带函数调用即可实现全局 toast (如: ant design 的 `message.error(config)`)
2. 将请求响应拦截器(`axios.interceptors.response.use()`)写在 UI 层
3. 通过发布订阅的方式从响应拦截器通知到对应的组件

## valtio 是状态代理变得简单

文档看这里: [valtio.pmnd.rs](https://valtio.pmnd.rs/)

## 关于 useSyncExternalStore (react18)

个人认为,对于 react 组件之间的状态管理在其内部始终满足`UI = function( data )`,并且对于渲染与重新渲染有一套完备的机制. 但是如果对于外部数据源,可能会导致一些不必要的渲染, 具体可以看这篇文章: [useSyncExternalStore - The underrated React API](https://thisweekinreact.com/articles/useSyncExternalStore-the-underrated-react-api)

## 封装一个请求响应错误 toast

```jsx title="src/global/pubstate.js"
import { useSyncExternalStore } from "react"
import { proxy, snapshot, subscribe } from "valtio"

// 创建一个代理对象
const pubState = proxy({ active: false, text: "hello" })

// 订阅
const subscribePubState = (callback) => subscribe(pubState, callback)

// 使用代理
const snapshotPubState = () => snapshot(pubState)

// 自定义钩子
const usePubState = () =>
  useSyncExternalStore(subscribePubState, snapshotPubState)

export { pubState, usePubState }
```

```jsx
function App() {
  const { text, active } = usePubState() // 使用代理数据

  // toast 的显隐
  const toastvaltio = active ? (
    <Toast
      content={pubState.text}
      onDismiss={() => {
        pubState.active = !pubState.active
      }}
    />
  ) : null

  return (
    <Frame>
      <Page title="example">
        <Card sectioned>
          {toastvaltio}
          <Heading>{text}</Heading>
          // 模拟请求响应触发代理值改变
          <Button
            onClick={() => {
              pubState.active = true
              pubState.text = "" + Math.random()
            }}
          >
            mutate
          </Button>
        </Card>
      </Page>
    </Frame>
  )
}
```

### [codesandbox](https://codesandbox.io/s/valtio-demo-zjonrg?file=/App.js:164-905)
