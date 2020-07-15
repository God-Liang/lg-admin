import common from './common'
let asyncRouters = []
let constantRouters = []
switch (process.env.VUE_APP_MODE) {
  case 'admin': // 全局公共配置
    asyncRouters = [...common.asyncRouter]
    constantRouters = [...common.constantRouter]
    break

  default:
    break
}
export const asyncRouterMap = asyncRouters
export const constantRouterMap = constantRouters
