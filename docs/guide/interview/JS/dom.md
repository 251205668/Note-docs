# DOM

## dom操作

### 操作节点

1. 创建节点

```js
var a = createElement("p") //创建元素节点
var a = createDocumentFragment() // 创建文档片段，这一部分不会占用空间也就是虚拟节点
var a = createTextNode("元素内容") //创建文本节点
```

2. 添加，移除，替换，查询

```js
var div = document.getElementById("div1")
var p = createElement("p")

div.appendChild(p) //增加

div.removeChild(p) // 移除

var new = createElement("div")
div.replaceChild(new,p) // 替换

const div1 = document.getElementById('div1')
// 获取标签集合
const divList = document.getElementsByTagName('div') 
const containerList = document.getElementByClassName('.className')

const p =document.querySelector('p')// 获取一个p标签的dom
const pList = document.querySelectorAll('p')// 选择器获取集合

```

### 操作样式

- 操作样式: `property`形式

```js
const div1 =doucment.getElementById('div1')
div1.style.width = '100px'
console.log(div1.style.width) // 100px
console.log(div1.className) // 样式名
console.log(div1.nodeName) //标签名
```

- 操作样式: `attribute`形式,但是会修改标签结构

```js
div1.setAttribute('data-name','imooc')
div1.getAttribute('data-name')
div1.setAttribute('style','width:height:30px')
```

## 窗口属性、滚动条、元素


### 滚动条

1. 求滚动条距离顶部或者屏幕最左侧的距离

```js
var x = window.pageXOffset //横向距离
var y = window.pageYOffset //纵向
以上方法不兼容 ie8和ie8以下浏览器 所以需要使用以下方法

var x = document.body.scrollLeft
var y = document.body.scrollTop
var x = document.documentElement.scrollLeft
var y = document.documentElement.scrollTop
以上方法兼容性比较混乱，但是两种方法不可能同时有值，所以通常会写成以下方法(相加)获取滚动距离

var x = document.body.scrollLeft + document.documentElement.scrollLeft
var y = document.body.scrollTop + document.documentElement.scrollTop
```

通常会封装一个方法获取滚动条的距离

```js
function getScrollToOrLeft(){
  if(window.pagetXOffset){
    return {
      x:window.pageXOffset,
      y:window.pageYOffset
    }
  }else{
    return {
      x: document.body.scrollLeft + document.documentElement.scrollLeft,
      y: document.body.scrollTop + document.documentElement.scrollTop
    }
  }
}
```

2. 让滚动条滚动

- window.scroll(x,y) x，y是坐标
- window.scrollTo(x,y)
- window.scrollBy(x,y): 这里是累加滚动，在原有基础上累加

**实现阅读器自动阅读的功能，包含开始和暂停**

```js
var start = document.getElementByClassName("start")[0] // 开始自动阅读的dom
var stop = document.getElementByClassName("stop")[0] // 暂停阅读
let timer
let lock = true
// 加锁式的编程思想
start.onclick = function(){
  if(lock){
    timer = setInterval(()=>{
        window.scrollBy(0,10)
      },100)
      lock = false
  }
 
}

// 暂停
end.onclick = function(){
  clearInterval(timer)
  lock = true
}
```

其实这种**加锁式的编程思想很常见**，比如说给加载长列表做性能优化，不让他每一次都去请求接口

```js
data:return {
  isEnd: false,
  lock:false
}

async getMoreData(){
  if(isEnd){
    return
  }
  if(lock){
    return
  }
  this.lock = true
  const res = await getAPI()
  this.lock = false
  if(res.code === 200){
    if(res.data.limit < conifg.limit){
      // 最后一页了
      this.isEnd = true
    }
    if(res.data.length === 0){
      this.list = res.data
    }else{
      this.list = [...(this.list,res.data)]
    }
  }
}
```

3. 求文档的总高度和总宽度

```js
var x = document.body.scrollWidth
var y = document.body.scrollHeight
var x = document.documentElement.scrollWidth
var y = document.documentElement.scrollHeight
以上方法兼容性比较混乱，但是两种方法不可能同时有值，所以通常会写成以下方法(相加)获取滚动距离

var x = document.body.scrollLeft + document.documentElement.scrollWidth
var y = document.body.scrollTop + document.documentElement.scrollHeight
```
4. 判断当前屏幕是否触底

滚动条距顶部的高度 + 可视区域高度 = 文档总高度 则代表已经触底

```js
// 滚动条距顶部的高度
var scrollTop = ()=>{
  if(window.pageYOffset){
    return window.pageYOffset
  }else{
    return document.body.scrollTop + document.documentElement.scrollTop
  }
}
// 可视区域高度
var viewHeight = ()=>{
  if(window.innerHeight){
    return window.innerHeight
  }else{
    if(document.compatMode === 'CSS1Compat'){
      return document.documentElement.clientHeight
    }else{
      return document.body.clientHeight
    }
  }
}
// 文档总高度
var documentHeight = ()=>{
  return document.body.scrollHeight + document.documentElement.scrollHeight
}

window.onScroll = ()=>{
if(scrollTop + viewHeight = documentHeight){
  console.log("触底了")
}
}
```

### 可视区窗口尺寸

可视区窗口指的是html生效部分，不包含导航栏工具栏,控制台

![](https://image.yangxiansheng.top/img/20201217182437.png?imglist)

```js
var x = widnow.innerWidth
var y = window.innerHeight
IE8和IE8以下浏览器不兼容

var x = document.documentElement.clientWidth
var y = document.documentElement.clientHeight
标准模式，任何浏览器兼容

var x = document.body.clientWidth
var y = document.body.clientHeight
适用于怪异模式
```

封装兼容的方法

```js
function getViewPortOffset(){
  if(window.innerWidth){
    return {
      x:window.innerWidth,
      y:window.innerHeight
    }
  }else{
    if(document.compatMode === 'CSS1Compat'){
      return {
        x: document.documentELement.clientWidth,
        y: document.documentElement.clientHeight
      }
    }else{
      return {
        x: document.body.clientWidth,
        y: document.body.clientHeight
      }
    }
  }
}
```

### 元素

**求元素的尺寸**

1. 调用dom的 `getBoundingClientRect()`,返回这个元素的坐标和宽高，但是是静态结果

top,left,bottom,right 代表元素以左上角为基础的分别代表的距离，也就是坐标，另外还返回了width和height，**但是在ie浏览器是没有这俩属性的**

![](https://image.yangxiansheng.top/img/20201217184617.png?imglist)


2. `offsetWidth`/`offsetHeight`，求元素的可视尺寸

```js
var div = document.getElementById("div1")
var x = div.offsetWidth  // 求的是视觉上的宽高，因为都是标准盒模型，但是这里不会包含margin
var y = div.offsetHeight
```



**求元素的位置**

- offsetLeft
- offsetTop

```html
<div style="position:relative;top:100px;left:100px;width:300px;height:300px">
  <div class="demo" style="width:100px;height:100px;background:red;position:absolute;top:100px;left:100px"></div>
</div>
```

```js
var div =document.getElementByClassName("demo")[0]
var offsetLeft = div.offsetLeft //100 求得是这个元素和最近的有定位的父级的距离
```


