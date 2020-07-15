<template lang="pug">
  .lg-tabel-container
    a-table(:data-source="list" :loading="listLoading" :pagination="false" bordered :rowKey="rowKey" :scroll="{ x: scrollX }")
      a-table-column(v-for="(thead, index) in lgThead" :width="thead.width" :key="thead.label" :title="thead.text" align="center")
        template(slot-scope="scope")
          lgSolt(v-if="thead.render" :render="thead.render" :row="scope" :column="thead")
          div(v-else) {{ scope[thead.label] }}
      a-table-column(v-if="isOperation" :width="lgButtons.width" key="action" fixed="right"  title="操作" align="center")
        template(slot-scope="scope")
          template(v-if="lgButtons.noOperation && lgButtons.noOperation.length > 0 && operationFilter(lgButtons.noOperation, scope)")
            .noOperation 不可操作
          template(v-else)
            a-button.long(v-for="button in (lgButtons.statusName ? lgButtons.operation[scope[lgButtons.statusName]] : lgButtons.operation)" v-action="button.permission" :type="button.type" :key="button.name" @click="fun(scope, button.id)") {{ button.text }}
    .pagination-container
      pagination(v-model="listQuery.page" :page-size-options="pageSizeOptions" :total="totalList" :show-total="showTotal" show-size-changer show-quick-jumper :page-size="listQuery.limit" @change="currentChange" @showSizeChange="onShowSizeChange")
</template>
<script>
import { pagination } from 'ant-design-vue'
const lgSolt = {
  functional: true,
  props: {
    row: {
      type: Object,
      default: ''
    },
    render: Function,
    column: {
      type: Object,
      default: null
    }
  },
  render: (h, data) => {
    const element = data.props.render(h, data.props.row)
    if (typeof element === 'object' && element !== null) {
      return element
    } else {
      return h('span', element)
    }
  }
}
export default {
  name: 'LgTable',
  components: { lgSolt, pagination },
  props: {
    // 滚动宽度
    scrollX: {
      type: [Number, Boolean],
      default: 1300
    },
    // rowKey
    rowKey: {
      type: String,
      default: 'id'
    },
    // 表格数据
    list: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 表格数据长度
    totalList: {
      type: Number,
      default: 0
    },
    // 表头数据
    lgThead: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 判断是否需要操作按钮
    isOperation: {
      type: Boolean,
      default: false
    },
    // 操作按钮
    // statusName 状态名
    // operation: [] or {0: [], 1: []} 按钮配置
    lgButtons: {
      type: Object,
      default: function() {
        return {
          statusName: 'status', // 当存在statusName：根据当前列的数据状态值使用operation[状态值]; false：使用operation
          width: 100, // 表格操作列的宽度
          operation: {
            // 操作按钮配置
            0: [
              {
                name: 'enable',
                text: '启用',
                id: 0,
                type: 'link'
              }
            ],
            1: [
              {
                name: 'disable',
                text: '禁用',
                id: 1,
                type: 'link'
              }
            ]
          }
        }
      }
    }
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10
      },
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      showTotal: (total, range) => `共${total}条`
    }
  },
  computed: {
    // 通过vuex存储加载状态
    listLoading() {
      return this.$store.getters.listLoading
    }
  },
  created() {
    // 初始化页码、每页条数
    this.$emit('initListQuery', this.listQuery)
  },
  methods: {
    // 操作按钮
    fun(row, buttonId) {
      this.$emit('operationEvent' + buttonId, row)
    },
    // 搜索页码获取列表
    getList() {
      this.$emit('getListByPagination', this.listQuery)
    },
    // 分页过滤
    currentChange(page, limit) {
      this.listQuery.page = page
      this.listQuery.limit = limit
      this.getList()
    },
    // 分页过滤
    onShowSizeChange(page, limit) {
      this.listQuery.limit = limit
      this.listQuery.page = page
      this.getList()
    },
    // 操作处理
    operationFilter(list, row) {
      let flag = false
      list.map(e => {
        if (row[e.label] === e.value) {
          flag = true
        }
      })
      return flag
    }
  }
}
</script>

<style lang="less" scoped>
// 表格
/deep/ .ant-table-thead {
  background-color: #f3f3f3;
}
/deep/ .ant-table-tbody tr:nth-child(2n) {
  background: rgba(250, 251, 252, 1);
}
/deep/ .ant-table-tbody tr:nth-child(2n-1) {
  background: rgba(255, 255, 255, 1);
}
/deep/ .ant-table-thead > tr > th,
/deep/ .ant-table-tbody > tr > td {
  padding: 6px 10px;
}
// 分页
.pagination-container {
  margin-top: 30px;
  text-align: right;
}
.long {
  padding: 0;
  height: 20px;
  &:last-child {
    &::after {
      display: none;
    }
  }
  &::after {
    content: '';
    display: inline-block;
    height: 10px;
    width: 1px;
    background-color: #0076ff;
    margin-left: 6px;
    margin-bottom: 2px;
    vertical-align: middle;
  }
}
.long + .long {
  margin-left: 8px;
}
.long,
.long:hover,
.long:focus,
.long:active {
  border: 0;
}
.noOperation {
  color: #888;
  font-size: 14px;
}
</style>
