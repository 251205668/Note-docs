function deepclone(data) {
  if (typeof data !== 'object' || data == null) {
    return data
  }
  let result
  if (data instanceof Array) {
    result = []
  } else {
    result = {}
  }
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      result[key] = deepclone(data[key])
    }
  }
}

class Jquery {
  constructor(selector) {
    this.selector = selector
    let element = document.querySelector(selector)
    this.length = element.length
    for (let i = 0; i < element.length; i++) {
      this[i] = element[i]
    }
  }

  get(index) {
    return this[index]
  }

  each(fn) {
    for (let i = 0; i < this.length; i++) {
      const ele = this[i]
      fn(ele)
    }
  }
  on(type, fn) {
    this.forEach((ele) => {
      ele.addEventListener(type, fn)
    })
  }
}

Function.prototype.mybind = function() {
  let args = Array.prototype.slice.call(arguments)
  let self = this
  let t = args.shift()
  return function() {
    self.call(t, args)
  }
}

Function.prototype.mycall = function(context, ...args) {
  context = context || window
  // 取出bar函数
  let func = this
  if (typeof func !== 'function') {
    throw new TypeError('is not a function')
  }
  const caller = new Simbol()
  context[caller] = func
  let res = context[caller](...args)
  delete context[caller]
  return res
}

// Vue响应式

const oldArrobj = Array.prototype
let arrobj = Object.create(oldArrobj)['shift'].forEach((methodName) => {
  arrobj.prototype[methodName] = function() {
    updateView()
    oldArrobj[methodName].call(this, ...arguments)
  }
})
