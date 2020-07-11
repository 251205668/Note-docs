let obj1 = {
  name:"121",
  address:"xxxx",
  array:['a','b','c'],
  obja:{
    a:{
      b:"1213"
    }
  }
}
// 浅拷贝

// let obj2 = obj1
// obj2.name="浅拷贝"
// console.log(obj1.name) // 浅拷贝

// 深拷贝

let obj2 = deepClone(obj1)
obj2.name = "深拷贝"
console.log(obj1.name)

/**
 *  手写深拷贝 三个步骤: 1.判断类型 2.确定返回值 3.递归赋值
 * @param {Object} obj 
 */
function deepClone(obj = {}){
  // 保证是数组或对象
  if(typeof obj !== 'object' || obj === null){
    return obj
  }
  // 确定返回值
  let result 
  if(obj instanceof Array){
    result = []
  }else{
    result = {}
  }
  // 递归赋值 属性必须不是原型拥有
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
        // 递归保证深层结构赋值
        result[key] = deepClone(obj[key])
    }
  }
  return result

}
class People{
  constructor(name,number){
    this.name = name
    this.number = number
  }
  sayHi(){
    console.log('你好'+this.name)
  }
}

class Student extends People{
  constructor(name,number){
    super(name,number)
  }
}

const stu1 = new Student('夏洛',100)
console.log(Student.prototype)
console.log(stu1.__proto__)
console.log(Student.prototype === stu1.__proto__)



// // 手写jquery简单实现 基本步骤就是获取dom,遍历并且赋值被this,书写遍历,监听,获取方法

// class Jquery{
//   constructor(selector){
//     this.selector = selector
//     const ele = document.querySelectorAll(selector)
//     // 遍历赋值this
//     for(let i = 0;i < ele.length;i++){
//       this[i] = ele[i]
//     }
//     this.length = this.length
//   }
//   // 方法

//   get(index){
//     return this[index]
//   }

//   each(fn){
//     for(let i = 0;i < this.length;i++){
//       // 回调方法
//       const elem = this[i]
//       fn(elem)
//     }
//   }

//   on(type,fn){
//     this.each(elem=>{
//       elem.addEventListener(type,fn)
//     })
//   }
// }

// const jq = new Jquery('p')
// p.get(1)
// p.on('click',()=>{alert('1')})

// // 原型上扩展插件机制
// Jquery.prototype.newfun =  function(q){
//   alert(q)
// }

// // 造轮子的原理  就是继承原类扩展自身方法


// 闭包

// function create(){
//   const a= 200
//   return function(){
//     console.log(a)
//   }
// }

// const x = create()
// const a = 100
// x() // 打印 200

function print(fn){
  const a = 100
  fn()
}

const a = 200
function fn(){
  console.log(a)
}

print(fn)


function test1(){
  console.log(this)
}

test1() // window
test1.call({age:10})//{ age: 10 }
const test2 = test1.bind({age:11}) // bind和call区别就在于bind需要定义变量接收函数并执行, call直接改变this指向之后执行
test2()


// 手写bind 基本步骤: 在Function的原型上扩展方法, 第一步拆解参数获取this和参数 ，然后获取对象,通过对象调用apply方法

Function.prototype.bind1 = function(){
  // 获取参数
  const args = Array.prototype.slice.call(arguments)
  const t = args.shift()
  const self = this
  return function(){
    return self.apply(t,args)
  }
}

function test3(a,b,c){
  console.log(this,a,b,c)
}
const test4 = test3.bind1({age:11},10,20,30)
test4()


// const xhr = new XMLHttpRequest()
// // 发送请求 false代表异步
// xhr.open("GET","/api",false)
// // 监听state改变
// xhr.onreadystatechange = function(){
//   if(xhr.readyState === 4){
//     if(xhr.status === 200){
//       // 相应结果
//       alert(xhr.responseText)
//     }
//   }

// }
// xhr.send(null)

Function.prototype.mycall = function(context,...args){
  var context = context || window
  context.fn = this
  
}

