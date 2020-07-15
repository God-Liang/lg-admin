# lgFilter 表格封装组件说明

## 封装说明

- 采用自定义指令统一处理按钮权限
- 更多操作动画效果（待完成）
- `options[Array,Object]`，数组时：索引为 key; 对象时：属性为 key

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
        :export-data="exportData"
        @create="onCreate"
        @search="onSearch"
        @reset="onReset"
      >
        <a-input v-model="filters.name" class="filter-item w200" placeholder="名称" />
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
        name: ''
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

- 请直接查看文件`/src/components/lgFilter/index.vue`的`props`

## 注意事项

- 过滤条件都要加上 class 样式`filter-item`
