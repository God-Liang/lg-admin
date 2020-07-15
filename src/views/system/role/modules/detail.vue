<template lang="pug">
  a-form-model(:label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" :model="roleForm" :rules="roleRules" ref="roleForm")
    a-form-model-item(label="角色名称：" prop="name")
      a-input.w300(v-model="roleForm.name")
    //- a-form-model-item(label="tinymac：" prop="name")
    //-   Tinymce(v-model="content" :height="300")
    a-form-model-item(label="tinymac：" prop="name")
      AMAP(style='height: 300px')
</template>
<script>
import { createOrUpdate } from '@/api/common'
import Tinymce from '@/components/Tinymce'
import AMAP from '@/components/AMAP'
export default {
  props: {
    formData: {
      type: Object,
      default: null
    }
  },
  components: {
    Tinymce,
    AMAP
  },
  data() {
    return {
      apiName: 'role',
      roleForm: {
        name: ''
      },
      content: '',
      roleRules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      },
      imgurl: ''
    }
  },
  mounted() {
    if (this.formData) {
      this.roleForm = Object.assign({}, this.formData)
    }
  },
  methods: {
    onOk() {
      return new Promise(resolve => {
        this.$refs.roleForm.validate(valid => {
          if (valid) {
            const data = Object.assign({}, this.roleForm)
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
