<template lang="pug">
  .lg-filter-container
    a-row(:gutter="20")
      filterSlot(type="default")
      filterSlot(v-if="advanced" type="advanced")
      a-col(:xl="6" :md="8" :xs="24")
        a-button(v-if="searchShow" v-action="searchPermission" type="primary" @click="onSearch") 查询
        a-button(v-if="resetShow" @click="onReset") 重置
        span.advanced(v-if="advancedShow" @click="toggleAdvanced") {{ advanced ? '收起' : '展开' }}
          a-icon(:type="advanced ? 'up' : 'down'")
    a-row(:gutter="20")
      a-col
        a-button(v-if="createShow" v-action="createPermission" type="primary" @click="onCreate") 新增
        a-button(v-if="exportShow" v-action="exportPermission" :loading="downloading" type="primary" @click="onExport") 导出
        slot(name="operation")
</template>

<script>
const filterSlot = {
  functional: true,
  props: {
    type: {
      type: String,
      default: 'default'
    }
  },
  render: (h, data) => {
    return data.parent.$slots[data.props.type] && data.parent.renderContent(data.parent.$slots[data.props.type])
  }
}
export default {
  name: 'LgFilters',
  components: { filterSlot },
  props: {
    // 是否显示新增
    createShow: {
      type: Boolean,
      default: true
    },
    // 新增权限
    createPermission: {
      type: String,
      default: ''
    },
    // 是否显示搜索
    searchShow: {
      type: Boolean,
      default: true
    },
    // 搜索权限
    searchPermission: {
      type: String,
      default: ''
    },
    // 是否显示重置
    resetShow: {
      type: Boolean,
      default: false
    },
    // 是否显示导出
    exportShow: {
      type: Boolean,
      default: false
    },
    // 导出权限
    exportPermission: {
      type: String,
      default: ''
    },
    // 导出数据
    exportData: {
      type: Object,
      default: function() {
        return {
          thead: [],
          tbody: [],
          name: ''
        }
      }
    },
    // 高级操作
    advancedShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      downloading: false,
      advanced: false
    }
  },
  methods: {
    onCreate() {
      this.$emit('create')
    },
    onSearch() {
      this.$emit('search')
    },
    onReset() {
      this.$emit('reset')
    },
    // 导出
    onExport() {
      if (
        this.exportData.thead &&
        this.exportData.thead.length > 0 &&
        this.exportData.tbody &&
        this.exportData.tbody.length > 0
      ) {
        this.downloading = true
        const th = []
        const filterVal = []
        const filterOptions = {}
        this.exportData.thead.map(e => {
          th.push(e.text)
          filterVal.push(e.label)
          if (e.options) {
            filterOptions[e.label] = e.options
          }
        })
        var data = this.formatJson(filterVal, this.exportData.tbody, filterOptions)
        import('@/vendor/Export2Excel').then(excel => {
          excel.export_json_to_excel({
            header: th, // 表头 必填
            data, // 具体数据 必填
            filename: this.exportData.name || new Date().getTime(), // 非必填
            autoWidth: true, // 非必填
            bookType: 'xlsx' // 非必填
          })
          this.downloading = false
        })
      } else {
        this.$message.warning('暂无数据')
      }
    },
    formatJson(filterVal, jsonData, filterOptions) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (filterOptions[j]) {
            if (Object.prototype.toString.call(filterOptions[j]) === '[object Array]') {
              return filterOptions[j][v[j]]
            } else if (Object.prototype.toString.call(filterOptions[j]) === '[object Object]') {
              return filterOptions[j][v[j]]
            } else {
              return v[j]
            }
          } else {
            return v[j]
          }
        })
      )
    },
    // 高级
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    renderItem(vnode) {
      return (
        <a-col xl={6} md={8} xs={24}>
          {vnode}
        </a-col>
      )
    },
    renderContent(vlist) {
      return vlist.map(vnode => {
        return this.renderItem(vnode)
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '~ant-design-vue/es/style/themes/default.less';
.lg-filter-container {
  /deep/ .ant-col {
    margin-bottom: 20px;
    .ant-btn + .ant-btn {
      margin-left: 20px;
    }
  }
  .advanced {
    margin-left: 14px;
    font-size: 13px;
    color: @primary-color;
    cursor: pointer;
  }
}
</style>
