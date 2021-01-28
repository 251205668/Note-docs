// 发布订阅模式

class EventEmitter{
  constructor(){
    this.events = {}
  }
  // 订阅事件
  on(eventName,callback){
    if(this.events[eventName]){
      this.events[eventName].push(callback)
    }else{
      // 否则初始化
      this.events[eventName] = [callback]
    }
  }
  // 触发事件
  emit(eventName){
    this.events[eventName] && this.events[eventName].forEach(cb=>cb())
  }
  // 移除事件
  remove(eventName,callback){
    if(this.events[eventName]){
      this.events[eventName] = this.events[eventName].filter(cb=>cb!==callback)
    }
  }
  // 订阅的事件只执行一次，然后移除
  once(eventName,callback){
    let fn = ()=>{
      callback()
      this.remove(eventName,fn)
    }
    this.on(eventName,fn)
  }
}

// test
let emitter = new EventEmitter()
// 订阅事件
let workday = 0

emitter.on('work',()=>{
  workday++
  console.log('work everyday')
})

function makeMoney(){
  console.log('make millons of money')
}
emitter.on('makeMoney',makeMoney)

emitter.once('love',()=>{
  console.log('just once Love')
})

let timmer = setInterval(()=>{
  emitter.emit('work')
  emitter.remove('makeMoney',makeMoney)
  emitter.emit('love')
  if(workday === 5){
    console.log('rest')
    clearInterval(timmer)
  }
},1000)

/**
 * work everyday
 * just once Love
 * work everyday
 * work everyday
 * work everyday
 * work everyday
 * rest
 */

 // 深拷贝

 function deepclone(target={}){
   if(typeof target !== 'object' || target == null){
     return target
   }
   let res
   if(target instanceof Array){
     res = []
   }else{
     res = {}
   }
   for(let key in target){
     if(target.hasOwnPropetry(key)){
       res[key] = deepclone(target[key])
     }
   }
   return res
 }


 // 缺点: 1. 对象中有date，只能序列化为字符串 2. RegExp,Error,序列化为null 3. function,undefined,会丢失 4.NaN,Infinity,-Infinity会被序列化为null

 JSON.parse(JSON.stringify(target))


 //call
 function MyCall(context,...args){
   context = context ||window
   const caller = new Symbol('caller')
   context[caller] = this
   const res = context[caller](...args)
   delete context[caller]
   return res
 }

 //apply

 function MyApply(context,args){
  context = context ||window
  const caller = new Symbol('caller')
  context[caller] = this
  const res = context[caller](...args)
  delete context[caller]
  return res
}

// bind
Function.prototype.mybind = function(){
  const args = Array.prototype.slice.call(arguments)
  const t = args.shift()
  return function(){
    this.apply(t,args)
  }
}

// dom操作
// 创建节点
var p = document.createElement('p')
var text = document.createTextNode('你好')
var fragment = document.createDocumentFragment()

// 模拟插入一万个节点到p标签上

var p = document.createElement('p')
var fragment = document.createDocumentFragment()
for(let i = 0;i<10000;i++){
  let li = document.createElement('li')
  li.innerHTML = '牛号'
  fragment.appendChild(li)
}
// 文档片段是虚拟的 不会影响文档树，不会发生渲染，dom操作完成之后应用到真实dom即可
p.appendChild(fragment)

// 新增节点 替换节点 删除节点 查询节点

p.appendChild('')
p.replaceChild(pre , old)
p.removeChild('')

document.getElementById()
document.getElementsByClassName()
document.getElementsByTagName()
ocument.querySelector()
document.querySelectorAll()

// 判断是否触底

function isTouchBottom(){
  // 距顶距离
  const scrollTop = ()=>{
    if(window.pageYOffset){
      return window.pageYOffset
    }else{
      return document.body.scrollTop + document.documentElement.scrollTop
    }
  }
  // 可视区域距离
  const innerHeight = ()=>{
    if(window.innerHeight){
      return window.innerHeight
    }else{
      if(document.compatMode === 'CSS1Compat'){
        return document.documentElement.clientHeight
      }else{
        return document.body.clientHeight
      }
    }
  }
  // 总文档高度
  const totalHeight = ()=>{
    return document.body.scrollHeight + document.documentElement.scrollHeight
  }
  window.onscroll = ()=>{
    if(scrollTop + innerHeight === totalHeight){
      console.log('触底')
      return true
    }else{
      return false
    }
  }
}

// 元素的可视区域尺寸和偏移

let height = p.offsetHeight
let width = p.offsetWidth
let offsetTop = p.offsetTop
let offsetLeft = p.offsetLeft


// 解释Promise

