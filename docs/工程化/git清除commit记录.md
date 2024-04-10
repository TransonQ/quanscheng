# Git 清除历史 commit[危]



如果想要删除 Git 远程仓库中的所有历史 commit，只保留现在的最新 commit，可以按照以下步骤进行操作：

1. 首先，使用以下命令来创建一个新的分支，并将当前最新的 commit 放在这个新分支上：

```shell
git checkout --orphan new_branch
```

这个命令会创建一个新的分支 `new_branch`，并将当前最新的 commit 放在这个分支上。

2. 接下来，使用以下命令来提交这个新的分支：

```shell
git commit -m "Initial commit"
```

这个命令会提交一个新的空的 commit 到 `new_branch` 分支上。

3. 然后，使用以下命令来删除原来的分支，并将 `new_branch` 分支重命名为原来的分支名：

```shell
git branch -D master  # 删除原来的分支
git branch -m new_branch master  # 将 new_branch 重命名为 master
```

这个命令会删除原来的 `master` 分支，并将 `new_branch` 重命名为 `master`。

4. 最后，使用以下命令将这些更改推送到远程仓库：

```shell
git push -f origin master
```

这个命令会强制推送这些更改到远程仓库，从而删除所有历史 commit，只保留现在的最新 commit。

请注意，这个操作会清除远程仓库中的所有历史记录，并可能导致其他开发人员的代码丢失。在执行此操作之前，请确保与团队成员进行充分的沟通，并备份好代码。