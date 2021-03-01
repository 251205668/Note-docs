# 手撕代码题

[[toc]]

## 手写题

### 实现一个闭包并分析一段代码讲出原因

实现一个简单闭包

```js
function sum(a) {
  return function (b) {
    return a + b
  }
}

var result = sum(1)(2)
console.log(result) // 3
```

分析代码

```js
for (let i = 1; i < 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
//输出 1,2,3,4
//let 绑定 for 循环，将其重新绑定到每一次的迭代中，保证每次迭代结束都会重新赋值
//有自己的作用域块，
//var 没有自己的作用域块，所以循环变量就会后一个覆盖前一个，循环完毕只有一个值输出；
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
// 输出 5,5,5,5
```

### 手写JSONP

JSONP函数一共需要三个参数: url,params,callback
1. 声明一个挂在全局的函数，函数名为 callback,获取服务器的返回的 `data`
2. 将 `callback` 和 `params`作为一个对象拼接参数
3. 新建 `script` 标签，将 `src` 设置为拼接好的参数，然后挂在到 `body` 上

```js
function JSONP({url,params,callback}){
  return new Promise((resolve,reject)=>{
    let script = document.createElement('script')
    // 声明回调
    window[callback] = function(data){
      resolve(data)
      document.body.removeChild(script)
    }
    // 拼接参数
    params = {...params,callback}
    let arr = []
    for(let key in params){
      arr.push(`${key}=${params[key]}`)
    }
    // 赋值src
    script.src = `${url}?${arr.join('&')}`
    document.body.append(script)
  })
}

// 使用实例

jsonp({
  url: 'http://localhost:3000/say',
  params: { wd: 'Iloveyou' },
  callback: 'show'
}).then(data => {
  console.log(data)
})


```

### 手写repeat函数

```js
function repeat(func, times, wait) {
  // TODO
}
const repeatFunc = repeat(alert, 4, 3000);
// 调用这个 repeatFunc ("hellworld")，会alert4次 helloworld, 每次间隔3秒
```

```js
async function sleep(fn, wait, args) {
  return new Promise((resolve) => {
    setTimeout(() => {
      fn.apply(this, args)
      resolve()
    }, wait)
  })
}
function repeat(func, times, wait) {
  return async function() {
    for (let i = 0; i < times; i++) {
      await sleep(func, wait, arguments)
    }
  }
}
var repeatFunc = repeat(alert, 4, 3000);
repeatFunc('helloworld')
```

### 解析URL参数

```js
 //拆分字符串形式
    function queryToObj() {
        const res = {}
        const search = location.search.substr(1);//去掉前面的“?”
        search.split('&').forEach(paramStr => {
            const arr = paramStr.split('=')
            const key = arr[0]
            const val = arr[1]
            res[key] = val
        })
        return res
    }

  //正则形式
  function queryRegExp(name){
      const search = location.search.substr(1);
      const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`,'i')
      const res = search.match(reg)
      if(res == null){
          return null
      }
      return res[2]
  }

  // URLSearchParams
function queryParams(){
  let search = location.search.slice(1)
  let p = new URLSearchParams(search)
  /**
   * get(key) ：获取参数值
   * getAll(key): 获取所有的参数
   * has(key) 检验是否有
   * keys和values返回两个迭代器，可以使用for of 遍历拿到值
   * */
  // 解析为对象
  return Object.fromEntries(p.entries())
  
}
```

### 实现驼峰转换

```js
/**
 * 输入：
content-type
输出：
contentType
 * */

function camel(str) {
    // TODO
    let ans = "";
    let upper = false;
    for (let index = 0; index < str.length; index++) {
        const element = str[index];
        if (element == '_' || element == '-' || element == '@') {
            upper = true;
        } else {
            if (upper) {
                ans += element.toUpperCase();
            } else {
                ans += element;
            }
            upper = false;
        }
    }
    return ans;
};

```

### 数组去重

```js
function unique(arr) {
  return [...new Set(arr)];
}

function unique(arr) {
  // 当前值 下标 数组
  return arr.filter((cur, index, array) => {
    return array.indexOf(cur) === index;
  })
}

function unique(arr){
  return arr.reduce((pre,cur)=>{
    if(!pre.includes(cur)){
      return pre.concat(cur)
    }else{
      return pre
    }
  },[])
}

```

### 手写数组扁平化

```js
function flatten(arr) {
  return [].concat(...arr.map(v => {
    return Array.isArray(v) ? flatten(v) : v;
  }))
}

function flatten(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, [])
}
```

### 实现防抖函数（debounce)

核心思想: 每次事件触发则删除原来的定时器，建立新的定时器。跟王者荣耀的回城功能类似，你反复触发回城功能，那么只认最后一次，从最后一次触发开始计时。
```js
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if(timer) clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(this, args);
    }, delay);
  }
}
```

适用场景：

- 按钮提交场景：防止多次提交按钮，只执行最后提交的一次
- 服务端验证场景：表单验证需要服务端配合，只执行一段连续的输入事件的最后一次，还有搜索联想词功能类似

### 实现节流函数（throttle）


节流的核心思想: 如果在定时器的时间范围内再次触发，则不予理睬，等当前定时器完成，才能启动下一个定时器任务。这就好比公交车，10 分钟一趟，10 分钟内有多少人在公交站等我不管，10 分钟一到我就要发车走人！

```js
function throttle(fn, interval) {
  let flag = true;
  return function(...args) {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, interval);
  };
};

