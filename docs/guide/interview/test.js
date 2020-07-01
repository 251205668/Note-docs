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
