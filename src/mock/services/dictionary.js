import Mock from 'mockjs2'
import { builder } from '../util'

const dictionaryList = options => {
  return builder(
    {
      list: [
        {
          id: 1,
          name: '启用',
          code: 'status',
          key: '1',
          orders: 1,
          updateName: '迷之de小孩灬',
          updateTime: '2020-07-09'
        },
        {
          id: 2,
          name: '禁用',
          code: 'status',
          key: '0',
          orders: 2,
          updateName: '迷之de小孩灬',
          updateTime: '2020-07-09'
        }
      ],
      count: 1
    },
    '成功',
    200
  )
}
const dictionaryInfo = options => {
  return builder(
    {
      id: 1,
      name: '测试',
      sex: 1
    },
    '成功',
    200
  )
}
Mock.mock(/\/dictionary\/list/, 'post', dictionaryList)
Mock.mock(/\/dictionary\/info/, 'post', dictionaryInfo)