/**
 * 1. 作用
 * 2. 状态
 * 3. resolve reject
 * 4. then
 * 
 * 首先promise就是来解决回调嵌套地狱的
 * 
 * 状态有: pending fullilled rejected
 * 
 * resolve(value) 代表操作成功，promise状态由pending转为fullilled就会调用这个函数，value代表操作成功的值
 * 
 * reject(reason) 代表操作失败,pending状态转变为rejected,reason代表操作失败的原因
 * 
 * then() 两个参数，一个是onFuilled还有一个是onRejected，一个是状态为fullilled执行的回调，一个是失败执行的回调函数
 */

 // 实现promise的API resolve reject race all 

 Promise.resolve = function(value){
   return new Promise((resolve)=>{
     resolve(value)
   })
 }

 Promise.reject = function(reason){
   return new Promise((reject)=>{
     reject(reason)
   })
 }

 // 传入promise实例数组，一旦有一个实例状态转为fulliled，则resolve出去
 Promise.race = function(iterator){
   if(!Array.isArray(iterator)){
     return
   }
   return new Promise((resolve,reject)=>{
     for(let i of iterator){
       Promise.resolve(i).then(value=>{
         resolve(value)
       })
     }
   }).catch(error=>console.log(error))
 }
// 将所有promise实例resolve出去的结果保存起来，最后resolve出去
 Promise.all = function(iterator){
   if(!Array.isArray(iterator)){
     return
   }
   let res = []
   let count = 0
   return new Promise((resolve,reject)=>{
     Promise.resolve(i).then(value=>{
       res[count++] = value
       if(count === iterator.length){
         resolve(res)
       }
     })
   })
 }

 // async，await:async声明的函数一定返回promise对象，async只能搭配await、async的代码会重新返回

