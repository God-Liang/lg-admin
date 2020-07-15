import request from '@/utils/request'
import qs from 'qs'

/**
 * @param { String } port 接口名称
 * @param { Object } params 接口参数(get请求)
 * @param { Object } data 接口参数(post请求)
 * @param { Number } id 某条数据ID
 * import { list, createOrUpdate, remove, read } from '@/api/common' 引入方法
 */

// 查询列表数据
export function list(port, data) {
  return request({
    url: `/${port}/list`,
    method: 'post',
    data: qs.stringify(data)
  })
}

// 新增或更新数据
export function createOrUpdate(port, data) {
  return request({
    url: `/${port}/edit`,
    method: 'post',
    data: qs.stringify(data)
  })
}

// 删除数据
export function remove(port, id) {
  return request({
    url: `/${port}/del`,
    method: 'post',
    data: qs.stringify({
      id: id
    })
  })
}

// 查询某一条
export function read(port, id) {
  return request({
    url: `/${port}/info`,
    method: 'post',
    data: qs.stringify({
      id: id
    })
  })
}
