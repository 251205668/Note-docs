module.exports = {
  title: '前端面试知识总结',
  description: '自家使用,暂不外传',
  bashL:'/blog/',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: `/favicon.ico`
      }
    ]
  ],
  markdown: {
    // markdown-it-toc 的选项
    toc: { includeLevel: [1, 2,3,4] },
  },
  dest: './docs/.vuepress/dist',
  evergreen: true,
  // 配置导航
  themeConfig: {
        editLinkText: '在github上编辑此页',
        nav: [
          {
            text: '首页',
            link: '/'
          },
          {
            text: '指南',
            link: '/guide/'
          },
          {
            text:'博客点滴',
            link:'/blog/pratice/'
          },
          {
            text: '项目',
            items:[
              {
                text:"大型电商",
                link:"/project/shop/"
              },
              {
                text:"vue实现音乐app",
                link:"/project/music/"
              }
            ]
          }
        ],
        lastUpdated: 'Last update',
        sidebarDepth: 3,
        sidebar: {
          '/guide/': getGuideSidebar(
            '目录',
            'JS',
            'CSS',
            '框架',
            '小程序',
            '算法',
            "前端工程化",
            "性能优化",
            "浏览器",
            '网络',
            "安全",
            '软技能',
          ),
          '/project/shop/': getPShopSlideBar(
            '介绍',
            'SPU、SKU',
            '封装请求',
            '购物车',
            '优惠券',
            "订单",
            "其他技巧"
          ),
          '/blog/pratice/':getBlogSlideBar('实习点滴'),
          '/project/music/': getMusicSlideBar(
            'Music Webapp',
          )
      }
    },
    repo: '251205668',
    repoLabel: 'Github',
    docsRepo: '251205668/Note-docs',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
  plugins: [
    ['@vuepress/back-to-top', true],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true
      }
    ]
  ]
}
function getGuideSidebar(group,groupA, groupB, groupC,groupD,groupE,groupF,groupG,groupH,groupI,groupJ,groupK) {
  return [
    {
      title: group,
      collapsable: false,
      children: [
        ''
      ]
    },
    {
      title: groupA,
      collapsable: false,
      children: [
        "/guide/interview/JS/执行上下文-作用域-闭包.md",
        "/guide/interview/JS/类型转换.md",
        "/guide/interview/JS/原型和原型链.md",
        "/guide/interview/JS/this-call-bind-apply.md",
        "/guide/interview/JS/深浅拷贝.md",
        "/guide/interview/JS/dom.md",
        "/guide/interview/JS/事件循环机制.md",
        "/guide/interview/JS/Promise.md",
        "/guide/interview/JS/ES6.md",
        "/guide/interview/JS/正则表达式.md",
        "/guide/js/base.md",
        "/guide/interview/JS/JS高级工程师要会的手写题汇总.md",
        "/guide/interview/JS/经典面试题.md",
        "/guide/interview/JS/字节面试题收集.md",
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        "/guide/interview/CSS/常见属性.md",
        "/guide/interview/CSS/常见布局问题.md",
        "/guide/interview/CSS/移动端问题.md",
        "/guide/interview/CSS/常见面试题.md",
      ]
    },
    {
      title: groupC,
      collapsable: false,
      children: [
        "/guide/interview/框架/Vue/Vue-router.md",
        "/guide/interview/框架/Vue/常用面试题.md",
      ]
    },
    {
      title: groupD,
      collapsable: false,
      children: [ "/guide/interview/小程序/常用面试题.md",]
    },
    {
      title: groupE,
      collapsable: false,
      children: [
        "/guide/interview/算法/基础.md",
        "/guide/interview/算法/算法模板.md",
        "/guide/interview/算法/hot.md",
        "/guide/interview/算法/剑指offer.md",
      ]
    },
    {
      title: groupF,
      collapsable: false,
      children: [ "/guide/interview/前端工程化/常用面试题.md",]
    },
    {
      title: groupG,
      collapsable: false,
      children: ['/guide/interview/性能优化/常用面试题.md']
    },
    {
      title: groupH,
      collapsable: false,
      children: ['/guide/interview/浏览器/常见面试题.md']
    },
    {
      title: groupI,
      collapsable: false,
      children: ['/guide/interview/Http/常见http面试题.md']
    },
    {
      title: groupJ,
      collapsable: false,
      children: ['/guide/interview/安全/常用面试题.md']
    },
    {
      title: groupK,
      collapsable: false,
      children: [ 
      '/guide/interview/软技能/自我介绍.md',
      '/guide/interview/软技能/学习历程.md',
      '/guide/interview/软技能/自我总结.md',
      '/guide/interview/软技能/业务.md',
      '/guide/interview/软技能/个人职业规划.md',
      '/guide/interview/软技能/实习心得.md',
      '/guide/interview/软技能/HR面试.md']
    }
  ]
}
function getMusicSlideBar(group) {
  return [
    {
      title: group,
      collapsable: false,
      children: [
        '',
      ]
    }
  ]
}


function getPShopSlideBar(group,groupA, groupB, groupC,groupD,groupE,groupF) {
  return [
    {
      title: group,
      collapsable: false,
      children: [
        '',
      ]
    },
    {
      title: groupA,
      collapsable: false,
      children: [
        '/project/shop/md/sku.md',
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        '/project/shop/md/request.md'
      ]
    },
    {
      title: groupC,
      collapsable: false,
      children: [
        '/project/shop/md/cart.md'
      ]
    },
    {
      title: groupD,
      collapsable: false,
      children: ['/project/shop/md/coupon.md']
    },
    {
      title: groupE,
      collapsable: false,
      children: ['/project/shop/md/order.md']
    },
    {
      title: groupF,
      collapsable: false,
      children: ['/project/shop/md/skill.md']
    }
  ]
}
function getBlogSlideBar(groupA) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '/blog/pratice/vue-analyze.md'
      ]
    }
  ]
}



