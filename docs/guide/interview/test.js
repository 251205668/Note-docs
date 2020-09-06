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
