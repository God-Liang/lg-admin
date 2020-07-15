<template lang="pug">
  .lg-container
    .lg-container-white
      a-form-model(:label-col="{ span: 4 }" :wrapper-col="{ span: 10 }" :model="userInfo" :rules="rules" ref="ruleForm")
        .info-container.publicStyle
          .title 基本信息
          //- 管理员
          template(v-if="userInfo.level === 1")
            a-form-model-item.w50(label="负责人" prop="name")
              a-input.wls300(v-model="userInfo.name")
            a-form-model-item.w50(label="主体名称" prop="business_subject")
              a-input.wls300(v-model="userInfo.business_subject")
            a-form-model-item.w50(label="手机号" prop="phone")
              a-input.wls300(v-model="userInfo.phone")
            a-form-model-item.w50(label="所在地区" prop="address_area")
              a-cascader.wls300(:default-value="addressArea" :options="regionalOption" allowClear :field-names="{ label: 'name', value: 'id', children: 'child' }" :show-search="{ regionalFilter }" @change="regionalChange" placeholder="地区筛选")
            a-form-model-item.w50(label="邮箱")
              a-input.wls300(v-model="userInfo.email")
            a-form-model-item.w50(label="详细地址" prop="address_detail")
              a-input.wls300(v-model="userInfo.address_detail")
            a-form-model-item(label="证件照")
              .imgList
                img.imgItem(v-viewer v-if="userInfo.papers_front" :src="imgApi + userInfo.papers_front")
                img.imgItem(v-viewer v-if="userInfo.papers_back" :src="imgApi + userInfo.papers_back")
            a-form-model-item(label="营业执照")
              .imgList(v-if="userInfo.license")
                img.imgItem(v-viewer :src="imgApi + userInfo.license")
          //- 员工
          template(v-if="userInfo.level === 0")
            a-form-model-item.w50(label="姓名" prop="name")
              a-input.wls300(v-model="userInfo.name")
            a-form-model-item.w50(label="手机号" prop="phone")
              a-input.wls300(v-model="userInfo.phone")
            a-form-model-item.w50(label="邮箱")
              a-input.wls300(v-model="userInfo.email")
            a-form-model-item.w50(v-if="userInfo.level === 0" label="备注")
              a-textarea.w300(v-model="userInfo.remark" :rows="4")
        .info-container.publicStyle(v-if="userInfo.level === 1")
          .title 代理信息
          a-form-model-item(label="代理区域")
            a-cascader.w300(disabled :default-value="agentRegion" change-on-select :options="regionalOption" allowClear :field-names="{ label: 'name', value: 'id', children: 'child' }")
          a-form-model-item(label="分佣费率")
            a-input-search.w136(v-model="userInfo.agent_commission" disabled)
              a-button(disabled slot="enterButton") %
        .permissions-container.publicStyle
          .title 账号信息
          a-form-model-item(label="登陆账号")
            a-input.w200(disabled v-model="userInfo.account")
            a-button(type="link" icon="edit" @click="handlePassword") 修改密码
          a-form-model-item(label="状态")
            a-radio-group.wls300(disabled v-model="userInfo.status")
              a-radio(:value="1") 开启
              a-radio(:value="0") 关闭
          .btn-container
            a-button(type="primary" @click="onSave") 保存
            a-button.ml20(@click="onCancel") 取消
</template>

<script>
import { mapGetters } from 'vuex'
import { getAreaList, updateInfo } from '@/api/system'
import setting from '@/views/account/setting'
export default {
  computed: {
    ...mapGetters(['userInfo'])
  },
  data () {
    return {
      imgApi: process.env.VUE_APP_API_BASE_URL,
      regionalOption: [],
      rules: {
        name: [{ required: true, message: '负责人不能为空', trigger: 'blur' }],
        business_subject: [{ required: true, message: '主体名称不能为空', trigger: 'blur' }],
        phone: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
        address_area: [{ required: true, message: '所在地区不能为空', trigger: 'change' }],
        address_detail: [{ required: true, message: '详细地址不能为空', trigger: 'blur' }]
      },
      templateForm: {
        name: '',
        business_subject: '',
        phone: '',
        address_area: [],
        address_detail: '',
        email: '',
        remark: ''
      },
      addressArea: [], // 所在地区
      agentRegion: [] // 代理地区
    }
  },
  mounted () {
    if (this.userInfo.address_area) {
      const addressArea = this.userInfo.address_area.toString().split(',')
      addressArea.map(e => {
        this.addressArea.push(Number(e))
      })
    }
    if (this.userInfo.agent_region) {
      const agentRegion = this.userInfo.agent_region.toString().split(',')
      agentRegion.map(e => {
        this.agentRegion.push(Number(e))
      })
    }
    this.getAreaList()
  },
  methods: {
    // 获取地区数据
    getAreaList () {
      getAreaList({}).then(res => {
        this.regionalOption = res.data
      })
    },
    // 地区过滤
    regionalFilter (inputValue, path) {
      return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
    },
    // 地区更改
    regionalChange (val) {
      this.addressArea = val
    },
    // 保存
    onSave (e) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          for (const key in this.templateForm) {
            if (this.templateForm.hasOwnProperty(key)) {
              this.templateForm[key] = this.userInfo[key]
            }
          }
          const data = Object.assign({}, this.templateForm)

          data.address_area = this.addressArea[this.addressArea.length - 1]
          updateInfo(data).then(res => {
            this.$notification.success({
              message: '成功',
              description: '保存成功'
            })
            this.$store.dispatch('GetInfoNull').then(() => {})
            this.$router.push('/')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onCancel () {
      this.$router.go(-1)
    },
    // 修改密码
    handlePassword () {
      this.$dialog(setting,
        {
          on: {
            ok () {
              console.log('ok 回调')
            },
            cancel () {
              console.log('cancel 回调')
            },
            close () {
              console.log('modal close 回调')
            }
          }
        },
        // modal props
        {
          title: '修改密码',
          width: 450,
          centered: true,
          maskClosable: false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.lg-container-white {
  padding: 0;
  background-color: #f0f2f5;
  .publicStyle {
    background-color: #fff;
    padding: 20px;
    .title {
      font-size:18px;
      font-weight:bold;
      color: #333333;
      margin-bottom: 20px;
    }
  }
  .info-container {
    margin-bottom: 20px;
  }
  .permissions-container {
    background-color: #fff;
  }
  .imgList {
    display: inline-flex;
    .imgItem {
      width: 200px;
      height: 112px;
      object-fit: cover;
      margin-right: 20px;
      border-radius:4px;
      background:rgba(246,246,246,1);
      border: 1px solid #dcdcdc;
    }
  }
}
.w50 {
  width: 50%;
  display: inline-block;
}
.wls300 {
  max-width: 300px;
}
.w136 {
  width: 136px;
}
/deep/ .ant-form-item-label {
  width: 100px;
}
</style>
