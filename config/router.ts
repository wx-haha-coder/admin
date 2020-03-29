const routes = [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: '',
        path: '/user',
        redirect: '/user/login',
      },
      {
        name: 'login',
        path: '/user/login',
        component: './user/Sigin',
      },
      {
        name: 'login',
        path: '/user/auth-login',
        component: './user/AuthLogin',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/system',
            name: '系统',
            icon: 'SettingOutlined',
            // authority: ['admin'],
            routes: [
              {
                path: '/system/setting',
                name: '设置',
                component: './System/Setting',
              },
              {
                path: '/system/users',
                name: '用户管理',
                component: './Admin/Users',
              },
            ],
          },
          {
            name: '个人中心',
            icon: 'table',
            path: '/account',
            component: './Account/Index',
            hideInMenu: true,
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
export default routes;