/**
 * async function a(){
 * awiat b()
 * console.log('1')
 * }
 * 
 * ===>
 * function a(){
 * reutrn Resolve(p).then((value)=>{
 * console.log('1')})
 * }
 */

 /**
  * ES6新特性:
  * 1. let const声明方式
  * ：：： 1) var 存在变量提升
  *       2) let const 不存在变量提升，但是存在暂时性死区，不允许声明之前使用变量,定义在for循环中存在块级作用域
  *       3) let可以声明不赋值，默认等于undeined ，const不行，并且const定义的变量不允许修改
  *       4）不允许使用let,const 重复声明变量
  * 
  * 2. 解构赋值
  * 3. 函数扩展： 箭头函数，函数可以定义默认参数
  * 4. 字符串扩展：模板字符串
  * 5. 新的Simbol数据结构，定义独一无二的数据
  * 6. Set集合，集合的元素不可能重复
  * 7. Map，键相比于对象可以定义为任意类型
  * 8. 对象扩展，Object.is() Object.assign() Object.getPrototypeOf()
  * 9. Proxy 
  * 10. class
  *     1) class不能遍历实例原型链的属性和方法
  *     2）更利于封装
  *     3） 可以定义static方法，用类直接调用
  *     4）不存在变量提升
  *     5) 必须使用new操作符
  * 
  */

  // 正则表达式
  // reduce

  arr.reduce((pre,cur,index,arr)=>{return prev + cur})

  // 去重
  
  function unique(arr){
    return [...new Set(arr)]
  }

  function unique(arr){
    return arr.filter((cur,index,array)=>{
      return array.findIndexOf(cur) === index
    })
  }

  function unique(arr){
    return arr.reduce((pre,cur,index,arr)=>{
      if(!pre.includes(cur)){
        return pre.concat(cur)
      }else{
        return pre
      }
    },[])
  }

  // 降维

  function flatten(arr){
    return [].concat(...arr.map(v=>{
      return Array.isArray(v) ? flattern(v) : v
    }))
  }

  function flatten(arr){
    return arr.reduce((pre,cur,index,array)=>{
      return pre.concat(Array.isArray(cur) ? flatten(arr) : cur)
    },[])
  }

  // 计算元素出现次数

  var nameNums = ['a','b','c','d','d']
  var nameNumsObj = nameNums.reduce((pre,cur)=>{
    if(cur in pre){
      pre[cur]++
    }else{
      pre[cur] = 1
    }
    return pre
  },[])

  // 求和 求乘积 求阶乘洗牌算法

  arr.reduce((pre,cur)=>pre+cur)
  arr.reduce((pre,cur)=>pre*cur)

  // JSONP

  function JSOP({url,params,callback}){
    return new Promise((resolve,reject)=>{
      const script = document.createElement('script')
      window[callback] = function(data){
        resolve(data)
        document.body.removeChild(script)
      } 
      // 拼接参数
      let arr = []
      params = {...params,callback}
      for(let key in params){
        arr.push(`${key}=${params[key]}`)
      }
      url = `${url} ? ${arr.join('&')}`
      script.src = url
      document.body.appendChild(script)
  }
}


  // repeat 实现 repeat('hello') alert四次，每次间隔3秒

  function sleep(func,delay,args){
    // args传入数组
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        func.apply(this,args)
        resolve()
      },delay)
    })
  }

  function repeat(func,delay,times){
    return async function(){
      for(let i = 0;i<times.length;i++){
        await sleep(func,delay,[...arguments])
      }
    }
  }

  let repeat = repeat(alert,3000,4)
  repeat('helloword')
  // 实现sleep()

  function sleep(timer){
    return new Promise((resolve,reject)=>{
      setTimeout(resolve,timer)
    })
  }

  // 解析URL

  function parseUrlParams(){
    let res = []
    let search = location.search.substr(1)
    search.split('&').forEach((item)=>{
      let itemArray = item.split('=')
      let key = itemArray[0]
      let value = itemArray[1]
      res[key] = value
    })
    return res
  }

  function parseUrlParams(){
    let search = location.search.substr(1)
    let p = new URLSearchParams(search)
    return Object.fromEntries(p.entries())
  }


  // 防抖 节流

  function debounce(func,delay){
    let timer
    return function(...args){
      if(timer)clearTimeout(timer)
      timer = setTimeout(()=>{
        func.call(this,...args)
      },delay)
    }
  }
  
  function throttle(func,delay){
    let lock = false
    return function(...args){
      if(lock){
        return
      }
      lock = true
      setTimeout(()=>{
        func.call(this,...args)
        lock = false
      },delay)
    }
  }

  // new

  function new(ctor,...args){
    const obj = Object.create(ctor.prototype)
    const res = ctor.call(obj,...args)
    return res instanceof Object ? res : obj
  }

  // instanceof

  function MyInstanceOf(L,R){
    let R = R.prototype
    L = L.__proto__
    while(true){
      if(L === null){
        return false
      }
      if(L === R){
        return true
      }
      L = L.__proto__
    }
  }

  // count函数 

  function count(){
    var nums = 0
    return function(){
      nums++
      console.log(nums)
    }
  }

  // 实现forEach
  Array.prototype._forEach=(fnc,thisArgs)=>{
    // thisArgs 可选参数，执行回到函数作为this的参数
    if(typeof fnc !== 'function')throw new Error('参数必须为函数')
    if(!this instanceof Array)throw new Error('只能针对数组')
    let arr = this
    for(let i =0;i<arr.length;i++){
      fnc.call(thisArgs,arr[i],i,arr)
    }
  }

  // reduce 实现map
  Array.prototype._map = (func,thisArgs)=>{
    if(typeof fnc !== 'function')throw new Error('参数必须为函数')
    if(!this instanceof Array)throw new Error('只能针对数组')
    thisArgs = thisArgs || []
    // 最后返回数组
    let res = []
    this.reduce((prev,cur,index,arr)=>{
      res.push(func.call(thisArgs,cur,index,arr))
    },[])
    return res
  }

  // Vue数据双向绑定原理

  let oldArrayProto = Array.prototype
  // 基于数组原型创建对象，然后扩展方法
  let newArrayObject = Object.create(oldArrayProto)
  ['push','pop','shift','unshift'].forEach(method=>{
    newArrayObject[method] = function(){
      console.log('Array item update')
      oldArrayProto[method].call(this,...arguments)
    }
  })

  function obServer(data){
    if(typeof data !== 'object' || data == null){
      return data
    }
    // 数组
    if(data instanceof Array){
      data.__proto__ = newArrayObject
    }
    // 对象
    for(const key in data){
      defineRective(data,key,data[key])
    }
  }

  function defineRective(target,key,value){
    // 递归监听
    obServer(value)
    Object.defineProperty(target,key,{
      get:function(){
        return value
      },
      set:function(newVal){
        obServer(value)
        if(value === newVal){
          return
        }
        console.log('update')
        value = newVal
      }
    })
  }

  let data = {age:[1,2]}
  obServer(data)
  data.age.push(3)
  // Array item update


  // xmlHttpRequest

  let xhr = new XMLHttpRequest()
  xhr.open('GET','/api',true)
  xhr.onreadystatechange(()=>{
    /**
     * 0 请求初始化
     * 1 请求建立
     * 2 请求接受
     * 3 请求处理中
     * 4 请求完成
     */
    if(xhr.readyState === 4){
      xhr.status === 200 && console.log(xhr.responseText)
    }
  })

  // 单列模式

  class uniqueInstance{
    constructor(name){
      this.instance = null
      this.name = name
    }
  static  getInstance(name){
      if(!this.instance){
        return new uniqueInstance(name)
      }else{
        return this.instance
      }
    }
  }

  uniqueInstance('a') === uniqueInstance('b')
  

  // 红绿灯 3秒打印红 2s打印绿 1s打印黄

  function printTrafficLight(color,time){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        console.log(color)
        resolve()
      },time)
    })
  }

  // 发布订阅模式



  // 驼峰转换
  function hump(str){
    let res = ""
    let upper = false
    for(let i = 0;i<str.length;i++){
      let s = str[i]
      if(s === '-' || s === '_' || s === '@'){
        upper = true
      }else{
        if(upper){
          res+=s.toUpperCase()
        }else{
          res+=s
        }
        upper = false
      }
    }
    return res
  }

  // 实现add(1)(2)(3) = 6

  function add(a){
    return function(b){
      return function(c){
        return a+b+c
      }
    }
  }

  // 手写trim()函数

  function trim(str){
    return str.replace(/^\s+/,'').replace(/\s+$/,'')
  }

  // 请写一个函数，输出出多级嵌套结构的 Object 的所有 key 值

  var obj = {
    a: "12",
    b: "23",
    first: {
        c: "34",
        d: "45",
        second: { 3: "56", f: "67", three: { g: "78", h: "89", i: "90" } },
    },
};

