// import { BasicLayout, BlankLayout, UserLayout } from '@/layouts'
import { BasicLayout, UserLayout } from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

const asyncRouter = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', keepAlive: true, icon: 'home' }
      },
      // system
      {
        path: '/system',
        redirect: '/system/user',
        component: RouteView,
        meta: { title: '系统管理', icon: 'setting', permission: ['system'] },
        children: [
          {
            path: '/system/user',
            name: 'User',
            component: () => import('@/views/system/user'),
            meta: { title: '用户管理', keepAlive: false }
          },
          {
            path: '/system/role',
            name: 'Role',
            component: () => import('@/views/system/role'),
            meta: { title: '角色管理', keepAlive: false }
          },
          {
            path: '/system/dictionary',
            name: 'Dictionary',
            component: () => import('@/views/system/dictionary'),
            meta: { title: '字典管理', keepAlive: false }
          },
          {
            path: '/system/permission',
            name: 'Permission',
            component: () => import('@/views/system/permission'),
            meta: { title: '权限管理', keepAlive: false }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const constantRouter = [
  {
    path: '/login',
    component: UserLayout,
    redirect: '/login/index',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'login',
        component: () => import(/* webpackChunkName: "common" */ '@/views/login/index')
      }
    ]
  },
  // 个人中心
  {
    path: '/account',
    component: BasicLayout,
    redirect: '/account/center',
    hidden: true,
    children: [
      {
        path: '/account/center',
        name: 'Center',
        component: () => import(/* webpackChunkName: "common" */ '@/views/account/center')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
export default {
  asyncRouter,
  constantRouter
}
