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

## 事件

## Ajax

## 储存



