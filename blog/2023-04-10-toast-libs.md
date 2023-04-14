---
authors: [qsc]
tags: [工具库]
---

# react 实用工具UI库



## [React Hot Toast](https://react-hot-toast.com/)

```bash
yarn add react-hot-toast
```

```jsx title="App.jsx"
function App(){
  return <><Toaster position="bottom-center"/></>
}
```

```ts title="hotToast.ts"
import { toast } from 'react-hot-toast'
type optionProps = {
  error?: boolean
}

const color = {
  critical: 'rgba(216, 44, 13, 1)', // --p-action-critical 错误色
  default: 'rgba(32, 33, 35, 1)', // --p-surface-dark 默认黑色
}

export const hotToast = (msg: string, options?: optionProps) => {
  toast(msg, {
    style: {
      borderRadius: '4px',
      background: !options?.error ? color.default : color.critical,
      color: '#fff',
    },
  })
}

```

```js title="使用"
hotToast("提示信息")
hotToast("错误信息",{error:true})
```

## [Sonner](https://sonner.emilkowal.ski/)

```bash
yarn add sonner
```

用法同`React Hot Toast`



## [React Wrap Balancer](https://react-wrap-balancer.vercel.app/)

```bash
yarn add react-wrap-balancer
```

```jsx title="使用方法"
import Balancer from 'react-wrap-balancer'

// ...

<h1>
  <Balancer>My Title</Balancer>
</h1>
```

```jsx title="多个组件可以共享逻辑"
import { Provider } from 'react-wrap-balancer'

// ...

<Provider>
  <App/>
</Provider>
```

