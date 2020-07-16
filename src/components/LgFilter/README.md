# lgFilter 表格封装组件说明

## 封装说明

- 采用自定义指令统一处理按钮权限
- 更多操作动画效果
- 导出 excel，数据格式`options[Array,Object]`，数组时：索引为 key; 对象时：属性为 key

## 实例

```vue
<template>
  <div class="lg-container">
    <div class="lg-container-white">
      <LgFilter
        createShow
        searchShow
        resetShow
        exportShow
        advancedShow
        :export-data="exportData"
        @create="onCreate"
        @search="onSearch"
        @reset="onReset"
      >
        <a-input v-model="filters.name" placeholder="名称" />
        <template slot="advanced">
          <a-input v-model="filters.phone" placeholder="手机号" />
        </template>
        <template slot="operation">
          <a-button type="primary">更多操作</a-button>
        </template>
      </LgFilter>
    </div>
  </div>
</template>
<script>
import { LgFilter } from '@/components'
export default {
  components: {
    LgFilter
  },
  data() {
    return {
      // 过滤条件
      filters: {
        name: '',
        phone: ''
      },
      // 导出数据
      exportData: {
        thead: [
          {
            label: 'name',
            text: '用户名'
          },
          {
            label: 'sex',
            text: '性别',
            options: ['女', '男']
          },
          {
            label: 'status',
            text: '状态',
            options: {
              0: '禁用',
              1: '启用'
            }
          }
        ],
        tbody: [
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
        ],
        name: '测试'
      }
    }
  },
  methods: {
    // 新增
    onCreate() {},
    // 搜索
    onSearch() {},
    // 重置
    onReset() {}
  }
}
</script>
```

## 内置属性

| 属性             | 说明         | 类型    | 默认值 |
| ---------------- | ------------ | ------- | ------ |
| createShow       | 是否显示新增 | boolean | true   |
| createPermission | 新增权限     | string  | ""     |
| searchShow       | 是否显示搜索 | boolean | true   |
| searchPermission | 搜索权限     | string  | ""     |
| resetShow        | 是否显示重置 | boolean | false  |
| exportShow       | 是否显示导出 | boolean | false  |
| exportPermission | 导出权限     | string  | ""     |
| exportData       | 导出数据     | object  | {}     |
| advancedShow     | 是否高级操作 | boolean | false  |

- exportData
- | 属性  | 说明       | 类型   | 默认值     |
  | ----- | ---------- | ------ | ---------- |
  | thead | 导出头部   | array  | []         |
  | tbody | 导出数据   | array  | []         |
  | name  | 导出文件名 | string | 当前时间戳 |

## 注意事项

- 过滤属性通过 slot="advanced"区分 更多操作属性
  - 如：`<template slot="advanced"><a-input v-model="filters.phone" placeholder="手机号" /></template>`
- 按钮操作通过 slot="operation"区分
  - 如：`<template slot="operation"><a-button type="primary">更多操作</a-button></template>`
