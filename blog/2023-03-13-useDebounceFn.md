---
authors: [qsc]
tags: [useDebounceFn,hooks]
---

## useDebounceFn

```ts
import { debounce } from 'lodash'
import { useMemo } from 'react'
import { useUnmount } from 'react-use'
import { useLatest } from './useLatest'

type DebounceOptions = {
  // 间隔时间
  wait?: number
  leading?: boolean
  trailing?: boolean
  maxWait?: number
}

type useDebounceFnRetrunProps = {
  run: () => void
  cancel: () => void
  flush: () => void
}

// ahooks 参数相同, 用法相同
export const useDebounceFn = (
  fn: Function,
  options?: DebounceOptions
): useDebounceFnRetrunProps => {
  const fnRef = useLatest(fn)

  const wait = options?.wait ?? 1000

  const debounced = useMemo(
    () =>
      debounce(
        (...args) => {
          return fnRef.current(...args)
        },
        wait,
        options
      ),
    // 不能加依赖, 否则可能导致死循环
    // eslint-disable-next-line
    []
  )

  useUnmount(() => {
    debounced.cancel()
  })

  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush,
  }
}

```

## useLatest

```ts
import { useRef } from 'react'

export function useLatest<T>(value: T) {
  const ref = useRef(value)
  ref.current = value

  return ref
}
```