```
适用场景：

- 拖拽场景：固定时间内只执行一次，防止超高频次触发位置变动
- 缩放场景：监控浏览器resize
- 动画场景：避免短时间内多次触发动画引起性能问题

### 洗牌算法和获取随机数

```js
function getRandomInt (min, max) {
  // 取min-max的数据
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle (arr) {
  // 当前数组值与取到的随机数组值交换 从而打乱数据
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
```


### 实现instanceof

```js
function instanceof(L,R){
  let O = R.prototype
  L = L.__proto__
  while(true){
    if(L === null){
      return false
    }
    if(L === O){
      return true
    }
    L = L.__proto__
  }
}
```

### 模拟new

```js
function MyNew(ctor,...args){
  const obj = Object.create(ctor.prototype)
  const res = ctor.apply(obj,args)
  return res instanceof Object ? res : obj
}
```

### call、apply、bind


```js
// call
function MyCall(context,...args){
  context = context || window
  const caller = new Simbol('caller')
  context[caller] = this
  const res = context[caller](...args)
  delete context.caller
  return res
}
```

```js
//apply
function MyApply(context,args){
  context = context || window
  const caller = new Simbol('caller')
  context[caller] = this
  const res = context[caller](...args)
  delete context.caller
  return res
}
```

```js
//bind
Function.prototype.bind = function(){
  const args = Array.prototype.slice.call(arguments)
  let t = args.shift()
  return function(){
    this.apply(t,args)
  }
}
```

### 手写一个 count 函数

每次调用一个函数自动加 1

```js
count() 1
count() 2
count() 3
```

```js
var count = (function () {
  var a = 0
  return function () {
    console.log(++a)
  }
})()

count() // 1
count() // 2
count() // 3
```

### 手写一个 sleep 睡眠函数

比如 sleep(1000)代表等待 1000ms

> 方法一：ES5 方式实现

```js
function sleep(callback, time) {
  if (typeof callback == 'function') {
    setTimeout(callback, time)
  }
}
function output() {
  console.log(111)
}
sleep(output, 2000)
```

> 方法二：使用 promise 方式

```js
const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
sleep(2000).then(() => {
  console.log(111)
})
```


### 实现一个forEach方法

> forEach()方法对数组的每个元素执行一次给定的函数。

```js
arr.forEach(function(currentValue, currentIndex, arr) {}, thisArg)

//currentValue  必需。当前元素
//currentIndex  可选。当前元素的索引
//arr           可选。当前元素所属的数组对象。
//thisArg       可选参数。当执行回调函数时，用作 this 的值。
```

```js
Array.prototype._forEach = function(fn, thisArg) {
    let arr = Array.prototype.slice.call(this)
    for(let i=0; i<arr.length; i++) {
        fn.call(thisArg, arr[i], i, arr)
    }
}

// test
let arr = [1,2,3,4,5];
arr._forEach((item, index) => {
    console.log(item, index);
})

// test thisArg

```

### 实现一个filter方法

每次需要将符合条件的元素放到返回数组中去

```js
Array.prototype._fillter = function(fn,thisArg){
  let arr = Array.prototype.slice.call(this)
  let resArr = []
  for(let i=0;i<arr.length;i++){
    fn.call(thisArg,arr[i],i,arr) && resArr.push(arr[i])
    }
}
```

### 用reduce实现map

> reduce是一个累加方法，是对数组累积执行回调函数，返回最终计算结果。

```js
array.reduce(function(prev, currentValue, currentIndex, arr){}, initialValue);

//pre 上一次回调返回值。
//currentValue  必需。当前元素
//currentIndex  可选。当前元素的索引
//arr   可选。当前元素所属的数组对象。
//initialValue可选。传递给函数的初始值
```

> map是遍历数组的每一项，并执行回调函数的操作，返回一个对每一项进行操作后的新数组。

```javascript
array.map(function(currentValue,index,arr), thisArg)；
//currentValue  必须。当前元素的值
//index 可选。当前元素的索引值
//arr   可选。当前元素属于的数组对象
//thisArg 可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值。如果省略了 thisArg，或者传入 null、undefined，那么回调函数的 this 为全局对象。
```

> 用reduce实现map方法

```js
Array.prototype.myMap = function(fn, thisArg){
    var res = [];
    thisArg = thisArg || [];
    this.reduce(function(pre, cur, index, arr){
      res.push(fn.call(thisArg, cur, index, arr));
  }, []);
  return res;
}
var arr = [2,3,1,5];
arr.myMap(function(item,index,arr){
    console.log(item,index,arr);
})
let res = arr.myMap(v => v * 2);
console.log(res); // [4,6,2,10]
```

### ['1', '2', '3'].map(parseInt)返回值

> 首先返回值为: [1, NaN, NaN]

map是传入的函数是有3个参数的: value, index, arr, 而parseInt有两个参数:
> parseInt(string, radix);

```txt
string
要被解析的值。如果参数不是一个字符串，则将其转换为字符串(使用toString 抽象操作)。字符串开头的空白符将会被忽略。

radix 可选
从 2 到 36，表示字符串的基数。例如指定 16 表示被解析值是十六进制数。请注意，10不是默认值！
```

所以['1', '2', '3'].map(parseInt)的过程是这样子的:

```js
parseInt('1', 0); // radix是0的情况见如下解释
parseInt('2', 1); // radix基数只能取到 2 - 36 之间,所以NaN
parseInt('3', 2); // radix=2 表示是二进制数,只能有0和1,解析的字符串是'3',所以是NaN
```

```txt
如果 radix 是 undefined、0或未指定的，JavaScript会假定以下情况：

如果输入的 string以 "0x"或 "0x"（一个0，后面是小写或大写的X）开头，那么radix被假定为16，字符串的其余部分被当做十六进制数去解析。
如果输入的 string以 "0"（0）开头， radix被假定为8（八进制）或10（十进制）。具体选择哪一个radix取决于实现。ECMAScript 5 澄清了应该使用 10 (十进制)，但不是所有的浏览器都支持。因此，在使用 parseInt 时，一定要指定一个 radix。
如果输入的 string 以任何其他值开头， radix 是 10 (十进制)。
```



### 手写一个 promise

```js
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn) {
  // 保存初始化状态
  var self = this

  // 初始化状态
  this.state = PENDING

  // 用于保存 resolve 或者 rejected 传入的值
  this.value = null

  // 用于保存 resolve 的回调函数
  this.resolvedCallbacks = []

  // 用于保存 reject 的回调函数
  this.rejectedCallbacks = []

  // 状态转变为 resolved 方法
  function resolve(value) {
    // 判断传入元素是否为 Promise 值，如果是，则状态改变必须等待前一个状态改变后再进行改变
    if (value instanceof MyPromise) {
      return value.then(resolve, reject)
    }

    // 保证代码的执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      // 只有状态为 pending 时才能转变，
      if (self.state === PENDING) {
        // 修改状态
        self.state = RESOLVED

        // 设置传入的值
        self.value = value

        // 执行回调函数
        self.resolvedCallbacks.forEach((callback) => {
          callback(value)
        })
      }
    }, 0)
  }

  // 状态转变为 rejected 方法
  function reject(value) {
    // 保证代码的执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      // 只有状态为 pending 时才能转变
      if (self.state === PENDING) {
        // 修改状态
        self.state = REJECTED

        // 设置传入的值
        self.value = value

        // 执行回调函数
        self.rejectedCallbacks.forEach((callback) => {
          callback(value)
        })
      }
    }, 0)
  }

  // 将两个方法传入函数执行
  try {
    fn(resolve, reject)
  } catch (e) {
    // 遇到错误时，捕获错误，执行 reject 函数
    reject(e)
  }
}

