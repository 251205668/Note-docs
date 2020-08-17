## 安装和使用

安装一个`react`的项目

```bash
npx create-react-app myproject
```

定义一个组件 : 定义一个类集成`React.Component`

```js
class App extends React.Component{
  render(){
    return (
    <div>
      HELLO	
      	</div>
    )
  }
}
```

`Jsx`语法需要引入`React`包,否则无法编译

```js
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

## VSCODE快捷语法

![](https://image.yangxiansheng.top/img/20200803103540.png?imagelist)



常用快捷键

```bash
rcc
rce
rcep
rfce
rcredux

```



## JSX语法

- 在模板上写入`js`代码,必须使用`{}`包起来

  例：

  使用到便利绑定`dom`，需要给每个`dom`绑定一个`key值`

  ```jsx
  return (
  <Fragment>
    <ul>
   {this.state.map((item,index)=>{
        return <li key={index}>{item}</li>
      })}
    </ul>
    <Fragment/>
  )
  ```

  

  

- 绑定事件：在原生js基础上讲事件名首字母大写

```js
<input onChange={this.handleClick.bind(this,params)} />
```

- 定义数据和相关操作

  ```js
  export default class App extends Component{
    constructor(props){
      super(props)
      this.state = {
        inputValue:'',
        list:[]
      }
    }
    render(){
      return (
      )
    }
  }
  ```

  这一点类似于小程序中的事件绑定

  - 取数据`this.state.inputValue`
  - 改编数据 `this.setState({inputValue:'11'})`

  > 一般使用setState()尽量使用函数绑定
  >
  > ```js
  > this.setState(()=>({
  > list:''
  > }))
  > ```
  >
  > 

- 注释

  ```jsx
  {/*多行注释*/}
  {//单行注释}
  ```

- 插入HTML代码

  ```jsx
  <li dangerSetInnterHTML={{__html:html片段}}></li>
  ```

## react相关知识点

### 组件传值

父组件向子组件传值

```jsx
<TodoItem content={item} />
```

子组件取值

```js
this.props.content
```

子组件调用父组件方法

```jsx
{/*1. 父组件传入方法给子组件，需要把this指向父组件*/}
<TodoItem handleItem = {this.deleteItem.bind(this)} />

{//子组件使用方法}
this.props.handleItem()
```

### 定义事件,传参

在`jsx`语法中定义事件需要在原生事件名基础大写

```js
render(){
  return (
  <div onClick={this.handleClick.bind(this)}></div>
  )
}
```

如果需要传递参数的话，需要用箭头函数接受,这样就不需要绑定`this`

```js
onChange = {()=>{this.handleClick()}}
```



### 单向数据流

`react`只允许父组件向子组件传值,但是子组件不允许直接改变父组件传递过来的值,这个值是只读属性。这种传递方式方便调试维护

如果要更改,就应该传递父组件方法修改



### PropTypes和defaultProps

子组件设置父组件传递过来的值得校验

```js
import PropTypes from 'prop-types'
TodoItem.propTypes = {
  content:PropTypes.string
  ...
}

// 设置默认值
TodoItem.defaultProps = {
  content:'front'
}
```

### render函数和state和props关系

当`state`或者`props`发生变化时,`render`都会重新调用渲染dom



### ref

在react中操作`dom`需要使用`ref`绑定`dom`节点

```jsx
<input ref={(input)=>{this.input = input}}/>
{/*使用dom*/}
this.input
```

> **注意**：使用`ref`和`setState`搭配使用时可能会碰到`dom`更新不及时的问题，这是因为`setState`是一个异步执行的函数

如果碰到上述问题可以借助setState的第二个参数,回调执行

```js
commit(){
  this.setState((prevState)=>({
    list:[...prevState.list,prevState.inputValue],
    inputValue:'' 
  }),()=>{
    // 操作dom
    this.input
  })
}
```

### 生命周期函数

![](https://image.yangxiansheng.top/img/20200803145558.png?imagelist)

```js
//首先是个初始化定义props和state

//然后进入挂载阶段，这里只有第一次进入页面才会执行
componentWillMount(){
    console.log('挂载之前执行')
}
render(){
  console.log('渲染阶段')
}
componentDidMount(){
  console.log('挂载完成执行')
}

// 更新阶段 分为props更新和state更新
1. state更新
shouldComponentUpdate(){
  console.log('确认state是否需要更新')
  return boolean;
}
// 如果shouldComponentUpdate需要更新,执行下面
componentWillUpdate(){
  console.log('组件更新前')
}
render(){
  console.log('组件更新')
}
componentDidUpate(){
  console.log('组件更新完成')
}

2. props更新
// 这个钩子执行条件: 1. 这个组件要从父组件接受参数 2.第一次不执行，组件已经存在父组件时才会执行
componentWillReceiveProps(){
  console.log('组件接受props之前')
}
// 接下来依然是执行组件更新钩子
shouldComponentUpdate(){
  return true
}
componentWillUpdate(){}
render(){}
componentDidUpdate(){}


// 最后是组件即将移除钩子
componentWillUnmouent(){}

```

**部分使用场景**

```js
节省子组件render次数

shoudComponentUpdate(nextState,nextProps){
  if(nextProps.content !== this.props.content){
    return true
  }else{
    return false
  }
}

API的调用

componentDidMount(){
  ... ajax请求
}
```

### react性能优化

1. `react`使用虚拟dom减少不必要的`dom`的获取,节省性能。
2. `react`底层的`setState`函数是异步执行的,他可以把多次state数据改变归到一次执行
3. `react`虚拟dom的比对采用同层比对和`key值`比对从而提升比对的速率提升性能
4. 可以利用`shouldComponentWillUpdate`减少子组件执行`render`函数次数
5. 函数的作用于绑定一般放在构造函数中执行,只执行一次即可

### 动态绑定样式

- 使用逻辑运算符

  ```js
  render(){
    return (
    <div className={this.state.error && ’icon-class‘}>hello</div>
    )
  }
  ```

- 三元运算符

  ```js
  render(){
    return (
    <div className={this.state.error? 'icon-class':'icon-error'}></div>
    )
  }
  ```

- 定义函数,类似于`computed`写法

  ```js
  getClassName(){
    return this.state.error ? 'icon-class':''
  }
  render(){
    return (
    <div className={this.getClassName()}>
    )
  }
  ```

- 内联`style`

  ```js
  render(){
    return(
    <div style={this.state.error?{display:'none'}:{display:'inline-block'}}></div>
    )
  }
  ```



### 使用Redux

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

### 结合charles mock本地数据

### 使用redux-thunk改造action

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



### React-redux

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

### React-router-dom

> 默认情况下`dva`使用的是history也就是带哈希的路由,还有一个是browserhistory不带哈希的

**定义路由**

在路口`App.js`引入路由类型

```js
class App extends Component {
  render() {
    return (
    	<Provider store={store}>
      	<BrowserRouter>
      		<div>
            <Header />
      			<Route path='/' exact component={Home}></Route>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/write' exact component={Write}></Route>
      			<Route path='/detail/:id' exact component={Detail}></Route>
      		</div>
      	</BrowserRouter>
      </Provider>
    );
  }
}
```



`dva`写法

```js
import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Demo from './routes/Products'
import A from './routes/A'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={IndexPage}></Route>
        <Route exact  path="/demo/:id" component={Demo}></Route>
        <Route exact path="/A" component={A}></Route>
      </Switch>
    </Router>
  );
}

export default RouterConfig;


```

**获取路由参数**

- query

  ```js
  this.props.location.search
  ```

- params

  ```js
  this.props.match.params
  ```

**路由跳转**

- Link方法跳转

  ```js
  import {Link} from 'react-router-dom'
  
  <Link to={}></Link>
  ```

- 函数式编程跳转

  ```js
  this.props.push(`params`)
  ```

  



## DVA

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



### 新建页面

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

### 同步action和异步action

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



