export const tableAttr = {
  thead: [
    {
      label: 'avatar',
      text: '头像',
      render(h, row) {
        return h('a-avatar', {
          attrs: {
            src: row.avatar,
            size: 36
          }
        })
      }
    },
    {
      label: 'name',
      text: '昵称'
    },
    {
      label: 'roleShow',
      text: '角色'
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
      label: 'phone',
      text: '联系方式'
    },
    {
      label: 'status',
      text: '状态',
      render(h, row) {
        const statusOptions = ['禁用', '启用']
        const colorOptions = ['#f50', '#108ee9']
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
    width: 160,
    operation: {
      0: [
        {
          name: 'editor',
          text: '编辑',
          id: 0,
          type: 'link'
        },
        {
          name: 'enable',
          text: '启用',
          id: 1,
          type: 'link'
        }
      ],
      1: [
        {
          name: 'editor',
          text: '编辑',
          id: 0,
          type: 'link'
        },
        {
          name: 'disable',
          text: '禁用',
          id: 2,
          type: 'link'
        }
      ]
    }
  }
}
