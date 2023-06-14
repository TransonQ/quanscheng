---
title: prettier 格式化指定范围文件 
authors: [qsc]
tags: [prettier]
---

## 格式化src中所有 js, jsx 文件

要在项目中使用 Prettier 格式化指定范围内的文件，可以使用以下步骤：

1. 在项目中安装 Prettier。可以使用 npm 或者 yarn 进行安装。例如，使用 npm 安装：

```
npm install --save-dev prettier
```

2. 在项目的根目录下创建一个 `.prettierrc` 文件，用来配置 Prettier 的格式化规则。可以参考 Prettier 的文档来配置规则。

3. 在项目中安装一个可以格式化指定范围内文件的工具，例如 `prettier-eslint-cli` 或者 `prettier-standard-cli`。安装命令如下：

```
npm install --save-dev prettier-eslint-cli
```

或者

```
npm install --save-dev prettier-standard-cli
```

4. 在项目的 package.json 文件中添加一个脚本命令，用来格式化指定范围内的文件。例如，添加以下脚本：

``` json
"scripts": {
  "format": "prettier-eslint --write \"src/**/*.{js,jsx}\""
}
```

这个脚本会格式化所有在 `src` 目录下的 `.js` 和 `.jsx` 文件。

5. 运行脚本命令来格式化指定范围内的文件。例如，在命令行中运行以下命令：

```
npm run format
```

这个命令会执行 `prettier-eslint` 工具来格式化指定范围内的文件，并将格式化后的内容写回到原文件中。

> 注意：在使用 `prettier-eslint-cli` 或者 `prettier-standard-cli` 工具时，需要根据自己的项目配置来选择合适的工具。如果项目中使用了 ESLint 或者 StandardJS 等代码规范工具，那么可以选择 `prettier-eslint-cli` 或者 `prettier-standard-cli` 工具来保证代码格式化的一致性。

## 忽略指定路径文件

如果你想要在 `format` 脚本中排除 `src/api` 文件夹里面的所有文件，你可以使用 `!` 符号来排除指定的文件或目录。具体来说，你可以将脚本修改为以下形式：

```json
"format": "prettier-eslint --write \"src/**/*.{js,jsx}\" --ignore-path .prettierignore"
```

然后，在项目的根目录下创建一个 `.prettierignore` 文件，并将需要排除的文件或目录添加到这个文件中。例如，以下内容会排除 `src/api` 文件夹下的所有文件：

```
src/api/**
```

这样，当你运行 `npm run format` 命令时，`prettier-eslint` 将会自动忽略 `src/api` 文件夹下的所有文件，并格式化其它指定范围内的文件。

> 注意，如果你在项目中同时使用了 ESLint 和 Prettier，那么你可能需要在项目中配置 ESLint 的 Prettier 插件，并在 `.prettierignore` 文件中包含 ESLint 忽略的文件或目录。具体配置方法可以参考 ESLint 和 Prettier 的文档。如果你想要在 `format` 脚本中排除 `src/api` 文件夹里面的所有文件，你可以使用 `!` 符号来排除指定的文件或目录。具体来说，你可以将脚本修改为以下形式：

如果你想要添加更多的排除规则，可以在 `.prettierignore` 文件中添加更多的内容。例如，以下内容会同时排除 `src/api` 和 `src/test` 文件夹下的所有文件：

```
src/api/**
src/test
```