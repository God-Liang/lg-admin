// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './utils/filter' // global filter
import './global.less'
import moment from 'moment'
// errorlog
import * as Sentry from '@sentry/browser'
import { Vue as VueIntegration } from '@sentry/integrations'
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://73a9326104cf46b2a9147ad1c44afca7@o414535.ingest.sentry.io/5304276',
    integrations: [new VueIntegration({ Vue, attachProps: true })],
    logErrors: true,
    release: '0.0.1@' + moment().format('YYYY-MM-DD HH:mm'),
    environment: process.env.VUE_APP_MODE
  })
}

Vue.config.productionTip = false
// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
Vue.component('pro-layout', ProLayout)
Vue.component('page-header-wrapper', PageHeaderWrapper)

window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
