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
          }
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
      children: ['/guide/interview/test.md']
    }
  ]
}

