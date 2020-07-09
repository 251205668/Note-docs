# 移动端问题

![https://user-gold-cdn.xitu.io/2019/12/18/16f1703193bfc0fe?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1](https://user-gold-cdn.xitu.io/2019/12/18/16f1703193bfc0fe?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1)

## h5回顾

**常见的meta标签写法:**
- pc端:`<meta charset='utf-8'>`
- 移动端:`<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">`--- 相对于视口,宽度为设备宽度,缩放比例为1,用户禁止触摸缩放
- `<base url='/'>` --- base标签的作用是a标签的地址都是基于这个url

**常见面试题：**

1. doctype的意义:让浏览器以标准模式渲染,让浏览器知道合法性
2. HTML XHTML HTML5区别: 
  - HTML属于SGML(标记语言)
  - XHTML属于XML，进行了严格化
  - HTML5不属于SGML,XML,进行了宽松处理
3. HTML5变化:
  - 增加新的语义化元素
  - 表单增强
  - 加入新的API(离线，音视频，图形，实时通信，本地存储，设备能力)
4. 语义化意义: 开发者容易理解,机器容易理解,有助于SEO
5. 自闭和元素
  - input
  - img
  - br hr
  - meta link
6. property和attribute区别
  - attribute是死的,属性值
  - propetry的值是活的,用户可以更改的值

## 常用属性

参考[笔记](https://251205668.github.io/about/workclass.html#css%E6%98%93%E9%94%99%E5%A4%8D%E4%B9%A0)

## 适配移动端响应式
1. 设置meta标签

```css
<meta name="viewport" content="width=device-width,initial-scale=1.0">
```
2. 媒体查询 **@media (max-width:xxpx){}**

3. 固定viewport的width,响应式适配缩放

4. rem(相对html的`font-size`大小)，常用的方法是配合媒体查询去改变html的font-size,