MyPromise.prototype.then = function (onResolved, onRejected) {
  // 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
  onResolved =
    typeof onResolved === 'function'
      ? onResolved
      : function (value) {
          return value
        }

  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : function (error) {
          throw error
        }

  // 如果是等待状态，则将函数加入对应列表中
  if (this.state === PENDING) {
    this.resolvedCallbacks.push(onResolved)
    this.rejectedCallbacks.push(onRejected)
  }

  // 如果状态已经凝固，则直接执行对应状态的函数

  if (this.state === RESOLVED) {
    onResolved(this.value)
  }

  if (this.state === REJECTED) {
    onRejected(this.value)
  }
}
```

### Promise实现网络超时判断

```js
const uploadFile = (url, params) => {
  return Promise.race([
    uploadFilePromise(url, params),
    uploadFileTimeout(3000)
  ])
}
function uploadFilePromise(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, {
      headers: {'Content-Type': 'multipart/form-data'}, // 以formData形式上传文件
      withCredentials: true
    }).then(res => {
      if(res.status===200 && res.data.code===0) {
        resolve(res.data.result)
      }else {
        reject(res.data)
      }
    })
  })
}
function uploadFileTimeout(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({timeoutMsg: '上传超时'})
    }, time)
  })
}

```

### 手写Vue双向数据绑定

1. 对象，包含复杂对象
2. 值类型
3. 数组,改造原型

```js
const oldArrayPrototype = Array.prototype
// 将ArraayObject原型指向他,然后扩展方法 即继承数组方法,不影响定义新方法
const newArrayObject = Object.create(oldArrayPrototype)
// 扩展常用方法
['push','shift','unshift','pop'].forEach((methodName)=>{
   // 扩展的方法
  newArrayObject[methodName]=function(){
   console.log('视图更新')
   // 真正意义上的调用原生方法
   oldArrayPrototype[methodName].call(this,...arguments)
  }
})

function observer(target){
  if(typeof target !== object || target == null){
    // 非对象或数组
    return target
  }
  if(target instanceof Array){
    target.__proto__ = newArrayObject
}
  for(let key in target){
    defineReactive(target,key,target[key])
  }
}

function defineReactive(data,key,value){
   // value可能是复杂对象 递归监听
  observer(value)
  Object.definePropetry(data,key,{
    get:function(){
      return value
    },
    set:function(newVal){
      // 深度监听
      observer(value)
      if(newVal === value){
        return 
      }
      value = newVal
    }
  })
}

const data ={
  nums:[1,2]
}
observer(data)
data.nums.push(3) // 视图更新
```

### 手写虚拟dom过程(html转为json格式)

1. 将HTML字符串去<>,处理为一个数组
2. 提取树形结构
3. 将树形结构转JSON

```js
const str1 = '<div>1<span>2<a>3</a>4</span>5<span>6<a>7</a>8<a>9</a>10</span>11</div>';
function Dom2JSON(str) {
    str = str.split('<').map(x => x.split('>'));
    let res = [],stack = [],temp = {},cur = {},key = 0;
    // 获取树形结构
    for(let i = 1;i < str.length; i++) {
        if (str[i][0].indexOf('/') === -1) {
            temp = {};
            temp['key'] = key++;
            temp['tag'] = str[i][0];
            temp['value'] = str[i][1];
            temp['children'] = [];
            temp['parent'] = stack.length === 0 ? 0 : stack[0]['key'];
            stack.unshift(temp);
        } else {
            cur = stack.shift();
            // 当前元素为根元素时栈为空
            stack.length !== 0 && (stack[0]['value'] = stack[0]['value'] + cur['value'] + str[i][1]);
            res.unshift(cur);
        }
    }
    // 使得遍历时索引与key值匹配
    res = res.sort((x, y) => x['key'] - y['key']);
    for (let i = res.length - 1;i > 0;i--) {
        temp = {};
        temp['tag'] = res[i]['tag'];
        temp['value'] = res[i]['value'];
        temp['children'] = res[i]['children'];
        res[res[i]['parent']]['children'].unshift(temp);
    }
    res = res[0];
    delete res['parent'];
    delete res['key'];
    return JSON.parse(JSON.stringify(res));
}
console.log(Dom2JSON(str1));

