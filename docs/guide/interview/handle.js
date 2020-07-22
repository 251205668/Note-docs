/**
 * 深拷贝
 * @param {Object} obj 
 */
function deepclone(obj = {}){
  if(typeof obj !== 'object' || obj === null){
    return obj
  }
  let ret
  if(ret instanceof Array){
    ret = []
  }else{
    ret ={}
  }
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      ret[key] = deepclone(obj[key])
    }
  }
  return ret
}

/**
 * 防抖函数
 * @param {Function} func 
 * @param {Number} delay 
 */
function debounce(func,delay){
  let timer
  return function(...args){
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}

/**
 *  节流
 * @param {Function} func 
 * @param {Number} delay 
 */
function throttle(func,delay){
  let locker = false
  return function(...args){
    if(locker){
      return
    }
    // 上锁
    locker = true
    setTimeout(()=>{
      func.apply(this,args)
      locker = false
    })
  }
}

/**
 * 数组去重
 * @param {Array} array 
 */
function unique(array){
  return [...new Set(array)]
}

/**
 * 实现Instanceof
 * @param {*} L 
 * @param {*} R 
 */
function MyInstanceof(L,R){
  let O = R.prototype
  L = L.__proto__
  while(true){
    if(L === null){return false}
    if(O === L){
      return true
    }
    L = L.__proto__
  }
}

function getRandom(min,max){
  return Math.floor(Math.random()*(max-min+1)+min)
}

/**
 * 洗牌算法
 * @param {*} array 
 */
function shuffie(array){
  let _arr = array.slice()
  for(let i;i <_arr.length;i++){
    let j = this.getRandom(0,i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

Function.prototype.mybind = function(){
  let args = Array.prototype.slice.call(arguments)
  const self = this
  const t = args.shift()
  return function(){
    self.call(t,args)
  }
}


Function.prototype.mycall = function(context,...args){
  let func = this
  context = context || window
  if(typeof func !== 'function'){}
  let caller =new Simbol()
  context[caller] = func
  let res = context[caller](...args)
  delete context[caller]
  return res
}
