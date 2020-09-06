
/**
 * 深拷贝
 * @param {Object} obj
 */
function deepclone(obj = {}) {
  // 非引用类型
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }
  let result
  if (result instanceof Array) {
    result = []
  } else {
    result = {}
  }
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepclone(obj[key])
    }
  }
  return result
}

/**
 * 仿juqery写法
 */
class Jquery {
  constructor(selector) {
    this.selector = selector
    const ele = document.querySelectorAll(selector)
    for (let i = 0; i < ele.length; i++) {
      this[i] = ele[i]
    }
    this.length = ele.length
  }
  get(index) {
    return this[index]
  }
  // 遍历
  each(fn) {
    for (let i = 0; i < this.length; i++) {
      const element = this[i]
      fn(element)
    }
  }
  on(type, fn) {
    this.each((ele) => {
      ele.addEventListener(type, fn)
    })
  }
}

/**
 * 手写bind 第一个参数和第二个参数分别是this,函数参数
 */
Function.prototype.mybind = function(){
  const args = Array.prototype.slice.call(arguments)
  // 获取mybind的this
  const self = this
  // 拆分this和函数参数
  const t = args.shift()
  return function(){
    self.apply(t,args)
  }
}

/**
 * 实现call foo.mycall(context)
 * @param {Object} context 
 * @param  {Object} args 
 */
Function.prototype.mycall = function(context,...args){
  context =  context || window
  let caller = Simbol('caller')
  // 获取调用call的函数(foo) ，this绑定到context关键步骤，将context
  context[caller] = this

Function.prototype.mycall = function(context,...args){
  context = context || window
  let func = this
  if(typeof func !== 'function'){
    throw new TypeError('is not a function')
  }
  const caller = new Simbol()
  context[caller] = func
  let res = context[caller](...args)
  delete context[caller]
  return res
}


/**
 * 实现apply
 * @param {*} content 
 */
Function.prototype.myapply = function(content){
  let arg = Array.prototype.slice.call(arguments).slice(1)
  if(!arg instanceof Array){throw new TypeError()}
  content = content || window
  let caller = Simbol('caller')
  content[caller] = this
  let res = content[caller](arg)
  delete content[caller]
  return res
}


Function.prototype.mynew = function(target,...args){
  // 原型赋给新的obj this指向新的obj，最后返回新的obj
  const obj = Object.create(target.prototype)
  const ret = target.apply(obj,args)
  return ret instanceof Object? ret: obj
}

console.log('1')
setTimeout(()=>{
  console.log('2')
},0)
Promise.resolve().then(()=>{
  console.log('4')
})

Promise.resolve().then(()=>{
  console.log('5')
}).then(()=>{
  console.log('6')
})
console.log('7')