// 转换结果如下
// let res ={
//     tag: "div",
//     value: "1234567891011",
//     children: [
//         {
//             tag: "span",
//             value: "234",
//             children: [
//                 {
//                     tag: "a",
//                     value: "3",
//                     children: [],
//                 }
//             ],
//         },
//         {
//             tag: "span",
//             value: "678910",
//             children: [
//                 {
//                     tag: "a",
//                     value: "7",
//                     children: [],
//                 },
//                 {
//                     tag: "a",
//                     value: "9",
//                     children: [],
//                 }
//             ]
//         }
//     ]}

```


### 手写一个 Ajax

AJAX 包括以下几个步骤

1. 创建 XMLHttpRequest 对象，也就是创建一个异步调用对象
2. 创建一个新的 HTTP 请求，并指定该 HTTP 请求的方法、URL 及验证信息
3. 设置响应 HTTP 请求状态变化的函数
4. 发送 HTTP 请求
5. 获取异步调用返回的数据
6. 使用 JavaScript 和 DOM 实现局部刷新

一般实现:

```js
let xhr = new XMLHttpRequest();
// readyState 为 4 和 status 为 200 的时候，是正常情况
// Step1: 监听状态
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    xhr.status === 200 && console.log(xhr.responseText);
  }
};
// xhr.open(method: [get, post], url: string, async: [true, false])
// async: 默认是 true; 代表异步请求
// 如果async = false, 那么 xhr.send() 会阻塞
// Step2: 打开请求
xhr.open(
  "GET",
  "http://localhost:5050/search/song?key=周杰伦&page=1&limit=10&vendor=qq",
  true
);
// Step3: 发送请求
xhr.send();
```

promise 封装实现：

```js
function getJSON(url) {
  // 返回一个 promise 对象
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest()

    // 新建一个 http 请求， 第三个参数为async，指定请求是否为异步方式，默认为 true。
    xhr.open('GET', url, true)

    // 设置状态的监听函数
    xhr.onreadystatechange = function () {
      /*0: 请求未初始化
        1: 服务器连接已建立
        2: 请求已接收
        3: 请求处理中
        4: 请求已完成，且响应已就绪*/
      if (this.readyState !== 4) return

      // 当请求成功或失败时，改变 promise 的状态
      /*200: "OK"
        404: 未找到页面*/
      if (this.status === 200) {
        resolve(this.responseText)
      } else {
        reject(new Error(this.statusText))
      }
    }

    // 设置响应的数据类型
    xhr.responseType = 'json'

    // 设置请求头信息
    xhr.setRequestHeader('Accept', 'application/json')

    // 发送 http 请求
    xhr.send(null)
  })
}
```

### 实现一个红绿灯（3s打印red，2s打印green，1s打印yellow）

```js
let setColor = function (color, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(color);
            resolve();
        }, delay);
    })
}

async function sett() {
    await setColor('red', 3000);
    await setColor('green', 2000);
    await setColor('yellow', 1000);
    await sett();
}

sett();
```



### 实现一个add函数 满足add(1,2,3)与add(1)(2)(3)结果相同

这是函数柯里化的一种基本表现形式

```js
function add() {
  let args = [...arguments];
  let fn = function() {
    args.push(...arguments);
    return fn;
  }
  fn.toString = function(){ // toString
    return args.reduce((t,v)=>t+v);
  }
  return fn;
}

alert(add(1,2,3));
alert(add(1)(2)(3));
```

### 函数柯里化

[参考链接](https://github.com/mqyqingfeng/Blog/issues/42)

```js
函数的柯里化：curry（又叫部分求值）

把接受多个参数的函数变成接受一个参数的函数，并返回一个新的函数；

实现方法：用一个闭包，返回一个函数，这个函数每次执行都会改写储存参数的数组，当函数的参数够了之后，便会执行
```

ES5 实现

```js
function curry(fn, args = []) {
  // 获取函数需要的参数长度
  var length = fn.length
  return function () {
    // 拼接得到现有的所有参数
    for (let i = 0; i < arguments.length; i++) {
      args.push(arguments[i])
    }
    // 判断参数的长度是否已经满足函数所需参数的长度
    if (args.length >= length) {
      // 如果满足，执行函数
      return fn.apply(this, args)
    } else {
      // 如果不满足，递归返回科里化的函数，等待参数的传入
      return curry.call(this, fn, args)
    }
  }
}

// test
let add = curry((a,b,c) => a+b+c)
// 一个一个测试
console.log(add(1)(2)(3))
console.log(add(1, 2)(3))
console.log(add(1)(2, 3))
```

ES6 实现

```js
function curry(fn, ...args) {
  return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args)
}

// test
let add = curry((a,b,c) => a+b+c);
console.log(add(1)(2)(3))
console.log(add(1, 2)(3))
console.log(add(1)(2, 3))
```



### 手写一个单例模式

单例模式的定义是：保证一个类仅有一个一个实例，并提供一个访问它的全局访问点。

```js
class SingleTon {
  constructor(name) {
    this.name = name
    this.instance = null
  }

  static getInstance(name) {
    // 新建对象时判断全局是否有该对象，如果有，就返回该对象，没有就创建一个新对象返回。
    if (!this.instance) {
      this.instance = new SingleTon(name)
    }
    return this.instance
  }
}

