---
title: pnpm工作区实现monorepo+shadcn项目
authors: [qsc]
tags: [tailwind,monorepo,pnpm]
---

## 创建工作区

> 推荐使用 [pnpm](https://pnpm.io/)，本文章 pnpm 版本为：v8.15.7

```jsx
mkdir growth-apps

cd growth-apps

pnpm init
```

可以得到如下的项目结构，然后修改 package.json，如下所示
![init](https://raw.githubusercontent.com/TransonQ/image-share/main/img/monorepo%E5%88%9D%E5%A7%8B%E5%8C%96.png)

创建 `pnpm-workspace.yaml`，并且更新文件内容如下：

![image-20240419154935735](https://raw.githubusercontent.com/TransonQ/image-share/main/img/202404191549769.png)

创建 `.npmrc` 文件，更新文件内容如下：

```
auto-install-peers = true
enable-pre-post-scripts=true
```

创建 `.gitignore` 文件，更新如下内容：

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

![image-20240419155206736](https://raw.githubusercontent.com/TransonQ/image-share/main/img/202404191552768.png)

初始化工作区 git：

```
git init
```

创建工作区文件夹：`/apps` `/packages` :

```
├───📁 apps/
├───📁 packages/
├───📄 .gitignore
├───📄 .npmrc
├───📄 package.json
└───📄 pnpm-workspace.yaml
```

先准备 packages 中的公共目录，参考设计如下：

- /ui
- /utils
- /config-ts
- /config-tailwind

> 里程碑：已经得到一个 monorepo 基本的架构了。

## apps

这里以常见的 vite-react 创建一个 SPA 项目为例：

```
cd apps

pnpx create-vite

--------------- 
pnpx create-vite
Packages: +1
+
Progress: resolved 1, reused 1, downloaded 0, added 1, done
✔ Project name: … vite-react
✔ Select a framework: › React
✔ Select a variant: › TypeScript
---------------
```

这里可以将这个 vite-react 项目作为模板项目，后续创建类似的项目以此为样板直接快速搭建就好了。所以为此我们需要做一点小改动：

- 我们将 `/apps/vite-react/package.json` 中的 `devDependencies` 和 `dependencies` 剪切到顶层的 `/package.json` 中。
- 执行 `pnpm i`。
- 接下来在 vite-react 项目的终端中执行 `pnpm run dev` 可以看到已经运行了一个初始项目。

```
pnpm run dev
--------
> vite
Port 5173 is in use, trying another one...

  VITE v5.2.9  ready in 130 ms

  ➜  Local:   http://localhost:5174/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
--------
```

> 注意：因为这个案例需求是，可能会创建多个 SPA 项目，将基础依赖提取到顶层 package.json 是为了保证所有项目使用同一个依赖版本。方便管理。

## packages

```
pnpm init
```

需要修改一下 package.json，根据 monorepo 工作区的约定，我们约定公共 ui 库的名称前缀为 `@mono/`。

```json
{
  "name": "@mono/ui",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {},
  "keywords": []
}
```

> 注意：记得每一次修改库名之后，执行一下：`pnpm i` ，你会在终端中看到类似于这样的提示：Scope: all 2 workspace projects 。这说明 pnpm 识别到了你的工作区中的项目。这一步是必须的，后续类似的操作，也遵循这一原则。

然后为 packages 中的项目都初始化，然后都给项目名字加上前缀：`@mono/utils` , `@mono/config-ts` ,`@mono/config-tailwind` 。文章后续默认已经设置好了各个项目的 package.json。

## 配置 @mono/config-ts

![monorepo-ts](https://raw.githubusercontent.com/TransonQ/image-share/main/img/202404202002429.png)

一个最快速的实践方式是，直接将vite-react 项目中的配置文件复制到公共配置项目`@mono/config-ts`中。

config-ts

```
├───📄 package.json
├───📄 tsconfig.json
└───📄 tsconfig.node.json
```

config-ts/package.json

```
{
  "name": "@mono/config-ts",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "exports": {
    ".": "./tsconfig.json"
  }
}
```

完成以上步骤后，需要在 apps/vite-react工作区中安装 @mono/config-ts

```
{
  "name": "vite-react",
	...
  "devDependencies": {
    "@mono/config-ts": "workspace:*"
  }
}
```

然后可能需要重启一下 ts 服务器，才会有代码提示。接下来通过在apps/vite-react的 ts 配置中引入并继承公共的配置就好了：
```
{
  "extends": "@mono/config-ts",
  "include": [
    "src"
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": [
        "src/*"
      ]
    },
  }
}
```

> 里程碑：已经完成了复用 ts 配置的操作啦。

上面还配置了路径别名，根据自己习惯的配置即可，记得在 `vite.config.ts` 中配置路径别名，还需要安装node 的类型文件：

```
pnpm i -wD @types/node
```

```ts
// `vite.config.ts`
import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
})

```

## 配置 @mono/ui (shadcn)

![monorepo-ui](https://raw.githubusercontent.com/TransonQ/image-share/main/img/202404202003607.png)

还记得前面配置的 `@mono/ui` 吗？现在准备开始配置项目应该如何巧妙的复用 shadcn 组件，由于 shadcn 具有极高的灵活性，同时它又是通过拷贝组件的到本地仓库的模式进行开发，如果 monorepo 多个项目每一个项目都去维护各自的 UI 组件，工作量会大大提高。所以这里主要分享一下如何在 monorepo 中复用组件。

经过前面的配置，monorepo项目目录大概如下：

```
.
├───📁 apps/
│   └───📁 vite-react/
│       └───...
├───📁 packages/
│   ├───📁 config-tailwind/
│   │   └───📄 package.json
│   ├───📁 config-ts/
│   │   ├───📄 package.json
│   │   ├───📄 tsconfig.json
│   │   └───📄 tsconfig.node.json
│   ├───📁 ui/
│   │   └───📄 package.json
│   └───📁 utils/
│       └───📄 package.json
├───📄 .gitignore
├───📄 .npmrc
├───📄 package.json
├───📄 pnpm-lock.yaml
└───📄 pnpm-workspace.yaml

```

找到 `@mono/ui`也就是 `/packages/ui` ，现在将会在这里通过 [shadcn/ui 的官方教程](https://ui.shadcn.com/docs/installation/vite)，开始初始化组件的存放位置。

> 注意：这里我们不需要初始化为 vite 项目，其实只需要一个 ts 配置就好了。

首先需要在@mono/ui中安装共享 ts 配置的公共库：@mono/config-ts

```
cd /packages/ui

pnpm i @mono/config-ts @mono/utils

------
{
  "name": "@mono/ui",
  "version": "1.0.0",
  "description": "",
  "scripts": {},
  "keywords": [],
  "dependencies": {
    "@mono/config-ts": "workspace:*",
    "@mono/utils": "workspace:*"
  }
}
------
```

创建一个 tsconfig.json 文件

```json
{
  "extends": "@mono/config-ts",
  "include": [
    "src"
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
  }
}
```

紧接着开始下一步，开始初始化 shadcn 配置项

```
pnpm install -wD tailwindcss postcss autoprefixer
 
pnpx tailwindcss init -p

pnpx shadcn-ui@latest init
```



```
✔ Would you like to use TypeScript (recommended)? … no / yes
✔ Which style would you like to use? › Default
✔ Which color would you like to use as base color? › Slate
✔ Where is your global CSS file? … src/gloabal.css
✔ Would you like to use CSS variables for colors? … no / yes
✔ Are you using a custom tailwind prefix eg. tw-? (Leave blank if not) … 
✔ Where is your tailwind.config.js located? … tailwind.config.js
✔ Configure the import alias for components: … src
✔ Configure the import alias for utils: … @mono/utils
✔ Are you using React Server Components? … no / yes
✔ Write configuration to components.json. Proceed? … yes

```

> 注意：上面有一些不同，分别是：
>
> 1. Configure the import alias for components:  src
>    - 由于@mono/ui，仅作为存放 shadcn 组件库的工作区，所以直接放在 src 下足够了，避免文件夹层级过深。
>
> 2. Configure the import alias for utils:  @mono/utils
>    - 是的，@mono/utils 用于存放整个项目的公共函数工具。
> 3. 如果你打开项目会发现 shadcn 默认安装了一些必要的依赖，考虑到多个项目使用相同版本，将他们移动到顶层工作区的 package.json中去。



## 配置 @mono/utils

![monorepo-utils](https://raw.githubusercontent.com/TransonQ/image-share/main/img/202404202003313.png)

```
├───📁 src/
│   ├───📄 cn.ts
│   └───📄 index.ts
├───📄 package.json
└───📄 tsconfig.json
```

`cn.ts`是 UI 必要的函数

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

`index.ts`所有工具函数导出的入口，未来需要使用到的函数都可以在此处导出。

```ts
export { cn } from "./cn";
```

`packages.json`

```json
{
  "name": "@mono/utils",
  "version": "1.0.0",
  "description": "shared utils",
  "scripts": {},
  "devDependencies": {
    "@mono/config-ts": "workspace:^"
  },
  "exports": {
    ".": "./src/index.ts"
  }
}
```

> 里程碑：这样配置，既满足了公共函数的存放位置，有解答了上面关于：“Configure the import alias for utils:  @mono/utils” 的问题。

现在来试试组件安装效果：

```
cd /packages/ui

pnpx shadcn-ui@latest add button
```

![image-20240419204201124](https://raw.githubusercontent.com/TransonQ/image-share/main/img/202404192042176.png)

可以看到，安装组件验证了上面把工具函数都放在@mono/utils中的做法是正确的。

接下来配置package.json，添加：exports相关的配置，以便我们在业务 app 中更直观的引入。

```json
{
  "name": "@mono/ui",
  "version": "1.0.0",
  "description": "",
  "scripts": {},
  "keywords": [],
  "dependencies": {
    "@mono/config-ts": "workspace:*",
    "@mono/utils": "workspace:*",
    "@radix-ui/react-slot": "1.0.2"
  },
  "exports": {
    "./*": "./src/ui/*.tsx"
  }
}
```

现在需要回到我们的第一个 vite-react 项目，看看上面引入的 button 组件是否有效。

```
pnpm -F vite-react i @mono/ui
```

```tsx
import { Button } from "@mono/ui/button"

function App() {
  return (
    <>
      <Button>click</Button>
    </>
  )
}

export default App
```

```
pnpm -F vite-react run dev
```

![image-20240419204908546](https://raw.githubusercontent.com/TransonQ/image-share/main/img/202404192049610.png)

> 是的，成功引入了共享组件库@mono/ui中的 button 组件，没有样式效果。请继续阅读下一个章节：关于共享tailwind的配置，@mono/config-tailwind。

## 配置 @mono/config-tailwind

![monorepo-tailwind](https://raw.githubusercontent.com/TransonQ/image-share/main/img/202404202003005.png)

现在我们需要引入 tailwind 相关的配置

```
cd apps/vite-react

pnpx tailwindcss init -p

pnpm i @mono/config-tailwind
```

同样，这里需要对 tailwind.config.ts 做一点小改动，所有项目的默认配置都是通过继承 @mono/config-tailwind 来的。

```
# config-tailwind
├───📄 global.css
├───📄 package.json
└───📄 tailwind.config.js
```

`/packages/config-tailwind/tailwind.config.ts` 配置如下：

```ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}', // ++
    '../../packages/lib/src/**/*.{ts,tsx}' // ++
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

`global.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;

    --radius: 0.5rem;

    --sb-track-color: hsl(var(--muted));
    --sb-thumb-color: hsl(var(--muted-foreground));
    --sb-size: 6px;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;

    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;

    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;

    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;

    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;

    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;

    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 85.7% 97.3%;

    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;

    --sb-track-color: hsl(var(--muted));
    --sb-thumb-color: hsl(var(--muted-foreground));
    --sb-size: 6px;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

body::-webkit-scrollbar {
  width: var(--sb-size);
}

body::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 3px;
}

body::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 3px;
}

@supports not selector(::-webkit-scrollbar) {
  body {
    scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
  }
}

```

`package.json`

```json
{
  "name": "@mono/config-tailwind",
  "version": "1.0.0",
  "description": "",
  "scripts": {},
  "keywords": [],
  "exports": {
    ".": "./tailwind.config.ts",
    "./global.css": "./global.css"
  }
}

```



在需要 tailwind 解析的项目中的 tailwind.config.ts 可以直接引入并导出公共配置：

`apps/vite-react/tailwind.config.ts`

`packages/ui/tailwind.config.ts`

```
export * from "@mono/config-tailwind";
```

> 同时需要将 vite-react 项目中的 main.tsx里面的 `import 'global.css'`->`import "@mono/config-tailwind/global.css"`



## 配置 ui-add 指令

![image-20240419232127393](https://raw.githubusercontent.com/TransonQ/image-share/main/img/202404192321443.png)

![image-20240419232147741](https://raw.githubusercontent.com/TransonQ/image-share/main/img/202404192321858.png)

现在测试一下命令是否生效：

```
pnpm run ui-add card
```

在 vite-react 项目中 引入案例：

```tsx
import { Button } from "@mono/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@mono/ui/card"

function App() {
  return (
    <>
      <Button>click</Button>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  )
}

export default App
```

![image-20240419232626210](https://raw.githubusercontent.com/TransonQ/image-share/main/img/202404192326293.png)

## 配置@mono/hooks

![monorepo-hooks](https://raw.githubusercontent.com/TransonQ/image-share/main/img/202404202004923.png)

用类似的方式可以尝试配置一个公共hooks 库：

```
├───📁 src/
│   ├───📄 index.ts
│   └───📄 useTest.ts
├───📄 package.json
└───📄 tsconfig.json
```

```json
// package.json
{
  "name": "@mono/hooks",
  "version": "1.0.0",
  "private": true,
  "description": "",
  "scripts": {},
  "exports": {
    ".": "./src/index.ts"
  },
  "devDependencies": {
    "@mono/config-ts": "workspace:*"
  }
}
```

## TL;DR

Repository address: https://github.com/TransonQ/growth-apps





