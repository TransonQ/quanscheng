---
slug: useGlobalState
title: useGlobalState
authors: [qsc]
tags: [useGlobalState, hooks]
---

## 状态在多组件传递

通常是: 

- 第三方库
- context
- props 传递

还可以手撸一个 `useGlobalState`

## useGlobalState 

### 使用 react17 实现

```jsx
import { useState, useEffect, useCallback } from 'react';

export function createState(initialValue) {
    return {
        listeners: [],
        state: initialValue,
    };
}

export function useGlobalState(config) {
    const [state, _setState] = useState(config.state);
    const setState = useCallback(stateOrSetter => {
        let next = stateOrSetter;
        if (typeof stateOrSetter === 'function') {
            next = stateOrSetter(config.state);
        }
        config.listeners.forEach(l => l(next));
        config.state = next;
    }, []);

    useEffect(() => {
        // Register the observer
        const listener = state => _setState(state);
        config.listeners.push(listener);

        // Cleanup when unmounting
        return () => {
            const index = config.listeners.indexOf(listener);
            config.listeners.splice(index, 1);
        };
    }, []);

    return [state, setState];
}
```

使用:
```jsx
const COUNT = createState(0);

const [count, setCount] = useGlobalState(COUNT);
```


### 使用 react 18 实现

```jsx
import { useCallback, useSyncExternalStore } from 'react';

export function createState(initialValue) {
    return {
        listeners: [],
        state: initialValue,
    };
}

export function useGlobalState(config) {
    const setState = useCallback(stateOrSetter => {
        let next = stateOrSetter;
        if (typeof stateOrSetter === 'function') {
            next = stateOrSetter(config.state);
        }
        config.state = next;
        config.listeners.forEach(l => l());
    }, []);

    const state = useSyncExternalStore(
        (listener) => {
            config.listeners.push(listener);
            return () => config.listeners.filter(l => l !== listener);
        },
        () => {
            return config.state;
        },
    );
    return [state, setState];
}
```

使用: 

```jsx
const COUNT = createState(0);

const [count, setCount] = useGlobalState(COUNT);
```