/**
 * 将对象数组中时间属性解析为字符串
 * @param {Array} array 对象数组
 */
function arrayTimeResolver (array) {
  for (let i = 0; i < array.length; i++) {
    timeResolver(array[i])
  }
}

/**
 * 将json对象数组中时间属性解析为字符串
 * @param {Object} object 任意对象
 */
function timeResolver (object) {
  const time = new Date(object.time.time)
  time.setHours(time.getHours() - 8)
  object.time = String(time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate())
  return object.time
}

export {timeResolver, arrayTimeResolver}
