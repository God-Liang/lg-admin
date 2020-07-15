// import { dictionary, getDictListByParent } from '@/api/system'
export default {
  name: '',
  props: {
    dictCode: {
      type: String,
      default: 'DictionarySelect'
    },
    parentCode: {
      type: String,
      default: ''
    },
    parentId: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: [String, Number],
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    allowClear: {
      type: Boolean,
      default: true
    },
    showSearch: {
      type: Boolean,
      default: true
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
      dictionaryList: []
    }
  },
  mounted() {
    this.dictionaryList = [
      {
        id: 1,
        value: '1',
        text: '禁用'
      },
      {
        id: 2,
        value: '2',
        text: '启用'
      }
    ]
    // if (!this.parentCode) {
    //   dictionary({ type: this.dictCode }).then(res => {
    //     this.dictionaryList = res.data.list
    //   })
    // } else {
    //   getDictListByParent({
    //     type: this.dictCode,
    //     parentId: this.parentId
    //   }).then(res => {
    //     this.dictionaryList = res.data.list
    //   })
    // }
  },
  methods: {
    renderOption(item) {
      return (
        <a-select-option key={item.value} value={item.value}>
          {item.text}
        </a-select-option>
      )
    }
  },
  render() {
    const { showSearch, allowClear, placeholder } = this.$props
    const list = this.dictionaryList.map(item => {
      return this.renderOption(item)
    })
    return (
      <a-select
        showSearch={showSearch}
        allowClear={allowClear}
        v-model={this.__value}
        placeholder={placeholder}
        {...{ on: { change: item => this.$emit('change', item), search: item => this.$emit('search', item) } }}
      >
        {list}
      </a-select>
    )
  }
}
