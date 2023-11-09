#!/usr/bin/env zx

const formatCurrentTime = () => {
  const date = new Date()
  const formattedDateTime = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date
    .getHours()
    .toString()
    .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date
    .getSeconds()
    .toString()
    .padStart(2, '0')}`
  return formattedDateTime
}

const time = ` 存档时间: ${formatCurrentTime()}`
// 查看当前分支名
let process = await spinner(
  'checking current branch',
  () => $`git branch --show-current`
)
const branch = process.stdout.trim()

// 提交
if (branch !== 'master') {
  console.log(chalk.red('Switch to the master branch \n'))
} else {
  let msg = await question(chalk.cyan('Enter the commit message: '))

  await spinner('adding...', () => $`git add .`)

  await spinner('committing...', () => $`git commit -m ${msg + time}`)

  await spinner('pushing...', () => $`git push`)

  console.log(`
  ███████╗██╗   ██╗ ██████╗ ██████╗███████╗███████╗███████╗
  ██╔════╝██║   ██║██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝
  ███████╗██║   ██║██║     ██║     █████╗  ███████╗███████╗
  ╚════██║██║   ██║██║     ██║     ██╔══╝  ╚════██║╚════██║
  ███████║╚██████╔╝╚██████╗╚██████╗███████╗███████║███████║
  ╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝╚══════╝╚══════╝╚══════╝
  ---
  commit message: ${msg + time}
  `)
}
