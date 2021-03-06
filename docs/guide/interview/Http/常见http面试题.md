# 计算机网络总结(附操作系统)

[[toc]]

复习完所有的知识点之后，刷一下[这篇文章](https://juejin.im/post/6844904100035821575)

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


## HTTP和TCP的关系

- http是应用层，tcp是传输层

- http是基于tcp的基础上实现的

- tcp只是单纯的进行连接，http是会进行收发数据

## get和post的区别

- get 会被浏览器缓存，请求长度受限，会被保存历史记录，浏览器回退时候是无害的，一般不带请求体，发送一个TCP数据包。

- post 更安全，更多编码类型，可以发比较大的数据，浏览器回退的时候会再次提交请求，一般带有请求体，发送两个TCP数据包(可以保证网络较差完整性)


## HTTP 报文

![](https://image.yangxiansheng.top/img/20201214152337.png?imglist)

**请求报文**

一个 HTTP 请求报文由**请求行（request line）**、**请求头（header）**、**空行**和**请求数据** 4个部分组成。

**请求行**

包括请求方法字段、URL 字段和 HTTP 协议版本，如：GET /index.html HTTP/1.1

**请求头**

请求头由关键字 / 值组成，每行一对，关键字和值用英文冒号隔开

请求头部通知服务器有关于客户端请求的信息，典型的请求头有：

*   User-Agent：产生请求的浏览器类型
*   Accept：客户端可识别的内容类型列表
*   Host：请求的主机名，允许多个域名同处于一个 IP 地址，即虚拟主机
*   Content-Type：请求体的 MIME 类型（用于 POST 和 PUT 请求中），如：`Content-Type:application/x-www-form-urlencoded`

**空行**

最后一个请求头之后是空行，发送回车符和换行符，通知服务器以下不再有请求头

**请求数据**

请求数据不在 get 方法中使用，而是 post 方法中使用。post 方法适用于需要客户填写表单的场合，与请求数据相关的最常使用的请求头是 Content-Type 和 Content-Length


## 响应报文

响应报文由**状态行**、**响应头**、**空行**、**响应正文** 组成

## 讲一下三次握手？

SYN: 同步序号，表示请求建立连接，设置序列号字段初始值，SYN=1

ACK: ACK=1 确认号有效，ACK=0，确认号无效

ack: 确认号，序列号seq是每个字节的第一位，而确认号希望接受到下一个字节的编号
ack=上一次序列号+1

seq: 序列号，字节的第一位编号，随机生成

FIN：希望断开连接

![](https://image.yangxiansheng.top/img/20200906213917.png?imagelist)

用自己的话来讲:

1. 客户端请求建立连接，发送`SYN`(seql =x)包，服务端进入待确认状态
2. 服务端接受到`SYN`包后，确认连接，发送`ACK`包(ack = x+1),并发送自己的`SYN`包给客户端
3. 客户端接收到服务端发送的`SYN`包和`ACK`包之后，发送`ACK`确认包，发送完成之后客户端和服务端建立连接，表示三次握手成功

**为什么是三次握手**:

保证安全可靠连接

两次握手过程，只有客户端知道接受和发送的能力，**但是服务端不知道客户端能不能收到自己的信息，所以最后一次需要客户端发送ACK确认包**。服务端就知道了客户端能够接受自己的信息。

## 讲一下四次握手？

![](https://image.yangxiansheng.top/img/20200906215734.png?imagelist)

1. 客户端发送方`FIN`包给服务端，此过程是告诉服务端我要断开连接了
2. 服务端接受到了`FIN`，然后发送`ACK`确认包给客户端，告诉客户端我已经收到了，我需要准备
3. 服务端发送`FIN`断开连接包给客户端，表示断开连接准备好了
4. 客户端接收到了`FIN`，发送`ACK`给服务端，正式断开连接

![](https://image.yangxiansheng.top/img/20201207122741.png?imglist)

## 为什么建立是3次握手，而关闭是4次挥手呢？

因为建立连接的时候，客户端接受的是syn + ack包。而关闭的时候，服务端接受fin后，客户端仅仅是不再发送数据，但是还是可以接收数据的。服务端此时可以选择立刻关闭连接，或者再发送一些数据之后，再发送fin包来关闭连接。因此fin与ack包一般都会分开发送。


## TCP三次握手中可以传输数据吗

第一次第二次不可以，因为很容易被人攻击，而第三次握手已经进入establish状态了，已经确认双方的收发能力，可以传输

## TCP是怎么实现可靠传输的

主要有下面几点:

1. **校验和**: 传输的过程将数据段都当成16位的整数，然后将这些整数相加，且不能丢弃进位，补在最后，最后取反得到校验和
2. **序列号**: TCP在传输的过程中对每个字节都进行了编号
3. **确认应答**: TCP传输过程中，每次接收方收到数据后，都会对**传输方**进行确认应答,也就是发出ACK包
4. **超时重传**:: 超时重传可以理解为发送方在发送完数据后等待一段时间，时间到达但没有接收到ACK报文，那么对刚才的数据进行重新发送
5. **连接管理**: 三次握手与四次挥手的过程，是为了保证可靠地连接，是保证可靠性的前提
6. **流量控制**: 接受方在处理数据时，如果发送方发送数据的速度太快，就会导致接收端的结束缓冲区很快就会占满，如果继续发送数据，那么接下来的数据都会丢包，进而进行丢包的一系列反应。这时滑动窗口就起到了作用，提前告知发送方自己的窗口大小，从而控制对方的发送速度
7. **拥塞控制**: **发送端在发送大量的数据时，可能会造成大面积的拥堵。拥堵的加剧就会导致大量的丢包，然后就会有大量的超时重传，严重影响传输**。所以TCP加入**慢启动**的概念，**首先在发送数据时，先发送少量的数据进行探路，摸清楚当前的网络状况，然后决定以多大速度进行传输**。然后就引入了拥塞窗口的概念，发送数据之前，**首先将拥塞窗口的大小和接收端反馈窗口对比，取最小的值作为实际发送的窗口大小**，另外拥塞窗口还可以**设置阈值**，慢启动会将阈值减为原来的一半。

## 什么是滑动窗口

滑动窗口协议是传输层进行流控的一种措施，接收方通过通告发送方自己的窗口大小，从而控制发送方的发送速度，从而达到防止发送方发送速度过快而导致自己被淹没的目的。TCP的滑动窗口解决了端到端的流量控制问题，允许接受方对传输进行限制，直到它拥有足够的缓冲空间来容纳更多的数据。

## HTTP协议的特点


- **灵活可扩展** 主要体现在两个方面。一个是语义上的自由，只规定了基本格式，比如空格分隔单词，换行分隔字段，其他的各个部分都没有严格的语法限制。另一个是传输形式的多样性，不仅仅可以传输文本，还能传输图片、视频等任意数据，非常方便。


- **可靠传输** HTTP 基于 TCP/IP，因此把这一特性继承了下来。这属于 TCP 的特性，不具体介绍了。


- **请求-应答** 也就是一发一收、有来有回， 当然这个请求方和应答方不单单指客户端和服务器之间，如果某台服务器作为代理来连接后端的服务端，那么这台服务器也会扮演请求方的角色。


- **无状态** 这里的状态是指通信过程的上下文信息，而每次 http 请求都是独立、无关的，默认不需要保留状态信息


## HTTP2.0 与 HTTP1.1 和 HTTP1.X的版本问题

HTTP2.0

- **HTTP2.0基本单位为二进制**，以往是采用文本形式，健壮性不是很好，现在采用二进制格式，更方便更健壮

- HTTP2.0的**多路复用**，把多个请求当做多个流，请求响应数据分成多个帧，不同流中的帧交错发送，解决了TCP连接数量多，TCP连接慢，所以对于同一个域名只用创建一个连接就可以了

- HTTP2.0**压缩消息头**，避免了重复请求头的传输，又减少了传输的大小

- HTTP2.0**服务端推送**，浏览器发送请求后，服务端会主动发送与这个请求相关的资源，之后浏览器就不用再次发送后续的请求了。

- HTTP2.0可以**设置请求优先级**，可以按照优先级来解决阻塞的问题

HTTP1.1

- 缓存处理新增etag、if-none-match之类的缓存头来控制缓存

- 长连接，可以在TCP连接上发送多个请求和响应

HTTP1.x版本问题

- 在传输数据过程中，所有内容都是明文，客户端和服务器端都**无法验证对方的身份，无法保证数据的安全性**。

- HTTP1.1 版本默认允许复用TCP连接，但是在同一个TCP连接里，所有数据通信是按次序进行的，服务器通常在处理完一个回应后，才会继续去处理下一个，这样子就会**造成队头阻塞**。

- http1.x 版本支持Keep-alive，用此方案来弥补创建多次连接产生的延迟，但是同样会给服务器带来压力，并且的话，**对于单文件被不断请求的服务**，Keep-alive会**极大影响性能**，因为它在文件被请求之后还保持了不必要的连接时长。

## HTTP状态码

2XX 成功

- 200 OK，表示从客户端发来的请求在服务器端被正确处理 ✨
- 201 Created 请求已经被实现，而且有一个新的资源已经依据请求的需要而建立
- 202 Accepted 请求已接受，但是还没执行，不保证完成请求
- 204 No content，表示请求成功，但响应报文不含实体的主体部分
- 206 Partial Content，进行范围请求 ✨

3XX 重定向

- 301 moved permanently，永久性重定向，表示资源已被分配了新的 URL
- 302 found，临时性重定向，表示资源临时被分配了新的 URL ✨
- 303 see other，表示资源存在着另一个 URL，应使用 GET 方法获取资源
- 304 not modified，表示服务器允许访问资源，但因发生请求未满足条件的情况
- 307 temporary redirect，临时重定向，和302含义相同

4XX 客户端错误

- 400 bad request，请求报文存在语法错误 ✨
- 401 unauthorized，表示发送的请求需要有通过 HTTP 认证的认证信息 ✨
- 403 forbidden，表示对请求资源的访问被服务器拒绝 ✨
- 404 not found，表示在服务器上没有找到请求的资源 ✨
- 408 Request timeout, 客户端请求超时
- 409 Confict, 请求的资源可能引起冲突

5XX 服务器错误

- 500 internal sever error，表示服务器端在执行请求时发生了错误 ✨
- 501 Not Implemented 请求超出服务器能力范围，例如服务器不支持当前请求所需要的某个功能，或者请求是服务器不支持的某个方法
- 503 service unavailable，表明服务器暂时处于超负载或正在停机维护，无法处理请求
- 505 http version not supported 服务器不支持，或者拒绝支持在请求中使用的 HTTP 版本

## DNS是如何工作的

DNS 协议提供的是一种主机名到 IP 地址的转换服务，就是我们常说的域名系统。是应用层协议，通常该协议运行在UDP协议之上，使用的是53端口号。

DNS在本地DNS服务器是如何查询的

![](https://image.yangxiansheng.top/img/20201204130726.png?imglist)


1. 输入 IP，此时电脑发送一个 DNS 请求到本地 DNS 服务器（一般是网络接入服务商提供 eg:电信，移动）
2. 本地 DNS 服务器会首先查询它的缓存记录，若有，则直接返回结果，若没有，本地 DNS 服务器还要向 DNS 根服务器进行查询；
3. DNS 根服务器没有记录具体域名和 IP 地址的对应关系，而是告诉本地 DNS 服务器，可到域服务器上继续查询，并给出域服务器地址
4. 本地服务器继续向域服务器发出请求，返回域名的解析服务器地址
5. 本地 DNS 向域名解析服务器发出请求，收到域名与 IP 地址对应关系
6. 本地 DNS 服务器将 IP 地址返回电脑，且保存副本到缓存已备下次查询。


## DNS 为什么使用 UDP 协议作为传输层协议？

**「DNS 使用 UDP 协议作为传输层协议的主要原因是为了避免使用 TCP 协议时造成的连接时延。」**

- **为了得到一个域名的 IP 地址，往往会向多个域名服务器查询，如果使用 TCP 协议，那么每次请求都会存在连接时延**，这样使 DNS 服务变得很慢。

- 大多数的地址查询请求，**都是浏览器请求页面时发出的，这样会造成网页的等待时间过长**。


## CDN 

![](https://image.yangxiansheng.top/img/20201205164409.png?imglist)

**CDN解决了什么问题?**

内容分发网络（CDN）是一组分布在多个不同地理位置的 Web 服务器。我们都知道，当服务器离用户越远时，延迟越高。**CDN 就是为了解决这一问题，在多个位置部署服务器，让用户离服务器更近，从而缩短请求时间**。

**CND原理**

当用户访问一个网站时，如果没有 CDN，过程是这样的：
![](https://image.yangxiansheng.top/img/20201213141337.png?imglist)

1. 浏览器要将域名解析为 IP 地址，所以需要向本地 DNS 发出请求。
2. 本地 DNS 依次向根服务器、顶级域名服务器、权限服务器发出请求，得到网站服务器的 IP 地址。
3. 本地 DNS 将 IP 地址发回给浏览器，浏览器向网站服务器 IP 地址发出请求并得到资源。

如果有 CND 加持
![](https://image.yangxiansheng.top/img/20201213141402.png?imglist)

1. 浏览器要将域名解析为 IP 地址，所以需要向本地 DNS 发出请求。

2. 本地 DNS 依次向根服务器、顶级域名服务器、权限服务器发出请求，得到**全局负载均衡系统（GSLB**的 IP 地址。

3. 本地 DNS 再向 GSLB 发出请求，**GSLB 的主要功能是根据本地 DNS 的 IP 地址判断用户的位置，筛选出距离用户较近的本地负载均衡系统（SLB），并将该 SLB 的 IP 地址作为结果返回给本地 DNS**。

4. 本地 DNS 将 SLB 的 IP 地址发回给浏览器，浏览器向 SLB 发出请求。

5. SLB 根据浏览器请求的资源和地址，选出最优的缓存服务器发回给浏览器。

6. 浏览器再根据 SLB 发回的地址**重定向到缓存服务器**。

7. 如果缓存服务器有浏览器需要的资源，就将资源发回给浏览器。如果没有，就向源服务器请求资源，再发给浏览器并缓存在本地。



## Keep-alive

当使用 Keep-Alive 模式（又称持久连接、连接重用）时，Keep-Alive功能使客户端到服务器端的连接持续有效，挡再次向服务器发送请求时，Keep-Alive功能避免了重新建立tcp连接。htttp1.0需要在头部加入 `Connection:Keep`,http1.1自带

为什么要使用keep-alive

keep-alive技术的创建目的，能在多次HTTP请求之前重用同一个TCP连接，从而减少创建/关闭多个 TCP 连接的开销（包括响应时间、CPU 资源、减少拥堵等）

## 是否每一次请求都会三次握手

如果没有缓存的情况下，请求头设置 `connection:keep-alive` 则可以不重新握手

## TCP的keepAlive和HTTP的keep-alive的区别

- TCP的keepAlive是侧重于保持客户端和服务端的连接，会不定时发送心跳包验证有没有断开连接，如果没有这个机制的话，一方断开，另一方不知道，就会对服务器资源产生较大的影响


- HTTP的keep-alive可以让服务器客户端保持这个连接，不需要重新创建tcp连接



## HTTP的缓存过程

浏览器缓存分为：强缓存和协商缓存

在浏览器第一次发起请求时，本地无缓存，向 web 服务器发送请求，服务器起端响应请求，浏览器端缓存。在第一次请求时，服务器会将页面最后修改时间通过 Last-Modified 标识由服务器发送给客户端，客户端记录修改时间；另外服务器还会生成一个 Etag，并发送给客户端。

浏览器在第一次请求发生后，再次发送请求时：

- 浏览器请求某一资源时，会先获取该资源缓存的 header 信息，然后根据 header 中的 Cache-Control 和 Expires 来判断是否过期。若没过期则直接从缓存中获取资源信息，包括缓存的 header 的信息，所以此次请求不会与服务器进行通信。这里判断是否过期，则是和强缓存相关。
- 如果显示已过期，浏览器会向服务器端发送请求，这个请求会携带第一次请求返回的有关缓存的 header 字段信息，比如客户端会通过 If-None-Match 头将先前服务器端发送过来的 Etag 发送给服务器，服务器会对比这个客户端发过来的 Etag 是否与服务器的相同，若相同，就将 If-None-Match 的值设为 false，返回状态 304，客户端继续使用本地缓存，不解析服务器端发回来的数据，若不相同就将 If-None-Match 的值设为 true，返回状态为 200，服务端重新返回数据；客户端还会通过 If-Modified-Since 头将先前服务端发过来的最后修改时间戳发送给服务器，服务器端通过这个时间戳判断客户端的页面是否是最新的，如果不是最新的，则返回最新的内容，如果是最新的，则返回 304，客户端继续使用本地缓存。

## 什么时候会触发强缓存和协商缓存

### 强缓存

强缓存离不开两个响应头 `Expires` 与 `Cache-Control`

**Expires**：`Expires` 是http1.0提出的一个表示资源过期时间的 `header`，它描述的是一个绝对时间，由服务器返回，Expires 受限于本地时间，如果修改了本地时间，可能会造成缓存失效

`Expires: Wed, 11 May 2018 07:20:00 GMT`

**Cache-Control**: `Cache-Control` 出现于 HTTP / 1.1，优先级高于 `Expires` ,表示的是相对时间


目前主流的做法使用Cache-Control控制缓存，当Expires和Cache-Control同时存在时，优先考虑Cache-Control，当缓存资源失效了，也就是没有命中强缓存，接下来就进入协商缓存

### 协商缓存


强缓存失效后，浏览器在请求头中携带响应的 `缓存Tag` 来向服务器发送请求，服务器根据对应的 `tag`，来决定是否使用缓存。

缓存分为两种，「Last-Modified」 和 「ETag」

**Last-Modified**

浏览器接收到后，「如果再次请求」，会在请求头中携带If-Modified-Since字段，这个字段的值也就是服务器传来的最后修改时间。

- 如果请求头中的这个值小于最后修改时间，说明是时候更新了。返回新的资源，跟常规的HTTP请求响应的流程一样。

- 否则返回304，告诉浏览器直接使用缓存

**ETag**

ETag 是服务器根据当前文件的内容，对文件生成唯一的标识,这个值就会修改，服务器通过把响应头把该字段作为「If-None-Match」这个字段的内容给浏览器。

服务器接收到「If-None-Match」后，会跟服务器上该资源的「ETag」进行比对

- 如果两者一样的话，直接返回304，告诉浏览器直接使用缓存

- 如果不一样的话，说明内容更新了，返回新的资源，跟常规的HTTP请求响应的流程一样

## 缓存的几种场景(cache-Control有哪些字段)

对于大部分的场景都可以使用强缓存配合协商缓存来解决，但是在一些特殊情况下，可能需要选择特殊的缓存策略

- **对于某些不需要缓存的资源**，可以使用Cache-Control: no-store来表示该资源不需要缓存
- **对于频繁变动的资源**，可以使用Cache-Control: no-cache并且配合Etag使用，表示该资源已被缓存，但是每次都会发送请求询问资源是否更新
- **对于代码文件来说**，通常使用Cache-Control: max-age=31536000并且配合策略缓存使用，然后对文件进行指纹处理，一旦文件名变动就会立即下载新的文件



## HTTP请求方法

- GET: 通常用来获取资源
- HEAD: 获取资源的元信息
- POST: 提交数据，即上传数据
- PUT: 修改数据
- DELETE: 删除资源(几乎用不到)
- CONNECT: 建立连接隧道，用于代理服务器
- OPTIONS: 列出可对资源实行的请求方法，用来跨域请求
- TRACE: 追踪请求-响应的传输路径

## 五层网络协议和OSI模型

![](https://image.yangxiansheng.top/img/20201214152118.png?imglist)

- 物理层：把通信主机连接起来的物理手段，比如双绞线、同轴电缆、光纤等。作用是来传输1010…的的电信号，数据单位是比特。
- 数据链路层：简称链路层。主机间传输数据，总是一段一段在链路上传送的。链路层负责使用链路层协议将网络层传输下来的 IP 数据组装成数据帧，并在链路上传输。
- 网络层：网络层使用 IP 协议为各主机之间提供通信服务。它会把运输层提供的报文分段/用户数据报包装成分组（包/IP数据报）进行传输。网络层还有一个重要的功能：选择合适的路由，以便源主机的数据能通过路由传输到目的主机。我们常说的路由器就是工作在这一层。
- 运输层：运输层负责为两个主机进程之间的通信提供数据传输服务，应用进程利用该服务来传输应用层报文。传输层主要使用的是 TCP 协议（传输单位是报文段）、UDP 协议（传输单位是用户数据报）。
- 应用层：直接为用户的应用进程（运行的程序）提供服务。

协议归属

```md
应用层：TFTP，HTTP，SNMP，FTP，SMTP，DNS，Telnet
传输层：TCP，UDP
网络层：IP，ICMP，RIP，OSPF，BGP，IGMP
数据链路层：SLIP，CSLIP，PPP，ARP，RARP，MTU
物理层
```

**应用层的协议哪些是基于TCP协议的，哪些是基于UDP协议的**

- 基于TCP协议的
  - FTP（文件传输协议）
  - TELNET（远程登陆协议）
  - SMTP（简单邮件传输协议）
  - POP3（邮件读取协议）
  - HTTP（超文本传输协议）
  - HTTPS（超文本传输安全协议）

- 基于UDP协议的
  - TFTP（简单文件传输协议）
  - SNMP（简单网络管理协议）
  - BOOTP（引导程序协议，DHCP的前身）
  - DHCP（动态主机配置协议）
  - RIP（路由信息协议）
  - IGMP（Internet组管理协议）

- 基于TCP和UDP协议的
  - DNS（域名系统）：DNS区域传输的时候使用TCP协议。域名解析时使用UDP协议。DNS用的是53号端口。
  - ECHO（回绕协议）

## 聊一聊HTTP的部首(请求头)有哪些？

- 通用首部字段（General Header Fields）：请求报文和响应报文两方都会使用的首部
  - Cache-Control  控制缓存 ✨
  - Connection 连接管理、逐条首部 ✨
  - Transfor-Encoding 报文主体的传输编码格式 ✨

- 请求首部字段（Reauest Header Fields）:客户端向服务器发送请求的报文时使用的首部
  - Accept 客户端或者代理能够处理的媒体类型 ✨
  - If-Match 比较实体标记（ETage） ✨
  - If-None-Match 比较实体标记（ETage）与 If-Match相反 ✨
  - If-Modified-Since 比较资源更新时间（Last-Modified）✨
  - If-Unmodified-Since比较资源更新时间（Last-Modified），与 - If-Modified-Since相反 ✨
  - Range 实体的字节范围请求 ✨
  - Authorization web的认证信息 ✨
  - Host 请求资源所在服务器 ✨
  - User-Agent 客户端程序信息 ✨ 

- 响应首部字段（Response Header Fields）:从服务器向客户端响应时使用的字段
  - Location 令客户端重定向的URI ✨
  - ETag 能够表示资源唯一资源的字符串 ✨
  - Server 服务器的信息 ✨

- 实体首部字段（Entiy Header Fields）:针对请求报文和响应报文的实体部分使用首部
  - Allow 资源可支持http请求的方法 ✨
  - Last-Modified 资源最后的修改资源 ✨
  - Expires 实体主体的过期资源 ✨

## options 方法有什么用？

- OPTIONS 请求与 HEAD 类似，一般也是用于客户端查看服务器的性能。

- 这个方法会请求服务器返回该资源所支持的所有 HTTP 请求方法，该方法会用'*'来代替资源名称，向服务器发送 OPTIONS 请求，可以测试服务器功能是否正常。

- JS 的 XMLHttpRequest对象进行 CORS 跨域资源共享时，对于复杂请求，就是使用 OPTIONS 方法发送嗅探请求，以判断是否有对指定资源的访问权限。


## 谈一谈你对URL理解

**统一资源定位符**的简称，Uniform Resource Locator，常常被称为网址，是因特网上标准的资源地址。

**通用的格式**：

scheme://host[:port]/path/…/?query#anchor

> 协议 + IP地址/域名 + 端口 + 路径 + 参数 + 锚点


## 什么是队头阻塞？

对于每一个HTTP请求而言，这些任务是会被**放入一个任务队列中串行执行**的，一旦队首任务请求太慢时，就会阻塞后面的请求处理，这就是HTTP队头阻塞问题。

**解决办法:**

- 并发连接: 对每个域名分配长连接，那么可以理解成增加了任务队列，也就是说不会导致一个任务阻塞了该任务队列的其他任务

- 域名分片: 多个域名指向同一个服务器


## 介绍一下HTTPS和HTTP区别

- HTTP 是明文传输协议，HTTPS 协议是由 SSL+HTTP 协议构建的可进行加密传输、身份认证的网络协议，比 HTTP 协议安全。

- HTTPS 比 HTTP 更加安全，对搜索引擎更友好，利于 SEO,谷歌、百度优先索引HTTPS网页。

- HTTPS标准端口443，HTTP标准端口80。

- HTTPS需要用到SSL证书，而HTTP不用。


## HTTPS 加密过程(对称加密和非对称加密的区别)

对称加密: 即通信的双方都使用同一个秘钥进行加解密，比如特务接头的暗号，就属于对称加密，但是首次发送秘钥容易被截胡

非对称加密: 

1. 私钥加公钥 = 密钥对
2. 私钥加密的数据只有对应的公钥才能解密，公钥加密的数据只有私钥才能解密
3. 通信双方手里都有一套私钥对，**通信之前都会将公钥传给对方**
4. 对方拿到这个**公钥加密数据**响应给对方，然后接收方通过**私钥解密**拿到数据即可

**HTTPS加密过程**: HTTPS就是使用SSL/TLS协议进行加密传输，是结合两种加密方式，将对称加密的秘钥通过公钥加密，然后接收方使用私钥解密获取对称加密的秘钥，进而使用对称加密进行沟通数据。

**中间人和CA证书**: 但是这样就会有中间人产生，如果有人更换了公钥，这样数据就会很容易被解密，所以引入 CA证书 证明身份防止中间人攻击。

**数字签名**:  中间人篡改证书怎么办，这个时候数字签名就起了作用。数字签名是 CA 自带的哈希算法（Sha256, Sha384）对证书内容进行哈希得到的摘要。然后和解密出来的那份摘要进行对比，如果内容完整，则说明没有被篡改。

**握手全过程**

1. 客户端使用 HTTPS URL 访问服务器，要求 web 服务器建立 SSL 链接。
2. web 服务器接收到客户端的请求之后，会将网站的证书（证书中包含了公钥），返回给客户端。
3. 客户端和 web 服务器端开始协商 SSL 链接的安全等级，也就是加密等级。
4. 客户端浏览器通过双方协商一致的安全等级，建立会话密钥，然后通过网站的公钥来加密会话密钥(对称加密的秘钥)，并传送给网站。
5. web 服务器通过自己的私钥解密出会话密钥。
6. web 服务器通过会话密钥加密与客户端之间进行通信


## 进程与线程的区别

1. 线程是程序执行的最小单位，而进程是操作系统分配资源的最小单位。
2. 一个进程由一个或多个线程组成，线程是一个进程中代码的不同执行路线。
3. 进程之间相互独立，但同一进程下的各个线程之间共享程序的内存空间。
4. 调度和切换：线程上下文切换比进程上下文切换要快得多

**加分项：Chrome为什么从单进程转成多进程架构**

背景：使用浏览器时偶然发现虽然仅仅打开一个标签页，但是在任务管理器内发现有多个浏览器进程在运行，占用了不小的内存

首先早期的浏览器都是单进程的，浏览器的主要组成部分有，浏览器引擎，呈现引擎，用户界面后端，网络，jascript解析器等模块，多个模块放在一个进程下可能会导致以下问题

1. **不稳定**
根据操作系统知识，一个进程下的多个线程只要有一个线程发生错误，整个进程就会崩溃。可想而知，如果浏览器是单进程的话，随便哪个**插件**还是哪个模块崩溃，会导致整个浏览器都无法正常运行，这样是很危险的，除此之外**渲染引擎**也是如此
2. **相应慢**
单进程浏览器，所有页面都会在一个线程渲染，如果碰到某个页面存在无限渲染脚本，就会导致其他页面无法显示，变卡顿


## 进程通信方式


- **管道**( pipe )：管道是一种半双工的通信方式，数据只能单向流动，而且只能在具有亲缘关系的进程间使用。

- **有名管道** (named pipe) ： 有名管道也是半双工的通信方式，但是它允许无亲缘关系进程间的通信。

- **信号量**( semophore ) ： 信号量是一个计数器，可以用来控制多个进程对共享资源的访问。它常作为一种锁机制，防止某进程正在访问共享资源时，其他进程也访问该资源。因此，主要作为进程间以及同一进程内不同线程之间的同步手段。

- **消息队列**( message queue ) ： 消息队列是由消息的链表，存放在内核中并由消息队列标识符标识。消息队列克服了信号传递信息少、管道只能承载无格式字节流以及缓冲区大小受限等缺点。

- **信号** ( sinal ) ： 信号是一种比较复杂的通信方式，用于通知接收进程某个事件已经发生。

- **共享内存**( shared memory ) ：共享内存就是映射一段能被其他进程所访问的内存，这段共享内存由一个进程创建，但多个进程都可以访问。共享内存是最快的 IPC 方式，它是针对其他进程间通信方式运行效率低而专门设计的。它往往与其他通信机制，如信号两，配合使用，来实现进程间的同步和通信。

- **套接字**(socket) ： socket也是一种进程间通信机制，与其他通信机制不同的是，它可用于不同及其间进程通信。


## 说一下什么是死锁

死锁是指**两个或两个以上的进程在执行过程中**，由于竞争资源或者由于彼此通信而造成的一种阻塞的现象，若无外力作用，它们都将无法推进下去。

**解决办法**:

1. **加锁顺序**:确保所有的线程都是按照相同的顺序获得锁
2. **加锁时限**:在尝试获取锁的过程中若超过了这个时限该线程则放弃对该锁请求
3. **死锁检测**:检测出来就释放所有的锁，回退，并且等待一段随机的时间后重试
