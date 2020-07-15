let txt
switch (process.env.VUE_APP_MODE) {
  case 'admin':
    txt = '全局'
    break
  case 'platform':
    txt = '平台'
    break
  case 'agent':
    txt = '代理商'
    break
  default:
    break
}
module.exports = {
  projectTxt: txt
}
