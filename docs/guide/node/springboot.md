## Springboot

### 类和对象

#### 变量

一个类可以包含三种变量:`局部变量`，`成员变量`,`类变量`

```java
public class Dog{
    // 成员变量
    String breed;
    int age;
    String color;
    // 局部变量
    public Dog(String name){
       String dogName;  
    }
    // 类变量
    static final username = 'ZhangSan'
    void barking(){}
    void hungry(){}
    void sleep(){}
}
```

#### 构造方法

用来初始化对象，一个对象必须要有一个构造方法

```java
public class Pub{
    public Pub(String name){
        System.out.println("")
    }
}
```

#### 创建对象

- 声明
- 实例化
- 初始化属性

```java
public class Car{
    public Car(String name){
        System.out.println("汽车名字:"+name);
    }
    public static void main(String[] args){
        Car car1 = new Car("BMW")
            // 汽车名字:BMW
    }
}
```

#### 访问成员变量

```java
public class Car{
    String name;
    public Car(String name){
        
    }
    public String getName(){
        return name;
    }
    public void setName(name){
        this.name = name;
    }
  public static void main(String[] args){
      Car car1 = new Car('bmw');
      // 设置成员变量
      car1.setName('')
      // 获取
      car1.getName()
  }
}
```

#### 继承 重写

**继承**

公共类

```java
public class Animal { 
    private String name;  
    private int id; 
    public Animal(String myName, int myid) { 
        name = myName; 
        id = myid;
    } 
    public void eat(){ 
        System.out.println(name+"正在吃"); 
    }
    public void sleep(){
        System.out.println(name+"正在睡");
    }
    public void introduction() { 
        System.out.println("大家好！我是"         + id + "号" + name + "."); 
    } 
}
```

子类

```java
public class Penguin extends Animal { 
    public Penguin(String myName, int myid) { 
        super(myName, myid); 
    } 
}
```

> 如果父类的构造器带有参数，则必须在子类的构造器中显式地通过 **super** 关键字调用父类的构造器并配以适当的参数列表。
>
> 如果父类构造器没有参数，则在子类的构造器中不需要使用 **super** 关键字调用父类构造器，系统会自动调用父类的无参构造器。

多继承接口

```java
public interface A {
    public void eat();
    public void sleep();
}
 
public interface B {
    public void show();
}
 
public class C implements A,B {
}
```

子类调用父类方法

```java
class Dog extends Animal {
  void eat() {
    System.out.println("dog : eat");
  }
  void eatTest() {
    this.eat();   // this 调用自己的方法
    super.eat();  // super 调用父类方法
  }
}
```

**重写**

子类对父类允许访问的方法进行重新编写， **即外壳不变，核心重写！** 

