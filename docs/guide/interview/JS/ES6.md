# ES6 新特性

[前辈总结的非常好的非常全的地址](https://juejin.cn/post/6844903959283367950#heading-0)

[完整图谱](https://image.yangxiansheng.top/img/20201218193125.png?imglist)

## 谈谈ES6的新特性
- **新的声明**: let、const
- **解构赋值**: 
  - 字符串解构：`const [a, b, c, d, e] = "hello`
  - 对象解构：`const { x, y } = { x: 1, y: 2 }`
  - 数组解构：`const [x, y] = [1, 2]`
- **字符串扩展**
  - 模板字符串
  - includes() : `acv".includes("a")`
  - startsWith()
  - endWidth

- **数值扩展**: Number方法扩展(例如Number.isNaN),Math方法的一些扩展`例如Math.trunc()返回整数部分`

- **对象扩展**
  - Object.is()：对比两值相等
  - Object.assign()：合并对象(浅拷贝)，返回原对象
  - Object.getPrototypeOf():返回原型对象
  - Object.keys()

- **函数扩展**
  - 箭头函数

  ```markdown
  箭头函数的难点
  - 函数体内的this是定义时所在的对象决定的
  - 不可当作构造函数，因此箭头函数不可使用new命令
  - 不可使用yield命令，因此箭头函数不能用作Generator函数
  - 不可使用Arguments对象，此对象在函数体内不存在(可以使用...args)
  - 返回对象时必须在对象外面加上括号
  ```
  - 函数可以设置默认值

- **Symbol类型**：独一无二的数据类型
  - 声明: `const a = Simbol("caller")`
  - 难点:

  ```js
  Symbol()生成一个原始类型的值不是对象，因此Symbol()前不能使用new命令
  Symbol()参数表示对当前Symbol值的描述，相同参数的Symbol()返回值不相等
  ```
- **Set数据结构**：类似于数组的数据结构，成员值都是唯一且没有重复的值
  - 声明 `const set = new Set(arr)`
  - 方法: 
  
  ```js
  add()：添加值，返回实例
  delete()：删除值，返回布尔
  has()：检查值，返回布尔
  clear()：清除所有成员
  keys()：返回以属性值为遍历器的对象
  values()：返回以属性值为遍历器的对象
  entries()：返回以属性值和属性值为遍历器的对象
  forEach()：使用回调函数遍历每个成员
  ```
  - 应用场景:
  
  ```js
  去重字符串：[...new Set(str)].join("")
  去重数组：[...new Set(arr)]或Array.from(new Set(arr))
  集合数组
    声明：const a = new Set(arr1)、const b = new Set(arr2)
    并集：new Set([...a, ...b])
    交集：new Set([...a].filter(v => b.has(v)))
    差集：new Set([...a].filter(v => !b.has(v)))
  ```
- **Map数据结构**: 类似于对象的数据结构，成员键是任何类型的值
  - 声明: `const map = new Map()`
  - 方法:

  ```js
  get()：返回键值对
  set()：添加键值对，返回实例
  delete()：删除键值对，返回布尔
  has()：检查键值对，返回布尔
  clear()：清除所有成员
  keys()：返回以键为遍历器的对象
  values()：返回以值为遍历器的对象
  entries()：返回以键和值为遍历器的对象
  forEach()：使用回调函数遍历每个成员
  ```
- **Proxy**: 修改某些操作的默认行为(替代Object.defineProtery)
  - 声明 `const proxy = new Proxy(target, handler)` 入参：拦截对象，定制行为
  - 新增13种拦截方式

- **Class**: 对一类具有共同特征的事物的抽象(构造函数语法糖)
- **Module**:模块化方案，新增了 `export`,`export default`等方法
- **Generator**：封装多个内部状态的异步编程解决方案，`yield`命令
- **Promise**:解决回调地狱

## 重学ES6总结

