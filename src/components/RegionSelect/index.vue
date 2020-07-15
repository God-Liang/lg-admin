<template lang="pug">
  a-cascader(v-model="__value"
    :options="regionData"
    :load-data="loadData"
    :placeholder="placeholder"
    :change-on-select="changeOnSelect"
    :disabled="disabled"
    :fieldNames="fieldNames"
    @change="onChange")
</template>
<script>
import { getAreaList } from '@/api/system'
export default {
  name: 'RegionSelect',
  props: {
    value: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 提示语
    placeholder: {
      type: String,
      default: ''
    },
    // 点选每级菜单选项值都会发生变化
    changeOnSelect: {
      type: Boolean,
      default: false
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 自定义 options 中 label name children 的字段
    fieldNames: {
      type: Object,
      default: function() {
        return { label: 'label', value: 'value', children: 'children' }
      }
    }
  },
  computed: {
    __value: {
      get() {
        return this.value
      },
      set(nval) {
        this.$emit('input', nval)
      }
    }
  },
  data() {
    return {
      regionData: []
    }
  },
  methods: {
    // 选中事件
    onChange(value) {
      this.$emit('change', value)
    },
    // 动态加载数据
    loadData(selectedOptions) {
      console.log(selectedOptions)
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true

      // 加载
      setTimeout(() => {
        this.getRegionList(selectedOptions[this.fieldNames.value], selectedOptions.length, data => {
          targetOption.children = data
          targetOption.loading = false
        })
      }, 1000)
    },
    // 获取地区数据
    getRegionList(id, type, successCallback) {
      const data = {
        id,
        type
      }
      getAreaList(data).then(res => {
        if (res.data && res.data.length > 0) {
          successCallback && successCallback(res.data)
        }
      })
    }
  }
}
</script>
