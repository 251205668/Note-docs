## docker入门:blue_car:

前端需要掌握的一些 docker 入门命令

### [安装并配置国内镜像](https://segmentfault.com/a/1190000017578678)

### 常用命令上手

```bash
docker ps  查看进程
docker ps -a 查看所有进程
systemctl restart docker  重启服务
docker stop 服务名 停止服务
```

**使用 docker-compose 集合命令起多个服务**

安装步骤

```bash
#下载：
curl -L https://get.daocloud.io/docker/compose/releases/download/1.16.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

#权限：
chmod a+x /usr/local/bin/docker-compose

#查看版本：
docker-compose --version
```

创建 docker-compose.yml

```yml
version: '3'
services: 
  mysql1:
    image: mysql
    environment: 
    - MYSQL_ROOT_PASSWORD=123456
    ports:
    - 8271:3306
 
    mysql2:
    image: mysql
    environment: 
    - MYSQL_ROOT_PASSWORD=123456
    ports:
    - 8272:3306
    
 
 version: '3.1'

services:

  mongo:
    image: mongo
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example

  mongo-express:
    image: mongo-express
    restart: always
    ports:
      - 8081:8081
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: example

```

运行服务

```bash
docker-compose up -d
```



### 实操

#### 网关常用命令

```bash
# ps -ef
查看当前所有进程

# kill -9 Pid 
杀死某个进程 

# 查看端口号情况  不加后面的查看所有的端口号
netstat -ano |findstr 8080

# 杀死进程  
taskkill -PID 进程号 -F 
  
# 连接远程服务器
ssh root@47.97.180.232
```



#### mysql

```bash
docker run --name root -e MYSQL_ROOT_PASSWORD=123456 -p 8270:3306 -d mysql  拉取mysql docker镜像并且开启服务 将端口号映射到8270端口

# 创建持久化sql服务
docker run --restart=always --name root -e MYSQL_ROOT_PASSWORD=123456 -p 8270:3306 -d mysql

docker ps 查看进程
docker stop root 停止root mysql服务
docker rm root 销毁mysql服务
docker logs -f root  查看服务具体日志
```

#### mongo

```bash
sudo docker run --restart=always -p 27017:27017 -v /tmp/db:/data/db -d mongo
```

#### redis

```bash
# 创建持久化redis服务
docker run -itd --restart=always --name redis-test -p 8271:6379 -v/home/redistest1:/data redis redis-server --requirepass 123456
```

#### Springboot

```bash
# 区分生产环境和线上环境 运行springboot
java -jar 生成的jar包 --spring.profiles.active=prod

# 后台运行
nohub java -jar 生成的jar包 --spring.profiles.active=prod

#运行日志文件输出
nohup java -jar imissyou-0.0.1-SNAPSHOT.jar >temp.txt &

nohup java -jar imissyou-0.0.1-SNAPSHOT.jar >log.log 2>&1 &
```



## Nginx基础:biking_woman:

### 反向代理

```conf
server
{
    listen 80;
    server_name yuba.yangxiansheng.top;
# 核心步骤
     location / {
                proxy_pass https://yuba.douyu.com;
                 add_header Access-Control-Allow-Origin *;
        }
    
    #禁止访问的文件或目录
    location ~ ^/(\.user.ini|\.htaccess|\.git|\.svn|\.project|LICENSE|README.md)
    {
        return 404;
    }
    
    #一键申请SSL证书验证目录相关设置
    location ~ \.well-known{
        allow all;
    }
    
    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
    {
        expires      30d;
        error_log off;
        access_log /dev/null;
    }
    
    location ~ .*\.(js|css)?$
    {
        expires      12h;
        error_log off;
        access_log /dev/null; 
    }
    access_log  /www/wwwlogs/ceshi.yangxiansheng.top.log;
    error_log  /www/wwwlogs/ceshi.yangxiansheng.top.error.log;
}
```



### 设置Https服务

快捷方式-宝塔一键设置 https 服务

```conf
# 网易api
server {
		listen 80;
		listen      443 ssl;
    server_name neteasemusic.yangxiansheng.top;

    client_max_body_size    100m;
    ssl_certificate         /www/node/cert/api.netmusic.pem;
    ssl_certificate_key     /www/node/cert/api.netmusic.key;

    location  / {
        proxy_pass http://localhost:8222;
        proxy_set_header Host "neteasemusic.yangxiansheng.top";
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```



