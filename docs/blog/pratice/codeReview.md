# 记一次codereview

![](https://user-gold-cdn.xitu.io/2017/10/17/a834bab8990fe27aad7b9b211ab8b5c6?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

就在昨天晚上，交易平台前端为我准备了一个特别的礼物-作为实习生进行一次code-review。过程中十分深刻，自那以后我从内心深处对团队成员发自肺腑的佩服。此记作为记录，或作笔记。


## code-review准备(战前准备)

虽然`code-review`是将代码分享出来，然后团队成员一起讨论优化给出意见，但是作为实习生就应该在`code-review`之前将代码尽自己的最大能力优化，争取做到不后悔。毕竟这像是程序员之间的批斗会 👶,所以在上周接到师姐的嘱咐之后我就开始了优化之路。

首先我从这次的交易中心订单接入支付单项目需求下手，整理出来需求概述，主要逻辑，主要操作的组件代码，主要可以优化点，未来需要做的点，从这些方面下手做出来一份[md文档](https://easydoc.xyz/doc/10774443/ZrD8l3Q7/tbiuZkrF)。因为我这个人如果没有良好的规划，做事情老是喜欢丢三落四。ok，完成第一步。

## code-review准备(优化代码)

首先先把需要优化代码的需求列出来，这次需求主要操作的对象就两个，一是状态，而是按钮权限。

1. 订单列表页面(此处不需要考虑是否是经办人)，根据接口返回的`operation`和支付单的状态显示不同的状态和操作按钮，每种操作按钮都会有自己的逻辑

   > 操作按钮返回`delete`,`view`不显示按钮，分期支付的情况是`order.payStatus ===5`，这种状态下不用去考虑支付单的数据，因为他不可能返回按钮权限的数据，这时一定是立即支付按钮
   >
   > status 返回的数据只用来映射不同的文案即可，涉及到按钮权限只需要考虑后端的`operation`即可

   ![](https://image.yangxiansheng.top/img/20200825153832.png?imagelist)

2. 订单详情页面，顶部的操作按钮和列表页的显示逻辑基本一致，只是数据从支付单详情页接口中获取。还有就是步骤条处的气泡文案和按钮，这里的气泡文案按照交互稿显示不同的状态和文案，默认文案和其他的不同状态的文案。按钮逻辑中**删除测回按钮**，只展示审核人的信息，且顶部主操作按钮必须放在最右边。当撤回和审核同时存在时，审核是主按钮。

![](https://image.yangxiansheng.top/img/20200825155458.png?imagelist)

![](https://image.yangxiansheng.top/img/20200825155615.png?imagelist)


下面我就根据几个方面去优化之前写的代码


### 取值 判空

判空未优化版

```js
const prePaymentApplication = prepaymentApplications.length ? prepaymentApplications[0] : {};
const prePaymentOperationArray =Object.keys(prePaymentApplication).length? Object.keys(prePaymentApplication.operation).filter(item => item !== 'view' && item !== 'delete') : [];
const prePaymentOperation =prePaymentOperationArray.length? prePaymentOperationArray.filter(item => prePaymentApplication.operation[item]):[];
// 支付申请id
const applicationId =prepaymentApplications.length? prePaymentApplication.applicationId : '';
// 判断是否含有其他单据
const isMultiplyPay =prepaymentApplications.length? prePaymentApplication.isMultiplyPay :false;
// 不是分期支付但是状态是支付完成 支付中 删除
const notShowBtn = (prePaymentApplication.status === 'PAYING') || (prePaymentApplication.status === 'PAID' && order.payStatus === 2)


```

判空优化版本 **传值的时候就做好prepaymentApplication为null的处理**

```js
 // 提取支付单按钮和状态
  const prePaymentApplication = prepaymentApplications[0] || {};
  const prePaymentOperationArray = Object.keys(prePaymentApplication.operation || {}).filter(item => item !== 'view' && item !== 'delete')
  const prePaymentOperation =prePaymentOperationArray.filter(item => prePaymentApplication.operation[item])
// 支付申请id
  const applicationId =prePaymentApplication.applicationId || ''
// 判断是否含有其他单据
  const isMultiplyPay =!!prePaymentApplication.isMultiplyPay;
// 不是分期支付但是状态是支付完成 支付中 删除
  const notShowBtn = (prePaymentApplication.status === 'PAYING') || (prePaymentApplication.status === 'PAID' && order.payStatus === 2)
```



### 订单列表页面展示按钮

未优化版

```js
if(operation.payOnline || operation.waitSelectPay) {
  // 函数和按钮可以先定义出来
  // 如果有其他单据，则唤起二次确认弹窗，这里可以定义到撤回组件内部
   const showisMultiplypay = () => {
        if (isMultiplyPay) {
          Modal.confirm({
            title: '撤回后,相关联的交易支付将同步撤回',
            content: '该订单所在的支付记录已包含其他单据信息，撤回操作将同步影响相关联单据的支付申请。',
            closable: true,
            onOk() {
              this.setState({
                revokeModeVisible: true,
              });
            },
          });
        } else {
          this.setState({
            revokeModeVisible: true,
          });
        }
      };
  // 分期支付情况
  if(payStatus === 5){
    actions.push(defaultBtn)
  }
  // 非分期支付 目前的写法需要优化,判断太多，可读性很差
  // 目前的逻辑是 判断application是否为空,如果为空就显示立即支付按钮,如果存在,遍历为真按钮权限数组然后插入按钮
  // 做成通用型组件之后，只需要判断Application是否存在,然后显示立即支付按钮 然后就是推入通用按钮即可
    prepaymentApplications?  prePaymentOperation.forEach((item)=>{
       
        const revokeBtn = (
          <a 
            size="small" 
            type="primary"
            className="button-block" 
            key="33" 
            type="secondary" 
            style={{ marginBottom: '5px' }} 
            onClick={showisMultiplypay}
          >撤回
          </a>
        );
  
        const payBtn = (
          <OnlinePayButton 
            refreshPage={currentSearch}
            isMultiplyPay={isMultiplyPay} 
            orderId={id} 
            order={order} 
            applicationId={applicationId}
            style={{ marginBottom: '5px' }} 
            text={PAID_APPLICATION_STATUS_BUTTONTEXT[item]}
            prePaymentOperation={item}
            prePayMentId={prePayMentId}
            key="34"
          />
        );
  
        const btnTypeMap = {
          view: null,
          audit: payBtn,
          revoke: revokeBtn,
          delete: null,
          reapply: payBtn,
          repay: payBtn,
          pay: payBtn,
        };
        actions.push(btnTypeMap[item])
      }): actions.push(defaultBtn)
  
}
```

优化之后

```js
  if(payMode === 0) {
    const defaultBtn = (
          <NotonlinePayButyon
            refreshPage={currentSearch}
            applicationId={applicationId}
            order={order}
            style={{ marginBottom: '5px' }}
            text="立即支付"
            key="35"
            prePayMentId={prePayMentId}
          />
        );
        prePaymentOperation.length?  prePaymentOperation.forEach((item)=>{
          const payBtn = (
            <NotonlinePayButyon 
              refreshPage={currentSearch}
              isMultiplyPay={isMultiplyPay} 
              order={order} 
              isButton = {item !== 'revoke'}
              applicationId={applicationId}
              style={{ marginBottom: '5px' }} 
              text={PAID_APPLICATION_STATUS_BUTTONTEXT[item]}
              prePaymentOperation={item}
              prePayMentId={prePayMentId}
              key="34"
            />
          );
          // 上面的代码过度封装 其实只需includes判断即可
          ['view','delete'].includes(item) ? null : actions.push(payBtn)
        }): !notShowBtn && actions.push(defaultBtn)
      }
}
```



### 自定义通用支付单按钮

优化前

```js
/**
   * 点击按钮后出发事件 这里需要使用策略模式优化
   */
  const onPay = () => {
    const { hasPurchasePlan, status } = order;
    if (status === 18) {
      if (prePaymentOperation === 'reapply') {
        // 判断是否含有其他单据
        if (isMultiplyPay) {
          // 按钮权限为重新支付
          confirm({
            title: '重新支付后,相关联的交易支付申请将同步支付',
            content: '该订单所在的支付记录已包含其他单据信息，支付操作将同步影响相关联单据的支付申请。',
            closable: true,
            onOk() {
              selectPayModeComponent();
            },
          });
        } else {
          selectPayModeComponent();
        }
      } else if (prePaymentOperation === 'repay' || prePaymentOperation === 'pay') {
        getCheckoutCounterHref();
      } else if (prePaymentOperation === 'audit') {
        window.open(`${window.envHref.sync}/payment-management/index.html#/purchaser/payment/application-detail/${applicationId}`, '_blank');
        showAudit();
      } else {
        // 无采购资金，选择在线支付 or 线下支付
        selectPayModeComponent();
      }
    } else {
      getOnlinePayHref();
    }
  };


```

使用策略模式优化后

```js
// 点击按钮
  const onPay = () => {
    const { status } = order;
    // 整理按钮事件map
    const btnMaps = {
      revoke: handleRevoke,
      audit: toAudit,
      reapply: handleRepply,
      pay: getCheckoutCounterHref,
      repay: getCheckoutCounterHref,
    };
    if (status === 18) {
      prePaymentOperation ? btnMaps[prePaymentOperation]() : selectPayModeComponent();
    } 
  };

```

自定义撤回弹窗组件

```jsx
import React, { Component } from 'react';

import { Modal, Input, Form, Alert } from 'doraemon';
import { connect } from 'dva';

const FormItem = Form.Item;
const { TextArea } = Input;

// 连接redux数据
@connect()
// 创建ant Form实例
@Form.create()
export default class revokePayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revokeShow: true,
    };
  }
  handleOk = () => {
    const { id, form: { validateFieldsAndScroll }, currentSearch } = this.props;
    // 表单校验回调函数
    validateFieldsAndScroll((error, data) => {
      if (error) {
        throw error;
      }
      const { dispatch } = this.props;
      dispatch({
        type: 'orderListModel/revokepayApplication',
        payload: {
          id,
          reason: data.revokeReason,
        },
      }).then((res) => {
        this.setState({ revokeShow: false });
        if (res && res.success) {
          currentSearch();
        } else {
          Modal.error({
            title: res.message,
          });
        }
      });
    });
  }

  render() {
    const {
      visible = false, // 弹窗是否可见
      handleCancel, // 点击取消时调用的方法
      modalTitle,
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    return this.state.revokeShow ? (
      <Modal
        title={modalTitle}
        visible={visible}
        onOk={this.handleOk}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Alert style={{ marginBottom: '20px' }} message="您确定要撤回该支付申请吗？已审核的支付申请撤回后需重新审核" type="secondinfo" />
        <div className="model-textarea">
          <Form>
            <FormItem {...formItemLayout} label="撤回原因">
              {
                // 表单项 添加校验规则
                getFieldDecorator('revokeReason', {
                  rules: [{
                    required: true,
                    message: '请输入撤回原因',
                  }],
                })(
                  <TextArea maxLength="200" placeholder="请输入" />
                )
              }
            </FormItem>
          </Form>
        </div>
      </Modal>
    ) : '';
  }
}

