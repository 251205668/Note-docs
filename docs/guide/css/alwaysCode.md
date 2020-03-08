## 常用css片段
![](https://image.yangxiansheng.top/img/undraw_tailwind_css_1egw.png?imagelist)

### 垂直居中

```stylus
.item
  position absolute
  top 50%
  left 50%
  transform translate3d(-50%,-50%)
.item
  position absolute
  top 50%
  left 50%
  width 100px
  height 100px
  margin -50px 0 -50px
```
### 全屏显示

```stylus
page
  position fixed
  width 100%
  height 100%
  div
    height 100%
```
:::tip 背景图background拓展
- 多个背景图叠加
  
  效果图:
  ![](https://image.yangxiansheng.top/img/QQ截图20200308193840.png?imagelist)
  `logo`和`title`均为image
  
  **分析:**分为三部分 header盒下: bg盒(蒙层) logo盒(底部背景) title 标题图 
  
  ```stylus
  .header
    position relative
    width 100%
    height 200px
    box-sizing border-box
    overflow hidden
    display flex
    align-items center
    justify-content center
    .bg
      position absolute
      left 0
      top 0
      bottom 0
      background #888
      width 100%
      height 100%
      z-index 2
      opacity .2
    .logo
      position absolute
      top 0
      left 0
      width 100%
      height 200px
      z-index 1
      filter blur(15px)
    .title
      position relative
      width 300px
      height 100px
      z-index 3
      opacity .95
  ```
- 整屏显示一张背景图

效果图:
![](https://image.yangxiansheng.top/img/QQ截图20200308195826.png?imagelist)

```stylus
page
  width 100%
  height 100%
  .bg
    position fixed
    left 0
    top 0
    bottom 0
    width 100%
    height 100%
    z-index 2
```
- 全屏背景
  
  ```stylus
  html
    background url('') no-repeat center center fixed
    background-size cover
  ```
:::

### 图片制为灰色

```stylus
.image
  filter hray
  -webkit-filter grayscale(1)
```
### 背景渐变动画(雪碧图原理)

```stylus
   .bg 
    background-image: linear-gradient(#5187c4, #1c2f45)
    background-size: auto 200%
    background-position: 0 100%
    transition: background-position 0.5s
    &:hover
      background-position 0              
```

:::tip 拓展
box-shadow效果

![](https://image.yangxiansheng.top/img/GIF.gif?imagelist)

```stylus
.item{
      display: flex;
      margin-left: 20px;
      flex-direction: column;
      width: 230px;
      height:300px;
      align-items: center;
      transition: all .3s linear;

    }
    .image-wrapper{
      margin-top: 20px;
    }
    .image-wrapper img {
      display: block;
    }
    .title{
      margin-top: 18px;
      font-size: 14px;
      line-height: 21px;
    }
    .sub-title{
      margin-top: 3px;
      font-size: 12px;
      color:#B0B0B0;
      line-height: 18px;
    }
    .price{
      margin-top: 10px;
      font-size: 14px;
      color:#FF6700;

    }
    .item:hover{
      box-shadow: 0px 4px 8px #0000001f;
      transform: translate3d(0,-3px,0);
    }
```

多行文字截断

```stylus
.text
  display -webkit-box
  -webkit-line-clamp n
  text-overflow ellipsis
  -webkit-box-client vertical
  overflow hidden
```

![](https://image.yangxiansheng.top/img/GIF2.gif?imagelist)

```stylus
.item-text{
      margin-left: 20px;
      width: 476px;
      height: 76px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-box-orient: vertical;
      font-size: 14px;
      color:#545c63;
      line-height: 28px;
      transition: all .1s linear;
      -webkit-transition: all .1s linear;
    }
    .item-text:hover{
      background-color: #fff;
      height: auto;
      min-height: 84px;
      z-index: 5;
      padding: 10px;
      border-radius: 8px;
      box-shadow: 0 8px 16px rgba(7,17,27,.2);
      -webkit-line-clamp: inherit;
    }
```
:::

### 文字截断

**单行文本**

```stylus
overflow hidden
text-overflow ellipiss
white-sapce nowrap
```
**多行文本**

```stylus
display -webkit-box
-wekit-line-clamp n
text-overflow ellpisis
overflow hidden
```

**line-height**

```stylus
控制文字只展示两行
line-height 16.5px
max-height 33px

控制文字折行
font-size 12px
width 12px
word-break:break-wrod
```
### 清除浮动

```stylus
.clearfix
  display inline-block
  &:after
    content ""
    clear both
    display box
    height 0
    line-height 0
    visibility: hidden
    
```

### 全局文本

```stylus
body, html
  line-height: 1
  font-weight: 200
  font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif
```

### 扩展点击区域

```stylus
.item
  position relative
  &:before
    position absolute
    content ""
    left -10px
    right -10px
    bottom -10px
    top -10px

```
### 根据分辨率设置不同的背景图

```stylus
bg-image($url)
  background-image: url($url + "@2x.png")
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)
    background-image: url($url + "@3x.png")

....
.icon
  display inline-block
  width 30px
  height 40px
  background-size 30px 40px
```

### 通用媒体查询
![](https://image.yangxiansheng.top/img/QQ截图20200308213400.png?imagelist)

```stylus

@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
  /* Styles */
}

@media only screen and (min-width : 321px) {
  /* Styles */
}

@media only screen and (max-width : 320px) {
  /* Styles */
}

/* iPad */
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
  /* Styles */
}

@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) {
  /* Styles */
}

@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait) {
  /* Styles */
}

/* 桌面 */
@media only screen and (min-width : 1224px) {
  /* Styles */
}

@media only screen and (min-width : 1824px) {
  /* Styles */
}

@media only screen and (-webkit-min-device-pixel-ratio:1.5), only screen and (min-device-pixel-ratio:1.5) {
  /* Styles */
}

```
### 文本选择样式

```stylus
::selection
  /*stylus*/
```

### 盒阴影

**内盒阴影**

```css
box-shadow:inset 2px 0 4px #000;
```

**外盒阴影**

```css
box-shadow: 0 2px 2px -2px rgba(0,0,0,.5)
```

### 三角形绘制

![](https://image.yangxiansheng.top/img/QQ截图20200308214832.png?imagelist)

```stylus
.bg
  width 0
  height 0
  box-sizing border-box
  border 100px solid
.bg-left
  border-color transparent pink transparent transparent
  ...
```

### 表单输入效果

- 边框阴影

```stylus
input[type=text] {
    transition: all 0.30s ease-in-out;
    outline: none;
    padding: 3px 0px 3px 3px;
    margin: 5px 1px 3px 0px;
    border: 1px solid #ddd;
}
input[type=text]:focus {
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
    padding: 3px 0px 3px 3px;
    margin: 5px 1px 3px 0px;
    border: 1px solid rgba(81, 203, 238, 1);
}
```
- label跳动
  
  ```css
   .els-input{
        margin-left: 20px;
        display: inline-block;
        height: 50px;
        line-height: 50px;
        color: #606266;
        border: 1px solid #dcdfed;
        outline: none;
        padding: 0 15px;
        font-size: 13px;
        border-radius: 4px;
        transition: all .2s;
      }
      .input-wrapper{
        position: relative;
      }
      .label{
        position: absolute;
        font-size: 13px;
        left: 35px;
        top: 18px;
        transition: all .2s;
      }
      .els-input:focus{
        border:1px solid #409EFF;

      }
      .els-input:focus + .label{
          top:5px;
          left: 25px;
          font-size: 10px;
          font-weight: 600;
          opacity: 1;
      }
  ```
