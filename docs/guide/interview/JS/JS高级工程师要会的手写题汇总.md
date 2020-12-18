## 手撕代码题

[https://github.com/lf2021/Front-End-Interview/blob/master/08.%E9%9D%A2%E8%AF%95%E9%AB%98%E9%A2%91%E6%89%8B%E6%92%95%E4%BB%A3%E7%A0%81%E9%A2%98/%E9%9D%A2%E8%AF%95%E9%AB%98%E9%A2%91%E6%89%8B%E6%92%95%E4%BB%A3%E7%A0%81%E9%A2%98.md]()

## 手写题

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
  function queryURL(name){
      const search = location.search
      const p = new URLSearchParams(search)
      return p.get(name)
  }
```


## 场景题

### 写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b 的时间，然后写一个 myClear，停止上面的 mySetInterVal

<details>
<summary>查看答案</summary>

</details>

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

### 实现 add(1)(2)(3)

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

### 数组转为树

`[{id:1, parentId: 0}, {id:2, parentId:1},{id:3, parentId:1}]`
把这个数组从顶级分类递归查找子分类，最终构建一个树状数组。结果输出如下
`[{id:1, parentId: 0,children:[{id:2, parentId:1},{id:3, parentId:1}]}]`
parentId为0 的是根节点

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

<details>
<summary>查看答案</summary>

```js
var color = '#'+ Math.random().toString(16).substr(-6); 
document.body.style.backgroundColor = color;
```

</details>

### 手写代码实现 `kuai-shou-front-end=>KuaiShouFrontEnd`

<details>
<summary>查看答案</summary>

```js
function handler(str){
return str.split('-').map(item=>item.substr(0,1).toUpperCase()+item.substr(1)).join('')
}

console.log(handler('kuai-shou-front-end'))
```

</details>

### 设计一个函数，奇数次执行的时候打印 1，偶数次执行的时候打印 2

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

</detals>

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

## 实现input框的autocomplete属性

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
