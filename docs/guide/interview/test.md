# JS基础

## 引用类型和值类型

js中创建的赋值方式分为`引用类型`和`值类型`,引用类型能够保持状态不改变。

常见出现形式:

**值类型**
```js
let a = 100
let b = a
// b=100
```
常见的值类型包括字符串,布尔型,数值型
![](https://image.yangxiansheng.top/img/20200701122432.png?imagelist)

**引用类型**
```js
let a = {age:100}
let b = a
b.age = 200
// a= {age:200}
```
![](https://image.yangxiansheng.top/img/20200701122443.png?imagelist)

**常见的引用类型包含对象,数组空值等**

![](https://image.yangxiansheng.top/img/20200701143535.png?imagelist)

可见引用类型和值类型二者的区分,引用类型一但赋值之后`b`发生改变,`a`也发生改变。这是因为**用堆栈的角度分析,引用类型栈:key:a,value:内存地址,堆:key:内存地址,value:值,当a赋值给b,堆的值发生改变,内存地址是不变的,相应的b的值也会发生改变。而值类型则不同,他只是栈类型，值发生改变，key是不同的,值发生改变。**

## typeof运算符

**typeof**作用

- 识别所有的`值类型`
- 函数
- 还能判断是不是引用类型。

![](https://image.yangxiansheng.top/img/20200701144028.png?imagelist)

::: danger
`typeof`并不能完全识别引用类型,他只能判断是否是引用类型，不能继续识别
:::


## 深拷贝

深拷贝步骤分为: 1.保证类型为数组和对象 2.确定返回值 3.递归赋值

```js
let obj1 = {
  name:"121",
  address:"xxxx",
  array:['a','b','c'],
  obja:{
    a:{
      b:"1213"
    }
  }
}
// 浅拷贝
let obj2 = obj1
obj2.name="浅拷贝"
console.log(obj1.name) // 浅拷贝

// 深拷贝
let obj2 = deepClone(obj1)
obj2.name = "深拷贝"
console.log(obj1.name)

/**
 *  手写深拷贝 三个步骤: 1.判断类型 2.确定返回值 3.递归赋值
 * @param {Object} obj 
 */
function deepClone(obj = {}){
  // 保证是数组或对象
  if(typeof obj !== 'object' || obj === null){
    return obj
  }
  // 确定返回值
  let result 
  if(obj instanceof Array){
    result = []
  }else{
    result = {}
  }
  // 递归赋值 属性必须不是原型拥有
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
        // 递归保证深层结构赋值
        result[key] = deepClone(obj[key])
    }
  }
  return result

}
```
## 变量计算-类型转换

通常来说,两个等号会尽量保证类型相同,所以会进行类型转换。

**两个等号的唯一使用场景**: 判断对象属性是否为`null`,其他情况全部使用`===`

```js
const obj = {age:10}
// 这句等同于  obj.a === 'undefined' || obj.a === null
if(obj.a == null){

}
```

`truly`变量和`falsly`变量,常见的有:

![20200701153829.png](https://raw.githubusercontent.com/imageList/imglist/master/20200701153829.png)

使用场景经常为逻辑运算符

```js
console.log('' && 'abc') // ''
console.log(10 || 0) // 0
```
## 原型和原型链

**类型判断-`instanceof`**

1. 判断引用类型
2. `Object`可以充当任意`class`的父类

**显式原型和隐式原型之间的关系：**

> js引擎自动会处理, `class`也是一个`function`

- 每个`class`都有一个显式原型`prototype`,这里存储方法或属性。
- 每个实例都有一个隐式原型`__proto__`
- 实例的隐式原型指向`class`的显式原型,实例就有用了属性和方法
- 每个函数都有一个显示原型，下面的构造函数指向函数本身

这里**Student**是定义的类,然后传入属性`name`,`number`,再定义一个函数,**根据关系类`Student`具有显式原型`prototype`存放方法，然后实例化的时候隐式原型指向这个原型,从而调用方法**。

![20200701163319.png](https://raw.githubusercontent.com/imageList/imglist/master/20200701163319.png)


```js
console.log(Student.prototype) // 打印出student:{constructor:{},sayHi:}
console.log(xialuo.__proto__) // 同样打印出刚刚的结果
console.log(Student.prototype === xialuo.__proto__) // true
console.log(Student.prototype.constructor === Student)
```

**原型链**

每个显式原型下也有一个隐式原型，指向规则和上面一样。**在每一层首先寻找自身的属性或方法,如果没有通过隐式原型去找上一层的显示原型的方法,依次形成一个链**

当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止。

`Student`的显式原型下有一个`__proto__`，指向`People`的显式原型`prtotype`

![20200701165830.png](https://raw.githubusercontent.com/imageList/imglist/master/20200701165830.png)

原型链的最高层`Object`的显示原型拥有`toString`和`hasOwnProperty`方法和自身隐式原型

![20200701171044.png](https://raw.githubusercontent.com/imageList/imglist/master/20200701171044.png)

**解读instance of**

`a instance of b` ,代表`a`的隐式原型顺着原型链向上找,能否找到对应的`b`的显示原型,如果能找到对应关系,返回真,否则为假。

**手写Jquery部分实现**

借助`class`操作dom,并扩展插件机制和方法

```js
// 手写jquery简单实现 基本步骤就是获取dom,遍历并且赋值被this,书写遍历,监听,获取方法
class Jquery{
  constructor(selector){
    this.selector = selector
    const ele = document.querySelectorAll(selector)
    // 遍历赋值this
    for(let i = 0;i < ele.length;i++){
      this[i] = ele[i]
    }
    this.length = this.length
  }
  // 方法

  get(index){
    return this[index]
  }

  each(fn){
    for(let i = 0;i < this.length;i++){
      // 回调方法
      const elem = this[i]
      fn(elem)
    }
  }
  on(type,fn){
    this.each(elem=>{
      elem.addEventListener(type,fn)
    })
  }
}
const jq = new Jquery('p')
p.get(1)
p.on('click',()=>{alert('1')})
// 原型上扩展插件机制
Jquery.prototype.newfun =  function(q){
  alert(q)
}
// 造轮子的原理  就是继承原类扩展自身方法
```

## 作用域与闭包(this,作用域)

作用域的定义: [[scope]]: javascript函数都可以视为一个对象，对象都会有属性,但是有些属性是隐示的的，只提供给js引擎使用的。这里的scope就是其中的一个。
scope:存储执行上下文的集合，简称作用域。

**自由变量查找永远都是作用域链顶部向下查找**

```js
function a(){
  function b(){
    var b = 234
    console.log(b)
  }
  var a = 123
  b()
}
var glob = 333
a()
```
已作用域和作用域链结合执行上下文的角度分析:

::: tip
首先,定义a函数时,产生全局上下文对象简称-GO。GO中存放了this,window,document,a函数，glob变量。

![](https://image.yangxiansheng.top/img/20200831212213.png?imagelist)

此时，a的作用域链只有一个，那就是全局对象。
接着a函数执行，产生一个执行上下文对象。AO，AO存放this,window,document,b函数,a变量。
此时，a的作用域链顶部就添加了一个AO。

![](https://image.yangxiansheng.top/img/20200831212614.png?imagelist)

接下来就是b定义，a的执行就导致了b的定义，所以b的作用域是基于a的作用域链的基础上的。

![](https://image.yangxiansheng.top/img/20200831213050.png?imagelist)

然后就是b执行，b执行产生的执行期上下文对象是放置顶端的。

![](https://image.yangxiansheng.top/img/20200831213216.png?imagelist)

接下来就是销毁阶段，当a执行完之后，销毁执行上下文，AO。回到被定义状态，b的作用域也相继被销毁。再次执行就会再次生成全新的AO-形成全新的作用域链。
:::

**引出闭包的概念**

还有一种情况就是，a在执行完成之后返回b函数。说明这一步并未直接砍断b的作用域链和执行上下文对象的联系。

内部函数被保存到了外部都会产生闭包，这里`return`出去b函数，及时保存在了外部

![](https://image.yangxiansheng.top/img/20200831221442.png?imagelist)


::: tip 产生闭包原因和缺点

首选a定义，产生`GO`，a执行，产生`aAO`保存在作用域链的0位，然后导致b的定义，b在a的作用域链基础上再加入自己的`AO`，但是这里为定义`num`，所以b寻找num变量是通过寻找`aAO`的num变量的。接下来就是a执行完成，砍断作用域链和执行上下全文集合联系，但是此时没有砍断b的作用域链和执行上下文对象的联系(即b并未执行完，所以b作用域链和执行上下文联系依然存在，只是a的销毁了)。执行demo(),`num+1`,`aAO`里`num`加一之后同理。所以输出102。 销毁顺序：a-b 执行shu'x
:::

所以这就是闭包导致作用域链不释放的缺点的原因 内存泄漏： 剩下内存变小，原有空间不变，但是闭包的作用域链未释放

![](https://image.yangxiansheng.top/img/20200831223947.png?imagelist)

作用大体上分为: 静态作用域和动态作用域。js采用的是静态作用域 ,而静态作用域在定义的时候就已经决定了。

```js
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar(); // 1   执行顺序显示函数内部，然后向上寻找上层作用域的自由变量，这一步是在函数定义的部分决定的。

// bar定义 --global value:1
// bar执行  --- 0 bAO(value:2) 1Go(value:1)
// foo定义  --- 0 GO(value:1)
// 执行     --- 0 fAO(value:undefined) 1GO(value:1)

// 所以输出 1

```

**作用域**

变量在函数体内部具有一个作用区域，超出区域就不能进行调用。

词法作用域分为: `全局作用域`，`函数作用域`和`块级作用域`。

全局作用域和函数作用域在上面就有使用到,然后块级作用域主要使用到的场景为判断语句中定义的变量,不能超出大括号区域使用,否则报错。

```js
if( a > 0){
  let i = 1;
}
console.log(i) // error
```

> 自由变量: 当前作用域下未定义,但是向上层级(父级作用域)能够找到并且合法的变量。比如这里的`fn3`中的 `a` `a1` `a2` 都是在本函数作用域下未定义,但是向上层级能够找到,所以他们是自由变量。

例题: 

> 这种情况,点击每个`a`都会弹出对应的`i`，这是因为块级作用域,每次循环都会形成新的块,`i`就会不同,但是如果`i`定义为全局作用域,永远都会弹出`10`，函数没执行但是已经循环完。

**闭包**

两个题理解闭包的概念

```js
function create(){
  const a= 200
  return function(){
    console.log(a)
  }
}

const x = create()
const a = 100
x() // 打印 200

.........

function print(fn){
  const a = 100
  fn()
}

const a = 200
function fn(){
  console.log(a)
}
print(fn)
```

::: tip

这里会发现,**不论函数在哪里执行,自由变量的查找,都是定义函数的地方向上级作用域查找出的变量值**。而不是执行向上级作用域查找。所以都打印出了`200`。这就是闭包的概念。
:::

**闭包的常见应用场景:**

1. 使用闭包控制数据访问,只提供API访问数据。

```js
function createCache(){
  const data = {} //外界无法访问这个数据,只能调用get函数获取值
  return {
    get: function(key){
      return data[key]
    },
    set:function(key,value){
      data[key] = value
    }
  }
}
```
2. 

**this指向问题**

调用场景有很多种,函数内,箭头函数内,class内等等

::: tip

口诀: `this`指向是在函数执行的时候确认的,而不是在函数定义的时候确认的。 
:::

几种情况 **function**,**call**,**bind**，箭头函数，普通函数，类

```js
function test(){
  console.log(this)
}

// one
test() //window

// two
test.call({age:11}) // call改变this指向直接执行 {age:11}

// three
const test2 = test.bind({age:12}) //bind改变this指向后需要接收后再执行
test2() // {age:12}

// four
class student{
  fun1(){
    setTimeout(()=>{
      console.log(this) //箭头函数this指向父级作用域 -当前对象
    })
  }
}

// five
class student{
  fun1(){
    setTimeout(function(){
      console.log(this)  // window 执行阶段已跳出student管控
    })
  }
}

// six
class student{
  fun1(){
    console.log(this) // student对象
  }
}

```


```js
var a = 2
var b = {
  a:3,
  c:function(){
    console.log(this.a)
  }
  d:()=>{
    console.log(this.a)
  }
}

var aa = b.c
aa() // 调用方决定this指向-window  2
b.c() // 3
b.d() // 2  箭头函数作用域由向上寻找拥有作用域的函数决定 -window
```

实现一个class无法生成构造函数，new就会报错，就类似于箭头函数无法被new一样的报错
```js
class NotConstructor {
  constructor(){
    if(this instanceof NotConstructor){
      throw new Error('cant new constructor')
    }
  }
}
```

**经典问题**

每个函数都是`Function`构造函数的实例对象,所以用`Function.prototype.fn`函数中`this`一定指向实例对象的。

```js
function Person() {
  this.name = 'ClarenceC';
}
 
Person.prototype.greet = function(){
  console.log('hello ' + this.name);
}

var person = new Person();
console.log(person.name)

person.greet()
```
Person是一个构造函数,`person.greet`中的`this`指向`person`实例对象

```js
Function.prototype.mycall = function(context,...args){
  const context = context || window
  context.fn = this // this指向context中的函数实例对象
  context.fn()
}
```

**手写bind函数**

书写`bind`函数步骤分为:

- 拆解参数
- 获取`this`和参数
- 获取调用对象
- 返回函数。

在`Function`原型上扩展插件即可,将一个列表转换为数组:**`Array.prototype.slice.call(params)`**

```js
Function.prototype.bind1 = function(){
  const args = Array.prototype.slice.call(arguments)
  const t = args.shift()
  // Function是个class this指向对象本身
  const self = this
  return function(){
    // apply用法和call相似
    return self.apply(t,args)
  }
}
function test1 (a,b,c){
  console.log(this,a,b,c)
}
const test2 = test1.bin1({age:11},10,20,30)
test2() // {age:11} 10 20 30
```

## 执行上下文

`js`代码当遇到一个函数执行时，就会进入准备工作，生成执行上下文。

> 函数在每次执行的时都会产生一个执行上下文对象-AO,一个执行上下文对象定义一个执行环境，执行过程中每个执行上下文对象都是独一无二的，所以每次调用都会产生不同的执行上下文对象，当函数执行完成，就会被销毁。

执行代码分为: 全局代码，函数代码，eval代码。当函数遇到函数执行代码时，就会创建一个执行上下文，过程是先把代码亚入`可执行上下文栈`,然后等待函数执行完出栈。

之前的例子

```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();

var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();
```
执行过程
```js

// 伪代码
ECStack.push(checkScope,checkContext)
ECStack.push(f,fContext)
ECStack.pop()
ECStack.pop()


// checkscope()() 就相当于
// var f = checkscope(); 函数执行完成之后返回一个函数名
// f();  
ECStack.push(<checkscope> functionContext);
ECStack.pop();
ECStack.push(<f> functionContext);
ECStack.pop();

//栈底部会有全局执行上下文
```

**执行上下文和变量对象的结合**

每个执行上下文拥有三个重要的属性:

- 变量对象
- 作用域链
- this

变量对象: **变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明**

全局上下文: 全局上下文中的变量对象就是全局对象呐

函数上下文: 只有到当进入一个执行上下文中，这个执行上下文的变量对象才会被激活。

![](https://image.yangxiansheng.top/img/20200831160746.png?imagelist)

```js
function foo(a) {
  var b = 2;
  function c() {}
  var d = function() {};

  b = 3;

}

foo(1);
```
**重点**: 代码执行分为两个阶段。执行过程中会生成执行上下文，所以分为进入`执行上下文`和`代码执行`两个阶段。

进入执行上下文之后，AO

```js
AO = {
  arguments:{
    0:1,
    length:1
  },
  b:undefined,
  c:函数渲染,
  d:undefined
}
```

接下来就是代码执行阶段:,AO会被修改

```js
AO = {
  arguments:{
    0:1,
    length:1
  },
  b:3,
  c:函数渲染,
  d:函数渲染
}
```
**变量提升和函数提升**

当变量提升和函数提升同名并且同时存在，此时函数提升就不会被影响

活动对象和变量对象其实是一个东西，只是变量对象是规范上的或者说是引擎实现上的，不可在 JavaScript 环境中访问，只有到当进入一个执行上下文中，这个执行上下文的变量对象才会被激活，所以才叫 activation object 呐，而只有被激活的变量对象，也就是活动对象上的各种属性才能被访问。

未进入执行阶段之前，变量对象(VO)中的属性都不能访问！但是进入执行阶段之后，变量对象(VO)转变为了活动对象(AO)，里面的属性都能被访问了，然后开始进行执行阶段的操作。

它们其实都是同一个对象，只是处于执行上下文的不同生命周期。
```js
console.log(foo); // 打印函数

function foo(){
    console.log("foo");
}

var foo = 1;
```

之前的那道例题答案
```js
var foo = function () {

    console.log('foo1');

}

foo();  // foo1

var foo = function () {

    console.log('foo2');

}

foo(); // foo2


。。。。。。。。

function foo() {

    console.log('foo1');

}

foo();  // foo2

function foo() {

    console.log('foo2');

}

foo(); // foo2
```

第一个例子是变量提升。第二个是函数提升

```js
var foo;
foo = function () {
    console.log('foo1');
}
foo();  // foo1

foo = function () {
    console.log('foo2');
}
foo(); // foo2


var foo;
foo = function () {
    console.log('foo1');
}
foo = function () {
    console.log('foo2');
}
foo();  // foo2
foo(); // foo2

```


**从代码分析执行上下文的三个重要属性**

- 变量对象

`变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明`

```js
console.log(foo);

function foo(){
    console.log("foo");
}

var foo = 1;
```

**执行上下文阶段分为：进入执行上下文和代码执行阶段**

> 准备阶段：

由于函数提升和变量提升代码变成

```js
function foo(){

}
var foo 
console.log(foo)
foo = 1
```
> 开始创建执行上下文

进入执行上下文之前：由于首先会处理函数声明，其次会处理变量声明，如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性。

所以此时VO

```js
Vo = {
  agruments:{
    length:0
  },
  foo:reference to function foo(){}
}
```


然后执行代码`console.log`,查找到VO，输出foo

接着执行，改变`VO`

- 作用域链
- this


## 异步和Promise

![20200703151544.png](https://raw.githubusercontent.com/imageList/imglist/master/20200703151544.png)

**异步**

js是单线程语言,同时只能做一件事。

异步就是不会阻塞其他进程的进行,不会阻塞其他代码的执行。

异步出现的场景: `网络请求`和`定时任务`


**Pormise**

`Promise`的出现有效的解决了回调地狱的出现。

模拟`ajsx`请求

```js
function getData(url){
  return new Promise((resolve,reject)=>{
    $.ajax({
      url,
      success(data){
        resolve(data)
      },
      error(err){
        reject(err)
      }
    })
  })
}

.....

const url1 = 'data1.json'
const url2 = 'data2.json'
const url3 = 'data3.json'

getData(url1).then((data)=>{
  console.log(data)
  return getData(url2)
}).then((data)=>{
  console.log(data)
  return getData(url3)
}).then((data)=>{
  console.log(data)
}).catch(errpr=>{
  console.log(error)
})
```
使用`Promise`模拟加载多张图片

```js
function loadimg(src){
  return new Promise((resovle,reject)=>{
    const img =  document.createElement('img')
    img.src = src
    // 回调
    img.onload=()=>{
      resovle(img)
    }
    img.onerror=()=>{
      reject(new Error('加载失败'))
    }
  })
}
// 展示到body
function showImg(imgs){
   imgs.forEach(img=>{
    document.body.appendChild(img)
  })
}

// 请求多张图片地址并加载(模拟懒加载)

Promise.all([
  Loadimg(src1)
  Loadimg(src2)
  Loadimg(src3)
  Loadimg(src4)
]).then(imgs=>showImg(imgs))

```




## 手写题

包含`js`基础,`js`进阶,`HTML`,`CSS`,`HTTP`,`浏览器`等面试题汇总


### 手写代码专题

[专题系列目录](https://github.com/mqyqingfeng/Blog)

[https://juejin.im/post/6844903856489365518#heading-12](https://juejin.im/post/6844903856489365518#heading-12)

### 手写深拷贝

```js
function deepclone(target = {}){
  if(typeof target !== 'object' || target == null){
    return target
  }
  let result
  if(target instanceof Array){
    result = []
  }else{
    result = {}
  }
  for(let key in obj){
    // 避免原型属性影响
    if(obj.hasOwnProperty(key)){
      result[key] = deepclone(obj[key])
    }
  }
}
```

### 利用原型链手写Jquery简单实现，考虑插件和扩展性

获取`dom`,遍历赋值给`this`,最后书写方法
```js
class Jquery{
  constructor(selector){
    this.selector = selector
    const ele = document.querySelector(selector)
    for(let i =0;i < ele.length;i++){
      this[i] = ele[i]
    }
    this.length = ele.length
  }
  get(index){
    return this[index]
  },
  each(fn){
    for(let i =0;i < this.length; i++){
      const element = this[i]
      fn(element)
    }
  },
  on(type,fn){
    this.forEach(element=>{
      element.addEventListener(type,fn)
    })
  }
}

// 插件机制扩展原型方法
Jquery.prototype.f1 = function(){

}
```

### 实现一个call,bind,apply

手写`bind`: 在`Function`原型扩展插件方法,第一步拆解参数,转为数组,提取第一项为`this`,剩余参数。返回一个`call`方法

```js
Function.prototype.bind1 = function(){
  const args = Array.prototype.slice.call(arguments)
  // 获取调用方
  const self = this
  const t = args.shift()
  return function(){
    return self.call(t,args)
  }
}
```
手写`call`,`apply`非常相似只需要返回函数即可,不需要执行。

把他想成这样就行
```js
context = {
  a:10,
  bar:function(){
    console.log(this)
  }
}

// 这里如果bar()在对象充当属性,this就会指向context,然后再删除方法即可
// 每个函数都是 构造函数 Function 的实例对象，bar.call 或者 bar.apply 函数中的 this 自然也是指向该实例对象即 bar 的
```
- 取出`bar`函数
- 判断是否是非函数
- 定义函数`context[simbol实例] = fun`,一定要取`simbol`,因为`fun`可能是原有的函数
- 执行然后删除对象函数,返回结果

一句话总结，把调用方需要绑定的值看成一个对象，然后把调用方放到这个对象里面充当属性，然后执行，最后删除掉。

```js
/**
 * 实现call
 * @param {Object} context 
 * @param  {Object} args 
 */
Function.prototype.mycall = function(context,...args){
  context =  context || window
  let caller = Symbol('caller')
  // 获取调用call的函数
  context[caller] = this
  let res = context[caller](...args)
  delete context[caller]
  return res
}
```

实现apply

```js
/**
 * 实现apply
 * @param {*} content 
 */
Function.prototype.myapply = function(content){
  let arg = Array.prototype.slice.call(arguments).slice(1)
  if(!arg instanceof Array){throw new TypeError()}
  content = content || window
  let caller = Symbol('caller')
  content[caller] = this
  let res = content[caller](arg)
  delete content[caller]
  return res
}
```

### 手写Promise加载请求和多张图片

```js
function loadImg(src){
  return new Promise((resolve,reject)=>{
    const img = document.createElement('img')
    img.src = src
    img.onload  = function(){
      resolve(img)
    }
    img.onerror = function(){
      reject(throw new Error('failed load'))
    }
  })
}

function showImg(imgs){
  imgs.forEach(img=>{
    document.body.append(img)
  })
}

Promise.all([
  loadImg(src1),loadImg(src2)...
]).then(imgs=>{
  showImg(imgs)
}).catch((error)=>{
  console.log(error)
})

```

### 手写Promise Pormise.all Promise.race

### js实现一个日历

### 手写repeat

### 手写JSONP

### 将多维数组扁平化？

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

### 实现防抖函数（debounce）待优化

```js
export function debounce (func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
```

适用场景：

- 按钮提交场景：防止多次提交按钮，只执行最后提交的一次
- 服务端验证场景：表单验证需要服务端配合，只执行一段连续的输入事件的最后一次，还有搜索联想词功能类似



### 数组去重

```js
function unique(arr) {
  return [...new Set(arr)];
}

function unique(arr) {
  // 当前值 下标 数组
  return arr.filter((v, i, a) => {
    return a.indexOf(v) === i;
  })
}

```
### 洗牌算法和随机数

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
### 实现节流函数（throttle）

```js
// 节流函数
const throttle = (fn, delay = 500) => {
  let flag = true;
  return (...args) => {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, delay);
  };
};
```
适用场景：

- 拖拽场景：固定时间内只执行一次，防止超高频次触发位置变动
- 缩放场景：监控浏览器resize
- 动画场景：避免短时间内多次触发动画引起性能问题


### 实现instanceOf

```js
// 模拟 instanceof
function instance_of(L, R) {
  //L 表示左表达式，R 表示右表达式
  var O = R.prototype; // 取 R 的显示原型
  L = L.__proto__; // 取 L 的隐式原型
  while (true) {
    if (L === null) return false;
    if (O === L)
      // 这里重点：当 O 严格等于 L 时，返回 true
      return true;
    L = L.__proto__;
  }
}

```

### 模拟new

```js
function createNew(Ctor, ...args) {
  const obj = Object.create(Ctor.prototype);
  const ret = Ctur.apply(obj, args);
  return ret instanceof Object ? ret : obj;
}

1. 将构造函数的原型赋值给新建的obj的隐式原型__proto__。
2. 在obj下执行构造函数，并传入参数，
   这个时候构造函数内的this就是obj。
3. 如果这个'构造函数'没有return对象格式的结果，
   返回新创建的obj。

function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.getName = function() {
  console.log(this.name);
}

const xm = createNew(Person, 'xiaoming', 22);

```

### 解析 URL Params 为对象(待优化)

```js
let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
parseParam(url)
/* 结果
{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得 key 约定为 true
}
*/
```

```js
function parseParam(url) {
  const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
  const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
  let paramsObj = {};
  // 将 params 存到对象中
  paramsArr.forEach(param => {
    if (/=/.test(param)) { // 处理有 value 的参数
      let [key, val] = param.split('='); // 分割 key 和 value
      val = decodeURIComponent(val); // 解码
      val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字

      if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else { // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val;
      }
    } else { // 处理没有 value 的参数
      paramsObj[param] = true;
    }
  })

  return paramsObj;
}
```
[https://juejin.im/post/6844903697198088199](https://juejin.im/post/6844903697198088199)

### 查找字符串中出现最多的字符和个数

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

```

###  给了一个具体的需求让写html+css，需求大概是模块水平垂直居中对齐+不定高，按文字自适应+带灰色遮罩+弹出动画

### 给一个ul下面插入100个li应该怎么插入，如何优化dom操作

### 有一个有一百万个url的数组，如何从这一百万个url里获得资源(promise.all)


### 手写sleep函数


### 实现发布订阅模式，具有以下公开方法。

```js
class EventEmit {
  constructor(elem, props) {
    // your code
  }

  // 注册事件的回调函数
  on(event, callback) {
    // your code
  }

  // 注册事件的回调函数，只执行一次
  once(event, callback) {
    // your code
  }

  // 触发注册的事件回调函数执行
  emit(event, ...args) {
    // your code
  }

  // 删除一个回调函数
  remove(event, callback) {
    // your code
  }
}
```

### 积攒的小题目

### 字符串类型转换

![](https://image.yangxiansheng.top/img/20200908124556.png)

### opacity visibility display:none区别

![](https://image.yangxiansheng.top/img/20200908125157.png)

### 笔试收集的题

![](https://image.yangxiansheng.top/img/20200908170624.png)

![](https://image.yangxiansheng.top/img/20200908170757.png)

![](https://image.yangxiansheng.top/img/20200908170902.png)

![](https://image.yangxiansheng.top/img/20200908171017.png)

![](https://image.yangxiansheng.top/img/20200908213923.png)

![](https://image.yangxiansheng.top/img/20200913100416.png)

![](https://image.yangxiansheng.top/img/20200913100507.png)

![](https://image.yangxiansheng.top/img/20200913191825.png)

![](https://image.yangxiansheng.top/img/20200913191845.png)


## 理论题(背诵理解)

### 题是真的多

[https://q.shanyue.tech/fe/](https://q.shanyue.tech/fe/)


### typeof作用

- 判断值类型变量的类型
- 判断是否是引用类型,但是无法具体判断类型
- 可以判断`function` 

封装`typeof`

```js
function mytypeof(target){
  var ret = typeof(target)
  const typeMap = {
    "[object Array]":"Array",
    "[object Object]":"Object",
    "[object Number]":"number-Object",
    "[object Boolean]":"boolean",
    "[object String]":"string-Object"
  }
  if(target == null){
    return 'null'
  }
  if(ret === "object"){
    const str =Object.prototype.toString.call(target)
    return typeMap[str]
  }else{
    return ret
  }
}
```


### 谈一谈js类型转换

[类型转换教程](https://ke.qq.com/webcourse/index.html#cid=231577&term_id=100273169&taid=1464755646859417&type=1024&vid=5285890787926302315)


显示类型转换:

- Number(mix): 转为数字，非数字输出NAN。 注意 Number(null) ,Numnber(false),Number("")都是输出0，undefined输出 NaN

- parseInt(string,raidx) : 转为整形数字 ，非数字输出NAN,第二个参数是基于某个进制转为十进制，比如parseInt('b',16) ,输出11, parseInt('100px')=> 100

- parseFloat(string) 转为浮点

- toString() 转为字符串  `undefined`和`null`不能使用这个方法，因为没有原型，**如果添加参数则代表转为目标进制** ,111.toString(16) 10进制转为16进制，所以如果将一个二进制数转为目标进制，则可以先使用parseInt转为十进制，然后使用`toString()`转为目标进制

- String(string) 转为字符串,任何类型都会转为字符串

- Boolean  **js种六种值转为`false` (`undefined` ,`null` ,`''` ,`NAN` ,`0`,false)**,其他的都是true

隐示类型转换

- isNaN :判断不是数字，其实就是转为Number(s),然后判断是否是数字
- `+`,`-`,`++`,`--`

```js
var a = '233'
a++ a-- // ++ 首先会调用Number(a)转为数字，然后在++，即使转不成数字也会转为number类型

+a // 都会转换为数字类型,typeof为number

a = "a" + 2
// 当加号两侧有一个东西是字符串，就会调用string将两个都变成字符串

-,%,*   a = '1'* 1 // a =1
// 也是先转换为number类型

&& || !

> < // “3”>"2" 比阿斯克码序号, "3" > 2，转为number比大小

== !=
// 特殊情况 undefined == null

```

**一种非常特殊的情况，正常情况下a不定义，使用时会报错的。但是当且仅当使用typeof(a)。不会报错。返回`undefined`**

> typeof(a) ===》 undefined。 typeof(typeof(a)) ===》 string

**==转换规则**

- 一 `string`,一 `number` - `string`先转number，再比较值
- 类型相同 - 比大小
- 一个是`Boolean`类型。 - boolean转为数字类型
- 一个是`Object` - Object转为字符串 ==> '[object Object]'

### instanceof能否判断基本数据类型？

可以，但是需要自定义

```js
class PrimitiveNumber {
  static [Symbol.hasInstance](x) {
    return typeof x === 'number'
  }
}
console.log(111 instanceof PrimitiveNumber) // true
```

### Object.is和===的区别？

Object在严格等于的基础上修复了一些特殊情况下的失误，具体来说就是+0和-0，NaN和NaN。

```js

function is(x, y) {
  if (x === y) {
    //运行到1/x === 1/y的时候x和y都为0，但是1/+0 = +Infinity， 1/-0 = -Infinity, 是不一样的
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    //NaN===NaN是false,这是不对的，我们在这里做一个拦截，x !== x，那么一定是 NaN, y 同理
    //两个都是NaN的时候返回true
    return x !== x && y !== y;
  }
```

### 何时使用 === 和 ==, == 和 ===有什么区别？

![](https://image.yangxiansheng.top/img/20200914224342.png?imglist)

在判断对象属性是否为空时使用`==`,其他一律使用`===`，因为`==`会引起类型转换。

```js
if(data.a == null){

}
// 等效于
if(data.a === 'undefined' || data.a === null)
```
实现NAN (如果转为Number之后，然后用字符串拼接 == NaN则成立)

![](https://image.yangxiansheng.top/img/20200831230215.png?imagelist)

### 值类型和引用类型区别

一般的值类型,他是可以用`typeof`鉴定类型的,并且对应的是一个栈类型,变量名为`key`,值为`value`。

```js
const a = 1 // Number
const a = 'a' // String
const a = new Symbol() // symbol
const a = !!a // boolean
let a // undefined
```

引用类型,一般指的就是对象,他可以用`typeof`判断是否是引用类型,但是无法判断具体类型,对应的是一个堆栈模型,栈中`key`是对象名,`value`对应内存地址,然后堆模型中一个内存地址对应一个`value`。

这也就是会出现这种情况的原因

```js
const a = 100
let b 
b = a
b = 300
console.log(a) // 100

const x = {a:10}
let y 
y = x
y = {a:20}
console.log(x) // {a:20}
```

### 构造函数的原理

构造函数和普通函数并无区别，但是如果使用`new`操作符实例化一个对象，这个函数就被视为一个构造函数了

new之后，内部执行机制。

首先隐式创建一个`var this =  {__proto__:Constructor.prototype}`,然后执行赋值`this.xxx = xxx`,最后返回`this`。

```js
function A(){
  // 隐式 var this ={} 
  this.a = a
}
var a = new A()
 // 隐式 return this
```

也就是隐式的将传入的`obj`的隐式原型赋值为构造函数的显示原型。然后绑定`this`。最后返回，判断最后执行apply的变量是否是object，如果不是返回obj

### 原型对象和构造函数有何关系？

在JavaScript中，每当定义一个函数数据类型(普通函数、类)时候，都会天生自带一个prototype属性，这个属性指向函数的原型对象。

当函数经过new调用时，这个函数就成为了构造函数，返回一个全新的实例对象，这个实例对象有一个__proto__属性，指向构造函数的原型对象。



### 解释原型和原型链,并解释instanceof原理

使用到原型方法`instanceof`

原型: 以一个`student`,`people`这个两个类来说,假设`student`是继承于`people`这个类的。现在有一个`student`的原型`stu1`,那么`stu1`就有一个隐式原型`__proto__`指向`student`类的显式原型`prototype`。等同于
`stu1.__proto__ === Student.prototype`,那么stu1就可以调用`Student`的方法和属性。

原型链:**每个对象都有 __proto__ 属性，此属性指向该对象的构造函数的原型。** 现在`stu1`的隐式原型指向了`Student`的显式原型,然后`Student`的显式原型也有一个隐式原型,他指向`People`的显式原型。所有`Student`类包括实例可以使用`People`的方法,最后`People`的显示原型的隐式原型指向最高层`Object`的显示原型,他的隐式原型指向`null`。

`instanceof`原理就迎刃而解,首先如果判断`Array`,`a`如果是数组，`a`的隐式原型顺着原型链向上找,找到`Array`这个`class`即为数组。


### this使用场景,如何取值(待补充学习)
`this`取值原则: this去向有执行函数的的地方决定。

大致可以分为六种:
```js
function test(){
  console.log(this)
}

// one
test() //window

// two
test.call({age:11}) // call改变this指向直接执行 {age:11}

// three
const test2 = test.bind({age:12}) //bind改变this指向后需要接收后再执行
test2() // {age:12}

// four
class student{
  fun1(){
    setTimeout(()=>{
      console.log(this) //箭头函数this指向父级作用域 -当前对象
    })
  }
}

// five
class student{
  fun1(){
    setTimeout(function(){
      console.log(this)  // window 执行阶段已跳出student管控
    })
  }
}

// six
class student{
  fun1(){
    console.log(this) // student对象
  }
}
```

例题:


```js
var name = '222'
var a = {
  name : "111",
  say :function(){
     console.log(this.name)
  }
}
var b  = {
  name: "333",
  say:function(func){
    func()
  }
}

var fun = a.say
fun() // 222
a.say() //111
b.say(a.say) //！现将函数拷过来 fun执行，但是无法确定是谁调用fun 所以是222，如果是this.fun 就是333
b.say = a.say
b.say()//
```

```js
var a = 2
function test(){
  this.a =3
  console.log(a)
}
test() //Go的a改成了3 this指向window
new test() // var this = Object.create(test.prototype),this指向改了
```

```js
var a = 5
function test(){
  a = 0
  console.log(a) // 0
  console.log(this.a) //5
  var a
  console.log(a)  //0
}
```
执行test() 打印0，5，0。执行new test() 打印0 undefined 0，因为new的时候讲this赋值为`Object.create(test.prototype)`并没有a

```js
this = {
  __proto__ :test.prototype
}
```

![](https://image.yangxiansheng.top/img/20200831233916.png?imagelist)

打印结果: a,b


![](https://image.yangxiansheng.top/img/20200917151323.png?imglist)

1，2，1

每次new都会构建一个独一无二的对象

![](https://image.yangxiansheng.top/img/20200917151520.png?imglist)

1，4，4 变量提升覆盖

**逗号操作符**

声明一个变量使用逗号隔开返回后者

var num = (1,2) // num = 2

```js
var f = (
  function a(){return '1'},
  function b(){return 2}
)()
typeof f //number
```

**typeof可以检验不存在的变量**

```js
var a = 1
if(function f(){}){
  a+= typeof(f) //f放在(),相当于未定义 所以返回1undefined
}
```

### 闭包和闭包作用

闭包: 闭包是指有权访问另外一个函数作用域中的变量的函数，

举例

```js
function create(){
  const a= 200
  return function(){
    console.log(a)
  }
}

const x = create()
const a = 100
x() // 打印 200
```

闭包的作用: 闭包最大的作用就是`隐藏变量`，**闭包的一大特性就是内部函数总是可以访问其所在的外部函数中声明的参数和变量**,只提供API访问数据。

```js
function createCache(){
  const data = {} //外界无法访问这个数据,只能调用get函数获取值
  return {
    get: function(key){
      return data[key]
    },
    set:function(key,value){
      data[key] = value
    }
  }
}
```

### 闭包有哪些表现形式?

- 返回一个函数
- 作为函数参数传递

```js
var a = 1;
function foo(){
  var a = 2;
  function baz(){
    console.log(a);
  }
  bar(baz);
}
function bar(fn){
  // 这就是闭包
  fn();
}
// 输出2，而不是1
foo();
```
- 在定时器、事件监听、Ajax请求、跨窗口通信、Web Workers或者任何异步中，只要使用了回调函数，实际上就是在使用闭包。

- IIFE(立即执行函数表达式)创建闭包, 保存了全局作用域window和当前函数的作用域，因此可以全局的变量。

```js
var a = 2;
(function IIFE(){
  // 输出2
  console.log(a);
})();

```




### 谈谈你对作用域和作用域链的理解

**作用域分为**: `全局作用域`,`函数作用域`,`块级作用域`。全局作用定义在外部,函数作用域定义在函数内部,块级作用域一般定义在判断语句或者循环语句当中。

**作用域链**: 当访问一个变量时，解释器会首先在当前作用域查找标示符，如果没有找到，就去父作用域找，直到找到该变量的标示符或者不在父作用域中，这就是作用域链


### 异步和同步区别

异步: `js`是单线程语言,一次只能做一件事，所以就有了异步的存在,异步不会阻塞其他线程,不会影响其他的代码执行。

同步: 按一定的顺序执行


### js实现继承方式和优缺点

```js
// 原型链继承

Grand.prototype.lastName = "很皮"
function Grand(){}
var grand = new Grand()

Father.prototype = grand
function Father(){
  this.lastName = "真的皮"
}
var father = new Father()

Son.prototype = father
function Son(){

}
var son = new Son()

console.log(Son.prototype) // Grand {lastName:'真的皮'} 这种方式会继承很多多余的属性


// 借助构造函数实现继承
function Person(name,age){
  this.name = name
  this.age = age
}

function Student(name,age){
  // 执行父级的构造函数 虽然写法上好看了但是实际上和上面没区别
  Person.call(this,name,age)
}
var student = new Student('1',12)


// 公有原型继承  一定要先继承后使用 缺点是无法新增自己的原型属性，会互相影响
Father.prototype.lastName = "李雷"
function Father(){

}
function Son(){}
// 两个构造函数继承同一个原型
Son.prototype = Father.prototype
var son = new Son()
var father = new Father()

// 寄生组合继承 解决了公有原型无法增加私有原型属性的缺点 使用了中间层
/**
 * 
 * @param {*} Target Son
 * @param {*} Origin Father
 * function F(){}
 * F.prototype = Father.prototype
 * Son.prototype = new F()
 */
function inherit(Target,Origin){
  function F(){}
  F.prototype = Origin.prototype
  Target.prototype = new F()
  Target.prototype.constuctor = Target
}

```
[https://github.com/mqyqingfeng/Blog/issues/16](https://github.com/mqyqingfeng/Blog/issues/16)



### 讲一下浏览器缓存

### 前端性能优化 vue性能优化

### 移动端布局有那些

### a元素有子元素b，点击a触发console.log 点击b不会触发实现

### webpack的优化相关 能不能说一下

###  CommonJS 为什么不能做 Tree-Shaking 

### 函数的arguments为什么不是数组？如何转化成数组？

因为首先函数的参数被设计时就是不需要怎么改动的，并且如果使用数组的方式去访问某个参数需要使用到下标，没有对象访问好用

`arguments`实参数组和形参是一个对应的映射关系，你动我也动，相互影响。

```js
function b(a,c,d){
  arguments[2] = 3
  alert(d) // d = 3
}
b(1,2,10)
```

arguments 有两个属性
- callee 函数自身引用
- length 参数长度

因为arguments本身并不能调用数组方法，它是一个另外一种对象类型，只不过属性从0开始排，依次为0，1，2...最后还有callee和length属性。我们也把这样的对象称为类数组。
常见的类数组还有：

- 用getElementsByTagName/ClassName()获得的HTMLCollection
- 用querySelector获得的nodeList

![](https://image.yangxiansheng.top/img/20200914225642.png?imglist)

### 异步使用场景

- 网络请求
- 定时任务

### 解释下变量提升？

`js`引擎执行代码的时候会将`声明变量`代码放置顶部,然后再依次执行。所以所有的声明变量的语句都会在顶部最先执行,这就是变量提升。

```js
var a = 1
//等同于

var a
a= 1
```

### ES6模块与CommonJS模块有什么区别？

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口

### null与undefined的区别是什么？

`null`表示空值,一个对象可以是`null`,代表空对象,他是存在的但是值为空

`undefined`代表不存在,除了有存在值为空,也存在`根本不存在的成员`。

### async/await是什么？原理

**async**: 1. 声明一个异步函数，并且返回值一定是个`Promise`对象 2. 异步操作执行完才会调用`then()`方法的回调函数

**await**: 1. 求值,既可以求出Proimise值,也可以求出表达式的值  2.阻塞线程 3.只能搭配`async`使用

### 浏览器是如何渲染的(输入url的渲染全过程)

包含两个过程:

**加载过程**

- 浏览器查找当前URL是否存在缓存，并比较缓存是否过期
- DNS解析域名,域名->IP地址
- 浏览器与服务器建立tcp链接（三次握手）
- 浏览器根据IP地址发送http请求
- 服务器接收请求,返回数据给浏览器

**渲染过程**

- 根据`HTML`、`Css`代码生成相应的`DOMTree`,`CSSOM`
- 结合`DOMTree`和`CSSOM`生成`RenderTree`，然后将`css`挂载在`DOM`上
- 根据`RenderTree`渲染页面
- 页面遇到`<script></script>`标签停止渲染,执行完`js`代码后再继续渲染
- 直至渲染完成

详细解答版本



### 什么是浏览器同源策略？和如何实现跨域

**同源策略**: 浏览器发送`ajax`请求要求浏览器和服务器必须同源。所谓同源就是`协议,端口,域名`都必须保持一致。

**不受同源限制的三个标签**:

`<script></script>`

`<link />`

`<img />`

**实现跨域方法**:

- JSONP实现: 

原理: 利用`<script></script>`不受同源策略限制,进行跨域操作。

手写jsonp实现

- CORS跨域:

原理: 使用额外的 `HTTP 头`来告诉浏览器 让运行在一个 `origin` (domain) 上的Web应用被准许访问来自不同源服务器上的指定的资源。

跨域相关知识点补充

- nginx反向代理:

原理:所有客户端的请求都必须先经过nginx的处理，nginx作为代理服务器再讲请求转发给node或者java服务，这样就规避了同源策略。

[具体实现](https://juejin.im/post/5c23993de51d457b8c1f4ee1)

### DOM的事件模型是什么

- 脚本模型
- 内联模型
- 动态绑定

```js
<body>
<!--行内绑定：脚本模型-->
<button onclick="javascrpt:alert('Hello')">Hello1</button>
<!--内联模型-->
<button onclick="showHello()">Hello2</button>
<!--动态绑定-->
<button id="btn3">Hello3</button>
</body>
<script>
/*DOM0：同一个元素，同类事件只能添加一个，如果添加多个，
* 后面添加的会覆盖之前添加的*/
function shoeHello() {
alert("Hello");
}
var btn3 = document.getElementById("btn3");
btn3.onclick = function () {
alert("Hello");
}
</script>

```

### 说说DOM事件流

- 事件捕获阶段
- 目标接收事件
- 事件冒泡阶段



### 箭头函数和普通函数的区别？

- 箭头函数的`this`是由包裹它的`普通函数的this`来决定；`
- 不能作为构造函数, `Generator`函数；
- 参数不能使用arguments访问，需要使用Es6的不定参数访问；
- 使用`bind`方法无效。

### var、let、const的区别 ？

- `var类型`会有变量提升的情况
- `let`和`const`没有变量提升的情况，必须要先声明再使用，否则就会出现暂时性死区的情况。
- `const`和`let`的区别在于一经定义后不得再次改变const定义的值`
- `const`必须赋值
### 谈谈对Promise的理解 ？

- `Promise`主要解决的问题就是``异步回调嵌套过深造成代码难以维护和理解`
- `Promise`一共有三种状态`pending等待状态`、`resolved已完成状态`、`rejected已拒绝状态`
- `Promise构造函数`内的代码是同步执行的，而之后`then`或`catch`方法是异步执行的，构造函数接受两个函数参数resolve和reject，它们执行时接受的参数分别会传递给`then`和`catch`表示`成功的回调`以及`失败回调`接受到的值。`




### 什么是事件代理？

利用事件流的冒泡特性，将子节点的事件绑定在父节点上，然后在回调里面使用事件对象进行区分，优点是节省内存且不需要给子节点销毁事件。

### 你知道的性能优化方式有哪些？

- 文件压缩，减小资源大小
- 异步组件，按需加载
- 小图片转base64，减少请求
- 雪碧图，减少请求
- 选择合适的图片格式和尺寸
- 懒加载，按需加载
- css放最上面，js放在body最下面，渲染优化
- 事件节流，减少操作
- 减少Dom操作和避免回流，渲染优化
- 浏览器缓存，减少请求次数或响应数据
- 减少cookie的使用，减少请求携带大小

### doctype的作用是什么？

`DOCTYPE`是`html5`标准网页声明，且必须声明在HTML文档的第一行。来告知浏览器的解析器用什么文档标准解析这个文档。

### 你对HTML语义化的理解？

语义化是指使用恰当语义的html标签，让页面具有良好的结构与含义，比如`<p>`标签就代表段落，`<article>`代表正文内容,`<header> <nav> <aside> <footer>`等。

优点: 

1. 增强开发维护可读性
2. 更适合机器解析，生成目录,搜索引擎爬虫等

### HTML5与HTML4的不同之处

- 文档解析声明和解析顺序 不在基于`SGML`
- 增加新的元素,媒体标签等等
- input元素的新类型：date, email, url等等

### src和href的区别？

- `src`指向的内容会嵌入到标签的位置,会将指定的`src`资源下载并嵌入到文档。**浏览器渲染页面会等待src解析并执行**

- href 一般用于超链接,如果是指向资源文件会下载资源,**浏览器不会因他停止渲染**

### 有几种前端储存的方式？区别

- cookie : 本地储存的主要方式，优点是兼容性好，请求头自带cookie方便，缺点是大小只有4k

- localStorage: HTML5加入的以键值对(Key-Value)为标准的方式，优点是操作方便，永久性储存（除非手动删除），大小为5M

- sessionStorage:与localStorage基本类似, 但是关闭会话框就会自动清空

- IndexedDB: 操作`NoSql`数据库,存储键值,可以快速完成读取操作。

### CSS选择器的优先级是怎样的？

内联选择器>id选择器>类选择器>标签选择器

### link和@import的区别？

- `link` 是XHTML提供的元素而`@import`是CSS提供的

- `link` 和页面一起加载, `@import`需要等待页面加载完成执行

- `link` 方式的样式权重高于@import的权重

### em\px\rem区别？

- em : 相对单位，基准点为`父节点字体的大小`，如果自身定义了`font-size`按自身来计算（浏览器默认字体是`16px`）

- px : 绝对单位，页面按精确像素展示

- rem :相对单位，可理解为”root em”, 相对`根节点html的字体大小`来计算

### 伪类和伪元素的区别

伪类是一个以冒号(:)作为前缀,被添加到一个选择器末尾的关键字,`通过在元素选择器上加入伪类改变元素状态`。`p:last-child`

伪元素: 伪元素用于创建一些不在文档树中的元素,并为其添加样式。用户能够看见但实际不存在文档树中。`::before`

### 块级元素水平居中,垂直居中,水平垂直居中

**水平居中:** 

1. `text-align`
2. `margin: 0 auto`但是一定要给宽度 
3. 绝对定位+margin或`transform` 4. flex布局

**垂直居中:** 

1. `height`和`line-height`相等 
2. `display:table-cell;vertical-align:middle` 
3. 绝对定位 + `margin`或`transform` 
4. flex布局

**水平垂直居中:** 

1. 父级设置`text-align: center`和`line-height`等同高度 
2. 绝对定位 + `margin`或`transform` 
3. 父级设置`display: table`，子节点设置`display:table-cell;text-align:center;vertical-align:middle` 
4. flex布局  
5. grid布局

### 除了Flex还可以用什么进行布局

绝对定位,相对定位,浮动,fixed等


### 清除浮动有哪些方法？

- 空div方法：`<div style="clear:both;"></div>`
- `overflow: auto`或`overflow: hidden`方法，使用BFC
- 最好的方法

```css
.parent-box:after{
    clear: both;
    content: '';
    display: block;
}
```

### 盒模型的理解

标准盒(content-box): 设置的宽高只是包括内容区，内边距和边框另算。

![](https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/232580766e15853d521a4c0bf6a5c794.png)

IE盒(border-box):设置的宽高包含了**内边距和边框**。

![](https://xiaomuzhu-image.oss-cn-beijing.aliyuncs.com/e427c6d19ea6be1359bd0177d7a5b7a3.png)

### 谈谈对BFC的理解

块级格式上下文，一句话来说就是**让块级元素有块级元素该有的样子，触发BFC可以清除浮动、让margin不重叠**。

触发条件: 

1. `overflow`的值不为`visible`
2. `display`的值为`table-cell`、`table-caption`和`inline-block`之一。
3. `position`的值不为`static`或`relative`中的任何一个
4. `float`不为 `none`


### [浏览器一系列问题](https://juejin.im/post/6844904021308735502)


### 实现懒加载方案

### [正则表达式学习和例题](https://juejin.im/post/6844903487155732494#heading-0)

### UTF-8 UTF-16 和 Unicode 什么关系

### markdown渲染原理

### CommonJS和ES6模块化有什么区别，设计一个方法，让CommonJS导出的模块也能改变其内部变量

### webpack treeShaking原理

### 


### 网络安全相关

1. sql注入原理：通郭sql命令插入到web表单递交或者输入活命，达到欺骗服务器执行的恶意sql命令
防范：1.对用户输入进行校验
2. 不适用动态拼接sql
2. XSS（跨站脚本攻击）：往web页面插入恶意的html标签或者js代码。
举例子：在论坛放置一个看是安全的链接，窃取cookie中的用户信息
防范：1.尽量采用post而不使用get提交表单
2.避免cookie中泄漏用户的隐式
3. CSRF(跨站请求伪装）：通过伪装来自受信任用户的请求
举例子：黄轶老师的webapp音乐请求数据就是利用CSRF跨站请求伪装来获取QQ音乐的数据
防范：在客服端页面增加伪随机数，通过验证码
- XSS和CSRF的区别：
1.XSS是获取信息，不需要提前知道其他用户页面的代码和数据包
2.CSRF代替用户完成指定的动作，需要知道其他页面的代码和数据包


### 事件循环机制(浏览器和Nodejs)

JavaScript的执行机制简单来说就`先执行同步代码，然后执行异步代码`，而`异步的代码`里面又分为`宏任务代码`和`微任务代码`，先执行微任务，然后执行宏任务。首先会将所有JavaScript作为一个宏任务执行，遇到同步的代码就执行，然后开始分配任务，遇到宏任务就将它的回调分配到宏任务的队列里，遇到微任务的回调就分配到微任务的队列里，然后开始执行所有的微任务。执行微任务的过程还是遵循先同步然后分配异步任务的顺序，微任务执行完毕之后，一次Event-Loop的Tick就算完成了。接着挨个去执行分配好的宏任务，在每个宏任务里又先同步后分配异步任务，完成下一次Tick，循环往复直到所有的任务全部执行完成。


微任务包括：`process.nextTick` ，`promise` ，`MutationObserver`。


宏任务包括：`script` ， `setTimeout` ，`setInterval` ，`setImmediate` ，`I/O` ，`UI rendering`。

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


### 移动端1px问题

```css
box-shadow: 
  0  -1px 1px -1px #e5e5e5,   //上边线
  1px  0  1px -1px #e5e5e5,   //右边线
  0  1px  1px -1px #e5e5e5,   //下边线
  -1px 0  1px -1px #e5e5e5;   //左边线
  0 0 0 1px #e5e5e5;   //四条线
```

### 有没有更好的判断变量类型的方法？
可以使用`Object.prototype.toString.call(var)`，可以更加准确的判断某个变量的类型。

### 字符串的test、match、search它们之间的区别？

```js
`test`是检测字符串是否匹配某个正则，返回布尔值；
/[a-z]/.test(1);  // false

`match`是返回检测字符匹配正则的数组结果集合，没有返回`null`；
'1AbC2d'.match(/[a-z]/ig);  // ['A', 'b', 'C', 'd']

`search`是返回正则匹配到的下标，没有返回`-1`。
'1AbC2d'.search(/[a-z]/);  // 2
```

### 原型继承的方式有哪些？

原型链继承、借用构造函数继承、组合继承、原型式继承、寄生组合继承等等。最优化的继承方式是寄生组合继承：

```js
function Parent(name) {
  this.name = name;
}
function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child

```
### class理解

JavaScript没有真正的类，一直也是通过函数加原型的形式来模拟，class也不例外，只是语法糖，本质还是函数。需要先声明再使用，内部的方法不会被遍历，且没有函数的prototype属性。

### 对浏览器或元素的各种距离参数你知道哪些？

- document.documentElement.`clientHeight`：当前窗口内容区 + 内边距- 的高度
- window.innerHeight: 当前窗口内容区 + 内边距 + 边框 + 滚动条高度
- window.outerHeight：整个浏览器的高度(包括工具栏)
- `clientHeight`: 当前元素内容区 + 内边距的高度
- `clientTop`: 当前元素上边框的宽度
- `offsetHeight`: 当前元素内容区 + 内边距 + 边框 + 滚动条的高度
- `offsetTop`: 当前元素的边框距离父元素上外边距的距离
- `scrollHeight`: 当前内部可以滚动区域的高度，如果不能滚动则为自己内容区 + 内边距的高度
- `scrollTop`: 当前元素滚动离顶部的距离

### 什么是重绘和回流？
- `重绘`是节点的外观发生改变而不改变布局时，如改变了color这个行为；
- `回流`是指改变布局或几何属性发生改变时引起的行为，如添加移除Dom，改变尺寸。它们频繁的触发会影响页面性能。

回流一定触发重绘，而重绘不一定引起回流。回流的成本比重绘高很多，而且子节点的回流，可能引起父节点一系列的回流。

减少回流

- 使用transform替代位移，使用translate3d开启GPU加速
- 尽量使用visibility替代display:none
- 不要使用tanle布局
- 不要在循环里读取节点的属性值
- 动画速度越快，回流次数越少

### 懒加载（lazyload）原理

首先将页面上的图片的`src属性`设置为空字符串，而图片的真实路经则设置带`data-original属性`中，当页面滚动的时候需要去监听scroll事件，在`scroll事件`的回调中，判断我们的懒加载的图片是否进入到可视区域，如果图片在可视区域将图片的`src`属性设置为`data-original`的值，这样就可以实现延迟加载。

### setTimeout和setInterval的机制

因为js是单线程的。浏览器遇到`setTimeout和setInterval`会先执行完`当前的代码块`，在此之前会把定时器`推入浏览器的待执行时间队列`里面，等到浏览器执行完当前代码之后会看下`事件队列`里有没有任务，有的话才执行定时器里的代码


### webpack loader和plugin的区别

### 有没有写过loader

### ssr的原理是什么

### react在应用初始化，更新的时候触发了那些生命周期

### react hooks的优点

### 你觉得 React 和 Vue 有什么共通之处？

### lodash的once方法实现

### 讲一讲 HTTPS 加密(对称加密有AES + CHACHA20, 分组模式以前有 CBC、CTR，TLS1.3 中只剩下 GCM，非对称加密 RSA、ECDHE)

### 能不能说说浏览器的缓存

### 能不能说说 Cookie 有哪些字段？

### 说一下对于前端技术的发展过程和微前端

### 你觉得前端除了完成页面交互稿之外，还能做其他的什么事情？

首先是性能优化，其次是处理数据，然后是工程化

### DOM API 掌握怎么样？

### fetch 和 xhr 有什么区别？(fetch 不熟)

### WeakMap 和 Map 的性能有什么差别?

### async await 原理

### 假如我在一个for循环中改变当前组件依赖的数据，改变一万次，会有什么效果

### 假如让你设计一个适配 PC、手机和平板的项目，你有哪些布局方案

首先是vh、vw，然后用淘宝出品的 lib-flexible 库进行 rem 适配，还有一种 flex + px 的适配方式

### React 受控组件和非受控组件的区别

### V8 引擎如何进行垃圾内存的回收？

[https://juejin.im/post/6844904004007247880#heading-1](https://juejin.im/post/6844904004007247880#heading-1)

### 如何让Promise.all在抛出异常后依然有效 

### 如何实现SEO优化

### 列举几个css中可继承和不可继承的元素 

### 什么情况下css会使用gpu加速

### 什么是sass和less

### svg和canvas的概念和区别 

### dom渲染的性能损耗在哪里 

### 如何高效地从1000个div中删除10个div

### 浏览器里除了js还能运行什么

### 进程和线程的区别

### WebSocket是基于什么协议连接 

### promise如何满足多个异步进程的同步顺序

### 如何实现移动端响应式布局 

### 如何实现一个swiper 

### js当中对于不同环境的变量什么时候释放 

### js当中如何实现某一个数的阶乘 ？

### 视差屏原理

### 小程序原理，小程序的分包原理是什么

### 你的微信OAuth登陆怎么做的

### 你的微信OAuth登陆怎么做的

