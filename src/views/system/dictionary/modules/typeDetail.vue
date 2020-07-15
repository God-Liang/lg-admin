<template lang="pug">
  a-form-model(:label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" :model="dictionaryForm" :rules="dictionaryRules" ref="dictionaryForm")
    a-form-model-item(label="名称：" prop="name")
      a-input.w200(v-model="dictionaryForm.name")
    a-form-model-item(label="值：" prop="key")
      a-input.w200(v-model="dictionaryForm.key")
</template>
<script>
// import { createOrUpdate } from '@/api/common'

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
        key: ''
      },
      dictionaryRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        key: [{ required: true, message: '请输入值', trigger: 'blur' }]
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
            console.log(data)
            resolve(data)
            // createOrUpdate(this.apiName, data).then(res => {
            //   if (res.code === 200) {
            //     this.$notification.success({
            //       message: '成功',
            //       description: '保存成功'
            //     })
            //     resolve(true)
            //   }
            // })
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
