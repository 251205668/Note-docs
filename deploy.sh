#!/bin/bash

# 终止一个错误
# set -e

# 构建
npm run docs:build

# 进入生成的构建文件夹
cd public

git init
git add -A
git commit -m 'deploy'

git push -f https://gitee.com/wohenpi0918/public.git master 
