## vue 基础部分

`vue`基础知识点总结

### 初始化项目

安装 vue-cli 3.x,创建一个`vue`项目非常简单

```bash
# init
$ vue create xxx

# install dependence
npm i
# run
npm run serve

```
> vue-cli 2.x 创建使用`vue init webpack xxxx`

一般来说，移动端`webapp`需要提前做一部分初始化工作。
- 设置媒体标签缩放

```vue
 <meta name="viewport" content="width=device-width,initial-scale=1.0 minimum-scale=1.0 maximum-scale=1.0 user-scalable=no">
```
- 安装 `fast-click`解决点击bug,引入`reset.styl`,安装部分依赖

```json
"dependencies": {
    "axios": "^0.16.1",
    "better-scroll": "^0.1.15",
    "fastclick": "^1.0.6",
    "good-storage": "^1.0.1",
    "stylus": "^0.54.7",
    "stylus-loader": "^2.5.1",
    "vue": "^2.5.2",
    "vue-lazyload": "1.0.3",
    "vue-router": "^3.0.1",
    "vuex": "^2.3.1"
  }
```
然后再入口文件中使用

```js
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from './store/index'
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: require('./common/image/default.png')
})
fastclick.attach(document.body)
```

### 插槽使用
<h3>插槽的基础用法：</h3>
首先声明子组件可以使用插槽

```vue
<template>
<div class="child">
<h3>子组件</h3>
<slot></slot>
</div>
</template>
```
然后再父组件中引入组件注册后使用,`child`组件中可以插入任意内容

```vue
<template>
<div>
<child>
<span>插入内容</span>
</child>
</div>
</template>
```
这里我们使用的插槽是匿名的，下面使用具有名字的插槽

```vue
<template>
<div class="child">
<h3>子组件</h3>
<slot name="up"></slot>
<slot name="down"></slot>
</div>
</template>
```

然后我们在父组件中使用可以指定`插入内容部分`的`slot`名
比如:

```vue
<template>
<div>
<child>
<span slot="up">插入内容</span>
<div slot="down">插入下面的内容</div>
</child>
</div>
</template>
```
<h3>作用域插槽</h3>
作用于插槽要求，在`slot`上面绑定数据。

```vue
<slot name="up" :data="data">
```

### 动态绑定样式
- 原生js控制样式写法

```js
var test = document.getElementById('test').style.attributes = ..
...
test.setAttribute('height',value)
...
test.style.setProperty('height',value,'important')

```

- vue控制样式
`style` 一般通过拼接的方式，使用驼峰的方式命名属性

```vue
<view :style="{flex:'0 0' + (100/col) +'%'}"></view>

<!-- 三元表达式控制 -->
<view :style="{flexDirection: Mode === 'col'? 'row':'column'}">
```


`class`一般通过绑定样式名，动态样式也是通过三元表达式或者直接接表达式绑定

```vue
<view :class="{'current':currentIndex === index}"></view>

<view :class="{currentIndex === '2'? 'slected':'unselected'}">
```

::: tip
还可以通过`computed`进行动态计算绑定 
:::

### 动画

`fade-enter` 第一帧 后面被移除
`fade-leave` 第一帧 后面被移除
`fade-enter-active` 直到最后一帧
`fade-leave-active` 直到最后一帧

```stylus
&.drop-enter-active,&.drop-leave-active
    transition all 0.3s
&.drop-enter,&.drop-leave-active
    transform translate3d(0,-100%,0)
```

## vue-router

### 基本用法

我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 `User` 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 `vue-router` 的路由路径中使用“动态路径参数”(dynamic segment) 来达到这个效果：

```js
const User = {
  template: '<div>User</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```

这样就可以通过不同的 id 访问不同的路由页面
> 首页重定向`redirect`

```js
  {
      path: '/',
      redirect: '/recommend'
   }
```

### 嵌套分配

一般情况下,通过设置路由的子路由的参数来达到嵌套分配的效果
:::tip 推荐
通常动态路由采用这种方式
:::

1. 设置路由的子路由参数,一般情况下都是设置 path(参数),component(跳转的页面)

