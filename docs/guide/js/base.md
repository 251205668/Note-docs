
# base
## 剩余/扩展运算符

剩余/扩展运算符同样也是ES6一个非常重要的语法，使用3个点（...），后面跟着一个含有iterator接口的数据结构.

### 扩展运算符(存放数组 连接)

1. 存放一个数组,然后展开。以数组为例,使用扩展运算符使得可以"展开"这个数组，可以这么理解，数组是存放元素集合的一个容器，而使用扩展运算符可以将这个容器拆开，这样就只剩下元素集合，你可以把这些元素集合放到另外一个数组里面

```js
let arr = [1,2,3,4,5,6]
let arr2 = [...arr,6,7,8]//[1,2,3,4,5,6,7,8]
```
2. 代替concat方法 
  
```js
let arr1 = [1,2,3]
let arr2 = [4,5,6]
console.log([...arr1,...arr2])//[1,2,3,4,5,6]
```

### 剩余运算符(解构 代替arguments)

- 代替了以前的arguments(参数类数组)

```js
function fun(a,b,c){
  console.log(arguments[0],arguments[1],arguments[2])
}
func(1,2,3)

//es6

function fun1 (...rest){
  consloe.log(rest) //[1,2,3]
}
fun1(1,2,3)

```

- 和数组解构赋值一起使用,但必须放最后一位

```js
let [first,...arr] = [1,2,3,4,5]
//first 1
// arr [2,3,4,5]
```
- 代替`Object.assign()`,合并对象

### object.assign

多个对象合并
```js
let target = {}
let obj = Object.assign(target,{a:1},{b:2})
obj // {a:1,b:2}
```
## js基本api

### 数组添加元素(unshift push shift pop)

- **unshift** 数组头部添加元素
- **push** 数组尾部添加元素
- **pop** 删除尾部元素
- **shift** 删除第一个元素

```js
let arr = [1,2,3,4,5]
arr.push(6) //[1,2,3,4,5,6]
arr.unshift(0) //[0,1,2,3,4,5,6]
arr.shift() //[1,2,3,4,5,6,]
arr.pop() // [1,2,3,4,5]
```

### 类型转换(显示转换 字符串数组转换)

#### 显式转换
`radix`(除了undifined 或 null),`mix`
  
  1. 转换为数值型类型 :Nmuber(mix),parseInt(String,radix),parseFloat(String)
  2. 转换为字符串类型:toString(radix),String(mix)
  3. 转换为布尔类型:Boolean(mix)

#### api转换

经常需要将数组转换为字符串，或字符串转换为数组

- join 数组转为字符串
  
  ```js
    let arr = [1,2,3,4,5]
    arr.join('')
  ```
- split 字符串转换为数组

  ```js
  let str = '1_2_3_4_5_6'
  str.split('_')// ['1','2','3','4','5','6']
  ```

### 数组相关操作(splice 下标 连接)

#### splice

- 删除指定下标元素
  arr.splice(index,num)
 
  ```js
  let arr = [1,2,3,4,5]
  arr.splice(1,1) // [1,3,4,5]
  ```
- 指定下标插入元素
  arr.splice(start,num,'x','y') 删除元素为零个，向下标为2的前面插入元素

  ```js
  arr.splice(2,0,1,1)//[1,2,1,1,3,4,5]
  ```
- 替换指定的下标元素
  arr.splice(start,num,'x','y')  start开始,替换num各元素

  ```js
  arr.splice(1,2,1,1,) // [1,1,1,4,5]
  ```

#### 寻找下标

  arr.indexOf(key) - 返回key下标值,第一次出现,如果没有返回-1

  findIndex(arr,key) - 返回key在arr的下标值
- indexOf()
  
  ```js
  for(let i in this.cities){
    this.cities[i].forEach((value)=>{
      if(value.pell.indexOf(this.keyword)>-1 || value.name.indexOf(this.keyword)>-1){
        result.push(value)
      }
    })
  }
  ```
