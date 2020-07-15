import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}

// 用户信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 路由权限
export function getRoute() {
  return request({
    url: '/getRoute',
    method: 'post'
  })
}
export function getAttrRoute() {
  return request({
    url: '/getAttrRoute',
    method: 'post'
  })
}

// 退出
export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}
