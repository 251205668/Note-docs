// 原型链继承

Grand.prototype.lastName = "很皮"
function Grand(){}
var grand = new Grand()

Father.prototype = grand
function Father(){
  this.lastName = "真的皮"
}
var father = new Father()

Son.prototype = father//将整个father看成 Father构造函数的this (this = {__proto:Father.prototype}) 就能够理解整个过程
function Son(){

}
var son = new Son()

console.log(Son.prototype) // Grand {lastName:'真的皮'} 这种方式会继承很多多余的属性


// 借助构造函数实现继承

function Person(name,age){
  this.name = name
  this.age = age
}

function Student(name,age,grade){
  // 执行父级的构造函数 虽然写法上好看了但是实际上和上面没区别,无法借用构造函数的原型
  Person.call(this,name,age)
  this.grade = grade
}
var student = new Student('1',12,12)


// 公有原型继承  缺点是无法新增自己的原型属性，会互相影响

Father.prototype.lastName = "李雷"
function Father(){

}
function Son(){}
// 两个构造函数继承同一个原型
Son.prototype = Father.prototype
var son = new Son()
var father = new Father()


// 圣杯模式继承 解决了公有原型无法增加私有原型属性的缺点 使用了中间层

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
  // 通过原型链继承  只不过经过了中间层F
  Target.prototype = new F()
  // son.__proto ===> newF().__proto__===>Father.prototype
  // 这一步是因为原型链将son的__proto指向了Father的prototype 所以要指回去
  Target.prototype.constuctor = Target
}
