const routes = [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Sigin',
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
            authority: ['admin'],
            routes: [
              {
                path: '/system/setting',
                name: '设置',
                component: './System/Setting',
                authority: ['admin'],
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
