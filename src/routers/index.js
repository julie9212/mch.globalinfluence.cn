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
    ]
    },
    {
      path: '/home',
      name: 'layout',
      component: () => import('../views/Home'),
      }

  ]