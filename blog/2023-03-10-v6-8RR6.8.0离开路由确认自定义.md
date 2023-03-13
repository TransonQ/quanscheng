---
slug: react-router-6-8-0-blocker
authors: [qsc]
tags: [react-router-dom,unstable_useBlocker,useBlocker]
---

# react-router 6.8.0离开路由确认自定义弹窗


##  需求

> 自从上一篇博客[react-router-dom v6.3 切换路由前确认](/blog/v6-prompt)提到的6版本破坏性更新和暂时废除了相关的api, 目前已经可以升级到 `6.8.0` 版本了,在此可以使用其提供的新暂定api解决自定义离开路由时候询问用户是否离开。

## 核心 : unstable_useBlocker


在`react-router-dom 6.8.0`的源码里面`unstable_useBlocker`类型如下: 


```ts
export declare function useBlocker(shouldBlock: boolean | BlockerFunction): Blocker;
```

深入查看`unstable_useBlocker`的返回值类型: 

```ts {6-7}
type Blocker = BlockerUnblocked | BlockerBlocked | BlockerProceeding;

// 锁定路由时
interface BlockerBlocked {
    state: "blocked";
    reset(): void;
    proceed(): void;
    location: Location;
}
// 未锁定路由时
interface BlockerUnblocked {
    state: "unblocked";
    reset: undefined;
    proceed: undefined;
    location: undefined;
}
// 离开路由的过程中
interface BlockerProceeding {
    state: "proceeding";
    reset: undefined;
    proceed: undefined;
    location: Location;
}
```

> 要点
>
> - 传入接受一个布尔值
> - 返回值根据三种状态分为三个不同的类型
> - 主要关注在`BlockerBlocked`时候, `reset` 和 `proceed` 是一个明确的函数

## 组件设计

```tsx
import { Modal } from '@shopify/polaris'
import { useEffect } from 'react'
import { unstable_useBlocker } from 'react-router-dom'
import { useToggle } from 'react-use'

type NavBlockerProps = {
  isBlocked: boolean
}

export const NavBlocker = ({ isBlocked }: NavBlockerProps) => {
  const blocker = unstable_useBlocker(isBlocked)

  const [active, toggleActive] = useToggle(false)

  const confirmLeave = () => {
    toggleActive(false)
    blocker.proceed?.()
  }
  const cancel = () => {
    toggleActive(false)
    blocker.reset?.()
  }

  useEffect(() => {
    if (blocker.state === 'blocked' || blocker.state === 'proceeding') {
      toggleActive()
    }
  }, [blocker, toggleActive])

  useEffect(() => {
    if (blocker.state === 'blocked' && !isBlocked) {
      toggleActive()
      blocker.reset()
    }
  }, [blocker, isBlocked, toggleActive])

  return (
    <Modal
      title="确认离开"
      open={active}
      onClose={cancel}
      primaryAction={{
        content: '确认离开',
        destructive: true,
        onAction: confirmLeave,
      }}
      secondaryActions={[{ content: '取消', onAction: cancel }]}
    >
      <Modal.Section>确认离开当前页面?</Modal.Section>
    </Modal>
  )
}

```

