
# 前端常见布局

![https://user-gold-cdn.xitu.io/2019/12/9/16eea33e6176a91f?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1](https://user-gold-cdn.xitu.io/2019/12/9/16eea33e6176a91f?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1)

总结各种页面布局,几乎涵盖了网站所有的布局方式,多种方式实现并分析兼容性。[完整地址](https://juejin.im/post/5aa252ac518825558001d5de#heading-0)

## 水平居中
1. text-align 控制文本/行内元素/行内块级元素

```css
.parent{
  text-aligin:center
}
```
::: tip 优缺点

- 优点: 兼容性好
- 缺点: 只对行内内容有效,子元素宽度不能大于父元素宽度,父级必为块状
:::
 
2. margin

```css
.son{
  width:100px;
  margin:0 auto;
}
```
::: tip 优缺点

- 优点: 兼容性好
- 缺点: 必须定宽
:::

3.  多个块级元素

```css
.parent{
  text-align:center;
}
.son{
  display:inline-block;
}
```
::: tip 优缺点

- 优点: 兼容性好
- 缺点: 子元素有元素间距
:::

4. 绝对定位

```css
.parent{
  width:200px;
  position:relative;
}
.son{
  position:absolute;
  left:50%;
  transform:translateX(-50%); 未知宽度
  /* margin-left:-100px */ 已知宽度
}
```
::: tip 优缺点

- 优点: 使用`margin-left`兼容性好
- 缺点: 代码较多,脱离文档流,`transform`兼容性不好(ie9+)
:::

5. flex

```stylus
.parent
  display flex
  justify-content center
```
::: tip 优缺点

- 优点: 功能强大 
- 缺点: pc端兼容性不好,移动端(Android4.0+)
:::

## 垂直居中

1. 单行文本

```stylus
.parent
  height 50px
  line-height 50px
```

2. 多行文本

5行显示
```stylus
.parent
  height 150px
  line-height 30px
```
3. 图片

```stylus
.parent
  height 150px
  line-height 150px
  font-size 0 //取消间距  默认图片是基于base-line对齐
```
4. 单个块级元素
  - table-cell 一定要配合`vertical-align`使用
    
    ```stylus
    .parent
      display table-cell
      vertical-align:middle
    ```
  - 绝对定位 老方法父相子绝,`margin-left` 或者`tarnsform`
  - 使用flex 
  
  ```stylus
  .parent
    display flex
    align-items center
  ```
## 水平垂直居中

1. 行内/行内块级/图
  
  ```stylus
  .parent
    height 150px
    line-height 150px
    font-size 0 //去除图片的间距
    text-align center
    .son
      /*display inline-block*/
      vertical-align middle
  ```

2. table-cell
  
  ```stylus
  .parent
    height 150px
    width 200px
    display table-cell
    vertical-align middle
    // 行内元素的话添加 text-align center
    .son
      width 100px
      height 50px 
      //块级 margin 0 auto
      
  ```
3. button
  button自带text-align :center,把居中的元素表现形式改为行内或行内块级
  ```stylus
    button .class
      height 150px
      width 200px
      outline none
      border none
      .son
        display inline-block
  ```
4. 绝对定位
  
  ```stylus
  .parent
    position relative
    .son
      position absolute
      top 50%
      left 50%
      transform translate(-50%,-50%)
      /*定宽 margin-left:负一半宽度 margin-top -height/2*/
  ```
5. 绝对居中
  
  ```stylus
  .parent
    position relative
    .son
      position absolute
      margin auto
      width 100px
      height 50px
      top 0
      left 0
      right 0
      bottom 0
  ```
6. flex
 
    ```stylus
      .parent
        display flex
        justify-conetnt center
        aligin-items center
    ```
7. 视口居中
  
  ```stylus
  .son
    margin 50vj auto 0
    transform translateY(-50%)
  ```

## 两列布局(定宽写宽度 不定宽不写)
效果图:

![](https://image.yangxiansheng.top/img/QQ截图20200306095035.png?imagelist)

1. float+margin
  html代码:

  ```html
  <body>
  <div id="left">左列定宽</div>
  <div id="right">右列自适应</div>
  </body>

  ```
  css 代码：

  ```css
  #left {
    background-color: #f00;
    float: left;
    width: 100px;
    height: 500px;
  }
  #right {
      background-color: #0f0;
      height: 500px;
      margin-left: 100px; /*大于等于#left的宽度*/
  }

  ```
2. float + overflow
  
  ```css
  #left {
    background-color: #f00;
    float: left;
    width: 100px;
    height: 500px;
  }
  #right {
      background-color: #0f0;
      height: 500px;
      overflow: hidden; /*触发bfc达到自适应*/
  }

  ```
3. 绝对定位

  ```css
    #parent{
    position: relative;  /*子绝父相*/
  }
  #left {
      position: absolute;
      top: 0;
      left: 0;
      background-color: #f00;
      width: 100px;
      height: 500px;
  }
  #right {
      position: absolute;
      top: 0;
      left: 100px;  /*值大于等于#left的宽度*/
      right: 0;
      background-color: #0f0;
      height: 500px;
  }

  ```
4. flex
    
    ```css
      #parent{
    width: 100%;
    height: 500px;
    display: flex;
    }
    #left {
        width: 100px;
        background-color: #f00;
    }
    #right {
        flex: 1; /*均分了父元素剩余空间*/
        background-color: #0f0;
    }


    ```
5. grid
  
  ```css
  #parent {
    width: 100%;
    height: 500px;
    display: grid;
    grid-template-columns: 100px auto;  /*设定2列就ok了,auto换成1fr也行*/
  }
  #left {
      background-color: #f00;
  }
  #right {
      background-color: #0f0;
  }


  ```

## 三列布局(两列定宽 一列自适应)
效果图:

![](https://image.yangxiansheng.top/img/QQ截图20200306100351.png?imagelist)

1. float+margin
  
  html代码:

  ```html
    <body>
    <div id="parent">
        <div id="left">左列定宽</div>
        <div id="center">中间定宽</div>
        <div id="right">右列自适应</div>
    </div>
    </body>

  ```
  ```css
  #parent{
    min-width: 310px; /*100+10+200,防止宽度不够,子元素换行*/
  }
  #left {
      margin-right: 10px;  /*#left和#center间隔*/
      float: left;
      width: 100px;
      height: 500px;
      background-color: #f00;
  }
  #center{
      float: left;
      width: 200px;
      height: 500px;
      background-color: #eeff2b;
  }
  #right {
      margin-left: 320px;  /*等于#left和#center的宽度之和加上间隔,多出来的就是#right和#center的间隔*/
      height: 500px;
      background-color: #0f0;
  }
  ```
2. float+overflow
  
  ```css
  #parent{
    min-width: 320px; /*100+10+200+20,防止宽度不够,子元素换行*/
  }
  #left {
      margin-right: 10px; /*间隔*/
      float: left;
      width: 100px;
      height: 500px;
      background-color: #f00;
  }
  #center{
      margin-right: 10px; /*在此定义和#right的间隔*/
      float: left;
      width: 200px;
      height: 500px;
      background-color: #eeff2b;
  }
  #right {
      overflow: hidden;  /*触发bfc*/
      height: 500px;
      background-color: #0f0;
  }


  ```
3. flex
  
  ```css
  #parent {
    height: 500px;
    display: flex;
  }
  #left {
      margin-right: 10px;  /*间距*/
      width: 100px;
      background-color: #f00;
  }
  #center {
      margin-right: 10px;  /*间距*/
      width: 200px;
      background-color: #eeff2b;
  }
  #right {
      flex: 1;  /*均分#parent剩余的部分达到自适应*/
      background-color: #0f0;
  }


  ```
4. grid

  ```css
  #parent {
    height: 500px;
    display: grid;
    grid-template-columns: 100px 200px auto; /*设置3列,固定第一第二列的宽度,第三列auto或者1fr*/
  }
  #left {
      margin-right: 10px;  /*间距*/
      background-color: #f00;
  }
  #center {
      margin-right: 10px;  /*间距*/
      background-color: #eeff2b;
  }
  #right {
      background-color: #0f0;
  }


  ```
## 双飞翼布局

![](https://image.yangxiansheng.top/img/QQ截图20200306103056.png?imagelist)
:::tip 关键
- center盒放最前面,且包一层div,一定要设置width:100%,否则无法自适应
- left区块需要用`margin-left:-100%`来提前占位置
- right区块也要占位`margin-left:-width`
- center子元素设置height ,**margin 0 220px 0 120px** 左右和宽度再多出间隔
:::

  ```html
  <body>
<div id="header"></div>
<!--中间栏需要放在前面-->
<div id="parent">
    <div id="center">
        <div id="center_inbox">中间自适应</div>
        <hr>  <!--方便观察原理-->
    </div>
    <div id="left">左列定宽</div>
    <div id="right">右列定宽</div>
</div>
<div id="footer"></div>
</body>

  ```
  css代码
  
  ```css
    
    #header {
    height: 60px;
    background-color: #ccc;
}
#left {
    float: left;
    width: 100px;
    height: 500px;
    margin-left: -100%; /*调整#left的位置,值等于自身宽度*/
    background-color: #f00;
    opacity: 0.5;
}
#center {
    height: 500px;
    float: left;
    width: 100%;
    background-color: #eeff2b;
}
#center_inbox{
    height: 480px;
    border: 1px solid #000;
    margin: 0 220px 0 120px;  /*关键!!!左右边界等于左右盒子的宽度,多出来的为盒子间隔*/
}
#right {
    float: left;
    width: 200px;
    height: 500px;
    margin-left: -200px;  /*使right到指定的位置,值等于自身宽度*/
    background-color: #0f0;
    opacity: 0.5;
}
#footer {
    clear: both;  /*注意清除浮动!!*/
    height: 60px;
    background-color: #ccc;
}


  ```
## 圣杯布局

效果图如上双飞翼:

![](https://image.yangxiansheng.top/img/QQ截图20200306103056.png?imagelist)
:::tip 圣杯布局关键
- 容器盒通过设置`padding `提前给左右两边盒子流出宽度大小的位置
- left 不仅要设置`margin-left:-100%`,还要设置相对定位,left(负值)值大于或等于宽度,多出来的为间隔
- right `margin-left -width`,relative,left:width+
:::
```html
  <body>
  <div id="header"></div>
  <div id="parent">
      <!--#center需要放在前面-->
      <div id="center">中间自适应
          <hr>
      </div>
      <div id="left">左列定宽</div>
      <div id="right">右列定宽</div>
  </div>
  <div id="footer"></div>
</body>

```

```css
#header{
    height: 60px;
    background-color: #ccc;
}
#parent {
    box-sizing: border-box;
    height: 500px;
    padding: 0 215px 0 115px;  /*为了使#center摆正,左右padding分别等于左右盒子的宽,可以结合左右盒子相对定位的left调整间距*/
}
#left {
    margin-left: -100%;  /*使#left上去一行*/
    position: relative;
    left: -115px;  /*相对定位调整#left的位置,正值大于或等于自身宽度*/
    float: left;
    width: 100px;
    height: 500px;
    background-color: #f00;
    opacity: 0.5;
}
#center {
    float: left;
    width: 100%;  /*由于#parent的padding,达到自适应的目的*/
    height: 500px;
    box-sizing: border-box;
    border: 1px solid #000;
    background-color: #eeff2b;
}
#right {
    position: relative;
    left: 215px; /*相对定位调整#right的位置,大于或等于自身宽度*/
    width: 200px;
    height: 500px;
    margin-left: -200px;  /*使#right上去一行*/
    float: left;
    background-color: #0f0;
    opacity: 0.5;
}
#footer{
    height: 60px;
    background-color: #ccc;
}

```

上述两种布局flex grid都可实现,不再码代码
[demo](https://juejin.im/post/5aa252ac518825558001d5de#heading-2)

## 等宽区间布局 

1. float

```html
<body>
<div id="parent">
    <div class="column">1 <p>我是文字我是文字我输文字我是文字我是文字</p></div>
    <div class="column">2 <p>我是文字我是文字我输文字我是文字我是文字</p></div>
    <div class="column">3 <p>我是文字我是文字我输文字我是文字我是文字</p></div>
    <div class="column">4 <p>我是文字我是文字我输文字我是文字我是文字</p></div>
</div>
</body>
```
```css
#parent {
    margin-left: -20px; /*使整体内容看起来居中,抵消padding-left的影响*/
}
.column{
    padding-left: 20px;  /*盒子的边距*/
    width: 25%;
    float: left;
    box-sizing: border-box;
    border: 1px solid #000;
    background-clip: content-box; /*背景色从内容开始绘制,方便观察*/
    height: 500px;
}
.column:nth-child(odd){
    background-color: #f00;
}
.column:nth-child(even){
    background-color: #0f0;
}


```
2. flex

```css
#parent {
    margin-left: -15px;  /*使内容看起来居中*/
    height: 500px;
    display: flex;
}
.column{
    flex: 1; /*一起平分#parent*/
    margin-left: 15px; /*设置间距*/
}
.column:nth-child(odd){
    background-color: #f00;
}
.column:nth-child(even){
    background-color: #0f0;
}

```
