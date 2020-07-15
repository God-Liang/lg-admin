import { Menu, Icon, Input } from 'ant-design-vue'
import _ from 'lodash'
import './index.less'
const { Item, ItemGroup, SubMenu } = Menu
const { Search } = Input
export default {
  name: 'Classify',
  props: {
    // 数据
    dataSource: {
      type: Array,
      required: true
    },
    // 默认选中
    selectKeys: {
      type: Array,
      default: () => []
    },
    // 搜索
    search: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchDate: []
    }
  },
  created() {
    this.searchDate = _.cloneDeep(this.dataSource)
  },
  methods: {
    handleSearch(value) {
      if (value === '') {
        this.searchDate = _.cloneDeep(this.dataSource)
        return false
      }
      this.searchDate[0].children = this.dataSource[0].children.filter(e => e.title.includes(value))
    },
    handlePlus(item) {
      this.$emit('add', item)
    },
    handleEdit(item) {
      this.$emit('edit', item)
    },
    handleDelete(item) {
      this.$emit('delete', item)
    },
    renderSearch() {
      return (
        <Search
          placeholder="搜索"
          style="width: 100%; margin-bottom: 20px"
          {...{
            on: {
              search: value => this.handleSearch(value)
            }
          }}
        />
      )
    },
    renderIcon(icon) {
      return (icon && <Icon type={icon} />) || null
    },
    renderMenuItem(item) {
      return (
        <Item key={item.key}>
          {this.renderIcon(item.icon)}
          {item.title}
          <a-dropdown>
            <a class="btn">
              <a-icon type="ellipsis" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item key="2" {...{ on: { click: () => this.handleEdit(item) } }}>
                编辑
              </a-menu-item>
              <a-menu-item key="3" {...{ on: { click: () => this.handleDelete(item) } }}>
                删除
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </Item>
      )
    },
    renderItem(item) {
      return item.children ? this.renderSubItem(item, item.key) : this.renderMenuItem(item, item.key)
    },
    renderItemGroup(item) {
      const childrenItems = item.children.map(o => {
        return this.renderItem(o, o.key)
      })

      return (
        <ItemGroup key={item.key}>
          <template slot="title">
            <span>{item.title}</span>
            <a-dropdown>
              <a class="btn">
                <a-icon type="ellipsis" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item key="1" {...{ on: { click: () => this.handlePlus(item) } }}>
                  新增
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
          {childrenItems}
        </ItemGroup>
      )
    },
    renderSubItem(item, key) {
      const childrenItems =
        item.children &&
        item.children.map(o => {
          return this.renderItem(o, o.key)
        })

      const title = (
        <span slot="title">
          {this.renderIcon(item.icon)}
          <span>{item.title}</span>
        </span>
      )

      if (item.group) {
        return this.renderItemGroup(item)
      }
      return (
        <SubMenu key={key}>
          {title}
          {childrenItems}
        </SubMenu>
      )
    }
  },
  render() {
    const { search } = this.$props
    const list = this.searchDate.map(item => {
      return this.renderItem(item)
    })

    return (
      <div class="classify-wrapper">
        {search ? this.renderSearch() : null}
        <Menu
          mode="inline"
          class="custom-classify"
          {...{
            on: {
              click: item => this.$emit('click', item)
            }
          }}
          defaultSelectedKeys={this.selectKeys}
        >
          {list}
        </Menu>
      </div>
    )
  }
}
