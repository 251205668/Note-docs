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

**配置 entry 和 output**

如果需要打包多个文件,只需要设置`entry`对象即可

```js
entry:{
  main: './src/index.js',
  sub: './src/index.js'
}
```

最终生成的打包文件还配置一下`output`,否则会冲突

```js
output:{
  filename:'[name].js',
  path:path.resolve(__dirname,'dist')
}
```

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
  mode: 'production',
  extry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'file-loader',
          // 打包到 dist/images下
          options: {
            name: '[name].[etc]',
            outputPath: 'images/',
          },
        },
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
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

1. **打包普通`css`文件**

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

打包后`css`先通过 loader 打包成 css 代码,然后挂载到 header 上

2. **打包`Sass`文件,并且配置浏览器兼容性前缀**

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
  plugins: [require('autoprefixer')],
}
```

最后就是配置`webpack.config.js`了

```js
...
module:{
    rules:[{
      test:/\.scss$/,
      // loader执行顺序是从下到上 从右到左
      use:['style-loader','css-loader','sass-loader','postcss-loader']
    }]
  }
```

改进打包 Scss 文件中的`css-loader`,这里设置`module:true`的作用是避免耦合性,(style.avatar) 打包成`模块化的css`,如果直接引入的话,页面上的其他`js`模块也使用到了该样式会造成污染。`importLoaders:2`保证`sass`文件里面引入的`sass`文件也能正常打包。

```js
module.exports = {
  ...
  module:{
    rules:[
      {
        test:/\.scss$/,
        use:[
          'style-loader',
          {
            loader:'css-loader',
            options:{
              module:true,//开启css模块化,
              importLoaders:2 //保证前两个loader一定执行
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  }
}
```

3. **打包图标字体文件**

配置选项:

```js
module.exports = {
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.(evt|svg|ttf)$/,
        use: 'file-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'scss-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
```

然后直接在页面上正常引入字体文件`class`即可显示图片

### Webpack 常用插件使用

插件是帮助我们在`webpack`打包的节点上做事情的,类似于生命周期钩子。

- [html-webpack-plugin](https://www.webpackjs.com/plugins/html-webpack-plugin/) 帮助在打包过程中自动生成一个`html`文件,并且将打包生成的`js`填入

- [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin) 帮助在打包之前删除之前打包的文件夹

使用案例:

```js
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  ...
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // 指定html模板
      template:'src/index.html'
    })
  ]
}
```

打包后效果:

![20200723160824](https://raw.githubusercontent.com/imageList/imglist/master/20200723160824.png)

### 其他(重要配置插件)

**开启 source-map 模式**

`source-map`的作用一个映射关系。比如源代码的第二行出错,普通情况下打包后在控制台报的错误是打包后的文件中报错代码行,很难去排查源代码错误,这个时候`source-map`就起作用了,通过配置`source-map`就可以将打包文件映射到源代码,实现监听源代码的效果。

开启`source-map`很简单,只需要将`devtool`设置为`source-map`

```js
module.exports = {
  entry:{
    main:'./src/index.js'
  },
  // none则代表关闭
  devtool:'source-map'
  ...
}

```

**使用 webpack-dev-server**

如果使用`webpack --watch`这个命令去监听`打包更新`的话不是很好,首先每次都需要手动打开入口`html文件`,而且打开的协议都是`file协议`不能支持`ajax请求`,所以这个时候需要配置`devServer`去开启一个服务,监听更新。

[官网配置](https://www.webpackjs.com/configuration/dev-server/)

```bash
$ cnpm i webpack-dev-server -D
```

```js
module.exports = {
  devServer: {
    // 提供bundle的目录
    contentBase: './dist',
    port: 8080,
    open: true,
    // 配置跨域
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
}
```

**热模块更新** :apple:

在`webpack`中开启热模块更新,首先需要引入`webpack`,然后配置`devServer`，之后需要使用到`HotModuleReplacement`进行热更新模块加载

```js
const webpack = require('webpack')
module.exports = {
  devServer: {
    port: 8080,
    contentBase: './dist',
    // 开启热更新
    hot: true,
    // 每次更新,浏览器不会重复刷新
    hotOnly: true,
  },
  plugins: [new webpack.HotModuleReplcaement()],
}
```

例子: 当你只需要改变一个模块代码时,不想影响另一个模块的代码,并且不希望浏览器自动刷新，这时就需要配置`HotModuleReplcaement`

::: tip
`css`模块的更新就不需要这样处理,因为他们的`loader`内置了对模块的监控更新操作
:::

index.js

```js
import './number'
import './test'

// 我只希望更新test,然后监听test模块更新去执行新的业务逻辑
```

首先配置热模块更新

```js
const webpack = require('webpack')
module.exports = {
  devServer:{
    port:8080,
    contentBase:'./dist',
    hot:true,
    hotOnly:true,
    open:true
  },
  ...
  plugins:[
    new webpack.HotModuleReplacement()
  ]
}
```

然后配置完成之后在`index.js`上挂上一个钩子监听

```js
if(module.hot){
  // 监听模块更新触发钩子函数 第一个参数是指定模块的路径 第二个是func
  module.hot.accept('./number',()=>{
    ...
  })
}
```

热更新的原理(**重点**):

**使用 Babel 处理 ES6**

首先需要安装`babel-loader`搭建`babel`和`webpack`之间的桥梁,然后配置`babel-presset`进行语法翻译，追后需要使用`babel-polyfill`进行低版本兼容性处理

首先安装相关包 @babel-

```bash
npm install --save-dev babel-loader @babel/core  @babel/preset-env @babel-polyfill
```

```js
module.exports = {
  ...
  module:{
    rules:[
      {
        test: /\.js$/,
        // 配置不需要使用babel转译的路径
        exclude: /node_modules/,
        loader: "babel-loader",
        options:{
          // 翻译规则 然后按需加载polyfill
          presets: [['@babel/preset-env',{
            useBuiltIns:'usage'
          }]]
        }

      }
    ]
  }
}

```
然后需要在入口文件中引入`@babel/polyfill`即可实现`ES6`转为`ES5`

Babel 原理(**重点**):

**TreeShaking**
