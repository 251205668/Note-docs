# Vue

## Vue基础知识点

[原文链接](http://note.youdao.com/noteshare?id=b5e31d39849dcba01d11542ba146225b)

这个是两年前初学`Vue`总结的,所以文笔略显粗糙,后续将重新总结

## Vue原理部分(核心重点)

### MVVM

`MVVM`传统的`MVC`模型主要区分于`Controller`层,简称数据驱动模型,就是`vm`层的作用就是:数据绑定在`vm`层，并自动渲染页面,页面发生变化时会通知`vm`层更新数据。

### Vue响应式原理

**`data`是如何已发生改变就立即渲染页面的?**

通过核心的API:`Object.defineProperty`来监听数据,达到将变量当做函数一样监听的效果。

简单的监听

```js
const data = {}
const name = 'zhangsan'
// 监听name,将name当做data的属性
Object.defineProperty(data,'name',{
  get:function(){
    return name
  },
  set:function(val){
    name = val
  }
})

.... 
// use
console.log(data.name) //zhangsan
data.name =  'lisi' 
```

深度改造: 支持结构复杂的对象或者数组监听
> 判断是否是引用类型,然后遍历监听,监听过程中递归`value`,因为可能是深层次结构

```js
function observer(target){
  if(typeof target !== 'object' || target == null){
    return target
  }
  for(let key in target){
    defineRective(target,key,target[key])
  }
}

function defineRective(data,key,value){
  // value可能是复杂对象 递归监听
  observer(value)
  Object.defineProperty(data,key,{
    get:function(){
      return value
    },
    set:function(newVal){
      // 深度监听
      observer(value)
      if(value === newVal){
        return
      }
        value = newVal
    }
  })
}
```

**监听数组变化**

这样虽然能够监听深层对象或值,但是还是无法监听数组,这里需要改造`target`的原型

- 重新定义数组原型方法,不能污染全局,使用`Object.create`
- 扩展方法,增加视图更新方法和原生数组方法
- 目标原型指向定义的变量

```js
const ArrayObject = Array.prototype
// 将ArraayObject原型指向他,然后扩展方法 即继承数组方法,不影响定义新方法
const arrayob = Object.create(ArrayObject)
['push','shift','unshift','pop'].forEach((methodName)=>{
   // 扩展的方法
  arrayob[methodName]=function(){
   console.log('视图更新')
   // 真正意义上的调用原生方法
   ArrayObject[methodName].call(this,...arguments)
  }
})

....
// 使用的时候将原型指向arrayob即可

if(target instanceof Array){
  target.__proto__ = arrayob
}
const data ={
  nums:[1,2]
}

data.nums.push(3) // 视图更新 此处调用arrayob的方法
```

::: tip defineProperty缺点
- 深度监听,一次性递归到底，计算量大
- 无法监听新增删除,必须使用`Vue.set`或者`Vue.delete`
- 无法实现数组监听,必须要改造
:::


### 虚拟DOM

传统dom操作: 耗时耗费性能。

虚拟`dom`操作**利用`js`的执行速度很快**,先利用`js`模拟`dom`结构,然后计算出最小的变更,操作`dom`

模拟`DOM`结构

![20200709125703.png](https://raw.githubusercontent.com/imageList/imglist/master/20200709125703.png)

更多内容待补充

## 常考面试题

### 聊一下MVVM

MVVM不同于MVC的地方在于将`Controller`变成了`VM`层,VM层:ViewModel层,数据驱动视图层。数据绑定到`VM`层,然后会自动渲染页面,当页面发生变化时会通知`VM`层更新数据。

### 简单说一下Vue2.x响应式数据原理

VUE响应式原理核心是使用到了`Object.defineProperty`这个`API`,VUE重新定义`data`里面的属性,当页面使用属性时,属性发生变化,就可以监听变化通知进行更新操作。

### nextTick知道吗，实现原理是什么？

`dom`更新结束后执行的延时回调函数。主要使用了宏任务和微任务。

根据执行环境分别尝试采用
- **Promise**
- **MutationObserver**
- **setImmediate**
- **如果以上都不行则采用setTimeout**

### Vue中的组件data为什么必须是函数？？

因为组件是可以复用的，js里对象是引用关系，**如果组件data是一个对象，那么子组件中的data属性值会`互相污染`，产生不必要的麻烦**。所以一个组件中的data必须是一个函数，因此**每个实例可以维护一份被返回对象独立的拷贝**。也因为new Vue的实例是不会被复用，所以不存在以上问题。


### 谈一下VUE生命周期

- beforeCreate: new Vue()之后执行的第一个钩子,**这个期间`methods`,`computed`,`data`数据都无法获取**

- created: **实例创建完成**后,完成数据侦测,**虽然可以获取数据,但是无法完成`dom`交互**

- beforeMount: 发生在挂载之前,**当前阶段虚拟`dom`已经创建完成**,如果更改数据**不会触发`updated`**

- mounted: 挂载结束,**已完成双向绑定,可以访问到DOM节点,可以使用`$refs`操作`dom`**

- beforeUpdate: **响应式数据更新之前,虚拟`dom`重新渲染之前**。

- updated: 发生在更新完成之后，**当前阶段组件Dom已完成更新**。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新。

- beforeDestory: 发生在实例销毁之前，**在当前阶段实例完全可以被使用，我们可以在这时进行善后收尾工作**，比如清除计时器

- destoryed: 发生在实例销毁之后，**这个时候只剩下了dom空壳**。组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁

### 谈一下$nextTick

nextTick: 数据更新,dom渲染后执行的回调函数

原理: 有待学习

使用场景:
1. created中操作dom
2. 对更新的dom进行一系列操作时
3. 使用插件时,希望dom重新应用插件(比如数据变化后，使用的better-scroll插件需要在nextTick中调用better-scroll的刷新api)

### 谈一下computed和watch

`Computed`本质是一个具备缓存的watcher，依赖的属性发生变化就会更新视图。 适用于计算比较消耗性能的计算场景。主要使用在`dom`属性更新。

`Watch`没有缓存性，更多的是观察的作用，可以监听某些数据执行回调。当我们需要深度监听对象中的属性时，可以打开`deep：true`选项。

### 说一下v-if和v-show的区别

`v-if`: 隐藏的话不会渲染`dom`。
`v-show`: 本质控制`display:none`,节省性能。

### 说一下v-model的原理

`v-model`本质是一个语法糖,可以看做是`input`和`value`的语法堂。可以更改`prop`和`event`来实现自定义`model`。

### Vue事件绑定原理说一下

原生是利用`addEventListener`实现的,组件事件通过`$on`绑定。

### VUE模板编译原理

- 生成`AST`树
- 优化
- 生成可执行代码

首先解析模板,生成`AST语法树`(对象形式描述模板)。使用大量正则表达式对末班进行解析。

Vue数据是响应式的,但其实模板并不是所有的都是响应式的,Vue深层遍历`AST`树,按照条件标记节点,然后就可以跳过比对，起到优化作用。

最后一步,将优化过的`AST`树转为可执行代码。

### VUE diff算法

### 再说一下虚拟Dom

由于在浏览器中操作DOM是很昂贵的。频繁的操作DOM，会产生一定的性能问题。这就是虚拟Dom的`产生原因`。

`Virtual DOM本质就是用一个原生的JS对象去描述一个DOM节点`。是对真实DOM的一层抽象。

### Vue中组件生命周期调用顺序说一下

组件的调用顺序都是先父后子,渲染完成的顺序是先子后父。

组件的销毁操作是先父后子，销毁完成的顺序是先子后父。

加载渲染过程: 先子后父

`父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount- >子mounted->父mounted`

子组件更新过程

`父beforeUpdate->子beforeUpdate->子updated->父updated`

父组件更新

`父beforeUodate -> updated`

销毁过程

`父beforeDestroy->子beforeDestroy->子destroyed->父destroyed`

### Vue2.x组件通信有哪些方式？

- 父子组件通信

父->子`props`，子->父 `$on`、`$emit`

获取父子组件实例 `$parent`、`$children`

`Ref` 获取实例的方式调用组件的属性或者方法

- 兄弟组件通信

`Event Bus` 实现跨组件通信 `Vue.prototype.$bus = new Vue`

`Vuex`

- 跨组件

`Vuex`

### VUE性能优化

- 尽量减少data中的数据，data中的数据都会增加getter和setter，会收集对应的watcher
- v-if和v-for不能连用如果需要使用v-for给每项元素绑定事件时使用事件代理
- SPA 页面采用keep-alive缓存组件
- 在更多的情况下，使用v-if替代v-show
- key保证唯一
- 使用路由懒加载、异步组件
- 防抖、节流
- 第三方模块按需导入
- 长列表滚动到可视区域动态加载
- 图片懒加载


### vue的数组方法可以实现吗？为什么这些push的数组方法可以而直接令arr[x] = xx不可以呢？


### 虚拟dom的批量更新了解吗？



### 说一下vue路由的两种模式？hash和history有什么区别？hashchange方法了解吗？路由渲染和实现是怎么做的？

### vuex原理
