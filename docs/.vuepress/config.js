module.exports = {
  title: '前端面试知识总结',
  description: '自家使用,暂不外传',
  bashL:'/blog/',
  locales: {
    '/': {
      lang: 'ZH',
      title: '前端面试知识总结',
      description: '自家使用,暂不外传'
    }
    // ,
    // '/es/': {
    //   lang: 'es',
    //   title: 'Technical Document',
    //   description: 'Magic power!'
    // }
  },
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
    locales: {
      '/': {
        // label: '简体中文',
        // selectText: '选择语言',
        editLinkText: '在github上编辑此页',
        nav: [
          {
            text: '首页',
            link: '/'
          },
          // {
          //   text: '重要的计划(Todo)',
          //   link: 'http://apidocs.yangxiansheng.top/#/todolist'
          // },
          {
            text: '指南',
            link: '/guide/'
          }
          // {
          //   text: '笔记随录',
          //   link: '/about/'
          // },
          // {
          //   text: '接口大全',
          //   link: 'http://wohenpi0918.gitee.io/api-store/#/'
          // },
          // {
          //   text: '项目',
          //   items: [
          //     {
          //       text: '去哪儿旅行',
          //       link: 'https://github.com/251205668/Travel'
          //     },
          //     {
          //       text: '饿了么外卖前台',
          //       link: 'https://github.com/251205668/restaurant'
          //     },
          //     {
          //       text: '魔法音乐App',
          //       link: 'https://github.com/251205668/mymusic'
          //     }
          //   ]
          // }
        ],
        lastUpdated: 'Last update',
        sidebarDepth: 2,
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
          )
          // ),
          // '/todo/': gettodoSidebar('计划'),
          // '/about/': getaboutSidebar(
          //   '前端基础学习笔记',
          //   '小程序笔录',
          //   '布局技巧总结'
          // )
        }
      }
      // '/es/': {
      //   label: 'English',
      //   selectText: 'Languages',
      //   editLinkText: 'Edit this page on Github',
      //   nav: [
      //     {
      //       text: 'Home',
      //       link: '/es/'
      //     },
      //     {
      //       text: 'Important plan(Todo)',
      //       link: 'http://apidocs.yangxiansheng.top/#/todolist'
      //     },
      //     {
      //       text: 'Guide',
      //       link: '/es/guide/'
      //     },
      //     {
      //       text: 'Notes with notes',
      //       link: '/es/about/'
      //     },
      //     {
      //       text: 'API List',
      //       link: 'http://wohenpi0918.gitee.io/api-store/#/'
      //     },
      //     {
      //       text: 'Projects',
      //       items: [
      //         {
      //           text: 'Where go Travel',
      //           link: 'https://github.com/251205668/Travel'
      //         },
      //         {
      //           text: 'Element food restaurant',
      //           link: 'https://github.com/251205668/restaurant'
      //         },
      //         {
      //           text: 'Magic Muisc app',
      //           link: 'https://github.com/251205668/mymusic'
      //         }
      //       ]
      //     }
      //   ],
      //   lastUpdated: 'Last Update',
      //   sidebarDepth: 2,
      //   sidebar: {
      //     '/es/guide/': [
      //       {
      //         title:'Basis',
      //         collapsable:false,
      //         children:[
      //           '/es/',
      //           '/es/guide/ES6demo1.md',
      //           '/es/guide/ES6demo2.md',
      //           '/es/guide/ES6demo3.md',
      //           '/es/guide/ES6demo4.md',
      //           '/es/guide/ES6demo5.md',
      //           '/es/guide/ES6demo6.md',
      //         ]
      //       },
      //       {
      //         title:'MARKDOWN-BASIS',
      //         collapsable:false,
      //         children:[
      //           '/es/guide/first.md',
      //           '/es/guide/5g.md'
      //         ]

      //       },
      //       {
      //         title:'vue2.5-MagicMuisc',
      //         collapsable:false,
      //         children:[
      //           '/es/guide/begin.md',
      //           '/es/guide/C1.md',
      //           '/es/guide/C2.md',
      //           '/es/guide/header.md',
      //           '/es/guide/tab.md',
      //           '/es/guide/jsonp.md',
      //           '/es/guide/getrecommends.md',
      //           '/es/guide/Cswiper.md',
      //           '/es/guide/recommend.md',
      //           '/es/guide/loading.md',
      //           '/es/guide/singer.md',
      //           '/es/guide/listview.md',
      //           '/es/guide/映射表.md',
      //           '/es/guide/axios.md',
      //           '/es/guide/router.md',
      //           '/es/guide/vuex.md',
      //           '/es/guide/网易云Api重构.md',
      //           '/es/guide/singerDetail.md',
      //           '/es/guide/player1.md',
      //           '/es/guide/player2.md'
      //         ]
      //       }
      //     ],
      //     '/es/about/':getesaboutSidebar(
      //       'Front-end basic study notes',
      //       'Server Node.js foundation',
      //       'Summary of common skills'
      //     ),
      //   }
      // }
    },
    repo: '251205668',
    repoLabel: 'Github',
    docsRepo: '251205668/Note-docs',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true
  },
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
      children: ['/guide/vue/test.md']
    },
    {
      title: groupE,
      collapsable: true,
      children: ['/guide/webpack/test.md']
    },
    {
      title: groupF,
      collapsable: true,
      children: ['/guide/node/test.md']
    },
    {
      title: groupG,
      collapsable: true,
      children: ['/guide/interview/test.md']
    }
  ]
}

