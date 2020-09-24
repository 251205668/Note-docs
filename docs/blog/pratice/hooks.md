

# React hooks学习

<p>
<img width="100%" height="400px" src="https://image.yangxiansheng.top/img/20200924103805.png?imglist" />
<p>


react-scripts插件集成了类似于webpack的一系列命令的js文件，相当于vue2.x的webpack的配置文件

## 使用eject来配置webapck

```js
npm run eject
```
输入后就会生成左侧目录结构，用于配置`webpack`


![](https://image.yangxiansheng.top/img/20200816111317.png?imagelist)


## Context的使用
新特性加入了`Context`,这个API相当于一个全局变量。`react`中如果出现`跨组件传值`的情况，就可以在父组件下使用`Context`,方便跨组件传值。

基本使用: `Provider`和 `consumer`

父组件作为生产者,后面需要值的组件作为消费者

使用案例:
```jsx
import React,{Component,createContext} from 'react'

// 声明context
const BatteryContext = createContext() // 这里可以传入默认值,如果consumer找不到provider

export default class App extends Component{
   state = {
       battery: 60
   }
    render(){
    const {battery} = this.state
    return (
       <React.Fragment>
      <button type="button" onClick={()=>{this.setState({battery:battery-1})}}>press</button>
      <BatteryContext.Provider value = {battery}>
        <Middle></Middle>
      </BatteryContext.Provider>
      </React.Fragment>
    )
        
    }
}
// 中间组件
class Middle extends Component {
  render(){
    return <Leaf></Leaf>
  }
}
class Leaf extends Component{
  render(){
    return(
      <BatteryContext.Consumer>
        {/* 不能直接渲染组件 只能写函数 参数就是传递值 */}
        {
          battery=><h1>battery:{battery}</h1>
        }
      </BatteryContext.Consumer>
    )
  }
}

```
如果存在多个context,则可以嵌套`provider`和`consumer`

```jsx
import React, { Component,createContext } from 'react'

const BatteryContext = createContext()
const OnlineContext = createContext()
export default class App extends Component {
  state = {
    battery:60,
    onlineVisible:false
  }
  render() {
    const {battery,onlineVisible} = this.state
    return (
      <React.Fragment>
      <button type="button" onClick={()=>{this.setState({battery:battery-1})}}>press</button>
      <button type="button" onClick={()=>{this.setState({onlineVisible:!onlineVisible})}}>press</button>
      <BatteryContext.Provider value = {battery}>
        <OnlineContext.Provider value = {onlineVisible}>
        <Middle></Middle>
        </OnlineContext.Provider>
      </BatteryContext.Provider>
      </React.Fragment>
    )
  }
}
class Middle extends Component {
  render(){
    return <Leaf></Leaf>
  }
}
class Leaf extends Component{
  render(){
    return(
      <BatteryContext.Consumer>
        {/* 嵌套函数 */}
        {
          battery=>(
            <OnlineContext.Consumer>
              {
                (online)=><h1>battery:{battery},onlie:{String(online)}</h1>
              }
            </OnlineContext.Consumer>
          )
        }
      </BatteryContext.Consumer>
    )
  }
}

```

一般不建议使用多个全局变量。当只有一个`context`时推荐使用`contextType`来获取`context`，这样就可以不用去写`consumer`去嵌套获取参数了

```js
class Leaf extends Component{
   // 声明contextType 然后再render里面this.context自动获取值
    static contentType = batteryContext
    render(){
        const battery = this.context
        return (<h1>battery:{battery}</h1>)
    }
}
```

## 使用lazy和suspense进行组件懒加载

`react`使用`lazy`进行懒加载的原理是利用webpack的`codesplit`能力，利用`import`可以动态导入的特性，当`import`导入的代码被加载时，`webpack`就会自动将这个包打到一个分割的包。

使用实例
```js
import react ,{Component,lazy,Superse} from 'react'
// lazy作为函数,里面是导入异步组件的语法 加注释是生成指定打包文件名
const About = lazy(()=>import(/*webpackChunkName:"about"*/'./About'))

export default class App extends Component {
    render(){
        return (
        {/*这里fallback就相当于加载中的回调 写jsx语法*/}
        <Superse fallback = {<div>loading</div>}>
            <About/>
        </Superse>
        )
    }
}

```
但是这样通常无法捕捉到按需加载的错误。
可以使`用componentDidCatch()`进行捕捉错误，或者使用静态方法捕捉

```js
componentDidCatch(){
    
}

render(){
    static getDerivedFromError(){
        return {
            
        }
    }
}
```

## 使用PureComponent和memo减少组件渲染

react中当`state`里面的数据发生改变,就会导致`render()`函数重新执行,有的时候我们的无状态组件并不需要重新渲染。这个时候就会使用到`PureComponent`和`memo`

`PureComponent`适用于声明式组件,`extends PureComponent`,并非函数式组件的场景。

```js

class Foo extends Component {
    render(
        return <div>{console.log("refresh")}</div>
    )
}

export default APp extends Component{
     state = {
        nums:1
        }
  render(){
    const {nums} = this.state
    return (
      <React.Fragment>
      <button type="button" onClick={()=>this.setState({nums:nums+1})}>press</button>
      <Foo></Foo>
      </React.Fragment>
    )
  }
}
```

这种场景,父组件虽然改变了state里面的数据,但是并没有传递给父组件.这个时候不必要刷新`Foo`组件。这里基于可以使用`PureComponent`就可以实现，**他的原理其实就是在组件内部调用了`shouldComponentUpdate`**，但是它仅仅只能判断一层,无法判断第深层`state`结构。

```js
class Foo extends PureComponent {
    render(
        return <div>{console.log("refresh")}</div>
    )
}
```
如果是无状态组件,则可以使用`meomo`来声明函数,也可以达到禁用渲染的效果。

```js
const Foo = memo((props)=>{

    render(){
        return ()
    }
})
```

## Hooks: stateHooks

当我们在无状态函数组件中要使用到`state`或者修改数据的话就需要引入`useState`去支持

```js
const Foo = (props)=>{
    // 声明一个数组 useState(default) 然后就可以直接操作state的数据
    const [count,setCount] = useState(0)
    return (
    
    )
}
```
> 可以使用`eslint-plugin-react-hooks -D`来检查语法,这里需要配置`packege.json`
```json
"eslintConfig":{
    "extends":"react-app",
    "plugins":[
        "react-hooks"
    ],
    "rules":{
        "react-hooks/rules-of-hooks":"error"
    }
    
}
```
使用需要注意的点:
- 首先`useState`只会按顺序调用(次数不能多不能少),只会在顶部调用，并且要按顺序(一旦生命,后面改变调用useState会混乱数据)。
- 使用`useState`可以支持传入函数延迟初始化设置state数据的默认值.
```js
const [count,setCount] = useState(()=>{
return props.defaultCount || 0
)
```

## useEffect的使用

useEffect实质上可以发生在`componentDidMount`之后 ,`componentDidUpdate`之后,`componentWillUnMount`之前。用于处理异步操作(请求或者其他),你可以把它当成componentDidMount, componentDidUpdate, and componentWillUnmount 的集合。

`useEffect`默认需要穿入一个函数,函数会有一个回调函数生成。第二个参数(数组)默认不传,代表每次渲染后都会触发`useEffect`,传入的话则代表**当数组的值发生改变时调用**，**如果传入空数组则代表只调用一次**。

基本使用场景
```js
function App() {
  const [count,setCount] = useState(0)
  const [size,setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })
  const onResize = ()=>{
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }
  // 不传第二个参数,则默认每次渲染后都执行
  useEffect(()=>{
    document.title = count
  })
  // 传入第二个参数
  useEffect(()=>{
    window.addEventListener("resize",onResize,false)
    return ()=>{
      window.removeEventListener("resize",onResize,false)
    }
  },[])

  return (
  <button onClick={()=>setCount(count+1)}>{count},{size.width}{size.height}</button>
  );
}
```

## 使用useContext简化context的消费者写法

使用`useContext`的写法简化很多，无需在类组件中写`context.Consumer`或者使用`contextType`

几种不同的写法对比

```js
function App() {
  const [count, setCount] = useState(1)
  return (
    <React.Fragment>
      <button onClick={() => setCount(count + 1)}>press</button>
      <contentContext.Provider value={count}>
        <Foo></Foo>
        <Foohooks></Foohooks>
        <FooContextType></FooContextType>
      </contentContext.Provider>
    </React.Fragment>
  )
}

class Foo extends Component {
  render() {
    return (
      <React.Fragment>
        <contentContext.Consumer>
          {(count) => <h1>{count}</h1>}
        </contentContext.Consumer>
      </React.Fragment>
    )
  }
}

class FooContextType extends Component {
  static contextType = contentContext
  render() {
    const count = this.context
    return <h1>{count}</h1>
  }
}

// 使用hooks可以一次取出多个value
function Foohooks() {
  const count = useContext(contentContext)
  return <h1>{count}</h1>
}
```

## RefHook在函数组件中使用

获取`dom`可以使用`useRef`这个hook
```js
<counter ref={counterRef} />

...

const counterRef = useRef //获取组件实例，这样就可以调用子组件方法

// counterRef.current.method 调用方法
```

在普通类组件中是使用`createRef()`来获取实例的

```js
constructor(props){
    super(props)
    this.countRef = React.createRef()
}

....
<counter ref={this.countRef} />

```

## 自定义Hook

```js
import React,{ useState,useEffect } from 'react'
const useMousePosition = ()=>{
  const [positions,setPositions] = useState({x:0,y:0})
  useEffect(()=>{
    const uopdateMouse = (event)=>{
      setPositions({
        x:event.clientX,
        y:event.clientY
      })
    }
    document.addEventListener('mousemove',updateMouse)
    // 销毁监听
    return ()=>{
      document.removeEventListener('mousemove',updateMouse)
    }
  })
}


export default position
```

使用自定义的Hook

```js
import useMousePosition from './useMousePosition.js'
function App() {
  const position = useMousePosition()
  return (
    <h1>{position.x}</h1>
  )
}
```


## Hooks函数的优点

1. 函数组件无this问题
2. 副作用(使用useEffect)的关注点分离
3. 方便复用状态逻辑
4. hoc转成hook写法更易理解

编写一个自定义的hooks函数，很类似于函数组件的写法

![](https://image.yangxiansheng.top/img/20200817114653.png?imagelist)
