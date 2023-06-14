---
sidebar_position: 1
title: 创建自己的cli (Commonjs版本)
---

## 步骤

### 先预览简单效果

1. `package.json`添加

   ```json
     "bin": {
       "qsc": "./bin/cli.js"
     },
   ```

2. 调试查看效果
   在当前项目目录:

   ```bash
   npm link

   qsc # 会执行./bin/cli.js
   ```

### 创建启动命令

1. 安装工具库
   ```bash
   npm install commander --save
   ```
2. 创建命令
   `/bin/cli.js `

   ```js
   #! /usr/bin/env node

   const program = require('commander')

   program
     // 定义命令和参数
     .command('create <app-name>')
     .description('create a new project')
     // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
     .option('-f, --force', 'overwrite target directory if it exist')
     .action((name, options) => {
       // 打印执行结果
       console.log('name:', name, 'options:', options)
     })

   program
     // 配置版本号信息
     .version(`v${require('../package.json').version}`)
     .usage('<command> [option]')

   // 解析用户执行命令传入参数
   program.parse(process.argv)
   ```

3. 校验命令是否成功

   ```bash
   # 1. 命令行输入
   qsc

   # 效果大概是这个样子:
   Usage: qsc <command> [option]

    Options:
    -V, --version output the version number
    -h, --help display help for command

    Commands:
    create [options] <app-name> create a new project
    help [command] display help for command

    # 2. 执行 qsc create
    qsc create

    # 出现下列提示:
    error: missing required argument 'app-name'

    # 3. 执行 qsc create test01
    qsc create test01

    # 出现下列提示:
    name: test01 options: {}

    # 4. 执行 qsc create test01 -f
    qsc create test01 -f

    # 出现下列提示:
    name: test01 options: { force: true }

   ```

   获取命令行指令成功

### 执行命令

1. 创建`lib/create.js`

   ```js
   module.exports = async function (name, options) {
     // 验证是否正常取到值
     console.log('>>> create.js', name, options)
   }
   ```

   `bin/cli.js`

   ```js
    .action((name, options) => {
    // // 打印执行结果
    // console.log('name:', name, 'options:', options)

    // 在 create.js 中执行创建任务
    require('../lib/create.js')(name, options)
   })
   ```

2. 验证是否执行成功

   ```bash
   qsc create test001
   # 出现下列提示:
   >>> create.js test001 {}
   ```

### 检验准备创建的文件是否已存在

```bash
npm install fs-extra --save
```

`lib/create.js`

```js
const path = require('path')
const fs = require('fs-extra')

module.exports = async function (name, options) {
  // 执行创建命令

  // 当前命令行选择的目录
  const cwd = process.cwd()
  // 需要创建的目录地址
  const targetAir = path.join(cwd, name)

  // 目录是否已经存在？
  if (fs.existsSync(targetAir)) {
    // 是否为强制创建？
    if (options.force) {
      await fs.remove(targetAir)
    } else {
      // TODO：询问用户是否确定要覆盖
    }
  }
}
```

### 帮助信息

```bash
npm install chalk@4
# chalk@5+ 是纯 ESM
```

`bin/cli.js`

```js
program
  // 监听 --help 执行
  .on('--help', () => {
    // 新增说明信息
    console.log(
      `\r\nRun ${chalk.cyan(
        `zr <command> --help`
      )} for detailed usage of given command\r\n`
    )
  })
```

### 制作帮助信息里面的 logo

```bash
npm install figlet
```

`bin/cli.js`

```js
program.on('--help', () => {
  // 使用 figlet 绘制 Logo
  console.log(
    '\r\n' +
      figlet.textSync('qsc', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true,
      })
  )
  // 新增说明信息
  console.log(`\r\nRun ${chalk.cyan(`roc <command> --help`)} show details\r\n`)
})
```

### 询问用户创建信息

```bash
npm install --save inquirer@^8.0.0
```

询问用户是否进行 Overwrite
`lib/create.js`

```js
const path = require('path')

// fs-extra 是对 fs 模块的扩展，支持 promise 语法
const fs = require('fs-extra')
const inquirer = require('inquirer')

module.exports = async function (name, options) {
  // 执行创建命令

  // 当前命令行选择的目录
  const cwd = process.cwd()
  // 需要创建的目录地址
  const targetAir = path.join(cwd, name)

  // 目录是否已经存在？
  if (fs.existsSync(targetAir)) {
    // 是否为强制创建？
    if (options.force) {
      await fs.remove(targetAir)
    } else {
      // 询问用户是否确定要覆盖
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite',
            },
            {
              name: 'Cancel',
              value: false,
            },
          ],
        },
      ])

      if (!action) {
        return
      } else if (action === 'overwrite') {
        // 移除已存在的目录
        console.log(`\r\nRemoving...`)
        await fs.remove(targetAir)
      }
    }
  }
  // 创建项目
  // 封装两个函数: getRepo, createDir
  // let usersChoice = await getRepo()
  // createDir(name, usersChoice.repo)
}
```

- 在当前目录创建一个目录`test001`
- 执行一下 `qsc create test001` -> test001 被删除

### 选择模板

```js title="lib/getRepo.js"
const inquirer = require('inquirer')

module.exports = function getRepo() {
  return new Promise(async (resolve, reject) => {
    inquirer
      .prompt({
        type: 'list',
        name: 'repo',
        message: '请选择将要拉取的模板: ',
        choices: [
          'react-template',
          'react-vite-template',
          'shopify-polaris-admin',
          'vite-react-tailwindcss',
        ], // git上项目模板
        default: 0,
      })
      .then((answers) => {
        resolve(answers)
      })
      .catch((err) => {
        reject({})
      })
  })
}
```

### 从仓库获取

```js title="lib/createDir.js"
const download = require('download-git-repo')
const chalk = require('chalk')
const util = require('util')

const dowloadRepo = util.promisify(download)

module.exports = async function createDir(dir, repo) {
  let url = `direct:https://github.com/quanscheng/${repo}.git`

  await dowloadRepo(url, dir, { clone: true }, function (err) {
    console.log(err ? err : chalk.bgGreenBright('\n\r初始化模板成功!\n\r'))
  })
}
```

### 仓库地址

[Github: quanscheng/qsc-cli](https://github.com/quanscheng/qsc-cli)

### 参考

- [《从 0 构建自己的脚手架/CLI 知识体系》 稀土掘金-IT 老班长](https://juejin.cn/post/6966119324478079007)
- [从 0 到 1 发布一个创建模板项目脚手架](https://shicc.vip/column/38)
