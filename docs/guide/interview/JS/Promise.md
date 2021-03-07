# Promise
![](https://image.yangxiansheng.top/img/20201221162654.png?imglist)

## JS为什么是单线程

首先记住一句话 —— JS 是单线程的语言，所谓“单线程”就是一根筋，对于拿到的程序，一行一行的执行，上面的执行为完成，就傻傻的等着。

JS 对于这种场景就设计了异步 ———— 即，发起一个网络请求，就先不管这边了，先干其他事儿，网络请求啥时候返回结果，到时候再说。这样就能保证一个网页的流程运行。

## Promise 的理解

从几个方面讲：1.Promise的作用 2. Promise一共有哪几种状态 3.Promise的resolve和reject方法理解

于是得到下面的理解

```js
promise的诞生是用来解决回调地狱的。

首先promise分为 pending，fulfilled,rejected 三种状态，pending状态为初始状态-等待，
他可以转换为成功和失败状态。当调用resolve(value)时，代表操作成功，
状态从pending转为fulfilled，这里的value是操作成功时的值；当调用reject(reason)时，代表操作失败，
状态从pending转为rejected,reason为操作失败原因。
然后promise还有一个关键的then方法，里面有两个参数：onFulfilled,onRejected,成功有成功的值，失败有失败的原因，
当状态为fulfilled执行onFulfilled，传入成功的value，
当状态为rejected执行onRejected，传入reason，这里then方法也会返回一个新的promise对象
```

### Promise的作用

解决异步回调嵌套过深造成代码难以维护和理解


### Promise三个状态

- pending: 等待
- fulfilled: 操作成功
- rejectd: 操作失败

### Promise的用法

```js
new Promise(
  // 这个箭头函数其实就是Promise里面的执行器 executor
  (resolve,reject)=>{
    // ... some code
      if (/* 异步操作成功 */){
        resolve(value);
      } else {
        reject(reason);
      }
}).then(
  function onFulfilled(){},//成功时调用函数
  function onRejected(){} //失败时调用函数
)
```


- 执行器传入的 resolve,reject本身是两个函数，有JS引擎提供，不需要自己部署。

- resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；

- reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。


## Promise的一些API

### resolve

这一步代表操作成功，它会将Promise对象的状态从未完成变为操作成功，在异步操作成功调用时，将结果作为参数传递出去，**这个方法还有一个作用就是讲普通参数转为Promise对象**

**手写实现**

1. 传入data参数
2. 返回新的Promise对象，调用resolve方法

```js
Promise.resolve = function(value){
  return new Promise((resolve,reject)=>{
    resolve(value)
  })
}
```

### reject

这一步代表操作失败，它会将Promise对象的转台从未完成变成操作失败，在异步操作失败时调用，并将错误传递出去，**这个方法还有一个作用就是讲普通参数转为Promise对象**

**手写实现**

1. 传入reason参数
2. 返回新的Promise对象，调用reject方法

```js
Promise.reject = function(reason){
  return new Promise((resolve,reject)=>{
    resolve(reason)
  })
}
```

### then

Promise状态改变的回调函数，里面有两个参数：onFulfilled,onRejected,成功有成功的值，失败有失败的原因，当状态为fulfilled执行onFulfilled，传入成功的value，当状态为rejected执行onRejected，传入reason，这里then方法也会返回一个新的promise对象

```js
getJSON("/posts.json").then(function(json) {
  return json.post;
}).then((onFullfilled=(value)=>{},onRejected(reason)=>{}));
```


### catch

用于指定发生错误时的回调函数。

```js
getJSON('/posts.json').then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});
```

### race

`Promise.race(iterable)` 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。
> 字面意思： 一旦数组里面有一个Promise实例状态改变，就调用操作改变函数


**手写实现**

1. 判断传入的是不是数组
2. 返回一个Promise，遍历数组，使用Promise.resolve将其转为Promise对象,一旦有一个实例状态发生改变，就调用resolve方法


```js
Promise.race = function(iterator){
  if(!iterator instanceof Array){
    return
  }
  return new Promise((resolve,reject)=>{
    for(let i of iterator){
      Promise.resolve(i).then(data=>{
        resolve(data)
      })
    }
  }).catch(e=>{
    reject(e)
  })
}


// test

let p1 = 1
let p2 = new Promise(resolve=>{
  resolve(2)
})
console.log(Promise.race([p1,p2])) //1
```


### all

`Promise.all([p1,p2,p3])` ，Promise.all()方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，**就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例**，再进一步处理。另外，Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

**手写实现**

1. 判断传入的是不是数组
2. 定义count 和 res变量记录返回值
2. 返回一个Promise，遍历数组，使用Promise.resolve将其转为Promise对象,将所有的Promise对象resolve的结果添加到返回结果中，resolve出去

```js
Promise.all = function(iterator){
  if(!iterator instanceof Array){
    return
  }
  let count = 0
  let res =[]
  return new Promise((resolve,reject)=>{
    for(let i of iterator){
      Promise.resolve(i).then(data=>{
        res[count++] = data
        // 最后传入的参数为一个数组
        if(count === iterator.length){
          resolve(res)
        }
      })
    }
  }).catch(e=>{
    reject(e)
  })
}

// test

let p1 = 1
let p2 = new Promise(resolve=>{
  resolve(2)
})
console.log(Promise.all([p1,p2])) //1,2

```

### done

`Promise.done((onFullfilled,onRejected))` 用于捕捉任何可能发生的异常，然后全局抛出，总是处于回调链的尾部

```js
Promise.prototype.done = function(onFulfilled,onRejected){
  this.then(onFulfilled,onRejected).catch(reason=>{
    setTimeout(()=>{throw reason},0)
  })
}
```


### finally

`finally` 方法用于指定不管 `Promise` 对象最后状态如何，都会执行的操作,传入回调函数

```js
  Promise.prototype.finally = function (callback) {
    let P = this.constructor
    return this.then(
      value => P.resolve(callback()).then(() => {}),
      reason => P.resolve(callback()).then(() => {
        throw reason
      })
    )
  }
```


## async await

- async: 声明一个异步函数，并且返回值一定是Promise对象
- await: 1. 求值，既可以求出Promise的值也可以求出表达式的值、2.具有阻塞线程的作用、3.只能搭配 `async`使用

**需要注意的点**

```js
async function a(){
  await b()
  console.log("100")
}

这段代码可以视为,新创建了一个Promise对象，然后执行resolve方法

function f() {
  return RESOLVE(p).then(() => {
    console.log("100")
  })
}


```
```js
const getData = () => new Promise(resolve => setTimeout(() => resolve("data"), 1000))

async function test() {
  const data = await getData()
  console.log('data: ', data);
  const data2 = await getData()
  console.log('data2: ', data2);
  return 'success'
}

// 这样的一个函数 应该再1秒后打印data 再过一秒打印data2 最后打印success
test().then(res => console.log(res))
```

