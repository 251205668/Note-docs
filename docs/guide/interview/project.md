# 项目总结

## 书城小程序(mpvue)

**这个项目涉及的技术栈:** 

mpvue、原生小程序、 vue全家桶、epubjs、flyio

**项目的过程中是否有遇到过一些困难，最终是如何解决的:**

1. 解决小程序请求问题,利用`flyio`封装请求库

```js
function createFly (){
  if(mpvuePlatForm === 'wx'){
    const Fly = require('flyio/dist/npm/wx')
    return new Fly()
  }else{
    return null
  }
}
// 封装get请求
export function get(url,param = {}){
  const fly = createFly()
  if(fly){
    return new Promise((resolve,reject)=>{
      fly.get(url,params).then((response)=>{
        if(response && response.data){
          resolve(response)
        }else{
          const msg = '请求失败'
          mpvue.showToast({
            title:msg,
            duration:2000
          })
          reject(response)
        }
      }).catch(err=>{
        console.log(err)
      })
    })
  }
}
```
2. 解析书籍目录,解构递归解析

因为拿到的解析过后的目录是一个树状结构的数据结构数组,很难进行操作,所以需要将他转换一维数组
![20200710154046.png](https://raw.githubusercontent.com/imageList/imglist/master/20200710154046.png)

```js
function flatten(array){
  // 多级目录递归吧元素放到一个数组,最后打散放到一个大数组
  return [].concat(...array.map(item=>[].concat(item,...flatten(item.subitems))))
}
```

3. 解决小程序中无法使用`epubjs`解析库

先使用vue搭建阅读器项目,然后只需要传入书名跳转到每本书的阅读器界面,之后利用`web-view`将阅读器引入小程序，完成功能搭建。


**项目自己是否做过一些优化，包括代码、开发效率、性能、体验:**

`nginx`搭建资源服务器

**项目当中存在的一些问题，可能的解决思路:**

`mpvue`打包之后的项目较原生比较卡顿

解决思路: 按需加载`ui`库文件

**项目最终达成的成果:**

一套完整体系的书城小程序搭配音乐播放功能


**项目带给你的成长是什么:**

学习了使用`mpvue`类Vue语法形式开发微信小程序,并且熟悉了`Vuex`使用流程,巩固了ES6语法和吸取了构建大型项目的经验。提升了自己解决问题bug的方式。


## 学生综合管理系统

**这个项目涉及的技术栈:**

前端: Vue全家桶、`Vue-element-admin`、 `element-ui`、`echarts`、`websocket`

后端: Springboot、jpa、jackson、lombok

**项目的过程中是否有遇到过一些困难，最终是如何解决的:**

改造`Vue-element-admin`的登录和权限管理系统

搭建实时聊天系统


**项目自己是否做过一些优化，包括代码、开发效率、性能、体验:**

打包优化

**项目当中存在的一些问题，可能的解决思路:**

管理员权限下所有路由都能看见,但是有些路由并不需要


**项目最终达成的成果:**

[体验地址](http://student-admin.yangxiansheng.top/)

**项目带给你的成长是什么:**

- 学会如何开发中后台简单的接口
- 积累了开发中后台前端页面的经验
- 学习了`vue`中使用`echarts`
- 学习了使用`websocket`搭建实时聊天系统
- 学习了统一拦截请求的封装

## 电商小程序(原生)

**这个项目涉及的技术栈:**

原生小程序、lin-ui组件库


**项目的过程中是否有遇到过一些困难，最终是如何解决的:**

`sku`面板开发

通用购物车开发

无感知刷新处理

**项目自己是否做过一些优化，包括代码、开发效率、性能、体验:**

封装前端异常处理

**项目当中存在的一些问题，可能的解决思路:**

切换优惠券或者订单`tab`会有闪屏问题。

**项目最终达成的成果:**

搭建了一个从商品列表首页到购物车到专题到订单优惠券一系列的电商系统小程序。

**项目带给你的成长是什么:**

- 学习使用模块化思想完成业务逻辑
- 学习如何搭建复杂的`sku`面板全过程
- 学习搭建通用搜索模块和通用购物车模块
- 学习无感知刷新令牌封装和通用处理微信授权业务
- 巩固了微信小程序的组件的使用和`lin-ui`组件库的使用技巧
- 学习下单到结算到使用优惠券全过程