![](https://image.yangxiansheng.top/img/20200424233112.png?imagelist)

例:

```java
class Animal{
   public void move(){
      System.out.println("动物可以移动");
   }
}
 
class Dog extends Animal{
   public void move(){
      System.out.println("狗可以跑和走");
   }
}
 
public class TestDog{
   public static void main(String args[]){
      Animal a = new Animal(); // Animal 对象
      Animal b = new Dog(); // Dog 对象
 
      a.move();// 执行 Animal 类的方法
 
      b.move();//执行 Dog 类的方法
   }
}
```

#### 多态 抽象类

** 多态**

同一个行为不同的实例进行不同操作

多态例子：英雄分为 近战，射手 都可以进行杀敌行为

#### 接口

 接口（英文：Interface），在JAVA编程语言中是一个抽象类型，是抽象方法的集合，接口通常以interface来声明。一个类通过继承接口的方式，从而来继承接口的抽象方法。 

>  接口支持多继承 
>
>  接口中的方法是不能在接口中实现的，只能由实现接口的类来实现接口中的方法。 

例：

```java
interface Animal {
   public void eat();
   public void travel();
}
```

实现类

```java
/* 文件名 : MammalInt.java */
public class MammalInt implements Animal{
 
   public void eat(){
      System.out.println("Mammal eats");
   }
 
   public void travel(){
      System.out.println("Mammal travels");
   } 
 
   public int noOfLegs(){
      return 0;
   }
 
   public static void main(String args[]){
      MammalInt m = new MammalInt();
      m.eat();
      m.travel();
   }
}
```





### 数据类型

#### 基本类型

- byte/8
- char/16
- short/16
- int/32
- float/32
- long/64
- double/64
- boolean/~

#### 装箱拆箱

```java
Integer x = 2;//装箱
int y = x;    // 拆箱
```

#### 引用类型

对象，数组都是引用类型，引用类型指向一个对象，状态可以保存

 例子：Site site = new Site("Runoob")。 

#### 常量

```java
final double PI = 3.14
```

#### 类型转换

- 自动类型转换

  必须满足规则

  ```java
  低  ------------------------------------>  高
  
  byte,short,char—> int —> long—> float —> double 
  ```

  

  ```java
  char c1 = 'a';
  int a = c1;
  // a =97
  ```

- 强制转换

  语法：`(type)value type`

  ```java
  int i = 123;
  byte b = (byte)i
  ```

  

#### 字符串

常用转义字符

![](https://image.yangxiansheng.top/img/20200424214323.png?imagelist)

```java
String name = 'runoob.com'
```
**API**
- concat 连接
-  compareTo 比较是否相等 返回0
- endsWith 结尾
- indexOf 返回第一次出现索引
- lastIndexOf

#### 数组

**基础**

- 声明

  ```java
  dateType []arrayName;
  ```

- 创建

  ```java
  1. int []array = new int[size]
  2. int []array = {1,2,3...};
  ```

- 遍历

  ```java
  int []array = {1,2,3,4,5,6};
  
  for(int i = 0;i < array.length;i++){
      
  }
  
  // 加强for
  for(int item:array){
      System.out.println(item)
  }
  ```
  
- 数组作为函数参数，和函数返回数组

  ```java
  public static void printArray(int[] array){
      
  }
  
  public void int[] reverse(int[] array){
      int[] result = new int[array.length];
       return result;
  }
  ```

  

- 多维数组
  
  ```java
  int a[][] = new int[2][3]
  ```

**API**

![](https://image.yangxiansheng.top/img/20200424231317.png?imagelist)



### 修饰符

#### 访问修饰符

- default 默认
- private 私有
- public 共有
- protected 同一包内可见，不能修饰外部类（接口）

####  非访问修饰符

- static 静态方法，静态变量
- final 保持不变
- abstract 抽象类， 声明抽象类的唯一目的是为了将来对该类进行扩充 。
- synchronized 同一时间只能被一个线程访问

### Number,Math,Date

#### Number，Math

```java
Integer x = 7 // 创建Number
    
x.equals(params) //判断相等
    
valueOf() //返回数据类型
    
x.toString() //转为字符串

x.parseInt() // 转int

Math.abs()  // 绝对值
 
Math.ceil()
Math.floor() //取整

Math.round  // 四舍五入
 
Math.min
Math.max

Math.random // 取随机数 0-1
// 去区间随机数
Math.floor(Math.random() * (max - min + 1) + min)
 
```

#### **Date**

```java
Date date = new Date()
date.toString() // 日期时间

SimpleDtaeFormat ft = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")// 格式化类
ft.format(new Date())

```

#### Calendar

```java
Calendar c1 = Calendar.getInstance();
// 获得年份
int year = c1.get(Calendar.YEAR);
// 获得月份
int month = c1.get(Calendar.MONTH) + 1;
// 获得日期
int date = c1.get(Calendar.DATE);
// 获得小时
int hour = c1.get(Calendar.HOUR_OF_DAY);
// 获得分钟
int minute = c1.get(Calendar.MINUTE);
// 获得秒
int second = c1.get(Calendar.SECOND);
// 获得星期几（注意（这个与Date类是不同的）：1代表星期日、2代表星期1、3代表星期二，以此类推）
int day = c1.get(Calendar.DAY_OF_WEEK);
```

### 枚举 集合 泛型 

#### 概念

枚举:参考文章   [地址]( https://www.runoob.com/java/java-enumeration-interface.html )

集合

- Collection 接口

- List 接口

- Set 接口

- Map  键值队

- Enumeration

  ![](https://image.yangxiansheng.top/img/20200424234934.png?imagelist)

#### 使用实例

```java
List<String> list = new ArrayList<String>();// 声明数组集合
list.add("1");
list.add("2");

// 遍历方法

for - Each循环
for(String item :list){
  
}

迭代器循环
Iterator<String> ite = list.iterator();
while(ite.hasNext()){
    
}


Map
Map<String, String> map = new HashMap<String, String>();
      map.put("1", "value1");
      map.put("2", "value2");
      map.put("3", "value3");
      
      //第一种：普遍使用，二次取值
      System.out.println("通过Map.keySet遍历key和value：");
      for (String key : map.keySet()) {
       System.out.println("key= "+ key + " and value= " + map.get(key));
      }
      
      //第二种
      System.out.println("通过Map.entrySet使用iterator遍历key和value：");
      Iterator<Map.Entry<String, String>> it = map.entrySet().iterator();
      while (it.hasNext()) {
       Map.Entry<String, String> entry = it.next();
       System.out.println("key= " + entry.getKey() + " and value= " + entry.getValue());
      }
      
      //第三种：推荐，尤其是容量大时
      System.out.println("通过Map.entrySet遍历key和value");
      for (Map.Entry<String, String> entry : map.entrySet()) {
       System.out.println("key= " + entry.getKey() + " and value= " + entry.getValue());
      }
    
      //第四种
      System.out.println("通过Map.values()遍历所有的value，但不能遍历key");
      for (String v : map.values()) {
       System.out.println("value= " + v);
      }
```

## Springboot

### 理解IOC 依赖注入

#### IOC

`IOC`- 控制反转，在传统`SE`阶段如果`A`类需要使用到`B`类，需要在`A`的内部`new`一个`B`的实例出来，进而控制对象内部。**而`IOC`专门有一个`容器`来创建这些依赖的对象**，然后控制要交给`A`类哪些依赖。至于为什么叫`反转`,因为传统的获取依赖对象是`对象主动去控制`，而`IOC`的控制交给了容器，容器帮忙创建注入依赖对象，此时`A`对象只是`被动的接收依赖的注入`。

- `IOC`容器控制对象，主要控制外部资源获取
- 容器帮忙创建并注入依赖对象，程序被动接受`依赖对象`

#### DI

`DI`-依赖注入，容器将某个依赖关系注入到组件中去。依赖注入组件`重用`的频率，依赖注入是`IOC`思想最好的表现形式。

- **谁依赖谁**：`应用程序`依赖于`IOC`容器

- **为什么要使用`DI`**：应用程序需要`IOC`提供提供对象外部资源

- **谁注入谁**:`IOC`注入应用程序的对象

#### 我的理解

> `IOC`的出现解决了传统java开发应用程序，对象与对象之间耦合性，`A`需要`B`，`A`就要主动创建`B`对象，进行控制，这样`A`和`B`就产生了依赖，而且是紧密耦合性。`IOC`则不同，我们只需要吧需要的依赖在`容器`中创建好，然后要的时候由`容器`进行注入,`A`对象根本不用去管`B`以及更多依赖的问题，只需要交给容器处理，二者协作进行即可。

### springboot阶段学习

#### 版本号

2.2.1 RELEASE

```markdown
2 主版本
2 次版本 新特性 发布新特性 要保证兼容
1 增量版本 bug修复
RELEASE 发布版本 、 里程碑版本


RC 
Alpha 内测
Beta 发行 但不稳定
GA （General Availability） 官方通用
SHAPSHOT
```

#### 运行springboot项目

在官网中创建项目然后用idea打开，或者直接创建`springboot项目`

```markdown
- 打开 idea -> create project
- 选择左侧 Spring Initializr
  - 选择你的 java版本 如 8
  - next
- Group: com.公司名
- artifact : 你的项目名
- Type: 选 maven
- Language: Java
- Packaging: Jar
- java version:8
- 点击最下方的 Next
- Spring Boot 选择 2.2.x
- Dependencies 选择 web 下的 spring web 
- Next
- Finish
```

修改默认端口

> resources/application.properties 下添加
>
> server.port = 端口号

#### 编写第一个接口

创建`api.v1/api.v2`文件夹管理`api`，然后创建一个控制器类.

```java
分为三步
1. 编写返回方法
2. 插入注解
3. 返回结果

// 控制器注解
@Controller 
public class BannerController{
    // 路由注解
    @GetMapping("/test")
    // 处理返回结果注解 相当于操作了 HttpServletresponse 的打印器方法
    @ResponseBody  
    public String test(){
        return "hello,springboot"
    }
}
```

#### 配置热重启

安装`devtools`，然后配置idea

- 搜索 Compiler
- 勾选 build project automatically

#### 常见注解

- 请求method限定

    ```java
  @GetMapping("/test")
  @PostMapping("/test")
  @PutMapping("/test")
  @RequestMapping("/test") // 全方法都支持
  @RequestMapping(value = "/test",method = {RequestMethod.DELETE,RequestMethod.GET}) // method传递支持的方法
  ```

-  Springboot 提供的 简化注解

  `@RestController` 意思就是

  ```
  @Controller
  @ResponseBody
  ```

#### 统一路径管理

```java
@RestController
@RequestMapping("/v1")
public class BannerController {
    @GetMapping("/test")
    public String test(){
        return "七月,牛逼";
    }
}

```

#### 深刻理解springboot

##### 开闭原则-OCP

软件，函数，类是扩展开发的，修改是封闭的。举例说明：修改业务最好是通过新增业务模块进行处理，API的`v1`和`v2`版本的使用。



##### 面向抽象编程

`interface` ，设计模式:`工厂模式`，`IOC/DI`

如果是具体类的话，修改是灾难性的。面向抽象的话，只需要调方法即可。**真正的目的就是实现开闭原则从而达到代码可维护性。**



> springboot和springframework的区别
>
> springboot 借助springframework开发的

#####  Spring、SpringMVC与SpringBoot的关系与区别

> SSM `Spring + SpringMVC + MyBatis`

Spring 全称是 Spring Framework

- SpringBoot 是 Spring Framework 的应用

#####  什么是SpringBoot核心优势-自动配置

#####  Springboot意义性(死记)

> OCP -> IOC

- IOC实现： 容器，把控制类加入 容器 ，在你需要时把对象注入你所需要的代码里去

-  抽象意义：控制权交给用户

##### 如何将对象加入容器,并注入

- xml

- 注解

  - `stereotype annotations` 模式注解,`两步`

    ```java
    加入容器
    @Component  
    扫描加入容器注解
    @service 
    加入服务层容器
        
    使用的时候，注入,已经实例化
    @Autowired
    
    1.成员变量注入
    private Diana diana
    
    2.推荐注入方式：构造器，不需要加入注解@Autowired
     private final Diana diana;
      public BannerController(Diana diana) {
            this.diana = diana;
       }
    ```
```
    
    - `@Component` 最基础的模式注解
  - 把一个组件/类/bean加入到容器中
    
> 以下都是以 `@Component` 为基础的衍生注解
    
    - `@Service` 标明是种服务
    - `@Controller` 标明是个控制器
    - `@RestController` 标明是个restful 的 控制器 
    - `@Repository` 标明是个仓储
    - `@Configuration` 更灵活的方式 把一组bean加入到容器里
      - 跟上面的有些不同
      - 具体参考[@Configuration 注解介绍](

##### 实例化时机和延时实例化

> 如何允许 未添加 `@Component` 注解的类 为空值

```
@Autowired(required = false)
private Diana diana;
```

> IOC 对象实例化注入时机

- 在Spring启动的时候就开始 对象的实例化 并注入
- 这是一个默认的机制 **立即/提前 实例化**
  
    - 延迟实例化 `@Lazy`
    
      

##### @Autowired 类型注入方式

预设环境，多个类实现接口，并且加入到容器，使用`@Autowired`注入会加载哪一个实现

<h2>被动注入</h2>
- **bytype** 默认注入形式

  - 根据类型推断到底应该注入谁

  - 比如上面的如果注入 ISkill 就会去所有加入到容器里的bean去寻找实现ISkill的类 加入进来

```
    @Autowired
    private ISkill iSkill;
    ```
    
    - **如果仅仅有一个实现类 Diana 那就会加载它**
    - **如果有多个bean时候，字段找不到对应的`bean`， spring就不知道到底该注入谁。就会报错**

- **byname**

<h2>主动注入</h2>
强制设置注入的`value`

```java
@Autowired
@Qualifier("irelia")
private ISkill iSkill;

// 这样它就会 按你要求注入 Irelia
```

##### 如何应对变化

1. **制定一个 interface ,然后多个类实现同一个 interface.** 

   - 策略模式
   - 只能选一个策略  

2. **一个类，属性 解决变化**

   ```java
   // 比如你只有一个实现类 Diana ，但你想打印 irelia
   
   package com.lin.missyou.sample.hero;
   
   import com.lin.missyou.sample.ISkill;
   import org.springframework.stereotype.Component;
   
   @Component
   public class Diana  implements ISkill {
       private String skillName = "Irelia"
       public Diana() { System.out.println("hello,Diana"); }
       public void q(){ System.out.println("Diana Q"); }
       public void w(){ System.out.println("Diana W"); }
       public void e(){ System.out.println("Diana E"); }
       
       public void r(){ System.out.println(this.skillName + "r"); }
       
   }
   ```

   - 像这样实际上是不好的，因为在代码里了。
   - 如果你要用这样方式： **应该用读取配置的方式** 这样才不违背 OCP 原则
     - 比如 spring boot 默认 8080 端口，你可以通过修改配置文件 让他启动在其他端口
     - 这种方式不具备 扩展性，如果未来你想添加新的属性，就要改这个类了，也不够灵活。除非你保证以后这个类不再变了

   

##### @configuration注解使用方法

- 新建 HeroConfiguration.java
    1. 在 HeroConfiguration上 使用 `@Configuration`
    
    2. 对注入的对象 Camille 使用`@Bean`，返回一个`bean`实例

```
@Configuration
public class HeroConfiguration {
    @Bean
    public ISkill camille(){
        return new Camille();
    }
}
```

- 控制器类里稍微修改下

```
@RestController
@RequestMapping("/v1/banner")
public class BannerController {

    @Autowired
    private ISkill camille;

    @GetMapping("/test")
    public String test2() {
        camille.q();
        return "Hello,亚瑟";
    }
}
```

**优势**

>  如果我们的 hero 类 新增了属性那么如何初始化

- `@Component` 是**无法做到把 类的属性进行初始化的**
- `@Configuration` 则可以
- `@Configuration` 还能同时初始化多个 bean

Camille.java

- 新增了 name / age 字段 并在构造器里赋值

```java
public class Camille implements ISkill {

    private String name;
    private Integer age;

    public Camille(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Camille() { System.out.println("hello,Camille"); }
    public void q(){ System.out.println("Camille Q"); }
    public void w(){ System.out.println("Camille W"); }
    public void e(){ System.out.println("Camille E"); }
    public void r(){ System.out.println("Camille r"); }
}
```

HeroConfiguration.java 里只需要这样就可以实现

- 即使你想调用无参构造器 ，也可用通过 setName / setAge 在 return camille

```java
@Configuration
public class HeroConfiguration {

    @Bean
    public ISkill camille(){
        return new Camille("camille",18);
    }
    
     @Bean
    public ISkill diana(){
        return new Diana();
    }
}
```

##### springboot扫描注解

默认是与程序主入口文件夹下

`@ComponentScan("path")`

> 手动指定你想要加载其他位置的包

- 如果手动指定的路径 已经在默认路径里会标红
- 新增的扫描位置是不影响原来的扫描位置，是可以叠加的

```
@SpringBootApplication
@ComponentScan("com.lin")
public class MissyouApplication {
    public static void main(String[] args) {
        SpringApplication.run(MissyouApplication.class, args);
    }
}
```

##### 策略模式实现的几种方式

1. `byname 方式` 切换 bean的 name

    ```java
    @Autowired
    private Iskill diana
    ```

    

2. `@Qualifier` 指定 bean

    ```java
    多个bean情况下
    
    @Autowired
    @Qualifier("diana")
    private Isskill isskill
    ```

    

3. **有选择的只注入一个 bean 注释掉某个 bean的 @Component**

4. `@Primary` 

    - 如果同时 Diana 和 Irelia 同时加上了 @Component
    - 如果定义的时候是 ISkill iskill 那么会报错
    - 可以想让 Diana 生效则 额外添加`@Primary`
    ```java
    @Component
    @Primary
    public class Diana  implements ISkill {
        ...
    }
    ```

##### 条件注解

配置类

```java
@configuarition
public class HeroConfiguarition {
    @bean
    public ISkill iskill(){
        return new Dinaa()
    }
    // 可以有多个bean
}
```

> 自定义条件注解

**`@Conditional` + 实现Condition 接口的元类**

- 分别注释掉 Diana 和 Irelia 里的 `@Component`

- 修改 HeroConfiguration.java 
    ```
    @Configuration
    public class HeroConfiguration {
    
        @Bean
        @Conditional(DianaCondition.class)
        public ISkill diana(){
            return new Diana();
        }
    
        @Bean
        @Conditional(IreliaCondition.class)
        public ISkill irelia(){
            return new Irelia();
        }
    }
    ```
- DianaCondition.java / IreliaCondition.java
```
// 注意 java 很多类都有 Condition 这里引入 spring framework的
import org.springframework.context.annotation.Condition;

public class DianaCondition implements Condition {
    @Override
    public boolean matches(ConditionContext conditionContext, AnnotatedTypeMetadata annotatedTypeMetadata) {
        // 判断条件
        return true;
    }
}


public class IreliaCondition implements Condition {
    @Override
    public boolean matches(ConditionContext conditionContext, AnnotatedTypeMetadata annotatedTypeMetadata) {
        // 判断条件
        return false;
    }
}
```

#### 二次封装springboot框架机制

##### 异常处理概念

统一异常捕获

```java
@ControllerAdvice
public class GlobalException {
    @ExceptionHandler(value = Exception.class)
    public void handleException(HttpServletRequest req,Exception e){
        System.out.println("hello");
    }
}
```

**异常分类**

> **`CheckedException`** 受检异常  (可以处理，比如是A类调用B类的方法，但是B类没有方法)

- 编译阶段进行处理，否则编译通不过.
- 必须程序里主动处理

> **`RuntimeException`** 运行时异常（不能处理，比如数据库记录查询结果为空）

- 可以不处理

> 对于web如果有全局的异常处理

- 可以不区分





##### 全局异常处理步骤

>  处理的异常分为**已知异常或者未知异常**

###### 1. 定义`HttpException类`，继承`RuntimeException`

   ```java
   public class HttpException extends RuntimeException{
       protected Integer code;
       protected Integer HttpstatusCode;
   }
   
   ```

###### 2. 基类子异常，比如`NotFoundException`

   ```java
   public class NotFoundException extends HttpException{
       public NotFoundException(int code){
           this.HttpstatusCode = 404;
           this.code = code;
       }
   }
   ```

###### 3. 定义统一异常返回格式类 ，构造函数初始化属性，并且一定要有`getter`方法，否则无法访问

   ```java
   public class UnifyException {
       private int code;
       private String message;
       private String request;
   
       public UnifyException(int code, String message, String request) {
           this.code = code;
           this.message = message;
           this.request = request;
       }
   
       public int getCode() {
           return code;
       }
   
       public void setCode(int code) {
           this.code = code;
       }
   
       public String getMessage() {
           return message;
       }
   
       public void setMessage(String message) {
           this.message = message;
       }
   
       public String getRequest() {
           return request;
       }
   
       public void setRequest(String request) {
           this.request = request;
       }
   }
   ```

   

###### 4. 全局捕捉异常类`GlobalException`，分为`已知异常`和`未知异常`

   `@ControllerAdvice`捕获异常注解

    ` @ExceptionHandler(value = Exception.class)`捕获到进行处理的注解

   `@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)`设置状态码

   可以通过`req`获取`method`,`url`,

   - 已知异常: 处理`Exception`，设置HttpstatusCode为500，然后返回`UnifyException`
   - 未知异常: 使用 `ResponseEntity<UnifyException>`定义一个泛型，然后返回这个泛型，需要传入三个参数，`message`,`header`，`HttpStatusCode`

   ```java
   @ControllerAdvice
   @ResponseBody
   public class GlobalException {
       // 加载配置文件关联的类 处理message
       @Autowired
       private ExceptionCodeConfiguration codeConfiguration;
       // 未知异常
       @ExceptionHandler(value = Exception.class)
       @ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
       public UnifyException handleException(HttpServletRequest req,Exception e){
           // 当有checkedException异常抛出,加上这两个方法,会在全局捕捉到异常,并运行方法
           String url = req.getRequestURI();
           String method =req.getMethod();
           UnifyException message = new UnifyException(999,"服务器异常",method+" "+url);
           // 返回对象序列化
           return message;
       }
      
       // 已知异常
      @ExceptionHandler(HttpException.class)
       public ResponseEntity<UnifyException> handleHttpException(HttpServletRequest req, HttpException e){
           String url = req.getRequestURI();
           String method = req.getMethod();
           UnifyException message = new UnifyException(e.getCode(),codeConfiguration.getMessage(e.getCode()),method+" "+url);
           // 设置已知异常的Httpstatus 利用泛型设置
           //ResponseEntity<UnifyResponse> r = new ResponseEntity<>(message,header,httpStatus);
           // 处理返回的 header httpstatus
           HttpHeaders header = new HttpHeaders();
           header.setContentType(MediaType.APPLICATION_JSON);
   
           HttpStatus httpStatus = HttpStatus.resolve(e.getHttpstatusCode());
           ResponseEntity<UnifyException> r = new ResponseEntity<>(message,header,httpStatus);
           return r;
       }
   
   }
   ```

   ![](https://image.yangxiansheng.top/img/20200429000523.png?imagelist)

![1588089946065](C:\Users\努力中的杨先生\AppData\Roaming\Typora\typora-user-images\1588089946065.png)

###### 自定义配置文件关联类

首先定义一个文件管理`code`码对应的`message`,俗称错误码清单

```java
lin.codes[10000] = 通用异常
lin.codes[10001]= 通用参数异常
```

然后，定义一个`configuration`类对配置文件进行关联，将`codes`看做是`Map`数据结构，然后定义方法获取到`message`

>@ConfigurationProperties(prefix = "lin")  配置前缀
>@PropertySource(value = "classpath:config/exception-code.properties") 加载配置文件路径
>@Component 

```java
@ConfigurationProperties(prefix = "lin")
@PropertySource(value = "classpath:config/exception-code.properties")
@Component
public class ExceptionCodeConfiguration {
/*
  codes看做是 Map数据结构，键值对应
 */
    private Map<Integer, String>codes;

    public Map<Integer, String> getCodes() {
        return codes;
    }
    public void setCodes(Map<Integer, String> codes) {
        this.codes = codes;
    }

    public String getMessage(int code){
        String message = codes.get(code);
        return message;
    }

}
```



