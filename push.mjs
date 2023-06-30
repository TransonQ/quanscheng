#!/usr/bin/env zx
// 时间
const d = new Date()
const year = d.getFullYear()
const month = d.getMonth() + 1
const day = d.getDate()
const hour = d.getHours()
const min = d.getMinutes()
const sec = d.getSeconds()
function fmt(num) {
  if (num === 0) return '00'
  if (num < 10) return '0' + num
  return num
}

const time = ` 存档时间: ${year}-${fmt(month)}-${fmt(day)} ${fmt(hour)}:${fmt(min)}:${fmt(sec)}`
// 查看当前分支名
let process = await spinner('checking current branch', () => $`git branch --show-current`)
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
  ╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝╚══════╝╚══════╝╚══════╝`)
}
