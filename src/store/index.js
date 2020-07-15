import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'

// default router permission control
import permission1 from './modules/permission'

// dynamic router permission control (Experimental)
import permission2 from './modules/async-router'
import getters from './getters'
let permission
if (process.env.VUE_APP_PERMISSION_ASYNC === '1') {
  permission = permission1
} else {
  permission = permission2
}

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
