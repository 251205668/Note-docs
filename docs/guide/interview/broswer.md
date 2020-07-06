# 浏览器

## 页面加载

![20200706164427.png](https://raw.githubusercontent.com/imageList/imglist/master/20200706164427.png)

页面的资源的形式一般包含html,css,js和媒体文件

**加载过程**

- DNS解析域名: 域名->Ip地址
- 浏览器根据IP地址向服务器发送`http`请求
- 服务器处理`http`请求，返回给浏览器

**渲染过程**

- 根据`HTML`代码生成DOM树
- 根据`CSS`代码生成`CSSOM`
- `DOM`树和`CSSOM`结合产生一个`RenderTree`,`dom`树上节点挂上CSS属性
- 根据`RenderTree`渲染页面
- 遇到`<script>`标签停止渲染,加载并执行js代码再执行渲染
- 直至渲染完成


![20200706165306.png](https://raw.githubusercontent.com/imageList/imglist/master/20200706165306.png)

## 性能优化

**性能优化多方面解决方案**
**手写防抖**
**手写节流函数**
