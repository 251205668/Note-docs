# JS-Web-API

## DOM操作(节点和结构)

![20200703190213.png](https://raw.githubusercontent.com/imageList/imglist/master/20200703190213.png)

**节点操作**

获取`dom`节点,有多种方式。

```js
const div1 = document.getElementById('div1')
// 获取标签集合
const divList = document.getElementsByTagName('div') 
const containerList = document.getElementByClassName('.className')
// 选择器获取集合
const pList = document.querySelectorAll('p')
```

操作样式: `property`形式

不会修改标签结构属性

```js
const div1 =doucment.getElementById('div1')
div1.style.width = '100px'
console.log(div1.style.width) // 100px
console.log(div1.className) // 样式名
console.log(div1.nodeName) //标签名
```

操作样式: `attribute`形式

这步操作会添加标签结构属性

```js
div1.setAttribute('data-name','imooc')
div1.getAttribute('data-name')
div1.setAttribute('style','width:height:30px')
```
**结构操作**

插入或者移动节点

```js
// dom插入节点
const newP = document.createElement('p')
newP.innterHtml = '12'
div1.appendChild(newP)

// 移动节点
const p1 = doucment.getElementById('p1')
div2.appendChild(p1)
```
 
 获取子元素列表和父元素

 ```js
 // 获取父元素节点
 const parentNode = p1.parentNode

// 子元素节点
const div1 = document.getElementById('div1')
const nodelist = div1.childNodes //普通文本也会算进去

// 真正获取元素节点 过滤出nodeType为1的节点
const nodelist = Array.prototype.slice.call(div1.childNodes).filter((child)=> child.nodeType === 1)

 ```

 删除节点

 ```js
 const div1 = document.getElementById('div1')
 const nodelist = div1.childNodes 
 div1.removeChild(nodelist[0])
 ```

## BOM

![20200704112228.png](https://raw.githubusercontent.com/imageList/imglist/master/20200704112228.png)

![20200704112505.png](https://raw.githubusercontent.com/imageList/imglist/master/20200704112505.png)


**navigator**

查看浏览器版本
```js
const ua = navigator.userAgent
const isChrome = ua.indexOf('Chrome')
console.log(isChrome)
```

**location**

```js
location.href      -- 全网址
location.protocol  -- 协议
location.pathname  -- host
location.search    -- 参数
location.hash      -- 哈希值
```

**history**

```js
history.back()
history.forward()
```

**screen**

client page screen offset区别

- client是相对于浏览器顶部底边 也就是可视区域的顶部开始计算

![](https://i.loli.net/2020/01/30/STqodEtYpjZk2Iy.png)

- page 跟client一样 代表触摸点在视口区域的 x y坐标

- screen 这个相对于整个屏幕而言
![](https://i.loli.net/2020/01/30/es5T7O4XMn6jJAp.png)

- offset 相对于事件源本身的触碰点位置

![](https://i.loli.net/2020/01/30/MvFRCHIDuWzUPo9.png)

## 事件

**绑定事件**

- dom上绑定事件,函数实现
- 直接获取dom.事件 = 函数
- dom.addEventListener('事件名',function(){})

**event对象**
- event.type 事件类型
- event.target 事件源的dom IE浏览器:srcElement
- event.preventDefault 阻止默认行为(a标签的默认行为是跳转 a标签跳转就是默认行为) IE浏览器:returnValue
- event.stopPropagation() 阻止事件冒泡 IE浏览器:cancelBubble

**移动端常用事件**

- touchstart
- touchmove
- touchend 

```js
function(e){

}
- e.touches 记录触摸屏幕的触摸点信息数组
- e.changedTouches 只保存手指移动引起事件的信息
- e.tagetTouches 只保存函放在元素上的触摸信息
```

**事件冒泡**
dom往上层级冒泡触发事件的现象

阻止冒泡行为: event.stopProgation()
`vue`中阻止冒泡行为: @click.stop.prevent="方法"

**移除事件**

```js
element.removeEventListener('s事件',functiion)
```

**手写监听屏幕触底**

```js
 window.addEventListener("scroll", () => {
  let {
    scrollTop,
    scrollHeight,
    clientHeight
  } = document.scrollingElement;
  
  // 当前滚动高度 + 视口高度 >= 文档总高度
  if (scrollTop + clientHeight >= scrollHeight-1) {
    console.log("已到达底部");
  }
},false);
```



## Ajax

![20200705213441.png](https://raw.githubusercontent.com/imageList/imglist/master/20200705213441.png)

**XMLHttpRequest**

实例化的`XMLHttpRequest`对象，发送`ajax`请求,主要有`open`，`onreadystatechange`,`send`这些api需要记住



GET请求

```js
const xhr = new XMLHttpRequest()
xhr.open('GET','/api',true)
xhr.onreadystatechange = function(){
  if(xhr.readystate === 4){
    if(xhr.status === 200){
      alert(xhr.ResponseText)
    }
  }

}
```
POST请求

![20200705215310.png](https://raw.githubusercontent.com/imageList/imglist/master/20200705215310.png)

**状态码**

`xhr.readystate`含义

![20200705215447.png](https://raw.githubusercontent.com/imageList/imglist/master/20200705215447.png)

**跨域和解决方案**

同源策略:发送`ajax`请求时,浏览器要求当前网页和server端必须同源

**同源: 协议、域名、端口一致**

跨域解决方案: [解决方案](https://juejin.im/post/5c23993de51d457b8c1f4ee1)

**jsonp和cors**

JSONP实现跨域原理:
- 利用`<script>`标签可以绕过跨域限制
- 服务器可以任意拼接数据返回
- 但是只能获取GET请求

cors实现跨域(服务器端实现)

![20200705220731.png](https://raw.githubusercontent.com/imageList/imglist/master/20200705220731.png)

## 储存

cookie
localStorage
sessionStorage



