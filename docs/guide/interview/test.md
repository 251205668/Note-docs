## GIT常见命令大全

### [git命令大全](https://image.yangxiansheng.top/img/git命令大全.jpg?imagelist)

![](https://image.yangxiansheng.top/img/git命令大全.jpg?imagelist)
### [linux命令大全](https://image.yangxiansheng.top/img/linux命令.jfif?imagelist)

![](https://image.yangxiansheng.top/img/linux命令.jfif?imagelist)

## git初始化配置
1. 设置git仓库的用户名，email

```bash
git config  -- global user.name 'yourname'
git config  -- global user.email 'youremail'
```
还可以配置本地的用户名，email ，**本地的用户名密码权重比全局要高**，当初始化完成，本项目的用户名邮箱会做本更

```bash
git config --local user.name ''
git config --local user.email ''
```

查看当前用户的配置信息

```bash
git config --list --local or --lobal
```
打印结果:

![](https://image.yangxiansheng.top/img/git1.png?imagelist)
2. 初始化一个git仓库的命令

```bash
cd project
git init

or 

git init myproject
```

3. 配置免密ssh

:::tip

配置公私钥，如果已经配置过ssh key需要备份
:::
```bash
cd ~/.ssh
mkdir key_backup
cp id_rs a*key_backup
```
:::

**生成sshkey**
```bash
$ ssh-keygen -t rsa C "251205668@qq.com"  需要输入密码 生成的公钥私钥会放在.ssh文件下

公钥.pub文件粘贴进github网站key
```
连接github 

```
$ ssh git@github.com   --连接成功后显示
```
![](https://image.yangxiansheng.top/img/QQ截图20200228140352.png?imagelist)
4. .git文件目录

```bash
---HEAD   告诉我们git当前所处分支
---config 记录user信息
---refs   记录分支信息和标签信息

```
## git常见提交命令
- 首次提交

```bash
git init 
git add .
git commit -a -m 'deploy'
git remote add origin 'responity path'
git pull
git push -u origin master
```

- 最简单的提交方式

```bash
git pull
git add . (. -u -A 都是处理全部的变更 +filename是对单文件或多文件的变更处理)
git commit -m 'deploy' (此处不能出现变更文件名)
git push origin master 当前分支推送远程仓库master
```
- 更换分支常规的提交

```bash
远程仓库新建分支

git pull
git checkout test
git add -A
git commit -m 'deploy'
git checkout master 
git merge origin/test
git push -u origin master -u第一次推送，后面省去

推送分支进远程分支不是主分支的话 要合并起来 不然会警告

```

## git比较常用的命令
> 文件操作

```bash
git mv file1 flie2 --重命名文件file1，git自动add

git rm fileName    --删除文件,自动add进暂存

```

> git状态显示

```bash
git status  查看当前分支信息和变更情况
git log     查看当前分支的版本commit情况
git log -1  查看第一条commit的情况
git reflog  显示当前分支的最近几次提交
git show <commit>:<filename>  显示某次提交时，某个文件的内容
git show <commit>  显示某次提交的元数据和内容变化
git show --name-only <commit>  显示某次提交发生变化的文件

```

> 分支操作

```bash
git branch -av 列出所有分支有具体commit信息
git branch -r 列出远程分支名
git branch branchname  基于当前分支创建分支

重命名本地分支
git branch -m <old-name> <new-name>

删除分支
git branch -d <name> # 删除分支
git branch -D <name> # 强制删除分支
删除远程分支(先在本地删除该分支)，原理是把一个空分支push到server上，相当于删除该分支。
git push origin :<name>


git checkout branchName  切换到该分支
git checkout -b branchName master 基于master分支创建分支，并切换到该分支

git checkout head filename 撤销工作区的修改
git checkout head 撤销所有文件的修改

撤销某个文件提交

git reset HEAD --fileName 撤销暂存区内容 撤销暂存区内容
然后再 git commit

git reset --hard HEAD 将工作区和暂存区恢复成头指针状态 全部撤销
git reset --hard head^^ 复位到head之前的版本
git reset head~1 撤销一条记录 编辑commit编辑
git push

回滚代码
git log 查看提交历史
git resset --hard log里面的哈希值 -回滚代码
git reflog 查看本地所有的操作历史

git reset --hard head^ 回滚到上一次提交


暂时存放修改的文件
git stash  存放到堆栈，使用场景:功能未开发完,不提交

git stash apply  取出修改的内容


git branch -d branchName 删除合并过的分支,未合并不能删除
git branch -D branchName 不管合并 直接删除分支

git diff HEAD HEAD^ 对比当前commit和父级commit区别
git diff 比较工作区和暂存区差异
git diff --fileName 文件工作区和暂存区差异
git diff branch1 branch2 比较分支差异
git diff branch1 branch2 --flieName 比较文件


git commit -amend 对最近提交的coomit的message变更
git commit -a -m 'message'  添加所有修改文件到暂存区，并提交版本库(不包括新增文件)

git stash 将工作区暂存进堆栈
git statsh apply 暂存空间取出来 并不删除堆栈记录
git stash pop 删除堆栈记录


git push -u origin master 第一次推送
git push -f origin master
git push -all origin master
git push  '仓库地址' master

```

> .gitignore常见用法

```bash
.DS_Store  .DS_Store结尾文件或目录忽略管理

node_modules/

dist/       dist文件夹下面的文件忽略关理,但是文件夹会管理

* .idea     所有结尾是.idea文件忽略管理
.vscode

```

## 多人协作

git flow 工作流

```bash
git branch 查看本地分支

在公司无权限推送master分支
git checkout -b dev master -master 分支创建分支

git status 查看文件记录

一位成员修改一份文件,然后推送,另一位同学同时修改这份文件,提交会被拒绝

git pull origin dev 拉取远程的dev分支,但是此时会有冲突，因为双方都修改了文件

解决冲突
推送
git push origin dev

选择性拉取远程分支内容(常用场景,不想合并全部分支)

git fetch origin dev
git merge FETCH-HEAD 上面拉取的后面的变量

git push origin feature:feature 前面是本地分支 后面是远程的分支,自定义命名

git fetch
拉取远程分支 然后把内容输入到dev分支
git fetch origin feature:dev


```

两种工作流
预定三个分支:

```bash
dev    预发布分支
fetaure 开发分支
master  发布分支


首先切换到dev分支

git checkout dev

合并开发

git merge feature

发布

git checkout master
git merge dev

打上版本标签推送

git tag v1.0.0

git push origin master --tags

删除tag
git tag -d v1.0.0

列出tag
git tag --list


删除远程分支或者tag
git push origin :refs/tags/v1.0.0

git push origin :远程分支

删除本地分支
git branch -D 分支

```
