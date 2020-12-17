# this指向问题、call/bind/apply
## 经典 this 指向问题

## 手写 call/bind/apply

**实现call的原理**: `a.call(b,...args)` **a想要把this指向b，就必须要将自己作为一个属性存入b对象，让b去调用这个属性的方法**

```js
var value = 1;
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call(foo); // 1
```
1. `call()`改变了this的指向
2. 函数 `bar` 执行了

按照思路

在调用call()的时候把函数 `bar()` 添加到 `foo()` 对象中

```js
var foo = {
    value: 1,
    bar: function() {
        console.log(this.value);
    }
};

foo.bar(); // 1
```
这样就实现了this指向和调用问题，最后delete调多余的函数即可

```
1、将函数设置为对象的属性：foo.fn = bar
2、执行函数：foo.fn()
3、删除函数：delete foo.fn

```

**代码实现**

```js
const mycall = function (context,...args){
  context = context || window //可能是全局，没传入的话
  // 首先第一步获取调用方函数(this) 这里为了避免重名使用simbol
  let caller = Simbol('caller')
  context[caller] = this
  let res = context[caller](...args)
  delete context.caller
  return res
}
```

**实现apply**

实现apply类似，知识传入的并不是所有参数列表，而是一个数组

```js
const myapply = function (context,args){
  context = context || window //可能是全局，没传入的话
  // 首先第一步获取调用方函数(this) 这里为了避免重名使用simbol
  let caller = Simbol('caller')
  context[caller] = this
  let res = context[caller](...args)
  delete context.caller
  return res
}
```
>推荐使用上述写法实现，这里如果在原型上写的话，没有明确第二个参数的话，arguments的第一个是this，记得最后执行函数过滤掉它，用 `slice(1)` 就可以


**实现bind**

实现bind就更简单了，他和上面俩函数的区别在于他返回的是函数，并不是立即执行

```js
Function.prototype.mybind = function(){
  const args = Array.prototype.slice.call(arguments)
  const t = args.shift()
  const self = this
  return function(){
    return self.apply(t,args)
  }
}
```

## 例题
