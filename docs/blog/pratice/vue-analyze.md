# 带你轻松上手vue-router源码和动态路由



## 背景

上月立过一个 flag，看完 vue-router 的源码，可到后面发现 vue-router 的源码并不是很多总结的文章那么容易理解，阅读过你就会发现里面的很多地方都会有多层的回调，而且一些条件需要处理边缘条件。但是还是坚持啃下来了，下面是我在政采云(实习)工作闲暇时间阅读源码的一些感悟和总结，并带分析了大三时期使用的 [vue-element-admin](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/#%E5%8A%9F%E8%83%BD) 这个 `vuer` 无所不知的后台框架动态路由权限控制原理。顺便附带本文实践 demo 地址: 基于后台框架开发的[学生管理系统](https://github.com/251205668/student-admin-template)

## vue-router源码分析



## 权限控制动态路由原理分析

我相信，开发过后台项目的同学经常会碰到以下的场景: 一个系统分为不同的角色，然后不同的角色对应不同的操作菜单和操作权限。例如: 教师可以查询教师自己的个人信息查询然后还可以查询操作学生的信息和学生的成绩系统、学生用户只允许查询个人成绩和信息，不允许更改。在 `vue2.2.0` 之前还没有加入 `addRoutes` 这个 API 是十分困难的的。

目前主流的路由权限控制的方式是:

1. 前端在登录之后获取到 `JWT 令牌` 前端在全局路由拦截,并在 `route.js` 定义一套前端的路由表

2. 后端根据登录信息返回给前端对应的身份信息，并且涉及到身份信息操作的接口都需要做身份校验处理。 当然这里也可以在数据库中提前定义好一张 `roles-router` 表,然后在查询用户信息时将对应的路由树状表返给前端

3. 前端根据当前的角色将对应的权限的路由表拼接到常规路由表后面


### 登录生成动态路由全过程

了解如何控制动态路由之后，下面是我画的一张全过程流程图
![](http://assets.processon.com/chart_image/5f61ce086376894e3272db41.png)

前端在 `beforeEach` 中判断:

- 缓存中存在 `JWT令牌`
  - 访问 `/login` : 重定向到首页`('/')`
  - 访问 `/login` 以外的路由:  首次访问，获取用户角色信息，然后生成动态路由，然后访问以 `replace` 模式访问 `/xxx` 路由。这种模式用户在登录之后不会在 `history` 存放记录，回退直接显示空白页面

- 不存在 `JWT令牌`
  - 路由在白名单中: 正常访问 `/xxx` 路由
  - 不在白名单中: 重定向到 `/login` 页面

### 结合框架源码分析

下面结合 `vue-element-admin` 的源码分析该框架中如何处理路由逻辑的。

#### 路由访问逻辑分析

首先可以定位到和入口文件 `main.js` 同级的 `permission.js` , 全局路由守卫处理就在此

```js
const whiteList = ['/login', '/register'] // 路由白名单，不会重定向

// 全局路由守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start() //路由加载进度条
  // 设置meta标题
  document.title = getPageTitle(to.meta.title)
  // 判断token是否存在
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // 有token 跳转首页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取动态路由，添加到路由表中
          const { roles } = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          router.addRoutes(accessRoutes)
          //  使用 replace 访问路由，不会在 history 中留下记录，登录到dashbord时回退空白页面
          next({ ...to, replace: true })
        } catch (error) {
          next('/login')
          NProgress.done()
        }
      }
    }
  } else {
    // 无token
    // 白名单不用重定向 直接访问
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 携带参数为重定向到前往的路径
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

```

这里的代码我都添加了注释方便大家好去理解，总结为一句话就是访问路由 `/xxx` ，首先需要校验 `token`是否存在，如果有就判断是否访问的是登录路由，不是则需要判断该用户是否是第一访问首页，然后生成动态路由，如果没有 `token` 就去检查路由是否在白名单(任何情况都能访问的路由)，在的话就访问，否则重定向回登录页面。

#### 结合Vuex生成动态路由

下面就是分析这一步 `const accessRoutes = await store.dispatch('permission/generateRoutes', roles)` 是怎么把路由生成出来的。

首选 `vue-element-admin` 中路由是分为两种的:
- constantRoutes: 不需要权限判断的路由

- asyncRoutes: 需要动态判断权限的路由

![](https://image.yangxiansheng.top/img/20200920212514.png?imglist)

生成动态路由的源码位于 `src/store/modules/permission.js` 中的 `generateRoutes` 方法，源码如下：

```js
 generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      //   debugger
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
      // 不是admin 去遍历生成对应的权限路由表
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
```

从 `route.js` 读取 `asyncRoutes` 和 `constantRoutes` 之后首先判断当前角色是否是 `admin` ，是的话默认超级管理员能够访问所有的路由，当然这里也可以自定义，否则去过滤出路由权限路由表，然后保存到`Vuex`中。 最后将过滤之后的 `asyncRoutes` 和 `constantRoutes` 进行合并。

过滤权限路由的源码如下:

```js
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    // 浅拷贝
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}
```
首先定义一个空数组，对传入 `asyncRoutes` 进行遍历，判断每个路由是否具有权限，未命中的权限路由直接舍弃
判断权限方法如下:

```js
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    // roles有对应路由元定义的role 就返回true
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
```
接着需要判断二级路由、三级路由等等的情况，再做一层迭代处理，最后将过滤出来的路由推进数组返回。然后追加到 `constantRoutes`后面

```js
 SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
```


**动态路由生成全过程**

![](https://www.youbaobao.xyz/admin-docs/assets/img/route_permission.52870df5.jpg)


## 总结

- `vue-router`源码
  
- 权限控制动态路由:
  - 路由逻辑: 全局路由拦截，从缓存中获取令牌，存在的话如果首次进入路由需要获取用户信息，生成动态路由，这里需要处理 `/login` 特殊情况，不存在则判断白名单然后走对应的逻辑
  - 动态生成路由: 传入需要 `router.js` 定义的两种路由。判断当前身份是否是管理员，是则直接拼接，否则需要过滤出具备权限的路由，最后拼接到常规路由后面，通过 `addRoutes` 追加。

**个人感悟**:

 获取阅读源码的作用不能像一些文档一样直接立马对日常开发有所帮助，但是它的影响是长远的，在读源码的过程中都可以学到类似闭包、设计模式、时间循环、回调等等 JS 进阶技能，并稳固并提升了你的 JS 基础。
 
 如果一味的死记硬背一些所谓的面经，或者直接死记硬背相关的框架行为或者 API ，你很难在遇到比较复杂的问题下面去快速定位问题，解怎么去解决问题，而且我发现很多人在使用一个新框架之后遇到点问题都会立马去提对应的 `Issues` ,但是许多问题都是因为我们并未按照设计者开发初设定的方向才导致错误的，更多都是些粗心大意造成的问题。
