import Mock from 'mockjs2'
import { builder } from '../util'

const roleList = options => {
  return builder(
    {
      list: [
        {
          id: 1,
          name: 'admin',
          key: 'admin',
          permission: [1],
          status: 0
        }
      ],
      count: 1
    },
    '成功',
    200
  )
}

Mock.mock(/\/role\/list/, 'post', roleList)
