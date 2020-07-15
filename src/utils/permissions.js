export function actionToObject (json) {
  try {
    return JSON.parse(json)
  } catch (e) {
    console.log('err', e.message)
  }
  return []
}

export function hasRole (routers, path) {
  let flag = false
  routers.map(route => {
    if (route.path === path) {
      flag = true
    }
    if (route.children && route.children.length) {
      if (hasRole(route.children, path)) {
        flag = true
      }
    }
  })
  return flag
}
