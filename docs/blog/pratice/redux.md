# 快速上手redux和生态
## 使用Redux

![](https://image.yangxiansheng.top/img/20200804153958.png?imagelist)

基本工作流程:

- ReactComponents - 借书人
- ActionCreators- 借书语句发布器
- store - 图书馆
- Reducers - 馆藏记录

首先`ReactComponents`想要获取`store`里面的哪一条数据,通过`ActionCreators`发布事件,想要获取哪一本书书的数据,然后`store`去`Reducers`去查找数据,最后返回给组件。修改流程也基本相似。     



**基本使用案例**

首先安装`redux`

```bash
$ npm install redux
```

然后在`src`下创建`store`目录，依次创建`index.js`和`reducer.js`



书写`reducer`文件:  相当于图书馆的记录册,里面定义`state`和`action`的记录

```js
// 定义默认state
const defaultState = {
  inputValue:'',
  list:[]
}
export default (state = defaultState,action){
  // 定义action
  return state
}
```

书写入口文件

```js
import {createState} from 'redux'
import reducer from './reducer'

// 第二个参数是调试redux-tools传递的默认参数
const store = createState(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default store
```



**准备好之后在需要使用到`redux`的文件中引入并修改数据**

`Example`

```js
import store from './store'
export default class Test extends Component{
  constructor(props){
    super(props)
    // store.getState() 获取state数据
    this.state = store.getState()  
    this.changeInputValue = this.changeInputValue.bind(this)
  }
  render(){
    return (
    ...
    )
  }
}
```

假设我要改变`inputValue`并且更新当前的`state`

1. 定义`action`

   在方法定义时定义`action`，然后通过`store`的`dispatch`这个API去触发更新

   `action`一遍指定`type`和`value`  就当做`vuex`里面的`mutation`

   ```js
   changeInputValue(e){
     const action = {
       type:'change_input_value',
       value:e.target.value
     }
     store.dispatch(e)
   }
   ```

2. 书写`reducer`

   **判断当前的`action`的类型,然后在旧数据基础上做一层深拷贝,根据`action`改变拷贝的数据然后返回**,提交给`store`，之后`store`会自动讲新数据更新

```js
export default (state = defaultState,action)=>{
  if(action.type === 'change_input_value'){
    const newState = JSON.parse(JSON.stringlfy(state))
    newState.inputValue = action.value
    return newState
  }
}
```

3. 拆分`actions`和`types`

   你会发现当`action`越来越多,`reducer`这个文件就会越撑越大。这里可以继续拆分模块

创建`actionTypes`

```js
export const CHANGE_INPUT_VALUE = 'change_inpu_value'
...
```

创建`actionCreators`

```js
import * as types from  './actionTypes'

export const getChangeInputAction = (value)=>({
  type:types.CHNAGE_INPUT_VALUE,
  value
})
```

最后使用到`action`时

```js
handleChangeInputValue(e){
  const action = actions.getChangeInputAction(e.target.value)
  store.dispatch(action)
}
```

## 结合charles mock本地数据

## 使用redux-thunk改造action

原生的`action`只能封装为一个对象,如果我们想要去封装一些异步的操作和业务逻辑就没法完成,这时候需要借助到`redux中间件`这个概念。

`中间件`是`redux`中`store`和`action`之间的桥梁,它可以在`dispatch`里面传入异步函数



使用`redux-thunk`方法

1. 安装并在`store`的入口文件引入,然后按照[官网](https://github.com/reduxjs/redux-thunk)配置方式配置

   ```js
   import thunk from 'redux-thunk'
   import {createStore,applyMiddleware,compose} from  'redux'
   import reducer from './reducer'
   
   const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
   const enhancer = composeEnhancers(
   applyMiddleware(thunk)
   )
   const store = createStore(reducer,enhancer)
   export default store
   ```

2. 接下来就可以封装包含异步操作的`action`

   ```js
   export const testAction = ()=>{
     // 返回函数时会带上dispatch这个参数
     return (dispatch)=>{
       // 异步操作 或者调用其他action 再dispatch
     }
   }
   ```



## React-redux

`react-redux`简化了使用`redux`中`store`和dispatch`action`的使用，类似于`vuex`的map语法糖

**相关知识点**

`react-redux`将组件分为

- UI组件 (只负责UI呈现,不包含业务逻辑),不使用`state`,所有数据均由`props`提供
- 容器组件 (管理数据和业务逻辑 不负责UI),带有`state`



`connect`方法: 将`UI`组件生成容器组件

```js
import {connect} from 'react-redux'
export default connect(mapStateToProps,mapDispatchToProps)(Todolist)
```

> 阮一峰: `connect`方法接受两个参数：`mapStateToProps`和`mapDispatchToProps`。它们定义了 UI 组件的业务逻辑。前者负责输入逻辑，即将`state`映射到 UI 组件的参数（`props`），后者负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。

- `mapStateToProps`

  建立一个从（外部的）`state`对象到（UI 组件的）`props`对象的映射关系。

  ```js
  const mapStateToProps = (state,ownProps)=>{
    return {
      todos:state.todo
    }
  }
  ```

  

- `mapDispatchToProps`

  用来建立 UI 组件的参数到`store.dispatch`方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。

  ```js
  const mapDispatchToProps = (dispatch,ownProps)=>{
    return {
      handleClick(){
        const action = {
          ...
        }
        dispatch(action)
      }
    }
  }
  ```



**安装和使用**

```bash
$ npm install react-redux
```

1. 在`react`的入口文件中配置`provider`，搭建组件之间和`store`的联系

```js
import {Provider} from 'react-redux'
import Todlolist from './Todolist'
import store from './store' 
...

// 容组件放进容器 bing'jian
const App = (
<Provider store={store}>
  <<Todolist></Todolist>
  </Provider>
)

ReactDom.render(App,document.getElementById('root'))

```

2. 组件连接

   ```js
   import react, {Component} from 'react'
   import {connect} from 'react-redux'
   
   class Todolist extends Component{
     render(
     ..
     )
   }
   
   // 定义State映射关系和dispatch映射关系
   const mapStateToProps = (state)=>{
     return {
       inputValue: state.inputValue
       ....
     }
   }
   
   const mapDispatchToProps = (dispatch)=>{
     return {
       hanldeClick(){
         ... 
         const action = {
           
         }
         dispatch)(action)
       }
     }
   }
     
     
   // 导出连接上store的组件
   export default connenct(mapStateToProps,mapDispatchProps)(Todolist)
   
   ```

3. 使用`state`或者`dispatch`

   ```js
   this.props.inputValue
   this.props.handleClick
   ```