```



### 订单列表支付单状态文案逻辑

状态文案这边修改`view-option`这个文件即可

```jsx
{
  status === 18 && prepaymentStatus ? (
    <div className="status-info-detail-tip">{'(' + PAID_APPLICATION_STATUS_ENUM[prepaymentStatus] + ')'}</div>
  ) : ''
}
```

- 订单详情页面

首先顶部按钮部分和列表页逻辑基本一致。只是有几个按钮的顺序和样式需要调整,审核按钮和撤回按钮都存在时,审核按钮为主操作按钮放最右边。而后端返回数据审核按钮是最先的(因为a开头)，所以这时需要将过滤后的数组按字母倒叙排序即可

```js
// 支付单状态和按钮权限
  const prePaymentOperationArray = Object.keys(prepaymentDetail.operation || {}).filter(item => item !== 'view' && item !== 'delete') || [];
// 处理过后的权限为一个数组 并且按倒叙排序
  const prePaymentOperation = prePaymentOperationArray.filter(item => prepaymentDetail.operation[item]).sort((a,b) => a > b ? -1:0);
```

### 顶部按钮展示逻辑

```js
 {(orderOperation.payOnline || orderOperation.waitSelectPay) && (isPayOnline ?  
  <PayOnline 
  text="立即支付" 
  orderId={order.id} 
  order={order} 
  refreshPage={component.refreshPage} /> 
  : 
  (
    prePaymentOperation.length ? prePaymentOperation.map(item=>{
    // 三种支付单场景按钮
    const revokeBtn = <Button 
      size="small" 
      key="33" 
      type="default" 
      style={{ marginBottom: '5px' }} 
      onClick={showisMultiplypay}>撤回</Button>

    const payBtn = <NotPayOnline 
      prePayMentId={prepaymentId}
      isMultiplyPay={isMultiplyPay}
      applicationId={applicationId}
      text={PAID_APPLICATION_STATUS_BUTTONTEXT[item]} 
      orderId={order.id} 
      order={order}  
      refreshPage={component.refreshPage} 
      prePaymentOperation={item}  />
      const btnTypeMap = {
        revoke: revokeBtn,
        view: null,
        audit: payBtn,
        delete: null,
        reapply: payBtn,
        repay: payBtn,
        pay: payBtn,
      };
    return  btnTypeMap[item] 
  }): !notShowBtn && defaultBtn
  )
  ) }