var oA = SingleTon.getInstance('Lee')
var oB = SingleTon.getInstance('Fan')
console.log(oA === oB) // true
```

> static 关键字解释：类相当于实例的原型， 所有在类中定义的方法， 都会被实例继承。 如果在一个方法前， 加上 static 关键字， 就表示该方法不会被实例继承， 而是直接通过类来调用， 这就称为“ 静态方法”。

### 手写一个观察者模式

```js
var events = (function () {
  var topics = {}

  return {
    // 注册监听函数
    subscribe: function (topic, handler) {
      if (!topics.hasOwnProperty(topic)) {
        topics[topic] = []
      }
      topics[topic].push(handler)
    },

    // 发布事件，触发观察者回调事件
    publish: function (topic, info) {
      if (topics.hasOwnProperty(topic)) {
        topics[topic].forEach(function (handler) {
          handler(info)
        })
      }
    },

    // 移除主题的一个观察者的回调事件
    remove: function (topic, handler) {
      if (!topics.hasOwnProperty(topic)) return

      var handlerIndex = -1
      topics[topic].forEach(function (item, index) {
        if (item === handler) {
          handlerIndex = index
        }
      })

      if (handlerIndex >= 0) {
        topics[topic].splice(handlerIndex, 1)
      }
    },

    // 移除主题的所有观察者的回调事件
    removeAll: function (topic) {
      if (topics.hasOwnProperty(topic)) {
        topics[topic] = []
      }
    },
  }
})()
```

ES6 写法：

```js
class Event {
  constructor() {
    this.events = {}
  }
  subscribe(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = [callback]
    } else {
      this.events[eventName].push(callback)
    }
  }

  publish(eventName) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => callback())
    }
  }

  reomve(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (fn) => fn !== callback
      )
    }
  }

  reomveAll(eventName) {
    if (this.events[eventName]) {
      this.events[eventName] = []
    }
  }
}
```

### 手写一个发布订阅模式

```js
// 发布订阅模式
class EventEmitter {
  constructor() {
    // 事件对象，存放订阅的名字和事件
    this.events = {}
  }
  // 订阅事件的方法
  on(eventName, callback) {
    if (!this.events[eventName]) {
      // 注意是数据，一个名字可以订阅多个事件函数
      this.events[eventName] = [callback]
    } else {
      // 存在则push到指定数组的尾部保存
      this.events[eventName].push(callback)
    }
  }
  // 触发事件的方法
  emit(eventName) {
    // 遍历执行所有订阅的事件
    this.events[eventName] && this.events[eventName].forEach((cb) => cb())
  }
  // 移除订阅事件
  removeListener(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (cb) => cb != callback
      )
    }
  }
  // 只执行一次订阅的事件，然后移除
  once(eventName, callback) {
    // 绑定的时fn, 执行的时候会触发fn函数
    let fn = () => {
      callback() // fn函数中调用原有的callback
      this.removeListener(eventName, fn) // 删除fn, 再次执行的时候之后执行一次
    }
    this.on(eventName, fn)
  }
}

// test
let em = new EventEmitter();
let workday = 0;
em.on("work", function() {
    workday++;
    console.log("work everyday");
});

em.once("love", function() {
    console.log("just love you");
});

function makeMoney() {
    console.log("make one million money");
}
em.on("money",makeMoney)；

let time = setInterval(() => {
    em.emit("work");
    em.removeListener("money",makeMoney);
    em.emit("money");
    em.emit("love");
    if (workday === 5) {
        console.log("have a rest")
        clearInterval(time);
    }
}, 1);

//  输出
//  work everyday
//  just love you
//  work everyday
//  work everyday
//  work everyday
//  work everyday
//  have a rest
```

- 来看一个简单的用途:

```js
document.querySelector('#btn').addEventListener('click', function () {
  alert('You click this btn');
}, false)
```

我们平时对 DOM 的事件绑定就是一个非常典型的 发布-订阅者模式 ，这里我们需要监听用户点击按钮这个动作，但是我们却无法知道用户什么时候去点击，所以我们订阅 按钮上的 click 事件，只要按钮被点击时，那么按钮就会向订阅者发布这个消息，我们就可以做对应的操作了。

- 再看vue中一个简答的用途:子组件与父组件通信

Vue 中我们通过 props 完成父组件向子组件传递数据，子组件与父组件通信我们通过自定义事件即 $on,$emit来实现，其实也就是通过 $emit 来发布消息，并对订阅者 $on 做统一处理 ~

### 图片懒加载

```js
function lazyload() {
  const imgs = document.getElementsByTagName('img');
  const len = imgs.length;
  // 可视窗口高度
  const viewHeight = document.documentElement.clientHeight;
  // 滚动条高度
  const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
  for (let i = 0; i < len; i++) {
    // 元素距顶高度
    const offsetHeight = imgs[i].offsetTop;
    if (offsetHeight < viewHeight + scrollHeight) {
      const src = imgs[i].dataset.src;
      imgs[i].src = src;
    }
  }
}

// 可以使用节流优化一下
window.addEventListener('scroll', lazyload);

```

### 对一个页面打印所有的结点类型和结点名称

```JavaScript
var nodes = [...document.getElementsByTagName('*')];
nodes.forEach((node) => {
  console.log(node.nodeType, node.nodeName)
})
```

### 打印页面HTML种类数量

```js
function fn(){
  return [...new Set([...document.getElementsByTagName('*')].map(el=>el.tagName))].length
}
```


## 场景题

### 如何将浮点数点左边的数每三位添加一个逗号，如 12000000.11 转化为『12,000,000.11』

> toLocaleString()

```js
function format(number) {
  return number.toLocaleString();
}
```

> replace

```js
function format(number) {
  return number && number.replace(/(?!^)(?=(\d{3})+\.)/g, ",");
}
```

```js
function format(number) {
  return number && number.toString().replace(/(\d)(?=(\d{3})+\.)/g, $2 => $2 + ',')
}
```

### 写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b 的时间，然后写一个 myClear，停止上面的 mySetInterVal
<br/>

<details>
<summary>查看答案</summary>

```js
function mySetInterVal(fn, a, b) {
    this.a = a;
    this.b = b;
    this.time = 0;
    this.handle = -1;
    this.start = () => {
        this.handle = setTimeout(() => {
            fn();
            this.time++;
            this.start();
            console.log( this.a + this.time * this.b);
        }, this.a + this.time * this.b);
    }

    this.stop = () => {
        clearTimeout(this.handle);
        this.time = 0;
    }
}

