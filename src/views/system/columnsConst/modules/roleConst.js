export const tableAttr = {
  thead: [
    {
      label: 'name',
      text: '角色名称'
    },
    {
      label: 'key',
      text: '角色标示'
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
    width: 200,
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
        },
        {
          name: 'permissions',
          text: '权限',
          id: 3,
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
        },
        {
          name: 'permissions',
          text: '权限',
          id: 3,
          type: 'link'
        }
      ]
    }
  }
}
