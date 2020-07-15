<template lang="pug">
  a-form-model(:label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" :model="permissionForm" :rules="permissionRules" ref="permissionForm")
    a-form-model-item(label="权限类型")
      a-select(v-model="type")
        a-select-option(v-for="item in treeTypes" :key="item.value" :value="item.value") {{item.text}}
    a-form-model-item(label="权限选择")
      Tree.scrollY(blockNode ref="permissionTree" checkable defaultExpandAll :checkStrictly="checkStrictly" :tree-data="treeData" :defaultCheckedKeys="defaultCheckedKeys" @check="onTreeCheck")
</template>
<script>
import { createOrUpdate } from '@/api/common'
import { Tree } from 'ant-design-vue'
export default {
  props: {
    id: {
      type: Number,
      default: undefined
    }
  },
  components: { Tree },
  data() {
    return {
      apiName: 'role',
      permissionForm: {
        roleId: [], // 选中ID
        permissionId: [] // 选中并携带父ID
      },
      treeData: [
        {
          title: '平台',
          key: '1',
          parentId: '0',
          children: [
            { title: '首页', key: '6', parentId: '1' },
            {
              title: '商品管理',
              key: '10',
              parentId: '1',
              children: [
                {
                  title: '商品列表',
                  key: '11',
                  parentId: '10',
                  slots: { icon: 'menu' },
                  scopedSlots: { title: 'title' },
                  children: [
                    { title: '新增', key: '12', parentId: '11' },
                    { title: '编辑', key: '13', parentId: '11' }
                  ]
                }
              ]
            }
          ]
        },
        {
          title: '系统管理',
          key: '2',
          parentId: '0',
          children: [
            {
              title: '角色管理',
              key: '3',
              parentId: '2',
              slots: { icon: 'menu' },
              scopedSlots: { title: 'title' },
              children: [
                { title: '新增', key: '4', parentId: '3' },
                { title: '编辑', key: '5', parentId: '3' }
              ]
            }
          ]
        }
      ],
      checkStrictly: false, // 父子节点不关联
      defaultCheckedKeys: [],
      permissionRules: {
        roleId: [{ required: true, message: '请输入角色名称', trigger: 'change' }]
      },
      type: undefined,
      treeTypes: [
        {
          id: 1,
          value: '1',
          text: '平台'
        }
      ]
    }
  },
  mounted() {
    console.log(this.$refs.permissionTree)
    if (this.id) {
    }
  },
  methods: {
    onOk() {
      return new Promise(resolve => {
        this.$refs.permissionForm.validate(valid => {
          if (valid) {
            const data = Object.assign({}, this.permissionForm)
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
    // 选中
    onTreeCheck(checkedKeys) {
      console.log('selected', checkedKeys)
      this.permissionForm.roleId = [...checkedKeys]
      this.permissionForm.permissionId = [...checkedKeys]
      for (let i = 0; i < this.permissionForm.permissionId.length; i++) {
        const filterResult = this.filtersArr(this.permissionForm.permissionId[i], this.treeData)
        // 父Id不存在
        if (!this.permissionForm.permissionId.includes(filterResult[0].parentId)) {
          const isParent0 = filterResult.length > 0 && filterResult[0].parentId === '0'
          // 父Id是否为0
          if (!isParent0) {
            this.permissionForm.permissionId.push(filterResult[0].parentId)
          }
        }
      }
    },
    filtersArr(num, array) {
      let filterResult = []
      array.map(f => {
        if (f.children && f.children.length > 0) {
          filterResult = filterResult.concat(this.filtersArr(num, f.children))
        }
        if (f.key === num) {
          filterResult.push(f)
        }
      })
      return filterResult
    }
  }
}
</script>
<style lang="less" scoped>
.scrollY {
  overflow-y: auto;
  max-height: 500px;
}
</style>