var a = new mySetInterVal(() => {console.log('123')},1000, 2000 );
a.start();
a.stop();
```

</details>
<br/>


### 实现 lodash 的_.get

```js
var obj = { 'a': [{ 'b': { 'c': 3 } }] };

var result =deepGet(obj, 'a[0].b.c');
console.log(result);
// => 3

result=deepGet(obj, ['a', '0', 'b', 'c']);
console.log(result);
// => 3

result=deepGet(obj, 'a.b.c', 'default');
console.log(result);
// => 'default'
```

<details>
<summary>查看答案</summary>

```js
function deepGet(object, path, defaultValue) {
    return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path)
            .reduce((o, k) => (o || {})[k], object) || defaultValue;
}

var obj = { 'a': [{ 'b': { 'c': 3 } }] };

var result =deepGet(obj, 'a[0].b.c');
console.log(result);
// => 3

result=deepGet(obj, ['a', '0', 'b', 'c']);
console.log(result);
// => 3

result=deepGet(obj, 'a.b.c', 'default');
console.log(result);
// => 'default'
```

</details>
<br/>

### 实现 add(1)(2)(3)

<br/>

<details>
<summary>查看答案</summary>

考点：函数柯里化

函数柯里化概念： 柯里化（Currying）是把接受多个参数的函数转变为接受一个单一参数的函数，并且返回接受余下的参数且返回结果的新函数的技术。

1. 暴力法

```js
function add (a) {
	return function (b) {
		return function (c) {
		    return a + b + c;
		}
	}
}
console.log(add(1)(2)(3)); // 6
```

2. 柯里化解决方案

参数固定

```js
const curry = (fn) =>
(judge = (...args) =>
    args.length === fn.length
    ? fn(...args)
    : (...arg) => judge(...args, ...arg));
const add = (a, b, c) => a + b + c;
const curryAdd = curry(add);
console.log(curryAdd(1)(2)(3)); // 6
console.log(curryAdd(1, 2)(3)); // 6
console.log(curryAdd(1)(2, 3)); // 6
```
参数不固定

```js
function add (...args) {
    //求和
    return args.reduce((a, b) => a + b)
}

function currying (fn) {
    let args = []
    return function temp (...newArgs) {
        if (newArgs.length) {
            args = [
                ...args,
                ...newArgs
            ]
            return temp
        } else {
            let val = fn.apply(this, args)
            args = [] //保证再次调用时清空
            return val
        }
    }
}

let addCurry = currying(add)
console.log(addCurry(1)(2)(3)(4, 5)())  //15
console.log(addCurry(1)(2)(3, 4, 5)())  //15
console.log(addCurry(1)(2, 3, 4, 5)())  //15
```

</details>
<br/>

### 数组转为树

```js
要求将 [{id:1, parentId: 0}, {id:2, parentId:1},{id:3, parentId:1}] 输出成树结构

[{id:1, parentId: 0,children:[{id:2, parentId:1},{id:3, parentId:1}]}]

```

<details>
<summary>查看答案</summary>

```js
var list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 }
];
function convert(list) {
  const map = list.reduce((acc, item) => {
    acc[item.id] = item
    return acc
  }, {})
  const result = []
  for (const key in map) {
    const item = map[key]
    if (item.parentId === 0) {
      result.push(item)
    } else {
      const parent = map[item.parentId]
      if (parent) {
        parent.children = parent.children || []
        parent.children.push(item)
      }
    }
  }
  return result
}
var result = convert(list)
```

</details>
<br/>


### 输出结果题集

```js
function Foo() {
  getName = function () {
    alert(1);
  };
  return this;
}
var getName;
function getName() {
  alert(5);
}
Foo.getName = function () {
  alert(2);
};
Foo.prototype.getName = function () {
  alert(3);
};
getName = function () {
  alert(4);
};

Foo.getName(); // ？
getName(); // ？
Foo().getName(); // ？
getName(); // ？
new Foo.getName(); // ?
new Foo().getName(); // ?
new new Foo().getName(); // ？
```

<details>
<summary>查看答案</summary>

</details>

<br/>

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(function () {
  console.log("setTimeout");
}, 0);
async1();
new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log("scripts end");
// 写出代码执行完成打印的结果
```

<details>
<summary>查看答案</summary>

</details>

<br/>

```js
var a = {
  name: "A",
  fn() {
    console.log(this.name);
  },
};
a.fn();
a.fn.call({ name: "B" });
var fn1 = a.fn;
fn1();
// 写出打印结果
```
<details>
<summary>查看答案</summary>

</details>

<br/>

```js
let int = 1;
setTimeout(function () {
  console.log(int);
  int = 2;
  new Promise((resolve, reject) => {
    resolve();
  }).then(function () {
    console.log(int);
    int = 7;
  });
  console.log(int);
});
int = 3;
console.log(int);
new Promise((resolve, reject) => {
  console.log(int);
  return resolve((int = 4));
}).then(function (res) {
  console.log(int);
  int = 5;
  setTimeout(function () {
    console.log(int);
    int = 8;
  });
  return false;
});
console.log(int);
// 写出打印结果
```

<details>
<summary>查看答案</summary>

</details>

<br/>

```js
function a(obj) {
  obj.a = 2;
  obj = { a: 3 };
  return obj;
}
const obj = { a: 1 };
a(obj);
console.log(obj);
```

<details>
<summary>查看答案</summary>

</details>

<br/>

