export default [
    {
      path: '/',
      name: 'layout',
      component: () => import('../layout/Admin'),
      children: [
        {
          path: '/',
          name: '首页',
          component: () => import('../views/Index'),
        },
        {
          path: '/user',
          name: '用户模块',
          component: () => import('../views/user/Index'),
        },
        {
          path: '/column',
          name: '栏目模块',
          component: () => import('../views/column/Index'),
        },
        {
          path: '/subcolumn/:id',
          name: '子栏目模块',
          component: () => import('../views/subcolumn/Index'),
        },
        {
          path: '/listcontent/:id',
          name: '内容列表模块',
          component: () => import('../views/listcontent/Index'),
        },
        {
          path: '/examine',
          name: '内容列表模块',
          component: () => import('../views/examine/Index'),
        },
        {
          path: '/meeting',
          name: '内容列表模块',
          component: () => import('../views/meeting/Index'),
        },
        {
          path: '/content/:column/:id',
          name: '添加内容模块',
          component: () => import('../views/content/Index'),
        },
        {
          path: '/ad',
          name: '添加广告模块',
          component: () => import('../views/ad/Index'),
        },
        {
          path: '/application',
          name: '管理设置模块',
          component: () => import('../views/application/Index'),
        },
        {
          path: '/admininfo',
          name: '管理设置模块',
          component: () => import('../views/admininfo/Index'),
        },
        
      ]
    },
    {
      path: '/login',
      name: '后台登录',
      component: () => import('../views/login.vue'),
    },
    {
      path: '/home',
      name: 'layout',
      component: () => import('../views/Home'),
      }

  ]