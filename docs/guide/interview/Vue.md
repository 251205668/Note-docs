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
  console.log('视图更新')
  // 真正意义上的调用原生方法
  ArrayObject[methodName].call(this,...arguments)
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

### Diff算法
