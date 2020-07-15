export const tableAttr = {
  thead: [
    {
      label: 'name',
      text: '字典名称'
    },
    {
      label: 'key',
      text: '字典值'
    },
    {
      label: 'code',
      text: '类型'
    },
    {
      label: 'orders',
      text: '排序'
    },
    {
      label: 'updateName',
      text: '编辑人名称',
      width: 200
    },
    {
      label: 'updateTime',
      text: '编辑日期',
      width: 200
    }
  ],
  buttons: {
    statusName: false,
    width: 80,
    operation: [
      {
        name: 'editor',
        text: '编辑',
        id: 0,
        type: 'link'
      }
    ]
  }
}
