# Tcp Http问题

![](https://image.yangxiansheng.top/img/20200810165535.png?imagelist)

## [精读](https://juejin.im/post/6844904100035821575)


## OSI五层（七层）协议

## GET和POST有什么区别？

- `get`产生一个`tcp数据包`，`post`会产生`两个tcp包`
- `get`主要是应用为获取资源，`post`主要是应用于传输或修改资源
- `get`的请求参数会被拼接到url后面，`post`放在request-body中
- `get`默认会被浏览器主动缓存，`post`不会

## HTTPS是如何保证安全的？

https并不是直接通过非对称加密传输过程，而是**有握手过程**，握手过程主要是`和服务器做通讯`，`生成私有秘钥`，最后`通过该秘钥对称加密传输数据`。还有`验证证书的正确性`。 证书验证过程保证了对方是合法的，并且中间人无法通过伪造证书方式进行攻击。

## 请简述TCP\UDP的区别
TCP:

面向连接
面向字节流
有状态
保证可靠交付
具备拥塞控制
点对点传播
有序

UDP:

无连接
面向数据报
无状态
不保证可靠交付
不具备拥塞控制
广播、多播
无序

## Http与Https的区别：

1. url不同
2. http不安全,https安全
3. http标准端口:80,https:443
4. http无法加密
5. 在OSI 网络模型中，HTTP工作于应用层，而HTTPS 的安全传输机制工作在传输层
## HTTP2和HTTP1有什么区别

- HTTP2支持二进制传送（实现方便且健壮），HTTP1.x是字符串传送
- HTTP2支持多路复用
- HTTP2采用HPACK压缩算法压缩头部，减小了传输的体积
- HTTP2支持服务端推送

## 聊一聊HTTP的状态码有哪些？

2XX 成功

- 200 OK，表示从客户端发来的请求在服务器端被正确处理 ✨
- 204 No content，表示请求成功，但响应报文不含实体的主体部分
- 206 Partial Content，进行范围请求 ✨

3XX 重定向

- 301 moved permanently，永久性重定向，表示资源已被分配了新的 URL
- 302 found，临时性重定向，表示资源临时被分配了新的 URL ✨

4XX 客户端错误

- 401 unauthorized，表示发送的请求需要有通过 HTTP 认证的认证信息 ✨
- 403 forbidden，表示对请求资源的访问被服务器拒绝 ✨
- 404 not found，表示在服务器上没有找到请求的资源 ✨

5XX 服务器错误

- 500 internal sever error，表示服务器端在执行请求时发生了错误 ✨
- 502 Bad Gateway：代理服务器无法获取到合法响应



## 为什么https不会被截获

## 详述TCP如何保证传输完整性

