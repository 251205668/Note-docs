# 简介
`Magic-Shop`是学习过七月大佬全栈课时所做的项目,是一个可以让商家直接接入的大型电商小程序,包含`spu`,`sku`,`主题`,`优惠券系统`等汇聚一体的电商,并且佩戴专业的测试或者`cto`可直接操作的**cms**后台管理系统。

## 相关截屏

<div style="display:flex;">
<p style="margin-right:20px">
<img src="https://image.yangxiansheng.top/img/首页图.gif?imagelist" width="400px" />
</p>
<p>
<img src="https://image.yangxiansheng.top/img/专题图.gif?imagelist" width="400px" />
</p>
</div>
<div style="display:flex; margin-top:20px">
<p style="margin-right:20px">
<img src="https://image.yangxiansheng.top/img/详情图加sku选择面板.gif?imagelist" width="400px" />
</p>
<p>
<img src="https://image.yangxiansheng.top/img/购物车.gif?imagelist" width="400px" />
</p>
</div>
<div style="display:flex; margin-top:20px">
<p style="margin-right:20px">
<img src="https://image.yangxiansheng.top/img/分类.gif?imagelist" width="400px" />
</p>
<p>
<img src="https://image.yangxiansheng.top/img/搜索.gif?imagelist" width="400px" />
</p>
</div>
<div style="display:flex; margin-top:20px">
<p style="margin-right:20px">
<img src="https://image.yangxiansheng.top/img/查询优惠券状态.gif?imagelist" width="400px" />
</p>
<p>
<img src="https://image.yangxiansheng.top/img/查询订单.gif?imagelist" width="400px" />
</p>
</div>


## 功能汇总

:::tip
此处只陈列的功能特性可能不完整，体验完整功能请前往`C端`
:::

### C端
```
- 首页轮播入口
- 五个专题
- 活动
- 获取优惠券
- 优惠券定时归还
- 商品具有spu,sku
- 购物车与服务器同步
- 购物车核算
- 订单核算(核销消费券)
- 细节处理
- 支付逻辑
- 个人中心(订单 优惠券 消费记录等)
```
<br/>

### CMS

```
- banner管理
- 主题管理
- 主题子商品列表管理
- 商品管理
- sku管理
- C端用户管理
- 分类管理
- 子分类管理
- 六宫格管理
- 活动管理
- 优惠券管理
- 订单管理
```
<br/>

## 文档说明

此文档为总结项目开发坑和经验,为系列文章,我会不定期更新

主要分为六个板块:

::: tip

- `sku`处理
- 封装请求,无感知刷新`Token`
- 优惠券结算
- 购物车
- 订单结算
- 细节处理
:::

<br/>

**首先了解这些 vue 生态圈的东西，会对你上手本项目有很大的帮助。**

1. [Vue Router](https://router.vuejs.org/) 是 vue 官方的路由。它能快速的帮助你构建一个单页面或者多页面的项目。

2. [Vuex](https://vuex.vuejs.org/) 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。它能解决你很多全局状态或者组件之间通信的问题。

3. [Vue Loader](https://vue-loader.vuejs.org) 是为 vue 文件定制的一个 webpack 的 loader，它允许你以一种名为单文件组件 (SFCs)的格式撰写 Vue 组件。它能在开发过程中使用热重载来保持状态，为每个组件模拟出 scoped CSS 等等功能。不过大部分情况下你不需要对它直接进行配置，脚手架都帮你封装好了。

4. [Vue Test Utils](https://vue-test-utils.vuejs.org/) 是官方提供的一个单元测试工具。它能让你更方便的写单元测试。

5. [Vue Dev-Tools](https://github.com/vuejs/vue-devtools) Vue 在浏览器下的调试工具。写 vue 必备的一个浏览器插件，能大大的提高你调试的效率。

6. [Vue CLI](https://cli.vuejs.org/) 是官方提供的一个 vue 项目脚手架，本项目也是基于它进行构建的。它帮你封装了大量的 webpack、babel 等其它配置，让你能花更少的精力在搭建环境上，从而能更专注于页面代码的编写。不过所有的脚手架都是针对大部分情况的，所以一些特殊的需求还是需要自己进行配置。建议先阅读一遍它的文档，对一些配置有一些基本的了解。

7. [Vetur](https://github.com/vuejs/vetur) 是 VS Code 的插件. 如果你使用 VS Code 来写 vue 的话，这个插件是必不可少的。

