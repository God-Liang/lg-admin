<template lang="pug">
  .main
    a-form.user-layout-login(id="formLogin"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit")
      a-form-item
        a-input(size="large"
          type="text"
          placeholder="请输入账号"
          v-decorator="['account', {rules: [{ required: true, message: '请输入账号' }], validateTrigger: 'blur'}]")
          a-icon(slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }")
      a-form-item
        a-input-password(size="large"
          placeholder="请输入密码"
          v-decorator="['password', {rules: [{ required: true, message: '请输入密码' }, { min: 6, message: '密码不少于六个字符' }], validateTrigger: 'blur'}]")
          a-icon(slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }")
      a-form-item
        a-button(size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn") 登录
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getRandomNum } from '@/utils/util'
import qs from 'qs'
import md5 from 'md5'
export default {
  data() {
    return {
      loginBtn: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false
      }
    }
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    // 登录提交
    handleSubmit(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        Login
      } = this

      state.loginBtn = true

      const validateFieldsKey = ['account', 'password']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const randomNum = getRandomNum(4)
          const loginParams = { ...values }
          loginParams.password = randomNum[0] + randomNum[1] + md5(loginParams.password) + randomNum[2] + randomNum[3]
          Login(qs.stringify(loginParams))
            // Login(loginParams)
            .then(res => this.loginSuccess(res))
            .finally(() => {
              setTimeout(() => {
                state.loginBtn = false
              }, 200)
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 200)
        }
      })
    },
    // 登录成功跳转首页
    loginSuccess(res) {
      this.$router.push({ path: '/' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '成功',
          description: '登录成功'
        })
      }, 200)
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