```



### 支付气泡文案和按钮判断

未优化版:三元运算符疯狂嵌套,吐了

```js
 {
    !isPayOnline ? (
      <p>
        {/* 支付气泡文案 */}
        {isOrderOperator ? (prePaymentStatus ? !isAuditor && TipText[prePaymentStatus] : '· 您已验收成功,请及时支付') : (prePaymentStatus ? ITipText[prePaymentStatus] : ` · 需要采购单位采购经办人(${purchaserName})发起支付    `)}
        {/* 单独抽离的审核人去审核文案 */}
        {
          isOrderOperator && prePaymentStatus && isAuditor &&
         '· 支付申请已提交,请及时审核    '
        }
        {/* 分期支付支付成功也要展示文案 */}
        {
          order.payStatus === 5 && prePaymentStatus === 'PAID' && '· 您已验收成功,请及时支付'
        }

        {/* 操作按钮非（撤回和查看删除） */}
        {
          isOrderOperator && (prePaymentOperation ? (prePaymentOperation !== 'revoke' ? PayBtn : '') : prePaymentStatus !== 'PAID' && prePaymentStatus !== 'PAYING' && defaultBtn)
        }
      </p>
    ) :
      !prepaid && (
        <p>
          · 您已验收成功，请及时支付{' '}
          <PayOnline
            isButton
            orderId={orderId}
            order={order}
            text="立即支付"
            size="tiny"
            refreshPage={refreshPage}
          />
        </p>
      )
  }
