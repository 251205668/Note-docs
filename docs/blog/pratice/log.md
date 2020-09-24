# 历史业务需求日志

## 修改手机二维码扫一扫组件和样式

### 需求任务: 

1. 将hover组件和标题组件复用
2. 更改样式

![](https://image.yangxiansheng.top/img/20200825144110.png?imagelist)

### 具体解决方法:

将气泡组件和导航标题合到一起

```vue
<po-popover popper-class="service-po-popover" placement="bottom" trigger="hover">
    <div class="service-popover-hover">
      <div class="inner-code">
        <QRCode :id="id" :url="url" v-if="showItemQR" />
      </div>
      <span class="service-popver-hover-title">扫一扫，立即购买</span>
    </div>
    <span slot="reference">
      <div class="popover-title">
         <span class="service-popover-title">手机购买</span>
      <Icon class="icon-code" type="erweima"></Icon>
      <Icon class="icon-arrow--" type="arrow_down_small"></Icon>
      </div>
    </span>
    </po-popover>

```

更新样式 (保证`ie9+`兼容性)

> 外层用`padding`撑开居中,底部自动hover组件自带居中,控制字号字体。顶部导航样式用`vertical-align`保证居中对齐



## 订单接入支付单需求

### 需求任务:

1. 订单列表页面(此处不需要考虑是否是经办人)，根据接口返回的`operation`和支付单的状态显示不同的状态和操作按钮，每种操作按钮都会有自己的逻辑

   > 操作按钮返回`delete`,`view`不显示按钮，分期支付的情况是`order.payStatus ===5`，这种状态下不用去考虑支付单的数据，因为他不可能返回按钮权限的数据，这时一定是立即支付按钮
   >
   > status 返回的数据只用来映射不同的文案即可，涉及到按钮权限只需要考虑后端的`operation`即可

   ![](https://image.yangxiansheng.top/img/20200825153832.png?imagelist)

2. 订单详情页面，顶部的操作按钮和列表页的显示逻辑基本一致，只是数据从支付单详情页接口中获取。还有就是步骤条处的气泡文案和按钮，这里的气泡文案按照交互稿显示不同的状态和文案，默认文案和其他的不同状态的文案。按钮逻辑中**删除测回按钮**，只展示审核人的信息，且顶部主操作按钮必须放在最右边。当撤回和审核同时存在时，审核是主按钮。

![](https://image.yangxiansheng.top/img/20200825155458.png?imagelist)

![](https://image.yangxiansheng.top/img/20200825155615.png?imagelist)

### 具体解决方法：

逻辑梳理:

```js
取值并处理
  首先需要做好判空处理
  然后将后端返回的按钮权限过滤掉不展示按钮的字段，然后把权限为真的key组成一个新数组使用
  订单详情页面顶部按钮权限数组需要另外做的处理: 1.主按钮放置最右侧 2.当审核和测回按钮同时存在时，审核时主按钮  所以这里根据后端的数据做了倒叙
  订单详情页，支付气泡不需要展示撤回按钮

订单列表页面展示按钮逻辑
  待支付和上海非在线支付大前提下,  如果处理过后的权限数组有值-展示不同的按钮，否者展示默认按钮的条件展示默认支付按钮

订单列表列表页展示支付单状态逻辑
  在支付单状态存在时 枚举遍历显示文案

订单详情页面顶部-展示按钮逻辑
  顶部按钮基本和定点杆列表页相同，就是顺序调整了

订单详情页面支付气泡-展示按钮逻辑
  只有采购商展示，非经办人不展示
  权限存在并且不是撤回权限，展示支付单按钮，否则在能够展示默认按钮的情况下展示默认按钮
订单详情页面支付气泡-展示文案逻辑(较复杂)
   是否经办人
    是否存在支付单状态
    是否审核人
   特殊情况，分期支付支付完成
```



具体操作的组件

```js
页面： orderList,orderDetail  订单列表页和订单详情页面通过redux进行联系

    - handle-option 列表页面操作按钮组件
    - view-option   列表页状态文案组件
    - buyer-order-detail 订单详情页面
      - order-progress-information 订单步骤条组件
        - progress-steps-buyer
          -... payment 支付气泡组件
      - order-information 订单详情信息组件
      - products-information 产品信息组件
      - buyer-top 顶部按钮组件，面包屑组件方式加载进去一个函数，生成按钮
   - RevokePaymentModal 自定义支付单撤回组件
   - not-online-pay 自定义支付单组件
   - online-pay  在线支付组件

```

- 订单列表页面

[mock接口](http://store.yangxiansheng.top/mock/order-list.json)

首先添加文案枚举和按钮文案枚举

```js
export const PAID_APPLICATION_STATUS_ENUM = {
  TO_BE_PAID: '待付款',
  PENDING: '待审核',
  REJECTED: '已驳回',
  REVOKED: '已撤回',
  PAYING: '支付中',
  PAY_FAILURE: '支付失败',
  PAID: '支付成功',
  DELETE: '已删除',
};

export const PAID_APPLICATION_STATUS_BUTTONTEXT = {
  audit: '去审核', // 审核
  revoke: '撤回', // 撤销
  reapply: '重新支付', // 重新支付
  repay: '重新付款', // 重新付款
  pay: '立即付款', // 立即支付
};
```

`handle-option.js`

观察这里的按钮写法，这里是所有的按钮组件可能出现的情况写到了`showOperation`函数中，最后`jsx`渲染时传入参数即可

```jsx
<React.Fragment>
   {this.showOperation(order, contract, operation, shipments, goodsInfo, canChangePrice, isPurchaser, paymentApplicationArray)}
</React.Fragment>
```

![](https://image.yangxiansheng.top/img/20200825163416.png?imagelist)

搞定写哪一块的逻辑后，开始写按钮(**未优化版 按钮并没有做成完全通用组件**)



#### 取值 判空

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



#### 订单列表页面展示按钮

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



#### 自定义通用支付单按钮

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



#### 订单列表支付单状态文案逻辑

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

#### 顶部按钮展示逻辑

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



#### 支付气泡文案和按钮判断

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

按钮部分未采用策略模式修改，改起来会显得比较臃肿



### TODO(DONE)

- 支付组件改成通用组件，包含撤回操作这些，只需要引用这个通用组件，支付单所有按钮都能走通
- 撤回弹窗组件内部集成包含其他单据唤起二次弹窗
- 策略模式改造列表页显示不同按钮权限的判断

## 超出三行隐藏显示展开按钮，展开后可收起

- css方法 (兼容性无法保证ie 而且无法控制行数)

  > 设置一个变量：true -展开更多,false-收起 。然后当字数超过某个值时，展示展开更多按钮。否则不显示。然后在dom上绑定动态的样式，如果是展开更多显示省略号，否者不显示。然后在按钮点击事件切换状态就可以

  ```js
  // 收起给卖家留言
    handleUp = () => {
      const { isShowExpand } = this.state;
      this.setState({
        isShowExpand: !isShowExpand,
      });
    }
  ```

  ```jsx
  {
    comment ? (
      <Fragment>
        <div className={isShowExpand ? 'fold-text' : 'expand-text'}>{comment}</div>
        {
          comment.length > 100 ? (
            <div className="expand-or-fold-btn" onClick={this.handleUp}>{expandBtnText}</div>
          ) : null
        }
      </Fragment>
    ) :
      '-'
  }
  
  ```

  

- js方法（省略号在最后一个文字的后面,样式会有点难看,需要控制字体大小）

  >首先获取评论区域容器高度，如果大于三行的最大高度,则把容器高度设置为三行的最大高度，然后把展开更多按钮展示，否者设置为自适应高度。
  >
  >设置一个变量为查看更多按钮还是收起按钮,点击时还是判断是否是查看更多，然后设置容器高度为三行最大高度。dom样式那边添加一个伪类，省略号。

  ```jsx
  {comment ? (
    <div ref={this.textRef} 
      className={`products-information-text ${isShowExpand && showcollapseBtn ? 'products-information-fold' : ''}`}
    >
      {comment}
    </div>
  ) : '-'
  }
  {
    this.state.isShowExpand ? 
      <div className="expand-or-fold-btn" onClick={this.handleUp}>{expandBtnText}</div> :
      ''
  }
  
  ```

  ```js
   componentWillReceiveProps() {
      const { comment } = this.props.order;
      if (comment && this.state.commentText !== comment) {
        this.setIsShowExpand();
        this.setState({
          commentText: comment,
        });
      }
    }
    // 初始化判断是否显示展开按钮
    setIsShowExpand() {
      const { maxMoreHeight } = this.state;
      if (this.textRef.current.offsetHeight > maxMoreHeight) {
        this.textRef.current.style.height = maxMoreHeight + 'px';
        this.setState({
          isShowExpand: true,
        });
      } else {
        this.textRef.current.style.height = 'auto';
        this.setState({
          isShowExpand: false,
        });
      }
    }
  
    // 收起给卖家留言
    handleUp = () => {
      const showcollapseBtn = !this.state.showcollapseBtn;
      if (showcollapseBtn) {
        this.textRef.current.style.height = this.state.maxMoreHeight + 'px';
      } else {
        this.textRef.current.style.height = 'auto';
      }
      this.setState({
        showcollapseBtn,
      });
    }
  
  ```

  ```less
   .products-information-text {
      position: relative;
    }
    .products-information-fold {
      overflow: hidden;
      &::after {
        content: '...';
        position: absolute;
        width: 16px;
        height: 22px;
        padding-right: 2px;
        right: 0;
        text-align: right;
        bottom: 0;
        background: #fff;
      }
    }
  ```

  

## 修改表格某些数据超出省略样式和使用灵活使用pover组件

待编写


## 下单成功页接入积分组件

待编写



## 商品详情页商品快照需求

待编写


## 商家 sass 和优化弹窗

待
