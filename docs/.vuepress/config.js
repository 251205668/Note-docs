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
            'css基础到进阶',
            'js基础',
            'js进阶',
            "MVVM分析",
            "Webpack实战分析",
            "Node.js基础到进阶",
            "面试题总结"
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
function getGuideSidebar(group,groupA, groupB, groupC,groupD,groupE,groupF,groupG) {
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
        '/guide/css/test.md',
        '/guide/css/layout.md',
        '/guide/css/alwaysCode.md',
        '/guide/css/iconfont.md',
        '/guide/css/css-skill.md',
        '/guide/css/code.md'
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        '/guide/js/base.md'
      ]
    },
    {
      title: groupC,
      collapsable: false,
      children: [
        '/guide/js/higher.md'
      ]
    },
    {
      title: groupD,
      collapsable: false,
      children: ['/guide/vue/vue.md']
    },
    {
      title: groupE,
      collapsable: true,
      children: ['/guide/webpack/test.md']
    },
    {
      title: groupF,
      collapsable: true,
      children: ['/guide/node/koa.md',"/guide/node/springboot.md"]
    },
    {
      title: groupG,
      collapsable: true,
      children: ['/guide/interview/test.md','/guide/interview/web-api.md','/guide/interview/git.md','/guide/interview/broswer.md','/guide/interview/miniprogrammer.md','/guide/interview/Vue.md','/guide/interview/project.md','/guide/interview/always.md']
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


