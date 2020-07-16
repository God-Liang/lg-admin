<template lang="pug">
  .lg-container
    .lg-container-white
      a-spin.sider-container(:spinning="spinning")
        Classify(:dataSource="classifyData"
          :search="true"
          :selectKeys="selectKeys"
          @click="classifyClick"
          @add="classifyAdd"
          @edit="classifyEdit"
          @delete="classifyDelete")
      .content-container
        //- 过滤
        lg-filter(@create="handleCreate" @search="handleFilter" @reset="handleFilter(true)")
          a-input(v-model="filters.keyword" placeholder="请输入过滤条件")
        //- 表格
        lg-table(:list="list"
          :totalList="total"
          :lgThead="dictionaryConst.tableAttr.thead"
          :lgButtons="dictionaryConst.tableAttr.buttons"
          :scrollX="false"
          :isOperation="true"
          @operationEvent0="operationEvent0"
          @initListQuery="initListQuery"
          @getListByPagination="getListByPagination")
</template>
<script>
import { LgTable, LgFilter, Classify } from '@/components'
import { list } from '@/api/common'
import detail from './modules/detail'
import typeDetail from './modules/typeDetail'
import { constants } from '../columnsConst'
const { dictionaryConst } = constants
export default {
  name: 'Dictionary',
  components: {
    LgTable,
    LgFilter,
    Classify
  },
  data() {
    return {
      dictionaryConst,
      // api名称
      apiName: 'dictionary',
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
      },
      spinning: false,
      classifyData: [
        {
          key: 'yizhijia',
          title: '衣智家',
          group: true,
          children: [
            {
              key: 'status',
              title: '状态',
              icon: null
            },
            {
              key: 'sex',
              title: '性别',
              icon: null
            }
          ]
        }
      ],
      selectKeys: []
    }
  },
  mounted() {
    this.getList()
    setTimeout(() => {
      this.selectKeys.push('status')
    }, 100)
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
          width: 450,
          centered: true,
          maskClosable: false
        }
      )
    },
    classifyClick(val) {
      console.log(val)
    },
    classifyAdd(val) {
      const that = this
      this.$dialog(
        typeDetail,
        {
          on: {
            ok() {
              that.getList()
            }
          }
        },
        // modal props
        {
          title: '新增类型',
          width: 450,
          centered: true,
          maskClosable: false
        }
      )
    },
    classifyEdit(val) {
      const that = this
      this.$dialog(
        typeDetail,
        {
          formData: { key: val.key, name: val.title },
          on: {
            ok() {
              that.getList()
            }
          }
        },
        // modal props
        {
          title: '编辑类型',
          width: 450,
          centered: true,
          maskClosable: false
        }
      )
    },
    classifyDelete(val) {
      console.log(val)
    }
  }
}
</script>
<style lang="less" scoped>
.lg-container-white {
  display: flex;
  .sider-container {
    width: 200px;
  }
  .content-container {
    flex: 1;
    margin-left: 20px;
  }
}
</style>
