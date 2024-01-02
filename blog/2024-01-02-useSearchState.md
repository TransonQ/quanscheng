---
title: 自定义useSearchState与查询字符串同步状态
authors: [qsc]
tags: [hooks]
---



## code

> [代码: useSearchState-TransonQ](https://gist.github.com/TransonQ/1c34c4785631285e41a88e8397212b6f)

```ts
import { useState, useEffect } from "react";

function useSearchState<T>(key: string, init?: T) {
  const searchParams = new URLSearchParams(window.location.search);
  let initValue = searchParams.get(key) || "";

  try {
    JSON.parse(initValue); // 尝试解析查询字符串中的值
  } catch (e) {
    if (init !== undefined) {
      initValue = JSON.stringify(init); // 如果解析错误，使用init的格式化后的值
    } else {
      initValue = ""; // 如果init也没有，初始化为空字符串
    }
  }

  const [params, setParams] = useState<T>(() => {
    return JSON.parse(initValue) as T;
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, JSON.stringify(params));
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [params, key]);

  return [params, setParams] as const;
}

export default useSearchState;

```

## 使用案例

https://codesandbox.io/p/sandbox/usesearchstate-key-init-9krjzz

<iframe
      src="https://codesandbox.io/embed/9krjzz?view=Editor+%2B+Preview&module=%2Fsrc%2Fhooks%2FuseSearchState.ts&expanddevtools=1"
      style={{ width: '100%', height: '500px', border: '0', borderRadius: '4px', overflow: 'hidden' }}
      title="useSearchState('key',init)"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
