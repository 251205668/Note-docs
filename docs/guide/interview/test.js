// 原型链继承

Grand.prototype.lastName = "很皮"
function Grand(){}
var grand = new Grand()

Father.prototype = grand
function Father(){
  this.lastName = "真的皮"
}
var father = new Father()

Son.prototype = father
function Son(){

}
var son = new Son()

console.log(Son.prototype) // Grand {lastName:'真的皮'} 这种方式会继承很多多余的属性


// 借助构造函数实现继承

function Person(name,age){
  this.name = name
  this.age = age
}

function Student(name,age){
  // 执行父级的构造函数 虽然写法上好看了但是实际上和上面没区别
  Person.call(this,name,age)
}
var student = new Student('1',12)


// 公有原型继承  一定要先继承后使用 缺点是无法新增自己的原型属性，会互相影响

Father.prototype.lastName = "李雷"
function Father(){

}
function Son(){}
// 两个构造函数继承同一个原型
Son.prototype = Father.prototype
var son = new Son()
var father = new Father()

// 寄生组合继承 解决了公有原型无法增加私有原型属性的缺点 使用了中间层

/**
 * 
 * @param {*} Target Son
 * @param {*} Origin Father
 * function F(){}
 * F.prototype = Father.prototype
 * Son.prototype = new F()
 */
function inherit(Target,Origin){
  function F(){}
  F.prototype = Origin.prototype
  Target.prototype = new F()
  Target.prototype.constuctor = Target
}

 a = 100
 function demo(e) {
   function e() {}
   arguments[0] = 2
   console.log(e)
   if(a) {
     var b = 123
     function c() {} // if里面不能声明function c:undefined
   }
   var c
   a =10
   var a
   console.log(b)
   f = 123
   console.log(c)
   console.log(a)
 }
 var a
 demo(1)
 console.log(a)
 console.log(f)
