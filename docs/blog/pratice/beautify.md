# 前端如何优雅的写代码

## 逻辑判断优化

此文是拜读了我司最近更新的[优化逻辑判断代码](https://juejin.im/post/6859125809655840776)所记下的笔记还有自己的一些看法


### 优化嵌套层级

例:
```js
function supply(fruit,num){
    const redFruit = ['apple','cherry']
    if(fruit){
    if(redFruit.includes(fruit)){
        console.log('红色水果')
        if(num>10){
            console.log('数量大于10的红果')
        }
    }
    }else{
        throw new Error()
    }
    
}
```
**判断非状态,直接return**
```js
function supply(fruit,num){
    const redFruit = ['apple','cherry']
    if(!fruit)throw new Error()
    if(!redFruit.includes(fruit)){
        return
    }
    console.log('红色水果')
    if(num>10){
        console.log('数量大于10')
    }
}
```

### 多分支 多层if-else

1. 使用`switch-case`
```js
function pick(color) {
  // 根据颜色选择水果
  switch (color) {
    case 'red':
      return ['apple', 'strawberry'];
    case 'yellow':
      return ['banana', 'pineapple'];
    case 'purple':
      return ['grape', 'plum'];
    default:
      return [];
  }
}

```
2. 巧妙使用`object`的key属性 首先定义枚举,然后参数当成`key`

```js
const fruitColor = {
  red: ['apple', 'strawberry'],
  yellow: ['banana', 'pineapple'],
  purple: ['grape', 'plum'],
};
function pick(color) {
  return fruitColor[color] || [];
}
```

3. 使用`Map`数据结构简化

```js
const fruitColor = new Map()
.set('red', ['apple', 'strawberry'])
.set('yellow', ['banana', 'pineapple'])
.set('purple', ['grape', 'plum']);

function pick(color) {
  return fruitColor.get(color) || [];
}
```
4. 利用`filter`简化

```js
const fruits = [
  { name: 'apple', color: 'red' }, 
  { name: 'strawberry', color: 'red' }, 
  { name: 'banana', color: 'yellow' }, 
  { name: 'pineapple', color: 'yellow' }, 
  { name: 'grape', color: 'purple' }, 
  { name: 'plum', color: 'purple' }
];

function pick(color) {
  return fruits.filter(f => f.color === color);
}
```
### 多条件判断

**或语句**

如果if里面判断的或条件太多，就很难维护
```js
 if (fruit === 'apple' || fruit === 'strawberry' || fruit === 'cherry' || fruit === 'cranberries' )
```

这种情况优化使用`includes`

```js
// 抽离条件成数组
const redFruit = ['apple','strawberry','cherry']
function supply(fruit){
    if(redFruit.includes(fruit)){
        
    }
}
```
```js
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'grape', color: 'purple' }
];

// 条件：是否有红色水果 
const isAnyRed = fruits.filter(f => f.color == 'red');
```

**且语句**

判断数组里面所有的水果是否都是红色

```js
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'grape', color: 'purple' }
];

function match() {
  // 条件：所有水果都必须是红色 某一个使用some
  const isAllRed = fruits.every(f => f.color === 'red');

  console.log(isAllRed); // false
}
```

### 优化嵌套地狱

if语句
```js
 if(isOrderOperator && order.payStatus === 5 && prePaymentStatus === 'PAID'){
    renderText = '· 您已验收成功,请及时支付'
  } else if (isOrderOperator) {
    // 经办人
    if (prePaymentStatus) {
      if (isAuditor) {
        renderText = '· 支付申请已提交,请及时审核'
      }else{
        renderText = TipText[prePaymentStatus]
      }
    }else{
      // 无状态默认文案
      renderText = '· 您已验收成功,请及时支付'
    }
  }else if(prePaymentStatus){
    // 非经办人
       renderText = ITipText[prePaymentStatus]
  }else{
      renderText = `· 需要采购单位采购经办人(${purchaserName})发起支付`
  }
```
策略模式改进

```js
 const renderPaymentText = ()=>{
  let renderText = null
  const TextMap = new Map([
    [{
      isOrderOperator:true,
      hasPrePaymentStatus:true,
      isAuditor:false
    },
     ()=>{renderText = TipText[prePaymentStatus]}
    ],
     [{
      isOrderOperator:true,
      hasPrePaymentStatus:true,
      isAuditor:true
    },
     ()=>{renderText = '· 支付申请已提交,请及时审核'}
    ],
     [{
      isOrderOperator:true,
      hasPrePaymentStatus:false,
      isAuditor:false
    },
     ()=>{renderText = '· 您已验收成功,请及时支付'}
    ],
     [{
      isOrderOperator:false,
      hasPrePaymentStatus:true,
      isAuditor:false
    },
     ()=>{renderText = ITipText[prePaymentStatus]}
    ],
    [{
      isOrderOperator:false,
      hasPrePaymentStatus:false,
      isAuditor:false
    },
     ()=>{renderText = `· 需要采购单位采购经办人(${purchaserName})发起支付`}
    ]
  ])
  
     const run = (isOrderOperator, hasPrePaymentStatus, isAuditor) => {
      //  提取满足条件的元素组成新数组(二维)
      let action = [...TextMap].find(([key, value]) => (key.isOrderOperator === isOrderOperator && key.hasPrePaymentStatus === hasPrePaymentStatus && key.isAuditor === isAuditor))
      // 遍历执行
      action[1].call(this)
  }

  run(isOrderOperator, hasPrePaymentStatus, isAuditor)
  // 一种特殊情况 分期支付，支付完成 显示待支付文案
  if(isOrderOperator && payStatus === 5 && prePaymentStatus === 'PAID'){
    renderText = '· 您已验收成功,请及时支付'
  }
  return renderText
  }
```

条件简化版策略模式

```js
const renderPaymentText = ()=>{
  let renderText = null
  const TextMap = {
    'true-true-false': `${OrderOperatorText(auditorName,PrepaymentDetail,reason)[prePaymentStatus]}`,
    'true-true-true':'· 支付申请已提交,请及时审核',
    'true-false-false':'· 您已验收成功,请及时支付',
    'false-true-false':`${IOrderOperatorText(purchaserName)[prePaymentStatus]}`,
    'false-false-false':`· 需要采购单位采购经办人(${purchaserName})发起支付`
  }
  renderText = TextMap[`${isOrderOperator}-${hasPrePaymentStatus}-${isAuditor}`]
  // 一种特殊情况 分期支付，支付完成 显示待支付文案
  if(isOrderOperator && isSplitpay && prePaymentStatus === 'PAID'){
    renderText = '· 您已验收成功,请及时支付'
  }
  return renderText
  }
```

## 性能优化
待编写
