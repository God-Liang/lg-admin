# lgTable 表格封装组件说明

## 封装说明

- 使用 template 风格的 API[官方版](https://www.antdv.com/components/table-cn/#components-table-demo-template-style-api)
- 无需分页处理，根据`props`配置相关参数
- 采用 store 全局加载状态，处理表格加载效果
- 使用自定义指令处理操作按钮权限，配置`permission`属性即可

## 实例

例子 1：无操作按钮

```vue
<template>
  <div class="lg-container">
    <div class="lg-container-white">
      <a-tag color="#f00">测试</a-tag>
      <LgTable
        :list="list"
        :lgThead="tableAttr.thead"
        :lgButtons="tableAttr.buttons"
        :totalList="total"
        :scrollX="false"
        :isOperation="false"
        @initListQuery="initListQuery"
        @getListByPagination="getListByPagination"
      ></LgTable>
    </div>
  </div>
</template>
<script>
import { LgTable } from '@/components'
export default {
  components: {
    LgTable
  },
  data() {
    return {
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      // 表格属性
      tableAttr: {
        thead: [
          {
            label: 'name',
            text: '用户名'
          },
          {
            label: 'sex',
            text: '性别',
            render(h, row) {
              const sexOptions = ['女', '男']
              return sexOptions[row.sex]
            }
          },
          {
            label: 'status',
            text: '状态',
            render(h, row) {
              const statusOptions = ['启用', '禁用']
              const colorOptions = ['#108ee9', '#f50']
              return h(
                'a-tag',
                {
                  attrs: {
                    color: colorOptions[row.status]
                  }
                },
                statusOptions[row.status]
              )
            }
          }
        ],
        buttons: {
          statusName: false
        }
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
    // 列表
    getList() {
      this.list = [
        {
          id: 1,
          name: '小明',
          sex: 0,
          status: 0
        },
        {
          id: 2,
          name: '小宏',
          sex: 1,
          status: 1
        }
      ]
      this.total = 2
    }
  }
}
</script>
```

例子 2：有操作按钮

```vue
<template>
  <div class="lg-container">
    <div class="lg-container-white">
      <a-tag color="#f00">测试</a-tag>
      <LgTable
        :list="list"
        :lgThead="tableAttr.thead"
        :lgButtons="tableAttr.buttons"
        :totalList="total"
        :isOperation="true"
        @operationEvent0="operationEvent0"
        @operationEvent1="operationEvent1"
        @operationEvent2="operationEvent2"
        @initListQuery="initListQuery"
        @getListByPagination="getListByPagination"
      ></LgTable>
    </div>
  </div>
</template>
<script>
import { LgTable } from '@/components'
export default {
  components: {
    LgTable
  },
  data() {
    return {
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      // 表格属性
      tableAttr: {
        thead: [
          {
            label: 'name',
            text: '用户名'
          },
          {
            label: 'sex',
            text: '性别',
            render(h, row) {
              const sexOptions = ['女', '男']
              return sexOptions[row.sex]
            }
          },
          {
            label: 'status',
            text: '状态',
            render(h, row) {
              const statusOptions = ['启用', '禁用']
              const colorOptions = ['#108ee9', '#f50']
              return h(
                'a-tag',
                {
                  attrs: {
                    color: colorOptions[row.status]
                  }
                },
                statusOptions[row.status]
              )
            }
          }
        ],
        buttons: {
          statusName: 'status',
          width: 180,
          operation: {
            0: [
              {
                name: 'edit',
                text: '编辑',
                id: 0,
                type: 'link'
              },
              {
                name: 'enable',
                text: '启用',
                id: 1,
                type: 'link',
                permission: 'status'
              }
            ],
            1: [
              {
                name: 'edit',
                text: '编辑',
                id: 0,
                type: 'link'
              },
              {
                name: 'disable',
                text: '禁用',
                id: 2,
                type: 'link',
                permission: 'status'
              }
            ]
          }
        }
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
    // 列表
    getList() {
      this.list = [
        {
          id: 1,
          name: '小明',
          sex: 0,
          status: 0
        },
        {
          id: 2,
          name: '小宏',
          sex: 1,
          status: 1
        }
      ]
      this.total = 2
    },
    operationEvent0(row) {
      console.log(row)
    },
    operationEvent1(row) {
      row.status = 1
    },
    operationEvent2(row) {
      row.status = 0
    }
  }
}
</script>
```

## 内置属性

- 请直接查看文件`/src/components/lgTable/index.vue`的`props`

## 注意事项

- 当列表不存在参数`id`时，必须重新配置`rowKey`作唯一标示
- 参数过少时，可改变`scrollX`滚动宽度或设置为 false，用于取消固定定位右侧操作按钮
