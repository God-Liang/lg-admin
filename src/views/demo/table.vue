<template lang="pug">
  .lg-container
    .lg-container-white
      lgTable(columns-type="index"
        columns-label="序号"
        :list="list"
        :total-list="total"
        :lg-thead="tableConst.tableAttr.thead"
        :lg-buttons="tableConst.tableAttr.buttons"
        @operationEvent0="operationEvent0"
        @operationEvent1="operationEvent1"
        @operationEvent2="operationEvent2"
        @operationEvent3="operationEvent3"
        @initListQuery="initListQuery"
        @getListByPagination="getListByPagination")
</template>

<script>
import lgTable from '@/components/lgTable'
import { tableConst } from '@/views/demo/columnsConst'
export default {
  components: { lgTable },
  data() {
    return {
      tableConst,
      apiUri: 'user',
      list: [],
      total: 0,
      listQuery: {
        current: 1,
        pageSize: 10
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 初始化页数与条数
    initListQuery(listQuery) {
      this.listQuery = listQuery
    },
    // 分页操作
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      this.getList()
    },
    // 过滤列表
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // 获取列表
    getList() {
      this.list = [{
        id: 1,
        name: '小明',
        nick: '明明',
        sex: 1,
        createName: 'admin',
        createTime: '2020-04-13',
        status: 0
      },
      {
        id: 2,
        name: '小红',
        nick: '红红',
        sex: 0,
        createName: 'admin',
        createTime: '2020-04-13',
        status: 1
      }]
      this.total = 2
    },
    operationEvent0(row) {

    },
    operationEvent1(row) {

    },
    operationEvent2(row) {

    },
    operationEvent3(row) {

    }
  }
}
</script>
