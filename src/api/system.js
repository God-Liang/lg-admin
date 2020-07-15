import request from '@/utils/request'
import qs from 'qs'

// 获取oss临时权限
export function getOssPolicy() {
  return request({
    url: '/oss/policy',
    method: 'get'
  })
}

// 获取地区列表
export function getAreaList(data) {
  return request({
    url: '/agent/common/area',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 获取角色列表
export function getRoleList(data) {
  return request({
    url: '/agent/common/role',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 修改密码
export function resetPwd(data) {
  return request({
    url: '/agent/account/resetPwd',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 编辑用户信息
export function updateInfo(data) {
  return request({
    url: '/agent/account/edit',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 编辑员工密码
export function updatePass(data) {
  return request({
    url: '/agent/user/resetPwd',
    method: 'post',
    data: qs.stringify(data)
  })
}