```



优化版(第一版) if-else。简化代码

```js
 // 当前渲染文案
  let renderText = null
  // 分期支付支付完成
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


 // 按钮展示逻辑
  let btn = null
  if(isOrderOperator){
    const notShowBtn = (prePaymentStatus === 'PAYING') || (prePaymentStatus === 'PAID' && payStatus === 2)
    if(prePaymentOperation){
      // 不展示撤回按钮
      if(prePaymentOperation !== 'revoke'){
        btn = PayBtn
      }
    }else if(!notShowBtn){
        btn = defaultBtn
    }
  }
```



优化版(第二版)  策略模式大法好。[参考文章](https://juejin.im/post/6844904194575433735)

```js
// isOrderOperator:是否是采购经办人 prePaymentStatus:是否存在支付单状态 isAuditor：是否是审核人
// 策略模式渲染不同条件下的文案和按钮
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

## code-review进行(战斗打响)

首先我将我这次的需求和主要的逻辑讲给了团队成员，然后便展示我之前准备的文档，边演示我的代码效果，然后就讲了我自己优化的几版代码。展示完成之后，大家对我的一些代码比较认可，但是还是存在几个需要拿出来优化的问题，然后我向大家抛出了几个问题。

- 取值

前端在对接接口时需要注意，后端给的字段可能是空的null。也就是说如果前端没有做任何空值判断就会影响页面直接抛出异常，导致页面白屏。

我一开始的代码，虽然考虑到了判空问题，但是每次都去做了判断，非常难看

```js
const prePaymentApplication = prepaymentApplications.length ? prepaymentApplications[0] : {};
const prePaymentOperationArray =Object.keys(prePaymentApplication).length? Object.keys(prePaymentApplication.operation).filter(item => item !== 'view' && item !== 'delete') : [];
const prePaymentOperation =prePaymentOperationArray.length? prePaymentOperationArray.filter(item => prePaymentApplication.operation[item]):[];
// 支付申请id
const applicationId =prepaymentApplications.length? prePaymentApplication.applicationId : '';
// 判断是否含有其他单据
const isMultiplyPay =prepaymentApplications.length? prePaymentApplication.isMultiplyPay :false;
// 不是分期支付但是状态是支付完成 支付中 删除
const notShowBtn = (prePaymentApplication.status === 'PAYING') || (prePaymentApplication.status === 'PAID' && order.payStatus === 2)
```

后面我在接口调用之后，父组件拿到接口的数据之后向下传递时设置默认值，这样判空的工作量就会少很多

```js
 // 提取支付单按钮和状态
  const prePaymentApplication = prepaymentApplications[0] || {};
  const prePaymentOperationArray = Object.keys(prePaymentApplication.operation || {}).filter(item => item !== 'view' && item !== 'delete')
  const prePaymentOperation =prePaymentOperationArray.filter(item => prePaymentApplication.operation[item])
// 支付申请id
  const applicationId =prePaymentApplication.applicationId || ''
// 判断是否含有其他单据
  const isMultiplyPay =!!prePaymentApplication.isMultiplyPay;
// 不是分期支付但是状态是支付完成 支付中 删除
  const notShowBtn = (prePaymentApplication.status === 'PAYING') || (prePaymentApplication.status === 'PAID' && order.payStatus === 2)
```

