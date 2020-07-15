import storage from 'store'
import { login, getInfo, getRoute, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
const user = {
  state: {
    token: '',
    name: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name }) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            const result = response.data
            storage.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(response => {
            const data = response.data
            if (!data) {
              reject(new Error('暂无该用户～'))
            }
            commit('SET_NAME', { name: data.name })
            commit('SET_AVATAR', data.avatar)
            commit('SET_INFO', data)
            if (process.env.VUE_APP_PERMISSION_ASYNC === '1') {
              getRoute().then(res => {
                const permissionRouter = res.data
                if (!permissionRouter || permissionRouter.length <= 0) {
                  reject(new Error('暂无权限，请联系相关人员～'))
                }
                data.permissions = permissionRouter
                const permissionList = []
                permissionRouter.map(permission => {
                  permissionList.push(permission.name)
                  if (permission.child && permission.child.length > 0) {
                    permission.child.map(e => {
                      permissionList.push(e.name)
                    })
                  }
                })
                data.permissionList = permissionList
                commit('SET_ROLES', permissionRouter)
                resolve(data)
              })
            } else {
              resolve(data)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    GetInfoNull({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(response => {
            const data = response.data
            if (!data) {
              reject(new Error('暂无该用户～'))
            }
            commit('SET_NAME', { name: data.name })
            commit('SET_AVATAR', data.avatar)
            commit('SET_INFO', data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 登出
    Logout({ commit, state }) {
      return new Promise(resolve => {
        logout(state.token)
          .then(() => {
            resolve()
          })
          .catch(() => {
            resolve()
          })
          .finally(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            storage.remove(ACCESS_TOKEN)
          })
      })
    }
  }
}

export default user
