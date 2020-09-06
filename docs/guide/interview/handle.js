Function.prototype.mycall = function(context,...args){
  context = context || window
  let caller = Symbol('caller')
  context[caller] = this
  let res = context[caller](...args)
  delete context[caller]
  return res
}

bar.mycall(foo)


Function.prototype.mybind = function(){
  let self = this
  let arg = Array.prototype.slice.call(arguments)
  let t = arg.shift()
  return function(){
    self.apply(t,arg)
  }
}


Function.prototype.myapply = function(context){
  const arg = Array.prototype.slice.call(arguments).slice(1)
  if(!arg instanceof Array){throw new TypeError('is not a function')}
  context = context || window
  let caller = Symbol('caller')
  context[caller] = this
  let res = context[caller](arg)
  delete context[caller]
  return res
}



function foo(){

}
var foo
console.log(foo)
foo = 1

// 进入

- 变量对象
- 作用域链
- this



const a = {color:'red'}

a.color = 'blue' // 不报错

a = {coloe:'blue'} // 报错
