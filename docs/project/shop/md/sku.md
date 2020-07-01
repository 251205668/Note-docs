# SPU、SKU


## 认识SPU、SKU
一个标准的电商都需要用到`spu`,`sku`来妥善管理好商品.

::: tip

 **SPU**(Standard Product Unit) 标准化产品 -商品

 **SKU**(Stock Keeping Unit) 库存量单位 -商品的规格，单品
:::


这里的SPU-这件商品的信息，SKU-下方可选择配置颜色等

- 每个`sku`由各种规格组成，而几个规格值属于一类规格名。

- `spu`包含一组`sku`,然后单个`sku`包含一组规格数组，规格数组里面的对象由规格名和规格值组成。

![](https://image.yangxiansheng.top/img/20200521161734.png?imagelist)

![](https://image.yangxiansheng.top/img/20200521161807.png?imagelist)

```markdown
规格:
颜色: 暗夜绿 黑色
运存: 64GB 256GB 
版本 : 全网通 电信

规格名：颜色
规格值 : 暗夜绿 黑色
```
> sku状态判断就像是字典里面查字典，如果查不到组合就是不可选状态，如果有就是可选状态.将skuList抽离成一个矩阵 然后进行旋转

```
金属灰 七龙珠 小号s
青芒色 灌篮高手 中号M
青芒色 圣斗士 大号L
橘黄色 七龙珠 大号L
```

## 基本逻辑

可以看到我们[spu详情](https://dongtai.yangxiansheng.top/v1/spu/id/2/detail)返回的数据结构是

```
-- spu
   -- detail
   -- sku_list
      -- sku
         -- detail
         -- specs
            -- spec
            -- spec
            -- spec
   -- code
   
```
<br/>
将里面的拿到的规格数组组成二维数组是这样的

```
金属灰 七龙珠 小号s
青芒色 灌篮高手 中号M
青芒色 圣斗士 大号L
橘黄色 七龙珠 大号L
```
可以发现，将矩阵转置后就可以得到正常显示的规格数组,所以我们要做的事情基本可以确定

![20200624170117.png](https://raw.githubusercontent.com/imageList/imglist/master/20200624170117.png)


## 改变数据结构
我们拿到的`SKU`数据是一个数组,里面包含了对应每项的规格数组,首先需要将它置为一个二维数组，然后将二维数组进行转置,生成想要的数据。

这里我们使用面向对象形式进行处理数据。

::: warning
- Fence-group **sku**面板对象
- Fence **栅栏**对象
- Cell  **规格元素**

转置生成的二维数组之后,将每个规格名相同的规格数组保存到对应的**Fence**下,在这之前可以进行可视规格的相关处理之后,再初始化**Fence**对象
:::
<br/>

**初始定义好的模型**: 

```js
class FenceGroup {
  // 抽离出一个矩阵
  spu
  skuList = []
  fences = []
  constructor(spu) {
    this.spu = spu
    this.skuList = spu.sku_list
  }
}

...

class Fence {
  Cells = []
  specs
  title
  title_id
  constructor(specs) {
    this.specs = specs
    this.title = specs[0].key
    this.title_id = specs[0].key_id
  }
}

...

class Cell{
  title
  id
  status = CellStatus.WAITING
  spec
  constructor(spec) {
    // 设置属性
    this.title = spec.value
    this.id = spec.value_id
    this.spec = spec
  }
}
```
<br/>

首先获取初始状态的二维数组,这里需要定义一个[矩阵](https://github.com/251205668/Magic_Shop/blob/master/magic_shop/components/models/matrix.js)抽分业务,矩阵类需要提供转置遍历等接口。

```js
_createMatrix(){
  const m = []
  this.sku_list.forEach((sku)=>{
    m.push(sku.specs)
  })
  // matrix 矩阵类
  return new Matrix(m)
}
```

然后需要将矩阵转置,转置之后将每个一维数组都抛给[Fence](https://github.com/251205668/Magic_Shop/blob/master/magic_shop/components/models/fence.js)

**矩阵转置:**

```js
transpose(){
  let desArray = []
  for(let j = 0;j < this.col(); j++){
    desArray[j] =[]
    for(let i = 0;i<this.row();i++){
        desArray[j][i] = this.m[i][j]
    }
  }
  return desArray
}
```
<br/>

**初始化规格矩阵**

首先需要定义`Fence`处理规格矩阵方法

```js
init(){
  this.specs.forEach(spec=>{
    // 去重
    const existed = this.cells.some(cell=>cell.id === spec.value_id)
    if(existed){
      return
    }
    // 初始化元素
    const cell = new Cell(spec)
    this.cells.push(cell)
  })
}

```
`Fence-Goup`
```js
initFecnce(){
   const matrix = this._createMatrix(this.skuList)
   const fences = []
   const AT = matrix.transpose(this.skuList)
   // 这里每个二维数组的规格名已经统一
   AT.forEach(specs=>{
     const fence = new Fence(specs)
     fence.init()
     // 暂时判断可视规格
     fences.push(fence)
     this.fences = fences
   })
}
```

## SKU状态处理

在拿到正确的规格矩阵后,并且可以通过面向对象的方式取到**面板数据**

![](https://image.yangxiansheng.top/img/1586610274779.png?imagelist)

<br/>

接下来我们需要做的事情是:当用户点击一个`cell`规格时需要引起其他元素的状态改变,并且高亮选中的路径。确定禁用状态就是`sku`算法的**核心**,状态可分为**选中**,**未选**,**禁用**。


首先规格都是可选的,当用户点击一个规格值时,确认`青芒色`和`七龙珠`是否在一个`sku`路径中存在,如果这条路径找不到,就显示为禁用状态,然后如果存在改变状态为可选后,再确认`青芒色+七龙珠`和尺码选项是否存在,确定禁用状态。

::: danger
这样做思想通常是错误的,因为太线性思考了这个问题,可能存在反向选择，**我们需要在点击青芒色之后算图案尺码六个路径存在性，不存在则禁用，然后点击灌篮高手时再重新计算`青芒色+灌篮高手+尺码`三个路径是否存在,不存在禁用**。
:::

::: tip 规律
总结出来的规律就是: 已选规格的改变，我们都需要计算所有的规格路径,确定好已存在的路径,通过将待确认的路径和其对比就可以确认`SKU`的禁用状态。

所以接下来要做的事情有两件:
- 计算已存在的**sku**路径
- 计算待确定的**sku**路径
:::

### 计算已存在的路径

在每个`SKU`的返回结果中都返回了一个**code**,比如`2$1-45#3-9#4-14`,他代表`SpuId`和`SPU`的这条路径规格字符串。所以这里需要将它进行一个排列组合,然后将所有的组合推到一个数组中才能拿到所有的`sku`路径

这里我们定义一个[judge类](https://github.com/251205668/Magic_Shop/blob/master/magic_shop/components/models/judger.js)处理业务,[SkuCode](https://github.com/251205668/Magic_Shop/blob/master/magic_shop/components/models/sku-code.js)处理code,这里需要借助到传入数组的辅助类[排列组合](https://github.com/251205668/Magic_Shop/blob/4fc92d839dabc4fe1f4a4d3c24f8dd2a03a2cda5/magic_shop/utils/util.js)

**处理Sku的code**

```js
split(){
  const SpuIdAndSpec = this.code.split("$")
  this.SpuId = SpuIdAndSpec[0]
  // 规格数组 然后进行排列数组
  const SpecArray =  SPuIdAndSpec[1].split("#")
  for(let i = 1;i<SpecArray.length;i++){
    // 相当于一个球出现几次的情况
    const result = combine(SpecArray,i)
    // 转为一维数组
   let jointResult = result.map(r=>r.join("#"))
  }
  this.sequment = this.sequment.concat(joinResult)
}
```
<br/>

然后我们需要将每个`sku`的排列组合写入一个数组,这样就计算完成了已存在的路径。
```js
 // 返回所有的字典的路径
  _initpathDirt() {
    this.fenceGroup.spu.sku_list.forEach((s) => {
      const SkuCode = new Code(s.code)
      this.pathDirt = this.pathDirt.concat(SkuCode.seqments)
    })
  }
```
最终结果: `["1-45", "3-9", "4-14", "1-45#3-9", "1-45#4-14", "3-9#4-14", "1-45#3-9#4-14", "1-42", "3-10", "4-15", "1-42#3-10", "1-42#4-15", "3-10#4-15", "1-42#3-10#4-15", "1-42", "3-11", "4-16", "1-42#3-11", "1-42#4-16", "3-11#4-16", "1-42#3-11#4-16", "1-44", "3-9", "4-14", "1-44#3-9", "1-44#4-14", "3-9#4-14", "1-44#3-9#4-14"]`


### 计算待确认的路径

这里算的上是确定`sku`禁用状态最难的地方了。需要改变元素状态,首先需要在`cell`中定义状态属性。这里定义为: **selected** **forbidden** **waiting**

首先需要在组件上传递`cell`的信息,这里需要进行跨组件传递事件,
这里的`x`,`y`也需要传递，方便对`cell`遍历，这俩各参数分别是横列数，通过遍历所得。
```js
 this.triggerEvent('cellTap',{cell:this.properties.Cell,x:this.properties.x,y:this.properties.y},{bubbles:true,composed:true})
```

// TODO: 待确定路径判断 选择联动 细节处理



