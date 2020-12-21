// Promise.resolve 1.转为promise对象 2.操作成功函数执行

Promise.resolve = function(data){
  return new Promise((resolve,reject)=>{
    resolve(data)
  })
}

// Promise.reject 

Promise.resolve = function(data){
  return new Promise((resolve,reject)=>{
    reject(data)
  })
}

/**
 * Promise.all(iterator) 传入promise对象数组，返回所有的Promise执行then后的结果，也就是最后需要resolve(res),res是所有的then之后成功的data
 */

Promise.all = function(iterator){
  if(!iterator instanceof Array){
    return
  }
  let res = []
  let count = 0
  return new Promise((resolve,reject)=>{
    for(let i of iterator){
      // 这一步是为了将所有的参数转为Promise实例，最后执行resolve(res)
      Promise.resolve(i).then(data=>{
        res[count++] = data
        if(count === iterator.length){
          resolve(res)
        }
      })
    }
  })
}

Promise.race = function(iterator){
  if(!iterator instanceof Array){
    return
  }
  return new Promise((resolve,reject)=>{
    for(let i of iterator){
      Promise.resolve(i).then(data=>{
        resolve(data)
      })
    }
  })
}

let p1 = Promise.resolve(3);
let p2 = 4;
let p3 = new Promise(resolve => {
  setTimeout(resolve, 100, 'lee')
});
Promise.all([p1, p2, p3]).then(data => {
  console.log(data);
})

Promise.race([p1,p2,p3]).then(res=>{
  console.log(res)
})