```js
export default new Router({
  routes: [
    {
      path: '/test',
      name: 'test',
      component: test,
      children: [
        {
          path: ':param',
          component: testTo
        }
      ]
    }
  ]
})
```

2. 设置完成之后，使用该路由

```js
<template>
  <listview></listview>
  <router-view></router-view>
</template>
```

3. 实现路由的跳转
   > 假设传的值是 item 的 id

```js
子组件
<dom @click="selectItem(item)"></dom>
export default{
  methods:{
    selectItem(item){
      this.$emit('select',item)
    }
  }

}
....
父组件
<componentName @select="handleselect"></componentName>
methods:{
  select(item){
    this.$router.push({
      path:`/test/${item.id}`
    })
  }

}
```
### 路由传参

- 首先跳转路由方:

```js
this.$router.push({
  path:'/singer',
  query:{
    message: 'hello'
      }
})
```
这样参数中就会有`?message="hello"`
或者写在路径中

```js
this.$router.push({
  path:'/user',
  params:{
    userId:'123'
  }
})
```
这样跳转的路由就是这样的`/user/123`

- 获取路由参数

非常类似于`restful`的写法
```js
this.$route.params.userId = userId
this.$route.params.query.message = message
```




综上就可以实现路由跳转到对应的页面,参数可以调,如果学习更多，请参考[vue-router](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96)

## vuex

### 使用方法
一个简单的实例
```js
store下面的index.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//大型应用分开写  actions mutations mutations-type getters index state
export default new Vuex.Store({
state:{
    city:"上海"
},
actions:{
    //外部组件传过来的actions
    changeCity(ctx,city){
        ctx.commit('increment','city')
        //通常increment被封装在mutations-type中 然后通过import * as a取出
    }
},
mutations:{
    increment(state,city){
        state.city=city
    }
}

})

```
### 写法规范
* 首先在store目录下创建以下目录
```md
├── store
│   ├── index.js(vuex入口文件)
│   ├── actions.js(异步操作文件)
│   ├── mutations.js(修改state数据文件)
│   ├── mutations-types.js(mutations关联文件)
│   ├── getters.js(获取state数据文件)
│   ├── state.js
```
<h3>初始化文件</h3>
<br>
state.js

```js
const state ={
  singer:{}
}
export default state
```
getters.js

```js
export const singer=state=>state.singer;

```
mutations-types.js

```js
export const SET_SINGER='SET_SINGER'
```
mutations.js

```js
import * as types from 'mutations-types'
//* as 通过这样的import就可以避免花括号一个一个引入
export default mutations={
  // 常数作为函数名
  [types.SET_SINGER](state,singer){
    state.singer=singer
  }
}
```
**index.js**
```js
import Vue from 'vue'
import Vuex from 'vuex'
import state from 'state'
import mutations from 'mutations'
import * as getters from 'getters'
import * as actions from 'actions'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
// 生产环境开启 线上不开启
const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  // 严格模式
  strict: debug,
  // 打印vuex修改state日志
  plugins: debug ? [createLogger()] : []
});

```
* 接下来使用vuex来获取singer对象
::: warning
vuex提供了mapxxx语法堂对每个环节的操作代码进行简化 
:::
  * main.js引入vuex 引入并注册store即可
  * singer.vue操作
```js
import {mapMutations} from 'vuex'
methods:{
  ...mapMutations({
    setSinger:'SET_SINGER'
  })
}

```
这里的的操作是`映射`，将 this.setSinger映射为 this.$store.commit(SET_SINGER) 简化了代码
然后你直接可以使用setSinger来操作state数据
```js
selectSinger(singer){
  this.$router.push({
    path:`singer/${singer.id}`
  });
  this.setSinger(singer)
}
```
这样就完成了设置store里面数据的操作,接下来就是拿数据
  * singer-detail.vue

```js
import {mapGetters} from 'vuex'
computed:{
...mapGetters(
  // 之前getters.js里面已经处理过数据,所以不需要添加操作 直接引用既可
  ['singer']
)
}

```

