---
title: 升级doc龙v2->v3
authors: [qsc]
tags: [docusaurus]
---

## 步骤

>  [官方升级指南](https://docusaurus.io/docs/migration/v3)

### package.json

```json
 {
   "dependencies": {
     // upgrade to Docusaurus v3
-    "@docusaurus/core": "2.4.3",
-    "@docusaurus/preset-classic": "2.4.3",
+    "@docusaurus/core": "3.0.0",
+    "@docusaurus/preset-classic": "3.0.0",
     // upgrade to MDX v2
-    "@mdx-js/react": "^1.6.22",
+    "@mdx-js/react": "^3.0.0",
     // upgrade to prism-react-renderer v2.0+
-    "prism-react-renderer": "^1.3.5",
+    "prism-react-renderer": "^2.1.0",
     // upgrade to React v18.0+
-    "react": "^17.0.2",
-    "react-dom": "^17.0.2"
+    "react": "^18.2.0",
+    "react-dom": "^18.2.0"
   },
   "devDependencies": {
     // upgrade Docusaurus dev dependencies to v3
-    "@docusaurus/module-type-aliases": "2.4.3"
-    "@docusaurus/types": "2.4.3"
+    "@docusaurus/module-type-aliases": "3.0.0"
+    "@docusaurus/types": "3.0.0"
   }
   "engines": {
     // require Node.js 18.0+
-    "node": ">=16.14"
+    "node": ">=18.0"
   }
 }
```

### ts项目

```json
 {
   ...
   "devDependencies": {
     // swap the external TypeScript config package for the new official one
-    "@tsconfig/docusaurus": "^1.0.7",
+    "@docusaurus/tsconfig": "3.0.0",
     // upgrade React types to v18.0+
-    "@types/react": "^17.0.69",
+    "@types/react": "^18.2.29",
     // upgrade TypeScript to v5.0+
-    "typescript": "~4.7.4"
+    "typescript": "~5.2.2"
   }
 }
```

### 检查是否存在 v3无法编译的文件

```js
npx docusaurus-mdx-checker
```

### Prism-React-Renderer 配置

```js
- const lightTheme = require('prism-react-renderer/themes/github');
- const darkTheme = require('prism-react-renderer/themes/dracula');
+ const {themes} = require('prism-react-renderer');
+ const lightTheme = themes.github;
+ const darkTheme = themes.dracula;
```

>  个人补上了 mermaid 支持, 案例: 
>
> ```mermaid
> graph TD;
>     A-->B;
>     A-->C;
>     B-->D;
>     C-->D;
> ```
>
> 

