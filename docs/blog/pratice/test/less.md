## less写法学习

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
