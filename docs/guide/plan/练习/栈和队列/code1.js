// 请求次数
RecentCounter.prototype.ping = function(t) {
  this.q.push(t)
  while(this.q[0] > t - 300){
    this.q.shift()
  }
  return this.q.length
}

var isValid = function(s) {
  let len = s.length
  if(len % 2 !== 0)return false
  let stack = []
  for(let i=0;i<s.length;i++){
    let c = s[i]
    if(c === '(' || c==='{' || c==='['){
      stack.push(c)
    }else{
      let p = stack[stack.length - 1]
      if(p === '{' && c==='}' || p==='('&&c===')' || p==='[' &&c === ']'){
        stack.pop()
      }else{
        return false
      }
    }
  }
  return stack.length === 0
}


var countBinarySubstrings = function(s) {
  // count数组表示几个几的数组
  let counNum = 0
  let right = 0
  let counts = []
  while(right < s.length){
    let c= s.charAt(right)
    let count = 0
    while(s.charAt(right) === c){
      count++
      right++
    }
    counts.push(count)
  }
  for(let i=1;i<=counts.length;i++){
    counNum+= Math.min(counts[i-1],counts[i])
  }
  return counNum
}

class MinStack{
  constructor(){
    this.stack = []
  }
  get size(){
    return this.stack.length
  }
  push(x){
    this.stack.push({
      val:x,
      min: this.size ? Math.min(this.min,x) : x
    })
  }
  pop(){
    return this.stack.pop()

  }
  peek(){
    return this.stack[this.size - 1].min
  }
  min(){
    return this.stack[this.size - 1].val
  }

}

//输出数组元素右侧第一个元素大于该元素的下标数组

function fn(array){
  let stack = [[0,array[0]]]
  let res = []
  for(let i=1;i<array.length;i++){
    while(stack.length && array[i] > stack[stack.length -1][1]){
      res[stack[stack.length -1][0]] = i
      stack.pop()
    }
    stack.push([i,array[i]])
  } 
  return res
}


class MyQueue {
  constructor(){
    this.stack1 = []
    this.stack2 = []
  }
  push(x){
    this.stack1.push(x)
  }
  pop(){
    while(this.stack1.length){
      this.stack2.push(this.stack1.pop())
    }
    let res = this.stack2.pop()
    while(this.stack2.length){
      this.stack1.push(this.stack2.pop())
    }
    return res
  }
  peek(){
    while(this.stack1.length){
      this.stack2.push(this.stack1.pop())
    }
    let res = this.stack2[this.stack2.length - 1]
    while(this.stack2.length){
      this.stack1.push(this.stack2.pop())
    }
    return res
  }
  empty(){
    return !this.stack1.length
  }
}

class MyStack{
  constructor(){
    this.queue = []
  }
  push(x){
    this.queue.push(x)
  }
  pop(){
    let queue1 = []
    while(this.queue.length > 1){
      queue1.push(this.queue.shift())
    }
    let res= this.queue.shift()
    while(queue1.length){
      this.queue.push(queue1.shift())
    }
    return res
  }
  peek(){return this.queue[this.queue.length -1]}
  empty(){
    return !this.queue.length
  }
}

var decodeString = function(s) {
  let repeatStack = []
  let resStrStack = []
  let resStr = ''
  let repeat = 0
  for(let i =0;i<s.length;i++){
    let c= s[i]
    if(c === '['){
      repeatStack.push(repeat)
      resStrStack.push(resStr)
      repeat = 0
      resStr = ''
    }else if(c===']'){
      let temp = ''
      let num = repeatStack.pop()
      for(let i=0;i<num;i++){
        temp += resStr
      }
      resStr = resStrStack.pop + temp
    }else if (c >= '0' && c <= '9'){
      repeat = repeat * 10 + (c - '0')
    }else{
      resStr+=c
    }
  }
  return resStr
}


var validateStackSequences = function(pushed, popped) {
  let stack = []
  let  k =0
  for(let i =0;i<pushed.length;i++){
    stack.unshift(pushed[i])
    while(stack.length && popped[k] !== null && popped[k] === stack[0]){
      stack.shift()
      k++
    }
  }
  return stack.length === 0
}
