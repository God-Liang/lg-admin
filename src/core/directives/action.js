import Vue from 'vue'
import store from '@/store'

/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action='method' , 如下：
 *    <i-button v-action='add' >添加用户</a-button>
 *
 */
const action = Vue.directive('action', {
  inserted (el, binding, vnode) {
    const { value } = binding
    const permissionButtons = store.getters && store.getters.permissionButtons
    if (value) {
      const permissionButton = value

      const hasPermission = permissionButtons.some(button => {
        return button === permissionButton
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  }
})

export default action
