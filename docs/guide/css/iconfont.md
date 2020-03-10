
## 全局stylus配置及使用iconfont

![](https://image.yangxiansheng.top/img/QQ截图20200229152631.png?imagelist)

> 在项目的`common`文件夹下新建stylus，然后新建这几个文件

> variable.styl base.styl icon.css index.styl mixin.styl reset.styl  
**相关文件作用**
- variable.styl

定义全局样式变量 例如:字体和颜色
```css
// ! 颜色定义规范
$color-background = #222
$color-background-d = rgba(0, 0, 0, 0.3)
$color-highlight-background = #333
$color-dialog-background = #666
$color-theme = #ffcd32
$color-theme-d = rgba(255, 205, 49, 0.5)
$color-sub-theme = #d93f30
$color-text = #fff
$color-text-d = rgba(255, 255, 255, 0.3)
$color-text-l = rgba(255, 255, 255, 0.5)
$color-text-ll = rgba(255, 255, 255, 0.8)
// !字体定义规范
$font-size-small-s = 10px
$font-size-small = 12px
$font-size-medium = 14px
$font-size-medium-x = 16px
$font-size-large = 18px
$font-size-large-x = 22px

```
- base.styl

设置全局样式，移动端常常这样设置,背景颜色和用户选择, 字体颜色需要根据具体项目进行修改
```css
@import "variable.styl"

body, html
  line-height: 1
  font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif, 'Droid Sans Fallback'
  user-select: none
  -webkit-tap-highlight-color: transparent
  background: $color-background
  color: $color-text
```

- icon.css  图标库样式文件

- mixin.styl 定义stylus预处理函数文件，也就是定义函数代替很多复用的css样式代码，背景颜色等 辅助函数

常见的
```stylus
// 定义背景图的函数，根据设备分辨率进行选择
bg-image($url)
  background-image: url($url + "@2x.png")
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)
    background-image: url($url + "@3x.png")
    
// 省略不换行
np-wrap()
    test-overflow ellipsis
    over-flow hidden
    white-space nowrap

// 扩展点击区域
extend-click()
    position relative
    &:before
        content :""
        position absolute
        top -10px
        left -10px
        right -10px
        bottom -10px

// 清除浮动
clearfix()
    display inline-block
    &:after
        display block
        content: ''
        height 0
        line-height 0
        clear: both
        visibility hidden
```
- reset.styl 引入浏览器初始化文件

```css
/**
 * Eric Meyer's Reset CSS v2.0 (http://meyerweb.com/eric/tools/css/reset/)
 * http://cssreset.com
 */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header,
menu, nav, output, ruby, section, summary,
time, mark, audio, video, input
  margin: 0
  padding: 0
  border: 0
  font-size: 100%
  font-weight: normal
  vertical-align: baseline

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, menu, nav, section
  display: block

body
  line-height: 1

blockquote, q
  quotes: none

blockquote:before, blockquote:after,
q:before, q:after
  content: none

table
  border-collapse: collapse
  border-spacing: 0

/* custom */

a
  color: #7e8c8d
  -webkit-backface-visibility: hidden
  text-decoration: none

li
  list-style: none

body
  -webkit-text-size-adjust: none
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0)

```
-  index.styl 引流全局文件 

```stylus
@import "./reset.styl"
@import "./base.styl"
@import "./icon.styl"

```
main.js全局引入
```js
import './common/stylus/index.styl'
```

1. 添加项目至购物车
2. 下载源代码文件

![](https://image.yangxiansheng.top/img/QQ截图20200229152057.png?imagelist)

3. 删除不需要的文件
,保留这些文件

![](https://image.yangxiansheng.top/img/QQ截图20200229152443.png?imagelist)

4. 改变iconfont.css的引入字体路径

![](https://image.yangxiansheng.top/img/QQ截图20200229163624.png?imagelist)

5. 使用

`<span class="className"></sapn>`
