import {
  PropertyNameConverter,
  PropertyNameExclude,
} from "../type/FunctionAlias";
import { ObjectUtils } from "./ObjectUtils";
import { StringUtils } from "./StringUtils";

/**
 * 转换工具类
 *
 * @author 胖橘
 * @version 1.0
 * @since 1.0
 */
export class ConvertUtils {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  /**
   * 转换属性名称
   *
   * @param value 待转换的值，基础类型无法转换
   * @param converter 属性名转换器，用于定义如何转换属性名称
   * @param exclude 属性排除器，符合条件的属性将在转换过程中被忽略
   * @return {} 此方法会对值进行深拷贝操作，因为会返回一个新的对象，不会影响原始值
   */
  public static convertPropertyName(
    value: unknown,
    converter: PropertyNameConverter,
    exclude: PropertyNameExclude = () => true
  ): unknown {
    if (ObjectUtils.isNull(value)) {
      return null;
    }

    if (ObjectUtils.isBasicType(value)) {
      return value;
    }

    // 判断是否为数组
    if (Array.isArray(value)) {
      return value.map((curVal) => {
        // 判断是否为基础类型
        if (ObjectUtils.isBasicType(curVal)) {
          return curVal;
        }
        // 执行转换操作
        return this.convertPropertyName(curVal, converter, exclude);
      });
    }

    // 不为数组则直接执行对象转换
    const newObj = {};
    // 遍历属性名称
    Object.keys(value).forEach((propertyName) => {
      const newPropertyName = converter(propertyName);
      const val = value[propertyName];
      // 判断是否为基础类型或是否符合排除条件
      if (ObjectUtils.isBasicType(val) || exclude(propertyName, val)) {
        newObj[newPropertyName] = val;
      } else {
        newObj[newPropertyName] = this.convertPropertyName(
          val,
          converter,
          exclude
        );
      }
    });
    return newObj;
  }

  /**
   * 属性名称称为驼峰格式
   *
   * @param value 待转换的值，基础类型无法转换
   * @param exclude 属性排除器，符合条件的属性将在转换过程中被忽略
   * @return {} 此方法会对值进行深拷贝操作，因为会返回一个新的对象，不会影响原始值
   */
  public static propertyNamesToCamlCase(
    value: unknown,
    exclude?: PropertyNameExclude
  ): unknown {
    return this.convertPropertyName(
      value,
      StringUtils.camelCaseToUnderLine,
      exclude
    );
  }

  /**
   * 属性名称转为下划线格式
   *
   * @param value 待转换的值，基础类型无法转换
   * @param exclude 属性排除器，符合条件的属性将在转换过程中被忽略
   * @return {} 此方法会对值进行深拷贝操作，因为会返回一个新的对象，不会影响原始值
   */
  public static propertyNamesToUnderLine(
    value: unknown,
    exclude?: PropertyNameExclude
  ): unknown {
    return this.convertPropertyName(
      value,
      StringUtils.underLineToCamelCase,
      exclude
    );
  }
}
