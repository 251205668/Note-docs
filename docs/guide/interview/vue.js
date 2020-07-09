// // 手写vue响应式更新

// // 入口
// function observeData(target){
//   // 对象或数组
//   if(typeof target !== 'object' || target == null){
//     return target
//   }
//   for(let key in target){
//     // data key value
//     defineRecative(target,key,target[key])
//   }
// }

// function defineRecative(data,key,value){
//   Object.defineProperty(data,key,{
//     get:function(){
//       return value
//     },
//     set(newVal){
//       if(value === newVal){
//         return
//       }
//       value = newVal
//       console.log('视图更新')
//     }
//   })
// }


// // 调用
// const data = {
//   age:20
// }

// observeData(data)
// data.age = 21
// console.log(data.age)


// 响应式原理
function observer(target){
  if(typeof target !== 'object' || target == null){
    return target
  }
  for(let key in target){
    defineReactive(target,key,target[key])
  }
}

function defineReactive(data,key,value){
  observer(value)
  Object.defineProperty(data,key,{
    get:function(){
      return value
    },
    set:function(newVal){
      observer(value)
      if(newVal === value){
        return 
      }
      value = newVal
    }
  })
}

// 更新数组

const oldArrayObject = Array.prototype
const arrayob = Object.create(oldArrayObject)
['push','shift','unshift','pop'].forEach(methodName=>{
  arrayob[methodName] = function(){
    updateView()
    oldArrayObject[methodName].call(this,...arguments)
  }
})
