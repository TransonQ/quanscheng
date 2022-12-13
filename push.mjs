#!/usr/bin/env zx

let msg = await question(chalk.cyan('commit and push -message: 👇 \n'))

await $`git add .`

await $`git commit -m ${msg}`

await $`git push`
