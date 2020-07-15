<template lang="pug">
  .lg-container
    .lg-container-white
      //- 侧边栏
      a-spin.sider-container(:spinning="spinning")
        .sider-filter-container
          a-button(type="primary") 新增
          a-button(@click="handerDelete") 删除
          a-dropdown
            a-menu(slot="overlay")
              a-menu-item(key="1" @click="handerMore('1')") 收合所有
              a-menu-item(key="2" @click="handerMore('2')") 仅展开一级
              a-menu-item(key="3" @click="handerMore('3')") 仅展开二级
              a-menu-item(key="4" @click="handerMore('4')") 展开所有
            a-button 更多操作
              a-icon(type="down")
        a-input-search(placeholder="搜索" @change="handerFilter")
        Tree.scrollY(:auto-expand-parent="autoExpandParent" @select="handerselect" @expand="onExpand" :tree-data="treeData" show-icon :expandedKeys.sync="expandedKeys")
          icon-font(slot="project" type="icondilanxianxingiconyihuifu_huabanfuben")
          icon-font(slot="catalogue" type="iconwulumuqishigongandashujuguanlipingtai-ico-")
          icon-font(slot="menu" type="iconcaidan")
          icon-font(slot="btn" type="iconanniu")
          template(slot="title" slot-scope="{ title }")
            span(v-if="title.indexOf(searchValue) > -1")
              span {{ title.substr(0, title.indexOf(searchValue)) }}
              span(style="color: #f50") {{ searchValue }}
              span {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
            span(v-else) {{ title }}
      //- 内容
      .content-container
        a-form-model(ref="permissionFrom"
          :model="permissionFrom"
          :rules="permissionRules"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }")
          a-form-model-item(label="父ID：")
            a-input(v-model="permissionFrom.parentId" disabled)
          a-form-model-item(label="ID：")
            a-input(v-model="permissionFrom.id" disabled)
          a-form-model-item(label="类型：" prop="type")
            a-select(v-model="permissionFrom.type" @change="typeChange" placeholder="请选择")
              a-select-option(v-for="item in typeList" :key="item.value" :value="item.value") {{item.label}}
          //- 项目
          template(v-if="permissionFrom.type === 1")
            a-form-model-item(label="路径：" prop="path")
              a-input(v-model="permissionFrom.path" disabled placeholder="path")
            a-form-model-item(label="公共组件" prop="component")
              a-input(v-model="permissionFrom.component" disabled placeholder="PageView、RouteView等 ")
            a-form-model-item(label="名称：" prop="name")
              a-input(v-model="permissionFrom.name" placeholder="name，由英文字母组成，唯一性")
            a-form-model-item(label="标题" prop="title")
              a-input(v-model="permissionFrom.title" placeholder="title，由汉字组成")
            a-form-model-item(label="重定向地址：" prop="redirect")
              a-input(v-model="permissionFrom.redirect" placeholder="redirect")
          //- 按钮
          template(v-else-if="permissionFrom.type === 4")
            a-form-model-item(label="按钮名称：" prop="name")
              a-input(v-model="permissionFrom.name" placeholder="name，由英文字母组成，唯一性")
            a-form-model-item(label="按钮标题" prop="title")
              a-input(v-model="permissionFrom.title" placeholder="title，由汉字组成")
          //- 目录
          template(v-else)
            a-form-model-item(label="路由路径：" prop="path")
              a-input(v-model="permissionFrom.path" placeholder="path")
            a-form-model-item(label="路由名称：" prop="name")
              a-input(v-model="permissionFrom.name" placeholder="name，由英文字母组成，唯一性")
            a-form-model-item(label="路由对应组件" prop="component")
              a-input(v-model="permissionFrom.component" :placeholder="permissionFrom.type === 2?'PageView、RouteView':'catalogue/menu'")
            a-form-model-item(label="路由标题" prop="title")
              a-input(v-model="permissionFrom.title" placeholder="title，由汉字组成")
            a-form-model-item(label="重定向地址：" prop="redirect")
              a-input(v-model="permissionFrom.redirect" placeholder="redirect")
            a-form-model-item(label="路由图标" prop="icon")
              a-input(v-model="permissionFrom.icon" placeholder="icon")
            a-form-model-item(label="菜单链接跳转目标" prop="target")
              a-input(v-model="permissionFrom.target" placeholder="target")
            a-form-model-item(label="排序值" prop="orders")
              a-input(v-model="permissionFrom.orders" placeholder="请输入数字")
            a-form-model-item(label=" " :colon="false")
              a-checkbox(:checked="permissionFrom.hideChildrenInMenu") 是否隐藏子菜单
            a-form-model-item(label=" " :colon="false")
              a-checkbox(:checked="permissionFrom.hiddenHeaderContent") 是否隐藏PageHeader组件中的面包屑和页面标题栏
          a-form-model-item(label=" " :colon="false")
            a-button(v-if="permissionFrom.type !== 4" type="primary" @click="handerAdd") 新增子节点
            a-button(v-if="permissionFrom.id" type="primary" @click="handerUpdate") 更新
            a-button(v-else type="primary" @click="handerSave") 保存
            a-button(v-if="permissionFrom.id" @click="handerCancel") 取消
</template>
<script>
import { Tree, Icon } from 'ant-design-vue'
import { deepClone } from '@/utils/util'
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1937627_swwc86j3pw.js'
})
// 合并侧边栏数据
const dataList = []
const generateList = data => {
  data.map(e => {
    dataList.push(e)
    if (e.children) {
      generateList(e.children)
    }
  })
}
// 获取父节点key
const getParentKey = (key, tree) => {
  let parentKey
  tree.map(node => {
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  })
  return parentKey
}
const defaultForm = {
  id: undefined,
  parentId: undefined,
  path: '',
  name: '',
  redirect: '',
  component: '',
  title: '',
  icon: '',
  hiddenHeaderContent: false,
  hideChildrenInMenu: false,
  target: '',
  orders: undefined
}
export default {
  name: 'Permission',
  components: { Tree, IconFont },
  data() {
    return {
      // 侧边栏
      spinning: false, // 加载效果
      autoExpandParent: false, // 父子节点是否关联
      searchValue: '', // 搜索
      expandedKeys: [], // 展开节点
      // 树数据
      treeData: [
        {
          id: 1,
          title: '平台',
          key: '1',
          slots: {
            icon: 'project'
          },
          scopedSlots: { title: 'title' },
          children: [
            {
              title: '系统管理',
              key: '2',
              slots: { icon: 'catalogue' },
              scopedSlots: { title: 'title' },
              children: [
                {
                  title: '角色管理',
                  key: '3',
                  slots: { icon: 'menu' },
                  scopedSlots: { title: 'title' },
                  children: [{ title: '新增', key: '4', slots: { icon: 'btn' }, scopedSlots: { title: 'title' } }]
                }
              ]
            },
            { title: '首页', key: '6', slots: { icon: 'catalogue' }, scopedSlots: { title: 'title' } }
          ]
        }
      ],
      // 权限数据
      permissionFrom: {
        id: undefined,
        parentId: undefined,
        path: '', // 路由地址
        name: '', // 路由名称
        redirect: '', // 重定向地址
        component: '', // 路由对应的组件
        title: '', // 路由标题
        icon: '', // 路由图标
        hiddenHeaderContent: false, // 是否隐藏PageHeader组件中的面包屑和页面标题栏
        hideChildrenInMenu: false, // 是否隐藏子菜单
        target: '', // 菜单链接跳转目标
        orders: '', // 排序
        type: undefined // 类型1:项目 2:目录 3: 菜单 4:按钮
      },
      permissionRules: {
        type: [{ required: true, message: '请选择类型', trigger: 'change' }],
        path: [{ required: true, message: '请输入路由地址', trigger: 'blur' }],
        redirect: [{ required: true, message: '请输入重定向地址', trigger: 'blur' }],
        name: [
          { required: true, message: '请输入路由名称', trigger: 'blur' },
          { pattern: /^[A-Za-z]+$/, message: '只能是英文字母组成', trigger: 'blur' }
        ],
        component: [{ required: true, message: '请输入路由地址', trigger: 'blur' }],
        title: [
          { required: true, message: '请输入路由标题', trigger: 'blur' },
          { pattern: /^[\u4e00-\u9fa5]+$/, message: '只能是汉字组成', trigger: 'blur' }
        ],
        orders: [{ pattern: /^[1-9]\d*$/, message: '只能是正整数', trigger: 'blur' }]
      },
      typeList: [
        {
          id: 1,
          value: 1,
          label: '项目'
        },
        {
          id: 1,
          value: 2,
          label: '目录'
        },
        {
          id: 1,
          value: 3,
          label: '菜单'
        },
        {
          id: 1,
          value: 4,
          label: '按钮'
        }
      ]
    }
  },
  mounted() {
    generateList(this.treeData)
    this.handerMore('4')
  },
  methods: {
    // 选中
    handerselect(selectedKeys, info) {
      console.log('selected', selectedKeys, info)
      this.permissionFrom = deepClone(info.node.dataRef, defaultForm)
    },
    // 新增
    handerAdd() {},
    // 更新
    handerUpdate() {},
    // 保存
    handerSave() {},
    // 取消
    handerCancel() {
      this.$refs.permissionFrom.clearValidate()
      this.permissionFrom = Object.assign({}, defaultForm)
    },
    // 删除
    handerDelete() {},
    // 展开/收起节点时触发
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    // 侧边栏搜索
    handerFilter(e) {
      const value = e.target.value
      const expandedKeys = dataList
        .map(item => {
          if (item.title.indexOf(value) > -1) {
            return getParentKey(item.key, this.treeData)
          }
          return null
        })
        .filter((item, i, self) => item && self.indexOf(item) === i)
      this.expandedKeys = expandedKeys
      this.searchValue = value
      this.autoExpandParent = true
    },
    // 更多操作
    handerMore(key) {
      switch (key) {
        case '1':
          this.expandedKeys = []
          break
        case '2':
          this.expandedKeys = this.handleTree(this.treeData, 'one')
          break
        case '3':
          this.expandedKeys = this.handleTree(this.treeData, 'two')
          break
        case '4':
          this.expandedKeys = this.handleTree(this.treeData, 'all')
          break
        default:
          break
      }
    },
    handleTree(childNodes, type) {
      const expandedKeys = []
      switch (type) {
        case 'all':
          childNodes.map(v => {
            expandedKeys.push(v.key)
            if (v.children && v.children.length > 0) {
              expandedKeys.push(...this.handleTree(v.children, 'all'))
            }
          })
          break
        case 'one':
          childNodes.map(v => {
            expandedKeys.push(v.key)
          })
          break
        case 'two':
          childNodes.map(v => {
            expandedKeys.push(v.key)
            if (v.children && v.children.length > 0) {
              v.children.map(v1 => {
                expandedKeys.push(v1.key)
              })
            }
          })
          break
        default:
          break
      }
      return expandedKeys
    },
    // 过滤类型
    typeChange(val) {
      this.$refs.permissionFrom.clearValidate()
      this.permissionFrom = Object.assign({ type: val }, defaultForm)
      switch (val) {
        case 1:
          this.permissionFrom.path = '/'
          this.permissionFrom.component = 'BasicLayout'
          break

        default:
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
.lg-container-white {
  display: flex;
  // 左侧边栏
  .sider-container {
    width: 270px;
    .scrollY {
      overflow-x: hidden;
      overflow-y: hidden;
      margin-top: 15px;
      max-height: calc(100vh - 240px);
      &:hover {
        overflow-y: auto;
      }
    }
    .sider-filter-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
  }
  // 右内容
  .content-container {
    flex: 1;
    margin-left: 20px;
    .ant-btn + .ant-btn {
      margin-left: 20px;
    }
  }
}
</style>
