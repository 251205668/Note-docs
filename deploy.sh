#!/bin/bash

# 终止一个错误
# set -e

# 构建
npm run docs:build

# 进入生成的构建文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@47.97.180.232:/home/git/repos/blog.git master 
