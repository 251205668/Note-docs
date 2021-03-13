function MytypeOf(target){
  const ret = typeof target
  const map = {
   '[object Object]':'Object',
   '[object Array]':'Array',
   '[object String]':'String-object',
   '[object Number]':'Number-object',
   '[object Boolean]':'Boolean'
  }
  if(target === null){
    return 'null'
  }
  if(ret === 'object'){
    let key = Object.prototype.toString.call(target)
    return map[key]
  }else{
    return ret
  }
}


function MyInstanceOf(L,R){
  let o = R.prototype
  L = L.__proto__
  while(true){
    if(L === null){
      return false
    }
    if(L === o){
      return true
    }
    L = L.__proto__
  }
}

function MyNew(Ctor,...args){
  const obj = Object.create(Ctor.prototype)
  const ret = Ctor.apply(obj,args)
  return ret instanceof Object ? ret : obj
}

function call(context,...args){
  context = context || window
  const caller = Symbol('caller')
  context[caller] = this
  const ret = context[caller](...args)
  delete context[caller]
  return ret
}

Function.prototype.myBind = function(){
  let params = Array.prototype.slice.call(arguments)
  let t = params.shift()
  return function(){
    this.apply(t,params)
  }
}

// 继承方式

// 原型链
Father.prototype.lastName = 'a'
function Father(){

}
Son.prototype = new Father()
function Son(){
}

// 构造函数
function Father(name,age){
  this.name = name
  this.age = age
}
function Son(name,age,sex){
  Father.call(this,name,age)
  this.sex = sex
}

// 公有继承
function Father(){

}
function Son(){}
Father.prototype = Son.prototype

// 圣杯模式
function extend(Target,Origin){
  function F(){}
  F.prototype = Origin.prototype
  Target.prototype = new F()
  Target.prototype.constructor = Target

}

function deepClone(target = {}){
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
      res[key] = deepClone(target[key])
    }
  }
  return res
}

// 懒加载

function lazyLoad(){
  let imgs = document.getElementsByTagName('img')
  // 可视高度 + 滚动条距顶高度  >= 元素距顶偏移高度
  let len = imgs.length
  let scrollTop = document.body.scrollTop + document.documentElement.scrollTop
  let clientHeight = ()=>{
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
  for(let i = 0;i<len;i++){
    let img = imgs[i]
    let offsetTop = img.offsetTop
    if(scrollTop + clientHeight > offsetTop){
      let src = img.dataset.src
      img[i].src = src
    }
  }
}
window.onscroll = lazyLoad

// Promise相关

// JSONP

// repeat
function repeat(func, times, wait) {
  // TODO
}
const repeatFunc = repeat(alert, 4, 3000);

// 解析URL

// 驼峰转换 互转

// 降维

// 去重

// 防抖

// 节流

// 洗牌算法

//count

// sleep

// forEach

// map

// filter

// Promise实现网络超时判断

// Prmise控制并发执行，要求可以设置限制

function multiRequest(urls = [],maxNum){

}

// AJAX

let xhr = new XMLHttpRequest()
xhr.open('GET',url,true)
xhr.onreadystatechange(()=>{
  if(xhr.readyState === 4){
    xhr.status === 200 && console.log(xhr.responseText)
  }
})
xhr.send()

// promise版AJAX

function fetch(url){
  return new Promise((rsolve,reject)=>{
    let xhr = new XMLHttpRequest
    xhr.open('GET',url,true)
    xhr.onreadystatechange = function(){
      if(xhr.readyState !== 4)return
     if(xhr.status === 200){
       resolve(xhr.responseText)
     }else{
       reject(new Error(xhr.statusText))
     }
    }
    xhr.responseType = 'json'
    xhr.setRequestHeader('Accept','applicetion/json')
    xhr.send(null)
  })
}

// currey

let curry = (fn,...args)=>{
  // 函数需要参数和实参数组大小对比  大于的话，返回拼接参数之后的函数 否则返回原函数
  return fn.length <= args.length ? fn(...args) : curry.bind(null,fn,...args) 
}

let add = curry((a,b,c)=>a+b+c)

// 单例模式


// 观察者模式

// 发布订阅模式


// 打印页面所有节点类型节点名称

var nodes = [...document.querySelectorAll('*')]
nodes.forEach(node=>{console.log(node.nodeType,node.nodeName)})

// 千分位问题 
function fn(str){
  let res = ''
  let count = 0
  for(let i=str.length -  1;i>=0;i--){
    res+=str[i]
    count++
    if(count === 3 && i!== 0){
      count = 0
      res += ','
    }
  }
  return res.split('').reverse().join('')
}

// 去除首尾空格
function fn(s){
  return s.trim().replace(/^\s+/,'').replace(/\s+$/,'')
}

// 去除其中的字符串'b' 以及连续出现的 'a' 和 'c'
function fn(s){
  let res= s.replace(/b/g,'')
  while(res.match(/(ac)+/)){
    res = res.replace(/ac/,'')
  }
  return res
}


// 打印1-100的质数

function isPrimeNum(x){
  let res = true
  for(let i =2;i<2;i++){
    if(x % i === 0){
      res = false
      break
    }
  }
  return x > 1 && res
}

let ret = []
for(let i = 1;i<=100;i++){
  if(isPrimeNum(i)){
    ret.push(i)
  }
}

// 维护版本号列表
var versions = ["1.45.0", "1.5", "6", "3.3.3.3.3.3.3"];
// 要求从小到大排序，注意'1.45'比'1.5'大
function sortVersion(versions) {
  // TODO
}
// => ['1.5','1.45.0','3.3.3.3.3.3','6']