`action.js`的作用就是接受异步操作或者批量的同步操作 然后`commit`  `action`里面的这个函数是外部组件`dispatch`进来的
```js
import * as types from './mutation-types'
//像这种需要改变多次mutation的 就把它封装到action
export const selectplay = function ({commit,state},{list,index}) {
  // commit的作用就是告诉vuex需要执行哪一个mutation 传入的参数就是mutation的函数名 还有就是playload
  commit(types.SET_SEQUENCE,list)
  ....
}

```
<br>

:::tip
1. 定义好初始化文件 `store`相关
2. 使用vuex可以通过语法堂`mapxxx`进行映射操作
3. 数据会自动发生映射 不需要操作
:::
详细了解vuex,请参考[vuex官网](https://vuex.vuejs.org/zh/)
next :封装数据


### vuex语法糖

```js
import {mapGetters, mapMutations, mapActions}from 'vuex'

## getters.js
export const state = state => state.fileName

...mapGetters([
    'fileName'
])


## MUtations
import * as types from 'mutation-types'

const mutations = {
    [types.SET_FILENAME](state,filename){
        state.fileName = filename
    }
}
export default mutations

...mapMutations({
    setFileName:'SET_FILENAME'
})
调用 this.setFileName(filename)


## actions
import * as types from 'mutation-types'
export const selectFileName({commit,state},song){
    commit(type.SET_PLAYLIST,playlist)
    ...
}

...mapActions([
    'selectFileName'
])
  调用 this.selectFileName()
```
### 高级用法
如果每个页面都要去引入语法堂使用`vuex`就显得很麻烦，我们可以借助vue的`mixin`的作用插入公共的代码片段达到引入的作用

首先定义好`mixin.js`

```js
import { mapGetters, mapMutations } from "vuex";
export const bookmixin = {
  data() {
    return {
      fontFamilylist: [
        { font: "Default" },
        { font: "思源粗黑体" },
        { font: "思源宋体" },
        { font: "硬楷体" },
        { font: "狂草体" },
        { font: "逐浪丫玉体" },
        { font: "cabin" },
        { font: "dayOne" },
        { font: "montserrat" },
        { font: "tangerine" }
      ]
    };
  },
  computed: {
    ...mapGetters([
      "fileName",
      "menuVisable",
      "selectedNum",
      "CurrentBook",
      "defaultFontSize",
      "defaultFontFamily",
      "fontFamilyVisible",
      "defaultTheme",
      "bookAvailable",
      "section",
      "progress",
      "metadata",
      "navigation",
      "cover",
      "offsetY",
      "time"
    ])
  },
  methods: {
    ...mapMutations({
      setFileName: "SET_FILENAME",
      setmenu: "SET_MENU",
      setSelectNum: "SET_SELECTNUM",
      setBook: "SET_CURRENTBOOK",
      setfonytsize: "SET_DEFAULTFONT",
      setfontfamily: "SET_DEFAULTFONTFAMILY",
      setfamilyVisible: "FAMILY_VISIBLE",
      settheme: "SET_THEME",
      setProgressFinished: "SET_BOOKFIN",
      setsection: "SET_SECTION",
      setprogressValue: "SET_RPOGRESS",
      setnavigation: "SET_NAV",
      setmetadata: "SET_METADATA",
      setcover: "SET_COVER",
      setOffsetY: "SET_OFFSETY",
      settime: "SET_TIME"
    })

    // 设置主题方法注册为mixin 因为多处复用
    /**
     * 点击后的逻辑大概这样: 1.设置vuex theme 2.this.redition.themes设置epub主题 3.保存storage
     * @param {*} theme
     */
    // setTheme(theme) {
    //   this.settheme(theme).then(() => {
    //     this.switchTheme();
    //     this.saveTheme(this.fileName, theme);
    //   });
    // }
  }
};
```
然后再页面中导入文件，然后使用`mixins: [ebookMixin]`


## vue-cli 环境基本配置

### 配置文件路径简写

### 配置api的代理

### 配置开发环境和线上环境区分

### 配置打包的路径

### 结合webpack配置