但是中间有一个部分取值做处理写的很乱，中间权限数组获取的方法，我的思路是先将不展示权限的key从对象key数组中清除，然后在过滤出key为真的权限数组，最后做了一个倒序。写起来其实不需要上诉那么麻烦，只需一个`for in`即可解决

判空这方面，可以借助`lodash`的_get方法，内部已经做好空值或者undefined处理

```js
 const prePaymentOperationArray = [];
        for(const key in prePaymentOperation) {
          if (!['view', 'delete'].includes(key) && prePaymentOperation[key]) {
            prePaymentOperationArray.push(key)
          }
        }
```

- 通用组件到底通不通用

我一开始只是将支付单组件的支付，付款，审核写入组件内部逻辑，但是并未写撤回这一权限，是因为当时撤回这个按钮并不是一个按钮，而是展示一个链接，并且在订单详情页面支付气泡不需要展示撤回按钮，这种想法是错误的。这样造成了外部定义了三个相似的组件，造成代码冗余。

大家在一致讨论后指出了这个问题，一致认为需要将所有的情况都放入组件内部考虑，包括默认的情况，样式的话可以通过props传值空值。

接受了大家的建议之后，我将支付单组件几乎做成了一个通用组件，冗余代码量减少了，可读性也增加了，非常感谢建议。

```js
const payBtn = (
            <NotonlinePayButyon 
              refreshPage={currentSearch}
              isMultiplyPay={isMultiplyPay} 
              order={order} 
              isButton = {item !== 'revoke'}
              applicationId={applicationId}
              style={{ marginBottom: '5px' }} 
              text={PAID_APPLICATION_STATUS_BUTTONTEXT[item]}
              prePaymentOperation={item}
              prePayMentId={prePayMentId}
            />
          );

```

- 解决痛点，条件语句嵌套地狱

支付单详情页面文案展示里面出现了一个这样的需求，根据不同的条件展示不同的文案，而且条件很多。

当时我第一版代码写的时候，完全没有考虑到任何渲染问题，直接是用来三元运算符去控制逻辑，但是这样造成了一个极其严重的问题: 完全无法维护，可读性这块只有我自己看得懂，可能过几周我自己也看不懂了。

```js
 <p>
        {/* 支付气泡文案 */}
        {isOrderOperator ? (prePaymentStatus ? !isAuditor && TipText[prePaymentStatus] : '· 您已验收成功,请及时支付') : (prePaymentStatus ? ITipText[prePaymentStatus] : ` · 需要采购单位采购经办人(${purchaserName})发起支付    `)}
        {/* 单独抽离的审核人去审核文案 */}
        {
          isOrderOperator && prePaymentStatus && isAuditor &&
         '· 支付申请已提交,请及时审核    '
        }
        {/* 分期支付支付成功也要展示文案 */}
        {
          order.payStatus === 5 && prePaymentStatus === 'PAID' && '· 您已验收成功,请及时支付'
        }

        {/* 操作按钮非（撤回和查看删除） */}
        {
          isOrderOperator && (prePaymentOperation ? (prePaymentOperation !== 'revoke' ? PayBtn : '') : prePaymentStatus !== 'PAID' && prePaymentStatus !== 'PAYING' && defaultBtn)
        }
      </p>
```

接着考虑到这点问题，我使用了if，else条件语句分别提前将渲染的文字获取，但是这样造成了另一个问题，嵌套地狱，虽然写了注释还是很难看。

```js
// 当前渲染文案
  let renderText = null
  // 分期支付支付完成
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

接着我拜读了掘进上大佬的策略模式经验分享，尝试使用策略模式去改造了我的最后一版代码，效果果然可以，但是还是有一个问题，map撑得太大了，代码量未减少

```js
// isOrderOperator:是否是采购经办人 prePaymentStatus:是否存在支付单状态 isAuditor：是否是审核人
// 策略模式渲染不同条件下的文案和按钮
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

最后在code-review时我想大家说出来这个问题，真的一针见血，`小妖老师`说出的建议对我改造这个策略模式帮助很大。他说其实不用map去写也可以，直接使用对象，将三种条件写到一起，组成一个字符串，然后每个字符串对应一个key，value就是渲染的文字。 接着我依照它的想法改造代码，结果代码量减少到了十一行，我直呼内行，流批流批！！！ 😄😄😄

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


## 小结

这次code-review从准备到进行，然后到后续成果都对我帮助很大，让我深刻意识到优化代码这条路是有多么的漫长，路上虽然很多方法，但是最优解是最好的，但最优解需要经验和见识。以后还需虚心询问大伙，慢慢成长，最后说一句: 代码优化这玩意儿真是一门玄学。。
