<template lang="pug">
  a-form-model(:label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" :model="dictionaryForm" :rules="dictionaryRules" ref="dictionaryForm")
    a-form-model-item(label="名称：" prop="name")
      a-input.w200(v-model="dictionaryForm.name")
    a-form-model-item(label="值：" prop="key")
      a-input.w200(v-model="dictionaryForm.key")
    a-form-model-item(label="排序：" prop="orders")
      a-input.w200(v-model="dictionaryForm.orders")
</template>
<script>
import { createOrUpdate } from '@/api/common'

export default {
  props: {
    formData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      apiName: 'dictionary',
      dictionaryForm: {
        name: '',
        key: '',
        code: '',
        orders: ''
      },
      dictionaryRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        key: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        orders: [{ pattern: /^[1-9]\d*$/, message: '请输入正整数', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    if (this.formData) {
      this.dictionaryForm = Object.assign({}, this.formData)
    }
  },
  methods: {
    onOk() {
      return new Promise(resolve => {
        this.$refs.dictionaryForm.validate(valid => {
          if (valid) {
            const data = Object.assign({}, this.dictionaryForm)
            createOrUpdate(this.apiName, data).then(res => {
              if (res.code === 200) {
                this.$notification.success({
                  message: '成功',
                  description: '保存成功'
                })
                resolve(true)
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      })
    }
  }
}
</script>
