/**
 * 检测是否是IE浏览器
 * @returns {Boolean}
 */
export function isIE() {
  const bw = window.navigator.userAgent
  const compare = s => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * 删除DOM节点
 * @param {String} id 节点ID
 * @param {Number} timeout 延迟时间
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

/**
 * 生产 n 位随机数(包含数字、字母)
 * @param {Number} n 位数
 * @returns {String}
 */
export function getRandomNum(n = 4) {
  let randomVal = ''
  const selectChar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  for (let i = 0; i < n; i++) {
    randomVal += selectChar[Math.floor(Math.random() * 61)]
  }
  return randomVal
}

/**
 * 通过出生日期获取年龄
 * @param {string} birthday 出生日期
 * @returns {Number}
 */
export function getAge(birthday) {
  if (!birthday) {
    return 0
  }
  // 出生日期
  const start = new Date(birthday).getFullYear()
  const startMonth = new Date(birthday).getMonth() + 1
  const startDate = new Date(birthday).getDate()

  // 当前日期
  const end = new Date().getFullYear()
  const endMonth = new Date().getMonth() + 1
  const endDate = new Date().getDate()
  // 比较年
  const age = end - start
  if (end - start <= 0) {
    return 0
  }
  // 比较月日
  const isSubtract = endMonth > startMonth || (endMonth === startMonth && endDate > startDate)
  return isSubtract ? age - 1 : age
}

/**
 * 只拷贝默认对象存在的属性
 * 如果您想使用完美的深度复制所有属性，请使用lodash的_.cloneDeep
 * @param {Object} source 拷贝对象
 * @param {Object} attrObj 默认对象
 * @returns {Object}
 */
export function deepClone(source, attrObj) {
  const isEmpty =
    source &&
    Object.prototype.toString.call(source) === '[object Object]' &&
    attrObj &&
    Object.prototype.toString.call(attrObj) === '[object Object]'
  if (!isEmpty) {
    throw new Error('方法 deepClone 传参错误')
  }
  const targetObj = {}
  const attrs = Object.keys(attrObj)
  Object.keys(source).forEach(keys => {
    if (attrs.includes(keys)) {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * 防抖
 * @param {Function} func 防抖函数
 * @param {number} wait 延迟时间
 * @param {boolean} immediate 是否立即执行
 * @return {Function}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
