import ObjectUtils from '@/utils/ObjectUtils'

export default class ArrayUtils {
  static isEmpty(array) {
    if (ObjectUtils.isNotNull(array) && ObjectUtils.isArray(array)) {
      return array.length === 0
    }
    return true
  }
}
