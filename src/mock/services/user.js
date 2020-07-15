import Mock from 'mockjs2'
import { builder } from '../util'

const userList = options => {
  return builder(
    {
      list: [
        {
          id: 1,
          avatar: 'https://portrait.gitee.com/uploads/avatars/user/536/1608259_lginsane_1590564909.png!avatar100',
          name: '管理员',
          sex: 1,
          key: 'admin',
          phone: '18437331966',
          roleId: 1,
          roleShow: 'admin',
          status: 0
        }
      ],
      count: 1
    },
    '成功',
    200
  )
}
const userInfo = options => {
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
Mock.mock(/\/user\/list/, 'post', userList)
Mock.mock(/\/user\/info/, 'post', userInfo)
