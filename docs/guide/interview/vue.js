// 手写vue响应式更新

// 入口
function observeData(target){
  // 对象或数组
  if(typeof target !== 'object' || target == null){
    return target
  }
  for(let key in target){
    // data key value
    defineRecative(target,key,target[key])
  }
}

function defineRecative(data,key,value){
  Object.defineProperty(data,key,{
    get:function(){
      return value
    },
    set(newVal){
      if(value === newVal){
        return
      }
      value = newVal
      console.log('视图更新')
    }
  })
}


// 调用
const data = {
  age:20
}

observeData(data)
data.age = 21
console.log(data.age)
