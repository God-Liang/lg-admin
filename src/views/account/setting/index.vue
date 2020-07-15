<template lang="pug">
  a-form-model(:label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" :model="setForm" :rules="setRules" ref="setForm")
    a-form-model-item(label="原密码" prop="old_pwd")
      a-input.w300(v-model="setForm.old_pwd")
    a-form-model-item(label="新密码" prop="new_pwd")
      a-input.w300(v-model="setForm.new_pwd")
    a-form-model-item(label="确认密码" prop="confirm_pwd")
      a-input.w300(v-model="setForm.confirm_pwd")
</template>
<script>
import { resetPwd } from '@/api/system'
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.setForm.confirm_pwd !== '') {
          this.$refs.setForm.validateField('confirm_pwd')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.setForm.new_pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      setForm: {
        old_pwd: '',
        new_pwd: '',
        confirm_pwd: ''
      },
      setRules: {
        old_pwd: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        new_pwd: [{ required: true, validator: validatePass, trigger: 'blur' }],
        confirm_pwd: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    onOk () {
      return new Promise(resolve => {
        this.$refs.setForm.validate(valid => {
          if (valid) {
            const data = Object.assign({}, this.setForm)
            resetPwd(data).then(res => {
              this.$notification.success({
                message: '成功',
                description: '密码修改成功，请重新登录'
              })
              this.$store.dispatch('Logout').then(() => {
                setTimeout(() => {
                  window.location.reload()
                }, 200)
              })
              resolve(true)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      })
    }
    // onCancel () {

    // }
  }
}
</script>