```js
Function.prototype.a = () = >{alert(1)}
Object.prototype.b = () = >{alert(2)}
function A(){};
const a = new A();
a.a();
a.b();
// 写出执行结果
```

<details>
<summary>查看答案</summary>

</details>

<br/>

```js
let a = 0;
console.log(a);
console.log(b);
let b = 0;
console.log(c);
function c() {}
// 写出执行结果
```

<details>
<summary>查看答案</summary>

</details>

<br/>

```js
var x = 10;
function a(y) {
  var x = 20;
  return b(y);
}
function b(y) {
  return x + y;
}
a(20);
// 写出执行结果
```

<details>
<summary>查看答案</summary>

</details>

<br/>

```js
console.log(1);
setTimeout(() => {
  console.log(2);
});
process.nextTick(() => {
  console.log(3);
});
setImmediate(() => {
  console.log(4);
});
new Promise((resolve) => {
  console.log(5);
  resolve();
  console.log(6);
}).then(() => {
  console.log(7);
});
Promise.resolve().then(() => {
  console.log(8);
  process.nextTick(() => {
    console.log(9);
  });
});
// 写出执行结果
```

<details>
<summary>查看答案</summary>

</details>

<br/>

```js
[1, 2, 3, 4, 5].map(parselnt);
// 写出执行结果
```


<details>
<summary>查看答案</summary>

</details>

<br/>

```js
typeof typeof typeof [];
// 写出执行结果
```

<details>
<summary>查看答案</summary>

</details>

<br/>

```js
function Foo() {
  getName = function () {
    alert(1);
  };
  return this;
}
getName();
Foo.getName = function () {
  alert(2);
};
Foo.prototype.getName = function () {
  alert(3);
};
getName = function () {
  alert(4);
};

// 请写出下面的输出结果
getName90;
Foo.getName();
new Foo().getName();
```

<details>
<summary>查看答案</summary>

</details>

<br/>

```js
var fullname = "Test1";
var obj = {
  fullname: "Test2",
  prop: {
    fullname: "Test3",
    getFullname: function () {
      return this.fullname;
    },
  },
};
console.log(obj.prop.getFullname());
var test = obj.prop.getFullname;
console.log(test());
```
<details>
<summary>查看答案</summary>

</details>

<br/>

### 给定一个数组，按找到每个元素右侧第一个比它大的数字，没有的话返回-1 规则返回一个数组

```js
/*
 *示例：
 *给定数组：[2,6,3,8,10,9]
 *返回数组：[6,8,8,10,-1,-1]
 */

```

<details>
<summary>查看答案</summary>

```js
function handler(arr = []) {
    const result = [];
    for (let i = 0, len = arr.length; i < len - 1; i++) {
        for (let j = i + 1; j < len; j++) {
            if(arr[j] > arr[i]) {
                result[i] = arr[j];
                break;
            }
            result[i] = -1;
        }
    }
    result[arr.length - 1] = -1;
    return result;
}
console.log(handler([2,6,3,8,10,9]));
```

</details>

### 输出一个随机的16进制颜色

<br/>

<details>
<summary>查看答案</summary>

```js
var color = '#'+ Math.random().toString(16).substr(-6); 
document.body.style.backgroundColor = color;
```

</details>

### 手写代码实现 `kuai-shou-front-end=>KuaiShouFrontEnd`

<br/>

<details>
<summary>查看答案</summary>

```js
function handler(str){
return str.split('-').map(item=>item.substr(0,1).toUpperCase()+item.substr(1)).join('')
}

console.log(handler('kuai-shou-front-end'))
```

</details>

### 设计一个函数，奇数次执行的时候打印1，偶数次执行的时候打印2

<br/>

<details>
<summary>查看答案</summary>

```js
function countFn() {
    let count = 0;
    return function (...args) {
        count++;
        if (count & 1 === 1) return console.log(1);
        console.log(2);
    }
}
const testFn = countFn();
testFn(); // 1
testFn(); // 2
testFn(); // 1
testFn(); // 2
testFn(); // 1
testFn(); // 2
```

</details>

### 给定起始日期，输入出之前的日期

```js
// 输入两个字符串 2018-08  2018-12
// 输出他们中间的月份 [2018-10, 2018-11]
// 给定起止日期，返回中间的所有月份
```

<details>
<summary>查看答案</summary>

```js
function getDate(dateStr = '', addMonth = 0) {
    const [year, month] = dateStr.split('-');
    return new Date(year, month - 1 + addMonth);
}
function formateDate(dateStr = new Date()) {
    return `${dateStr.getFullYear()}-${String(dateStr.getMonth() + 1).padStart(2, 0)}`;
}
const getRangeMonth = (startDateStr = '', endDateStr = '') => {
    const result = [];
    let startTime = getDate(startDateStr) ? getDate(startDateStr, 1).getTime() : 0;
    const endTime = getDate(endDateStr) ? getDate(endDateStr).getTime() : 0;
    while (startTime < endTime) {
        const curTime = new Date(startTime);
        result.push(formateDate(curTime));
        curTime.setMonth(curTime.getMonth() + 1);
        startTime = curTime.getTime();
    }
    return result;
}
console.log(getRangeMonth("2018-08", "2018-12")); // [ '2018-09', '2018-10', '2018-11' ]
```

</details>

### 请写一个函数，输出出多级嵌套结构的 Object 的所有 key 值

```js
var obj = {
    a: "12",
    b: "23",
    first: {
        c: "34",
        d: "45",
        second: { 3: "56", f: "67", three: { g: "78", h: "89", i: "90" } },
    },
};
// => [a,b,c,d,e,f,g,h,i]
```

<details>
<summary>查看答案</summary>

