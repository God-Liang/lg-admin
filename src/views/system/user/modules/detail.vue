<template lang="pug">
  a-form-model(:label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" :model="userForm" :rules="userRules" ref="userForm")
    a-form-model-item(label="头像：" prop="avatar")
      a-upload.avatar-uploader(name="avatar"
        list-type="picture-card"
        :show-upload-list="false"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        :before-upload="beforeUpload"
        @change="handleUpload")
        img.avatar(v-if="userForm.avatar" :src="userForm.avatar" alt="头像")
        div(v-else)
          a-icon(:type="loading ? 'loading' : 'plus'")
    a-form-model-item(label="昵称：" prop="name")
      a-input.w200(v-model="userForm.name")
    a-form-model-item(label="联系方式：" prop="phone")
      a-input.w200(v-model="userForm.phone")
    a-form-model-item(label="角色：" prop="roleId")
      a-select.w200(v-model="userForm.roleId" allowClear show-search :filter-option="filterOption" placeholder="请选择" @change="handleSelect" option-filter-prop="children")
        a-select-option(v-for="role in roles" :key="role.id" :value="role.id") {{role.name}}
    a-form-model-item(label="状态：" prop="status")
      dictionary-select.w200(v-model="userForm.status")
</template>
<script>
import { createOrUpdate } from '@/api/common'
import DictionarySelect from '@/components/DictionarySelect/index.jsx'
export default {
  components: { DictionarySelect },
  props: {
    formData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      apiName: 'user',
      userForm: {
        name: '',
        avatar: '',
        phone: '',
        roleId: undefined,
        status: undefined
      },
      userRules: {
        avatar: [{ required: true, message: '请上传头像', trigger: 'change' }],
        name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      },
      loading: false,
      roles: [
        {
          id: 1,
          name: 'admin'
        }
      ],
      statusOptions: [
        {
          id: 1,
          key: 1,
          name: '启用'
        },
        {
          id: 2,
          key: 0,
          name: '禁用'
        }
      ]
    }
  },
  mounted() {
    if (this.formData) {
      this.userForm = Object.assign({}, this.formData)
    }
  },
  methods: {
    onOk() {
      return new Promise(resolve => {
        this.$refs.userForm.validate(valid => {
          if (valid) {
            const data = Object.assign({}, this.userForm)
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
    },
    getBase64(img, callback) {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result))
      reader.readAsDataURL(img)
    },
    handleUpload(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        this.getBase64(info.file.originFileObj, imageUrl => {
          console.log(imageUrl)
          this.userForm.avatar = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload(file) {
      console.log(file)
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    handleSelect(value) {
      console.log(this.userForm)
      console.log(value)
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .avatar-uploader > .ant-upload {
  width: 80px;
  height: 80px;
  .ant-upload {
    padding: 0;
  }
}

/deep/ .ant-upload-select-picture-card i {
  font-size: 24px;
  color: #999;
}

/deep/ .ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.avatar {
  width: 80px;
  height: 80px;
}
</style>
