<template lang="pug">
  .lg-container
    .lg-container-white
      //- 过滤
      lg-filter(@create="handleCreate" @search="handleFilter" @reset="handleFilter(true)")
        a-input.filter-item.w200(v-model="filters.keyword" placeholder="请输入过滤条件")
      //- 表格
      lg-table(:list="list"
        :totalList="total"
        :lgThead="roleConst.tableAttr.thead"
        :scrollX="false"
        :isOperation="true"
        :lgButtons="roleConst.tableAttr.buttons"
        @operationEvent0="operationEvent0"
        @operationEvent1="operationEvent1"
        @operationEvent2="operationEvent2"
        @operationEvent3="operationEvent3"
        @initListQuery="initListQuery"
        @getListByPagination="getListByPagination")
</template>
<script>
import { LgTable, LgFilter } from '@/components'
import { list, createOrUpdate } from '@/api/common'
import detail from './modules/detail'
import permissionDetail from './modules/permissionDetail'
import { constants } from '../columnsConst'
const { roleConst } = constants
export default {
  name: 'Role',
  components: {
    LgTable,
    LgFilter
  },
  data() {
    return {
      roleConst,
      // api名称
      apiName: 'role',
      // 分页
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      // 过滤条件
      filters: {
        keyword: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 初始化
    initListQuery(listQuery) {
      this.listQuery = listQuery
    },
    // 分页操作
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      this.getList()
    },
    // 过滤事件
    handleFilter(isReset) {
      // 重置
      if (isReset) {
        this.filters = {}
      }
      this.listQuery.page = 1
      this.getList()
    },
    // 新增
    handleCreate() {
      const that = this
      this.$dialog(
        detail,
        {
          on: {
            ok() {
              that.getList()
            }
          }
        },
        // modal props
        {
          title: '新增',
          width: 1000,
          centered: true,
          maskClosable: false
        }
      )
    },
    // 编辑
    operationEvent0(row) {
      const that = this
      this.$dialog(
        detail,
        {
          formData: row,
          on: {
            ok() {
              that.getList()
            }
          }
        },
        // modal props
        {
          title: '编辑',
          width: 1000,
          centered: true,
          maskClosable: false
        }
      )
    },
    // 启用
    operationEvent1(row) {
      const that = this
      const modal = this.$confirm({
        title: '操作',
        content: '是否启用？',
        onOk() {
          const params = {
            id: row.id,
            status: 1
          }
          createOrUpdate(that.apiName, params).then(res => {
            that.getList()
            that.$notification.success({
              message: '成功',
              description: '启用成功'
            })
            modal.destroy()
          })
        },
        onCancel() {}
      })
    },
    // 禁用
    operationEvent2(row) {
      const that = this
      const modal = this.$confirm({
        title: '操作',
        content: '是否禁用？',
        onOk() {
          const params = {
            id: row.id,
            status: 2
          }
          createOrUpdate(that.apiName, params).then(res => {
            that.getList()
            that.$notification.success({
              message: '成功',
              description: '禁用成功'
            })
            modal.destroy()
          })
        },
        onCancel() {}
      })
    },
    // 权限
    operationEvent3(row) {
      const that = this
      this.$dialog(
        permissionDetail,
        {
          id: row.id,
          on: {
            ok() {
              that.getList()
            }
          }
        },
        // modal props
        {
          title: '权限',
          width: 450,
          centered: true,
          maskClosable: false
        }
      )
    },
    // 列表
    getList() {
      const data = Object.assign({}, this.listQuery, this.filters)
      list(this.apiName, data).then(res => {
        this.list = res.data.list
        this.total = res.data.count
      })
    }
  }
}
</script>