function getAllKeys(target={},res=[]){
  // base-case
  if(typeof target !== 'object' || target == null)return []
  for(let key in target){
    if(target.hasOwnProperty(key)){
      if(target[key] && typeof target[key] === 'object'){
        return getAllKeys(target[key],res)
      }
      res.push(key)
    }
  }
  return res
}
// => [a,b,c,d,e,f,g,h,i]

console.log(getAllKeys(obj))

  // 实现百度搜索框


  // <!DOCTYPE html>
  // <html lang="zh-CN">
  
  // <head>
  //   <meta charset="UTF-8">
  //   <title>Document</title>
  // </head>
  
  // <style>
  //   #kw{
  //     width: 284px;
  //     height: 30px;
  //     border:2px solid #333333;
  //     line-height: 30px;
  //     font-size: 16px;
  //     box-sizing: border-box;
  //     padding: 0 5px;
  //   }
  //   #append{
  //     width: 286px;
  //     box-sizing: border-box;
  //     border: 2px solid #333333;
  //     border-top: 0;
  //     display: none;
  //   }
  //   #append .item:hover{
  //     background-color: aqua;
  //     cursor: pointer;
  //   }
  //   .item{
  //     padding: 3px 5px;
  //     cursor: pointer;
  //   }
    
  // </style>
  
  // <body>
  //   <div id="content">
  //     <input id="kw" onkeyup="getContent(this);" placeholder="请输入"/>
  //     <div id="append"></div>
  //   </div>
  
  // </body>
  
  // <script>
  
  // let data = [ '你好，我是Michael',
  //     '你是谁',
  //     '你最好啦',
  //     '你最珍贵',
  //     '你是我最好的朋友',
  //     '你画我猜',
  //     '你是笨蛋',
  //     '你懂得',
  //     '你为我着迷',
  //     '你是我的眼']
  // /**
  //  * let xhr = new xmlHttpRequest()
  //  * xhr.open('GET','url',true)
  //  * xhr.onreadystatechange=()=>{
  //  * if(xhr.readyState === 4){
  //  * xhr.status === 200 &&& console.log(xhr.responseText)
  //  * }
  //  * }
  //  * xhr.send()
  //  * 
  //  * xhr.open('POST','url',true)
  //  * 
  //  * xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded')
  //  * 
  //  * xhr.send('a=1&b=2')
  //  * */ 
  
  //  let input = document.getElementById('kw')
  //  let append = document.getElementById('append')
  
  //  function getContent(obj){
  //    let inputValue = obj.value.trim()
  //    // 首先为空值的情况，append不展示
  //    if(inputValue === ''){
  //      append.style.display = 'none'
  //      append.innerHTML = ''
  //      return
  //    }
  //    // 有值的情况下,遍历data，如果命中里面的数据，就创建一个item的html，并且么个都绑定点击事件
  //    let html = ''
  //    for(let i = 0;i<data.length;i++){
  //      if(data[i].indexOf(inputValue)){
  //        html += "<div class='item' onClick='getCon(this);'>" + data[i] + "</div>"
  //      }
  //    }
  //    if(html !== ''){
  //      append.style.display = 'block'
  //      append.innerHTML = html
  //    }
  //  }
  //  function getCon(obj){
  //    input.value = obj.innerText
  //    append.style.display="none"
  //    append.innerHTML = ''
  //  }
  
  // </script>
  
  // </html>
  