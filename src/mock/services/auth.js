import Mock from 'mockjs2'
import { builder, getBody } from '../util'

const account = ['admin']
const password = ['e10adc3949ba59abbe56e057f20f883e'] // 123456
const login = options => {
  const body = getBody(options)
  const pwd = body.password.slice(2).slice(0, -2)
  if (!account.includes(body.account) || !password.includes(pwd)) {
    return builder({}, '账户或密码错误', 500)
  }

  return builder(
    {
      id: Mock.mock('@guid'),
      name: Mock.mock('@name'),
      account: 'admin',
      password: '',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
      status: 1,
      telephone: '',
      lastLoginIp: '27.154.74.117',
      lastLoginTime: 1534837621348,
      creatorId: 'admin',
      createTime: 1497160610259,
      deleted: 0,
      roleId: 'admin',
      lang: 'zh-CN',
      token: '4291d7da9005377ec9aec4a71ea837f'
    },
    '登陆成功',
    200,
    { 'Custom-Header': Mock.mock('@guid') }
  )
}

const logout = () => {
  return builder({}, '注销成功', 200)
}

const routeAttr = () => {
  return builder([
    // dashboard
    {
      id: 1,
      parentId: 0,
      path: '/dashboard',
      name: 'Dashboard',
      component: 'dashboard/index',
      meta: { title: '首页', icon: 'home' }
    },
    // system
    {
      id: 2,
      parentId: 0,
      path: '/system',
      redirect: '/system/user',
      component: 'RouteView',
      meta: { title: '系统管理', icon: 'setting' }
    },
    {
      id: 3,
      parentId: 2,
      path: '/system/user',
      name: 'User',
      redirect: '',
      component: 'system/user',
      meta: { title: '用户管理' }
    },
    {
      id: 4,
      parentId: 2,
      path: '/system/role',
      name: 'Role',
      redirect: '',
      component: 'system/role',
      meta: { title: '角色管理' }
    },
    {
      id: 5,
      parentId: 2,
      path: '/system/dictionary',
      name: 'Dictionary',
      redirect: '',
      component: 'system/dictionary',
      meta: { title: '字典管理' }
    },
    {
      id: 6,
      parentId: 2,
      path: '/system/permission',
      name: 'Permission',
      redirect: '',
      component: 'system/permission',
      meta: { title: '权限管理' }
    }
  ])
}
const route = () => {
  return builder([
    {
      id: 1,
      name: 'system'
    }
  ])
}

const info = options => {
  const userInfo = {
    id: '4291d7da9005377ec9aec4a71ea837f',
    name: '迷之de小孩灬',
    username: 'admin',
    password: '',
    avatar: 'https://portrait.gitee.com/uploads/avatars/user/536/1608259_lginsane_1590564909.png!avatar60',
    status: 1,
    telephone: '',
    lastLoginIp: '27.154.74.117',
    lastLoginTime: 1534837621348,
    creatorId: 'admin',
    createTime: 1497160610259,
    merchantCode: 'TLif2btpzg079h15bk',
    deleted: 0
  }
  return builder(userInfo)
}
Mock.mock(/\/login/, 'post', login)
Mock.mock(/\/getRoute/, 'post', route)
Mock.mock(/\/getAttrRoute/, 'post', routeAttr)
Mock.mock(/\/getInfo/, 'get', info)
Mock.mock(/\/logout/, 'get', logout)
