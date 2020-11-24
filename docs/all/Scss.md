## Sass

scss和之前学习的stylus相同，只不过语法方面有点不同

### 语法

#### **css函数**

定义函数

```scss
@function px2rem($px){
	@return $px/$ratio +rem;
}
```

#### 片段

```scss
@mixin center{
    display:center;
    justify-content:center;
    align-items:center;
}
```

使用方法

`@include`+函数名

#### **css变量**

```scss
$text-large:20px;
```

#### 使用案例

```scss
@import "./mixin";

$text-large: px2rem(18);
$text-big: px2rem(16);
$text-medium: px2rem(14);
$text-small: px2rem(12);
$text-tiny: px2rem(10);

$text-large-lh: px2rem(20);
$text-big-lh: px2rem(18);
$text-medium-lh: px2rem(16);
$text-small-lh: px2rem(15);
$text-tiny-lh: px2rem(12);

$text-big-max-height3: px2rem(54);
$text-medium-max-height3: px2rem(48);
$text-samll-max-height3: px2rem(42);
$text-big-max-height2: px2rem(36);
$text-medium-max-height2: px2rem(32);
$text-medium-max-height: px2rem(16);
$text-small-max-height2: px2rem(30);
$text-small-max-height: px2rem(15);
$text-tiny-max-height: px2rem(12);

.title-big {
  line-height: $text-big-lh;
  font-size: $text-big;
  max-height: $text-big-max-height2;
  color: #444;
  font-weight: bold;
  @include ellipsis2(3);
}
.title-medium {
  font-size: $text-medium;
  line-height: $text-medium-lh;
  max-height: $text-medium-max-height2;
  color: #444;
  font-weight: bold;
  @include ellipsis2(3);
}
.title-small {
  font-size: $text-small;
  line-height: $text-small-lh;
  max-height: $text-small-max-height2;
  color: #444;
  font-weight: bold;
  @include ellipsis2(2);
}
.sub-title-medium {
  line-height: $text-medium-lh;
  font-size: $text-medium;
  max-height: $text-medium-max-height2;
  color: #666;
  @include ellipsis2(2);
}
.sub-title {
  line-height: $text-small-lh;
  font-size: $text-small;
  max-height: $text-small-max-height;
  color: #666;
  @include ellipsis2(1);
}
.sub-title-tiny {
  line-height: $text-tiny-lh;
  font-size: $text-tiny;
  max-height: $text-tiny-max-height;
  color: #666;
  @include ellipsis2(1);
}
.third-title {
  line-height: $text-small-lh;
  font-size: $text-small;
  max-height: $text-small-max-height;
  color: #999;
  @include ellipsis2(1);
}
.third-title-tiny {
  line-height: $text-tiny-lh;
  font-size: $text-tiny;
  max-height: $text-tiny-max-height;
  color: #999;
  @include ellipsis2(1);
}

```

## Sass技巧

### 手写一个进度条组件的样式

![](https://image.yangxiansheng.top/img/20201020160004.png?imglist)

使用绝对定位将点线分开
```html
 <div className="record-list-item">
  <div className="record-list-item-node" />
  <div className="record-list-item-line" />
  </div>
```
使用 `calc` 运算符控制线条的高度，将最后一个线条的样式置灰

```less
 &-item {
    position: relative;
    padding-left: 36px;
    &-node {
      position: absolute;
      left: 3px;
      top: 20px;
      width: 10px;
      height: 10px;
      border: 2px solid #3177fd;
      border-radius: 50%;
    }
    &-line {
      position: absolute;
      left: 7px;
      top: 32px;
      width: 2px;
      height: calc(~"100% - 14px");
      border: 1px solid #3177fd;
    }
    &:last-child &-line{
      height: calc(~"100% - 32px");
      border: 1px solid #eeeeee;
    }
```

### 使用less对一个控制不同的状态展示不同的样式


![](https://image.yangxiansheng.top/img/20201020160659.png?imglist)

```html
  <span className="status paying">支付中</span>
```

```less
 .status {
    display: inline-block;
    vertical-align: middle;
    margin-right: 16px;
    border-radius: 11px;
    font-size: 12px;
    line-height: 12px;
    padding: 5px 10px;
    text-align: center;
    &.paying {
      background: #e9f0ff;
      color: #3177fd;
    }
    &.paid {
      background: #e3f8e1;
      color: #2cc22c;
    }
```