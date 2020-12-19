# this指向问题、call/bind/apply

## 经典 this 指向问题

### this指向的表现形式有哪些

- 预编译过程中,this指向全局对象window;

- 在严格模式下"use strict",为undefined.

- 对象的方法里调用,this指向**调用该方法的对象**.谁调用它就指向谁

- **构造函数里的this**,指向**创建出来的实例**.

### 改变this指向的方法有哪些

- bind
- call
- apply 

### 例题分析

```js
function foo(){
  bar.apply(null,arguments)
}
function bar(){
  console.log(arguments)
}
foo(1,2,3,4,5)
```

<details>
<summary>查看答案</summary>

[1,2,3,4,5]
```js
因为bar.apply(null,arguments)相当于执行`bar(arguments)`,上层foo将实参列表传递过来，然后作为bar的实参传入，所以打印数组[1,2,3,4,5]
```

</details>
<br/>

**超经典试题**
```js
var name = "222"
var a = {
  name: "111",
  say: function(){
    console.log(this.name)
  }
}
var fun = a.say
fun() 
a.say()
var b = {
  name:"333",
  say:function (fun){
    fun()
  }
}
b.say(a.say)
b.say = a.say
b.say()
```

<details>
<summary>查看答案</summary>

222，111,222,333

```js
1. 首先分析fun被赋值了a对象里面的say方法，然后注意看fun没有谁调用，所以这个时候this走预编译，指向window,打印222
2. a.say()，谁调用指向谁，this指向a，所以打印111
3. b.say(a.say)，代表b对象的say方法的this指向b,然后a对象的say方法传入b的say方法，方法体作为参数，注意看此时fun()是谁调用的，没有谁调用它，所以也是走预编译，this依旧是window，打印222
4. b.say = a.say 将a的say方法赋给了b，然后b调用，this指向b，打印333
```

</details>
<br/>

```js
var a = 123
function print() {
  this.a = 234
  console.log(a)
}
print()
new print()
```

<details>
<summary>查看答案</summary>

234
123
```
1. 因为预编译this指向window，
print函数执行过程把GO的a替换成了234，所以打印234

2. new print() 相当于创建了基于print原型创建了this对象，this就等于new print(),a作为它属性，所以找GO上的a，打印123
```
</details>
<br/>

```js
var a =5
function test() {
  a =0
  alert(a)
  alert(this.a)
  var a
  alert(a)
}
```
请问运行test()和运行new test()结果分别是什么

<details>
<summary>查看答案</summary>

0,5,0

0，undefined，0

```js
test() 
1. 首先考虑预编译 GO{a:5,this:window}
2. test执行考虑函数预编译，AO{a: 0,this:window}
3. 继续执行 AO{a:0} 打印0
4. 打印5
5. 打印0

new test()
1. 首先考虑预编译 GO{a:5,this:window}
2. AO{a:undefined}
3. new test() = var this={__protp__:test.protptype},就是说此时test函数的this不指向window AO{a:undefined,this:{}}
4. 继续执行,AO{a:0}，打印0
5. 打印undefined
6. 打印 0
```

</details>
<br/>

```js
var bar ={
  a:"002"
}
function print() {
  bar.a = "a"
  Object.prototype.b = "b"
  return function inner(){
    console.log(bar.a)
    console.log（bar.b）
  }
}

print()()
```
<details>
<summary>查看答案</summary>

a,b

```js
1. 预编译 GO{bar:{a:"002"}}
2. GO{bar:{a:"a"}
3. Object的原型上添加b属性值为b
4. 执行print函数，打印a，然后首先找bar的b，找不到，去原型上找，打印b
}
```

</details>
<br/>

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

