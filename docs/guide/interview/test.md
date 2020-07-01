## JS基础

### 引用类型和值类型

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

### typeof运算符

**typeof**作用

- 识别所有的`值类型`
- 函数
- 还能判断是不是引用类型。

![](https://image.yangxiansheng.top/img/20200701144028.png?imagelist)

::: danger
`typeof`并不能完全识别引用类型,他只能判断是否是引用类型，不能继续识别
:::

![20200701144130.png](https://raw.githubusercontent.com/imageList/imglist/master/20200701144130.png)

### 深拷贝

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
### 变量计算-类型转换

通常来说,两个等号会尽量保证类型相同,所以会进行类型转换。

![20200701152908.png](https://raw.githubusercontent.com/imageList/imglist/master/20200701152908.png)

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
### 原型和原型链

![20200701161415.png](https://raw.githubusercontent.com/imageList/imglist/master/20200701161415.png)

**类型判断-`instanceof`**

1. 判断引用类型
2. `Object`可以充当任意`class`的父类

![20200701162342.png](https://raw.githubusercontent.com/imageList/imglist/master/20200701162342.png)

**显式原型和隐式原型之间的关系：**

> js引擎自动会处理, `class`也是一个`function`

- 每个`class`都有一个显式原型`prototype`,这里存储函数
- 每个实例都有一个隐式原型`__proto__`
- 实例的隐式原型指向`class`的显式原型,实例就有用了属性和方法

这里**Student**是定义的类,然后传入属性`name`,`number`,再定义一个函数,**根据关系类`Student`具有显式原型`prototype`存放方法，然后实例化的时候隐式原型指向这个原型,从而调用方法**。

![20200701163319.png](https://raw.githubusercontent.com/imageList/imglist/master/20200701163319.png)


```js
console.log(Student.prototype) // 打印出student:{constructor:{},sayHi:}
console.log(xialuo.__proto__) // 同样打印出刚刚的结果
console.log(Student.prototype === xialuo.__proto__) // true
```

**原型链**

每个显式原型下也有一个隐式原型，指向规则和上面一样。**在每一层首先寻找自身的属性或方法,如果没有通过隐式原型去找上一层的显示原型的方法,依次形成一个链**

`Student`的显式原型下有一个`__proto__`，指向`People`的显式原型`prtotype`

![20200701165830.png](https://raw.githubusercontent.com/imageList/imglist/master/20200701165830.png)

原型链的最高层`Object`的显示原型拥有`toString`和`hasOwnProperty`方法和自身隐式原型

![20200701171044.png](https://raw.githubusercontent.com/imageList/imglist/master/20200701171044.png)
