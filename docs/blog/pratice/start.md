# 如何快速上手公司项目



记得刚开始克隆下项目时，发现自己练需要修改哪一部分的代码都找不到，觉得项目实在是太复杂了，导致编码效率极低，以下是我实习一个月的个人经验总结

以我进入公司接手的第二个需求: 订单接入支付单需求为例

## 定位需求代码，提前想好逻辑

拿到交互稿

![](https://image.yangxiansheng.top/img/20200904154702.png?imagelist)

从这里可以得出:

- 不同的支付单有用不同状态文案
- 不同的身份可能对应不同的按钮
- 每个支付单按钮对应不同的逻辑，需要分别处理

锁定组件代码

从页面上看： 订单列表，订单详情出发。然后观察页面路由:

![](https://image.yangxiansheng.top/img/20200904155118.png?imagelist)

![](https://image.yangxiansheng.top/img/20200904155143.png?imagelist)

锁定代码是在`order-list`,`order-detail`这两个模块下,然后根据调试，将页面功能走一遍，分析一遍数据传递的方向，定位到以下组件

```
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


## 新建页面，配置路由

我们公司这个后台项目类似以之前使用到的`vue-element-admin`，整个页面是由`layout`组件渲染，layout的构成分为三个部分 左侧侧边导航，头部导航和面包屑，然后就是主体部分，这其实也是一个组件，然后通过不同的路由配置展示不同的组件内容。

新建一个页面其实很简单,只需要在`component`目录下新增文件夹，然后将所有的子组件拼到入口文件对应组件目录`index.js`即可

最后就是配置路由: 在component目录`index`里面配置，这里配置是依据`dva`路由

```js
module.exports = [
  {
    url:'对应的新建目录路径',
    view:'路由名称',
    models:['加载的model名称']
  }
]
```


## 优雅使用redux 对接api时需要注意的

首先书写`model`,直接上代码

```js
export default {
  namespace:'test', //唯一标识名称
  state: {
    // 定义需要使用redux的数据
  },
  // 定义异步操作redux的action集合
  effects:{
     // 获取支付单详情
    * getPrepaymentDetail({ payload }, { call, put }) {
      const response = yield call(Services.getprepaymentDetail, payload);
      yield put({
        type: 'setPrepaymentDetail',
        payload: response,
      });
      return response;
    },
  },
  // 定义同步操作redux的action集合
  reducers:{
     // 支付单详情
    setPrepaymentDetail(state, { payload }) {
      const { result = {} } = payload; 
      // 返回新的state
      return {
        ...state,
        PrepaymentDetail: result,
      };
    },
  }
}
```

组件使用


首先需要在组件里面调用`@connect()`,里面参数是一个方法，默认不填也成，如果需要添加loading状态

```js
@connect(({ orderListModel, loading }) => ({
  orderListModel,
  loading: loading.effects['orderListModel/getExpress'],
}))
```
接下来调用就直接使用

```js
 const { dispatch } = this.props;
      return dispatch({
        type: 'orderListModel/getExpress',
        payload: params,
      });
    }
```

如果想要在本组件内获取到redux定义的state数据，直接使用`this.porps.modalName`即可

```js
render(){
  const {
    orderListModal = {}
  }
   =  this.props
   // 取数据
   const {test} = orderListModel || {}
}
```

## 如何自定义组件

自定义函数组件，自定义通用组件。直接贴代码和使用

**自定义撤回组件（class组件**

```js
import React, { Component } from 'react';

import { Modal, Input, Form, Alert } from 'doraemon';
import { connect } from 'dva';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect()
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

**使用**

```js
  <RevokePaymentModal
        id={applicationId}
        currentSearch={refreshPage}
        modalTitle="撤回支付申请"
        visible={revokeModeVisible}
        handleCancel={() => { setRevokeModeVisible(false); }}
      />
```


**自定义支付单组件**(hooks组件)

```js
import React, { useRef, useState } from 'react';
import { Button, request, message, Modal } from 'doraemon';
import './style.less';
import Payment from '@zcy/pc-payment-front-back';
import RevokePaymentModal from 'src/components/Modals/revoke-payment';
import * as Service from 'src/routes/OrderDetail/services/index.js';

const confirm = Modal.confirm;

export default function OnlinePay({
  order = {},
  style = {},
  isButton = true,
  size,
  refreshPage = () => {},
  text = '支付',
  prePaymentOperation,
  isMultiplyPay,
  prePayMentId,
  applicationId,
}) {
  const paymentRef = useRef();
  const [revokeModeVisible, setRevokeModeVisible] = useState(false);


  // @灵匀说的调用支付组件之前调用接口判断采用哪一种组件
  const selectPayModeComponent = () => {
    Service.getPrePaymentPayMode(prePayMentId).then((res) => {
      if (res && res.success) {
        if (res.result === 'TREASURE') {
          paymentRef.current.queryTreasurePaymentInfo();
        } else if (res.result === 'NONE_TREASURE') {
          paymentRef.current.queryNonTreasuryPaymentInfo();
        }
      } else {
        message.error((res && res.message));
      }
    });
  };

  // 展示刷新的确认弹框
  const showRefreshModal = () => {
    Modal.info({
      title: '请在新打开的页面完成支付',
      content: '请在支付完成后再关闭该弹窗',
      okText: '已完成支付',
      // payMode -0是上海
      onOk: order.payMode === 0 ? showSuccessModal : refreshPage,
    });
  };
  
  // 审核弹窗
  const showAudit = () => {
    Modal.info({
      title: '请在新打开的页面完成审核',
      context: '请在审核完成后再关闭弹窗',
      onText: '已完成审核',
      onOk: refreshPage,
    });
  };
  // 支付成功弹窗
  const showSuccessModal = () => {
    Modal.success({
      title: '支付成功',
      content: '您可在支付记录中查看支付详情',
      okText: '我知道了',
      onOk: refreshPage,
    });
  };
  
  // 点击申请之后 跳转到支付申请详情页面
  const goPage = (id) => {
    window.open(`${window.envHref.sync}/payment-management/index.html#/purchaser/payment/application-detail/${id}`, '_self');
  };
  // 重新支付
  const handleRepply = () => {
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
  };
  // 重新付款或者立即付款
  const getCheckoutCounterHref = () => {
    Service.getApplicationCounterHref({
      id: applicationId,
      returnUrl: window.location.href,
    }).then((res) => {
      if (res && res.success) {
        showRefreshModal();
        window.open(res.result);
      } else {
        message.error((res && res.message) || '获取收银台地址失败,请稍后重试'); 
      }
    });
  };
  // 撤回
  const handleRevoke = () => {
    if (isMultiplyPay) {
      Modal.confirm({
        title: '撤回后,相关联的交易支付将同步撤回',
        content: '该订单所在的支付记录已包含其他单据信息，撤回操作将同步影响相关联单据的支付申请。',
        closable: true,
        onOk() {
          setRevokeModeVisible(true);
        },
      });
    } else {
      setRevokeModeVisible(true);
    }
  };
  // 审核
  const toAudit = () => {
    window.open(`${window.envHref.sync}/payment-management/index.html#/purchaser/payment/application-detail/${applicationId}`, '_blank');
    showAudit();
  };

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

  const props = {
    style,
    onClick: onPay,
  };
  const PaymentIds = prePaymentOperation === 'reapply' ? { applicationId } : { prepaymentIds: [prePayMentId] };
  
  return (
    <React.Fragment>
      {isButton ? (
        <Button type={size === 'tiny' ? 'secondary' : 'primary'} className={size === 'tiny' ? 'trade-tiny-button' : ''} size="small" {...props}>
          {text}
        </Button>
      ) : (
        <a className="block-link" {...props}>{text}</a>
      )}
      {/* 支付组件 */}
      {
        <Payment 
          ref={paymentRef}
          goPage={goPage}
          refreshPage={refreshPage}
          {...PaymentIds}
        />
      }
      {/* 撤销支付单申请组件 */}
      <RevokePaymentModal
        id={applicationId}
        currentSearch={refreshPage}
        modalTitle="撤回支付申请"
        visible={revokeModeVisible}
        handleCancel={() => { setRevokeModeVisible(false); }}
      />
    </React.Fragment>
  );
}

```

组件使用

```js
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
```
