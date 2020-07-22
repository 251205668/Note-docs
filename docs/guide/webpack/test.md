# webpack 4.0 学习

![20200722154349](https://raw.githubusercontent.com/imageList/imglist/master/20200722154349.png)

`webpack`简单来说就是一个模块打包工具,他可以支持不光是`ES module`模块翻译,还可以支持多种形式的模块打包。

## 安装并入门使用 webpack

首先在文件夹下用`npm`初始化,然后执行命令

> 不建议全局安装 webpack,可能会因为版本原因导致项目运行不起来

```bash
# webpack脚手架
$ cnpm install webpack-cli --save-dev
# webpack
$ cnpm install webpack --save
```

:::tip
可以指定`webpack`版本号进行安装脚手架

```bash
$ npm install webpack@4.43.0 webpack-cli -D
```

:::

然后找到使用到模块化主入口文件,例如我这里的`index.js`

```js
import P from './p'
new P()
```

之后执行打包命令

```bash
$ npx webpack index.js
```

打包完成之后会自动在项目根目录生成一个`dist`文件夹,里面包含`main.js`就是打包翻译后的文件。

## 模块化的概念,有哪些 webpack 模块

开发者将程序分解成`离散功能块`(discrete chunks of functionality)，并称之为模块。

每个模块具有比完整程序**更小的接触面**，使得`校验`、`调试`、`测试`轻而易举。 精心编写的模块提供了可靠的抽象和封装界限，使得应用程序中每个模块都具有`条理清楚的设计`和`明确的目的`。

`webpack模块`包含以下:

- `ES2015 import` 语句
- `CommonJS require()` 语句
- `AMD define` 和 require 语句
- `css/sass/less` 文件中的 `@import` 语句。
- 样式(`url(...)`)或 HTML 文件(`<img src=...>`)中的图片链接(image url)

## webpack 配置文件和打包方式

`webpack`默认寻找的配置文件是`webpack.config.js`,如果需要更换配置文件,需要运行命令

```bash
$ npx webpack --config fileName.js
```

**基础配置**

```js
module.exports = {
  // 入口文件,这里是简写，entry:{main:'./src/index.js'}
  entry: './src/index.js',
  // 打包配置
  output: {
    filename: 'bundle.js',
    // 打包文件路径 当前配置文件根目录下的dist文件夹
    path: path.resolve(__dirname, 'dist'),
  },
}
```

最终打包效果:

![20200722170005](https://raw.githubusercontent.com/imageList/imglist/master/20200722170005.png)

**运行`webpack`打包有几种方式**

前提条件需要安装`webpack-cli`,他的作用是识别`webpack`命令。

- 使用全局打包,前提条件是全局环境安装了`webpack-cli`

```bash
$ cnpm  install webpack -g
$ webpack index.js
```

- 局部打包

```bash
$ npx webapck index.js
```

- 配置`package.json`的`script`脚本进行打包

**打包输出结果分析**

![20200722170654](https://raw.githubusercontent.com/imageList/imglist/master/20200722170654.png)

- Hash: 代表本次打包的唯一 hash
- Version: 本次打包的 webpack 版本号
- Time: 打包时间
- Asset: 打包生成文件，Size:文件大小,Chunks: 打包文件中可能是多个文件相互依赖的,其他文件打包也会把`JS文件对应的id值`放到`Chunks`下面,Chunk Names: 对应的名字。

这里的警告输出是因为没有指定模式,默认的`mode`配置是`production`,默认是压缩的。还可以设置开发环境模式(development)、

## Webpack 核心

### Loader 和简单使用

有的时候需要打包的文件不一定只是`js`文件,可能是图片还可能是`vue`或者`jsx`等等文件。这个时候`webpack`默认是不支持打包的,`loader`就可以帮组快速打包这些非 js 文件。

**`loader`作用**: 允许你打包除 `JavaScript` 之外的任何静态资源。首先将文件移动到打包路径,然后返回名称。

**使用`loader`步骤**: 1.定义`module`,配置规则 2.配置匹配规则和指定使用哪一个`loader` 3. 在`use`里面配置`loader配置项`

**简单的使用`file-loader`打包图片**

首先在入口文件中引入图片,然后安装一下`file-loader`

```js
import avatar from './avatar.jpg'
```

然后需要在配置文件中配置打包规则

```js
module.exports = {
  ...

  // 模块打包规则
  module:{
    rules:[
      {
        // 匹配规则
        test:/\.(jpg|png|gif)$/,
        // 使用到的loader
        use:{
          loader:'file-loader'
        }
      }
    ]
  }
}
```

接下来运行`webpack`打包命令即可

![20200722175133](https://raw.githubusercontent.com/imageList/imglist/master/20200722175133.png)

### 打包图片


1. 使用`file-loader`打包图片到指定目录

```js
module.exports = {
  mode:'production',
  extry:{
    main:'./src/index.js'
  },
  module:{
    rules:[
      {
        test:/\.(jpg|png|gif)$/,
        use:{
          loader:'file-loader',
          // 打包到 dist/images下
          options:{
            name:'[name].[etc]',
            outputPath:'images/'
          }
        }
      }
    ]
  },
  output:{
    filename:'bundle.js',
    path:path.resolve(__dirname,'dist')
  }
}
```

2. 使用`url-loader`打包

设置`limit:size`这个属性后,当文件超过这个大小,文件就会按照配置的规则进行打包输出到指定文件,如果没有超过,图片就会以 `base64` 格式保存在打包文件中,这样就有一个缺点,文件会越撑越大。

```js
module.exports = {
  ...
  module:{
    rules:[
      {
        test:/\.(png|jpg|gif)$/,
        use:{
          loader:'url-loader',
          options:{
              name:'[name].[etc]',
              outputPath:'images/',
              // 配置大小限制,超过则按此规则打包
              limit:20480
          }

        }
      }
    ]
  }
}
```

### 打包样式文件

打包`css`文件的原理是先通过 `css-loader` 打包`css`文件到指定目录,然后通过 `style-loader` 将样式挂载到`header`。其他的模块化的`sass`、`less`、`stylus`则需要先转译成`css`文件然后同样的挂载。

1. 打包普通`css`文件

```js
module.exports = {
  ...
  module:{
    rules:[{
      test:/\.css$/,
      // loader执行顺序是从下到上 从右到左
      use:['style-loader','css-loader']
    }]
  }
}
```
打包后`css`先通过loader打包成css代码,然后挂载到header上

2. 打包`Sass`文件,并且配置浏览器兼容性前缀

打包`Sass`文件需要使用到的`loader`为: `Sass-loader`,首先先安装

```bash
$ npm install sass-loader node-sass  --save-dev
```

然后开始配置浏览器的兼容性前缀(例如:`-webkit-transform: translate(100px,100px)`),这里需要使用到**postcss-loader**，然后配合**autoprefixer**插件自动在生成`css`文件时加上前缀。

```bash
$ npm i -D postcss-loader
$ npm i -D autoprefixer
```
安装之后创建`postcss.config.js`

```js
module.exports = {
  plugins:[
    require('autoprefixer')
  ]
}
```
最后就是配置`webpack.config.js`了

```js
... 
module:{
    rules:[{
      test:/\.css$/,
      // loader执行顺序是从下到上 从右到左
      use:['style-loader','css-loader','sass-loader','postcss-loader']
    }]
  }
```



