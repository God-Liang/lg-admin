/**
 * 向后端请求用户的菜单，动态生成路由
 */
import { constantRouterMap } from '@/router/router.config'
import { generatorDynamicRouter } from '@/router/generator-routers'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    permissionButtons: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_BUTTONS: (state, buttons) => {
      state.permissionButtons = buttons
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        generatorDynamicRouter().then(routers => {
          commit('SET_ROUTERS', routers)
          resolve()
        })
      })
    }
  }
}

export default permission