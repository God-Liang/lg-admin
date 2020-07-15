import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
const CancelToken = axios.CancelToken
const source = CancelToken.source()
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = error => {
  if (axios.isCancel(error)) {
    // 取消请求的情况下，终端Promise调用链
    return new Promise(() => {})
  } else {
    if (error.message.includes('timeout')) {
      notification.error({
        message: '提示',
        description: '请求超时'
      })
    } else {
      notification.error({
        message: '提示',
        description: error.message
      })
    }
    return Promise.reject(error)
  }
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'

  if (token) {
    config.headers['AGENTTOKEN'] = token
  }
  if (config.url.toLocaleLowerCase().indexOf('list') > 0 || config.url.toLocaleLowerCase().indexOf('statement') > 0) {
    store.commit('TOGGLE_LOADING', true)
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use(response => {
  const res = response.data
  if (store.getters.listLoading) {
    store.commit('TOGGLE_LOADING', false)
  }
  // if the custom code is not 20000, it is judged as an error.
  if (res.code !== 200) {
    notification.error({
      message: '提示',
      description: res.message
    })
    // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    if (res.code === 1001 || res.code === 1002 || res.code === 1003) {
      // to re-login
      source.cancel()
      store.dispatch('Logout').then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 0)
      })
    }
    return Promise.reject(new Error(res.message || 'Error'))
  } else {
    return res
  }
}, errorHandler)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export { installer as VueAxios, request as axios }
