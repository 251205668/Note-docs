# 入门react的jsx语法并比较vue相关生态


<p>
<img width="100%" height="400px" src="https://user-gold-cdn.xitu.io/2019/11/13/16e625a03608fd87?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1" />
<p>
由于之前一直都是vuer，然后并未开始了解`react`，所以以下均作为学习笔记日后回顾。



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

> vue中 `<TodoItem :content=item/>`

子组件取值

```js
this.props.content
```
> vue中,通过props拿到数据之后即可使用

子组件调用父组件方法

```jsx
{/*1. 父组件传入方法给子组件，需要把this指向父组件*/}
<TodoItem handleItem = {this.deleteItem.bind(this)} />

{//子组件使用方法}
this.props.handleItem()
```

> vue中直接使用 `this.$emit("eventName",param)` 向父组件抛出事件,并传递参数`param`.父组件监听即可。如果子组件想要调用父组件方法。直接使用 `this.$parent.method`

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

> vue中就不需要管`this`，直接使用bind语法即可,`@click="method"`


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

> vue中在props中设置，可以设置每个props的默认值和类型

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
> vue中使用 :现在dom上写上ref,然后使用`this.refs.`即可

### 生命周期函数

![](https://image.yangxiansheng.top/img/20200803145558.png?imagelist)

```js
//首先是个初始化定义props和state
constructor()

//然后进入挂载阶段，这里只有第一次进入页面才会执行 它代表的过程是组件已经经历了constructor()初始化数据后，但是还未渲染DOM时。
componentWillMount(){
    console.log('挂载之前执行')
}
// 组件第一次渲染完成，此时dom节点已经生成，可以在这里调用ajax请求，返回数据setState后组件会重新渲染
componentDidMount(){
  console.log('挂载完成执行')
}
// clear你在组建中所有的setTimeout,setInterval 和事件监听
componentWillUnmount(){
  console.log('组件销毁之前')
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
shouldComponentUpdate(nextProps,nextState){
  return true
}
componentWillUpdate(nextProps,nextState){}
render(){}
componentDidUpdate(prevProps,prevState){}


// 最后是组件即将移除钩子
componentWillUnmouent(){}

// 后续更新增加
getDerivedStateFromProps(nextProps, prevState)
getSnapshotBeforeUpdate(prevProps, prevState)

```

**部分使用场景**

```js
//节省子组件render次数 但是都可以用hooks修改

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


### react-router

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
