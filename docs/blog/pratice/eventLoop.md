# 事件循环机制(浏览器和Nodejs)

JavaScript的执行机制简单来说就`先执行同步代码，然后执行异步代码`，而`异步的代码`里面又分为`宏任务代码`和`微任务代码`，先执行微任务，然后执行宏任务。首先会将所有JavaScript作为一个宏任务执行，遇到同步的代码就执行，然后开始分配任务，遇到宏任务就将它的回调分配到宏任务的队列里，遇到微任务的回调就分配到微任务的队列里，然后开始执行所有的微任务。执行微任务的过程还是遵循先同步然后分配异步任务的顺序，微任务执行完毕之后，一次Event-Loop的Tick就算完成了。接着挨个去执行分配好的宏任务，在每个宏任务里又先同步后分配异步任务，完成下一次Tick，循环往复直到所有的任务全部执行完成。


微任务包括：`process.nextTick` ，`promise` ，`MutationObserver`。


宏任务包括：`script` ， `setTimeout` ，`setInterval` ，`setImmediate` ，`I/O` ，`UI rendering`。

## 浏览器版本

![](https://image.yangxiansheng.top/img/20200905105642.png?imagelist)

首先js遇到同步代码，会将同步代码放入主进程，异步代码会丢给webAPI去执行，webAPI执行异步任务结束会有回调函数，然后丢进回调栈中，webapi会将异步任务分为宏任务和微任务，分别划分到不同的队列。

先执行微任务，会先检查执行栈和微任务队列，如果没有，就执行宏任务，如果有，就一次性执行完所有微任务

然后执行宏任务，会先检查微任务队列是否为空，不为空就全部执行完全部的微任务(执行也是先进后出)，之后设置微任务队列为null，执行完成宏任务之后就会去渲染进程渲染dom，完成一次循环。然后就是下一次执行栈

最后将执行栈清空

```js
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});
console.log('script end');

执行栈: script start script end
微任务队列: promise1 promise2
宏任务队列: setTimeout 
```

```js
console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end') 
}
async1()

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')

分析: async 和 await 代码转换为

async function async1() {
  await async2()
  console.log('async1 end')
}
===》

function f() {
  return RESOLVE(p).then(() => {
    console.log('ok')
  })
}

然后接着往下走 首先执行执行栈任务

- script start
- async2 end
- Promise (promise的构造函数将其视为同步函数)
- script end
然后将webapi将异步任务队列分别丢进微任务队列和宏任务队列

首先执行微任务，执行微任务队列前会去检查是否穿在微任务队列和执行栈任务，若无执行栈任务，则执行完所有的微任务。

- async1 end
- promise1
- promise2
- setTimeout
然后执行宏任务，执行宏任务前会去检查当前宏任务的微任务队列，若存在则一次性执行完，不存在则执行宏任务。宏任务执行完成，渲染进程出发GUI，dom渲染。
依次循环


```

## Node 版本的事件循环
