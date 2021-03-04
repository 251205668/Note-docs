function JSONP({url,params,callback}){
  return new Promise((resolve,reject)=>{
    const script = document.createElement('script')
    window[callback] = function (data){
      resolve(data)
      document.body.removeChild(script)
    }
    // 拼接参数
    params = {...params,callback}
    let arr = []
    for(let key in params){
      arr.push(`${key}=${params[key]}`)
    }
    url = `${url}?${arr.join('&')}`
    script.src = url
    document.body.appendChild(script)
  })

}

function repeat(func, times, wait) {
  // TODO
}

function repeat(func,times,wait){
  return async function(){
    for(let i=0;i<times;i++){
      await sleep(func,wait,[...arguments])
    }
  }
}

function sleep(func,wait,args){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      func.apply(this,args)
      resolve()
    },wait)
  })
}

function queryToObj(){
  const res = {}
  const search = location.search.substr(1)//去除?
  search.split('&').forEach((item)=>{
    const arr = item.split('=')
    const key = arr[0]
    const value = arr[1]
    res[key] = value
  })
  return res
}

function queryToObj(){
  let search = location.search.slice(1)
  let p = new URLSearchParams(search)
  return Object.fromEntries(p.entries())
}


function camel(str){
  let upper = false
  let res = ""
  for(let i=0;i<str.length;i++){
    let s = str[i]
    if(s ==='_' || s=== '-' || s==='@'){
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


// 数组去重

function unique(arr){
  return [... new Set(arr)]
}

function unique(arr){
  return arr.filter((item,index,array)=>{
    return array,indexOf(item) === index
  })
}

function unique(arr){
  return arr.reduce((prev,cur,index,arr)=>{
    if(!prev.includes(cur)){
      return prev.concat(cur)
    }else{
      return prev
    }
  },[])
}

// 数组扁平化

function flattern(arr){
  return [].concat(...arr.map(item=>Array.isArray(item) ? flattern(item) : item))
}

function flattern(arr){
  return arr.reduce((prev,cur,index,arr)=>{
    return prev.concat(Array.isArray(cur) ? flattern(cur) : cur)
  },[])
}


// 防抖函数
/**
 * 使用场景: 只返回最后一次结果
 * 1. 搜索输入
 * 2. 按钮提交
 * @param {*} fn 
 * @param {*} delay 
 */

function debounce(fn,delay){
  let timer = null
  return function (...args){
    if(timer){
      clearTimeout(timer)
    }
    setTimeout(()=>{
      fn.apply(this,args)
    },delay)
  }
}

// 节流函数
/**
 * 使用场景: 在一个时间内只执行一次
 * 1. 拖拽事件
 * 2. 下拉请求数据
 */
function throttle(fn,delay){
  let lock = false
  return function(...args){
    if(lock){
      return
    }
      lock = true
    setTimeout(()=>{
      fn.apply(this,args)
      lock = false
    })
  }
}

// 洗牌算法

function getRandomInt(min,max){
  return Math.floor(Math.random() * (max - min + 1) + min)

}

function shuffle(arr){
  let _arr = arr.slice()
  for(let i=0;i<_arr.length;i++){
   let j = getRandomInt(0,i)
   let temp = _arr[i]
   _arr[i] = _arr[j]
   _arr[j] = temp
  }
  return _arr
}

function myInstanceof(L,R){
  L = L.__proto__
  let O = R.prototype
  while(true){
    if(L === null){
      return false
    }
    if(L === O){
      return true
    }
    L = L.__proto__
  }
}

function myNew(Ctor,...args){
  const obj = Object.create(Ctor.prototype)
  const res = Ctor.apply(obj,args)
  return res instanceof Object ? res :obj
}

Function.prototype.mybind = function(){
  const args = Array.prototype.slice.call(arguments)
  const t = args.shift()
  return function(){
    this.apply(t,args)
  }
}


function myCall(context,...args){
  context = context || window
  const caller = new Symbol('caller')
  context[caller] = this
  const res = context[caller](...args)
  delete context[caller]
  return res
}

function myApply(context,...args){
  context = context|| window
  const caller = new Symbol('caller')
  context[caller] = this
  const res = context[caller](args)
  delete context[caller]
  return res
}

function count(){
  let num = 0
  return function(){
    console.log(++num)
  }
}

function sleep(time){
  return new Promise((resolve)=>{
    setTimeout(resolve,time)
  })
}

Array.prototype.__forEach = function(func,thisArgs){
  const arr = Array.prototype.slice.call(this)
  for(let i =0;i<arr.length;i++){
    func.call(thisArgs,arr[i],i,arr)
  }
}

Array.prototype.__filter = function(func,thisArgs){
  const arr = Array.prototype.slice.call(this)
  const res = []
  for(let i =0;i<arr.length;i++){
    func.call(thisArgs,arr[i],i,arr) && res.push(arr[i])
  }
}

Array.prototype.__map = function(func,thisArgs){
  const arr = Array.prototype.slice.call(this)
  const res = []
  thisArgs = thisArgs || []
  arr.reduce((prev,cur,index,arr)=>{
    res.push(func.call(thisArgs,cur,index,arr))
  },[])
  return res
}


// 实现promise超时判断

function uploadFile(url,params,time){
  return Promise.race([
    uploadPromise(url,params),
    uploadTimeout(time)
  ]
  )
}
function uploadPromise(url,params){
  return new Promise((resolve,reject)=>{
    const xhr = new XMLHttpRequest()
    xhr.open('POST',url,true)
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        xhr.status === 200 && resolve(xhr.responseText)
      }
    }
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded')
    xhr.send(params)
  })
}
function uploadTimeout(time){
  return new Promise((resolve,reject)=>{
    setTimeout(reject('请求超时'),time)
  })
}

// 单例模式

class SingleTon{
  constructor(name){
    this.name = name
    this.instance = null
  }
  static getInstance(name){
    if(!this.instance){
      this.instance = new SingleTon(name)
    }
    return this.instance
  }
}

var oa = SingleTon.getInstance('a')
var ob = SingleTon.getInstance('b')
console.log(oa === ob)

// 发布订阅模式

class Event{
  constructor(){
    this.events = []
  }
  // 订阅
  on(eventName,callback){
    // 初始化 
    if(!this.events[eventName]){
      this.events[eventName] = [callback]
    }else{
      this.events[eventName].push(callback)
    }
  }
  // 触发
  emit(eventName){
    this.events[eventName] && this.events[eventName].forEach(cb=>cb())
  }
  // 移除
  removeEvent(eventName,callback){
    if(this.events[eventName]){
      this.events[eventName] = this.events[eventName].filter(cb=>{
        cb!==callback
      })
    }
  }
  // 订阅的callback只触发一次
  once(eventName,callback){
    let fn = ()=>{
      callback()
      this.removeEvent(eventName,callback)
    }
    this.on(eventName,callback)
  }
}


// 下拉刷新
// 窗口可视高度
const clientHeight = ()=>{
  if(window.innerHeight){
    return window.innerHeight
  }else{
    if(document.compatMode === 'CSS1Compat'){
      return document.documentElement.clientHeight
    }else return document.body.clientHeight
  }
}
// 滚动条距顶
const scrollTop = ()=>{
  if(window.pageYOffset){
    return window.pageYOffset
  }else return document.body.scrollTop + document.documentElement.scrollTop
}
// 文档高度

const scrollHeight = ()=>{
  return document.body.scrollHeight + document.documentElement.scrollHeight
}
window.onscroll = function (){
  if(clientHeight + scrollTop > scrollHeight){
    console.log('下拉刷新')
  }
}

// 图片懒加载
function lazyLoad(){
  // 计算出imag[i]距顶位置，判断可视高度和滚动条高度相加是否大于距顶高度，然后将dataSet.src赋给src
  let img = document.getElementsByTagName('img')
  let len = img.length
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
  let scrollTop = ()=>{
    if(window.pageYOffset){
      return window.pageYOffset
    }else{
      return document.body.scrollTop + document.documentElement.scrollTop
    }
  }
  for(let i=0;i<len;i++){
    let offsetTop = img[i].offsetTop
    if(clientHeight + scrollTop > offsetTop){
      img[i].src = img[i].dataset.src
    }
  }

}
window.onscroll = function (){
  lazyLoad()
}

// promise相关

Promise.all = function(iterator){
  if(!Array.isArray(iterator))return
  let res = []
  let count = 0
  return new Promise((resolve,reject)=>{
    for(let i of iterator){
      Promise.resolve(i).then(data=>{
        res[++count] = data
        if(count === iterator.length){
          resolve(res)
        }  
      })
    }
  }).catch(e=>{
    console.log(e)
  })
}

Promise.race = function(iterator){
  if(!Array.isArray(iterator))return
  return new Promise((resolve,reject)=>{
    for(let i of iterator){
      Promise.resolve(i).then(data=>{
        resolve(data)
      })
    }
  })
}