- findIndex()
  
  ```js
  let currentIndex = findIndex((item)=>{
    return item.id === song.id 
  })
  //return 符合条件的index
  ```
#### 连接数组

- concat() 
  
  ```js
  let arr = [1,2,3,4,5]
  let arr1 = [6,7,8]
  arr.concat(arr1) // [1,2,3,4,5,6,7,8]
  ```
- ...arr
  
  ```js
  [...ar,...arr1]
  ```

:::tip 扩展

- 触底刷新
  
  往往做下拉刷新的时候需要用到连接concat()这个api
  ```js

  searchMore () {
    this.showMore = true
    this.page++
    getsearchSongs(this.query,this.page).then((res)=>{
      let list = res.data.result.songs
      let ret = []
      list.forEach((item)=>{
        ret.push(ceateRecommendSong(item))
      })
      <!-- 关键步骤 -->
      this.songs.push(...ret)//this.songs.concat(ret)
    })
  }
  
  ```
- 将数组改成自己想要的格式,重排

需求分析:将下面的返回的artists转换为一个数组分为一个hot区(前二十名歌手)和一个singers区(字母排序)

![](https://image.yangxiansheng.top/img/QQ截图20200310174523.png?imagelist)

首先我们向把每个数组元素的`item.name`的首字母提取出来，然后写一个方法传入list,创建map对象,里面有`hot对象`,遍历数组，当下标小于20，向hot数组的items里面插入new的歌手对象。

```js
const pinyin = require('pinyin')
getSingers().then((res)=>{
  let s = res.data.list.artists
  // name转为首字母
  s.map((item)=>{
    let py = pinyin(item.name[0]),{
      style:pinyin.STYLE_FIRST_LETTER
    }
  }
  item.initial = py[0][0].toUpperCase
  )
})
```
然后就是`map[key]`对象,先设置key为一开始提炼出来的首字母,然后同样创建`map[key]`对象,向对象的items里面push歌手对象。


最后将map对象的 抽成出两个数组 ,一个hot 一个singers(需要对字符串进行排序)
```js
_normalliaze(list){
  let map ={
    hot:{
      title:'热门',
      items:[]
    }
  }
  // 热门中插入数据
list.forEach((item,index)=>{
  if(index < 20) {
    map.hot.items.push(new Singer({
      ...
    }))
  }
// map[key]插入数据
  const key = item.initial
  if(!map[key]){
    map[key] = {
        title:key,
        items:[]
    }
  map[key].items.push(new Singer({...}))
  }
})

// 抽成两个数组并排序

let hot= []
let singers = []
for(let key in map) {
  let value = map[key]
  if(value.title.match(/[a-zA-Z]/)){
    singer.push(value)
  }else{
    hot.push(value)
  }
}
singers.sort(a,b){
  // 默认对字符串进行排序
  return a.title.chartCodeAt(0) - b.title.charCodeAt(0)
}

return [...hot,...singers]
}

```
:::

<h2>再来看一个经典案例</h2>

:::warning 一维数组转为多维数组(行列自定义)

分析:要把数组转为多维数组,首先要设置行列数,然后行数除以列数就是多维数组的元素个数,将一维数组截断`slice(0,col*row)`

然后写核心算法,设置一个row初始为0,当row小于行数时,返回的数组截断(`row*this.col`,`row*this.col`+`this.col`)

```js
computed(){
let arr = arr.slice(this.col*this.row)
let ret = []
let _row = 0
while(_row < this.row) {

  ret.push(arr.slice(_row*this.col,_row*this.col + this.col))
  _row ++
  return ret
}else{
  return []
}
}
```
:::

### 类型判断(typeof Object.prototype.toString)

#### typeof

通过`typeof`操作符来判断一个值属于哪种基本类型

```js
typeof 'se'
typeof true
typeof {}
typeof null // 'object'
let a = []
typepf(a) // 'object'

typeof {} // 'object'
```
:::danger
`typeof`判断会有误差,比如`null`,`array`,操作对象类型除了函数()都会得到`object`的结果
:::

#### Object.prototype.toString() 推荐使用

js判断数据类型的无敌解决办法

```js
Object.prototype.toString.call({}) // '[object Object]'
Object.prototype.toString.call([]) // '[object Array]'
Object.prototype.toString.call(1) // '[Object Number]'
```
通常使用这个API要进行简单的封装

```js
type(data){
  let toString = Object.prototype.toString
  let dataType = toString.call(data).replace(/\[object\s(.+)\]/,'$1').toLowerCase()
  return dataType
}


type(1) //number
type([]) //array
...
```

### 空值判断

#### 空数组判断

`arr.length > 0`

#### 空对象判断

- 使用`Object.getOwnPropertyNames()` 返回属性名组成的数组
  
  ```js
  let obj = {}
  Object.getOwnPropertyNames(obj).length === 0
  ```
- json对象转为字符串

  ```js
  let obj = {}
  Json.stringify(obj) === '{}' //true
  ```
- Object.keys()
  
  ```js
  类似返回属性名数组

  Obejct.keyys(obj).length === 0
  ```
- 直接使用对象属性判断
  

### 循环遍历操作数组(for forof forin forEach map)

- for循环

```js
//for
for(let i =0; i<arr.length; i++){
  // arr[i]
}

//for in
for(let i in arr) {
  // arr[i]
}

//for of 
for(let i of arr) {
  // i
}
```
 > `for`循环就不用多说了,`for in`循环遍历常常用来遍历对象如下例,`for of`循环使用了迭代器,直接可打印出各个元素
 
 区别:
 - for循环和for of循环不能遍历到非数字属性。
 - for in 循环可以取到数组中的空元素,for循环 for of循环不会跳过,会打印出undefined
 ```js
 for(let i in map) {
   map[i] //拿到对象的每个值
 }
 ```
- map filter forEach
  
1. forEach遍历可以拿到`item`,`index`，然后进行操作,基本上遍历数组都是用forEach
  
  ```js
  let arr = [1,2,3,4,5]
  arr.forEach((item,index)=>{
    item // 1,2,3,4,5
    index // 0,1,2,3,4
  })

  ```
2. map 返回一个经过操作的新数组
  
  ```js
  let arr = [1,2,3,4,5]
  arr.map((item)=>{
    return item+1;
  })
  // arr [2,3,4,5,6]


  filter(music){
    let name =[]
    name = music.map((item)=>{
      return item.name
    })
    return name.join('/')
  }
  ```
3. filter 返回一个符合条件的数组,也是新数组
   
   ```js
   let arr = [1,2,3,4,5]
   arr.filter((item)=>{
     return item>3
   })
   //arr [4,5]
   ```

## 字符串截断(slice substr substring)

slice()  substr()  substring() 他们之前的区别

总结的说: 

- slice(start,end) 正数截取start到end之间的数,前闭后开
  
  特殊情况:
  1. 负数的话,会将其作为倒数几个进行截取
  2. 第一个数大于第二个参数,返回 ''

- substr(start,num) 从start位置截取num个字符
  
  特殊情况:
  1. `start`为负数,会倒过正向截取len个数
  2. `len`为负数,返回 `""`

- substring(start,end) 正数截取start到end之间的数,前闭后开
  
  特殊情况:
  1. 第一个参数大于第二个参数,将参数交换进行截取
  2. 参数有负数,**转为0**

```js
var str='1m2mgfdgfdgfgdggerererwe';
str.substr(3,3)//"mgf"
str.substr(3,-3)//""
str.substr(-3,3)//"rwe"

str.substring(3,4)//"m"
str.substring(3,-4)//"1m2"
str.substring(-3,-4)//""
str.substring(-3,4)//"1m2m"

str.slice(-3,4)//""
str.slice(3,6)//"mgf"
str.slice(6,3)//""
str.slice(3,-6)//"mgfdgfdgfgdgger"

```

