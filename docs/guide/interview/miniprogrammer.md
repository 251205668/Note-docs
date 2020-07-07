# 小程序


##  使用wxs 

处理价格是打折还未打折 打折的原价划线 未打折不划线

```js
function mainPrice(price,discount_price){
    if(!discount_price){
        return price
    }else{
        discount_prce
    }
}
function slashPrice(price,discountpirce){
  if(discountpirce){
    return price
  }else{
    return 
  }
}
```
`wxml`调用

```html
<wxs src="../../wxs/price.wxs" module="p"></wxs>
  <l-price wx:if="{{discountPrice}}" deleted l-class="discount-pirce" color="#888" unit-size="22" size="22" value="{{p.slashPrice(price,discountPrice)}}"></l-price>
```

## **动态计算宽高 是图片自适应高度或宽度**

```js
<image bind:Load="onImgLoad" style="width:{{w}}rpx;heiht:{{h}}rpx">
onImgLoad(event){
    const {width,height} = event.detail
    this.setData({
        w:340rpx;
        h:340rpx*height/width
    })
}
// 或者直接使用mode
```
## 间隔轮播设置
> 采坑：定义组件一定在index.json加上:`components:true`
>
> 小程序wxs导出function 不能再module.exports={}简写
>
> 轮播图设置间距  `previous-margin``next-margin` 

样式代码

```css
1. swiper居中
2. image设置为块状
3. 设置swiper属性
.swiper{
  height: 360rpx;
  width: 100%;
  background: #ffffff
}
swiper-item{
 text-align: center
}

.swiper-img{
  display: inline-block;
  width: 610rpx;
  height: 360rpx;
  border-radius: 10rpx
}
```

## **小程序路由传参**(绑定属性值，传递属性值)

```js
1. 设置传递参数属性 dom上绑定data-属性名
拿到属性 `e.currentTarget.dataset.id`

变量设置只能为小写 大写会报错
2. 绑定点击事件跳转路由
wx.navigateTo({
    url:`/pages/detail/index?pid=${pid}`
})
拿到参数： 子路由通过
onLoad:function `options.pid`拿到传递的参数


业务组件可以这样写 但考虑到通用性 组件里面不应该包含路由跳转事件
所以可以向外触发事件 有父组件进行路由跳转
this.triggleEvent('changeNavigate',{params})
```

**如果传递的参数为对象**

先转为字符串

```js
let obj =JSON.stringify(e.currentTarget.dataset.item)
wx.navigateTo({
    url:`/pages/detail/index?detail=${obj}`
})


// 接收再转回来
let item = JSON.parse(options.obj)
```



## 改变原生组件大小

```css
绑定class 进行缩放
.radio{
    transform:scale(.7)
}
```

## 小程序原生`picker`组件用法

![](https://image.yangxiansheng.top/img/20200510165020.png?imagelist)

```js
<picker bin:change="binPicekerChange" range-key="nickName" value="{{index}}" range=""{{personList}}>

// js
data:{
    personList:[
        {"nickName:"小名","sex":"0"},
          {"nickName:"小民","sex":"1"}
    ]
}
```

## 去除滚动条

```js
::webKit-scrollbar{
    width:0;
    height:0;
    color:transparent;
}
```

## 设置页面高度百分之百

```css
.container{
    position:fixed;
    height:100%;
    width:100%;
    display:flex;
}

page { height: 100vh;  // 或者height: 100% }
```

## 阻止事件冒泡

`catchtap=""`

## 阻止小程序下拉出现白条

```json
// app.json中配置
"window":{
    "enablePullDownRefresh":false
}
```

## 小程序图片上传

```js
handleCancelPic() {
        let id = this.data.dbId;
        wx.chooseImage({
          count: 3, // 默认9
          sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: res => {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths;

            this.setData({
                src: tempFilePaths
            })
            upload(this,tempFilePaths,'','');
          }
        })
    }
然后一个封装好的方法
function upload(page, path,way,id) {
    console.log(path)
  wx.showToast({
    icon: "loading",
    title: "正在上传"
  });
  var test = [],
    that = this;
  for (var i = 0; i<path.length; i++) {
        wx.uploadFile({
          url: api.CancelImg,
          filePath: path[i],          
          name: 'file',
          header: { "Content-Type": "multipart/form-data" },
          success: res => {
            test.push(res);
            wx.setStorageSync('cancelImg',test)
            console.log(test)
            if (res.statusCode != 200) { 
              wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false
              })
              return;
            }else {
                wx.showModal({
                    title: '提示',
                    content: '上传成功',
                    showCancel: false
                }) 
            }
          },
          fail: function (e) {
            console.log(e);
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
          },
          complete: function () {
            wx.hideToast();  //隐藏Toast
          }
        })
    }
这个是多个图片上传的方法，单个图片上传的话，把循环去掉就好。主要是因为微信官方默认的就是一次上传一张图片这个很蛋疼。只能这么搞了。。。

```

## reduce高级用法

传入参数`上一次回调结果`，`当前处理的元素`,`当前处理的下标`,`数组`

1. 计算总和

   ```js
   var arr = [1, 2, 3, 4];
   var sum = arr.reduce(function(prev, cur, index, arr) {
       console.log(prev, cur, index);
       return prev + cur;
   })
   console.log(arr, sum);
   
   打印结果：
   1 2 1
   3 3 2
   6 4 3
   [1, 2, 3, 4] 10
   ```

   

2. 设置上一次回调的初始值

   ```js
   var  arr = [1, 2, 3, 4];
   var sum = arr.reduce(function(prev, cur, index, arr) {
       console.log(prev, cur, index);
       return prev + cur;
   }，0) //注意这里设置了初始值
   console.log(arr, sum);
   
   打印结果：
   0 1 0
   1 2 1
   3 3 2
   6 4 3
   [1, 2, 3, 4] 10
   ```

3. 实战，计算订单总价格

   ```js
      getTotalPrice(){
           return this.orderItems.reduce((pre, item)=>{
               // 返回 回调+item.finalPrice 即为总价格
               const price = accAdd(pre ,item.finalPrice)
               return price
           }, 0)
       }
   ```

4. 加入判断条件

   ```js
       getSatisfactionCount(coupons) {
               return coupons.reduce((pre, coupon) => {
                   if (coupon.satisfaction === true) {
                       return pre + 1
                   }
                   return pre
               }, 0)
           },
   ```

   

## 粘贴板

```js
 onCopyGit(event){
    const index = event.currentTarget.dataset.index
    wx.setClipboardData({
      data: this.data.clipborardData[index]
  })
  },
```



## 音乐播放

## 预览图片

```js
previewImage(event) {
    const cursrc=event.currentTarget.dataset.cursrc
    const ImagList = this.data.spu.spu_img_list.map(item=>item.img)
    wx.previewImage({
      current: cursrc, // 当前显示图片的http链接
      urls:ImagList // 需要预览的图片http链接列表
    })
  },
```
