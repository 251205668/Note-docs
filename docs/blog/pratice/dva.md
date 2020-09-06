# 入门dva

![](https://user-gold-cdn.xitu.io/2018/6/26/1643a3b7f03fdca4?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1)

[dva](https://github.com/dvajs/dva)是国内蚂蚁大佬在react基础上做的一层封装的轻量框架，深受大家喜欢，而且我司react项目也是基于dva上写的，所以本文记录学习框架的笔记

## 初始化

起步项目,然后快速构建一个项目。

1. 在`routes`下新建一个产品组件

   ```js
   import React from 'react'
   
   const Demo  = ()=>{
     return (
       <h2>111</h2>
     )
   }
   
   export default Demo
   
   ```

2. 在`router,js`添加路由信息

   ```js
   import Demo from './routes/demo'
   
   <switch>
   <Route path="/demo" exact component={Demo}></Route>  
   </switch>
   ```



## 新建页面

新建一个`页面`需要做的事情

首先在`routes`下新建**容器组件**，该组件的作用就是连接`UI`组件将数据传给`UI`组件

一般参数就是解构`props`的`dispatch`和state的数据

```js
import React from 'react'
import {connect} from 'dva'
import ProductList from '../components/ProductList'

const Products = ({dispatch,products})=>{
  function handleDelete(id){
    dispatch({
      // action在model层中定义,type为namespace+type拼接 payload表示传递参数
      type:'products/delete',
      payload:id
    })
  }
  return (
    <div>
    //传递数据给UI组件
      <ProductList onDelete={handleDelete} products ={products}></ProductList>
    </div>
  )
}
// 每个参数都是返回一个对象,第一个是state里的数据映射到props
export default connect(({products})=>({
  products
}))(Products)
```



接下来就是分别书写`model`和`UI`组件

```js
// model层组要是操作store中的数据和定义reducers和异步操作的effects
export default{
  // 每个state都有key值,调用dispatch时需要拼接到type前
  namespace:'products',
  state:[],
  reducers:{
    'delete'(state,{payload:id}){
      return state.filter(item=>item.id !== id)
    }
  },
  effects:{
    ...
  }
}

```

`UI`组件 接受容器组件传递过来的事件和数据,然后绑定事件操作数据

```js
import React from 'react'
import ProTypes from 'prop-types';
import {Popconfirm,Button,Table} from 'antd'

const ProductList = ({onDelete,products})=>{
  const columns = [
    {
      title:'Name',
      dataIndex:'name',
    },
    {
      title:'Actions',
      render:(text,record)=>{
        return (
          <Popconfirm title="onDelete?" onConfirm={()=>onDelete(record.id)}>
            <Button type="primary">Delete</Button>
          </Popconfirm>
        )
      }
    }
  ]
  return (
    <Table dataSource={products} columns={columns}></Table>
  )
}
// 校验props
ProductList.prototype = {
  onDelete:ProTypes.func.isRequired,
  products:ProTypes.array.isRequired
}
export default ProductList

```

最后就是定义路由

```js
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/demo" exact component={Demo}></Route>
      </Switch>
    </Router>
  );
}
```

## 同步action和异步action

**Reducer**

在`model`分开时

```js
export default {
  namespace:'products',
  state:[],
  reducers:{
    'delete'(state,{payload:id}){
      return state.filter(item=>item.id !== id)
    }
    ....
  }
}
```

**Effect**

```js
export default{
  namespace：‘todos’,
  effects:{
    // 定义函数添加上*通配符
      * getExpress({ payload }, { call, put }) {
      const response = yield call(Services.orderExpress, payload);
      yield put({
        type: 'queryExpress',
        payload: response,
      });
    }
  }
}
```

底层使用到了`redux-saga`实现，语法上使用到了`ES6`的`generator`函数

主要记住这几个API

- call

  用于调用API请求 `call(func,...args)`

  ```js
  const response = yield call(Services.queryStatistic, payload);
  ```

- put

  触发`action`更新数据

  ```js
   yield put({
    type: 'getStatistic',
    payload: response,
  });
  ```

- takeEvery

  监听action,监听到就调用方法

  ```js
  function * mySaga(){
    yield takeEvery(actionType,method)
  }
  ```


