import { regionData, TextToCode, CodeToText } from 'element-china-area-data'
import StringUtils from '@/utils/StringUtils'
import ObjectUtils from '@/utils/ObjectUtils'

/**
 * 行政区域工具类，需配合[element-china-area-data]{@link https://plortinus.github.io/element-china-area-data/index.html}使用
 */
export default class AreaDataUtils {
  /**
   * 行政区域名称转编号
   *
   * @param {string} provinceAddress 省级行政名称
   * @param {string} cityAddress 市级行政区域名称
   * @param {string} areaAddress 区级行政区域名称
   * @return {Array} 省市区行政编号数组
   */
  static textToCode(provinceAddress, cityAddress, areaAddress) {
    const addressCodes = []
    const provinceCode = TextToCode[provinceAddress]
    if (StringUtils.isNotEmpty(provinceCode)) {
      addressCodes.push(provinceCode.code)
      const cityCode = provinceCode[cityAddress]
      if (StringUtils.isNotEmpty(cityCode)) {
        addressCodes.push(cityCode.code)
        const areaCode = cityCode[areaAddress]
        if (StringUtils.isNotEmpty(areaCode)) {
          addressCodes.push(areaCode.code)
        }
      }
      return addressCodes
    }
  }

  /**
   * 行政区域编号转名称
   *
   * @param {string|string[]} addressCodes 省市区行政区域编号
   * @returns {{area: string, province: string, city: string}} 行政区域名称对象
   */
  static codeToText(addressCodes) {
    if (ObjectUtils.isNull(addressCodes) || addressCodes.length === 0) {
      return { province: '', city: '', area: '' }
    }
    return {
      province: ObjectUtils.getSafeValue(CodeToText[addressCodes[0]], '', StringUtils.isNotEmpty),
      city: ObjectUtils.getSafeValue(CodeToText[addressCodes[1]], '', StringUtils.isNotEmpty),
      area: ObjectUtils.getSafeValue(CodeToText[addressCodes[2]], '', StringUtils.isNotEmpty)
    }
  }

  /**
   * 获取完整行政区域信息
   *
   * @property {string} province - 省级行政名称
   * @property {string} city - 市级行政名称
   * @property {string} area - 区级行政名称
   * @return {string}
   */
  static getWholeAddress(province, city, area) {
    return StringUtils.trimToEmpty(province)
      + (city === '市辖区' ? '' : StringUtils.trimToEmpty(city))
      + StringUtils.trimToEmpty(area)
  }
}

/**
 * @static
 */
AreaDataUtils.regionData = regionData