```js
var obj = {
    a: "12",
    b: "23",
    first: {
        c: "34",
        d: "45",
        second: { 3: "56", f: "67", three: { g: "78", h: "89", i: "90" } },
    },
};
// => [a,b,c,d,e,f,g,h,i]
function getAllKeys(obj = {}, res = []) {
    if (typeof obj !== 'object' || obj === null) return [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] && typeof obj[key] === 'object') {
                return getAllKeys(obj[key], res);
            }
            res.push(key);
        }
    }
    return res;
}
console.log(getAllKeys(obj))
```

</details>

### 写出打印结果，并解释为什么


```js
var a = { k1: 1 };
var b = a;
a.k3 = a = { k2: 2 };
console.log(a); 
console.log(b); 

```

<details>
<summary>查看答案</summary>

```js
{k2:2} {k1:1,k3:{k2:2}}
第一步 a被赋值{k1:1},设为对象A
第二步 b浅拷贝a，地址不变
第三步 .运算符优先级最高，所以a:{k1:1,k3:{k2:2}},b:{k1:1,k3:{k2:2}}
第四步 a被赋值 a:{k2:2}
所以输出以上结果
```
</details>

### versions 是一个项目的版本号列表，因多人维护，不规则，动手实现一个版本号处理函数

```js
var versions = ["1.45.0", "1.5", "6", "3.3.3.3.3.3.3"];
// 要求从小到大排序，注意'1.45'比'1.5'大
function sortVersion(versions) {
  // TODO
}
// => ['1.5','1.45.0','3.3.3.3.3.3','6']
```

<details>
<summary>查看答案</summary>

```js
var versions = ["1.45.0", "1.5", "6", "3.3.3.3.3.3.3"];
// 要求从小到大排序，注意'1.45'比'1.5'大
function sortVersion(versions) {
	if (!versions || !versions.length) return [];
	const result = versions.sort((a, b) => {
		const arrA = a.split('.'), arrB = b.split('.');
		const length = Math.max(a.length, b.length);
		for (let i = 0; i < length; i++) {
			const x = Number(arrA[i] || 0);
			const y = Number(arrB[i] || 0);
			if (x - y !== 0) return x - y;
		}
	});
	return result;
}
console.log(sortVersion(versions)); // [ '1.5', '1.45.0', '3.3.3.3.3.3.3', '6' ]
```

</details>


### 实现一个功能，发送请求 5s 时间后，如果没有数据返回，中断请求,提示错误

<br/>

<details>
<summary>查看答案</summary>

```js
function request(params, timeout = 5000) {
  const options = {
    timeout,
    ...params,
  };
  return new Promise((resolve, reject) => {
    let isTimeout = false;
    const timer = setTimeout(() => {
      // 超时就种植请求发送
      xhr.abort();
      isTimeout = true;
      reject(`This request is timeout: ${params.timeout}`);
    }, params.timeout);
    const xhr = new XMLHttpRequest();
    xhr.open("GET", options.url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        clearTimeout(timer);
        if (isTimeout) return;
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          resolve(xhr.responseText);
          console.log("request successfully!");
        } else {
          console.log("request failed!");
        }
      }
    };
    xhr.onerror = reject;
    xhr.send();
  });
}
var fetchData = async () => {
  const params = {
    timeout: 5000,
    url:
      "https://www.baidu.com/",
  };
  try {
    const res = await request(params);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
fetchData();
```
</details>

### 实现input框的autocomplete属性

<br/>

<details>
<summary>查看答案</summary>

```js

  window.onload = () => {

      const input = document.getElementById('input')
      const words = ['珠海', '广州', '上海', '杭州', '成都']
      input.addEventListener("input", debounce(function (e) {
        const value = e.target.value
        // 保证value只存在words里面的值
        const index = words.findIndex((item) => value && item.indexOf(value) !== -1)
        if (index !== -1) {
          e.target.value = words[index]
        }
      }, 500))

      function debounce(fn, wait = 500) {
        let timeout 
        return function () {
          if (timeout) {
            clearTimeout(timeout)
          }
          timeout = setTimeout(() => {
            fn.apply(this, [...arguments])
          }, wait)
        }
      }
    }
```

</details>

### 手写trim()函数，去掉首尾空格

<br/>

<details>
<summary>查看答案</summary>

```js
Function.prototype.trim = function(){
  return this.replace(/^\s+/,"").replace(/\s+$/,"")
}
```

</details>

### 查找字符串中出现最多的字符和个数

<br/>

<details>
<summary>查看答案</summary>

```js
let str = "abcabcabcbbccccc";
let num = 0;
let char = '';

 // 使其按照一定的次序排列
str = str.split('').sort().join('');
// "aaabbbbbcccccccc"

// 定义正则表达式
let re = /(\w)\1+/g;
str.replace(re,($0,$1) => {
    if(num < $0.length){
        num = $0.length;
        char = $1;        
    }
});
console.log(`字符最多的是${char}，出现了${num}次`);

···········
let map = new Map()
for(let c of str){
  map.set(c,map.has(c) ? map.get(c) + 1 : 1)
}
let res = []
res = [...map].sort((a,b)=>b[1]-a[1])
console.log(`字符最多的是${res[0][0]}，出现了${res[0][1]}次`);
```
</details>


### 对输入的字符串，去除其中的字符'b'以及连续出现的'a'和'c'

```js
  'aacbd' -> 'ad'
  'aabcd' -> 'ad'
  'aaabbccc' -> ''

```

```js
function fn(str){
  let res = str.replace(/b/g,'')
  while(res.match(/(ac)+/)){
    res = res.replace(/ac/,'')
  }
  return res
}

```


### 时间复杂度为O(n)的情况下随机不重复输出1~100

```js
let a = []
for(let i=0;i<100;i++){
  a[i] = i+1
}
a.sort(()=>0.5-Math.random())
console.log(a)
```
