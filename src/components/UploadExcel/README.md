# UploadExcel 导入 excel

## 封装说明

- 采用 xlsx 库，支持拖拽导入

## 实例

```vue
<template>
  <div class="lg-container">
    <div class="lg-container-white">
      <UploadExcel @success="uploadSuccess"></UploadExcel>
    </div>
  </div>
</template>
<script>
import UploadExcel from '@/components/UploadExcel'
export default {
  components: {
    UploadExcel
  },
  methods: {
    uploadSuccess({ results, header }) {
      console.log(results)
      console.log(header)
    }
  }
}
</script>
```

## 内置属性

| 属性   | 说明         | 类型    | 默认值 |
| ------ | ------------ | ------- | ------ |
| isDrag | 是否支持拖拽 | Boolean | false  |

- success 成功回调
